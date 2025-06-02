// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserPassword,
  deleteUser,
  forgotPassword,
  getAllEmployees,
  getAllUsers,
  getSingleUserDetails,
  loadUser,
  registerUser,
  resetPassword,
  suspendUser,
  unSuspendUser,
  updateUserProfile,
  updateUserRole,
  userDelete,
  userLogin,
  userLogOut,
  verifyUser,
} from "./userSliceReducers";
import { getSingleOrderDetails } from "../OrderSlice/orderSliceReducers";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, //for storing user data
    tempUser: null, //when user give credentials and got otp
    isVerified: false, //when user verify the otp now user is authenticated
    allUsers: [],
    allEmployees: [],
    singleUserDetails: {},
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
    adminDeleteUserMessage: "",
    singleUserDetailsMessage: "",
    adminDeleteEmployeeMessage: "",
    suspendUserMessage: "",
    unSuspendUserMessage: "",
    updateUserRoleMessage: "",
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
    clearAdminDeleteUserMessage: (state) => {
      state.adminDeleteUserMessage = "";
    },
    clearAdminDeleteEmployeeMessage: (state) => {
      state.adminDeleteEmployeeMessage = "";
    },
    clearSingleUserDetailsMessage: (state) => {
      state.singleUserDetailsMessage = "";
    },
    clearSuspendUserMessage: (state) => {
      state.suspendUserMessage = "";
    },
    clearUnSuspendUserMessage: (state) => {
      state.unSuspendUserMessage = "";
    },
    clearUpdateUserRoleMessage: (state) => {
      state.updateUserRoleMessage = "";
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
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allEmployees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedUserId = action.meta.arg.id;
        const user = action.meta.arg.type;

        // Set message for correct category
        if (user === "user") {
          state.adminDeleteUserMessage = action.payload;
          state.allUsers = state.allUsers?.filter(
            (user) => user._id !== deletedUserId
          );
        } else if (user === "emp") {
          state.adminDeleteEmployeeMessage = action.payload;
          state.allEmployees = state.allEmployees?.filter(
            (employee) => employee._id !== deletedUserId
          );
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUserDetails = action.payload;
        state.singleUserDetailsMessage = action.payload?.message;
      })
      .addCase(getSingleUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(suspendUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suspendUserMessage = action.payload?.message;
        const updatedUser = action.payload?.data;
        const type = action.meta.arg.type;
        if (type === "user") {
          state.allUsers = state.allUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          );
        } else if (type === "emp") {
          state.allEmployees = state.allEmployees.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          );
        }
      })
      .addCase(suspendUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unSuspendUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unSuspendUserMessage = action.payload?.message;
        const updatedUser = action.payload?.data;
        const type = action.meta.arg.type;
        if (type === "user") {
          state.allUsers = state.allUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          );
        } else if (type === "emp") {
          state.allEmployees = state.allEmployees.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          );
        }
      })
      .addCase(unSuspendUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUserDetails = action.payload;
        state.updateUserRoleMessage = action.payload?.message;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
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
  clearAdminDeleteUserMessage,
  clearSingleUserDetailsMessage,
  clearAdminDeleteEmployeeMessage,
  clearSuspendUserMessage,
  clearUnSuspendUserMessage,
  clearUpdateUserRoleMessage,
} = userSlice.actions;
