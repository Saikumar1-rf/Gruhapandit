import React, { useState } from "react";
import axiosInstance from "./AxiosInstance";
// import axiosInstance from "../AxiosInstance";

const DialogueBox = ({ onClose, onSubmit, category,userId,outevent}) => {
  const [formData, setFormData] = useState({
    input2: "", // Represents the file name
    file: null, // Represents the uploaded file
  });

  


  // Handle input text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!formData.input2 || !formData.file) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

    // Prepare URL
    const url = `https://tution-application.onrender.com/tuition-application/documents/upload?userId=${userId}&fileName=${encodeURIComponent(formData.input2)}&category=${category}`
    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file);

    try {
      // Make POST request using Axios
      const response = await axiosInstance.post( url,formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
      
        outevent(response.data)        
        onSubmit({ ...formData, category, userId });
        // onClose();
        setTimeout(() => {
          onClose();
      }, 100);  
      } else {
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
        
    
      console.error("File upload error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* {/ Header Section /} */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Upload Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* {/ Form Section /} */}
        <form onSubmit={handleSubmit}>
          {/* {/ Category (Read-only) /} */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category} 
              readOnly
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              UserId:
            </label>
            <input
              type="email"
              id="userId"
              name="userId"
              value={userId} 
              readOnly
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
            />
          </div>
          {/* {/ File Name Input /} */}
          <div className="mb-4">
            <label
              htmlFor="input2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              File Name:
            </label>
            <input
              type="text"
              id="input2"
              name="input2"
              value={formData.input2}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter file name"
              required
            />
          </div>

          {/* {/ File Upload /} */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload File:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="block w-full text-gray-700"
              required
            />
          </div>

          {/* {/ Submit Button /} */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DialogueBox;
