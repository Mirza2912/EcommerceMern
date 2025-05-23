import { body, query } from "express-validator";

//validate getAllProducts
const getAllProductsValidation = [
  query("keyword")
    .optional()
    .isString()
    .withMessage("Keyword must be a string"),
  query("minPrice")
    .optional()
    .isNumeric()
    .withMessage("Min price must be a number"),
  query("maxPrice")
    .optional()
    .isNumeric()
    .withMessage("Max price must be a number"),
  query("stock")
    .optional()
    .isBoolean()
    .withMessage("Stock must be true or false"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];

//validate createProduct
const createProductValidation = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gte: 0 })
    .withMessage("Price must be greater than 0"),
  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be  a number"),
  body("isReturnAble")
    .optional()
    .isBoolean()
    .withMessage("isReturnAble must be boolean"),
  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be boolean"),
  body("isBannerProduct")
    .optional()
    .isBoolean()
    .withMessage("isBannerProduct must be boolean"),
  body("productDetails")
    .optional()
    .isObject()
    .withMessage("productDetails must be an object"),
];

//validate updateProduct
const updateProductValidation = [
  query("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID format"),
  body("name").optional().notEmpty().withMessage("Product name is required"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  body("price")
    .optional()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gte: 0 })
    .withMessage("Price must be greater than 0"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer")
    .isBoolean()
    .withMessage("Stock must be true or false"),
  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be between 0 and 100"),
  body("isReturnAble")
    .optional()
    .isBoolean()
    .withMessage("isReturnAble must be boolean"),
  body("isBannerProduct")
    .optional()
    .isBoolean()
    .withMessage("isBannerProduct must be boolean"),
  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be boolean"),
  body("productDetails")
    .optional()
    .isObject()
    .withMessage("productDetails must be an object"),
];

const singleProductValidation = [
  query("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID format"),
];

export {
  getAllProductsValidation,
  createProductValidation,
  updateProductValidation,
  singleProductValidation,
};
