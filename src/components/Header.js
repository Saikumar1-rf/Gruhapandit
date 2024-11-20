import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gruhapandit from "../Asserts/gruhapandit.png";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => setShowDropdown(true);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full h-16 z-20 bg-gradient-to-r">
    <div className="container mx-auto flex justify-between items-center h-full px-4 sm:px-8">
      <NavLink to="/">
        <img
          src={gruhapandit}
          alt="Gruhapandit Logo"
          className="w-14 h-14 sm:w-20 sm:h-20 brightness-125 mt-1"
        />
      </NavLink>

      <button
        className="text-3xl sm:hidden focus:outline-none"
        onClick={toggleMobileMenu}
      >
        &#9776;
      </button>

      <nav
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:flex sm:items-center sm:space-x-6 absolute sm:relative top-16 sm:top-0 left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none p-4 sm:p-0`}
      >
        <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-500 font-semibold"
                  : "text-gray-800 hover:text-cyan-500"
              }
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-500 font-semibold"
                  : "text-gray-800 hover:text-cyan-500"
              }
              onClick={handleLinkClick}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-500 font-semibold"
                  : "text-gray-800 hover:text-cyan-500"
              }
              onClick={handleLinkClick}
            >
              Login
            </NavLink>
          </li>
          <li
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            className="relative"
          >
            <span
              onClick={handleToggleDropdown}
              className="cursor-pointer text-gray-800 hover:text-cyan-500"
            >
              Register
            </span>
            {showDropdown && (
              <ul className="absolute right-0 mt-4 bg-white shadow-lg rounded-md py-2 w-40">
                <li>
                  <NavLink
                    to="/register/student"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={handleLinkClick}
                  >
                    Student Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register/tutor"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={handleLinkClick}
                  >
                    Tutor Register
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
}

export default Header;