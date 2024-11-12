import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required...!"],
      min: [3, "Name must be at least of 3 characters...!"],
      max: [50, "Name must be not exceed to 50 characters...!"],
      trim: true,
      // unique: [true, "Name must be unique...!"],
    },
    email: {
      type: String,
      required: [true, "Email is required...!"],
      trim: true,
      unique: [true, "email must be unique...!"],
      validate: [validator.isEmail, "Invalid email...!"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, "Password must be at least of 8 characters...!"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: [true, "public_id is required...!"],
        default: "atdysdyfutduyf",
      },
      url: {
        type: String,
        required: [true, "URL is required...!"],
        default: "cytsrtxcfydtfytd",
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

//Hashing user password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    //if password modified(update) then this code will execute
    const genSaltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, genSaltRound);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

//Comparing password when login
userSchema.methods.comparePassword = async function (password) {
  const isPassword = await bcrypt.compare(password, this.password);
  //   console.log(isPassword);
  return isPassword;
};

//Creating jsonWebToken for user
userSchema.methods.generateAccessToken = async function () {
  try {
    const accessToken = await jwt.sign(
      {
        _id: this._id,
        email: this.email,
        name: this.name,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    return accessToken;
  } catch (error) {
    console.log(`Error while generating accessToken : ${error}`);
  }
};

export const User = model("User", userSchema);
