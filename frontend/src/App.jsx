import React, { useEffect } from "react";
import Home from "./layout/Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import About from "./layout/Pages/About";
import Contact from "./layout/Pages/Contact";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./layout/Pages/Profile.jsx";
import Account from "./layout/Pages/Account.jsx";
import Navbar from "./layout/Components/Home/Navbar.jsx";
import OtpVerification from "./layout/Pages/OtpVerification.jsx";
import ProtectedRoute from "./layout/Routes/protectedRoute.jsx";
import { toast } from "react-toastify";
import {
  cleareResetPasswordMessage,
  cleareUpdateProfileMessage,
  cleareUserDeleteMessage,
  clearForgotPasswordMessage,
  clearLoginMessage,
  clearLogoutMessage,
  clearRegisterMessage,
  clearUserPasswordMessage,
  clearVerificationMessage,
} from "./layout/store/UserSlice/userSlice.js";
import { loadUser } from "./layout/store/UserSlice/userSliceReducers.js";
import EditProfile from "./layout/Components/User/EditProfile.jsx";
import UpdatePassword from "./layout/Components/User/UpdatePassword.jsx";
import ForgotPassword from "./layout/Components/User/ForgotPassword.jsx";
import ResetPassword from "./layout/Components/User/ResetPassword.jsx";

import {
  getBannerProducts,
  getFeaturedProducts,
  singleProductDetails,
} from "./layout/store/ProductSlice/productSliceReducers.js";
import { clearSingleProductDetailsMessage } from "./layout/store/ProductSlice/productSlice.js";
import { getAllCategories } from "./layout/store/CategorySlice/categorySliceReducers.js";
import Products from "./layout/Pages/Products.jsx";

const App = () => {
  const {
    resgisterMessage,
    tempUser,
    verificationMessage,
    loginMessage,
    logOutMessage,
    updateProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
    forgotPasswordMessage,
    resetPasswordMessage,
  } = useSelector((state) => state.auth);

  const { singleProductDetailsMessage } = useSelector((state) => state.product);
  // const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* USEEFFCART FOR TOAST AND CLEAR MESSAGES*/
  useEffect(() => {
    let timeout;

    /* FOR USER AUTHENTICATION */

    // if (error) {
    //   toast.error(error);
    //   timeout = setTimeout(() => {
    //     dispatch(clearError());
    //   }, 1500);
    // }

    //user reagisteration success message show
    if (resgisterMessage) {
      toast.success(resgisterMessage);
      // timeout = setTimeout(() => {
      navigate(
        `/register/otp-verification/${tempUser?.data?.email}/${tempUser?.data?.phone}`,
        {
          replace: true,
        }
      );
      dispatch(clearRegisterMessage());
      // }, 1500);
    }

    //user verification success message show
    if (verificationMessage) {
      toast.success(verificationMessage);
      // timeout = setTimeout(() => {
      navigate(`/user/profile`, {
        replace: true,
      });
      dispatch(clearVerificationMessage());
      // }, 1500);
    }

    //user login success message show
    if (loginMessage) {
      toast.success(loginMessage);
      // timeout = setTimeout(() => {
      navigate(`/user/profile`, {
        replace: true,
      });
      dispatch(clearLoginMessage());
      // }, 1000);
    }

    //user logout success message show
    if (logOutMessage) {
      toast.success(logOutMessage);
      // timeout = setTimeout(() => {
      navigate(`/account`);
      dispatch(clearLogoutMessage());
      // }, 1500);
    }
    //   dispatch(clearCartLocal());
    //   timeout = setTimeout(() => {
    //     dispatch(clearLogoutMessage());
    //     navigate("/login");
    //   }, 1500);
    // }

    //user update profile success message show
    if (updateProfileMessage) {
      toast.success(updateProfileMessage);
      // timeout = setTimeout(() => {
      dispatch(cleareUpdateProfileMessage());
      navigate("/user/profile", { replace: true });
      // }, 1500);
    }

    //user update password message success message show
    if (changeUserPasswordMessage) {
      toast.success(changeUserPasswordMessage);
      // timeout = setTimeout(() => {
      dispatch(clearUserPasswordMessage());
      navigate("/user/profile", { replace: true });
      // }, 1500);
    }

    //user delete success message show
    if (deleteUserMessage) {
      toast.success(deleteUserMessage);
      // timeout = setTimeout(() => {
      dispatch(cleareUserDeleteMessage());
      navigate("/account", { replace: true });
      // }, 1500);
    }

    if (forgotPasswordMessage) {
      toast.success(forgotPasswordMessage);

      // timeout = setTimeout(() => {
      dispatch(clearForgotPasswordMessage());
      navigate("/account", { replace: true });
      // }, 1500);
    }

    if (resetPasswordMessage) {
      toast.success(resetPasswordMessage);

      // timeout = setTimeout(() => {
      dispatch(cleareResetPasswordMessage());
      navigate("/account", { replace: true });
      // }, 1500);
    }

    /* FOR Products*/

    if (singleProductDetailsMessage) {
      toast.success(singleProductDetailsMessage);
      dispatch(clearSingleProductDetailsMessage());
      navigate("/account", { replace: true });
    }

    // /* FOR USER CART */

    // //Add to cart item to backend message -->when user logged in
    // if (addToCartBackendMessage) {
    //   toast.success(addToCartBackendMessage);
    //   timeout = setTimeout(() => {
    //     dispatch(clearAddToCartBackendMessage());
    //   }, 1500);
    // }

    // //update item of cart to backend message -->when user logged in
    // if (addToCartUpdateBackendMessage) {
    //   toast.success(addToCartUpdateBackendMessage);
    //   timeout = setTimeout(() => {
    //     dispatch(clearAddToCartUpdateBackendMessage());
    //   }, 1500);
    // }

    // //update item of cart to backend message -->when user is guest
    // if (updateCartOfLocalMessage) {
    //   toast.success(updateCartOfLocalMessage);
    //   timeout = setTimeout(() => {
    //     dispatch(clearUpdateCartOfLocalMessage());
    //   }, 1500);
    // }

    return () => clearTimeout(timeout);
  }, [
    resgisterMessage,
    verificationMessage,
    loginMessage,
    logOutMessage,
    updateProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
    forgotPasswordMessage,
    resetPasswordMessage,
    singleProductDetailsMessage,
    // addToCartBackendMessage,
    // addToCartUpdateBackendMessage,
    // updateCartOfLocalMessage,
  ]);

  const id = "67e07f3c4a65673202e599f0";

  useEffect(() => {
    dispatch(loadUser());
    // dispatch(getFeaturedProducts());
    // dispatch(getBannerProducts());
    // dispatch(singleProductDetails(id));
    // dispatch(getAllCategories());
  }, []);
  return (
    <>
      <Navbar />
      {/* {isVerify && isVerify === true && <UserSpeedDial user={user} />} */}
      <div className="w-[100%] min-h-screen relative flex items-center justify-center flex-col bg-[url('/src/assets//body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/products/:keyword" element={<Products />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/register/otp-verification/:email/:phone"
            element={<OtpVerification />}
          />

          <Route path="/user/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/user/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/me/profile/update" element={<EditProfile />} />
            <Route path="/me/update-password" element={<UpdatePassword />} />
          </Route>
          {/* 

          {/* <Route path="/product/:id" element={<SingleProductDetail />} /> */}
          {/* <Route path="/search" element={<Search />} /> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
