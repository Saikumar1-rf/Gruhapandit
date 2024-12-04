import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBell } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import axiosInstance from './AxiosInstance';
import Postsdash from './Postsdash';
import Sidebar from './Sidebar';

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [tutorSearch, setTutorSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
    <div className='flex flex-row'>
      <Sidebar/>

    <div className="flex-1 flex flex-col">
      <Postsdash/>

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
            <div className="overflow-x-auto w-full rounded-lg mt-2">
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
                      <td className="border border-black px-2 py-2">{tutor.subjectsYouAreExpertAt}</td>
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
            <div className="overflow-x-auto w-full rounded-lg mt-2">
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
                      <td className="border border-black px-2 py-2">{student.modeOfTeaching}</td>
                      <td className="border border-black px-2 py-2">{student.location}</td>
                      <td className="border border-black px-2 py-2">{student.availableTimings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Admin;