import React from "react";
import "./Slide1.css"; // Ensure this file contains all the styles you've provided
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";

function Slide1() {
  return (
    <div className="home-tuition flex flex-col justify-center items-center text-center mt-16">
      <h1 className="home-head text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight sm:leading-[45px] md:leading-[60px] lg:leading-[70px]">
        Welcome to <Link to="/login"className="text-[#41C9E2]  hover:text-blue-900 hover:underline transition duration-300">Gruhapandit Tuitions</Link> - Your Trusted
        Learning Partner!
        <span className="inline-flex items-center">
          <FaGraduationCap className="ml-2" />
        </span>
      </h1>

      <div className="w-full max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] text-base sm:text-md md:text-lg lg:text-xl text-white mb-6">
        <p className="home-paras">
          At <b>Gruhapandit Tuitions</b>, we are committed to
          providing top-quality education through both
          <b> online tuition and offline tuition,</b> designed
          to meet the needs of every student. Whether you're looking for
          personalized one-on-one tutoring or engaging group sessions, we offer
          flexible learning solutions that fit your schedule and learning style.
        </p>
        
      </div>

      <Link to="/login">
        <button className="apply-btn bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 mt-4 sm:mt-6 rounded-lg sm:rounded-xl font-semibold transition-colors duration-300">
          Apply Now
        </button>
      </Link>
    </div>
  );
}

export default Slide1;