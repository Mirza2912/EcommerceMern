import { createSlice } from "@reduxjs/toolkit";
import {
  loadOrderItemsFromLocalStorage,
  loadShippingFromLocalStorage,
  saveOrderItemsToLocalStorage,
  saveShippingToLocalStorage,
} from "./orderLocalStorageHandler";
import {
  createOrder,
  getAllOrders,
  getSingleOrderDetails,
} from "./orderSliceReducers";

// Product slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    singleOrderDetails: {},
    shippingAddress: loadShippingFromLocalStorage(),
    orderItems: loadOrderItemsFromLocalStorage(),
    getAllOrdersMessage: "",
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

    clearGetAllOrdersMessage: (state) => {
      state.getAllOrdersMessage = "";
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
      })
      .addCase(getAllOrders.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload?.data;
        state.getAllOrdersMessage = action.payload?.message;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleOrderDetails.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getSingleOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrderDetails = action.payload?.data;
      })
      .addCase(getSingleOrderDetails.rejected, (state, action) => {
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
  clearShippingAddress,
  clearGetAllOrdersMessage,
} = orderSlice.actions;
export default orderSlice.reducer;
