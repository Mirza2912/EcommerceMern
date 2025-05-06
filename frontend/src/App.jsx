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
  getFeaturedProducts,
  singleProductDetails,
} from "./layout/store/ProductSlice/productSliceReducers.js";
import { getAllCategories } from "./layout/store/CategorySlice/categorySliceReducers.js";
import Products from "./layout/Pages/Products.jsx";
import Footer from "./layout/Components/Footer/Footer.jsx";
import SingleProductDetails from "./layout/Pages/SingleProductDetail.jsx";
import Cart from "./layout/Pages/Cart.jsx";
import {
  clearAddToCartBackednMessage,
  clearAddToCartUpdateBackendMessage,
  clearDeleteCartItemFromBackendMessage,
  clearUpdateCartLocal,
} from "./layout/store/CartSlice/CartSlice.js";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "./layout/store/CartSlice/CartLocalStorageHandle.js";
import {
  addToCartBackend,
  getCart,
} from "./layout/store/CartSlice/CartSliceReducers.js";

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
    isVerified,
  } = useSelector((state) => state.auth);

  const {} = useSelector((state) => state.product);

  const {
    updateCartOfLocalMessage,
    addToCartBackendMessage,
    addToCartUpdateBackendMessage,
    deleteCartItemFromBackendMessage,
  } = useSelector((state) => state.cart);
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
      navigate(
        `/register/otp-verification/${tempUser?.data?.email}/${tempUser?.data?.phone}`,
        {
          replace: true,
        }
      );
      dispatch(clearRegisterMessage());
    }

    //user verification success message show
    if (verificationMessage) {
      toast.success(verificationMessage);
      navigate(`/`, {
        replace: true,
      });
      dispatch(clearVerificationMessage());
    }

    //user login success message show
    if (loginMessage) {
      toast.success(loginMessage);
      navigate(`/`, {
        replace: true,
      });
      dispatch(clearLoginMessage());
    }

    //user logout success message show
    if (logOutMessage) {
      toast.success(logOutMessage);
      navigate(`/`);
      dispatch(clearLogoutMessage());
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
      dispatch(cleareUpdateProfileMessage());
      navigate("/user/profile", { replace: true });
    }

    //user update password message success message show
    if (changeUserPasswordMessage) {
      toast.success(changeUserPasswordMessage);
      dispatch(clearUserPasswordMessage());
      navigate("/user/profile", { replace: true });
    }

    //user delete success message show
    if (deleteUserMessage) {
      toast.success(deleteUserMessage);
      dispatch(cleareUserDeleteMessage());
      navigate("/", { replace: true });
    }

    if (forgotPasswordMessage) {
      toast.success(forgotPasswordMessage);

      dispatch(clearForgotPasswordMessage());
      navigate("/account", { replace: true });
    }

    if (resetPasswordMessage) {
      toast.success(resetPasswordMessage);

      dispatch(cleareResetPasswordMessage());
      navigate("/account", { replace: true });
    }

    /* FOR Products*/

    // /* FOR USER CART */

    //Add to cart item to backend message -->when user logged in
    if (addToCartBackendMessage) {
      toast.success(addToCartBackendMessage);
      dispatch(clearAddToCartBackednMessage());
    }

    //add item of cart to backend message -->when user logged in
    if (addToCartUpdateBackendMessage) {
      toast.success(addToCartUpdateBackendMessage);
      dispatch(clearAddToCartUpdateBackendMessage());
    }

    //update item of cart to backend message
    if (updateCartOfLocalMessage) {
      toast.success(updateCartOfLocalMessage);
      dispatch(clearUpdateCartLocal());
    }

    //delet item of cart to backend message
    if (deleteCartItemFromBackendMessage) {
      toast.success(deleteCartItemFromBackendMessage);
      dispatch(clearDeleteCartItemFromBackendMessage());
    }

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
    updateCartOfLocalMessage,
    addToCartBackendMessage,
    addToCartUpdateBackendMessage,
    deleteCartItemFromBackendMessage,

    // addToCartBackendMessage,
    // addToCartUpdateBackendMessage,
    // updateCartOfLocalMessage,
  ]);

  const id = "67e07f3c4a65673202e599f0";

  useEffect(() => {
    dispatch(loadUser());
    if (isVerified) {
      const guestCart = loadCartFromLocalStorage(); //this will be an array
      // console.log(guestCart);

      //if logged in user have alreay select items when loggedout this will be store in backend also
      if (guestCart?.length > 0) {
        guestCart.forEach((item) => {
          dispatch(
            addToCartBackend({
              productId: item?.product,
              quantity: item?.quantity,
              price: item?.price,
            })
          );
        });
        saveCartToLocalStorage([]); // Clear Local Cart after sending
      }

      //if user logged in then fetch user cart
      dispatch(getCart());
    }
  }, [isVerified]);
  return (
    <>
      <Navbar />
      {/* {isVerify && isVerify === true && <UserSpeedDial user={user} />} */}
      <div className="w-[100%] min-h-screen relative flex items-center justify-center flex-col bg-[url('/src/assets//body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<SingleProductDetails />} />
          <Route path="/cart" element={<Cart />} />
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

          {/* <Route path="/search" element={<Search />} /> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
