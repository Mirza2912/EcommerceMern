import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  singleProductDetails,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(singleProductDetails);
router.route("/create").post(createProduct);
router.route("/updateProduct/:id").put(updateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);

export default router;