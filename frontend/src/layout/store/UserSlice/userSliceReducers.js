import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};

//function for registeration of user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      const { data } = await axios.post(
        "/api/v1/users/register",
        userData,
        config
      );

      // console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Registration failed"
      );
    }
  }
);

//For user verification
export const verifyUser = createAsyncThunk(
  "user/verification",
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
      console.log(error.response?.data);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Verification failed"
      );
    }
  }
);

//For login
export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      const { data } = await axios.post(
        "/api/v1/users/login",
        userData,
        config
      );
      // console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Login failed"
      );
    }
  }
);

//For logout
export const userLogOut = createAsyncThunk("user/logOut", async () => {
  // console.log(userData);

  try {
    const { data } = await axios.get("/api/v1/users/logout");

    return data?.data;
  } catch (error) {
    return (
      error.response.data?.errors ||
      error.response.data?.message ||
      error.message ||
      "Failed to logout user"
    );
  }
});

//For fetching userdetails
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/me", config); // secure route to get current user
      // console.log(data);

      return data;
    } catch (error) {
      // console.log(error);

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to load user"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/users/me/profile/update",
        userData,
        config
      );

      // console.log(data);

      return data;
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to update user profile"
      );
    }
  }
);

//for update password
export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/users/me/password/update",
        userData,
        config
      );

      // console.log(data);

      return data;
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to update user profile"
      );
    }
  }
);

//for forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    console.log(email);

    try {
      const { data } = await axios.post(
        "/api/v1/users/password/forgot",
        { email },
        config
      );

      // console.log(data);

      return data; //returning fetched data
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to load user"
      );
    }
  }
);

//for reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      const { data } = await axios.post(
        `/api/v1/users/user/password/reset/${userData?.token}`,
        userData,
        config
      );

      // console.log(data?.data);

      return data; //returning fetched data
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to reset password"
      );
    }
  }
);

//fro user delete permanently
export const userDelete = createAsyncThunk(
  "user/userDelete",
  async (imageId, { rejectWithValue }) => {
    // console.log(imageId);

    try {
      /*making api call with axios for getting user details from backend */
      const { data } = await axios.delete(
        "/api/v1/users/me/delete/account",
        imageId,
        config
      );

      // console.log(data); //returning fetched data
      return data;
    } catch (error) {
      // console.log(error.response.data.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to update user profile"
      );
    }
  }
);
