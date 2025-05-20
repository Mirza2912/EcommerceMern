import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  singleProductDetails,
  getFeaturedProducts,
  getBannerProducts,
  getRecentAdded,
  getAdminProducts,
} from "../controllers/product.controller.js";
import {
  createProductValidation,
  deleteProductValidation,
  getAllProductsValidation,
  singleProductValidation,
  updateProductValidation,
} from "../validations/product.validations.js";
import { validate } from "../validations/validate.errors.js";
import {
  isAuthenticatedUser,
  isAuthorizedRoles,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllProductsValidation, validate, getAllProducts);

router
  .route("/single-product/:id")
  .get(singleProductValidation, singleProductDetails);
router.route("/featured-products").get(getFeaturedProducts);
router.route("/recent-products").get(getRecentAdded);
router.route("/banner-products").get(getBannerProducts);

/* ADMIN ROUTES */
router
  .route("/admin/products")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAdminProducts);
router
  .route("/create")
  .post(
    isAuthenticatedUser,
    isAuthorizedRoles("admin"),
    createProductValidation,
    validate,
    createProduct
  );
router
  .route("/updateProduct/:id")
  .put(
    isAuthenticatedUser,
    isAuthorizedRoles("admin"),
    updateProductValidation,
    validate,
    updateProduct
  );
router
  .route("/deleteProduct/:id")
  .delete(
    isAuthenticatedUser,
    isAuthorizedRoles("admin"),
    deleteProductValidation,
    validate,
    deleteProduct
  );

export default router;
