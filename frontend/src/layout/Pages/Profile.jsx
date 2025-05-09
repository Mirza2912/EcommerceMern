import React, { useState, useRef, useEffect } from "react";
import "../Style/Account.css";
import Title from "../Components/Home/Title.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";
import {
  userDelete,
  userLogOut,
} from "../store/UserSlice/userSliceReducers.js";
import { toast } from "react-toastify";
import { clearError } from "../store/UserSlice/userSlice.js";

const Profile = () => {
  //For checking for title
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //fetching data from user state
  const { user, error, isVerified } = useSelector((state) => state.auth);
  // console.log(user);

  // destructuring all data of user
  const { name, email, role, avatar, createdAt, phone } = user.data;

  const handleLogout = () => {
    dispatch(userLogOut());
    navigate("/");
  };
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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (!isVerified) {
      navigate("/");
    }
  }, [isVerified, error]);

  return (
    <>
      {/* <Title title={`${user && user.data.name}'s Profile`} /> */}
      <div className="w-[100%]  font-roboto flex items-center justify-center bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        {/* heading  */}
        <div className="border border-gray-600 rounded-2xl flex flex-col items-center justify-center w-[90%] sm:w-[80%] md:w-[60%] lg:w-[90%] xl:w-[80%] py-[10vh] sm:my-[20vh] my-[10vh] lg:mt-12 lg:mb-0 lg:py-10">
          <h2 className="text-white mb-10 uppercase font-roboto font-semibold  text-5xl xsm:text-5xl lg:text-6xl">
            Account Details
          </h2>
          <div className=" w-[100%] lg:gap-28 xl:gap-36 space-y-10 lg:space-y-0 flex flex-col lg:flex-row items-center md:gap-4  justify-center">
            <div className="lg:w-auto xsm:w-[100%] flex items-center  justify-center ">
              <img
                className="lg:w-[300px] lg:h-[300px] w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] bg-cover bg-center rounded-full"
                src={`${avatar?.url || "/src/assets/profile.jpg"}`}
                alt={`${avatar?.public_id || "avatar"}`}
              />
            </div>
            <div className=" xsm:w-[100%] lg:w-auto  text-left text-white flex flex-col gap-7 items-center justify-center">
              <ul className="space-y-2">
                {list.map((item, index) => (
                  <li key={index}>
                    <span className="text-gold text-xl">{item.name} : </span>
                    <span className="text-white text-2xl">{item.value}</span>
                  </li>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 justify-items-center">
                  <button
                    className="cursor-pointer  w-full  sm:w-48 px-4 py-2 bg-gradient-to-r from-gold to-[#635505] text-white rounded-md shadow hover:brightness-110 transition text-center"
                    onClick={() => {
                      navigate("/me/update-password");
                    }}
                  >
                    Change Password
                  </button>
                  <button
                    className="cursor-pointer  w-full  sm:w-48 px-4 py-2 bg-gradient-to-r from-gold to-[#635505] text-white rounded-md shadow hover:brightness-110 transition text-center"
                    onClick={() => {
                      navigate("/me/profile/update");
                    }}
                  >
                    Edit Profile
                  </button>
                  <button
                    className=" cursor-pointer w-full  sm:w-48 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md shadow hover:brightness-110 transition text-center"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                  <button
                    className="cursor-pointer w-full  sm:w-48 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md shadow hover:brightness-110 transition text-center"
                    onClick={() => {
                      dispatch(userDelete());
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
