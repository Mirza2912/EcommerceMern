import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ProductCategory } from "../models/product.category.model.js";
import UploadProductImagesCloudinary from "../utils/UploadProductImagesCloudinary.js";
import cloudinary from "cloudinary";

//get all products from Product model
const getAllProducts = AsyncHandler(async (req, res) => {
  //extracting data from query(if user add any filter or search a product)
  const { keyword, minPrice, maxPrice, category, page, stock, rating } =
    req.query;
  // console.log(keyword, minPrice, maxPrice, category, page, stock, rating);

  //creating a query object for apply query on product at the end of all disscussion
  const query = {};

  //if user seacrh a product by name
  if (keyword) {
    query.name = {
      $regex: keyword,
      $options: "i",
    };
  }

  //if user use stock option
  if (stock) {
    // console.log(stock);

    if (stock === "true") {
      // console.log(stock);

      query.stock = { $gt: 0 };
    } else {
      query.stock = { $eq: 0 };
    }
  }

  //if user use rating option
  if (rating) {
    // console.log(rating);

    query.rating = { $gte: Number(rating) };
  }

  //if user add category to get products
  if (category) {
    //if category first we check that given category exist or not
    const categoryObj = await ProductCategory.findOne({ category });
    if (categoryObj) {
      //add category._id because we add feature of caterofgy by ref of category model
      query.category = categoryObj._id;
    } else {
      return next(new ApiError(`Invalid Category...!`, 404));
    }
  }

  //if user filter the products with range of price
  if (minPrice || maxPrice) {
    //creating another object in query oibject for price
    query.price = {};
    if (minPrice) {
      //if minPrice then price will be greater than minPrice
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  //pagination setUp
  //How many products we want to show in one page
  const productsPerPage = 8;
  const productCount = await Product.countDocuments();
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * productsPerPage;

  // Fetch filtered products with pagination
  const products = await Product.find(query)
    .populate("category")
    .limit(productsPerPage)
    .skip(skip);
  //length of filtered products
  let filteredProductCount = products?.length;
  // console.log(filteredProductCount);
  res.status(200).json(
    new ApiResponse(
      200,
      {
        productCount,
        products,
        productsPerPage,
        filteredProductCount,
      },
      "All Searched  Products...!"
    )
  );
});

//getting product details(single)
const singleProductDetails = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // console.log("singleProductsDetails : " + id);

  const singleProduct = await Product.findById(id).populate("category");
  // console.log(singleProduct);

  if (!singleProduct) {
    return next(
      new ApiError(`Product with id:${req.params.id} is not found...!`, 404)
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { singleProduct }, "Single Product Details...!")
    );
});

const getFeaturedProducts = AsyncHandler(async (req, res, next) => {
  const { page } = req.query;
  //How many FeaturedProducts we want to show in one page
  const productsPerPage = 8;

  try {
    const featuredProductsCount = await Product.find({
      isFeatured: true,
    }).countDocuments();
    // console.log("featuredProductsCount : " + featuredProductsCount);

    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * productsPerPage;

    // Fetch filtered products with pagination
    const featuredProducts = await Product.find({
      isFeatured: true,
    })
      .populate("category")
      .skip(skip)
      .limit(productsPerPage);
    // console.log("featuredProducts : " + featuredProducts);

    if (!featuredProducts) {
      return next(new ApiError(`Featured products not found...!`, 500));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { featuredProducts, featuredProductsCount },
          "All Featured Products...!"
        )
      );
  } catch (error) {
    console.log(error);

    return next(
      new ApiError(
        `Something went wrong while fetching featured products...!`,
        500
      )
    );
  }
});

//Create products in product model
const createProduct = AsyncHandler(async (req, res, next) => {
  //later

  const data = req.body;
  // console.log(data);

  // const { images } = req.files;
  // console.log(images);

  try {
    //make sure product will use category by category model
    if (data.category) {
      //if category first we check that given category exist or not
      const categoryObj = await ProductCategory.findOne({
        category: data.category,
      });
      if (categoryObj) {
        //add category._id because we add feature of caterofgy by ref of category model
        data.category = categoryObj._id;
        // console.log(categoryObj.category);
      } else {
        const newCategory = await ProductCategory.create({
          category: data.category,
        });
        if (!newCategory) {
          return next(new ApiError(`Unable to create new category...!`, 404));
        }
        data.category = newCategory._id;
      }
    } else {
      return next(new ApiError(`Category is required...!`, 401));
    }

    //upload images of product on cloudinary
    if (req.files?.images || data?.images) {
      //validation
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      for (let image of req.files.images) {
        if (!allowedFormats.includes(image.mimetype)) {
          return next(
            new ApiError(`Invalid file type: ${image.mimetype}`, 400)
          );
        }
        if (image.size > maxSize) {
          return next(new ApiError("File size exceeds 5MB limit", 400));
        }
      }
      // const imagesArray = Array.isArray(images) ? images : [images];
      // console.log(typeof imagesArray);

      const uploadedImages = await UploadProductImagesCloudinary(req, next);
      // console.log("upploadImages" + uploadedImages);

      data.images = uploadedImages;
    } else {
      return next(new ApiError(`Images are required...!`, 401));
    }

    const newProduct = await Product.create(data);
    if (!newProduct) {
      return next(new ApiError(`Unable to create new product...!`, 500));
    }

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { newProduct },
          `Product with ${newProduct?.name} is created successfully...!`
        )
      );
  } catch (error) {
    // console.log(error);

    return next(
      new ApiError(`Something went wrong while creating product...!`, 500)
    );
  }
});

//Update specific product
const updateProduct = AsyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  // console.log(productId);

  const updateData = req.body;
  // console.log(updateData);
  // const { images } = req.files;
  // console.log(images);

  try {
    const product = await Product.findById(productId);
    // console.log(product);

    if (!product) {
      return next(
        new ApiError(`Product with id:${productId} is not found...!`, 404)
      );
    }

    //if user update images also
    if (req.files?.images || req.body.data?.images) {
      // check image comes from data base or not and also check its length greater than 1
      if (product?.images && product?.images.length > 0) {
        //apply loop on images and delete all old images
        for (const image of product.images) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
      }

      //now upload new images on cloudinary
      const uploadedImages = await UploadProductImagesCloudinary(req, next);
      updateData.images = uploadedImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      updateData,
      { new: true, runValidators: true, useFindAndModify: false }
    ).populate("category");
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedProduct },
          `Product updated with ${product.name} name successfully...!`
        )
      );
  } catch (error) {
    console.log(error);

    return next(
      new ApiError(`Something went wrong while updating product...!`, 500)
    );
  }
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
        { deletedProduct },
        `Product deleted with ${product.name} name successfully...!`
      )
    );
});

//get all category
const getAllCategory = AsyncHandler(async (req, res, next) => {
  const categories = await ProductCategory.find();

  if (!categories) {
    return next(new ApiError(`Categories not found...!`, 500));
  }

  res
    .status(200)
    .json(new ApiResponse(200, { categories }, `All Categories...!`));
});
export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProductDetails,
  getFeaturedProducts,
  getAllCategory,
};
