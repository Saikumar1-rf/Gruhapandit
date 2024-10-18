import React from "react";
import { Link } from "react-router-dom";

const Slide4 = () => {
  return (
    <div className="slide2-container border shadow-xl py-10">
      <div className="about-us-section flex flex-col md:flex-row items-center md:items-start md:justify-between md:space-x-8 p-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1509869175650-a1d97972541a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Us Image"
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-4xl text-cyan-500 mt-10 font-bold mb-4">
            For Tutors
          </h2>
          <p className="text-lg leading-relaxed font-bold text-gray-800">
            If you're a tutor looking to share your expertise, Gruhapandit
            tuitions provides you with the perfect platform. You can:
          </p>

          {/* Removed <p> and placed the <ul> directly */}
          <ul className="list-disc pl-10 space-y-2 text-lg leading-relaxed mt-4 text-gray-800">
            <li>Create and post your subjects in your areas of expertise.</li>
            <li>Customize your teaching schedule to suit your availability.</li>
            <li>Teach passionate students who are eager to learn.</li>
            <li>Build a reputation and grow your tutoring business.</li>
            <li>
              Manage your sessions, track student progress, and receive
              feedback, all in one place.
            </li>
          </ul>

          {/* Button Section */}
          <Link to="/login">
            <button className="apply-btn bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 mt-8 rounded-xl font-semibold transition-colors duration-300">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide4;
