import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../AxiosInstance";


const Review = ({ userType, onClose }) => {
  const [name, setName] = useState("");
  const [tutorName, setTutorName] = useState(""); // Tutor name or student name
  const [subject, setSubject] = useState("");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const newErrors = {};
  
    // Validate inputs
    if (!name) newErrors.name = "Name is required";
    if (!subject) newErrors.subject = "Subject is required";
    if (!comments) newErrors.comments = "Comments are required";
    if (rating === 0) newErrors.rating = "Rating is required";
  
    if (userType === "student" && !tutorName) {
      newErrors.tutorName = "Tutor Name is required";
    }
    if (userType === "tutor" && !tutorName) {
      newErrors.tutorName = "Student Name is required";
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      return; // Stop if there are validation errors
    }
  
    const reviewData = {
      reviewerName: name,
      reviewToName: tutorName,
      subject,
      comment: comments,
      rating,
      type: userType,
    };
  
    try {
      const response = await axiosInstance.post('/tuition-application/reviews/create', reviewData);
      if (response.status === 200 || response.status === 201) {
        console.log('Review submitted successfully!', response.data);
        onClose(); // Close modal after successful submission
      } else {
        console.error('Failed to submit review:', response.data);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error.response || error.message);
      alert('Something went wrong. Please try again.');
    }
  };
  

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-background")) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 modal-background"
      onClick={handleClickOutside}
    >
      <div className="relative bg-white shadow-lg rounded-lg max-w-lg w-full mx-auto p-6 sm:p-8 md:p-10 lg:p-12">
        <button
          className="absolute top-3 right-3 text-red-700 font-bold hover:text-red-500"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl sm:text-xl md:text-2xl font-semibold text-center mb-4">
          {userType === "student" ? "Rate Your Tutor" : "Rate Your Student"}
        </h2>
        <div className="space-y-6 overflow-y-auto max-h-[80vh]">
          <div>
            <h3 className="text-lg sm:text-base font-semibold">
              Name <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              className={`border px-4 py-2 rounded-md w-full ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {userType === "student" && (
            <div>
              <h3 className="text-lg sm:text-base font-semibold">
                Tutor Name <span className="text-red-500">*</span>
              </h3>
              <input
                type="text"
                className={`border px-4 py-2 rounded-md w-full ${errors.tutorName ? 'border-red-500' : ''}`}
                placeholder="Tutor Name"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
              />
              {errors.tutorName && <p className="text-red-500 text-sm">{errors.tutorName}</p>}
            </div>
          )}

          {userType === "tutor" && (
            <div>
              <h3 className="text-lg sm:text-base font-semibold">
                Student Name <span className="text-red-500">*</span>
              </h3>
              <input
                type="text"
                className={`border px-4 py-2 rounded-md w-full ${errors.tutorName ? 'border-red-500' : ''}`}
                placeholder="Student Name"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
              />
              {errors.tutorName && <p className="text-red-500 text-sm">{errors.tutorName}</p>}
            </div>
          )}

          <div>
            <h3 className="text-lg sm:text-base font-semibold">
              Subject <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              className={`border px-4 py-2 rounded-md w-full ${errors.subject ? 'border-red-500' : ''}`}
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>

          <div>
            <h3 className="text-lg sm:text-base font-semibold">
              Your Comments <span className="text-red-500">*</span>
            </h3>
            <textarea
              className={`border px-4 py-2 rounded-md w-full ${errors.comments ? 'border-red-500' : ''}`}
              rows="4"
              placeholder="Your Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
            {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm sm:text-xs font-semibold">
              Rating <span className="text-red-500">*</span>:
            </label>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`w-6 h-6 cursor-pointer ${index < rating ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}

          <div className="text-center mt-4">
            <button
              onClick={handleSubmit}
              className="bg-cyan-700 text-white px-6 py-2 rounded-md hover:bg-cyan-800 transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review;

 