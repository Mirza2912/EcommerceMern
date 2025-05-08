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
