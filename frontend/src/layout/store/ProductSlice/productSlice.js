import { createSlice } from "@reduxjs/toolkit";
import {
  addToFeatured,
  createNewProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getALLProductsAdmin,
  getAllProductsEmployee,
  getBannerProducts,
  getBestSellerProducts,
  getFeaturedProducts,
  getRecentAddedProducts,
  getRelatedProducts,
  makeUnfeatured,
  singleProductDetails,
  updateProduct,
} from "./productSliceReducers.js";

/*--------------------------------------*/
/*     Products Slice
/*--------------------------------------*/
export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], //for storing all products in state
    adminProducts: [],
    employeeProducts: [],
    productCount: 0,
    filteredProductCount: 0,
    featuredProducts: [],
    bannerProducts: [],
    recentAddedProducts: [],
    relatedProducts: [],
    featuredProductsCount: 0,
    bannerProductsCount: 0,
    singleProduct: {},
    categories: [],
    bestSellerProducts: [],
    loading: false,
    error: null,
    deleteProductMessage: "",
    addToFeaturedProduct: "",
    makeProductUnFeaturedMessage: "",
    createNewProductMessage: "",
    createProductReviewMessage: "",
    updateProductMessage: "",
  },

  //Simple reducers(Functions)
  reducers: {
    //reducer for clearing all errors
    clearError: (state) => {
      state.error = null;
    },
    clearDeleteProductMessage: (state) => {
      state.deleteProductMessage = "";
    },
    clearAddToFeaturedProduct: (state) => {
      state.addToFeaturedProduct = "";
    },
    clearUpdateProductMessage: (state) => {
      state.updateProductMessage = "";
    },
    clearMakeProductUnFeaturedMessage: (state) => {
      state.makeProductUnFeaturedMessage = "";
    },
    clearCreateNewProductMessage: (state) => {
      state.createNewProductMessage = "";
    },
    clearCreateProductReviewMessage: (state) => {
      state.createProductReviewMessage = "";
    },
  },

  //Extra reducers for async code
  extraReducers: (builder) => {
    //builder for getting all products
    builder

      //get All products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.products;
        state.productCount = action.payload?.productCount;
        state.filteredProductCount = action.payload?.filteredProductCount;
        state.productsPerPage = action.payload?.productsPerPage;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update a product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.updateProductMessage = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //create review
      .addCase(createProductReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.createProductReviewMessage = action.payload;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //create new product
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.createNewProductMessage = action.payload;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //builder for getting Single product details

      .addCase(singleProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload?.data?.products;
        state.singleProduct[product._id] = product;
      })
      .addCase(singleProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getFeaturedProducts
      .addCase(getFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload?.products;
        state.featuredProductsCount = action.payload?.featuredProductsCount;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getbestsellerproducts
      .addCase(getBestSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBestSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellerProducts = action.payload?.products;
      })
      .addCase(getBestSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getBannerProducts
      .addCase(getBannerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBannerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bannerProducts = action.payload?.products;
        state.bannerProductsCount = action.payload?.bannerProductsCount;
      })
      .addCase(getBannerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //builder for getting recent added product
      .addCase(getRecentAddedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentAddedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.recentAddedProducts = action.payload?.products;
      })
      .addCase(getRecentAddedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //builder for getting all products for admin
      .addCase(getALLProductsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getALLProductsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts = action.payload;
      })
      .addCase(getALLProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllProductsEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeProducts = action.payload;
      })
      .addCase(getAllProductsEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //builder for delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deleteProductId = action.meta.arg;
        state.adminProducts = state.adminProducts?.filter(
          (prod) => prod._id !== deleteProductId
        );
        state.deleteProductMessage = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //builder for add to featured
      .addCase(addToFeatured.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.addToFeaturedProduct = action.payload?.message;
        const updatedProduct = action.payload?.data;
        state.adminProducts = state.adminProducts.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        );
      })
      .addCase(addToFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //builder for make product un-featured
      .addCase(makeUnfeatured.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeUnfeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.makeProductUnFeaturedMessage = action.payload?.message;
        const updatedProduct = action.payload?.data;
        state.adminProducts = state.adminProducts.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        );
      })
      .addCase(makeUnfeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //builder for getting related products
      .addCase(getRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearDeleteProductMessage,
  clearAddToFeaturedProduct,
  clearMakeProductUnFeaturedMessage,
  clearCreateNewProductMessage,
  clearCreateProductReviewMessage,
  clearUpdateProductMessage,
} = productSlice.actions;
export default productSlice.reducer;
