import { Router } from "express";
import {
  deleteUser,
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
} from "../controllers/user.controller.js";
import {
  isAuthenticatedUser,
  isAuthorizedRoles,
} from "../middlewares/auth.middleware.js";

const router = Router();

// for registration
router.route("/register").post(userRegistration);
//verify otp
router.route("/opt-verification").post(verifyOTP);
// for login
router.route("/login").post(userLogin);
// for logout
router.route("/logout").get(userLogout);
// for user details
router.route("/user").get(isAuthenticatedUser, userDetails);
// for update user profile
router.route("/user/updateProfile").put(isAuthenticatedUser, updateProfile);
// for update user password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
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
export default router;
