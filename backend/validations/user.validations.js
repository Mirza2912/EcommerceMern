import { body, query } from "express-validator";

const loginUserValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const registerUserValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("phone")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits long")
    .isNumeric()
    .withMessage("Phone number must be numeric"),
];

const verifyOtp = [
  body("otp")
    .isLength({ min: 5, max: 5 })
    .withMessage("OTP must be 5 digits long")
    .isNumeric()
    .withMessage("OTP must be numeric"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("phone")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits long"),
];

const forgotPasswordValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
];

const updateUserProfileValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("phone")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits long")
    .isNumeric()
    .withMessage("Phone number must be numeric"),
];

const resetUserPassword = [
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New Password must be at least 8 characters long"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Confirm Password must be at least 8 characters long"),
];

const changeUserPasswordValidation = [
  body("oldPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New Password must be at least 8 characters long"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Confirm Password must be at least 8 characters long"),
];

const viewUserSingle = [
  query("id").isMongoId().withMessage("Invalid User ID format"),
];

export {
  loginUserValidation,
  registerUserValidation,
  forgotPasswordValidation,
  updateUserProfileValidation,
  changeUserPasswordValidation,
  viewUserSingle,
  verifyOtp,
  resetUserPassword,
};
