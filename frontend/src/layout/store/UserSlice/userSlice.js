import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  registerUser,
  userDetails,
  userLogout,
} from "./userSliceReducers.js";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    regUser: null,
    error: null,
  },
  //Simple reducers(Functions)
  reducers: {
    //reducer for clearing all errors
    clearError: (state) => {
      return { ...state, error: null };
    },
    //logout
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    //builder for login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      //builder for registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.regUser = action.payload;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.regUser = null;
        state.error = action.payload;
      })

      //builder for userDetails
      .addCase(userDetails.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      //for user logout
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logOut } = userSlice.actions;
export default userSlice.reducer;
