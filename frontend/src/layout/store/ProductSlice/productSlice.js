import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCategories,
  getAllProducts,
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
    featuredProductsCount: 0,
    singleProduct: {},
    categories: [],
    loading: false,
    error: null,
  },

  //Simple reducers(Functions)
  reducers: {
    //reducer for clearing all errors
    clearError: (state) => {
      return { ...state, error: null };
    },
  },

  //Extra reducers for async code
  extraReducers: (builder) => {
    //builder for getting all products
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.filteredProductCount = action.payload.filteredProductCount;
        state.productsPerPage = action.payload.productsPerPage;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //builder for getting Single product details

      .addCase(singleProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.singleProduct;
      })
      .addCase(singleProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getAllcategories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getFeaturedProducts
      .addCase(getFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload.featuredProducts;
        state.featuredProductsCount = action.payload.featuredProductsCount;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
