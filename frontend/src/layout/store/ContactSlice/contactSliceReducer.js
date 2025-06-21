import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};
export const createNewContact = createAsyncThunk(
  "contact/createNewContact",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.post(`/api/v1/contact/new`, data, config);
      console.log(response?.data);
      return response?.data?.data; //returning fetched data
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to make contact "
      );
    }
  }
);

export const getAllContacts = createAsyncThunk(
  "contact/getAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      //   console.log(data);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.get(`/api/v1/contact`);
      console.log(response?.data);
      return response?.data?.data; //returning fetched data
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch contact "
      );
    }
  }
);

export const getSingleContactDetails = createAsyncThunk(
  "contact/getSingleContactDetails",
  async (id, { rejectWithValue }) => {
    try {
      //   console.log(id);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.get(`/api/v1/contact/single-contact/${id}`);
      //   console.log(response?.data);
      return response?.data?.data; //returning fetched data
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch contact "
      );
    }
  }
);

export const deleteSingleContact = createAsyncThunk(
  "contact/deleteSingleContact",
  async (id, { rejectWithValue }) => {
    try {
      //   console.log(id);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.delete(`/api/v1/contact/delete/${id}`);
      //   console.log(response?.data);
      return response?.data?.data; //returning fetched data
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch contact "
      );
    }
  }
);
