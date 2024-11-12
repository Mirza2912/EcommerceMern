import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  singleProductDetails,
} from "./productSliceReducers.js";

/*--------------------------------------*/
/*     Products Slice
/*--------------------------------------*/
export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [], //for storing all products in state
    singleProduct: {},
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
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
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
        state.singleProduct = action.payload.data;
      })
      .addCase(singleProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleProduct = null;
      });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
