import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  registerUser,
  updatePassword,
  updateProfile,
  userDetails,
  userLogout,
  verifyUser,
} from "./userSliceReducers.js";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isVerify: false,
    isAuthenticated: false,
    updatePasswordSuccessMessage: "",
    updateProfileSuccessMessage: "",
    user: null,
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
      state.isVerify = false;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    //builder for registration
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      //for verify user
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isVerify = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isVerify = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      //builder for login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isVerify = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isVerify = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isVerify = false;
        state.error = action.payload;
      })

      //builder for userDetails
      .addCase(userDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          action.payload.message === "User not found" ||
          action.payload.message ===
            "You need to login to access this resource...!"
        ) {
          state.isVerify = false;
        } else {
          state.isVerify = true;
        }
        state.user = action.payload;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isVerify = false;
        state.error = action.payload;
      })

      //for user logout
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isVerify = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //for updatePassword
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.updatePasswordSuccessMessage = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //for update profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.updateProfileSuccessMessage = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logOut } = userSlice.actions;
export default userSlice.reducer;
