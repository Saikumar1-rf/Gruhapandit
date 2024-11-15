import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePassword = () => {
  const location = useLocation();
  const [emailId, setEmailId] = useState(location.state?.emailId || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailIdError, setEmailIdError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");
  const [passwordChecklist, setPasswordChecklist] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.emailId) {
      setEmailId(location.state.emailId);
    }
  }, [location.state]);

  const validatePassword = (input) => {
    const length = input.length >= 8;
    const uppercase = /[A-Z]/.test(input);
    const lowercase = /[a-z]/.test(input);
    const number = /\d/.test(input);
    const specialChar = /[@$!%*?&]/.test(input);

    setPasswordChecklist({ length, uppercase, lowercase, number, specialChar });

    return length && uppercase && lowercase && number && specialChar;
  };

  const checkPasswordStrength = (input) => {
    const length = input.length >= 8;
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (input.length === 0) return "";

    if (!length) {
      setPasswordStrengthColor("text-red-500");
      return "Too Short";
    }
    if (input.length < 8) {
      setPasswordStrengthColor("text-yellow-500");
      return "Weak";
    }
    if (strongPattern.test(input)) {
      setPasswordStrengthColor("text-green-500");
      return "Strong";
    }
    setPasswordStrengthColor("text-yellow-500");
    return "Weak";
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setPasswordStrength(checkPasswordStrength(input)); // Update strength immediately
    validatePassword(input); // Check for criteria and update checklist
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setEmailIdError("");
    setSuccessMessage("");

    if (!validatePassword(password)) {
      setPasswordError("Password must meet the required criteria.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const requestData = { emailId, password };
    setLoading(true);
    try {
      const response = await axios.post(
        "https://tution-application.onrender.com/tuition-application/authenticate/register",
        // "https://hrms-repository-gruhabase.onrender.com/tuition-application/authenticate/register",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Account create successfully!")
        setShowPopup(true);
        setEmailId("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setShowPopup(false);
          navigate("/payment");
        }, 1000);
      }
    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100 bg-gradient-to-r pt-20">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-500">
          Create Password
        </h1>
        <form onSubmit={handleSubmit}>
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
              value={emailId}
              maxLength={40}
              readOnly
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                emailIdError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {emailIdError && (
              <p className="text-red-500 text-sm mt-1">{emailIdError}</p>
            )}
          </div>

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
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
            <p className={`text-xs mt-1 ${passwordStrengthColor}`}>
              Password strength: {passwordStrength}
            </p>
            <ul className="mt-1 text-xs">
              <li
                className={
                  passwordChecklist.length ? "text-green-500" : "text-red-500"
                }
              >
                {passwordChecklist.length ? "✔" : "✘"} At least 8 characters
              </li>
              <li
                className={
                  passwordChecklist.uppercase
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {passwordChecklist.uppercase ? "✔" : "✘"} One uppercase letter
              </li>
              <li
                className={
                  passwordChecklist.lowercase
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {passwordChecklist.lowercase ? "✔" : "✘"} One lowercase letter
              </li>
              <li
                className={
                  passwordChecklist.number ? "text-green-500" : "text-red-500"
                }
              >
                {passwordChecklist.number ? "✔" : "✘"} One number
              </li>
              <li
                className={
                  passwordChecklist.specialChar
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {passwordChecklist.specialChar ? "✔" : "✘"} One special
                character (@$!%*?&)
              </li>
            </ul>
          </div>

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
                password !== confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md font-semibold focus:outline-none hover:bg-cyan-600"
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
        </form>
         {/* Success Popup */}
         {showPopup && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-center text-green-600">{successMessage}</h2>
            <p className="text-center text-sm mt-2">Redirecting to payment...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePassword;
