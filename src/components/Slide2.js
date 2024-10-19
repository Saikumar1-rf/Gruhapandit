import React from "react";
// import './Slide2.css';
import { BiTimer } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";


const Slide2 = () => {
  return (
    <>
      <div className="slide2-container border mt-10 shadow-xl py-10">
        <div className="about-us-section flex flex-col md:flex-row items-center md:items-start md:justify-between md:space-x-8 p-6">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us Image"
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Right Side - Content */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-4xl text-cyan-500 mt-10 font-bold mb-4">
              About Us
            </h2>
            <p className="text-lg leading-relaxed font-bold text-gray-800">
              At Gruhapandit, we aim to bridge the gap between students and
              tutors, fostering an environment of learning and growth. Our
              platform connects eager learners with skilled educators, providing
              a personalized learning experience for everyone.
            </p>
            <p className="text-lg leading-relaxed font-bold mt-4 text-gray-800">
              Our mission is to empower students to succeed and provide tutors
              with a space to share their expertise.
            </p>
            <p className="text-lg leading-relaxed mt-10 shadow-lg p-6 bg-slate-400 rounded-lg font-bold text-gray-800">
              We believe that education is a journey, and every learner deserves
              access to quality guidance. Whether you're a student looking to
              deepen your knowledge, improve your grades, or gain new skills, or
              a tutor eager to share your expertise and connect with
              enthusiastic learners, Gruhapandit tuitions is here to support
              you.
            </p>
          </div>
        </div>
      </div>

      {/* offering content with icons */}

      <div>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-7xl mt-10 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* <!-- Scheduling Section --> */}
            <div className="border rounded-md border-gray-300 p4">
              <div class="flex justify-center mb-4">
                {/* <!-- Icon (replace with actual SVG or image) --> */}
                <BiTimer className="h-[100px] w-[100px] text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold">Scheduling</h3>
              <p className="text-gray-600 mt-4">
                At Gruhapandit tuitions, both students and tutors have the
                flexibility to create and manage their own schedules.
              </p>
            </div>

            {/* <!-- Accreditation Section --> */}
            <div className="border rounded-md border-r-gray-300 p-4">
              <div className="flex justify-center mb-4">
                {/* <!-- Icon (replace with actual SVG or image) --> */}
                <FaBookReader className="h-[100px] w-[100px] text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold">Accreditation</h3>
              <p className="text-gray-600 mt-4">
                We ensure that all tutors on our platform are qualified and
                experienced in their respective fields.
              </p>
            </div>

            {/* <!-- Graduation Section --> */}
            <div className="border rounded-md border-gray-300 p-4">
              <div className="flex justify-center mb-4">
                {/* <!-- Icon (replace with actual SVG or image) --> */}
                <FaGraduationCap className="h-[100px] w-[100px] text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold">Graduation</h3>
              <p className="text-gray-600 mt-4">
                This not only acknowledges their dedication and effort but also
                serves as a testament to the skills and knowledge they've
                acquired through our platform.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Slide2;
