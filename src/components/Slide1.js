import React from "react";
import "./Slide1.css";
import { Link } from "react-router-dom";

function Slide1() {
  return (
    <div className="home-tuition flex flex-col justify-center items-center text-center h-screen px-4">
      {/* Heading Section */}
      <h1 className="home-head text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight md:leading-[70px]">
        Discover the World on a Single Platform
      </h1>

      {/* Description Section */}
      <div className="w-full max-w-[90%] md:max-w-[800px] lg:max-w-[1000px] text-lg sm:text-xl md:text-2xl font-semibold text-white mb-6">
        <p>
          At Gruhapandit tuitions, we believe in creating a bridge between
          dedicated tutors and eager students. Our platform is designed to
          connect learners with expert educators in a variety of subjects,
          offering personalized learning experiences and enabling tutors to
          share their knowledge effectively.
        </p>
      </div>

      {/* Button Section */}
      <Link to="/login">
        {" "}
        <button className="apply-btn bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 mt-4 rounded-xl font-semibold transition-colors duration-300">
          Apply Now
        </button>
      </Link>
    </div>
  );
}

export default Slide1;
