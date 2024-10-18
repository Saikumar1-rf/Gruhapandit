import React, { useState } from "react";
import axiosInstance from "./AxiosInstance";

function Allposts() {
  const [tutorData, setTutorData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle fetching tutor data
  const fetchTutorData = async () => {
    try {
      const response = await axiosInstance.get(
        "https://hrms-repository-gruhabase.onrender.com/tuition-application/tutorAdvertisement/"
      );
      setTutorData(response.data); // Set the tutor data received from the API
      setStudentData(null); // Clear student data
      setError(null); // Reset any previous errors
    } catch (err) {
      setError("Error fetching tutor data.");
    }
  };

  // Function to handle fetching student data
  const fetchStudentData = async () => {
    try {
      const response = await axiosInstance.get(
        "https://hrms-repository-gruhabase.onrender.com/tuition-application/studentAdvertisement/"
      );
      setStudentData(response.data); // Set the student data received from the API
      setTutorData(null); // Clear tutor data
      setError(null); // Reset any previous errors
    } catch (err) {
      setError("Error fetching student data.");
    }
  };

  return (
    <div className="container mx-auto mt-[150px] p-6">
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
      <div className="text-center">
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Display tutor data if available */}
      {tutorData && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tutor Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorData.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-2">{tutor.firstName}</h3>
                <p>
                  <strong>Subject:</strong> {tutor.subjectsYouAreExpertAt}
                </p>
                <p>
                  <strong>Mode of Teaching:</strong> {tutor.modeOfTeaching}
                </p>
                <p>
                  <strong>Available Timings:</strong> {tutor.availableTimings}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display student data if available */}
      {studentData && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Student Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentData.map((student) => (
              <div
                key={student.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-2">{student.firstName}</h3>
                <p>
                  <strong>Subject Looking For:</strong> {student.subjectsLookingFor}
                </p>
                <p>
                  <strong>Mode of Teaching:</strong> {student.modeOfTeaching}
                </p>
                <p>
                  <strong>Available Timings:</strong> {student.availableTimings}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Allposts;
