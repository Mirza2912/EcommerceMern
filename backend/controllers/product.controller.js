import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

//get all products from Product model
const getAllProducts = AsyncHandler(async (req, res) => {
  // const products = await Product.find();
  // console.log(products);

  //How many products we want to show in one page
  const productsPerPage = 8;

  //total products
  const productCount = await Product.countDocuments();
  // console.log(productCount);

  //This hold new instance of ApiFeature class and tis hold all feature of ApiFeature class
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .Search()
    .filter()
    .pagination(productsPerPage);

  //in this code we call find method on the basis of keyword which we defined in ApiFeature class
  const products = await apiFeature.query;

  // //calling pagination(productsPerPage) it will return only limited pages which we want
  // apiFeature.pagination(productsPerPage);

  // //again call api.feature.query it will return all product with all filters and limit
  // products = await apiFeature.query;
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { productCount, products },
        "All Searched  Products...!"
      )
    );
});

//getting product details(single)
const singleProductDetails = AsyncHandler(async (req, res, next) => {
  const singleProduct = await Product.findById(req.params.id);

  if (!singleProduct) {
    return next(
      new ApiError(`Product with id:${req.params.id} is not found...!`, 404)
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, singleProduct, "Single Product Details...!"));
});

//Create products in product model
const createProduct = AsyncHandler(async (req, res) => {
  // const { name, description, category, price } = req.body;
  // console.log(name, description, category, price);

  const data = req.body;
  const newProduct = await Product.create(data);
  // console.log(newProduct);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newProduct,
        `Product with ${newProduct.name} is created successfully...!`
      )
    );
});

//Update specific product
const updateProduct = AsyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);

  const updateData = req.body;
  console.log(updateData);

  const product = await Product.findById(productId);
  console.log(product);

  if (!product) {
    return next(
      new ApiError(`Product with id:${productId} is not found...!`, 404)
    );
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    product._id,
    updateData,
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProduct,
        `Product updated with ${product.name} name successfully...!`
      )
    );
});

//deleting specific product
const deleteProduct = AsyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);

  const product = await Product.findById(productId);
  console.log(product);

  if (!product) {
    return next(
      new ApiError(`Product with id:${productId} is not found...!`, 404)
    );
  }

  const deletedProduct = await Product.findByIdAndDelete(product._id);
  console.log(deleteProduct);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedProduct,
        `Product deleted with ${product.name} name successfully...!`
      )
    );
});
export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProductDetails,
};
