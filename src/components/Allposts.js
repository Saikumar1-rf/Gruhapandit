import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./AxiosInstance";
import { FaEnvelope, FaBell } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
 
function Allposts() {
  const [tutorData, setTutorData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchTutorData = async () => {
    try {
      const response = await axiosInstance.get(
        "/tuition-application/tutorAdvertisement/"
      );

      setTutorData(response.data);
      setStudentData(null);
      setError(null);
    } catch (err) {
      setError("Error fetching tutor data.");
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axiosInstance.get(
        "/tuition-application/studentAdvertisement/"
      );
      setStudentData(response.data);
      setTutorData(null);
      setError(null);
    } catch (err) {
      setError("Error fetching student data.");
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex mt-12">
      {/* Sidebar */}
      <div className="bg-gray-200 w-full md:w-1/5 min-h-screen text-black">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6 sm:text-lg">Admin Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link to="/posts" className="hover:text-blue-500">Dashboard</Link>
            </li>
            <li>
              <Link to="/allposts" className="hover:text-blue-500">All Posts</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-500">Create Posts</Link>
            </li>
            <li>
              <Link to="/emailtemplate" className="hover:text-blue-500">Email Template</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-200 flex items-center justify-between h-14 px-4 sm:px-10">
          {/* <h1 className="text-black text-lg font-bold">Dashboard</h1> */}
          <div className="flex items-center space-x-4 ml-auto">
            <FaEnvelope className="text-black w-5 h-5" />
            <FaBell className="text-black w-5 h-5" />
            <div className="relative">
              <IoSettings
                className="text-black w-6 h-6 cursor-pointer"
                onClick={toggleDropdown}
              />
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link to="/register/term" className="block px-4 py-2 hover:bg-blue-100">
                    Policy
                  </Link>
                  <Link to="/" className="block px-4 py-2 hover:bg-blue-100">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="container mx-auto p-6 lg:px-12 mt-8">
          <h1 className="text-3xl font-bold text-center mb-6">All Posts</h1>

          {/* Buttons to fetch data */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={fetchTutorData}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Tutors Data
            </button>
            <button
              onClick={fetchStudentData}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Students Data
            </button>
          </div>

          {/* Display error message if there is an error */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Display tutor data if available */}
          {tutorData && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Tutor Data</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tutorData.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2">{tutor.firstName}</h3>
                    <p><strong>Subject:</strong> {tutor.subjectsYouAreExpertAt}</p>
                    <p><strong>Mode of Teaching:</strong> {tutor.modeOfTeaching}</p>
                    <p><strong>Available Timings:</strong> {tutor.availableTimings}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display student data if available */}
          {studentData && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Student Data</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {studentData.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2">{student.firstName}</h3>
                    <p><strong>Subject Looking For:</strong> {student.subjectsLookingFor}</p>
                    <p><strong>Mode of Teaching:</strong> {student.modeOfTeaching}</p>
                    <p><strong>Available Timings:</strong> {student.availableTimings}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allposts;
