import { Router } from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import {
  addItemToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import {
  addToCartValidation,
  deleteCartValidation,
  updateCartValidation,
} from "../validations/cart.validations.js";

const router = Router();

router
  .route("/addItemToCart")
  .post(isAuthenticatedUser, addToCartValidation, addItemToCart);

router.route("/").get(isAuthenticatedUser, getCart);

router
  .route("/update-cart")
  .put(isAuthenticatedUser, updateCartValidation, updateCartItem);

router
  .route("/delete-cartItem/:id")
  .delete(isAuthenticatedUser, deleteCartValidation, removeCartItem);

router.route("/clear-cart").delete(isAuthenticatedUser, clearCart);

export default router;
