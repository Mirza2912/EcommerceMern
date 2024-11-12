/*--------------------------------------*/
/*     Get All Products
/*--------------------------------------*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  try {
    /*making api call with axios for getting product from backend */
    const { data } = await axios("/api/v1/products");
    // console.log(data);
    return data; //returning fetched data
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
});

/*--------------------------------------*/
/*     Get Single product details
  /*--------------------------------------*/

export const singleProductDetails = createAsyncThunk(
  "singleProductDetails",
  async (id) => {
    // console.log(id);

    try {
      /*making api call with axios for getting single product details from backend */
      const { data } = await axios(`/api/v1/products/${id}`);
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
