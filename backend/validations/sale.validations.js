import { body } from "express-validator";

const createPhysicalSaleValidation = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Order items must be a non-empty array"),

  body("items.*.name").notEmpty().withMessage("Each item must have a name"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Each item must have a quantity of at least 1"),

  body("items.*.price")
    .isNumeric()
    .withMessage("Each item must have a valid price"),

  body("totalAmount")
    .notEmpty()
    .withMessage("Total price is required")
    .isNumeric()
    .withMessage("Total price must be a number"),

  body("customerName")
    .optional()
    .isString()
    .withMessage("Customer name must be a string"),

  body("customerNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Customer number must be a valid mobile number"),
];

export { createPhysicalSaleValidation };
