import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "./categorySliceReducers";

/*--------------------------------------*/
/*     Products Slice
/*--------------------------------------*/
export const categorySlice = createSlice({
  name: "category",
  initialState: {
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
  },

  //Extra reducers for async code
  extraReducers: (builder) => {
    builder
      //getAllcategories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.categories;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
