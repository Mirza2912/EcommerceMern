import express from "express";
import {
  deleteContact,
  getAllContact,
  singleContactDetails,
  submitContactForm,
} from "../controllers/contact.controller.js";
import {
  isAuthenticatedUser,
  isAuthorizedRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/new").post(isAuthenticatedUser, submitContactForm);

router
  .route("/")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllContact);

router
  .route("/single-contact/:id")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), singleContactDetails);

router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteContact);

export default router;
