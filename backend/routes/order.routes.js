import { Router } from "express";
import {
  allOrders,
  getAllOrders,
  newOrder,
  singleOrder,
  updateOrder,
} from "../controllers/order.controller.js";
import {
  isAuthenticatedUser,
  isAuthorizedRoles,
} from "../middlewares/auth.middleware.js";
import { createOrderValidation } from "../validations/order.validations.js";
import { validate } from "../validations/validate.errors.js";
const router = Router();

//Route for placing/creating new order
router
  .route("/new")
  .post(isAuthenticatedUser, createOrderValidation, validate, newOrder);

//get all orders of loggedIn user
router.route("/allOrders").get(isAuthenticatedUser, allOrders);

//get single order of loggedIn user
router.route("/singleOrder/:id").get(isAuthenticatedUser, singleOrder);

//getting all orders --->Admin
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllOrders);

//update single order --->Admin
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, isAuthorizedRoles("admin", updateOrder));

export default router;
