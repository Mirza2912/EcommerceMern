import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      //   console.log(data);

      const response = await axios.post("/api/v1/orders/new", data, config);
      //   console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to create order"
      );
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      //   console.log(data);

      const response = await axios.get("/api/v1/orders/allOrders");
      // console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to getting orders"
      );
    }
  }
);

export const getSingleOrderDetails = createAsyncThunk(
  "order/getSingleOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);

      const response = await axios.get(`/api/v1/orders/singleOrder/${id}`);
      // console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch order"
      );
    }
  }
);
