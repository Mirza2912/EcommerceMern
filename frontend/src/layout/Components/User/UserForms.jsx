import React, { useEffect, useState } from "react";
import { BiSolidFace } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Home/Toast.js";
import { Link, useNavigate } from "react-router-dom";
import {
  login,
  registerUser,
} from "../../store/UserSlice/userSliceReducers.js";
import { clearError } from "../../store/UserSlice/userSlice.js";

const UserForms = () => {
  //For checking user is loggedIn or not
  const [isLogin, setIsLogin] = useState(true);

  const Dispatch = useDispatch(); //useDispatch fro dispatch action
  const Navigate = useNavigate();

  //fetching data from user state
  const { isLoading, error, isVerify, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  // console.log(isVerify);

  //useState for storing registration data of user
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  //useState for storing login data of user
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //for registration avatar input
  const [avatar, setAvatar] = useState("/images/profile.jpg");
  signUpData.avatar = avatar; //set avatar = avatar mean after upload on cloudinary
  //for showing images which user select avatar
  const [preview, setPreview] = useState("/images/profile.jpg");

  // Handle input changes (when user insert data data will automatically store in signUp state)
  const handleSignUpChange = (e) => {
    const { name, value } = e.target; //extracting name and value from event

    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      // console.log(reader.readAsDataURL(e.target.files[0]));
    } else {
      setSignUpData({ ...signUpData, [name]: value });
      // console.log(signUpData);
    }
  };

  // Handle input changes (when user insert data data will automatically store in login state)
  const handleLoginChange = (e) => {
    const { name, value } = e.target; //extracting name and value from event
    setLoginData({ ...loginData, [name]: value }); //Dynamically change value of name
  };

  // Toggle between login and signUp forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  //Login Form handler
  const loginFormHandler = (e) => {
    e.preventDefault(); //form not reload

    Dispatch(login(loginData));
    if (isVerify !== false) {
      //when login success then clear login data
      setLoginData({ email: "", password: "" });
    }
  };

  //useEffect for navigation to otp-verification
  useEffect(() => {
    //if any error comes then show error
    if (error) {
      // console.log(error);

      Toast(error.message, "error");
      Dispatch(clearError());
    }

    //when user register and otp verify pages appeare then it will run mean when register complete its mean user registered and authenticated not verified
    if (isAuthenticated && isAuthenticated === true) {
      Toast(`${user && user.message}`, "success");
      Navigate(
        `/register/otp-verification/${user.data?.email}/${user.data?.phone}`
      );
    }

    //when user login successfully then automatically isVerify becomes true and if user is verified then navigate to home page for now  i will change
    if (isVerify) {
      // console.log("okay");

      Toast(`${user && user.message}`, "success");
      Navigate("/profile");
    }
  }, [isAuthenticated, Navigate, user, clearError, Dispatch, error]);

  //Register Form handler
  const registerFormHandler = (e) => {
    e.preventDefault();

    //dispatch for registration
    Dispatch(registerUser(signUpData));

    if (isAuthenticated && isAuthenticated === true) {
      //when register success then clear register data
      setSignUpData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
    }
  };

  return (
    <>
      <div className="w-[100%] h-auto py-[10rem] flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        <div className="heading z-40 flex flex-col items-center mt-[5rem] mb-[7rem] xsm:mt-0 xsm:mb-5">
          <h2 className="text-white font-medium text-7xl xsm:text-5xl x font-roboto ">
            Account
          </h2>
          <h2 className="text-white font-roboto text-md mt-2">
            <Link to="/"> Home </Link> `{">>"}`
            <Link to="/profile">Account</Link>
          </h2>
        </div>

        <div className="flex items-center justify-center w-[95%] xsm:w-[100%] slg:w-[75%] h-[90vh] bg-bg-color">
          <div className="w-full xsm:w-[90%] max-w-xl p-8 bg-transparent border border-[#c9c8c8] rounded-lg shadow-lg ">
            {/* Toggle Buttons */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-2.5 font-semibold text-center rounded-s-md ${
                  isLogin
                    ? "bg-[#ffce53] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-2.5 font-semibold text-center rounded-e-md ${
                  !isLogin
                    ? "bg-[#ffce53] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Register
              </button>
            </div>
            {/* Form */}
            {isLogin ? (
              <form className="space-y-4" onSubmit={loginFormHandler}>
                <div className="flex items-center justify-center relative">
                  <MdOutlineMailOutline className=" absolute top-4 left-2 text-2xl" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    placeholder="email address *Required"
                    className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
                  />
                </div>
                <div className="flex items-center justify-center relative">
                  <RiLockPasswordLine className=" absolute top-4 left-2 text-2xl" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    autoComplete="current-password"
                    onChange={handleLoginChange}
                    required
                    placeholder="password *Required"
                    className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full  mt-4 font-semibold py-3.5 rounded-full text-white border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]"
                  disabled={isLoading}
                >
                  {isLoading && isLoading === true ? "Login..." : "Login"}
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={registerFormHandler}>
                <div className="flex items-center justify-center relative">
                  <BiSolidFace className=" absolute top-4 left-2 text-2xl" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={signUpData.name}
                    autoComplete="username"
                    onChange={handleSignUpChange}
                    required
                    placeholder="username *Required"
                    className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
                  />
                </div>
                <div className="flex items-center justify-center relative">
                  <MdOutlineMailOutline className=" absolute top-4 left-2 text-2xl" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    required
                    placeholder="email address *Required"
                    className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
                  />
                </div>
                <div className="flex items-center justify-center relative">
                  <RiLockPasswordLine className=" absolute top-4 left-2 text-2xl" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={signUpData.password}
                    autoComplete="new-password"
                    onChange={handleSignUpChange}
                    required
                    placeholder="password *Required"
                    className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
                  />
                </div>

                <div className="flex items-center justify-center relative">
                  <IoCallOutline className=" absolute top-4 left-2 text-2xl" />
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={signUpData.phone}
                    autoComplete="phone"
                    onChange={handleSignUpChange}
                    required
                    placeholder="phone *Required"
                    className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
                  />
                </div>

                <div className="flex items-center justify-center gap-2">
                  {preview && (
                    <img
                      src={preview}
                      alt="Avatar Preview"
                      className="w-16 h-16 object-cover rounded-full shadow-md"
                    />
                  )}
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleSignUpChange}
                    className="w-full text-gray-700 focus:outline-none bg-white py-3.5 px-2 rounded-md "
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 mt-4 font-semibold text-white bg-transparent rounded-full border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]"
                  disabled={isLoading}
                >
                  {isLoading && isLoading === true
                    ? "Registering..."
                    : "Register"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForms;
