import { createSlice } from "@reduxjs/toolkit";
import {
  addToFeatured,
  deleteProduct,
  getAllProducts,
  getALLProductsAdmin,
  getBannerProducts,
  getFeaturedProducts,
  getRecentAddedProducts,
  makeUnfeatured,
  singleProductDetails,
} from "./productSliceReducers.js";

/*--------------------------------------*/
/*     Products Slice
/*--------------------------------------*/
export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], //for storing all products in state
    adminProducts: [],
    productCount: 0,
    filteredProductCount: 0,
    featuredProducts: [],
    bannerProducts: [],
    recentAddedProducts: [],
    featuredProductsCount: 0,
    bannerProductsCount: 0,
    singleProduct: {},
    categories: [],
    loading: false,
    error: null,
    deleteProductMessage: "",
    addToFeaturedProduct: "",
    makeProductUnFeaturedMessage: "",
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
    clearMakeProductUnFeaturedMessage: (state) => {
      state.makeProductUnFeaturedMessage = "";
    },
  },

  //Extra reducers for async code
  extraReducers: (builder) => {
    //builder for getting all products
    builder
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
      });
  },
});

export const {
  clearError,
  clearDeleteProductMessage,
  clearAddToFeaturedProduct,
  clearMakeProductUnFeaturedMessage,
} = productSlice.actions;
export default productSlice.reducer;
