import { Router } from "express";
import {
  deleteAccount,
  deleteUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getSingleUser,
  updatePassword,
  updateProfile,
  updateUser,
  userDetails,
  userLogin,
  userLogout,
  userRegistration,
  verifyOTP,
  suspendUser,
  unSuspendUSer,
} from "../controllers/user.controller.js";
import {
  isAuthenticatedUser,
  isAuthorizedRoles,
} from "../middlewares/auth.middleware.js";
import {
  changeUserPasswordValidation,
  forgotPasswordValidation,
  loginUserValidation,
  registerUserValidation,
  resetUserPassword,
  updateUserProfileValidation,
  verifyOtp,
} from "../validations/user.validations.js";
import { validate } from "../validations/validate.errors.js";

const router = Router();

// for registration
router
  .route("/register")
  .post(registerUserValidation, validate, userRegistration);
//verify otp
router.route("/opt-verification").post(verifyOtp, validate, verifyOTP);
// for login
router.route("/login").post(loginUserValidation, validate, userLogin);
// for logout
router.route("/logout").get(userLogout);
// for user details
router.route("/me").get(isAuthenticatedUser, userDetails);
// for update user profile
router
  .route("/me/profile/update")
  .put(
    isAuthenticatedUser,
    updateUserProfileValidation,
    validate,
    updateProfile
  );
// for update user password
router
  .route("/me/password/update")
  .put(
    isAuthenticatedUser,
    changeUserPasswordValidation,
    validate,
    updatePassword
  );
// for forgot password
router
  .route("/password/forgot")
  .post(forgotPasswordValidation, validate, forgotPassword);
// for reset password
router
  .route("/user/password/reset/:token")
  .post(resetUserPassword, validate, resetPassword);
// for delete account
router.route("/me/delete/account").delete(isAuthenticatedUser, deleteAccount);

// for getting all users --->Admin
router
  .route("/admin/users")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllUsers);

// for getting single users --->Admin
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteUser);

// for suspend user --->Admin
router
  .route("/admin/user/suspend/:id")
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), suspendUser);

// for un-suspend user --->Admin
router
  .route("/admin/user/un-suspend/:id")
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), unSuspendUSer);

export default router;
