import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice/userSlice.js";
import productSlice from "./ProductSlice/productSlice.js";
import categorySlice from "./CategorySlice/categorySlice.js";
import cartSlice from "./CartSlice/CartSlice.js";
import orderSlice from "./OrderSlice/orderSlice.js";
import saleSlice from "./SalesSlice/saleSlice.js";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    product: productSlice,
    category: categorySlice,
    cart: cartSlice,
    order: orderSlice,
    sale: saleSlice,
  },
});
