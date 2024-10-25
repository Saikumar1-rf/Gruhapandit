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
  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full h-[10vh] mb-0 z-20 bg-gradient-to-r from-gray-200 to-blue-300">
    <div className="container mx-auto flex justify-between items-center h-full">
      {/* Logo */}
      <NavLink to="/">
        <img
          src={gruhapandit}
          alt="Gruhapandit Logo"
          className="w-[120px] h-[120px] brightness-125 "
        />
      </NavLink>

      {/* Hamburger Menu Icon for Mobile */}
      <button
        className="text-3xl sm:hidden focus:outline-none"
        onClick={toggleMobileMenu}
      >
        &#9776;
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:flex sm:items-center sm:space-x-6`}
      >
        <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-500 font-semibold ml-2"
                  : "text-gray-800 hover:text-cyan-500 ml-2"
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
                  ? "text-cyan-500 font-semibold ml-2"
                  : "text-gray-800 hover:text-cyan-500 ml-2"
              }
              onClick={handleLinkClick}
            >
              About Us
            </NavLink>
          </li>
        </ul>

        {/* Authentication Links */}
        <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0">
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-500 font-semibold ml-2"
                  : "text-gray-800 ml-2"
              }
              onClick={handleLinkClick}
            >
              Login
            </NavLink>
          </li>

          {/* Dropdown for Register */}
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
              <ul className="absolute right-[-9rem] mt-4 items-center bg-white shadow-lg rounded-md py-4 w-40 mr-32">
                <li>
                  <NavLink
                    to="/register/student"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => setShowDropdown(false)}
                  >
                    Student Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register/tutor"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => setShowDropdown(false)}
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
