// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// // import axios from 'axios';
// import axiosInstance from './AxiosInstance';

// const Admin = () => {
//   const [tutors, setTutors] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [tutorSearch, setTutorSearch] = useState('');
//   const [studentSearch, setStudentSearch] = useState('');
//   const jwtToken = localStorage.getItem('jwtToken'); // Get the token from localStorage (assuming you store it there)

//   useEffect(() => {
//     // Fetch the data from the provided URL when the component mounts
//     const fetchAdminDashboardData = async () => {
//       try {
//         // Make the API request with the JWT token included in the headers
//         const response = await axiosInstance.get(
//           'https://hrms-repository-gruhabase.onrender.com/tuition-application/admin/getAdminDashBoard',
//           {
//             headers: {
//               Authorization: `Bearer ${jwtToken}`, // Attach the token as Bearer token in the Authorization header
//             },
//           }
//         );

//         const { tutorsData, studentsData } = response.data;

//         // Assuming the response contains both tutor and student data
//         setTutors(tutorsData); // Set tutors data from API response
//         setStudents(studentsData); // Set students data from API response
//       } catch (error) {
//         console.error('Error fetching admin dashboard data:', error);
//       }
//     };

//     fetchAdminDashboardData();
//   }, [jwtToken]); // Dependency on jwtToken to refetch data if the token changes

//   // useEffect(() => {
//   //   const fetchAdminDashboardData = async () => {
//   //     try {
//   //       const response = await axiosInstance.get('/admin/getAdminDashBoard');
//   //       const { tutorsData, studentsData } = response.data;
//   //       setTutors(tutorsData);
//   //       setStudents(studentsData);
//   //     } catch (error) {
//   //       console.error('Error fetching admin dashboard data:', error);
//   //     }
//   //   };
//   //   fetchAdminDashboardData();
//   // }, []);
  
//   const filteredTutors = tutors.filter((tutor) =>
//     tutor.firstName.toLowerCase().includes(tutorSearch.toLowerCase()) ||
//     tutor.subjectsLookingFor.toLowerCase().includes(tutorSearch.toLowerCase())
//   );

//   const filteredStudents = students.filter((student) =>
//     student.firstName.toLowerCase().includes(studentSearch.toLowerCase()) ||
//     student.subjectsLookingFor.toLowerCase().includes(studentSearch.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col items-center mt-48">
//       <div className="border-1 shadow-md hover:bg-slate-500 border-black rounded-lg h-14 w-30 flex mr-[-80%] justify-center p-4 bg-blue-600 text-white">
//         <Link to="/Postsdash">
//           <button className="border-none rounded-xl">Create Post</button>
//         </Link>
//       </div>

//       {/* Tutor Section */}
//       <div className="w-full text-left mb-4 ml-[40%]">
//         <h1 className="text-2xl font-bold">Tutors</h1>
//         <div className="flex items-center mt-2 ml-[10%]">
//           <input
//             type="text"
//             placeholder="Search Tutors"
//             value={tutorSearch}
//             onChange={(e) => setTutorSearch(e.target.value)}
//             className="border border-gray-300 p-2 rounded-lg w-[30%] outline-none"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="border-collapse border-4 border-black w-full text-center">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-black px-4 py-2">Name</th>
//               <th className="border border-black px-4 py-2">Subject</th>
//               <th className="border border-black px-4 py-2">Mode Of Teaching</th>
//               <th className="border border-black px-4 py-2">Location</th>
//               <th className="border border-black px-4 py-2">Available Timings</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTutors.map((tutor, index) => (
//               <tr key={index}>
//                 <td className="border border-black px-4 py-2">{tutor.firstName}</td>
//                 <td className="border border-black px-4 py-2">{tutor.subjectsLookingFor}</td>
//                 <td className="border border-black px-4 py-2">{tutor.modeOfTeaching}</td>
//                 <td className="border border-black px-4 py-2">{tutor.location}</td>
//                 <td className="border border-black px-4 py-2">{tutor.availableTimings}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Student Section */}
//       <div className="w-full text-left mb-4 ml-[40%] mt-[30px]">
//         <h1 className="text-2xl font-bold">Students</h1>
//         <div className="flex items-center mt-2 ml-[10%]">
//           <input
//             type="text"
//             placeholder="Search Students"
//             value={studentSearch}
//             onChange={(e) => setStudentSearch(e.target.value)}
//             className="border border-gray-300 rounded-lg p-2 w-[30%] outline-none"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="border-collapse border-4 border-black w-full text-center">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-black px-4 py-2">Name</th>
//               <th className="border border-black px-4 py-2">Subject</th>
//               <th className="border border-black px-4 py-2">Mode Of Class</th>
//               <th className="border border-black px-4 py-2">Location</th>
//               <th className="border border-black px-4 py-2">Available Timings</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map((student, index) => (
//               <tr key={index}>
//                 <td className="border border-black px-4 py-2">{student.firstName}</td>
//                 <td className="border border-black px-4 py-2">{student.subjectsLookingFor}</td>
//                 <td className="border border-black px-4 py-2">{student.modeOfTeaching}</td>
//                 <td className="border border-black px-4 py-2">{student.location}</td>
//                 <td className="border border-black px-4 py-2">{student.availableTimings}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Admin;
//.....18
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from './AxiosInstance';
import DashHeader from './DashHeader';
import Postsdash from './Postsdash';

const Admin = () => {
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [tutorSearch, setTutorSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Track error messages

  // useEffect(() => {
  //   const fetchAdminDashboardData = async () => {
  //     try {
  //       const jwtToken = localStorage.getItem('jwtToken');
  //       if (!jwtToken) {
  //         throw new Error('Token not available'); // Handle missing token
  //       }

  //       // API request with Authorization header
  //       const response = await axiosInstance.get(
  //         '/tuition-application/admin/getAdminDashBoard',
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //           },
  //           // mode:'cors'
  //         }
  //       );
  //       console.log('token recieved',jwtToken)

  //       // Check if response is valid
  //       if (response && response.data) {
  //         const { tutorsData, studentsData } = response.data;
  //         setTutors(tutorsData || []); // Safeguard in case data is missing
  //         setStudents(studentsData || []); 
  //       } else {
  //         throw new Error('Invalid response format');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching admin dashboard data:', error);
  //       setErrorMessage(error.message || 'Error fetching data');
  //     }
  //   };

  //   fetchAdminDashboardData();
  // }, []);

  // admin.js

useEffect(() => {
  const fetchAdminDashboardData = async () => {
    try {
      // No need to fetch the jwtToken or add headers manually
      const response = await axiosInstance.get('/tuition-application/admin/getAdminPageData');

      // Check if response is valid
      if (response && response.data) {
        const { students,teachers} = response.data;
        setTutors(teachers || []); // Safeguard in case data is missing
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

  // Filter tutors and students based on search input
  const filteredTutors = tutors.filter((tutor) =>
    tutor.firstName.toLowerCase().includes(tutorSearch.toLowerCase()) ||
    tutor.subjectsLookingFor.toLowerCase().includes(tutorSearch.toLowerCase())
  );

  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.subjectsLookingFor.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <>
        <Postsdash/>
    <div className="flex flex-col items-center mt-[-500px] ml-10">
      
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error */}

      {/* Tutor Section */}
      <div className="w-full text-left mb-4 ml-[40%]">
        <h1 className="text-2xl font-bold">Tutors</h1>
        <div className="flex items-center mt-2 ml-[10%]">
          <input
            type="text"
            placeholder="Search Tutors"
            value={tutorSearch}
            onChange={(e) => setTutorSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-[30%] outline-none"
          />
        </div>
      </div>

      {/* Tutors Table */}
      <div className="overflow-x-auto">
        <table className="border-collapse border-4 border-black w-full text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2">Name</th>
              <th className="border border-black px-4 py-2">Subject</th>
              <th className="border border-black px-4 py-2">Mode Of Teaching</th>
              <th className="border border-black px-4 py-2">Location</th>
              <th className="border border-black px-4 py-2">Available Timings</th>
            </tr>
          </thead>
          <tbody>
            {filteredTutors.map((tutor, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{tutor.firstName}</td>
                <td className="border border-black px-4 py-2">{tutor.subjectsLookingFor}</td>
                <td className="border border-black px-4 py-2">{tutor.modeOfTeaching}</td>
                <td className="border border-black px-4 py-2">{tutor.location}</td>
                <td className="border border-black px-4 py-2">{tutor.availableTimings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Section */}
      <div className="w-full text-left mb-4 ml-[40%] mt-[30px]">
        <h1 className="text-2xl font-bold">Students</h1>
        <div className="flex items-center mt-2 ml-[10%]">
          <input
            type="text"
            placeholder="Search Students"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-[30%] outline-none"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="border-collapse border-4 border-black w-full text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-4 py-2">Name</th>
              <th className="border border-black px-4 py-2">Subject</th>
              <th className="border border-black px-4 py-2">Mode Of Class</th>
              <th className="border border-black px-4 py-2">Location</th>
              <th className="border border-black px-4 py-2">Available Timings</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{student.firstName}</td>
                <td className="border border-black px-4 py-2">{student.subjectsLookingFor}</td>
                <td className="border border-black px-4 py-2">{student.modeOfTeaching}</td>
                <td className="border border-black px-4 py-2">{student.location}</td>
                <td className="border border-black px-4 py-2">{student.availableTimings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Admin;
