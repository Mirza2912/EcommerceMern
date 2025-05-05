import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice/userSlice.js";
import productSlice from "./ProductSlice/productSlice.js";
import categorySlice from "./CategorySlice/categorySlice.js";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    product: productSlice,
    category: categorySlice,
  },
});
