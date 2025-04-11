import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./layout/store/UserSlice/userSlice.js";
import productSlice from "./layout/store/ProductSlice/productSlice.js";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    product: productSlice,
  },
});
