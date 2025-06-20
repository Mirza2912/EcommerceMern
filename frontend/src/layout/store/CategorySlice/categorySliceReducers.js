import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};
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

//create new category
export const createNewCategory = createAsyncThunk(
  "category/createNewCategory",
  async (category, { rejectWithValue }) => {
    try {
      console.log(category);

      const { data } = await axios.post(
        `/api/v1/categories/create`,
        { category },
        config
      );
      console.log(data);

      return data;
    } catch (error) {
      console.log(error.response || error.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch featured product details"
      );
    }
  }
);
