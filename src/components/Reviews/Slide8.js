import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import axiosInstance from '../AxiosInstance';


const Slide8 = () => {
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [userType, setUserType] = useState(null); // State for user type
  const navigate = useNavigate();

  const BackButton = () => {
    navigate("/posts");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the API
        const response = await axiosInstance.get(`/tuition-application/reviews/get`);
        setReviews(response.data);

        const loggedInUserType = localStorage.getItem('userType');
        setUserType(loggedInUserType);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to render stars
  const renderStars = (rating) => {
    const fullStar = "⭐"; // Replace with an icon if needed
    const emptyStar = "☆";
    const maxStars = 5;

    return (
      <span>
        {Array.from({ length: maxStars }, (_, index) =>
          index < rating ? fullStar : emptyStar
        ).join('')}
      </span>
    );
  };

  // Loading state
  if (!reviews.length || !userType) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Back Button */}
      <button
        onClick={BackButton}
        className="mb-4 p-3 bg-black text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2"
      >
        <ArrowLeftIcon className="h-5 w-5" /> {/* Icon size 5x5 */}
        <span>Back</span> {/* Text next to the icon */}
      </button>

      <h2 className="text-2xl font-semibold mb-6">Feedback</h2>

      <div className="flex flex-wrap gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col w-full md:w-[48%] lg:w-[48%] p-4 border border-gray-300 rounded-md space-y-4"
          >
            <div>
              <p>
                <strong>Reviewer Name:</strong> {review.reviewerName || 'Add'}
              </p>
            </div>
            <div>
              <p>
                <strong>Reviewer Mail ID:</strong> {review.reviewerMailId || 'Add'}
              </p>
            </div>
            <div>
              <p>
                <strong>Reviewed To (Tutor):</strong> {review.reviewToName || 'Add'}
              </p>
            </div>
            <div>
              <p>
                <strong>Subject:</strong> {review.subject || 'Add'}
              </p>
            </div>
            <div>
              <p>
                <strong>Comment:</strong> {review.comment || 'Add'}
              </p>
            </div>
            <div>
              <p>
                <strong>Rating:</strong> {review.rating !== undefined ? renderStars(review.rating) : 'Add'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide8;



// import React, { useState } from 'react'

// const Slide8 = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//   });

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Corrected: added parentheses to prevent default behavior
//     console.log("Form data submitted:", formData);

//     // Reset form data
//     setFormData({
//       name: '',
//       dob: '',
//     });
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value, // Dynamically update the state based on the input name
//     }));
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="dob">Date of Birth:</label>
//           <input
//             type="date"
//             id="dob"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Slide8;


// import React, { useEffect, useState } from 'react';
// import axiosInstance from './AxiosInstance';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeftIcon } from '@heroicons/react/solid';

// const Slide8 = () => {
//   const [reviews, setReviews] = useState([]); // State for storing reviews
//   const [userType, setUserType] = useState(null); // State for user type
//   const navigate = useNavigate();

//   const BackButton = () => {
//     navigate("/posts");
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetching data from the API
//         const response = await axiosInstance.get(
//           `/tuition-application/reviews/get`
//         );
//         setReviews(response.data);

        
//         const loggedInUserType = localStorage.getItem('userType');
//         setUserType(loggedInUserType);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Loading state
//   if (!reviews.length || !userType) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
//       <button
//         onClick={BackButton}
//         className="mb-4 p-3 bg-black text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2"
//       >
//         <ArrowLeftIcon className="h-5 w-5" /> {/* Icon size 5x5 */}
//         <span>Back</span> {/* Text next to the icon */}
//       </button>
//       <h2 className="text-2xl font-semibold mb-6">Feedback</h2>

//       {reviews.map((review) => (
//         <div
//           key={review.id}
//           className="flex flex-col mb-4 p-4 border-b border-gray-300 last:border-none space-y-4"
//         >
//           <div>
//             <p>
//               <strong>Reviewer Name:</strong> {review.reviewerName || 'Add'}
//             </p>
//           </div>
//           <div>
//             <p>
//               <strong>Reviewer Mail ID:</strong> {review.reviewerMailId || 'Add'}
//             </p>
//           </div>
//           <div>
//             <p>
//               <strong>Reviewed To (Tutor):</strong> {review.reviewToName || 'Add'}
//             </p>
//           </div>
//           <div>
//             <p>
//               <strong>Subject:</strong> {review.subject || 'Add'}
//             </p>
//           </div>
//           <div>
//             <p>
//               <strong>Comment:</strong> {review.comment || 'Add'}
//             </p>
//           </div>
//           <div>
//             <p>
//               <strong>Rating:</strong> {review.rating !== undefined ? review.rating : 'Add'}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Slide8;
