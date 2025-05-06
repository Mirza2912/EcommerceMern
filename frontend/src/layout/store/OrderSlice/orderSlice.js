import { createSlice } from "@reduxjs/toolkit";
import {
  loadOrderItemsFromLocalStorage,
  loadShippingFromLocalStorage,
  saveOrderItemsToLocalStorage,
  saveShippingToLocalStorage,
} from "./orderLocalStorageHandler";

// Product slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    shippingAddress: loadShippingFromLocalStorage(),
    orderItems: loadOrderItemsFromLocalStorage(),
    paymentMethod: "",
    otherDetails: { taxPrice: null, shippingPrice: null, totalPrice: null },
    loading: false,
    error: null,
  },
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      saveShippingToLocalStorage(action.payload);
    },
    clearShippingAddress: (state) => {
      saveShippingToLocalStorage(null);
      state.shippingAddress = null;
    },

    setOrderItems: (state, action) => {
      state.orderItems = action.payload; //will be an array
      saveOrderItemsToLocalStorage(action.payload);
    },
    clearOrderItems: (state) => {
      saveOrderItemsToLocalStorage([]);
      state.orderItems = [];
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  clearError,
  setShippingAddress,
  setOrderItems,
  clearOrderItems,
} = orderSlice.actions;
export default orderSlice.reducer;
