import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBell, FaArrowLeft } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Slide6 from "./Slide6";
import axiosInstance from "./AxiosInstance";

const Postsdash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPolicy = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate=useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const usersData = JSON.parse(localStorage.getItem("usersData")); // Get usersData from localStorage
  
      if (token && usersData) {
        await axiosInstance.post(
          `/tuition-application/authenticate/logout?emailId=${usersData.emailId}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Clear local storage and sensitive state
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      localStorage.removeItem("usersData");  // Clear usersData from localStorage if needed
  
      // Redirect user to the login page
      navigate("/", { replace: true });
    } catch (error) {
      // Proceed with client-side logout even if server logout fails
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      localStorage.removeItem("usersData");
      
      navigate("/", { replace: true });
      // window.location.reload();
    }
  };  
  
  return (
      <div className="flex-1 flex flex-col sticky top-0">
        <header className="bg-cyan-700 flex items-center h-14 justify-between px-4 py-2">
          <div className="flex items-center space-x-4 ml-auto mt-1">
            <FaEnvelope className="text-white w-4 h-4" />
            <FaBell className="text-white w-4 h-4" />
          </div>
          <div className="relative mt-1 ml-2" ref={dropdownRef}>
      <IoSettings
        className="text-white h-4 w-4 cursor-pointer"
        onClick={toggleDropdown}
      />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <li className="block px-4 py-2 hover:bg-blue-100" onClick={handleOpenPolicy}>
                Policy
              </li>
              <Link to="/" className="block px-4 py-2 hover:bg-blue-100" onClick={handleLogout}>
                Logout
              </Link>
            </div>
            )}
          </div>
          {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
          <div className="relative bg-white shadow-lg rounded-lg max-w-4xl w-full mx-auto h-[90vh] overflow-y-auto p-8">
            <button
              className="absolute top-3 right-3 text-red-700 font-bold hover:text-red-500 "
              onClick={handleCloseModal}
            >
              X
            </button>
            <Slide6/>
          </div>
        </div>
      )}
        </header>
      </div>
  )
};

export default Postsdash;