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

const createCategory = AsyncHandler(async (req, res, next) => {
  const { category } = req.body;
  const maker = req.user._id;

  if (!category) {
    return next(new ApiError(`Category is required...!`, 400));
  }

  const iscategoryExist = await ProductCategory.findOne({ category });

  if (iscategoryExist) {
    return next(new ApiError(`${category} is already exist...!`, 400));
  }

  let newCategory = await ProductCategory.create({
    category,
    maker,
  });

  if (!newCategory) {
    return next(
      new ApiError(`Something went wrong to create new category...!`, 500)
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { categories: newCategory }, `All Categories...!`)
    );
});
export { getAllCategory, createCategory };
