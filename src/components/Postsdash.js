import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBell, FaArrowLeft } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const Postsdash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen flex mt-[120px]">
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
          <div className="relative flex items-center" ref={dropdownRef}>
      <IoSettings
        className="text-lime-400 h-4 w-4 cursor-pointer"
        onClick={toggleDropdown}
      />
            {isOpen && (
              <div className="absolute right-0 mt-20 w-48 bg-white rounded-md shadow-lg z-10">
              <Link to="/profile" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdown}>
                Profile
              </Link>
              <Link to="/register/term" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdown}>
                Policy
              </Link>
              <Link to="/logout" className="block px-4 py-2 hover:bg-blue-100" onClick={closeDropdown}>
                Logout
              </Link>
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
