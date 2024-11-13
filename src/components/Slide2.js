import React from "react";
import { BiTimer } from "react-icons/bi";
import { FaBookReader, FaGraduationCap } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";

const Slide2 = () => {
  return (
    <>
      <div className="slide2-container border mt-11 shadow-xl py-10">
        <div className="about-us-section flex flex-col mt-10 md:flex-row items-center md:items-start md:justify-between md:space-x-8 p-6">
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our team working on a project"
              className="w-full h-auto md:h-[500px] object-cover rounded-lg transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out"
            />
          </div>

          <div className="w-full md:w-1/2 mt-5 md:mt-0">
            <h2 className="text-4xl text-cyan-500 mt-10 font-bold mb-4">
              About Us
            </h2>
            <p className="text-lg leading-relaxed font-bold text-gray-600">
              At <Link to="/login">Gruhapandit Tuitions</Link>, we strive to
              make learning engaging, effective, and accessible for every
              student. Whether you choose
              <Link to="/login"> online tuition or offline tuition</Link>, our
              goal is to help you reach your academic goals with confidence.
              <p className="text-gray-600">
                Join <Link to="/login">Gruhapandit Tuitions</Link> today and
                take the first step toward academic excellence!
              </p>
            </p>
            <p className="text-lg leading-relaxed font-bold mt-4 text-gray-600">
              Join <Link to="/login">Gruhapandit Tuitions</Link> as a Tutor –
              Empower Students, Shape Futures!
              <span className="inline-flex items-center">
                <FaGraduationCap className="ml-2" />
              </span>
            </p>
            <p className="text-lg leading-relaxed mt-10 shadow-lg p-6 bg-slate-400 rounded-lg font-bold text-gray-800">
              Are you passionate about teaching and helping students excel
              academically? <Link to="/login">Gruhapandit Tuitions</Link> is
              looking for dedicated and experienced tutors to join our growing
              community of educators. Whether you specialize in online teaching
              or prefer offline tuition, we provide the perfect platform for you
              to share your expertise and make a lasting impact on students
              lives.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-7xl mt-10 mx-auto">
          <div>
            <h1 className="text-gray-700 font-bold justify-center text-center mb-10 text-4xl">
              Why Choose to Teach at
              <Link to="/login"> Gruhapandit Tuitions?</Link>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="border rounded-md border-gray-300 p-4 transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
              <div className="flex justify-center mb-4">
                <BiTimer className="h-[100px] w-[100px] text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold">Flexible Tutoring Options</h3>
              <p className="text-gray-600 mt-4 text-start px-4">
                Choose to offer online tuition from the comfort of your home or
                offline tuition in your local area. We provide a platform that
                caters to both, allowing you to connect with students in the
                most convenient way for you.
              </p>
            </div>

            <div className="border rounded-md border-gray-300 p-4 transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
              <div className="flex justify-center mb-4">
                <FaBookReader className="h-[90px] w-[90px] text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold">Teach What You Love</h3>
              <p className="text-gray-600 mt-4 text-start px-4">
                Focus on your areas of expertise, whether it’s Maths tuitions,
                Science tuitions, English tuitions, or any other subject. Our
                platform allows you to teach a wide variety of subjects and
                grade levels, from primary school to high school.
              </p>
            </div>

            <div className="border rounded-md border-gray-300 p-4 transition transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 duration-300 ease-in-out">
              <div className="flex justify-center mb-4">
                <MdOutlineSupportAgent className="h-[90px] w-[90px] text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold">Continuous Support</h3>
              <p className="text-gray-600 mt-4 text-start px-4">
                As a Gruhapandit tutor, you will have access to tools,
                resources, and support to help you manage your classes
                effectively. Whether you're teaching{" "}
                <Link to="/login">online or offline</Link>, we ensure you have
                everything you need to succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide2;
 