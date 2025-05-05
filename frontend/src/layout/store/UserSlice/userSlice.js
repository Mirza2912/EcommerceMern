// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserPassword,
  forgotPassword,
  loadUser,
  registerUser,
  resetPassword,
  updateUserProfile,
  userDelete,
  userLogin,
  userLogOut,
  verifyUser,
} from "./userSliceReducers";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, //for storing user data
    tempUser: null, //when user give credentials and got otp
    isVerified: false, //when user verify the otp now user is authenticated
    isLoading: false,
    error: null,
    resgisterMessage: "",
    logOutMessage: "",
    updateProfileMessage: "",
    changeUserPasswordMessage: "",
    forgotPasswordMessage: "",
    resetPasswordMessage: "",
    deleteUserMessage: "",
    verificationMessage: "",
    loginMessage: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRegisterMessage: (state) => {
      state.resgisterMessage = "";
    },
    clearVerificationMessage: (state) => {
      state.verificationMessage = "";
    },
    clearLoginMessage: (state) => {
      state.loginMessage = "";
    },
    clearLogoutMessage: (state) => {
      state.logOutMessage = "";
    },
    cleareUpdateProfileMessage: (state) => {
      state.updateProfileMessage = "";
    },
    clearUserPasswordMessage: (state) => {
      state.changeUserPasswordMessage = "";
    },
    clearForgotPasswordMessage: (state) => {
      state.forgotPasswordMessage = "";
    },
    cleareResetPasswordMessage: (state) => {
      state.resetPasswordMessage = "";
    },
    cleareUserDeleteMessage: (state) => {
      state.deleteUserMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tempUser = action.payload;
        state.resgisterMessage = action.payload?.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tempUser = null;
        state.isVerified = true;
        state.verificationMessage = action.payload?.message;
        state.user = action.payload;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isVerified = true;
        state.loginMessage = action.payload?.message;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isVerified = false;
        state.tempUser = null;
        state.logOutMessage = action.payload;
      })
      .addCase(userLogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isVerified = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.updateProfileMessage = action.payload?.message;
        state.isVerified = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.changeUserPasswordMessage = action.payload?.message;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forgotPasswordMessage = "Reset password link sent to your email";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetPasswordMessage = action.payload?.message;
        state.isVerified = false;
        state.user = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isVerified = false;
        state.deleteUserMessage = action.payload?.data;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const {
  clearError,
  clearLogoutMessage,
  cleareUpdateProfileMessage,
  clearUserPasswordMessage,
  clearForgotPasswordMessage,
  cleareResetPasswordMessage,
  cleareUserDeleteMessage,
  clearRegisterMessage,
  clearVerificationMessage,
  clearLoginMessage,
} = userSlice.actions;
