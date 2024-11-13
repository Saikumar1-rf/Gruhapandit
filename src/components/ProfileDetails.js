import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ProfileDetails = ({ userData, userType, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({ ...userData });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const popupRef = useRef(null);

  useEffect(() => {
    setEditableData({ ...userData });
  }, [userData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleEditToggle = async () => {
    if (isEditing) {
      const validationErrors = validateFields();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // Stop if there are validation errors
      }
      const success = await saveChanges();
      if (success) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Trim the input value to remove leading and trailing spaces
    setEditableData((prevData) => ({ ...prevData, [name]: value.trimStart() }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!editableData.firstName) {
      newErrors.firstName = "First name is required.";
    } else if (editableData.firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters.";
    } else if (editableData.firstName.length > 20) {
      newErrors.firstName = "First name must be at most 20 characters.";
    }
  
    // Last Name Validation
    if (!editableData.lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (editableData.lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters.";
    } else if (editableData.lastName.length > 20) {
      newErrors.lastName = "Last name must be at most 20 characters.";
    }
  
    // Email ID Validation
    if (!editableData.emailId) {
      newErrors.emailId = "Email ID is required.";
    } else if (editableData.emailId.length > 45) {
      newErrors.emailId = "Email ID must be at most 45 characters.";
    }
    if (!editableData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (editableData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    } else if (/^(.)\1{9}$/.test(editableData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number cannot be all the same digits.";
    }
    if (!editableData.location) newErrors.location = "Location is required.";
    if (!editableData.gender) newErrors.gender = "Gender is required.";
    if (!editableData.dob) newErrors.dob = "Date of birth is required.";
    if (!editableData.countryCode)
      newErrors.countryCode = "Country code is required.";

    // Additional validation for students
    if (userType === "student") {
      if (!editableData.studentClass)
        newErrors.studentClass = "Student class is required.";
      if (!editableData.board) newErrors.board = "Board is required.";
      if (!editableData.institution)
        newErrors.institution = "Institution is required.";
      if (!editableData.subjectsLookingFor)
        newErrors.subjectsLookingFor = "Subjects looking for is required.";
      if (!editableData.modeOfTeaching)
        newErrors.modeOfTeaching = "Mode of teaching is required.";
      if (!editableData.availableTimings)
        newErrors.availableTimings = "Available timings are required.";
      if (!editableData.affordablity)
        newErrors.affordablity = "Affordability is required.";
    }

    // Additional validation for tutors
    if (userType === "tutor") {
      if (!editableData.highestQualification)
        newErrors.highestQualification = "Highest qualification is required.";
      if (!editableData.category) newErrors.category = "Category is required.";
      if (!editableData.subjectsYouAreExpertAt)
        newErrors.subjectsYouAreExpertAt =
          "Subjects you are expert at are required.";
      if (!editableData.chargesPerHour)
        newErrors.chargesPerHour = "Charges per hour are required.";
      if (!editableData.nationalIdType)
        newErrors.nationalIdType = "National ID type is required.";
      if (!editableData.nationalIdNum)
        newErrors.nationalIdNum = "National ID number is required.";
    }

    return newErrors;
  };

  const renderField = (label, name) => (
    <div key={name} className="flex flex-col mb-4">
      <label className="text-lg font-bold text-gray-700 mb-1">{label}:</label>
      {isEditing ? (
        <>
          <input
            type={name === "dob" ? "date" : "text"}
            name={name}
            value={editableData[name] || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 h-10 w-full focus:outline-none focus:border-cyan-600"
          />
          {errors[name] && (
            <span className="text-red-500 text-sm">{errors[name]}</span>
          )}
        </>
      ) : (
        <span className="text-gray-800">{userData[name] || "N/A"}</span>
      )}
    </div>
  );

  const commonFields = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Email ID", name: "emailId" },
    { label: "Phone Number", name: "phoneNumber" },
    { label: "Location", name: "location" },
    { label: "Gender", name: "gender" },
    { label: "Date of Birth", name: "dob" },
    { label: "Country Code", name: "countryCode" },
  ];

  const studentFields = [
    { label: "Student Class", name: "studentClass" },
    { label: "Board", name: "board" },
    { label: "Institution", name: "institution" },
    { label: "Subjects Looking For", name: "subjectsLookingFor" },
    { label: "Mode of Teaching", name: "modeOfTeaching" },
    { label: "Available Timings", name: "availableTimings" },
    { label: "Affordability", name: "affordablity" },
  ];

  const tutorFields = [
    { label: "Highest Qualification", name: "highestQualification" },
    { label: "Category", name: "category" },
    { label: "Subjects You Are Expert At", name: "subjectsYouAreExpertAt" },
    { label: "Mode of Teaching", name: "modeOfTeaching" },
    { label: "Charges Per Hour", name: "chargesPerHour" },
    { label: "Available Timings", name: "availableTimings" },
    { label: "National ID Type", name: "nationalIdType" },
    { label: "National ID Number", name: "nationalIdNum" },
  ];

  const fieldsToRender = userType === "student" ? studentFields : tutorFields;
  const leftFields = [
    ...commonFields.slice(0, 4),
    ...fieldsToRender.slice(0, 4),
  ];
  const rightFields = [...commonFields.slice(4), ...fieldsToRender.slice(4)];

  const saveChanges = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      return false;
    }

    const url =
      userType === "student"
        ? "https://tution-application.onrender.com/tuition-application/student/update"
        : "https://tution-application.onrender.com/tuition-application/tutor/update";

    try {
      const response = await axios.patch(url, editableData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Profile updated successfully:", response.data);
      onUpdate(editableData);

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);

      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "An error occurred"}`);
      } else {
        alert("Network error. Please try again.");
      }
      return false;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={popupRef}
        className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {userType.charAt(0).toUpperCase() + userType.slice(1)} Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {leftFields.map((field) => renderField(field.label, field.name))}
          </div>
          <div className="space-y-4">
            {rightFields.map((field) => renderField(field.label, field.name))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            {isEditing ? "Save Changes" : "Edit"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-4 hover:bg-gray-400 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
        {showSuccessPopup && (
          <div className="mt-4 text-green-500 text-center">
            Profile updated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
