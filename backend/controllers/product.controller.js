import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ProductCategory } from "../models/productCategory.model.js";
import UploadProductImagesCloudinary from "../utils/UploadProductImagesCloudinary.js";
import cloudinary from "cloudinary";
import axios from "axios";

//get all products from Product model
const getAllProducts = AsyncHandler(async (req, res, next) => {
  //extracting data from query(if user add any filter or search a product)
  const {
    keyword = "",
    minPrice,
    maxPrice,
    category,
    page = 1,
    limit = 8,
    stock = true,
    ratings,
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

  // if user use rating option
  if (ratings) {
    // console.log(rating);

    filter.ratings = { $gte: Number(ratings) };
  }

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
    .skip(skip)
    .sort({ createdAt: -1 });
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
      .sort({ createAt: -1 })
      .populate("category")
      .skip(skip)
      .limit(productsPerPage);

    // console.log(featuredProducts);

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

const getRecentAdded = AsyncHandler(async (req, res, next) => {
  try {
    // Fetch filtered products with pagination
    const recentProducts = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(8);

    if (!recentProducts) {
      return next(new ApiError(`Banner products not found...!`, 500));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { products: recentProducts },
          "All recent added Products...!"
        )
      );
  } catch (error) {
    // console.log(error);
    return next(
      new ApiError(
        `Something went wrong while fetching recent added products...!`,
        500
      )
    );
  }
});

const getRelatedProducts = AsyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Fetch filtered products with pagination
    const relatedProducts = await Product.find({
      category: id,
    })
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(15);

    if (!relatedProducts) {
      return next(new ApiError(`related Products  not found...!`, 500));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { products: relatedProducts },
          "All related Products...!"
        )
      );
  } catch (error) {
    // console.log(error);
    return next(
      new ApiError(
        `Something went wrong while fetching related Products...!`,
        500
      )
    );
  }
});

const getBestSellerProducts = AsyncHandler(async (req, res, next) => {
  try {
    const bestSellers = await Product.find().sort({ sold: -1 }).limit(8);

    if (!bestSellers) {
      return next(new ApiError(`related Products  not found...!`, 500));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { products: bestSellers },
          "All best seller Products...!"
        )
      );
  } catch (error) {
    // console.log(error);
    return next(
      new ApiError(
        `Something went wrong while fetching related Products...!`,
        500
      )
    );
  }
});

/* ADMIN METHODS */
//Create products in product model
const createProduct = AsyncHandler(async (req, res, next) => {
  //later

  const data = req.body;
  // console.log(data);

  try {
    const postToSocialMedia = req.body?.postToSocialMedia === "true";
    delete data.postToSocialMedia;

    //make sure product will use category by category model
    if (data?.category) {
      // console.log("category start" + data.category);

      //if category first we check that given category exist or not
      const categoryObj = await ProductCategory.findOne({
        category: data.category,
      });
      // console.log("category obj" + categoryObj?.category);

      if (categoryObj) {
        //add category._id because we add feature of caterofgy by ref of category model
        data.category = categoryObj._id;
        // console.log(categoryObj.category);
      } else if (!categoryObj) {
        // console.log("not found category");
        // console.log(req.user._id);
        return next(new ApiError(`Category not found...!`, 401));
      }
    } else {
      return next(new ApiError(`Category is required...!`, 401));
    }

    // console.log(data.category);

    //handle images
    if (req.files?.images) {
      // console.log(req.files?.images || data?.images);

      // then call imageuploader on cloudinary function from utilities by giving parameters both
      const uploadedImages = await UploadProductImagesCloudinary(req, next);
      // console.log("uploaded : " + uploadedImages);

      if (!uploadedImages) {
        return next(
          new ApiError(`Something went wrong while uploading images`, 400)
        );
      }

      //6.now set cloudinary given images urls in data(req.body)
      data.images = uploadedImages;
      data.user = req.user._id;
      // console.log(data);
    } else {
      return next(new ApiError(`Images are required...!`, 400));
    }

    let newProduct = await Product.create(data);

    if (postToSocialMedia) {
      const zapierWebhookURL =
        "https://hooks.zapier.com/hooks/catch/23465807/uoleemw/";

      await axios
        .post(zapierWebhookURL, {
          title: newProduct?.name,
          description: newProduct?.description,
          image: newProduct?.images[0]?.url,
          price: newProduct?.price,
        })
        .then(() => {
          console.log("✅ Posted to Zapier");
        })
        .catch((err) => {
          console.log(
            "❌ Failed to post to Zapier:",
            err.response?.data || err.message
          );
        });
    }

    if (!newProduct) {
      return next(
        new ApiError(`Something went wrong while creating product...!`, 500)
      );
    }
    newProduct = await newProduct.populate({
      path: "category",
      select: "category",
    });

    // console.log("populated product : " + newProduct);

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
    console.log(error);

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

  try {
    const product = await Product.findById(productId);
    // console.log(product);

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
    // console.log("update ho gya :" + updatedProduct);

    if (!updatedProduct) {
      return next(
        new ApiError(`Something went wrong while updating product...!`, 500)
      );
    }
    // console.log("ho gya");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          `Product with ${product.name} name updated successfully...!`
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
  const id = req.params.id;
  // console.log(productId);

  const product = await Product.findById(id);
  // console.log(product);

  if (!product) {
    return next(new ApiError(`Product with id:${id} is not found...!`, 404));
  }

  const deletedProduct = await Product.findByIdAndDelete(product._id);
  // console.log(deleteProduct);

  if (!deletedProduct) {
    return next(new ApiError(`There is some error...!`, 500));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { products: {} },
        `Product with ${product.name} name deleted successfully...!`
      )
    );
});

//get all products
const getAdminProducts = AsyncHandler(async (req, res, next) => {
  try {
    const product = await Product.find()
      .populate("category", "category")
      .sort({ createdAt: -1 });

    if (!product) {
      return next(new ApiError(`Products not found...!`, 404));
    }

    res.status(200).json(new ApiResponse(200, product, `All products...!`));
  } catch (error) {
    return next(
      new ApiError("Something went wrong while fetching products...!", 500)
    );
  }
});

//get all products
const getEmployeeAllProducts = AsyncHandler(async (req, res, next) => {
  try {
    const product = await Product.find()
      .populate("category", "category")
      .sort({ createdAt: -1 });

    if (!product) {
      return next(new ApiError(`Products not found...!`, 404));
    }

    res.status(200).json(new ApiResponse(200, product, `All products...!`));
  } catch (error) {
    return next(
      new ApiError("Something went wrong while fetching products...!", 500)
    );
  }
});

const addToFeatured = async (req, res, next) => {
  try {
    // console.log(req.params.id);

    const product = await Product.findById(req.params?.id);

    if (!product) {
      return next(new ApiError(`Products not found...!`, 404));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params?.id,
      {
        isFeatured: true,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "category");

    if (!updatedProduct) {
      return next(new ApiError(`Products not found...!`, 404));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedProduct,
          `Now ${updatedProduct?.name} is featured product...!`
        )
      );
  } catch (err) {
    console.error("Error updating product:", err);
    return next(new ApiError(`Something went wrong...!`, 500));
  }
};

const makeUnFeatured = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const product = await Product.findById(req.params?.id);

    if (!product) {
      return next(new ApiError(`Product not found...!`, 404));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params?.id,
      {
        isFeatured: false,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "category");

    if (!updatedProduct) {
      return next(new ApiError(`Products not found...!`, 404));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedProduct,
          `Now ${updatedProduct?.name} is un featured product...!`
        )
      );
  } catch (err) {
    console.error("Error updating product:", err);
    return next(new ApiError(`Something went wrong...!`, 500));
  }
};

// Create New Review or Update the review
const createProductReview = AsyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  console.log(rating);

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  // console.log(product);

  const isReviewed = product?.reviews?.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, "Review submitted successfully...!"));
});

// Get All Reviews of a product
const getProductReviews = AsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ApiError(`Product not found...!`, 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });

  res.status(200).json(new ApiResponse(200, (reviews = product.reviews)));
});

// Delete Review
const deleteReview = AsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ApiError(`Product not found...!`, 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });

  res.status(200).json(new ApiResponse(200, "Review deleted successfully...!"));
});

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProductDetails,
  getFeaturedProducts,
  getBannerProducts,
  getRecentAdded,
  getAdminProducts,
  makeUnFeatured,
  addToFeatured,
  getRelatedProducts,
  getEmployeeAllProducts,
  getBestSellerProducts,
  createProductReview,
  deleteReview,
  getProductReviews,
};
