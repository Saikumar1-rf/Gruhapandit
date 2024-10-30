import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';

const Forgotpass = () => {
  const [emailId, setemailId] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(false); // Controls OTP display
  const [timer, setTimer] = useState(60); // Timer for OTP resend
  const [canResendOtp, setCanResendOtp] = useState(false); // Controls Resend OTP button
  const [otpValue, setOtpValue] = useState(""); // Value of OTP input
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success popup visibility
  const [isVerified, setIsVerified] = useState(false); // Tracks verification status
  const [showMessage,setShowMessage]=useState(false);


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowCreatePassword(!showCreatePassword);
  };

  const togglePassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Timer countdown effect
  useEffect(() => {
    let countdown;
    if (otp && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      setCanResendOtp(true);
    }
    return () => clearInterval(countdown);
  }, [otp, timer]);

  const validateEmailId = (emailId) => {
   const emailIdRegex = /^(?!\d)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@(gmail|yahoo|outlook|hotmail|example|sai)\.(com|net|org|in|edu|gov|mil|us|info|org\.in)$/;
      return emailIdRegex.test(emailId) && !/\s/.test(emailId); // Ensure no spaces are present
  };

  const handleEmailIdChange = (e) => {
    const value=e.target.value;
    const formattedValue = value.replace(/\s+/g, "").replace(/[A-Z]/g,'');
    setemailId(formattedValue);
  };

  const validatePasswords = () => {
    let passwordErrors = {};
    if (createPassword.length < 8) {
      passwordErrors.createPassword =
        "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(createPassword) || !/\d/.test(createPassword)) {
      passwordErrors.createPassword =
        "Password must include uppercase, lowercase letters, and numbers";
    }
    if (createPassword !== confirmPassword) {
      passwordErrors.confirmPassword = "Passwords do not match";
    }
    return passwordErrors;
  };

  const handleVerify = async () => {
    let validationErrors = {};

    if (!emailId) {
      validationErrors.emailId = "Input cannot be empty.";
    } else if (!validateEmailId(emailId)) {
      validationErrors.emailId = "Please enter a valid email address";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Verified: ", emailId);
  
      try {
        const response = await axios.post(`https://hrms-repository-gruhabase.onrender.com/tuition-application/authenticate/forgotPassword?emailId=${emailId}`, {
  
          emailId: emailId, // Send the email in the request body
        });
        
        // Handle response based on your API design
        console.log(response.data); // You can log the response to see what you receive
        setOtp(true); // Simulate OTP being sent and display OTP fields
        setTimer(60); // Start the 60-second timer
        setCanResendOtp(false); // Disable resend option until timer runs out
        setIsVerified(true);
        
      } catch (error) {
        console.error("Error sending email:", error);
        setErrors({ emailId: "Failed to send email. Please try again." }); // Show an error if the request fails
      }
    }
  };


  const handleResendOtp = () => {
    console.log("OTP resent to: ", emailId);
    setTimer(60); // Reset the timer to 60 seconds
    setCanResendOtp(false); // Disable resend button until timer runs out again
  };

  const handleOtpChange = (e) => {
    // Only allow numeric input
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtpValue(value);
    }
  };

  const handleOtpVerify = () => {
    if (otpValue.length !== 6) {
      setErrors({ otp: "OTP is required and must be 6 digits" });
    } else {
      setErrors({});
      alert("Successfully verified otp!");//show alert on successfull otp verification
      // console.log("OTP Verified: ", otpValue);
      // Simulate successful OTP verification
      setOtp(false); //hide otp input and resend button
      // setShowSuccessPopup(true);
      setShowMessage(true);
    }
  };
  
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-green-200 to-blue-300 ...">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 lg:max-w-lg bg-transparent bg-gradient-to-r from-green-200 to-blue-300 ...  border border-gray-400 z-10 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500  ">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 text-shadow-default">
        Forgot Password
      </h1>
      <form className="space-y-4">
        {/* {/ Email Input /} */}
        <div>
          <label className="block text-sm font-medium text-gray-800 text-shadow-default">
            EmailId
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter EmailId"
              value={emailId}
              maxLength="45"
              // maxLength={validatePhoneNumber(email)  ? 10 : 30}
              onChange={handleEmailIdChange}
              className="mt-3 w-full px-3 py-3 border border-gray-400 rounded-xl focus:outline-none focus:border-gray-500 bg-transparent"
            />
            <button
              type="button"
              onClick={handleVerify}
              className="bg-cyan-600 hover:bg-blue-500 text-gray-950 py-3 px-4 rounded-xl mt-2 font-bold  h-[50px] w-[80px]  focus:outline-none"
              // disabled={!validateEmail(emailId)}
            >
              Verify
            </button>
          </div>
          {errors.emailId && (
            <p className="text-red-500 text-sm mt-1 ">{errors.emailId}</p>
          )}
          {errors.verification && (
            <p className="text-red-500 text-sm mt-1">{errors.verification}</p>
          )}
        </div>

        {/* {/ OTP Input (only displayed if OTP is triggered) /} */}
        {otp && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={otpValue}
                onChange={handleOtpChange}
                maxLength="6"
                className="w-[50%] h-[50px] outline-none rounded-xl bg-blue-500 text-white text-center"
                required
              />
              <button
                type="button"
                onClick={handleOtpVerify}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg  focus:outline-none"
              >
                Verify OTP
              </button>
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
            )}
            {/* {/ Timer display /} */}
            {timer > 0 ? (
              <p className="text-sm text-blue-500 mt-2">
                Resend OTP in {timer} seconds
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-slate-50 hover:underline mt-2 rounded-lg p-2 bg-yellow-500"
                disabled={!canResendOtp}
              >
                Resend OTP
              </button>
            )}
          </div>
        )}

        {/* {/ Password Section (only visible after otp verification) /} */}
        {showMessage && (
          <>
            {/* {/ createPassword input /} */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Create Password
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Create a new password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  minLength={8}
                  maxLength={15}
                  className="mt-1 w-[100%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  style={{
                    WebkitTextSecurity: showCreatePassword ? "none" : "disc",
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showCreatePassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.createPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.createPassword}
                </p>
              )}
            </div>
            {createPassword && (
              <span className="space-y-2">
                {/* {/ Password Strength /} */}
                <div className="flex items-center">
                  {createPassword.length >= 8 &&
                  /[A-Z]/.test(createPassword) &&
                  /\d/.test(createPassword) &&
                  /[!@#$%^&*(),.?":{}||<>]/.test(createPassword) ? (
                    <FaCheck className=" text-blue-500  mr-2 h-4 w-4" />
                  ) : (
                    <ImCross className="mr-2 text-red-500 h-3 w-3" />
                  )}
                  <p>
                    Password strength:
                    {createPassword.length < 8 ||
                    !/[A-Z]/.test(createPassword) ||
                    !/\d/.test(createPassword) ||
                    !/[!@#$%^&*(),.?":{}||<>]/.test(createPassword)
                      ? " weak"
                      : " strong"}
                  </p>
                </div>
                {/* {/ Length Validation /} */}
                <div className="flex items-center">
                  {createPassword.length >= 8 ? (
                    <FaCheck className="mr-2 h-4 w-4 text-blue-500" />
                  ) : (
                    <ImCross className="mr-2 text-red-500 h-3 w-3" />
                  )}
                  <p>Minimum 8 characters long</p>
                </div>

                {/* {/ Uppercase Letter Validation /} */}
                <div className="flex items-center">
                  {/[A-Z]/.test(createPassword) ? (
                    <FaCheck className="mr-2 h-4 w-4 text-blue-500" />
                  ) : (
                    <ImCross className="mr-2 text-red-500 h-3 w-3" />
                  )}
                  <p>Contain uppercase and lowercase letters(e.g.A-Z,a-z);</p>
                </div>

                {/* {/ Number Validation /} */}
                <div className="flex items-center ">
                  {/\d/.test(createPassword) ? (
                    <FaCheck className="mr-2 h-4 w-4 text-blue-500" />
                  ) : (
                    <ImCross className="mr-2 text-red-500 h-3 w-3" />
                  )}
                  <p>Have at least one numerical character(e.g.0-9)</p>
                </div>

                {/* {/ Symbol Validation /} */}
                <div className="flex items-center">
                  {/[!@#$%^&*(),.?":{}||<>]/.test(createPassword) ? (
                    <FaCheck className="mr-2 h-4 w-4 text-blue-500" />
                  ) : (
                    <ImCross className="mr-2 text-red-500 h-3 w-3" />
                  )}
                  <p>Contains a special character(!@#$%^&*)</p>
                </div>
              </span>
            )}

            {/* {/ Confirm Password Input /} */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  maxLength={15}
                  className="mt-1 w-[100%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  style={{
                    WebkitTextSecurity: showConfirmPassword ? "none" : "disc",
                  }}
                  onPaste={(e) => {
                    e.preventDefault(); //in that pasting into confirm password field
                  }}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* {/ Submit button /} */}
            <button
              type="submit"
              className="w-full text-white py-2 px-4 rounded-lg bg-cyan-500 focus:outline-none hover:bg-blue-500"
            >
              Reset
            </button>
            <div className="flex justify-center mt-4">
              <p>
                Back To
                <button className="text-cyan-500 texpy-2 px-4 rounded-lg focus:outline-none underline">
                  <Link to="/login">Login</Link>
                </button>
              </p>
            </div>
          </>
        )}
      </form>

      {/* {/ Success Popup /} */}
      {showSuccessPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <ImCross
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleClosePopup}
            />
            <h2 className="text-3xl font-bold text-blue-500 mb-4">
              Success!
            </h2>
            <p className="text-lg">
              Your password has been successfully reset.
            </p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg  focus:outline-none"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Forgotpass;