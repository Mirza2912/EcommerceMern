import { createSlice } from "@reduxjs/toolkit";
import {
  // login,
  registerUser,
  // userDetails,
  // userLogout,
  verifyUser,
} from "./userSliceReducers.js";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    isVerify: false,
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
    // builder
    //   .addCase(login.pending, (state) => {
    //     state.loading = true;
    //     state.isAuthenticated = false;
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.isAuthenticated = true;
    //     state.user = action.payload;
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.loading = false;
    //     state.isAuthenticated = false;
    //     state.user = null;
    //     state.error = action.payload;
    //   })

    //builder for registration
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.regUser = action.payload;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.regUser = null;
        state.user = null;
        state.error = action.payload;
      })

      //for verify user
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.isVerify = false;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isVerify = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.regUser = action.payload;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isVerify = false;
        state.error = action.payload;
      });

    //builder for userDetails
    // .addCase(userDetails.pending, (state) => {
    //   state.loading = true;
    //   state.isAuthenticated = false;
    // })
    // .addCase(userDetails.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    // })
    // .addCase(userDetails.rejected, (state, action) => {
    //   state.loading = false;
    //   state.user = null;
    //   state.error = action.payload;
    //   state.isAuthenticated = false;
    // })

    //for user logout
    // .addCase(userLogout.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = null;
    //   state.isAuthenticated = false;
    // })
    // .addCase(userLogout.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { clearError, logOut } = userSlice.actions;
export default userSlice.reducer;
