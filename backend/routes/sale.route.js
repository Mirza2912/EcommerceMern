import { Router } from "express";
import {
  cancelMySale,
  createPhysicalOrder,
  deleteSingleSale,
  getAllSales,
  getMyPhysicalSales,
  getMySaleSummary,
  getSalesOfEmployee,
  getSingleSale,
  getSingleSaleEmployee,
  returnPhysicalSale,
} from "../controllers/sale.controller.js";
import { createPhysicalSaleValidation } from "../validations/sale.validations.js";
import { validate } from "../validations/validate.errors.js";
import {
  isAuthenticatedUser,
  isAuthorizedRoles,
} from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/create-physical-sale")
  .post(
    isAuthenticatedUser,
    isAuthorizedRoles("employee"),
    createPhysicalSaleValidation,
    validate,
    createPhysicalOrder
  );

router
  .route("/")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getAllSales);

router
  .route("/my-sales")
  .get(isAuthenticatedUser, isAuthorizedRoles("employee"), getMyPhysicalSales);

router
  .route("/single-sale/:id")
  .get(
    isAuthenticatedUser,
    isAuthorizedRoles("employee"),
    getSingleSaleEmployee
  );

router
  .route("/admin/single-sale/:id")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getSingleSale);

router
  .route("/my-sales/cancel/:id")
  .delete(isAuthenticatedUser, isAuthorizedRoles("employee"), cancelMySale);

router
  .route("/summary")
  .get(isAuthenticatedUser, isAuthorizedRoles("employee"), getMySaleSummary);

router
  .route("/return-sale/:id")
  .put(isAuthenticatedUser, isAuthorizedRoles("employee"), returnPhysicalSale);

router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, isAuthorizedRoles("admin"), deleteSingleSale);

router
  .route("/admin/get-single-employee-sales/:id")
  .get(isAuthenticatedUser, isAuthorizedRoles("admin"), getSalesOfEmployee);

export default router;
