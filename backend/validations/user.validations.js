import { body, oneOf, query } from "express-validator";

const loginUserValidation = [
  oneOf(
    [
      // For User/Admin login with email + password
      [
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
          .isLength({ min: 8 })
          .withMessage("Password must be at least 8 characters long"),
      ],
      // For Employee login with employeeId + password
      [
        body("employeeId")
          .isLength({ min: 10, max: 10 })
          .withMessage("Employee ID must be exactly 10 digits"),
        body("password")
          .isLength({ min: 8 })
          .withMessage("Password must be at least 8 characters long"),
      ],
    ],
    "Either email or employeeId with a valid password is required"
  ),
];

const registerUserValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("role")
    .optional()
    .isIn(["user", "admin", "employee"])
    .withMessage("Role must be either user, admin, or employee"),
  // Password is required for user/admin, not employee
  body("password")
    .if(body("role").not().equals("employee"))
    .notEmpty()
    .withMessage("Password is required for user/admin")
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
  body("email").optional().isEmail().withMessage("Invalid Email"),
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("phone")
    .optional()
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
