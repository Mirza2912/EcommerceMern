import React, { useState, useRef, useEffect } from "react";
import "../Style/Account.css";
import Title from "../Components/Home/Title.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Components/Home/Toast.js";
import {
  userDelete,
  userLogout,
} from "../store/UserSlice/userSliceReducers.js";
import { format } from "date-fns";
import { clearUpdateMessage } from "../store/UserSlice/userSlice.js";

const Account = () => {
  //For checking for title
  const [isLogin, setIsLogin] = useState(true);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  //fetching data from user state
  const { isVerify, user, error, updateProfileSuccessMessage } = useSelector(
    (state) => state.auth
  );
  // console.log(user);
  useEffect(() => {
    if (!isVerify) {
      Navigate("/account");
    }
    if (updateProfileSuccessMessage) {
      const timer = setTimeout(() => {
        Dispatch(clearUpdateMessage());
      }, 5000);

      return () => clearTimeout(timer); // Cleanup to avoid memory leaks
    }
  }, [Navigate, isVerify, updateProfileSuccessMessage]);

  // destructuring all data of user
  const { name, email, role, avatar, createdAt, phone } = user.data;

  let list = [
    {
      name: "Name",
      value: name,
    },
    {
      name: "Email",
      value: email,
    },
    {
      name: "Role",
      value: role,
    },
    {
      name: "Phone",
      value: phone,
    },
    {
      name: "Created At",
      value: format(new Date(createdAt), "yyyy-MM-dd hh:mm:ss a"),
    },
  ];
  // console.log(name, email, role, avatar, createdAt);

  return (
    <>
      {/* <Title title={`${user && user.data.name}'s Profile`} /> */}
      <div className="w-[100%] min-h-[100vh] font-roboto flex items-center justify-center bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        {/* heading  */}
        <div className="bg-bg-color flex flex-col items-center justify-center w-[90%] py-[10vh] my-[20vh]">
          <h2 className="text-white mb-10 uppercase font-roboto font-semibold text-6xl xsm:text-5xl ">
            Account Details
          </h2>
          <div className=" w-[100%] space-y-10 flex sm:flex-col xsm:flex-col slg:flex-row items-center justify-center">
            <div className="w-[50%] xsm:w-[100%] flex items-center  justify-center rounded-full">
              <img
                className="w-[300px] h-[300px] bg-cover bg-center rounded-full"
                src={`${avatar.url}`}
                alt={`${name}`}
              />
            </div>
            <div className="w-[50%] xsm:w-[100%] text-left text-white flex flex-col gap-7 items-center justify-center">
              <ul className="space-y-2">
                {list.map((item, index) => (
                  <li key={index}>
                    <span className="text-gold text-xl">{item.name} : </span>
                    <span className="text-white text-2xl">{item.value}</span>
                  </li>
                ))}

                <li>
                  <button
                    className=" py-2 w-[100%] bg-black text-gold border border-gold hover:bg-gold hover:font-semibold hover:text-black hover:border-gold hover:rounded-full"
                    onClick={() => {
                      Navigate("/me/update-password");
                    }}
                  >
                    Change Password
                  </button>
                </li>
                <li>
                  <button
                    className=" py-2 w-[100%] bg-black text-gold border border-gold hover:bg-gold hover:font-semibold hover:text-black hover:border-gold hover:rounded-full"
                    onClick={() => {
                      Navigate("/me/profile/update");
                    }}
                  >
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button
                    className=" py-2 w-[100%] bg-red-500 text-black text-xl font-semibold  hover:bg-red-700 hover:font-semibold hover:text-black hover:border-gold hover:rounded-full"
                    onClick={() => {
                      Dispatch(userLogout());
                      Navigate("/account");
                      Toast("success", "Logged out Successfully");
                    }}
                  >
                    Log Out
                  </button>
                </li>
                <li>
                  <button
                    className=" py-2 w-[100%] bg-red-500 text-black text-xl font-semibold  hover:bg-red-700 hover:font-semibold hover:text-black hover:border-gold hover:rounded-full"
                    onClick={() => {
                      Dispatch(userDelete());
                      Navigate("/account");
                      Toast("success", "Account deleted successfully");
                    }}
                  >
                    Delete Account
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
