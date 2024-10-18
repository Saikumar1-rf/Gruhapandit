import React, { useState, useRef } from "react";
import { FaEnvelope, FaBell, FaCog } from "react-icons/fa";
import grad from '../assets/grad.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CgProfile } from "react-icons/cg";

const StudentDashboard = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSettingsClick = () => {
    setShowSettings((prev) => !prev); // Toggle settings visibility
  };

  const handleProfileClick = () => {
    console.log("Navigating to Profile...");
  };

  const handlePrivacyClick = () => {
    console.log("Navigating to Privacy...");
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-cyan-300 flex items-center h-14 justify-between px-10 py-2">
        <div>
          <img
            src="/gruhapandit (1).png"
            alt="Gruha Pandit"
            className="w-24 h-auto"
          />
        </div>
        <div className="flex items-center space-x-5">
          <FaEnvelope className="text-gray-950 w-4 h-4" />
          <FaBell className="text-gray-950 w-4 h-4" />
        </div>

        <div className="flex items-center mt-2 space-x-6 hover:scale-105 transition-all duration-300">
          <CgProfile className="text-gray-950 h-6 w-6" />
          <h1 className="text-gray-700">UserName</h1>
        </div>

        <div
          className="relative flex items-center space-x-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={dropdownRef}
        >
          <FaCog
            className="text-gray-950 h-4 w-4 cursor-pointer"
            onClick={handleSettingsClick} // Use the settings click handler
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-7 bg-white shadow-lg rounded-md">
              <ul className="text-gray-700 mt-2">
                <li
                  onClick={handleProfileClick}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={handlePrivacyClick}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  Policy
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-red-500 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {showSettings && (
          <div className="absolute right-10 top-16 bg-white shadow-md p-4 rounded space-y-2">
            <div
              onClick={handleProfileClick}
              className="cursor-pointer text-blue-600 hover:underline text-center"
            >
              Profile
            </div>
            <div
              onClick={handlePrivacyClick}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Privacy
            </div>
            <div
              onClick={handleLogout}
              className="cursor-pointer text-red-600 hover:underline"
            >
              Logout
            </div>
          </div>
        )}
      </header>

      <main className="p-4 text-gray-800 flex items-center justify-center">
        <img
          src={grad}
          alt="Graduation Image"
          className="w-[840px] h-[150px] object-cover"
        />
      </main>

      <div className="border border-black mt-3 flex flex-col h-screen m-[250px]">
        <header className="bg-cyan-700 text-white flex items-center justify-between px-2 py-2">
          <h2 className="text-lg font-semibold">Your Required Posts</h2>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-bold text-center mb-4">Your Learnings</h3>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="border-4 border-cyan-500 p-4 rounded-md flex flex-col items-center h-[150px] w-[250px] hover:scale-105 transition-all duration-300"
              >
                <h4 className="text-lg font-bold">Learning Item {index + 1}</h4>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
