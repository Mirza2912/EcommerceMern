import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  singleProductDetails,
  getFeaturedProducts,
  getAllCategory,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(getAllProducts);
router.route("/product-categories").get(getAllCategory);
router.route("/single/:id").get(singleProductDetails);
router.route("/featured-products").get(getFeaturedProducts);
router.route("/create").post(createProduct);
router.route("/updateProduct/:id").put(updateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);

export default router;
