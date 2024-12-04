/*--------------------------------------*/
/*     Get All Products
/*--------------------------------------*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      if (price[0] !== undefined) params.append("price[gte]", price[0]);
      if (price[1] !== undefined) params.append("price[lte]", price[1]);
      if (category) params.append("category", category);
      if (rating !== undefined) params.append("rating[gte]", rating);
      if (currentPage !== undefined) params.append("page", currentPage);
      if (inStock !== undefined && inStock === true)
        params.append("stock[gt]", 0);
      if (outStock !== undefined && outStock === true)
        params.append("stock[lte]", 0);

      /*making api call with axios for getting product from backend */
      const { data } = await axios.get(`/api/v1/products?${params}`);
      // console.log(data);
      return data; //returning fetched data
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
);

/*--------------------------------------*/
/*     Get Single product details
  /*--------------------------------------*/

export const singleProductDetails = createAsyncThunk(
  "singleProductDetails",
  async (id) => {
    // console.log(id);

    try {
      /*making api call with axios for getting single product details from backend */
      const { data } = await axios.get(`/api/v1/products/${id}`);
      // console.log(data);

      // fetching data of single product whose id is {id}
      // const singleProduct = data.filter((elem) => elem._id === id);
      // console.log(singleProduct);

      return data; //returning fetched data
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
);
