import React, { useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import LoaderForForms from "../Home/LoaderForForms";
import { toast } from "react-toastify";
import { clearError } from "../../store/UserSlice/userSlice";
import { forgotPassword } from "../../store/UserSlice/userSliceReducers";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  //fetching data from user state
  const { isLoading, error, forgotPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const [email, setemail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    if (forgotPasswordMessage) {
      setemail("");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <div className="w-[90%] p-4 py-10 max-w-5xl  rounded-3xl  sm:p-8 sm:mt-24 flex flex-col lg:flex-row shadow-xl border border-gray-700">
      <div className="w-full lg:text-start text-center lg:w-1/2 text-white flex flex-col justify-center mb-8 lg:mb-0 lg:pr-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">Forgot password</h2>
        <p className="text-lg text-gray-300 md:text-xl">
          Enter your email to reset your password
        </p>
      </div>
      <div className="w-full lg:w-[60%]  rounded-2xl p-6 md:p-8 border border-gray-600">
        <form className="space-y-4" onSubmit={submitHandler}>
          <div className="flex items-center justify-center relative">
            <MdOutlineMailOutline className=" absolute top-4 left-3 text-xl text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              placeholder="Your email"
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
            {isLoading ? <LoaderForForms input={"Send..."} /> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
