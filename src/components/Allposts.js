import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosInstance";
import { FaEnvelope, FaBell } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Slide6 from "./Slide6";
 
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPolicy = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate=useNavigate();

  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const usersData = JSON.parse(localStorage.getItem("usersData")); // Get usersData from localStorage
  
      if (token && usersData) {
        await axiosInstance.post(
          `/tuition-application/authenticate/logout?emailId=${usersData.emailId}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
  
      // Clear local storage and sensitive state
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      localStorage.removeItem("usersData");  // Clear usersData from localStorage if needed
  
      // Redirect user to the login page
      navigate("/", { replace: true });
    } catch (error) {
      // Proceed with client-side logout even if server logout fails
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      localStorage.removeItem("usersData");
  
      navigate("/", { replace: true });
    }
  };  
  
  return (
    <div className="h-screen flex sticky">
      {/* Sidebar */}
      <div className="bg-gray-200 w-2/5 sm:w-1/5 max-h-screen text-black">
        <div className="p-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Admin Dashboard</h2>
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
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-cyan-700 flex items-center h-14 justify-between px-4 py-2">
          {/* <h1 className="text-black text-lg font-bold">Dashboard</h1> */}
          <div className="flex items-center space-x-4 ml-auto">
            <FaEnvelope className="w-4 h-4 text-white" />
            <FaBell className="w-4 h-4 text-white" />
            <div className="relative">
              <IoSettings
                className="text-white w-5 h-5 cursor-pointer"
                onClick={toggleDropdown}
              />
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <li className="block px-4 py-2 hover:bg-blue-100" onClick={handleOpenPolicy}>
                    Policy
                  </li>
                  <Link to="/" className="block px-4 py-2 hover:bg-blue-100" onClick={handleLogout}>
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

        {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
          <div className="relative bg-white shadow-lg rounded-lg max-w-4xl w-full mx-auto h-[90vh] overflow-y-auto p-8">
            <button
              className="absolute top-3 right-3 text-red-700 font-bold hover:text-red-500 "
              onClick={handleCloseModal}
            >
              X
            </button>
            <Slide6/>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}

export default Allposts;
