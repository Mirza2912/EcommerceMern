import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//getAllProducts(with filters)
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    { category, price = [0, 3000], page = 1, stock = true, keyword = "" } = {},
    { rejectWithValue }
  ) => {
    try {
      // console.log("start");

      const params = new URLSearchParams();

      // console.log(inStock, outStock);

      // Add filters to the query string
      if (keyword !== undefined) params.append("keyword", keyword);
      if (price[0] !== undefined) params.append("minPrice", price[0]);
      if (price[1] !== undefined) params.append("maxPrice", price[1]);
      if (category) params.append("category", category);
      // if (rating !== undefined) params.append("rating", rating);
      if (page !== undefined) params.append("page", page);
      if (stock !== undefined) {
        if (stock === true) {
          params.append("stock", true);
        } else {
          params.append("stock", false);
        }
      }

      // console.log(params.toString());

      /*making api call with axios for getting product from backend */
      const { data } = await axios.get(`/api/v1/products`, { params });
      // console.log(data?.data);
      return data?.data; //returning fetched data
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch products"
      );
    }
  }
);

//get single product details
export const singleProductDetails = createAsyncThunk(
  "singleProductDetails",
  async (id, { rejectWithValue }) => {
    // console.log(id);

    try {
      /*making api call with axios for getting single product details from backend */
      const { data } = await axios.get(`/api/v1/products/single-product/${id}`);
      // console.log(data);

      return data; //returning fetched data
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch featured product details"
      );
    }
  }
);

//get Featured products
export const getFeaturedProducts = createAsyncThunk(
  "products/getFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/featured-products`);
      // console.log(data?.data);

      return data?.data;
    } catch (error) {
      // console.log(error.response?.data || error.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch featured products"
      );
    }
  }
);

//get banner products
export const getBannerProducts = createAsyncThunk(
  "products/getBannerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/banner-products`);
      // console.log(data?.data);

      return data?.data;
    } catch (error) {
      // console.log(error.response?.data || error.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch banner products"
      );
    }
  }
);

//get related products
export const getRelatedProducts = createAsyncThunk(
  "products/getRelatedProducts",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);

      const { data } = await axios.get(
        `/api/v1/products/related-products/${id}`
      );
      console.log(data?.data?.products);

      return data?.data?.products;
    } catch (error) {
      // console.log(error.response?.data || error.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch banner products"
      );
    }
  }
);

export const getRecentAddedProducts = createAsyncThunk(
  "products/getRecentAddedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/recent-products`);
      // console.log(data?.data);

      return data?.data;
    } catch (error) {
      // console.log(error.response?.data || error.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch recent added products"
      );
    }
  }
);

/* ADMIN METHODS */

//get all products
export const getALLProductsAdmin = createAsyncThunk(
  "products/getALLProductsAdmin",
  async (_, { rejectWithValue }) => {
    try {
      /*making api call with axios for getting single  product from backend */
      const response = await axios.get(`/api/v1/products/admin/products`);
      // console.log(response?.data);
      return response?.data?.data;
    } catch (error) {
      console.log(error.response.data?.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch products"
      );
    }
  }
);

//single product details
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.delete(
        `/api/v1/products/deleteProduct/${id}`
      );
      // console.log(response?.data);
      return response?.data?.message; //returning fetched data
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to delete product"
      );
    }
  }
);

//addToFeatured
export const addToFeatured = createAsyncThunk(
  "products/addToFeatured",
  async (id, { rejectWithValue }) => {
    try {
      /*making api call with axios for getting single  product from backend */
      const response = await axios.put(
        `/api/v1/products/make-feature-product/${id}`
      );
      // console.log(response?.data);
      return response?.data; //returning fetched data
    } catch (error) {
      console.log(error.response.data?.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to make product featured"
      );
    }
  }
);

//addToFeatured
export const makeUnfeatured = createAsyncThunk(
  "products/makeUnfeatured",
  async (id, { rejectWithValue }) => {
    try {
      /*making api call with axios for getting single  product from backend */
      const response = await axios.put(
        `/api/v1/products/make-product-unfeatured/${id}`
      );
      // console.log(response?.data);
      return response?.data; //returning fetched data
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to make product unfeatured"
      );
    }
  }
);
