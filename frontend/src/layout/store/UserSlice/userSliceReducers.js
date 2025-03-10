import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};
//For Login user
export const login = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      /*making api call with axios for getting product from backend */
      const { data } = await axios.post(
        "/api/v1/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data; //returning fetched data
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//For user registration
export const registerUser = createAsyncThunk(
  "registerUser",
  async (registerCredentials, { rejectWithValue }) => {
    // console.log(registerCredentials);
    // console.log(rejectWithValue);

    try {
      /*making api call with axios for sending user data and picking response from backend */
      const { data } = await axios.post(
        "/api/v1/users/register",
        registerCredentials,
        config
      );

      // console.log(data);
      return data; //returning fetched data
    } catch (error) {
      // console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//For user verification
export const verifyUser = createAsyncThunk(
  "verifyUser",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      /*making api call with axios for sending user data and picking response from backend */
      const { data } = await axios.post(
        "/api/v1/users/opt-verification",
        userData,
        config
      );

      // console.log(data);
      return data; //returning fetched data
    } catch (error) {
      // console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//For user details
export const userDetails = createAsyncThunk("userDetails", async () => {
  try {
    /*making api call with axios for getting user details from backend */
    const { data } = await axios.get("/api/v1/users/me");

    // console.log(data);

    return data; //returning fetched data
  } catch (error) {
    return error.response?.data || error.message;
  }
});

//fro user logout
export const userLogout = createAsyncThunk("userLogout", async () => {
  try {
    /*making api call with axios for getting user details from backend */
    await axios.get("/api/v1/users/logout");

    // console.log(data); //returning fetched data
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response?.data || error.message;
  }
});

//for update password
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      /*making api call with axios for getting user details from backend */
      const { data } = await axios.put(
        "/api/v1/users/me/password/update",
        userData,
        config
      );

      // console.log(data);

      return data; //returning fetched data
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//for update password
export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      /*making api call with axios for getting user details from backend */
      const { data } = await axios.put(
        "/api/v1/users/me/profile/update",
        userData,
        config
      );

      // console.log(data);

      return data; //returning fetched data
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//for forgot password
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      /*making api call with axios for fetching response from backend when we call forgot function */
      const { data } = await axios.post(
        "/api/v1/users/me/password/forgot",
        userData,
        config
      );

      // console.log(data);

      return data; //returning fetched data
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//fro user logout
export const userDelete = createAsyncThunk(
  "userDelete",
  async (_, { rejectWithValue }) => {
    try {
      /*making api call with axios for getting user details from backend */
      await axios.delete("/api/v1/users/me/delete/account");

      // console.log(data); //returning fetched data
    } catch (error) {
      // console.log(error.response.data.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
