import React, { useState } from "react";
import axiosInstance from "./AxiosInstance";

const DialogueBox = ({ onClose, onSubmit, category,userId,outevent}) => {
  const [formData, setFormData] = useState({
    input2: "", // Represents the file name
    file: null, // Represents the uploaded file
    name: "",
    subject:"",
    description:"",
  });

  // const userType = "admin"; 
  const userType= localStorage.getItem('userType')

  

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
  
    const userType = localStorage.getItem("userType") || "tutor"; // Default to "tutor" if not set
  
    // Validate input fields
    if (!formData.input2 || !formData.file) {
      alert("Please fill in all fields and upload a file.");
      return;
    }

     // Name validation to ensure it only contains alphabets and spaces
     if (userType === "admin" && !/^[A-Za-z\s]+$/.test(formData.name)) {
      alert("Name can only contain alphabets and spaces.");
      return;
    }

    // Description validation to ensure it only contains alphabets and spaces
    if (userType === "admin" && !/^[A-Za-z\s]+$/.test(formData.description)) {
      alert("Description can only contain alphabets and spaces.");
      return;
    }

    if (userType === "admin") {
      if (!formData.name || !formData.subject || !formData.description) {
        alert("Please fill in all fields (name, subject, and description).");
        return;
      }
    }
  
    const authToken = localStorage.getItem("jwtToken"); // Adjust the key name based on how you store it
    if (!authToken) {
      alert("Authentication token is missing. Please log in.");
      return;
    }
  
    let url = "";
  
    if (userType === "tutor") {
      url = `/tuition-application/documents/upload?userId=${userId}&fileName=${encodeURIComponent(
        formData.input2
      )}&category=${category}`;
    } else if (userType === "admin") {
      url = `/tuition-application/documents/upload-gallery?userId=${userId}&fileName=${encodeURIComponent(
        formData.input2
      )}&category=${category}&name=${encodeURIComponent(
        formData.name
      )}&subject=${encodeURIComponent(formData.subject)}&description=${encodeURIComponent(
        formData.description
      )}`;
    } else {
      console.error("Invalid user type provided.");
      return;
    }
  
    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file);
  
    try {
      // Make POST request using Axios
      const response = await axiosInstance.post(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.status === 200) {
        // Handle successful upload
        alert("File uploaded successfully!");
        console.log("Form Data:", formData); 
        outevent(response.data);
        onSubmit({ ...formData, category, userId });

          // Clear the form fields
      setFormData({
        input2: "",
        file: null,
        name: "",
        subject: "",
        description: "",
      });
        // Close the form after a slight delay
        setTimeout(() => {
          onClose();
        }, 100);
      } else {
        console.error("Invalid user type provided");
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("File upload error:", error);
      // alert("File upload error. Please check your input or try again.");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Upload Details</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
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
  
        {userType === "admin" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter subject"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter description"
              />
            </div>
          </>
        )}

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