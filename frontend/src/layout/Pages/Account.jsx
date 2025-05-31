import React, { useEffect, useRef, useState } from "react";
import { BiSolidFace } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  registerUser,
  userLogin,
} from "../store/UserSlice/userSliceReducers.js";
import { toast } from "react-toastify";
import LoaderForForms from "../Components/Home/LoaderForForms.jsx";
import { clearError } from "../store/UserSlice/userSlice.js";
import FloatingInput from "../Components/Input/FloatingInput.jsx";
import SubmitButton from "../Components/SubmitButton/SubmitButton.jsx";

const Account = () => {
  //For checking user is loggedIn or not
  const [isLogin, setIsLogin] = useState("login");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fetching data from user state
  const { isLoading, error, isVerified, tempUser } = useSelector(
    (state) => state.auth
  );

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

  //useState for storing login data of employee
  const [empLoginData, setEmpLoginData] = useState({
    employeeId: "",
    password: "",
  });

  const location = useLocation();
  const from = location.state?.from?.pathname || "/user/profile";

  //for registration avatar input
  const [avatar, setAvatar] = useState("/src/assets/profile.jpg");
  signUpData.avatar = avatar; //set avatar = avatar mean after upload on cloudinary
  //for showing images which user select avatar
  const [preview, setPreview] = useState("/src/assets/profile.jpg");

  // Handle input changes (when user insert data data will automatically store in signUp state)
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
  };

  // Handle input changes (when user insert data data will automatically store in login state)
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle input changes (when employee insert data data will automatically store in login state)
  const handleEmpLoginChange = (e) => {
    const { name, value } = e.target;
    setEmpLoginData({ ...empLoginData, [name]: value });
  };

  //Login Form handler
  const loginFormHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(loginData));
    if (isVerified) {
      setLoginData({ email: "", password: "" });
    }
  };

  //empl Login Form handler
  const empLoginFormHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(empLoginData));
    if (isVerified) {
      setEmpLoginData({ employeeId: "", password: "" });
    }
  };

  //Register Form handler
  const registerFormHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(signUpData));

    if (tempUser) {
      setSignUpData({
        name: "",
        email: "",
        password: "",
        phone: "",
        avatar: "/src/assets/profile.jpg",
      });
    }
  };

  useEffect(() => {
    if (isVerified) {
      navigate(from === "/checkout/shipping" ? from : "/", { replace: true });
    }
  }, [isVerified]);

  return (
    <>
      <div className="min-h-screen lg:w-full flex items-center justify-center  px-4 py-10">
        <div
          className={`w-full max-w-5xl  sm:rounded-3xl  sm:p-8 ${
            isLogin ? "sm:mt-24" : "sm:mt-24"
          } flex flex-col lg:flex-row shadow-xl sm:border sm:border-gray-700`}
        >
          {/* Left Section */}
          <div className="w-full lg:text-start text-center lg:w-1/2 text-white flex flex-col justify-center mb-8 lg:mb-0 lg:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isLogin ? "Welcome Back" : "Create Account"} to{" "}
              <span className="text-gold">Store</span>
            </h1>
            <p className="text-gray-300 text-lg">
              {isLogin
                ? "Log in to continue shopping and manage your account."
                : "Sign up to explore our collection and place your first order."}
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-[60%] rounded-2xl p-6 md:p-8 border border-gray-600">
            {/* Toggle */}
            <div className="flex mb-6">
              <button
                onClick={() => setIsLogin("login")}
                className={`flex-1 py-2 rounded-l-lg font-medium ${
                  isLogin === "login"
                    ? "bg-[#ffce53] text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin("register")}
                className={`flex-1 py-2 font-medium ${
                  isLogin === "register"
                    ? "bg-[#ffce53] text-white"
                    : isLogin === "login"
                    ? "bg-gray-300 text-gray-800 border-r border-gray-400"
                    : "bg-gray-300 text-gray-800 border-l border-gray-400"
                }`}
              >
                Register
              </button>
              <button
                onClick={() => setIsLogin("emp")}
                className={`flex-1 py-2 rounded-r-lg font-medium ${
                  isLogin === "emp"
                    ? "bg-[#ffce53] text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                Employee
              </button>
            </div>

            {isLogin === "login" && (
              <form className="space-y-4" onSubmit={loginFormHandler}>
                {/* email  */}
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  icon={MdOutlineMailOutline}
                />

                {/* Password  */}
                <FloatingInput
                  label="Password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  icon={RiLockPasswordLine}
                />

                {/* Submit  */}
                <SubmitButton
                  type="submit"
                  isLoading={isLoading}
                  input="Login"
                  instead="Login"
                />

                <div className="mt-4 ">
                  <div className="flex justify-between px-2">
                    <p className="text-sm text-white/35">
                      Not registered?
                      <Link
                        onClick={() => setIsLogin(false)}
                        className="text-gold hover:underline ml-1"
                      >
                        Register Here
                      </Link>
                    </p>
                    <p className="text-sm text-gray-600">
                      <Link
                        to="/user/forgot-password"
                        className="text-gold hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            )}

            {isLogin === "register" && (
              <form className="space-y-4" onSubmit={registerFormHandler}>
                {/* name  */}
                <FloatingInput
                  label="Name"
                  name="name"
                  type="text"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  icon={BiSolidFace}
                />

                {/* email  */}
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  icon={MdOutlineMailOutline}
                />

                {/* Password  */}
                <FloatingInput
                  label="Password"
                  name="password"
                  type="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  icon={RiLockPasswordLine}
                />

                {/* Phone  */}
                <FloatingInput
                  label="Contact Number"
                  name="phone"
                  type="tel"
                  value={signUpData.phone}
                  onChange={handleSignUpChange}
                  icon={IoCallOutline}
                />

                <div className="flex items-center justify-center  gap-2">
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
                    className="w-full text-gray-700 focus:outline-none bg-white py-3.5 px-2 rounded-md"
                  />
                </div>

                {/* Submit  */}
                <SubmitButton
                  type="submit"
                  isLoading={isLoading}
                  input="Register"
                  instead="Register"
                />

                <div className="flex justify-between mt-4 px-2">
                  <p className="text-sm text-white/35">
                    Already registered?
                    <Link
                      onClick={() => setIsLogin(true)}
                      className="text-gold hover:underline ml-1"
                    >
                      Login here
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600">
                    <Link
                      to="/user/forgot-password"
                      className="text-gold hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </p>
                </div>
              </form>
            )}

            {isLogin === "emp" && (
              <form className="space-y-4" onSubmit={empLoginFormHandler}>
                {/* id  */}
                <FloatingInput
                  label="ID"
                  name="employeeId"
                  type="Number"
                  value={empLoginData.employeeId}
                  onChange={handleEmpLoginChange}
                  icon={MdOutlineMailOutline}
                />

                {/* Password  */}
                <FloatingInput
                  label="Password"
                  name="password"
                  type="password"
                  value={empLoginData.password}
                  onChange={handleEmpLoginChange}
                  icon={RiLockPasswordLine}
                />

                {/* Submit  */}
                <SubmitButton
                  type="submit"
                  isLoading={isLoading}
                  input="Login"
                  instead="Login"
                />

                <div className="mt-4 ">
                  <div className="flex justify-end px-2">
                    <p className="text-sm text-gray-600">
                      <Link
                        to="/user/forgot-password"
                        className="text-gold hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
