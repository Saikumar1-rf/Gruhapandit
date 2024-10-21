import React, { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaBell, FaCog } from "react-icons/fa";
import {  useNavigate } from "react-router-dom"; // Import useNavigate
import gradi from "../Asserts/Step (1).jpg";
import grad from "../Asserts/gruhapandit.png";
import axiosInstance from "./AxiosInstance";

const TutorDash = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [posts, setPosts] = useState([]); // Store fetched posts
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // API URL
  const API_URL = "https://hrms-repository-gruhabase.onrender.com/tuition-application/userHomePage/";

  // Fetch data from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(API_URL);

        console.log("Fetched Data:", response.data); // Debugging

        // Flatten the nested array structure
        if (response.data && Array.isArray(response.data)) {
          const updatedPosts = response.data.flatMap(item => item); // Flattening the array
          setPosts(updatedPosts); // Update state with posts
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/"); // Navigate to Logout component
  };
  const handleClick=()=>{
    navigate('/register/term')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-[120px]">
      <header className="bg-cyan-700 flex items-center h-16 justify-between px-4 md:px-10 py-2 shadow-md relative">
        <img src={grad} alt="Gruha Pandit" className="w-20 md:w-24" />

        <div className="flex items-center space-x-4 text-white">
          <FaEnvelope className="w-5 h-5 cursor-pointer" />
          <FaBell className="w-5 h-5 cursor-pointer" />

          <div
            className="relative flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
            ref={dropdownRef}
          >
            <FaCog className="w-5 h-5" />

            {showDropdown && (
              <div className="absolute right-0 top-14 w-40 bg-white shadow-lg rounded-md">
                <ul className="text-gray-700">
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                    Profile
                  </li>
                  
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={handleClick}>
                    Policy
                  </li>
                  
                  <li
                    className="px-4 py-2 hover:bg-red-500 cursor-pointer"
                    onClick={handleLogout} // Use handleLogout
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="w-full md:w-3/5 mx-auto mt-10 p-4 flex justify-center bg-white">
        <img
          src={gradi}
          alt="Graduation pic"
          className="w-full h-48 md:h-56 object-cover rounded-md"
        />
      </main>

      <div className="w-full md:w-3/4 mx-auto mt-6">
        <header className="bg-cyan-700 text-white px-4 py-3 rounded-t-md">
          <h2 className="text-lg font-semibold">Your Required Posts</h2>
        </header>

        <div className="bg-white shadow-md p-6 rounded-b-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={index}
                  className="border border-cyan-500 p-4 rounded-md shadow-md hover:scale-105 transition-transform h-[300px] flex flex-col justify-between"
                >
                  <h4 className="text-lg font-bold text-center">{post.firstName}</h4>
                  <p className="text-sm">
                    <strong>Subject:</strong> {post.subjectsLookingFor}
                  </p>
                  <p className="text-sm">
                    <strong>Mode of Teaching:</strong> {post.modeOfTeaching}
                  </p>
                  <p className="text-sm">
                    <strong>Timings:</strong> {post.availableTimings}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700">No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDash;
