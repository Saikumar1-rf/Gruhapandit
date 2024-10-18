import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBell, FaArrowLeft } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const Postsdash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-screen flex">
      <div className="bg-cyan-800 w-1/5 min-h-screen text-white">
        <div className="p-4">          
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            </li>
            <li>
              <Link to="/allposts" className="hover:text-gray-300">All Posts</Link>
            </li>
            <li>
              <Link to="/create-posts" className="hover:text-gray-300">Create Posts</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-cyan-800 flex items-center h-14 justify-between px-10 py-2">
          <h1 className="text-white text-lg font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-white w-4 h-4" />
            <FaBell className="text-white w-4 h-4" />
          </div>
          <div className="relative flex items-center">
            <IoSettings
              className="text-lime-400 h-4 w-4 cursor-pointer"
              onClick={toggleDropdown}
            />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link to="/profile" className="block px-4 py-2 text-black hover:bg-gray-200" onClick={closeDropdown}>Profile</Link>
                <Link to="/policy" className="block px-4 py-2 text-black hover:bg-gray-200" onClick={closeDropdown}>Policy</Link>
                <Link to="/logout" className="block px-4 py-2 text-black hover:bg-gray-200" onClick={closeDropdown}>Logout</Link>
              </div>
            )}
          </div>
        </header>

        {/* Other components... */}
      </div>
    </div>
  );
};

export default Postsdash;
