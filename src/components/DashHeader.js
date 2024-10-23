import React, { useState, useRef } from 'react';
import { FaEnvelope, FaBell, FaCog } from 'react-icons/fa';
import grad from '../Asserts/gruhapandit.png'; // Update this path to your image file

const DashHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);
  const [showProfile, setShowProfile] = useState(false); // State for showing the profile page

  return (
    <header className="bg-cyan-700 flex items-center h-16 justify-between px-4 md:px-10 py-2 shadow-md relative mt-36">
      <img src={grad} alt="Gruha Pandit" className="w-20 md:w-24" />

      <div className="flex items-center space-x-4 text-white">
        <FaEnvelope className="w-5 h-5 cursor-pointer" />
        <FaBell className="w-5 h-5 cursor-pointer" />

        <div
          className="relative flex items-center space-x-2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={dropdownRef}
        >
          <FaCog className="w-5 h-5" />

          {showDropdown && (
            <div className="absolute right-0 top-14 w-40 bg-white shadow-lg rounded-md">
              <ul className="text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setShowProfile(true)} // Show ProfilePage when clicked
                >
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">Policy</li>
                <li className="px-4 py-2 hover:bg-red-500 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
