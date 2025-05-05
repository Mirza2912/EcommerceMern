import { Router } from "express";
import { getAllCategory } from "../controllers/category.controller.js";

const router = Router();

router.route("/").get(getAllCategory);

export default router;
