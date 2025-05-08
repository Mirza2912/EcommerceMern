import { body } from "express-validator";

const createOrderValidation = [
  // Shipping Info
  body("shippingInfo.address")
    .notEmpty()
    .withMessage("Shipping address is required."),
  body("shippingInfo.city")
    .notEmpty()
    .withMessage("Shipping city is required."),
  body("shippingInfo.state")
    .notEmpty()
    .withMessage("Shipping state is required."),
  body("shippingInfo.country")
    .notEmpty()
    .withMessage("Shipping country is required."),
  body("shippingInfo.postalCode")
    .isNumeric()
    .withMessage("Postal code must be a number.")
    .notEmpty()
    .withMessage("Postal code is required."),
  body("shippingInfo.phoneNo")
    .isNumeric()
    .withMessage("Phone number must be a number.")
    .notEmpty()
    .withMessage("Phone number is required."),

  // Order Items
  body("orderItems")
    .isArray({ min: 1 })
    .withMessage("At least one order item is required."),
  body("orderItems.*.name").notEmpty().withMessage("Product name is required."),
  body("orderItems.*.quantity")
    .isNumeric()
    .withMessage("Product quantity must be a number.")
    .notEmpty(),
  body("orderItems.*.price")
    .isNumeric()
    .withMessage("Product price must be a number.")
    .notEmpty(),
  body("orderItems.*.item")
    .isMongoId()
    .withMessage("Product ID must be a valid Mongo ID.")
    .notEmpty(),
  body("orderItems.*.image.url")
    .isURL()
    .withMessage("Image URL must be valid.")
    .notEmpty()
    .withMessage("Image URL is required."),

  // Payment
  body("paymentMethod")
    .isIn(["COD", "CARD"])
    .withMessage("Payment method must be either COD or CARD.")
    .notEmpty(),

  // Prices
  body("itemsPrice")
    .isNumeric()
    .withMessage("Items price must be a number.")
    .notEmpty(),
  body("taxPrice")
    .optional()
    .isNumeric()
    .withMessage("Tax price must be a number.")
    .notEmpty(),
  body("shippingPrice")
    .isNumeric()
    .withMessage("Shipping price must be a number.")
    .notEmpty(),
  body("totalPrice")
    .isNumeric()
    .withMessage("Total price must be a number.")
    .notEmpty(),

  // Order Status (optional on creation, default handled in schema)
  body("orderStatus")
    .optional()
    .isString()
    .withMessage("Order status must be a string."),
];

export { createOrderValidation };
