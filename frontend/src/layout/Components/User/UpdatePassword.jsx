import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeUserPassword } from "../../store/UserSlice/userSliceReducers";
import { RiLockPasswordLine } from "react-icons/ri";
import { clearError } from "../../store/UserSlice/userSlice";
import { toast } from "react-toastify";
import { BiSolidFace } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import LoaderForForms from "../Home/LoaderForForms";

const UpdatePassword = () => {
  const dispatch = useDispatch(); //useDispatch fro dispatch action

  //fetching data from user state
  const { isLoading, error, changeUserPasswordMessage } = useSelector(
    (state) => state.auth
  );
  // console.log(successMessage);

  //useState for storing registration data of user
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input changes (when user insert data data will automatically store in formData state)
  const handleUpdatePasswrdChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Login Form handler
  const updatePasswordHandler = (e) => {
    e.preventDefault(); //form not reload
    // console.log(formData);

    dispatch(changeUserPassword(formData)); //dispatching action for update password
  };

  useEffect(() => {
    //if any error comes then show error
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    //ifuser update password successfully then show success message and navigate to profile page
    if (changeUserPasswordMessage) {
      //clearing state
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [error, changeUserPasswordMessage]);

  return (
    <div className="w-[90%] p-4 py-10 max-w-5xl  rounded-3xl  sm:p-8 sm:mt-24 flex flex-col lg:flex-row shadow-xl border border-gray-700">
      <div className="w-full lg:text-start text-center lg:w-1/2 text-white flex flex-col justify-center mb-8 lg:mb-0 lg:pr-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          {" "}
          Update Password
        </h2>
        <p className="text-lg text-gray-300 md:text-xl">
          Enter passwords to change old password
        </p>
      </div>
      <div className="w-full lg:w-[60%]  rounded-2xl p-6 md:p-8 border border-gray-600">
        <form className="space-y-4" onSubmit={updatePasswordHandler}>
          <div className="flex items-center justify-center relative">
            <BiSolidFace className=" absolute top-4 left-3 text-xl text-gray-500" />
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleUpdatePasswrdChange}
              required
              placeholder="current password *Required"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div className="flex items-center justify-center relative">
            <MdOutlineMailOutline className=" absolute top-4 left-3 text-xl text-gray-500" />
            <input
              type="password"
              id="newPssword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleUpdatePasswrdChange}
              required
              placeholder="new password *Required"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div className="flex items-center justify-center relative">
            <IoCallOutline className=" absolute top-4 left-3 text-xl text-gray-500" />
            <input
              type="password"
              id="confirmPssword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleUpdatePasswrdChange}
              required
              placeholder="confirm password *Required"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <button
            type="submit"
            className={`w-full border rounded-full border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]  text-white font-bold py-3 transition duration-200 ${
              isLoading && "opacity-50 hover:cursor-wait"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <LoaderForForms input={"Update..."} /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
