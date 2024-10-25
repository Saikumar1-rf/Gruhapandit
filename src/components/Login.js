import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/authContext'; 

const Login = () => {
  const { login } = useAuth(); // Get the login function from context
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (input) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z.-]+\.(com|net|org|in|edu|gov|mil|co|us|info)$/;
    return emailPattern.test(input) && !/^\d[0-5]/.test(input);
  };

  // Phone number validation
  const validatePhoneNumber = (input) => {
    const phonePattern = /^[6-9]\d{9}$/; // Starts with 6-9 and followed by 9 digits
    return phonePattern.test(input);
  };

  // Password validation
  const validatePassword = (input) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&+#^=])[A-Za-z\d@$!%?&+#^=]{8,}$/;
    return passwordPattern.test(input) && !/\s/.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    const trimmedEmail = emailId.trim();

    if (isValid) {
      const requestData = {
        emailId: trimmedEmail,
        password: password,
      };

      try {
        const response = await axios.post('https://hrms-repository-gruhabase.onrender.com/tuition-application/authenticate/login', requestData);
        const { jwtToken, userId, userRole, userType } = response.data;

        // Store the token and user info
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userType', userType);

        // Call login from context
        login();

        setSuccessMessage('Login Successful');
        setEmailId('');
        setPassword('');

        // Navigate based on user role
        if (userType === 'admin') {
          navigate('/posts');
        } else {
          navigate('/userDashboard'); // Adjusted to match the route in App.js
        }

      } catch (error) {
        if (error.response) {
          setEmailError(error.response.data?.message || 'Login failed. Please try again.');
        } else {
          setEmailError('An error occurred. Please check your network connection.');
        }
      } finally {
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\s+/g, '').replace(/[A-Z]/g, '');

    if (/^[0-5]/.test(formattedValue)) {
      return;
    }

    setEmailId(formattedValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-gray-200 to-blue-300 ...">
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-2xl font-bold text-blue-500">{successMessage}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl h-full p-8 bg-transparent  border border-gray-400  rounded-lg z-10 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500  ">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 text-shadow-default">Login To Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 text-shadow-default text-left">Email ID or Phone Number</label>
            <input
              type="text"
              id="email"
              value={emailId}
              placeholder='Enter your email or PhoneNumber'
              maxLength={45}
              onChange={handleEmailChange}
              className={`mt-3 block w-full bg-transparent px-3 py-3 border border-gray-400  rounded-md shadow-sm sm:text-sm ${emailError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-gray-500 focus:border-gray-500`}
              aria-invalid={!!emailError}
              aria-describedby="email-error"
            />
            {emailError && <p id="email-error" className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 text-left text-shadow-default">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder='Enter Password'
              value={password}
              minLength={8}
              maxLength={15}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-3 block w-full px-3 py-3 bg-transparent border border-gray-400  rounded-md shadow-sm sm:text-sm ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-gray-500 focus:border-gray-500 pr-10`}
              aria-invalid={!!passwordError}
              aria-describedby="password-error"
            />
            <button
              type="button"
              className="absolute right-3 top-9 mt-3 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && <p id="password-error" className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="mt-2 text-right">
            <Link to="/forgotpassword" className="text-sm text-gray-950 text-shadow-default ">Forgot Password</Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-500 text-gray-800 font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 mt-5"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-950 text-shadow-default">
            Don't Have An Account?{' '}
            <Link to="/register/student" className="text-gray-800 text-shadow-default hover:underline font-medium  p-3">Student Register</Link>
            <Link to="/register/tutor" className="text-gray-800 text-shadow-default hover:underline font-medium ">Tutor Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
