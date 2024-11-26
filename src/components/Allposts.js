import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosInstance";
import Postsdash from "./Postsdash";
import Sidebar from "./Sidebar";

 
function Allposts() {
  const [tutorData, setTutorData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);


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

  return (

    <div className='flex flex-row'>
    <Sidebar/>

      <div className="flex-1 flex flex-col">
        <Postsdash/>
        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center min-h-screen p-6 lg:px-12 bg-gray-50">
          <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>

          {/* Buttons to fetch data */}
          <div className="flex justify-center gap-4 mb-48">
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
            <div className="w-full -mt-36">
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
            <div className="w-full -mt-36">
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