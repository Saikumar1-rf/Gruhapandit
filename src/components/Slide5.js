import React from "react";
import { FaCog } from "react-icons/fa";

const Slide5 = () => {
  return (
    <>
     
      <div
        className="relative bg-cover bg-center h-[1200px] sm:h-[850px] md:h-[1800px] lg:h-[800px] max-h-[1000px] overflow-auto"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4 font-serif">
          <h1 className="text-white font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-5 sm:mb-7 lg:mb-12">
            Why Choose <span className="text-[#41C9E2] hover:text-blue-900 hover:underline transition duration-300"> Gruhapandit Tuitions? </span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white w-full max-w-6xl px-3 sm:px-0 ">
            {[
              {
                title: "Experienced Tutors",
                description:
                  "Our team of highly qualified tutors specializes in various subjects, including Math, Science, and English.",
              },
              {
                title: "Online Learning",
                description:
                  "Gain knowledge from home with our interactive online courses, offering flexibility and access.",
              },
              {
                title: "Offline Tuitions",
                description:
                  "We offer in-person tuition in certain locations for hands-on learning.",
              },
              {
                title: "Exam Preparation",
                description:
                  "Our tutors provide exam-focused tuition to help you excel.",
              },
              {
                title: "Doubt Clearing Sessions",
                description:
                  "Our tutors are available for doubt-clearing sessions to keep you on track.",
              },
              {
                title: "Progress Tracking",
                description:
                  "Regular assessments help track your progress toward success.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-100 text-gray-900 p-4 shadow-lg rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out text-xs sm:text-sm md:text-base"
              >
                <strong className="text-black block text-center text-sm sm:text-lg md:text-xl">
                  {item.title}
                </strong>
                <p className="text-xs sm:text-sm md:text-base mt-2 text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="border border-gray-300 p-5 sm:p-7 md:p-10 rounded-lg mt-6 lg:mt-12 max-w-6xl mx-auto font-serif">
        <h2 className="text-center text-cyan-500 font-bold text-xl sm:text-3xl md:text-4xl mb-5">
          Our Vision & Mission
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-stretch space-y-6 sm:space-y-0 sm:space-x-5 lg:space-x-7">
          {[
            {
              title: "Vision",
              description:
                "Our vision is to build a learning community where knowledge is shared freely, fostering growth for students and tutors.",
            },
            {
              title: "Mission",
              description:
                "Our mission is to democratize education, making it accessible for everyone, creating a learning community where knowledge flows freely.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full sm:w-[380px] lg:w-[450px] border border-gray-400 p-5 shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <div className="flex-shrink-0 flex justify-center items-center w-[50px] sm:w-[60px] md:w-[70px] h-[50px] sm:h-[60px] md:h-[70px] bg-cyan-500 rounded-full mb-3">
                <FaCog className="text-white text-lg sm:text-xl md:text-2xl" />
              </div>
              <div className="flex-1 text-center">
                <h3 className="text-cyan-500 font-bold text-lg sm:text-xl md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-gray-800 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slide5;