import React, { useEffect, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidFace } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { clearError } from "../../store/UserSlice/userSlice.js";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../store/UserSlice/userSliceReducers.js";
import LoaderForForms from "../Home/LoaderForForms.jsx";

const EditProfile = () => {
  const dispatch = useDispatch(); //useDispatch fro dispatch action
  const navigate = useNavigate();

  //fetching data from user state
  const { isLoading, error, user, updateProfileSuccessMessage } = useSelector(
    (state) => state.auth
  );

  const { name, email, phone } = user?.data;

  //useState for storing form data of user
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    oldAvatarId: "",
  });

  //for registration avatar input
  const [avatar, setAvatar] = useState("/src/assets/profile.jpg");
  formData.avatar = avatar; //set avatar = avatar mean after upload on cloudinary
  //for showing images which user select avatar
  const [preview, setPreview] = useState(user?.data?.avatar?.url);

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

      formData.oldAvatarId = user?.data?.avatar?.public_id;
    } else {
      setFormData({ ...formData, [name]: value });
      // console.log(signUpData);
    }
  };

  //Login Form handler
  const updateProfileHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile(formData)); //dispatching action for update profile
  };

  useEffect(() => {
    //if any error comes then show error
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <div className="w-[90%] p-4 py-10 max-w-5xl  rounded-3xl  sm:p-8 sm:mt-24 flex flex-col lg:flex-row shadow-xl border border-gray-700">
      <div className="w-full lg:text-start text-center lg:w-1/2 text-white flex flex-col justify-center mb-8 lg:mb-0 lg:pr-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">Update Profile</h2>
        <p className="text-lg text-gray-300 md:text-xl">
          Enter your data to update
        </p>
      </div>
      <div className="w-full lg:w-[60%]  rounded-2xl p-6 md:p-8 border border-gray-600">
        <form className="space-y-4" onSubmit={updateProfileHandler}>
          <div className="flex items-center justify-center relative">
            <BiSolidFace className=" absolute top-4 left-3 text-xl text-gray-500" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleUpdateProfileChange}
              required
              placeholder="Your Name "
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div className="flex items-center justify-center relative">
            <MdOutlineMailOutline className=" absolute top-4 left-3 text-xl text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleUpdateProfileChange}
              required
              placeholder="Your email"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div className="flex items-center justify-center relative">
            <IoCallOutline className=" absolute top-4 left-3 text-xl text-gray-500" />
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleUpdateProfileChange}
              required
              placeholder="Your phone"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
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
              className="w-full text-gray-700 focus:outline-none bg-white py-3.5 px-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className={`w-full border rounded-full border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]  text-white font-bold py-3 transition duration-200 ${
              isLoading && "opacity-50 hover:cursor-wait"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <LoaderForForms input={"Update"} /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
