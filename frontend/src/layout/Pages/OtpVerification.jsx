import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../store/UserSlice/userSliceReducers.js";
import { toast } from "react-toastify";
import LoaderForForms from "../Components/Home/LoaderForForms.jsx";
import { clearError } from "../store/UserSlice/userSlice.js";

const OptVerification = () => {
  const { isLoading, tempUser, isVerified, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  //otp format
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const inputsRef = useRef([]);

  ///handle verify change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  //handle keys up and down
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  //handle key press for paste
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 5);
    if (!/^\d{5}$/.test(paste)) return;
    const newOtp = paste.split("");
    setOtp(newOtp);
    newOtp.forEach((digit, i) => {
      inputsRef.current[i].value = digit;
    });
    inputsRef.current[4].focus();
  };

  //verification handler
  const verificationHandler = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    // console.log("OTP entered:", finalOtp);
    const data = {
      otp: finalOtp,
      email: tempUser?.data?.email,
      phone: tempUser?.data?.phone,
    };

    dispatch(verifyUser(data));

    if (isVerified) {
      setOtp(new Array(5).fill("")); // Clear the OTP input fields
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error); //show error message
      dispatch(clearError());
    }
  }, [error]);
  return (
    <>
      <div className="w-[100%] h-screen py-[10rem] flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        <div className="w-full xsm:w-[90%] max-w-xl p-8 bg-transparent border border-[#c9c8c8] rounded-lg shadow-lg ">
          <form
            className="space-y-4 my-10 flex flex-col items-center justify-center gap-7"
            onSubmit={verificationHandler}
            onPaste={handlePaste}
          >
            <div className=" otp-input-container flex items-center text-center justify-center relative gap-10 ">
              {otp.map((digit, index) => {
                return (
                  <input
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    inputMode="numeric"
                    ref={(el) => (inputsRef.current[index] = el)}
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
              className={`w-full py-3.5 mt-4 font-semibold text-white bg-transparent rounded-full border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53] ${
                isLoading && "hover:cursor-wait opacity-50"
              }`}
              disabled={isLoading}
            >
              {isLoading ? <LoaderForForms input={"Verify"} /> : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OptVerification;
