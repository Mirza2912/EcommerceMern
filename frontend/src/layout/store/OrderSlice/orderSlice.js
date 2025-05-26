import { createSlice } from "@reduxjs/toolkit";
import {
  loadOrderItemsFromLocalStorage,
  loadShippingFromLocalStorage,
  saveOrderItemsToLocalStorage,
  saveShippingToLocalStorage,
} from "./orderLocalStorageHandler";
import {
  createOrder,
  deleteOrderAdmin,
  getAllOrders,
  getAllOrdersAdmin,
  getSingleOrderDetails,
  getSingleOrderDetailsAdmin,
  updateOrderStatus,
} from "./orderSliceReducers";

// Product slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    allOrders: [],
    singleOrderDetails: {},
    singleOrderAdmin: {},
    shippingAddress: loadShippingFromLocalStorage(),
    orderItems: loadOrderItemsFromLocalStorage(),
    getAllOrdersMessage: "",
    paymentMethod: "",
    orderPlacedMessage: "",
    deleteOrderAdminMessage: "",
    updateOrderStatusMessage: "",
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

    clearDeleteOrderAdminMessage: (state) => {
      state.deleteOrderAdminMessage = "";
    },

    clearUpdateOrderStatusMessage: (state) => {
      state.updateOrderStatusMessage = "";
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
      })
      .addCase(getAllOrdersAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(getAllOrdersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const deleteOrderId = action.meta.arg;
        state.allOrders = state.allOrders?.filter(
          (order) => order._id !== deleteOrderId
        );
        state.deleteOrderAdminMessage = action.payload?.message;
        state.error = null;
      })
      .addCase(deleteOrderAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleOrderDetailsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleOrderDetailsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrderAdmin = action.payload;
        state.error = null;
      })
      .addCase(getSingleOrderDetailsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrderAdmin = action.payload;
        state.updateOrderStatusMessage = action.payload?.message;
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
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
  clearDeleteOrderAdminMessage,
  clearUpdateOrderStatusMessage,
} = orderSlice.actions;
export default orderSlice.reducer;
