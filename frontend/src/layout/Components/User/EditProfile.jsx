import { useEffect, useState } from "react";
import { BiSolidFace } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { clearError } from "../../store/UserSlice/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../store/UserSlice/userSliceReducers.js";
import FloatingInput from "../Input/FloatingInput.jsx";
import SubmitButton from "../SubmitButton/SubmitButton.jsx";

const EditProfile = () => {
  const dispatch = useDispatch(); //useDispatch fro dispatch action
  const navigate = useNavigate();

  //fetching data from user state
  const { isLoading, error, user } = useSelector((state) => state.auth);

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
          <FloatingInput
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleUpdateProfileChange}
            icon={BiSolidFace}
          />

          <FloatingInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleUpdateProfileChange}
            icon={MdOutlineMailOutline}
          />

          <FloatingInput
            label="Phone No"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleUpdateProfileChange}
            icon={IoCallOutline}
          />

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

export default EditProfile;
