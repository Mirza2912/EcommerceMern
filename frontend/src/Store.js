import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./layout/store/ProductSlice/productSlice.js";
import userSlice from "./layout/store/UserSlice/userSlice.js";
export const store = configureStore({
  reducer: {
    products: productSlice,
    auth: userSlice,
    // user: userReducer,
  },
});
