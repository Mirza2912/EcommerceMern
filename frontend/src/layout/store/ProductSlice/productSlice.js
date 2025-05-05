import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getBannerProducts,
  getFeaturedProducts,
  singleProductDetails,
} from "./productSliceReducers.js";

/*--------------------------------------*/
/*     Products Slice
/*--------------------------------------*/
export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], //for storing all products in state
    productCount: 0,
    filteredProductCount: 0,
    featuredProducts: [],
    bannerProducts: [],
    featuredProductsCount: 0,
    bannerProductsCount: 0,
    singleProductDetailsMessage: "",
    singleProduct: {},
    categories: [],
    loading: false,
    error: null,
  },

  //Simple reducers(Functions)
  reducers: {
    //reducer for clearing all errors
    clearError: (state) => {
      state.error = null;
    },

    clearSingleProductDetailsMessage: (state) => {
      state.singleProductDetailsMessage = "";
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
        state.singleProduct = action.payload?.data?.products;
        state.singleProductDetailsMessage = action.payload?.message;
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
      });
  },
});

export const { clearError, clearSingleProductDetailsMessage } =
  productSlice.actions;
export default productSlice.reducer;
