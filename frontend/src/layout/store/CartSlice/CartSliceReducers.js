import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};

export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async (data, { rejectWithValue }) => {
    // console.log(data);

    try {
      const response = await axios.post(
        `/api/v1/cart/addItemToCart`,
        data,
        config
      );
      //   console.log(response);

      return response?.data;
    } catch (error) {
      //   console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to add item to cart"
      );
    }
  }
);

//get user cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/cart");
      //   console.log(response);
      return response?.data?.data?.cart?.items; //returning fetched data
    } catch (error) {
      //   console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch user's cart from server"
      );
    }
  }
);

//update from backend
export const addToCartUpdateBackend = createAsyncThunk(
  "cart/addToCartUpdateBackend",
  async (cartData, { rejectWithValue }) => {
    try {
      //   console.log(cartData);

      const response = await axios.put(
        "/api/v1/cart/update-cart",
        cartData,
        config
      );
      //   console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to update cart of user"
      );
    }
  }
);

//remove cart item from backend
export const deleteCartItemBackend = createAsyncThunk(
  "cart/deleteCartItemBackend",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);

      const response = await axios.delete(
        `/api/v1/cart/delete-cartItem/${id}`,
        config
      );
      //   console.log(response?.data);
      return response?.data; //returning fetched data
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to remove cart item"
      );
    }
  }
);
