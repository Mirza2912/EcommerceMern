import React, { useEffect, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import Toast from "../Home/Toast.js";
import { updateProfile } from "../../store/UserSlice/userSliceReducers.js";
import { BiSolidFace } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { clearError } from "../../store/UserSlice/userSlice.js";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
  const Dispatch = useDispatch(); //useDispatch fro dispatch action
  const Navigate = useNavigate();

  //fetching data from user state
  const {
    isLoading,
    error,
    isVerify,
    user,
    isAuthenticated,
    updateProfileSuccessMessage,
  } = useSelector((state) => state.auth);

  const { name, email, phone } = user?.data;

  //useState for storing form data of user
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    oldAvatarId: "",
  });

  //for registration avatar input
  const [avatar, setAvatar] = useState("/images/profile.jpg");
  formData.avatar = avatar; //set avatar = avatar mean after upload on cloudinary
  //for showing images which user select avatar
  const [preview, setPreview] = useState("/images/profile.jpg");

  // Handle input changes (when user insert data data will automatically store in formData state)
  const handleUpdateProfileChange = (e) => {
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

      formData.oldAvatarId = user.data?.avatar?.public_id;

      // console.log(reader.readAsDataURL(e.target.files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
      // console.log(signUpData);
    }
  };

  //Login Form handler
  const updateProfileHandler = (e) => {
    e.preventDefault(); //form not reload
    // console.log(formData);

    Dispatch(updateProfile(formData)); //dispatching action for update profile
  };

  useEffect(() => {
    //if any error comes then show error
    if (error) {
      Toast(error.message, "error");
      Dispatch(clearError());
    }

    //if user update profile successfully then show success message and navigate to profile page
    if (updateProfileSuccessMessage) {
      Toast(updateProfileSuccessMessage, "success");
      Navigate("/profile");
    }
  }, [error, updateProfileSuccessMessage, Navigate, Dispatch, Toast]);

  return (
    <div className="w-[100%] h-auto py-[10rem] flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
      <div className="heading z-40 flex flex-col items-center mt-[5rem] mb-[7rem] xsm:mt-0 xsm:mb-5">
        <h2 className="text-white font-medium text-7xl xsm:text-5xl x font-roboto ">
          Update Profile
        </h2>
      </div>
      <div className="flex items-center justify-center w-[95%] xsm:w-[100%] slg:w-[75%] h-[90vh] bg-bg-color">
        <div className="w-full xsm:w-[90%] max-w-xl p-8 bg-transparent border border-[#c9c8c8] rounded-lg shadow-lg ">
          <form className="space-y-4" onSubmit={updateProfileHandler}>
            <div className="flex items-center justify-center relative">
              <BiSolidFace className=" absolute top-4 left-2 text-2xl" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleUpdateProfileChange}
                required
                placeholder="Your Name "
                className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
              />
            </div>
            <div className="flex items-center justify-center relative">
              <MdOutlineMailOutline className=" absolute top-4 left-2 text-2xl" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleUpdateProfileChange}
                required
                placeholder="Your email"
                className="w-full ps-10 py-3.5 border rounded-md focus:outline-none placeholder-[#aeabab]"
              />
            </div>
            <div className="flex items-center justify-center relative">
              <IoCallOutline className=" absolute top-4 left-2 text-2xl" />
              <input
                type="phone"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleUpdateProfileChange}
                required
                placeholder="Your phone"
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
                onChange={handleUpdateProfileChange}
                className="w-full text-gray-700 focus:outline-none bg-white py-3.5 px-2 rounded-md "
              />
            </div>
            <button
              type="submit"
              className="w-full  mt-4 font-semibold py-3.5 rounded-full text-white border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]"
              disabled={isLoading}
            >
              {isLoading && isLoading === true ? "Editing..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
