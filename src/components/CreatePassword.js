import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import axiosInstance from "./AxiosInstance";
import axios from "axios";

const CreatePassword = () => {
  const location = useLocation();
  const [emailId, setemailId] = useState(location.state?.emailId || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailIdError, setemailIdError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [loading, setLoading] = useState(false); // Loading state
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const navigate = useNavigate();

  const bannedemailIds = new Set([
    "mailto:admin@example.com",
    "mailto:user@example.com",
    "mailto:test@example.com",
  ]);
  const profanityList = new Set(["badword1", "badword2"]);

  const validateemailId = (input) => {
    const emailIdPattern =
      /^(?!\d)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@(gmail|yahoo|outlook|hotmail|example|sai)\.(com|net|org|in|edu|gov|mil|us|info|org\.in)$/;
    return (
      input.length > 0 &&
      !bannedemailIds.has(input.toLowerCase()) &&
      !profanityList.has(input.toLowerCase()) &&
      emailIdPattern.test(input)
    );
  };

  useEffect(() => {
    if (location.state?.emailId) {
      setemailId(location.state.emailId);
    }
  }, [location.state]);

  const validatePassword = (input) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(input) && !/\s/.test(input);
  };

  const checkPasswordStrength = (input) => {
    if (input.length < 8) {
      setPasswordStrengthColor("text-red-500");
      return "Weak";
    }
    if (input.length < 12) {
      setPasswordStrengthColor("text-yellow-500");
      return "Medium";
    }
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(input)) {
      setPasswordStrengthColor("text-green-500");
      return "Strong";
    }
    return "Weak";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setemailIdError("");
    setSuccessMessage("");

    if (!validateemailId(emailId)) {
      setemailIdError("Enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must have at least 8 characters with uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const requestData = { emailId, password };
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://hrms-repository-gruhabase.onrender.com/tuition-application/authenticate/register",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setShowPopup(true); // Show popup on successful signup
        setemailId("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setShowPopup(false); // Hide popup after delay
          navigate("/payment"); // Redirect to payment page
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setPasswordError(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else if (error.request) {
        setPasswordError(
          "No response from the server. Please try again later."
        );
      } else {
        setPasswordError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setShowPasswordStrength(false);

    // Show password strength after a delay
    setTimeout(() => {
      setPasswordStrength(checkPasswordStrength(input));
      setShowPasswordStrength(true);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-gray-200 to-blue-300">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-500">
          Create Password
        </h1>
        <form onSubmit={handleSubmit}>
          {/* {/ Email Input /} */}
          <div className="mb-4">
            <label
              htmlFor="emailId"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="emailId"
              maxLength={40}
              value={emailId}
              readOnly
              onChange={(e) => setemailId(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                emailIdError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {emailIdError && (
              <p className="text-red-500 text-sm mt-1">{emailIdError}</p>
            )}
          </div>

          {/* {/ Password Input /} */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Create Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              minLength={8}
              maxLength={15}
              onChange={handlePasswordChange}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                passwordError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              aria-invalid={!!passwordError}
              aria-describedby="password-error"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {passwordError}
              </p>
            )}
            {showPasswordStrength && (
              <p className={`text-xs mt-1 ${passwordStrengthColor}`}>
                Password strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* {/ Confirm Password Input /} */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              minLength={8}
              maxLength={15}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                passwordError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* {/ Success Popup /} */}
          {showPopup && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-md text-center">
                <h2 className="text-xl font-bold text-green-500 mb-4">
                  Create Password Successful
                </h2>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-semibold mt-4 ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Create Password"}
          </button>

          <p className="text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
 