import React from "react";
import gruhapandit from "../Asserts/gruhapandit.png";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const currentYear = new Date().getFullYear(); // Get the current year dynamically

const UserFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-1">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Section */}
        <div className="footer-section flex flex-col items-center md:items-start text-center md:text-left">
          <img
            className="w-[150px] h-[150px] mb-2 filter invert brightness-0"
            src={gruhapandit}
            alt="Gruhapandit Logo"
          />
          <p className="text-gray-400 text-sm">
            Providing quality tuitions and educational services to help you
            achieve academic excellence.
          </p>
        </div>

        {/* Right Section */}
        <div className="footer-section text-center md:text-right">
          <h3 className="text-md font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-center md:justify-end items-center">
              <FaPhone className="mr-2" />
              <span>+91 9618853331</span>
            </li>
            <li className="flex justify-center md:justify-end items-center">
              <FaEnvelope className="mr-2" />
              <a
                href="mailto:gruhapandittuitions@gmail.com"
                className="hover:underline"
              >
                gruhapandittuitions@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-4 pt-2">
        <div className="container mx-auto text-center text-gray-400 text-xs">
          &copy; {currentYear} Gruhapandit Tuitions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
