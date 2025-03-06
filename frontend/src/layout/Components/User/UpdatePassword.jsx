import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../store/UserSlice/userSliceReducers";
import { RiLockPasswordLine } from "react-icons/ri";
import { clearError } from "../../store/UserSlice/userSlice";
import Toast from "../Home/Toast.js";
const UpdatePassword = () => {
  const Dispatch = useDispatch(); //useDispatch fro dispatch action
  const Navigate = useNavigate();

  //fetching data from user state
  const { isLoading, error, isVerify, user, isAuthenticated, successMessage } =
    useSelector((state) => state.auth);
  console.log(successMessage);

  //useState for storing registration data of user
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input changes (when user insert data data will automatically store in formData state)
  const handleUpdatePasswrdChange = (e) => {
    const { name, value } = e.target; //extracting name and value from event
    setFormData({ ...formData, [name]: value }); //Dynamically change value of name
  };

  //Login Form handler
  const updatePasswordHandler = (e) => {
    e.preventDefault(); //form not reload
    // console.log(formData);

    Dispatch(updatePassword(formData)); //dispatching action for update password
  };

  useEffect(() => {
    //if any error comes then show error
    if (error) {
      Toast(error.message, "error");
      Dispatch(clearError());
    }

    //ifuser update password successfully then show success message and navigate to profile page
    if (successMessage) {
      Toast(successMessage, "success");
      Navigate("/profile");

      //clearing state
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [clearError, Dispatch, error, Navigate, successMessage]);

  return (
    <div className="w-[100%] h-auto py-[10rem] flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
      <div className="heading z-40 flex flex-col items-center mt-[5rem] mb-[7rem] xsm:mt-0 xsm:mb-5">
        <h2 className="text-white font-medium text-7xl xsm:text-5xl x font-roboto ">
          Edit Password
        </h2>
      </div>
      <div className="flex items-center justify-center w-[95%] xsm:w-[100%] slg:w-[75%] h-[90vh] bg-bg-color">
        <div className="w-full xsm:w-[90%] max-w-xl p-8 bg-transparent border border-[#c9c8c8] rounded-lg shadow-lg ">
          <form className="space-y-4" onSubmit={updatePasswordHandler}>
            <div className="flex items-center justify-center relative">
              <RiLockPasswordLine className=" absolute top-4 left-2 text-2xl" />
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleUpdatePasswrdChange}
                required
                placeholder="current password *Required"
                className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
              />
            </div>
            <div className="flex items-center justify-center relative">
              <RiLockPasswordLine className=" absolute top-4 left-2 text-2xl" />
              <input
                type="password"
                id="newPssword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleUpdatePasswrdChange}
                required
                placeholder="new password *Required"
                className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
              />
            </div>
            <div className="flex items-center justify-center relative">
              <RiLockPasswordLine className=" absolute top-4 left-2 text-2xl" />
              <input
                type="password"
                id="confirmPssword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleUpdatePasswrdChange}
                required
                placeholder="confirm password *Required"
                className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
              />
            </div>
            <button
              type="submit"
              className="w-full  mt-4 font-semibold py-3.5 rounded-full text-white border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]"
              disabled={isLoading}
            >
              {isLoading && isLoading === true ? "Editing..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
