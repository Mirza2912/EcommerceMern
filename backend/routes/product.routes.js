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
  addToFeatured,
  makeUnFeatured,
  getRelatedProducts,
  getEmployeeAllProducts,
} from "../controllers/product.controller.js";
import {
  createProductValidation,
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
router.route("/admin/create-new-product").post(
  isAuthenticatedUser,
  isAuthorizedRoles("admin"),
  // createProductValidation,
  // validate,
  createProduct
);
router
  .route("/admin/updateProduct/:id")
  .put(
    isAuthenticatedUser,
    isAuthorizedRoles("admin"),
    updateProductValidation,
    validate,
    updateProduct
  );
router.route("/deleteProduct/:id").delete(
  isAuthenticatedUser,
  isAuthorizedRoles("admin"),

  validate,
  deleteProduct
);

router
  .route("/make-feature-product/:id")
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), addToFeatured);

router
  .route("/make-product-unfeatured/:id")
  .put(isAuthenticatedUser, isAuthorizedRoles("admin"), makeUnFeatured);

router.route("/related-products/:id").get(getRelatedProducts);

//Employee Routes
router
  .route("/employee/products")
  .get(isAuthenticatedUser, getEmployeeAllProducts);

export default router;
