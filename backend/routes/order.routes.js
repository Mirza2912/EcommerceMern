import { Router } from "express";
import {
  allOrders,
  deleteOrderAdmin,
  getAllOrders,
  getOrderByIdAdmin,
  newOrder,
  singleOrder,
  updateOrderStatus,
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

//get single order --->Admin
router
  .route("/admin/single-order/:id")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getOrderByIdAdmin);

//delete single order --->Admin
router
  .route("/admin/single-order/delete/:id")
  .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteOrderAdmin);

//update single order status --->Admin
router
  .route("/admin/single-order/update/:id")
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), updateOrderStatus);

export default router;
