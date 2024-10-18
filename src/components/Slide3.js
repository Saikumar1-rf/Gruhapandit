import React from "react";
import { Link } from "react-router-dom";

const Slide3 = () => {
  return (
    <>
      <div className="flex justify-evenly p-10">
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-4xl text-cyan-500 mt-10 font-bold mb-4">
            For Students
          </h2>
          <p className="text-lg leading-relaxed text-gray-800">
            Unlock your potential by learning from experienced tutors who are
            passionate about teaching. Whenever you're looking to enhance your
            skills in academics, develop new talents, or prepare for an exam,
            Gruhapandit tuitions offers you:
          </p>
          <ul className="list-disc pl-10 space-y-2 text-lg leading-relaxed text-gray-800 mt-4">
            <li>Access to a wide range of subjects.</li>
            <li>Personalized learning schedules that fit your pace.</li>
            <li>
              One-on-one sessions or group classes based on your preferences.
            </li>
            <li>
              Practical learning with quizzes, assignments, and progress
              tracking.
            </li>
            <li>
              Opportunities to learn from tutors all over the world, ensuring
              diverse and quality education.
            </li>
          </ul>
          {/* Button Section */}
          <Link to="/login">
            <button className="apply-btn bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 mt-8 rounded-xl font-semibold transition-colors duration-300">
              Apply Now
            </button>
          </Link>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-[500px] object-cover rounded-lg shadow-xl"
            alt="Students learning"
          />
        </div>
      </div>
    </>
  );
};

export default Slide3;
