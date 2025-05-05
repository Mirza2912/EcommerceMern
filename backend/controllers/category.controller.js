import { ProductCategory } from "../models/productCategory.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

//get all category
const getAllCategory = AsyncHandler(async (req, res, next) => {
  const categories = await ProductCategory.find().populate(
    "maker",
    "name email"
  );
  // console.log(categories);

  if (!categories) {
    return next(new ApiError(`Categories not found...!`, 500));
  }

  res
    .status(200)
    .json(new ApiResponse(200, { categories }, `All Categories...!`));
});

export { getAllCategory };
