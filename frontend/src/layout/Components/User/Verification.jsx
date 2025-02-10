import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../store/UserSlice/userSliceReducers";
import Toast from "../Home/Toast.js";

const Verification = () => {
  const { isLoading, isAuthenticated, user, isVerify } = useSelector(
    (state) => state.auth
  );
  //   console.log(user && user.data.user.email);

  const Dispatch = useDispatch(); //useDispatch fro dispatch action
  const Navigate = useNavigate();

  //fetching data from useParam()

  const { email, phone } = useParams();
  //   console.log(email, phone);

  //otp format
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  //   console.log(otp);

  ///handle verify change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  //   /handle keys up and down
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  //verification handler
  const verificationHandler = (e) => {
    e.preventDefault();

    const userData = {
      phone,
      email,
      otp: otp.join(""),
    };
    // console.log(userData);

    //dispatch for verification
    Dispatch(verifyUser(userData));
  };

  useEffect(() => {
    //if user registered but not verified
    if (isAuthenticated && isAuthenticated === false) {
      Navigate("/register");
    }

    // /if user is registered and verified
    if (isVerify && isVerify === true) {
      Navigate("/");
      Toast(`${user && user.message}`, "success");
    }
  }, [isAuthenticated, Navigate, isVerify, user]);
  return (
    <>
      <div className="w-[100%] h-screen py-[10rem] flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        <div className="w-full xsm:w-[90%] max-w-xl p-8 bg-transparent border border-[#c9c8c8] rounded-lg shadow-lg ">
          <form
            className="space-y-4 my-10 flex flex-col items-center justify-center gap-7"
            onSubmit={verificationHandler}
          >
            <div className=" otp-input-container flex items-center text-center justify-center relative gap-10 ">
              {otp.map((digit, index) => {
                return (
                  <input
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-input w-[50px] text-gold h-[50px] border text-center border-[#ddd] text-[1.5rem] rounded-md focus:outline-none placeholder-[#f9f9f9] transition-all"
                  />
                );
              })}
            </div>
            <button
              type="submit"
              className="w-full py-3.5 mt-4 font-semibold text-white bg-transparent rounded-full border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]"
              disabled={isLoading}
            >
              {isLoading && isLoading === true ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verification;
