import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBell } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import axiosInstance from './AxiosInstance';
import Slide6 from './Slide6';

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [tutorSearch, setTutorSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/tuition-application/admin/getAdminPageData');
        if (response && response.data) {
          const { students, teachers } = response.data;
          setTutors(teachers || []);
          setStudents(students || []);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        setErrorMessage(error.message || 'Error fetching data');
      }
    };

    fetchAdminDashboardData();
  }, []);

  const filteredTutors = tutors.filter((tutor) =>
    (tutor.firstName && tutor.firstName.toLowerCase().includes(tutorSearch.toLowerCase())) ||
    (tutor.subjectsLookingFor && tutor.subjectsLookingFor.toLowerCase().includes(tutorSearch.toLowerCase()))
  );
  
  const filteredStudents = students.filter((student) =>
    (student.firstName && student.firstName.toLowerCase().includes(studentSearch.toLowerCase())) ||
    (student.subjectsLookingFor && student.subjectsLookingFor.toLowerCase().includes(studentSearch.toLowerCase()))
  );


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPolicy = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

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
    <div className="h-screen flex flex-row md:flex-row sticky">
    {/* Sidebar */}
    <div className="bg-gray-200 w-2/5 md:w-1/5 min-h-screen text-black p-4">
      <h2 className="font-bold mb-6 text-center md:text-left text-2xl md:text-xl">Admin Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/posts" className="hover:text-blue-300">Dashboard</Link>
        </li>
        <li>
          <Link to="/allposts" className="hover:text-blue-300">All Posts</Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-blue-300">Create Posts</Link>
        </li>
      </ul>
    </div>
  
    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
      <header className="bg-blue-200 flex items-center h-14 justify-between px-4 py-2">
        <div className="flex items-center space-x-4 ml-auto mt-1">
          <FaEnvelope className="text-black w-4 h-4" />
          <FaBell className="text-black w-4 h-4" />
          <div className="relative flex items-center" ref={dropdownRef}>
            <IoSettings
              className="text-black-400 h-5 w-5 cursor-pointer"
              onClick={toggleDropdown}
            />
            {isOpen && (
              <div className="absolute right-0 mt-24 w-48 bg-white rounded-md shadow-lg z-10">
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
  
      <div className="flex flex-col items-center p-4">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  
        {/* Tutors and Students Section */}
        <div className="flex flex-col md:flex-row w-full justify-between mb-4">
          {/* Tutor Section */}
          <div className="flex flex-col w-full md:w-1/2 mb-4 md:mr-2">
            <h1 className="text-2xl font-bold text-center">Tutors</h1>
            <div className="flex justify-center mt-2">
              <input
                type="text"
                placeholder="Search Tutors"
                value={tutorSearch}
                onChange={(e) => setTutorSearch(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full outline-none"
              />
            </div>
  
            {/* Tutors Table */}
            <div className="overflow-x-auto w-full">
              <table className="min-w-full border-collapse border-4 border-black text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-2 py-2">Name</th>
                    <th className="border border-black px-2 py-2">Subject</th>
                    <th className="border border-black px-2 py-2">Mode Of Teaching</th>
                    <th className="border border-black px-2 py-2">Location</th>
                    <th className="border border-black px-2 py-2">Available Timings</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTutors.map((tutor, index) => (
                    <tr key={index}>
                      <td className="border border-black px-2 py-2">{tutor.firstName}</td>
                      <td className="border border-black px-2 py-2">{tutor.subjectsLookingFor}</td>
                      <td className="border border-black px-2 py-2">{tutor.modeOfTeaching}</td>
                      <td className="border border-black px-2 py-2">{tutor.location}</td>
                      <td className="border border-black px-2 py-2">{tutor.availableTimings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Student Section */}
          <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold text-center">Students</h1>
            <div className="flex justify-center mt-2">
              <input
                type="text"
                placeholder="Search Students"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full outline-none"
              />
            </div>
  
            {/* Students Table */}
            <div className="overflow-x-auto w-full">
              <table className="min-w-full border-collapse border-4 border-black text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-2 py-2">Name</th>
                    <th className="border border-black px-2 py-2">Subject</th>
                    <th className="border border-black px-2 py-2">Mode Of Class</th>
                    <th className="border border-black px-2 py-2">Location</th>
                    <th className="border border-black px-2 py-2">Available Timings</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index}>
                      <td className="border border-black px-2 py-2">{student.firstName}</td>
                      <td className="border border-black px-2 py-2">{student.subjectsLookingFor}</td>
                      <td className="border border-black px-2 py-2">{student.modeOfClass}</td>
                      <td className="border border-black px-2 py-2">{student.location}</td>
                      <td className="border border-black px-2 py-2">{student.availableTimings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
  </div>



  
  );
};

export default Admin;
