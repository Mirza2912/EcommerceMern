import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ProductCategory } from "../models/productCategory.model.js";
import UploadProductImagesCloudinary from "../utils/UploadProductImagesCloudinary.js";
import cloudinary from "cloudinary";

//get all products from Product model
const getAllProducts = AsyncHandler(async (req, res) => {
  //extracting data from query(if user add any filter or search a product)
  const {
    keyword = "",
    minPrice,
    maxPrice,
    category,
    page = 1,
    limit = 8,
    stock = true,
  } = req.query;
  // console.log(keyword, minPrice, maxPrice, category, page, stock, rating);

  //creating a query object for apply query on product at the end of all disscussion
  let filter = {};

  //if user seacrh a product by name
  if (keyword) {
    filter.name = {
      $regex: keyword,
      $options: "i",
    };
  }

  //if user use stock option
  if (stock) {
    if (stock === true) {
      filter.stock = { $gt: 0 };
    } else if (stock === false) {
      filter.stock = 0;
    }
  }

  //if user use rating option
  // if (rating) {
  //   // console.log(rating);

  //   query.rating = { $gte: Number(rating) };
  // }

  //if user add category to get products
  if (category) {
    //if category first we check that given category exist or not
    const categoryObj = await ProductCategory.findOne({ category });
    if (categoryObj) {
      //add category._id because we add feature of caterofgy by ref of category model
      filter.category = categoryObj._id;
    } else {
      return next(new ApiError(`Invalid Category...!`, 404));
    }
  }

  //if user filter the products with range of price
  if (minPrice || maxPrice) {
    //creating another object in query oibject for price
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  //pagination setUp
  const productsPerPage = Number(limit) || 8;
  const productCount = await Product.countDocuments();
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * productsPerPage;

  // console.log(filter);

  // Fetch filtered products with pagination
  const products = await Product.find(filter)
    .populate("category", "category")
    .populate("user", "name email")
    .limit(productsPerPage)
    .skip(skip);
  // console.log("products : " + products);

  //length of filtered products
  const filteredProductCount = await Product.countDocuments(filter);
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
      "All Products...!"
    )
  );
});

//getting product details(single)
const singleProductDetails = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // console.log("singleProductsDetails : " + id);

  const singleProduct = await Product.findById(id).populate({
    path: "category",
    select: "category",
  });
  // console.log(singleProduct);

  if (!singleProduct) {
    return next(new ApiError(`Product with id:${id} is not found...!`, 404));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { products: singleProduct },
        "Single Product Details...!"
      )
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
      .populate({
        path: "category",
        select: "category",
      })
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
          { products: featuredProducts, featuredProductsCount },
          "All Featured Products...!"
        )
      );
  } catch (error) {
    // console.log(error);
    return next(
      new ApiError(
        `Something went wrong while fetching featured products...!`,
        500
      )
    );
  }
});

const getBannerProducts = AsyncHandler(async (req, res, next) => {
  try {
    const bannerProductsCount = await Product.find({
      isBannerProduct: true,
    }).countDocuments();
    // console.log("featuredProductsCount : " + featuredProductsCount);

    // const currentPage = Number(page) || 1;
    // const skip = (currentPage - 1) * productsPerPage;

    // Fetch filtered products with pagination
    const bannerProducts = await Product.find({
      isBannerProduct: true,
    }).populate({
      path: "category",
      select: "category",
    });
    // .skip(skip)
    // .limit(productsPerPage);
    // console.log("featuredProducts : " + featuredProducts);

    if (!bannerProducts) {
      return next(new ApiError(`Banner products not found...!`, 500));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { products: bannerProducts, bannerProductsCount },
          "All Banner Products...!"
        )
      );
  } catch (error) {
    // console.log(error);
    return next(
      new ApiError(
        `Something went wrong while fetching banner products...!`,
        500
      )
    );
  }
});

//Create products in product model
const createProduct = AsyncHandler(async (req, res, next) => {
  //later

  const data = req.body;

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

    //handle images
    if (req.files?.images || data?.images) {
      //validation of image format
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      // If image in file format
      if (req.files?.images) {
        // Ensure req.files?.images is an array
        const imagesArray = Array.isArray(req.files?.images)
          ? req.files?.images
          : [req.files?.images];

        //validation of images
        for (let image of imagesArray) {
          //check given image is valid or not
          if (!allowedFormats.includes(image.mimetype)) {
            return next(
              new ApiError(`Invalid file type: ${image.mimetype}`, 400)
            );
          }

          //check image size not exceed 5mb
          if (image.size > maxSize) {
            return next(new ApiError("File size exceeds 5MB limit", 400));
          }
        }
      }
      // then call imageuploader on cloudinary function from utilities by giving parameters both
      const uploadedImages = await UploadProductImagesCloudinary(req, next);

      if (!uploadedImages) {
        return next(
          new ApiError(`Something went wrong while uploading images`, 400)
        );
      }

      //6.now set cloudinary given images urls in data(req.body)
      data.images = uploadedImages;
    } else {
      return next(new ApiError(`Images are required...!`, 400));
    }

    const newProduct = await Product.create(data).populate({
      path: "category",
      select: "category",
    });

    if (!newProduct) {
      return next(
        new ApiError(`Something went wrong while creating product...!`, 500)
      );
    }

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { products: newProduct },
          `Product with ${newProduct?.name} is created successfully...!`
        )
      );
  } catch (error) {
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

  try {
    const product = await Product.findById(productId);
    // console.log(product);

    if (!product) {
      return next(
        new ApiError(`Product with id:${productId} is not found...!`, 404)
      );
    }

    //if user update images also
    if (req.files?.images || updateData?.images) {
      // check image comes from data base or not and also check its length greater than 1
      if (product?.images && product?.images?.length > 0) {
        //apply loop on images and delete all old images
        for (const image of product.images) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
      }

      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (req.files?.images) {
        // Ensure req.files?.images is an array
        const imagesArray = Array.isArray(req.files?.images)
          ? req.files?.images
          : [req.files?.images];

        //validation of images
        for (let image of imagesArray) {
          //check given image is valid or not
          if (!allowedFormats.includes(image.mimetype)) {
            return next(
              new ApiError(`Invalid file type: ${image.mimetype}`, 400)
            );
          }

          //check image size not exceed 5mb
          if (image.size > maxSize) {
            return next(new ApiError("File size exceeds 5MB limit", 400));
          }
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
    ).populate({
      path: "category",
      select: "category",
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { products: updatedProduct },
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
  // console.log(productId);

  const product = await Product.findById(productId);
  // console.log(product);

  if (!product) {
    return next(
      new ApiError(`Product with id:${productId} is not found...!`, 404)
    );
  }

  const deletedProduct = await Product.findByIdAndDelete(product._id);
  // console.log(deleteProduct);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { products: deletedProduct },
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
  getFeaturedProducts,
  getBannerProducts,
};
