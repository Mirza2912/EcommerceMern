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
import { userDetails } from "./layout/store/Action/userActions.js";
import { ProtectedRoute } from "./layout/Routes/protectedRoute.jsx";
import UserSpeedDial from "./layout/Components/Home/SpeedDial.jsx";
import UpdateProfile from "./layout/Components/User/UpdateProfile.jsx";

/*--------------------------------------*/
/*     Defining Routes of Website
/*--------------------------------------*/
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(isAuthenticated, user);

  const dispatch = useDispatch();
  // //useEffect for loading loggedIn user details
  useEffect(() => {
    dispatch(userDetails());
  }, []);

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
      {isAuthenticated && <UserSpeedDial user={user} />}

      {/* All routes  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/account"
          element={<ProtectedRoute component={Account} />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />

        <Route path="/login" element={<UserForms />} />
        <Route path="/product/:id" element={<SingleProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
