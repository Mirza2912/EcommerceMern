import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//getAllProducts(with filters)
export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({
    category,
    rating = 0,
    price = [0, 3000],
    currentPage = 1,
    inStock,
    outStock,
    keyword = "",
  }) => {
    try {
      const params = new URLSearchParams();

      // console.log(inStock, outStock);

      // Add filters to the query string
      if (keyword !== undefined) params.append("keyword", keyword);
      if (price[0] !== undefined) params.append("minPrice", price[0]);
      if (price[1] !== undefined) params.append("maxPrice", price[1]);
      if (category) params.append("category", category);
      if (rating !== undefined) params.append("rating", rating);
      if (currentPage !== undefined) params.append("page", currentPage);
      if (inStock !== undefined) {
        if (inStock === true) {
          params.append("stock", "true");
        } else {
          params.append("stock", "false");
        }
      }

      /*making api call with axios for getting product from backend */
      const { data } = await axios.get(`/api/v1/products?${params}`);
      // console.log(data);
      return data?.data; //returning fetched data
    } catch (error) {
      console.log(error);
      return error.response?.data || error.message;
    }
  }
);

//get single product details
export const singleProductDetails = createAsyncThunk(
  "singleProductDetails",
  async (id) => {
    // console.log(id);

    try {
      /*making api call with axios for getting single product details from backend */
      const { data } = await axios.get(`/api/v1/products/single/${id}`);
      // console.log(data);

      // fetching data of single product whose id is {id}
      // const singleProduct = data.filter((elem) => elem._id === id);
      // console.log(singleProduct);

      return data?.data; //returning fetched data
    } catch (error) {
      // console.log(error);
      return error.response?.data || error.message;
    }
  }
);

//get all available catregories
export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async () => {
    try {
      const { data } = axios.get(`/api/v1/products/product-categories`);
      return data?.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return error.response?.data || error.message;
    }
  }
);

//get Featured products
export const getFeaturedProducts = createAsyncThunk(
  "getFeaturedProducts",
  async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/featured-products`);
      // console.log(data.data);

      return data?.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return error.response?.data || error.message;
    }
  }
);
