import React from "react";
import { FaCog } from "react-icons/fa";

const Slide5 = () => {
  return (
    <>
      <div>
        <div
          className="slide3-container relative h-[400px] sm:h-[500px] md:h-[600px] bg-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            alt: "Choose",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.7",
          }}
        >
          <div className="slide3-content absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50">
            <h1 className="slide3-title text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
              Why Choose Gruhapandit Tuitions?
            </h1>
            <div className="flex flex-wrap justify-center my-4 text-white">
              <div className="flex flex-wrap justify-center space-x-4">
                <div className="border border-gray-100 bg-slate-100 w-[300px] h-[160px] text-start  px-4 py-2 text-gray-900 shadow-lg rounded-md transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
                  <strong className="text-black text-lg">
                    Experienced Tutors:
                  </strong>{" "}
                  Our team of highly qualified tutors specializes in providing
                  effective tuitions for students in various subjects, including
                  Math, Science, English, and more.
                </div>

                <div className="border border-gray-100 bg-slate-100 w-[300px] h-[160px] text-start  px-4 py-2 text-gray-900 shadow-lg rounded-md transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
                  <strong className="text-black text-lg">
                    Online Learning:
                  </strong>{" "}
                  With our interactive online courses, gain knowledge from the
                  comfort of your home, providing flexibility and ease of
                  access.
                </div>

                <div className="border border-gray-100 bg-slate-100 w-[300px] h-[160px] text-start  px-4 py-2  text-gray-900 shadow-lg rounded-md transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
                  <strong className="text-black text-lg">
                    Offline Tuitions:
                  </strong>{" "}
                  Prefer in-person learning? We also offer offline tuition in
                  certain locations, where you can interact with experienced
                  tutors.
                </div>
              </div>

              <div className="flex flex-wrap justify-center space-x-4 mt-10">
                <div className="border border-gray-100 bg-slate-100 w-[300px] h-[160px] text-start  px-4 py-2 text-gray-900 shadow-lg rounded-md transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
                  <strong className="text-black text-lg">
                    Exam Preparation:
                  </strong>{" "}
                  Preparing for board exams, competitive exams, or school
                  assessments? Our tutors offer exam-focused tuition to help you
                  excel.
                </div>

                <div className="border border-gray-100 bg-slate-100 w-[300px] h-[160px] text-start  px-4 py-2 text-gray-900 shadow-lg rounded-md transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
                  <strong className="text-black text-lg">
                    Doubt Clearing Sessions:
                  </strong>{" "}
                  Got stuck on a tough topic? Our tutors are always available to
                  offer doubt-clearing sessions to keep you on track.
                </div>

                <div className="border border-gray-100 bg-slate-100 w-[300px] h-[160px] text-start  px-4 py-2 text-gray-900 shadow-lg rounded-md transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
                  <strong className="text-black text-lg">
                    Progress Tracking:
                  </strong>{" "}
                  Regular assessments and feedback help track your progress and
                  keep you on the path to success.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 p-6 rounded-lg  mt-10">
        <div className="flex flex-col md:flex-row justify-evenly my-[100px] items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex border border-gray-400 w-full   md:w-[500px] h-[300px] p-4 shadow-lg rounded-lg transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
            <div className="mt-4 md:mt-10 flex-shrink-0">
              <FaCog className="text-cyan-500 text-2xl mt-16 md:text-4xl mr-2 md:mr-4 w-[60px] md:w-[70px] h-[60px] md:h-[70px]" />
            </div>
            <div className="flex-1">
              <h1 className="text-cyan-500 text-center mr-36  font-bold text-2xl md:text-4xl mt-2 md:mt-4">
                Vision
              </h1>
              <p className="font-bold text-gray-800 leading-7 md:leading-8 mt-4">
                Our vision is to build a learning community where knowledge is
                shared freely and efficiently, fostering growth and development
                for both students and tutors.
              </p>
            </div>
          </div>

          <div className="flex border border-gray-400 w-full md:w-[500px] h-[300px] p-4 shadow-lg rounded-lg transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
            <div className="mt-4 md:mt-20 flex-shrink-0">
              <FaCog className="text-cyan-500 text-2xl mt-6 md:text-4xl mr-2 md:mr-4 w-[60px] md:w-[70px] h-[50px] md:h-[70px]" />
            </div>
            <div className="flex-1">
              <h1 className="text-cyan-500 text-center mr-36 font-bold text-2xl md:text-4xl mt-2 md:mt-4">
                Mission
              </h1>
              <p className="font-bold text-gray-800 leading-7 md:leading-8 mt-4">
                At Gruhapandit Tuitions, we are committed to democratizing
                education by making it accessible and flexible for everyone. Our
                mission is to nurture a learning community where knowledge flows
                freely between students and tutors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide5;
