import React from 'react';
import gruhapandit from "../Asserts/gruhapandit.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Logo and Description Section */}
        <div className="footer-section flex flex-col items-center sm:items-start">
          <img
            className="w-[200px] h-[200px] mb-4  filter invert brightness-0"
            src={gruhapandit}
            alt="Gruhapandit Logo"
          />
          <p className="text-gray-400 text-center mr-10 sm:text-left">
            Providing quality tuitions and educational services to help you achieve academic excellence.
          </p>
        </div>

        {/* Overview Section */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about-us" className="hover:underline">About Us</a></li>
            <li><a href="/post" className="hover:underline">Posts</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
            <li><a href='/login' className="hover:underline">Register</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <span>+91 9618859004</span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <span>gruhapandittuitions@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto text-center text-gray-400">
          &copy; 2024 Gruhapandit Tuitions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
