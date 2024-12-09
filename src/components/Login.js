import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/authContext";

// import gruhaimg from '../Asserts/gruhaimg.jpg';
import gruhaimg from '../Asserts/login.jpg';

const Login = () => {
  const { login } = useAuth();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (input) => {
    const emailPattern =
      /^[a-z0-9._%+-]+@[a-z.-]+\.(com|net|org|in|edu|gov|mil|co|us|info)$/;
    return emailPattern.test(input) && !/^\d[0-5]/.test(input);
  };

  const validatePhoneNumber = (input) => {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(input);
  };

  const handlePasswordChange = (e) => {
        const value = e.target.value.replace(/\s+/g, ""); // Removes any spaces
        setPassword(value);
      }; 

  const validatePassword = (input) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&+#^=])[A-Za-z\d@$!%?&+#^=]{8,}$/;
    return passwordPattern.test(input) && !/\s/.test(input);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validate input before sending request
    if (!validateEmail(emailId) && !validatePhoneNumber(emailId)) {
      setEmailError("Please enter a valid email or phone number.");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        // "https://tution-application.onrender.com/tuition-application/authenticate/login",
        // "https://hrms-repository-gruhabase.onrender.com/tuition-application/authenticate/login",
        "https://tution-application-testenv.onrender.com/tuition-application/authenticate/login",
        { emailId, password }
      );

      const { jwtToken, userId, userType } = response.data;
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userType", userType);
      login();
      navigate(userType === "admin" ? "/posts" : "/userDashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (error.response.status === 404) {
          setEmailError("Account does not exist. Please register first.");
        } else if (error.response.status === 401) {
          setEmailError("Invalid email ID or password. Please try again.");
        } else {
          setEmailError(errorMessage || "Login failed. Please try again.");
        }
      } else {
        setEmailError("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\s+/g, "").toLowerCase();

    setEmailId(formattedValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden mt-12 md:mt-20">
        
        {/* Left Image */}
        <img
          src={gruhaimg}
          alt="gimg"
          className="w-full md:w-1/2 md:h-auto object-cover"
        />
        
        {/* Login Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
            Welcome back
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-8 text-center">
            To log in, please enter your email and password
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email / Phone */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sky-700 text-left"
              >
                Email ID or Phone Number
              </label>
              <input
                type="text"
                id="email"
                value={emailId}
                maxLength={40}
                placeholder="Enter your email or phone number"
                onChange={handleEmailChange}
                className={`mt-2 block w-full bg-transparent px-3 py-2 border rounded-md ${
                  emailError ? "border-red-500" : "border-gray-300"
                } focus:outline-none`}
                aria-invalid={!!emailError}
                aria-describedby="email-error"
              />
              {emailError && (
                <p id="email-error" className="text-red-500 text-xs mt-1">
                  {emailError}
                </p>
              )}
            </div>
  
            {/* Password */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 text-left"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                value={password}
                minLength={8}
                maxLength={15}
                onChange={handlePasswordChange}
                required
                className={`mt-2 block w-full px-3 py-2 bg-transparent border rounded-md shadow-sm ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } focus:outline-none pr-10`}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-600 mt-1"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {passwordError && (
                <p id="password-error" className="text-red-500 text-xs mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="mt-2 text-right">
              <Link
                to="/forgotpassword"
                className="text-xs sm:text-sm font-medium text-sky-700"
              >
                Forgot Password
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;