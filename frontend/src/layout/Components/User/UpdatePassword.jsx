import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword } from "../../store/UserSlice/userSliceReducers";
import { RiLockPasswordLine } from "react-icons/ri";
import { clearError } from "../../store/UserSlice/userSlice";
import { toast } from "react-toastify";
import FloatingInput from "../Input/FloatingInput";
import SubmitButton from "../SubmitButton/SubmitButton";

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
          <FloatingInput
            label="Old Password"
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleUpdatePasswrdChange}
            icon={RiLockPasswordLine}
          />

          <FloatingInput
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleUpdatePasswrdChange}
            icon={RiLockPasswordLine}
          />

          <FloatingInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleUpdatePasswrdChange}
            icon={RiLockPasswordLine}
          />

          <SubmitButton
            type="submit"
            isLoading={isLoading}
            input="Update"
            instead="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
