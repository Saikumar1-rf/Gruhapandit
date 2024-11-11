import React from "react";
import { Link } from "react-router-dom";

const Slide4 = () => {
  return (
    <div className="slide2-container border shadow-xl py-10">
      <div className="about-us-section flex flex-col lg:flex-row items-center lg:items-start lg:justify-between lg:space-x-8 p-6">
        <div className="w-full lg:w-[670px] ml-6">
          <img
            src="https://images.unsplash.com/photo-1509869175650-a1d97972541a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="AboutUsImage"
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[550px] object-cover rounded-lg transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out"
          />
        </div>

        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <h2 className="text-3xl sm:text-4xl text-cyan-500 font-bold mb-4">
            <Link to="/register/tutor"> For Tutors</Link>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed font-bold text-gray-800">
            If you're a tutor looking to share your expertise,{" "}
            <Link to="/register/tutor"> Gruhapandit tuitions</Link> provides you
            with the perfect platform. You can:
          </p>

          <ul className="list-disc pl-6 sm:pl-10 space-y-2 text-base sm:text-lg leading-relaxed mt-4 text-gray-800">
            <li>Create and post your subjects in your areas of expertise.</li>
            <li>Customize your teaching schedule to suit your availability.</li>
            <li>Teach passionate students who are eager to learn.</li>
            <li>Build a reputation and grow your tutoring business.</li>
            <li>
              Manage your sessions, track student progress, and receive
              feedback, all in one place.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-4 ">
            Who Can Join?
          </h2>
          <ul className="list-disc pl-6 sm:pl-10 space-y-2 text-base sm:text-lg leading-relaxed mt-4 text-gray-800">
            <li>Experienced Tutors</li>
            <li>Fresh Graduates</li>
            <li>Professional Educators</li>
          </ul>

          <Link to="/register/tutor">
            <button className="apply-btn bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 mt-6 sm:mt-8 rounded-xl font-semibold transition-colors duration-300">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide4;
 