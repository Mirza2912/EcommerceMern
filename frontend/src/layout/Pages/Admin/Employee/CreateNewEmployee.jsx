import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../../../Components/Input/FloatingInput";
import SubmitButton from "../../../Components/SubmitButton/SubmitButton";
import { BiSolidFace } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";

const CreateNewEmployee = () => {
  //fetching data from user state
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useState for storing registration data of user
  const [signUpData, setSignUpData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  //for registration avatar input
  const [avatar, setAvatar] = useState("/src/assets/profile.jpg");
  signUpData.avatar = avatar; //set avatar = avatar mean after upload on cloudinary
  //for showing images which user select avatar
  const [preview, setPreview] = useState("/src/assets/profile.jpg");

  //handle signup change
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
  };

  //Register Form handler
  const registerFormHandler = (e) => {
    e.preventDefault();
    // dispatch(registerUser(signUpData));

    // if (tempUser) {
    //   setSignUpData({
    //     name: "",
    //     email: "",
    //     password: "",
    //     phone: "",
    //     avatar: "/src/assets/profile.jpg",
    //   });
    // }
  };

  return (
    <div className="w-full lg:w-[60%] rounded-2xl p-6 md:p-8 border border-gray-700">
      <h2 className="text-4xl font-bold mb-8 text-center">Add New Employee</h2>
      <form className="space-y-4" onSubmit={registerFormHandler}>
        {/* name  */}
        <FloatingInput
          label="Name"
          name="name"
          type="text"
          value={signUpData.name}
          onChange={handleSignUpChange}
          icon={BiSolidFace}
        />

        {/* email  */}
        <FloatingInput
          label="Email"
          name="email"
          type="email"
          value={signUpData.email}
          onChange={handleSignUpChange}
          icon={MdOutlineMailOutline}
        />

        {/* Password  */}
        <FloatingInput
          label="Password"
          name="password"
          type="password"
          value={signUpData.password}
          onChange={handleSignUpChange}
          icon={RiLockPasswordLine}
        />

        {/* Phone  */}
        <FloatingInput
          label="Contact Number"
          name="phone"
          type="tel"
          value={signUpData.phone}
          onChange={handleSignUpChange}
          icon={IoCallOutline}
        />

        <div className="flex items-center justify-center  gap-2">
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
            onChange={handleSignUpChange}
            className="w-full text-gray-700 focus:outline-none bg-white py-3.5 px-2 rounded-md"
          />
        </div>

        {/* Submit  */}
        <SubmitButton
          type="submit"
          isLoading={isLoading}
          input="Register"
          instead="Register"
        />
      </form>
    </div>
  );
};

export default CreateNewEmployee;
