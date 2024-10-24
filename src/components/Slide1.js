import React from "react";
import "./Slide1.css";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";

function Slide1() {
  return (
    <div className="home-tuition flex flex-col justify-center items-center text-center h-screen px-4 bg-cover bg-center bg-no-repeat mt-14">
      {/* {/ Heading Section /} */}
      <h1 className="home-head text-2xl  sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight sm:leading-[40px] md:leading-[70px] lg:leading-[70px]">
        Welcome to <Link to="/">Gruhapandit Tuitions</Link> - Your Trusted
        Learning Partner!
        <span className="inline-flex items-center">
          <FaGraduationCap className="ml-2" />
        </span>
      </h1>

      {/* {/ Description Section /} */}
      <div className="w-full max-w-[90%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] text-base sm:text-md md:text-xl lg:text-2xl font-semibold text-white mb-6">
        <p>
          At <Link>Gruhapandit Tuitions</Link>, we are committed to providing
          top-quality education through both online tuition and offline tuition,
          designed to meet the needs of every student. Whether you're looking
          for personalized one-on-one tutoring or engaging group sessions, we
          offer flexible learning solutions that fit your schedule and learning
          style.
        </p>
      </div>

      {/* {/ Button Section /} */}
      <Link to="/login">
        <button className="apply-btn bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 mt-4 sm:mt-6 rounded-lg sm:rounded-xl font-semibold transition-colors duration-300">
          Apply Now
        </button>
      </Link>
    </div>
  );
}

export default Slide1;
