import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [emailId, setEmailId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailIdError, setEmailIdError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation function
  const validateEmailId = (input) => {
    const emailIdPattern =
      /^(?!\d)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@(gmail|yahoo|outlook|hotmail|example|sai)\.(com|net|org|in|edu|gov|mil|us|info|org\.in)$/;
    return input.length > 0 && emailIdPattern.test(input);
  };

  // Password validation function
  const validatePassword = (input) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(input) && !/\s/.test(input);
  };

  // Handle form submission with PATCH request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setEmailIdError("");
    setSuccessMessage("");
    setLoading(true);

    if (!validateEmailId(emailId)) {
      setEmailIdError("Enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(oldPassword)) {
      setPasswordError(
        "Old password must have at least 8 characters with uppercase, lowercase, number, and special character."
      );
      setLoading(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "New password must have at least 8 characters with uppercase, lowercase, number, and special character."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://hrms-repository-gruhabase.onrender.com/tuition-application/authenticate/changePassword?emailId=${emailId}&oldPassword=${oldPassword}&newPassword=${newPassword}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId,
            oldPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Password update failed. Please check your credentials.");
      }

      const data = await response.json();
      setSuccessMessage("Password updated successfully!");
      setEmailId("");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Update Password
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="emailId"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="text"
              id="emailId"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
                emailIdError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {emailIdError && (
              <p className="text-red-500 text-sm mt-1">{emailIdError}</p>
            )}
          </div>

          {/* Old Password Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={toggleOldPasswordVisibility}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* New Password Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm mb-4">{passwordError}</p>
          )}

          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
