import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//get all available catregories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/categories`);
      //   console.log(data?.data);

      return data?.data;
    } catch (error) {
      //   console.log(error.response?.data || error.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch featured product details"
      );
    }
  }
);
