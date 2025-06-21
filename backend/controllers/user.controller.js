import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../utils/SendEmail.js";
import bcrypt from "bcrypt";

// Function to check if email is valid using EmailValidation.io
async function isEmailValid(email) {
  // my api key for mail trap
  const EMAIL_VALIDATION_API_KEY = process.env.EMAIL_VALIDATION_API_KEY;

  try {
    //making proper url for calling
    let url = `https://api.emailvalidation.io/v1/info?apikey=${EMAIL_VALIDATION_API_KEY}&email=${email}`;

    // response from api calling
    let res = await fetch(url);

    //convert response to proper json object
    let result = await res.json();

    return result?.state;
  } catch (error) {
    console.error(`Error validating email ${email}:`, error);
    return false; // Return false if there's an error in the request
  }
}
//template for sending verification code
function generateMessageTemplate(verificationCode, name) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
    <p style="font-size: 16px; color: #333;">Dear <span>${name}</span></p>
    <p style="font-size: 16px; color: #333;">Your verification code is:</p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
        ${verificationCode}
      </span>
    </div>
    <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
    <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
      <p>Thank you,<br>Your Company Team</p>
      <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
    </footer>
  </div>
`;
}

function generateEmployeeWelcomeTemplate(employeeId, name, email, password) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #4C51BF; text-align: center;">Welcome to Our Book & Stationery Shop!</h2>
    <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>
    <p style="font-size: 16px; color: #333;">We are thrilled to welcome you to our team! Below are your login credentials:</p>
    
    <div style="margin: 20px 0; padding: 15px; background-color: #edf2f7; border-radius: 6px;">
      <p style="font-size: 16px;"><strong>Employee ID:</strong> ${employeeId}</p>
      <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 16px;"><strong>Password:</strong> ${password}</p>
    </div>

    <p style="font-size: 16px; color: #333;">
      Please keep this information safe and secure. You can now log in to the system and begin managing orders and customer interactions.
    </p>
    <p style="font-size: 16px; color: #333;">We look forward to achieving great things together!</p>

    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
      <p>Warm regards,<br>Your Book & Stationery Shop Team</p>
      <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
    </footer>
  </div>
  `;
}

//function to send verification code
async function sendVerificationCode(
  verificationCode,
  email,
  phone,
  res,
  name,
  next
) {
  const data = { phone: phone, email: email };
  // console.log("✅ data", data); // Debugging log
  // console.log("👉 Type of next in sendVerificationCode:", typeof next);
  try {
    //generate message template
    const message = generateMessageTemplate(verificationCode, name);
    //calling sendEmail function to send email
    await sendEmail({
      email,
      subject: "Your Verification Code",
      message,
    });
    // console.log("✅ isUserExit", isUserExist);
    //sending response
    return res
      .status(200)
      .json(new ApiResponse(200, data, `Verification code sent to ${name}`));
  } catch (error) {
    // console.error("❌ Error in sendVerificationCode:", error);
    return next(new ApiError("Server error.Please try later...!"));
  }
}

/* Code for generating token */
const createAccessToken = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    return { accessToken };
  } catch (error) {
    return next(
      new ApiError(
        "Something went wrong while generating Access token...!",
        500
      )
    );
  }
};

async function sendWelcomeToEmployee(
  employeeId,
  email,
  password,
  res,
  name,
  next
) {
  const data = { employeeId, email };

  try {
    const message = generateEmployeeWelcomeTemplate(
      employeeId,
      name,
      email,
      password
    );

    await sendEmail({
      email,
      subject: "Welcome to Our Shop - Your Employee Credentials",
      message,
    });

    const employee = await User.findOne({ email });

    if (!employee) {
      return next(new ApiError("Server error. Please try again later."));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, employee, `Employee created successfully...!`)
      );
  } catch (error) {
    return next(new ApiError("Server error. Please try again later."));
  }
}

// registration
const userRegistration = AsyncHandler(async (req, res, next) => {
  const { name, email, password, avatar, phone } = req.body;
  // console.log(name, password, email, avatar, phone);

  // 3=Now verify phone format by regex
  function verifyPhone(phone) {
    const phoneRegex = /^(\+92|92|0)?3\d{9}$/;
    return phoneRegex.test(phone);
  }

  //checking if phone number is valid  means
  if (!verifyPhone(phone)) {
    // console.log("❌ Invalid phone number.");

    return next(new ApiError("Please enter a valid phone number", 400));
  }

  try {
    // console.log("try block start");

    //check email is valid or not
    const isEmailValidResponse = await isEmailValid(email);
    console.log("email y");

    //if email is not valid
    if (isEmailValidResponse !== "deliverable") {
      return next(new ApiError("Email is not valid...!", 404));
    }
    // console.log("Email valid result...!", isEmailValidResponse);

    if (!avatar) {
      // console.log("❌ Missing required fields!");
      return next(new ApiError(`All fields are required...!`, 400));
    }
    //upload image to coludinary
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    if (req.body?.role && req.body?.role === "employee") {
      //checking data comes or not
      if (!name || !email || !phone) {
        // console.log("❌ Missing required fields!");
        return next(new ApiError(`All fields are required...!`, 400));
      }
      // Check if employeeId is provided and role is employee
      const existingEmployee = await User.findOne({ email, role: "employee" });
      // console.log(existingEmployee);

      if (existingEmployee) {
        return next(
          new ApiError(
            "Employee with this ID or email already exists. Please use a different ID or email.",
            400
          )
        );
      }

      // Generate random 8-character password
      const generateSecurePassword = () => {
        return Math.random().toString(36).slice(-8);
      };

      // Generate 10-digit employee ID
      const generateEmployeeId = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
      };

      const plainPassword = generateSecurePassword();
      const genSaltRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, genSaltRound);

      let employeeId = generateEmployeeId();
      //employee data
      const employeeData = {
        name,
        email,
        password: hashedPassword,
        phone,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        employeeId,
        accountVerified: true,
        role: req.body?.role || "employee",
      };

      //Creating new employee
      const employee = await User.create(employeeData);

      //check user created or not
      if (!employee) {
        await cloudinary.v2.uploader.destroy(myCloud?.public_id);
        // console.log("❌ Failed to create user.");
        return next(
          new ApiError(`Internal Server Error while creating new user...!`, 500)
        );
      }

      await sendWelcomeToEmployee(
        employeeId, // employeeId
        email, // email
        plainPassword, // password
        res,
        name, // name
        next
      );
    } else {
      console.log("yes");

      //checking data comes or not
      if (!name || !email || !password || !phone) {
        // console.log("❌ Missing required fields!");
        return next(new ApiError(`All fields are required...!`, 400));
      }
      console.log("yes2");

      //Checking user already exist or not
      const isUserExist = await User.findOne({ email });
      // console.log(isUserExist);
      // console.log("yes3");

      //check is verified user exist or not
      if (isUserExist && isUserExist.accountVerified) {
        // console.log("❌ User already exists and is verified.");
        return next(new ApiError("User already exists", 400));
      }

      // If the user exists but isn't verified, increment their registration attempts
      if (isUserExist && !isUserExist.accountVerified) {
        // console.log("❌ User exists but is NOT verified.");

        if (isUserExist.registrationAttempts >= 2) {
          // console.log("❌ Too many registration attempts.");
          return next(
            new ApiError(
              "You have exceeded the maximum number of registration attempts. Please try again after one hour.",
              400
            )
          );
        }

        // Increment registration attempts
        isUserExist.registrationAttempts++;

        //delete already existing image if user reregister(when user not verified)
        await cloudinary.v2.uploader.destroy(isUserExist.avatar?.public_id);

        // console.log("✅ Generating verification code...");
        const verificationCode = await isUserExist.generateVerificationCode();
        // console.log(verificationCode);

        await isUserExist.save({ validateBeforeSave: false });
        // console.log(isUserExist.verificationCode);

        // console.log("✅ Sending verification code...");
        sendVerificationCode(verificationCode, email, phone, res, name, next);

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              isUserExist,
              "You have attempted to register before. Please check your email for the verification code."
            )
          );
      }

      //user data
      const userData = {
        name,
        email,
        password,
        phone,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      };
      // console.log("userData", userData);

      // console.log("✅ Creating new user...");
      //Creating new user
      const user = await User.create(userData);
      // console.log(user);

      //check user created or not
      if (!user) {
        console.log("❌ Failed to create user.");
        return next(
          new ApiError(`Internal Server Error while creating new user...!`, 500)
        );
      }

      // console.log("✅ Generating verification code for new user...");
      // 7=generate verification code of 5 digits comes from userModel
      const verificationCode = await user.generateVerificationCode();

      await user.save();
      // console.log(user.verificationCode);

      // 8=send verification code via node mailer with html template
      // console.log("✅ Sending verification email...");
      sendVerificationCode(verificationCode, email, phone, res, name);
    }
  } catch (error) {
    console.log(error.message);

    return next(new ApiError(`${error.message}`, 500));
  }
});

//verify otp
export const verifyOTP = AsyncHandler(async (req, res, next) => {
  const { email, otp, phone } = req.body;
  // console.log(otp, email, phone);

  if (!email || !otp || !phone) {
    return next(new ApiError("Please fill all fields", 400));
  }

  // 3=Now verify phone format by regex
  function verifyPhone(phone) {
    const phoneRegex = /^(\+92|92|0)?3\d{9}$/;
    return phoneRegex.test(phone);
  }

  //checking if phone number is valid  means
  if (!verifyPhone(phone)) {
    return next(new ApiError("Please enter a valid phone number", 400));
  }

  try {
    const userAllEntries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    let user;
    // If there are multiple entries, delete all except the first one and if not then use the first one
    if (userAllEntries.length > 1) {
      user = userAllEntries[0];
      await User.deleteMany({
        _id: { $ne: user._id }, //delete all entries except the first one
        email,
        accountVerified: false,
      });
    } else {
      user = userAllEntries[0];
    }

    // console.log(user);

    //if opt is correct mean otp match with user database otp
    if (user.verificationCode && user.verificationCode !== Number(otp)) {
      return next(new ApiError("Invalid OTP", 400));
    }

    //now code for expiry verification code
    const currentTime = new Date();
    // console.log(currentTime);

    const verificationCodeExpire = new Date(
      user.verificationCodeExpiry
    ).getTime(); //get time of expiry verification code mean this block of code will get the time of expiry verification code from the database and convert it into milliseconds and store it in verificationCodeExpire variable

    // console.log(verificationCodeExpire);

    if (currentTime > verificationCodeExpire) {
      return next(new ApiError("OTP Expired.", 400));
    }

    //if user otp is correct then make account verified
    user.accountVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    user.registrationAttempts = 0;
    await user.save();
    // console.log(user);

    //creating cookie to send
    const { accessToken } = await createAccessToken(user._id, next);
    // console.log(accessToken);

    //options for cookie of accessToken
    const options = {
      expireIn: new Date(
        Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    };
    //send cookie
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          user,
          "User created and verified successfully and direct login to access resources...!"
        )
      );
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
});

// login
const userLogin = AsyncHandler(async (req, res, next) => {
  const { email, password, employeeId } = req.body;

  // Check if it's an employee login
  let user;
  if (employeeId) {
    if (!password) {
      return next(new ApiError(`Please fill all fields for login...!`, 400));
    }
    user = await User.findOne({ employeeId, role: "employee" }).select(
      "+password"
    );
    if (!user) {
      return next(new ApiError("Invalid employee ID or password", 401));
    }
  } else {
    //if email or password is empty or not given
    if (!email || !password) {
      return next(new ApiError(`Please fill all fields for login...!`, 400));
    }
    // Login for user or admin with email
    user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ApiError("Invalid email or password", 401));
    }
  }

  // Check if account is verified
  if (!user.accountVerified) {
    return next(
      new ApiError("Please verify your account before logging in", 403)
    );
  }

  // Check password
  const isPasswordMatched = await user.comparePassword(password);
  // console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new ApiError("Invalid credentials", 401));
  }

  if (user?.isSuspended === true) {
    return next(new ApiError("Your are suspended by admin...!", 401));
  }

  //creating cookie to send
  const { accessToken } = await createAccessToken(user._id, next);

  //options for cookie of accessToken
  const options = {
    expireIn: new Date(
      Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, user, "Logged In successfully...!"));
});

//user logout
const userLogout = AsyncHandler(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // clear secure cookie in production
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "SuccessFully logged out...!"));
});

//getting user details
const userDetails = AsyncHandler(async (req, res, next) => {
  // console.log(req.user);

  try {
    if (!req.user) {
      return next(new ApiError("User not found with this id...!", 404));
    }
    const user = req.user;

    return res.status(200).json(new ApiResponse(200, user, "User Details...!"));
  } catch (error) {
    console.log("userDetails error", error);
    return next(
      new ApiError("Something went wrong while getting user details...!", 500)
    );
  }
});

//update user profile
const updateProfile = AsyncHandler(async (req, res, next) => {
  // console.log(req.body.oldAvatarId);
  try {
    //Data which will update
    const userNewData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    //destroy old image
    if (req.body?.oldAvatarId) {
      await cloudinary.v2.uploader.destroy(req.body.oldAvatarId);
      //upload image to coludinary
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      userNewData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      userNewData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    //creating cookie to send
    const { accessToken } = await createAccessToken(updatedUser._id, next);

    //options for cookie of accessToken
    const options = {
      expireIn: new Date(
        Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, updatedUser, `User updated successfully...!`));
  } catch (error) {
    return next(
      new ApiError("Something went wrong while updatinging profile...!", 500)
    );
  }
});

//update user password
const updatePassword = AsyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  // console.log(oldPassword, newPassword, confirmPassword);

  //if any field is empty
  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new ApiError(`Please fill all fields...!`, 400));
  }

  try {
    //getting user who want to update password by using req.user._id from middleware
    const user = await User.findById(req.user._id).select("+password");
    // console.log("user", user);

    //comparing oldPassword with already exist password
    const isOldPasswordCorrect = await user.comparePassword(oldPassword);
    // console.log("isOldPasswordCorrect", isOldPasswordCorrect);

    //if oldPAssword is not matched
    if (!isOldPasswordCorrect) {
      return next(new ApiError(`Incorrect OldPassword...!`, 400));
    }

    //checking newPassword and confirmPassword are same
    if (newPassword !== confirmPassword) {
      return next(
        new ApiError(`NewPassword and ConfirmPassword must be same...!`, 400)
      );
    }

    user.password = newPassword;
    //saving new password
    await user.save();
    // console.log(user);

    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "User password updated successfully...!")
      );
  } catch (error) {
    // console.log("error", error);

    return next(
      new ApiError("Something went wrong while updatinging password...!", 500)
    );
  }
});

//user delete
const deleteAccount = AsyncHandler(async (req, res, next) => {
  //getting user who want to delete account by using req.user._id from middleware
  const user = await User.findByIdAndDelete(req.user._id);
  // console.log(user);

  if (!user) {
    return next(new ApiError("User not found with this id...!", 404));
  }

  // Clear the authentication cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User deleted successfully...!"));
});

//for forgot password
const forgotPassword = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  // console.log(req.protocol + "   " + req.get("host"));

  try {
    //checking user exist or not
    const user = await User.findOne({
      email,
    });

    //if user not found
    if (!user) {
      return next(new ApiError(`User not found with this email...!`, 404));
    }

    //generating reset token
    const resetPasswordToken = await user.generateResetPasswordToken();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000; //10 minutes
    await user.save({ validateBeforeSave: false });

    const frontendUrl = process.env.FRONTEND_URL;

    //making url on which we send email
    const resetPasswordUrl = `${frontendUrl}/user/password/reset/${resetPasswordToken}`;

    //calling sendEmail function to send email with resetPassworUrl
    await sendEmail({
      email,
      subject: "RESET PASSWORD",
      message: `<p>Click <a href="${resetPasswordUrl}">here</a> to reset your password. This link expires in 10 minutes.\n\nIf you have not requested this email then, please ignore it.</p>`,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Reset password link sent to your email...!"));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError("Something went wrong while reseting password...!")
    );
  }
});

//for reset password
const resetPassword = AsyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    //first of all check tokenis come or not
    if (!token) {
      return next(new ApiError(`Token required...!`, 400));
    }

    //getting user by token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }, //if token expiry date available then check it
    });

    //now check user exist or not
    if (!user) {
      return next(new ApiError(`Invalid or Expired Token...!`, 400));
    }

    //now check passwords given or not
    if (!newPassword || !confirmPassword) {
      return next(new ApiError(`Please fill all fields...!`, 400));
    }

    //now check passwords are matched or not
    if (newPassword !== confirmPassword) {
      return next(
        new ApiError(`NewPassword and ConfirmPassword must be same...!`, 400)
      );
    }

    //now update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Password reset successfully...!"));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError("Something went wrong while reseting password...!")
    );
  }
});

//get all users --->Admin
const getAllUsers = AsyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" }, "-password").sort({
      createdAt: -1,
    });
    if (!users) {
      return next(new ApiError(`Users not found...!`, 404));
    }

    return res.status(200).json(new ApiResponse(200, users, `All Users...!`));
  } catch (err) {
    console.error("Error fetching users:", err);
    return next(
      new ApiError("Something went wrong while fetching users...!", 500)
    );
  }
});

//get all employees --->Admin
const getAllEmployees = AsyncHandler(async (req, res, next) => {
  try {
    const employees = await User.find({ role: "employee" }, "-password").sort({
      createdAt: -1,
    });
    if (!employees) {
      return next(new ApiError(`Employees not found...!`, 404));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, employees, `All Employees...!`));
  } catch (err) {
    console.error("Error fetching users:", err);
    return next(
      new ApiError("Something went wrong while fetching employees...!", 500)
    );
  }
});

//getting single user --->Admin
const getSingleUser = AsyncHandler(async (req, res, next) => {
  try {
    // getting single user by req.params.id
    const singleUser = await User.findById(req.params.id);
    if (!singleUser) {
      return next(new ApiError("User not found with this id...!", 404));
    }
    res.status(200).json(new ApiResponse(200, singleUser, `Single User...!`));
  } catch (error) {
    return next(new ApiError("Server error while fetching user...!", 500));
  }
});

//update user's role --->Admin
const updateUser = AsyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return next(new ApiError("User not found with this id...!", 404));
    }

    const newRole = req.body?.role || user?.role;

    // If changing from employee to any other role, remove employeeId
    if (user.role === "employee" && newRole !== "employee") {
      user.employeeId = undefined;
    }

    user.role = newRole;
    await user.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, user, `${user?.name}'s role updated successfully`)
      );
  } catch (err) {
    console.error("Error fetching user:", err);
    return next(new ApiError("Server error while updating user...!", 500));
  }
});

//Delete User --->Admin
const deleteUser = AsyncHandler(async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(new ApiError(`User not found...!`, 404));
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, `${deletedUser?.name} deleted Successfully...!`)
      );
  } catch (error) {
    return next(
      new ApiError(`something went wrong while deleting user...!`, 500)
    );
  }
});

//to suspend user ---> admin
const suspendUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Find the user by ID and suspend it
    const user = await User.findById(id);

    if (!user) {
      return next(new ApiError(`User not found...!`, 404));
    }

    user.isSuspended = true;
    await user.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, user, `${user?.name} sespended successfully...!`)
      );
  } catch (err) {
    console.error("Error deleting user:", err);
    return next(
      new ApiError(`something went wrong while suspend user...!`, 500)
    );
  }
};

//to suspend user ---> admin
const unSuspendUSer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the user by ID and suspend it
    const user = await User.findById(id);

    if (!user) {
      return next(new ApiError(`User not found...!`, 404));
    }

    user.isSuspended = false;
    await user.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, user, `${user?.name} unspended successfully...!`)
      );
  } catch (err) {
    console.error("Error deleting user:", err);
    return next(
      new ApiError(`something went wrong while unsuspend user...!`, 500)
    );
  }
};

export {
  userRegistration,
  userLogin,
  userLogout,
  updateProfile,
  userDetails,
  updatePassword,
  deleteAccount,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  suspendUser,
  unSuspendUSer,
  getAllEmployees,
};
