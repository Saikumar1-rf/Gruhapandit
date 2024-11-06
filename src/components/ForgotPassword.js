import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
// import axiosInstance from "./AxiosInstance";

const Forgotpass = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      setCanResendOtp(true);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  const validateEmailId = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = async () => {
    const errors = {};
    if (!emailId) errors.emailId = "Email is required.";
    else if (!validateEmailId(emailId))
      errors.emailId = "Invalid email format.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      try {
        const response = await axios.post(
          `https://hrms-repository-gruhabase.onrender.com/tuition-application/authenticate/forgotPassword?emailId=${emailId}`
        );

        setOtpSent(true);
        setTimer(60);
        setCanResendOtp(false);
        setShowPopup(true);
      } catch (error) {
        console.error("Error sending OTP:", error);
        setErrors({ emailId: "Failed to send OTP. Please try again." });
      }
    }
  };

  const handleResendOtp = () => {
    setTimer(60);
    setCanResendOtp(false);
  };

  const handleResetPassword = async () => {
    const errors = {};

    // Validate inputs
    if (!otp) errors.otp = "OTP is required.";
    if (!password || password.length < 8)
      errors.password = "Password must be at least 8 characters long.";
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const url = `https://hrms-repository-gruhabase.onrender.com/tuition-application/authenticate/resetPassword?emailId=${emailId}&password=${password}&otp=${otp}`;

      await axios.patch(
        url,
        {},
        { headers: { "Content-Type": "application/json" } }
      );

      setShowPopup(false);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.response && error.response.status === 400) {
        setErrors({
          otp: "OTP is invalid. Please enter a valid OTP.",
        });
      } else {
        setErrors({
          otp: "Failed to reset password. Please try again.",
        });
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-blue-100  ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-blue-100">
        <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              name="emailId"
              placeholder="Enter your email"
              value={emailId}
              maxLength={40}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.emailId && (
              <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send OTP
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Enter OTP and New Password</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500"
              >
                <ImCross />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  name="emailId"
                  placeholder="Enter your email"
                  value={emailId}
                  readOnly
                  maxLength={40}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  maxLength={6}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                )}
                {timer > 0 ? (
                  <p className="text-sm text-blue-500 mt-2">
                    Resend OTP in {timer} seconds
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-blue-500 hover:underline"
                    disabled={!canResendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    name="password"
                    value={password}
                    minLength={8}
                    maxLength={15}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold text-green-600 mb-2">
              Password Reset Successful!
            </h2>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgotpass;
