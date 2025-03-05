import React, { useEffect } from "react";
import Home from "./layout/Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Components/Home/Header.jsx";
import About from "./layout/Pages/About";
import Products from "./layout/Pages/Products";
import Contact from "./layout/Pages/Contact";
import Account from "./layout/Pages/Account.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SingleProductDetail from "./layout/Pages/SingleProductDetail";
import { useDispatch, useSelector } from "react-redux";
import UserForms from "./layout/Components/User/UserForms.jsx";

import { ProtectedRoute } from "./layout/Routes/protectedRoute.jsx";
import UserSpeedDial from "./layout/Components/Home/SpeedDial.jsx";
import UpdateProfile from "./layout/Components/User/UpdateProfile.jsx";
import Search from "./layout/Pages/Search.jsx";
import Verification from "./layout/Components/User/Verification.jsx";
import { userDetails } from "./layout/store/UserSlice/userSliceReducers.js";
import { clearError } from "./layout/store/UserSlice/userSlice.js";
import UpdatePassword from "./layout/Components/User/UpdatePassword.jsx";

/*--------------------------------------*/
/*     Defining Routes of Website
/*--------------------------------------*/
const App = () => {
  const { isVerify, user, error } = useSelector((state) => state.auth);
  // console.log(user);

  const Dispatch = useDispatch();
  //useEffect for loading loggedIn user details
  useEffect(() => {
    //if any error comes then show error
    if (error) {
      // console.log(error);

      Toast(error.message, "error");
      Dispatch(clearError());
    }
    Dispatch(userDetails());
  }, [Dispatch]);

  // const optionsForToast = {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   newestOnTop: false,
  //   closeOnClick: true,
  //   rtl: false,
  //   pauseOnFocusLoss: false,
  //   draggable: true,
  //   pauseOnHover: true,
  //   theme: "dark",
  // };
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />

      {/* Header/Navbar  */}
      <Header />

      {/* for showing speed dial to every where in whole website */}
      {isVerify && isVerify === true && <UserSpeedDial user={user} />}

      {/* All routes  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/products" element={<Products />} /> */}
        {/* <Route path="/products/:keyword" element={<Products />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={Account} />}
        />
        <Route path="/account" element={<UserForms />} />
        <Route
          path="/register/otp-verification/:email/:phone"
          element={<Verification />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route
          path="/me/update-password"
          element={<ProtectedRoute component={UpdatePassword} />}
        />

        {/* <Route path="/product/:id" element={<SingleProductDetail />} /> */}
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
