import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};

export const getAllSales = createAsyncThunk(
  "sale/getAllSales",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/sale");

      //   console.log(data.data);

      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Fetching Sales failed"
      );
    }
  }
);

export const deleteSale = createAsyncThunk(
  "sale/deleteSale",
  async (id, { rejectWithValue }) => {
    try {
      //   console.log(id);

      const { data } = await axios.delete(`/api/v1/sale/delete/${id}`);

      //   console.log(data);

      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "delete Sale failed"
      );
    }
  }
);

export const getSingleSale = createAsyncThunk(
  "sale/getSingleSale",
  async (id, { rejectWithValue }) => {
    try {
      console.log("id", id);

      const { data } = await axios.get(`/api/v1/sale/admin/single-sale/${id}`);

      //   console.log(data);

      return data?.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Fetching single Sale failed"
      );
    }
  }
);

export const getSalesOfEmployee = createAsyncThunk(
  "sale/getSalesOfEmployee",
  async (id, { rejectWithValue }) => {
    try {
      //   console.log("id", id);

      const { data } = await axios.get(
        `/api/v1/sale/admin/get-single-employee-sales/${id}`
      );

      //   console.log(data);

      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Fetching single Sale failed"
      );
    }
  }
);

//create sale by employee
export const createNewSaleByEmployee = createAsyncThunk(
  "sale/createNewSaleByEmployee",
  async (saleData, { rejectWithValue }) => {
    try {
      console.log("data", saleData);

      const { data } = await axios.post(
        `/api/v1/sale/create-physical-sale`,
        saleData,
        config
      );

      console.log(data?.data);

      return data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Create Sale failed"
      );
    }
  }
);

//get my sales
export const getMyAllSales = createAsyncThunk(
  "sale/getMyAllSales",
  async (_, { rejectWithValue }) => {
    try {
      //   console.log("id", id);

      const { data } = await axios.get(`/api/v1/sale/my-sales`);

      // console.log(data);

      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Fetching single Sale failed"
      );
    }
  }
);

//get single sale by employee
export const getSingleSalebyEmployee = createAsyncThunk(
  "sale/getSingleSalebyEmployee",
  async (id, { rejectWithValue }) => {
    try {
      console.log("id", id);

      const { data } = await axios.get(`/api/v1/sale/single-sale/${id}`);

      // console.log(data);

      return data?.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Fetching single Sale failed"
      );
    }
  }
);

//return sale

//get single sale by employee
export const returnSale = createAsyncThunk(
  "sale/returnSale",
  async (saleData, { rejectWithValue }) => {
    try {
      console.log("id", saleData.saleData);

      const items = saleData.saleData;

      const { data } = await axios.put(
        `/api/v1/sale/return-sale/${saleData.saleId}`,
        { items },
        config
      );

      // console.log(data);

      return data?.message;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Fetching single Sale failed"
      );
    }
  }
);
