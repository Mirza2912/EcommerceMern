import React, { useEffect } from "react";
import Home from "./layout/Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Components/Header";
import About from "./layout/Pages/About";
import Products from "./layout/Pages/Products";
import Contact from "./layout/Pages/Contact";
import Login from "./layout/Pages/Login";
import Account from "./layout/Pages/Account.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SingleProductDetail from "./layout/Pages/SingleProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./Store.js";
import UserProfile from "./layout/Components/UserProfile.jsx";
import UserForms from "./layout/Components/UserForms.jsx";
import { userDetails } from "./layout/store/Action/userActions.js.js";

/*--------------------------------------*/
/*     Defining Routes of Website
/*--------------------------------------*/
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(isAuthenticated, user);

  const dispatch = useDispatch();
  // //useEffect for loading loggedIn user details
  useEffect(() => {
    dispatch(userDetails());
  }, []);
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/services" element={<Products />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/login" element={<UserForms />} />
        <Route exact path="/product/:id" element={<SingleProductDetail />} />
      </Routes>
      {/* <Header /> */}
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
