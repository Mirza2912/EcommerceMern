import express from "express";
import {
  sendStripeApiKey,
  processPayment,
} from "../controllers/payment.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router();

export default router;

router.post("/processPayment", isAuthenticatedUser, processPayment);
router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);
