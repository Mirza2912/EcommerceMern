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
import { FiEdit } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

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

  let list = [];

  // 👉 First, check if user is an employee
  if (user?.data?.role === "employee") {
    list.push({
      name: "Employee ID",
      value: user?.data?.employeeId, // get the employeeId from user data
    });
  }

  // 👉 Now add the other fields
  list.push(
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
    }
  );

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

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 justify-items-start">
                  <button
                    onClick={() => {
                      navigate("/me/profile/update");
                    }}
                    className="relative flex items-center justify-center gap-1 text-xl font-medium  transition-all duration-300 hover:text-gold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    <FiEdit className="text-lg" />
                    Edit Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/me/update-password");
                    }}
                    className="relative text-xl font-medium flex items-center justify-center gap-1 transition-all duration-300 hover:text-gold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    <RiLockPasswordLine className="text-lg" />
                    Change Password
                  </button>

                  <button
                    onClick={() => {
                      dispatch(userDelete());
                    }}
                    className="relative flex items-center justify-center gap-1 text-xl font-medium  transition-all duration-300 hover:text-gold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    <MdDelete className="text-lg" />
                    Delete Account
                  </button>

                  <button
                    onClick={handleLogout}
                    className="relative flex items-center justify-center gap-1  text-xl font-medium  transition-all duration-300 hover:text-gold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    <IoIosLogOut className="text-lg" />
                    Logout
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
