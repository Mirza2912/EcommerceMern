import React, { useState, useRef, useEffect } from "react";
import "../Style/Account.css";
import Title from "../Components/Home/Title.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Components/Home/Toast.js";
import { userLogout } from "../store/Action/userActions.js";

const Account = () => {
  //For checking for title
  // const [isLogin, setIsLogin] = useState(true);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  //fetching data from user state
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  // console.log(user.message);

  // destructuring all data of user
  const { name, email, role, avatar, createdAt } = user.data.user;
  // console.log(u);

  useEffect(() => {
    if (isAuthenticated === false) {
      Navigate("/login");
      // Toast(error, "error");
    }
  }, [Navigate, isAuthenticated]);

  return (
    <>
      {/* <Title title={`${user && user.data.name}'s Profile`} /> */}
      <div className="w-[100%] min-h-[100vh] font-roboto flex items-center justify-center bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        {/* heading  */}
        <div className="bg-bg-color flex flex-col items-center justify-center w-[90%] py-[10vh] my-[20vh]">
          <h2 className="text-white mb-10 uppercase font-roboto font-semibold text-6xl xsm:text-5xl ">
            Account Details
          </h2>
          <div className=" w-[100%] flex  ">
            <div className="w-[50%] flex flex-col items-center justify-center gap-10">
              <img
                className="w-[300px] h-[300px] bg-cover bg-center rounded-full"
                src={`${avatar.url}`}
                alt={`${name}`}
              />
              {/* <button
            className="text-white py-2 px-3 bg-red-400 hover:bg-red-800"
            onClick={() => {
              Dispatch(userLogout());
              Navigate("/login");
              Toast("success", "Logged out Successfully");
            }}
          >
            logout
          </button> */}
              <button
                className=" py-2 px-14 bg-black text-gold border border-gold hover:bg-gold hover:font-semibold hover:text-black hover:border-gold"
                onClick={() => {
                  Navigate("/me/update");
                }}
              >
                Update Profile
              </button>
            </div>
            <div className="w-[50%] text-white flex flex-col gap-7 items-center justify-center">
              <h2 className="flex flex-col ">
                <span className="text-gold text-xl">Name : </span>
                <span className="text-white text-2xl">{name}</span>
              </h2>
              <h2 className="flex flex-col mr-10">
                <span className="text-gold text-xl">Email : </span>
                <span className="text-white text-2xl">{email}</span>
              </h2>
              <h2 className="flex flex-col mr-6">
                <span className="text-gold text-xl">Joining : </span>
                <span className="text-white text-2xl">{createdAt}</span>
              </h2>
              <h2 className="flex flex-col mr-[13.5rem]">
                <span className="text-gold text-xl">Joined As : </span>
                <span className="text-white text-2xl">{role}</span>
              </h2>
              <button
                className=" py-2 w-[300px] bg-red-500 text-black text-xl font-semibold  hover:bg-red-700 hover:font-semibold hover:text-black hover:border-gold"
                onClick={() => {
                  Dispatch(userLogout());
                  Navigate("/login");
                  Toast("success", "Logged out Successfully");
                }}
              >
                Log Out
              </button>
              <button
                className=" py-2 w-[300px] bg-black text-gold border border-gold hover:bg-gold hover:font-semibold hover:text-black hover:border-gold"
                onClick={() => {
                  Navigate("/me/update");
                }}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
