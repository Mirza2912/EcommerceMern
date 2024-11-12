import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//For Login user
export const login = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    // console.log({ email, password });

    //config for post request
    // const config = { headers: { "Content-Type": "application/json" } };

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
      // console.log(response);
      // const { data } = response;

      // console.log(data);
      return data; //returning fetched data
    } catch (error) {
      // console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//For user registration
export const registerUser = createAsyncThunk(
  "registerUser",
  async (registerCredentials, { rejectWithValue }) => {
    // console.log(registerCredentials);

    //config for post request
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try {
      /*making api call with axios for sending user data and picking response from backend */
      const { data } = await axios.post(
        "/api/v1/users/register",
        registerCredentials,
        config
      );

      console.log(data);
      return data; //returning fetched data
    } catch (error) {
      // console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//For user details
export const userDetails = createAsyncThunk("userDetails", async () => {
  try {
    /*making api call with axios for getting user details from backend */
    const { data } = await axios.get("/api/v1/users/user");

    console.log(data);

    return data; //returning fetched data
  } catch (error) {
    console.log(error.response);
    // if (error.response && error.response.status === 401) {
    //   return "User not logged In...!";
    // }
    // if (
    //   error.response &&
    //   error.response.data.message ===
    //     "You need to login to access this resource...!"
    // ) {
    //   // Specific error handling for unauthorized access
    //   return rejectWithValue("User not logged in");
    // }
    return error.response.data.message;
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
    return error.response.data.message;
  }
});
