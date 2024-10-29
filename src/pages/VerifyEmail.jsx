import React from 'react';
import { useEffect, useState } from "react";
// import {OtpInput} from "reactjs-otp-input";
// npm install --save react-otp-input
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
// import CustomOtpInput from '../components/common/CustomOtpInput';

import CustomOtpInput from '../components/common/CustomOTPInput';
function VerifyEmail() {
    const [otp, setOtp] = useState('');
    const handleOtpChange = (otp) => {
        setOtp(otp)
        console.log('OTP:', otp);
      };
//   const handleChange = (otp) => setOtp(otp);
  const { signupData, loading } = useSelector((state) => state.auth); //? signUpData is extracted from authSlice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    /// Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { //?destructure signupData and obtain all data from it required for signup
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            {/* <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                /> /// these css properties in input field are essential for making the numbers entered visible
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            /> */}
             {/* <OtpInput value={otp} onChange={handleChange} numInputs={6} separator={<span>-</span>} />; */}
             <CustomOtpInput numInputs={6} onChange={handleOtpChange} />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              >
              {/* /// to resend otp email, email id is needed */}
              {/* //! CHANGE : navigate passed as parameter to sendOtp() to avoid error(2 toasts displayed on clicking ''Resend OTP') */}
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;