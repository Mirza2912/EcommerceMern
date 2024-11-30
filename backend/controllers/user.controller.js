import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import cloudinary from "cloudinary";

/* Code for generating token */
const createAccessToken = async (userId) => {
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

//user registration
const userRegistration = AsyncHandler(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  // console.log(myCloud.public_id);

  const { name, email, password, avatar } = req.body;
  // console.log(name, password, email, avatar);
  // console.log(name, email, password, role);

  //checking data comes or not
  if (
    [name, email, password, avatar].some((field) => {
      field?.trim() === "";
    })
  ) {
    return next(new ApiError(`All fields are required...!`, 400));
  }

  //Checking user already exist or not
  const isUserExist = await User.findOne({ email });
  //If user already exist
  if (isUserExist) {
    return next(
      new ApiError(
        `User with these credentials is already registered. So, you can direct login...!`,
        400
      )
    );
  }

  //Creating new user
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  //check user created or not
  if (!user) {
    return next(
      new ApiError(`Internal Server Error while creating new user...!`, 500)
    );
  }

  //options for cookie of accessToken
  const options = {
    expireIn: new Date(
      Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };
  const { accessToken } = await createAccessToken(user._id);

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(201, user, `User created successfully...!`));
});

//User login
const userLogin = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //   console.log(email, password);

  //if email or password is empty or not given
  if (!(email || password)) {
    return next(new ApiError(`Please fill all fields for login...!`, 400));
  }

  //if given email and password then this code will execute
  const user = await User.findOne({ email }).select("+password");
  // console.log(user);

  //if user not find
  if (!user) {
    return next(new ApiError(`Please register before login...!`, 401));
  }

  //Comparing password which user give
  const isPasswordCorrect = await user.comparePassword(password);
  //   console.log(isPasswordCorrect);

  //if password not correct
  if (!isPasswordCorrect) {
    return next(new ApiError(`Invalid Credentials...!`, 401));
  }

  //options for cookie of accessToken
  const options = {
    expireIn: new Date(
      Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  //creating cookie to send
  const { accessToken } = await createAccessToken(user._id);

  return res.status(200).cookie("accessToken", accessToken, options).json(
    new ApiResponse(
      200,
      {
        user,
        accessToken,
      },
      "User logged In successfully...!"
    )
  );
});

//user logout
const userLogout = AsyncHandler(async (req, res, next) => {
  res.cookie("accessToken", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "SuccessFully logged out...!"));
});

//getting user details
const userDetails = AsyncHandler(async (req, res, next) => {
  // fetching _id of user who want to access details from req.user which we set in middleware
  const { _id } = req.user;

  const user = await User.findById(_id);
  // console.log(user);

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User Details...!"));
});

//update user profile
const updateProfile = AsyncHandler(async (req, res, next) => {
  //Data which will update
  const userNewData = {
    name: req.body.name,
    email: req.body.email,
  };

  const updatedUser = await User.findByIdAndUpdate(req.user._id, userNewData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res
    .status(200)
    .json(new ApiResponse(200, {}, `User updated successfully...!`));
});

//update user password
const updatePassword = AsyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  //getting user who want to update password by using req.user._id from middleware
  const user = await User.findById(req.user._id).select("+password");

  //comparing oldPassword with already exist password
  const isOldPasswordCorrect = await user.comparePassword(oldPassword);

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

  //if both are same
  user.password = confirmPassword;
  //saving new password
  await user.save();

  //options for cookie of accessToken
  const options = {
    expireIn: new Date(
      Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  //creating cookie to send
  const { accessToken } = await createAccessToken(user._id);

  return res.status(200).cookie("accessToken", accessToken, options).json(
    new ApiResponse(
      200,
      {
        user,
        accessToken,
      },
      "User password updated successfully...!"
    )
  );
});

//get all users --->Admin
const getAllUsers = AsyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(new ApiResponse(200, users, `All Users...!`));
});

//getting single user --->Admin
const getSingleUser = AsyncHandler(async (req, res, next) => {
  // getting single user by req.params.id
  const singleUser = await User.findById(req.params.id);
  res.status(200).json(new ApiResponse(200, singleUser, `Single User...!`));
});

//update user's role --->Admin
const updateUser = AsyncHandler(async (req, res, next) => {
  //getting data from admin but in frontend admin will only able to change role not name and email
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  //update user's role --->Admin
  const updatedUser = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updateUser, `Updated Role Successfully...!`));
});

//Delete User --->Admin
const deleteUser = AsyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json(new ApiResponse(200, deleteUser, `User Deleted Successfully...!`));
});
export {
  userRegistration,
  userLogin,
  userLogout,
  updateProfile,
  userDetails,
  updatePassword,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
