import React from "react";
import { FaCog } from "react-icons/fa";

const Slide5 = () => {
  return (
    <>
      <div>
        <div
          className="slide3-container relative h-[600px] bg-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.7",
          }}
        >
          <div className="slide3-content absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50">
            <h1 className="slide3-title text-white text-3xl md:text-4xl font-bold mb-4">
              Why Choose Gruhapandit Tuitions?
            </h1>
            <p className="slide3-description text-white text-lg md:text-xl w-full px-4 md:px-10 lg:px-20">
              At Gruhapandit Tuitions, we are dedicated to creating a learning
              experience that is flexible, accessible, and tailored to your
              unique needs. Whether you are a student eager to expand your
              knowledge or a tutor aiming to share your expertise, our platform
              offers the perfect environment to achieve your goals. We provide
              access to a diverse range of subjects and expert tutors, ensuring
              high-quality education. With flexible scheduling, global reach,
              and a secure platform, Gruhapandit Tuitions makes learning and
              teaching easy, effective, and enjoyable. Empower your educational
              journey with us and discover the endless possibilities that
              personalized tutoring can offer. Join us today and take the first
              step towards achieving your academic aspirations!
            </p>
          </div>
        </div>
      </div>

      {/* // mission and vision */}
      <div className="border border-gray-300 p-6 rounded-lg ">
        <div className="flex justify-between items-start">
          {/* Vision Section */}
          <div className="flex border border-gray-400 w-[600px] h-[200px] p-4 rounded-lg ml-10">
            <div className="mt-10">
              <FaCog className="text-cyan-500 text-2xl mr-2 w-[70px] h-[70px]" />
            </div>
            <div>
              <h1 className="text-cyan-500  text-center font-bold text-4xl mt-2">
                Vision
              </h1>
              <p className="font-bold text-gray-800 text-center">
                Our vision is to build a learning community where knowledge is
                shared freely and efficiently, fostering growth and development
                for both students and tutors.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="flex  border border-gray-400 w-[600px] h-[200px] p-4 rounded-lg mr-10">
            <div className="mt-10">
              <FaCog className="text-cyan-500 text-2xl mr-2 w-[70px] h-[70px]" />
            </div>
            <div>
              <h1 className="text-cyan-500 text-4xl text-center font-bold">
                Mission
              </h1>
              <p className="font-bold text-gray-800 text-center">
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
