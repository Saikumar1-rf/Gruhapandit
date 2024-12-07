import React from "react";
import gruhapandit from "../Asserts/gruhapandit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-section flex flex-col items-center md:items-start text-center md:text-left">
          <img
            className="w-[200px] h-[200px] mb-4 filter invert brightness-0"
            src={gruhapandit}
            alt="Gruhapandit Logo"
          />
          <p className="text-gray-400">
            Providing quality tuitions and educational services to help you
            achieve academic excellence.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <span>+91 9618859004</span>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
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

      <div className="mt-8 text-center">
  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
  <div className="flex justify-center space-x-6">
    <a
      href="https://www.facebook.com/people/Gruhapandit-Tuitions/61566845707627/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-400 transition transform hover:scale-110"
    >
      <FontAwesomeIcon icon={faFacebook} size="2x" />
    </a>
    <a
      href="https://www.youtube.com/@GruhapanditTuitions"
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-500 hover:text-red-400 transition transform hover:scale-110"
    >
      <FontAwesomeIcon icon={faYoutube} size="2x" />
    </a>
    <a
      href="https://www.instagram.com/gruhapandit_tuitions/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink-500 hover:text-pink-400 transition transform hover:scale-110"
    >
      <FontAwesomeIcon icon={faInstagram} size="2x" />
    </a>
  </div>
</div>
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto text-center text-gray-400">
          &copy; 2024 Gruhapandit Tuitions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;