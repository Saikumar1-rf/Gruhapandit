import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const CreatePassword = () => {
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailIdError, setemailIdError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const bannedemailIds = new Set([
    "admin@example.com",
    "user@example.com",
    "test@example.com",
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
        setSuccessMessage("Signup successful! Please Continue with payment to move forward");
        setemailId("");
        setPassword("");
        setConfirmPassword("");
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
    <div className="flex items-center justify-center min-h-screen  bg-gray-100 bg-gradient-to-r from-gray-200 to-blue-300 ">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-500">
          Create Password
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
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
              maxLength={45}
              value={emailId}
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

          {/* Password Input */}
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

          {/* Confirm Password Input */}
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
              maxLength={45}
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

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-sm mt-1">{successMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-blue-500 text-white font-bold py-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Signing Up..." : "CreatePassword"}
          </button>

          <Link
              to="/payment"
              className="text-blue-500 hover:text-blue-500  ml-[150px] font-medium hover:underline"
            >
              Make Payment
            </Link>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
