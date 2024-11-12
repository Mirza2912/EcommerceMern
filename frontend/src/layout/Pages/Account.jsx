import React, { useState, useRef, useEffect } from "react";
import Title from "../Components/Title.jsx";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../Components/UserProfile.jsx";
import { useSelector } from "react-redux";
import Toast from "../Components/Toast.js";

const Account = () => {
  //For checking for title
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  //fetching data from user state
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  // console.log(isAuthenticated, user);
  // // // console.log(typeof user);
  // // console.log(typeof user, user);
  // // const location = useLocation();

  useEffect(() => {
    if (isAuthenticated === false) {
      // Toast(error, "error");
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {/* <Title title={`${user && user.data.name}'s Profile`} /> */}
      <div className="w-[100%] h-auto py-[10rem] flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        {/* heading  */}
        <div className="heading z-40 flex flex-col items-center mt-[5rem] mb-[7rem] xsm:mt-0 xsm:mb-5">
          <h2 className="text-white font-medium text-7xl xsm:text-5xl x font-roboto ">
            Account
          </h2>
          <h2 className="text-white font-roboto text-md mt-2">
            <Link to="/"> Home </Link> `{">>"}`
            <Link to="/account">Account</Link>
          </h2>
        </div>

        {/* rendering components  */}
        {/* {isAuthenticated === true ? <UserProfile /> : Navigate("/login")} */}
        {/* <UserProfile /> */}
        {/* {isAuthenticated && isAuthenticated === true ? (
          <UserForms />
        ) : (
          <UserProfile />
        )} */}
        {<UserProfile />}
      </div>
    </>
  );
};

export default Account;
