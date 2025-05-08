import { createSlice } from "@reduxjs/toolkit";
import {
  loadOrderItemsFromLocalStorage,
  loadShippingFromLocalStorage,
  saveOrderItemsToLocalStorage,
  saveShippingToLocalStorage,
} from "./orderLocalStorageHandler";
import { createOrder } from "./orderSliceReducers";

// Product slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    shippingAddress: loadShippingFromLocalStorage(),
    orderItems: loadOrderItemsFromLocalStorage(),
    paymentMethod: "",
    orderPlacedMessage: "",
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

    clearOrderPlaceMessage: (state) => {
      state.orderPlacedMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.data;
        state.orderPlacedMessage = action.payload?.message;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setShippingAddress,
  setOrderItems,
  clearOrderItems,
  clearOrderPlaceMessage,
} = orderSlice.actions;
export default orderSlice.reducer;
