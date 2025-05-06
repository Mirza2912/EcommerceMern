import { Router } from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller.js";
import {
  isAuthenticatedUser,
  isAuthorizedRoles,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllCategory);
router
  .route("/create")
  .post(isAuthenticatedUser, isAuthorizedRoles("admin"), createCategory);

export default router;
