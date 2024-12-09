import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { countries } from "./Countries";
import Select from "react-select";
import axiosInstance from "./AxiosInstance";


const ProfileDetails = ({ userData, userType, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({ ...userData });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const popupRef = useRef(null);
  const [formData,setFormData]=useState()
  
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: `+${country.phone} ${country.label}`, // Corrected template literal
    country,
  }));
  
  const [selectedCountry, setSelectedCountry] = useState("");
  const [personInfo, setPersonInfo] = useState({
    phone: "",
  });
  
  const validateStartDigits = (value, country) => {
    if (!country || !country.validStartDigits.length) {
      return true; // No restrictions on starting digits for this country
    }
    return country.validStartDigits.some((digit) => value.startsWith(digit));
  };

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
      setEditableData((prevData)=>({ ...prevData, countryCode: editableData.countryCode || "" }));
    }
  };

  // Fetch National ID file on mount or user change
  useEffect(() => {
    const fetchNationalIdFile = async () => {
      const userId = localStorage.getItem("userId"); // Getting userId from localStorage
      const category = "NATIONAL_ID" // Assuming userType can be used as category
      try {
        const response = await axiosInstance.get(
          `/tuition-application/documents/get-files-list?userId=${userId}&category=${category}`
        );
        const file = response.data[0]; // Assuming the response is an array with the file info
        setNationalIdFile(file); // Set the file info in the state
      } catch (error) {
        console.error("Error fetching National ID file:", error);
      }
    };
  
    fetchNationalIdFile();
  }, [userData, userType]);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Trim the input value to remove leading and trailing spaces
    setEditableData((prevData) => ({ ...prevData, [name]: value.trimStart() }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharCardPattern = /^\d{12}$/;

    if (editableData.nationalIdType === "PAN" && !panCardPattern.test(editableData.nationalIdNum)) {
      newErrors.nationalIdNum = "Invalid PAN card number.";
    }
    // Aadhar Card Validation
    if (editableData.nationalIdType === "Aadhar" && !aadharCardPattern.test(editableData.nationalIdNum)) {
      newErrors.nationalIdNum = "Invalid Aadhar card number.";
    }

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
    } else if (editableData.emailId.length > 40) {
      newErrors.emailId = "Email ID must be at most 40 characters.";
    }
    if (!editableData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (editableData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    } else if (/^(.)\1{9}$/.test(editableData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number cannot be all the same digits.";
    } else if (!validateStartDigits(editableData.phoneNumber, editableData.country)) {
      newErrors.phoneNumber = "Phone number starts with invalid digits.";
    }

    if (!editableData.dob) {
      newErrors.dob = "Date of birth is required.";
    } else if (editableData.dob.length < 2) {
      newErrors.dob = "Date of birth must be at least 2 characters.";
    } else if (editableData.dob.length > 100) {
      newErrors.dob = "Date of birth must be at most 100 characters.";
    }

    if (!editableData.location) newErrors.location = "Location is required.";
    if (!editableData.gender) newErrors.gender = "Gender is required.";
    if (!editableData.dob) newErrors.dob = "Date of birth is required.";
    if (!editableData.countryCode)
      newErrors.countryCode = "Country code is required.";

    // Additional validation for students
    if (userType === "student") {
      if (!editableData.studentClass) {
        newErrors.studentClass = "Student class is required.";
      } else if (!/^(?:[1-9]|1[0-2]|[A-Za-z]+)$/.test(editableData.studentClass)) {
        newErrors.studentClass = "Student class must be 1-12 or alphabetic characters.";
      }
      
      if (!editableData.board) {
        newErrors.board = "Board is required.";
      } else if (!/^[A-Za-z\s]+$/.test(editableData.board)) {
        newErrors.board = "Board must contain only alphabetic characters.";
      }

      if (!editableData.institution) {
        newErrors.institution = "Institution is required.";
      } else if (!/^[A-Za-z\s]+$/.test(editableData.institution)) {
        newErrors.institution = "Institution must contain only alphabetic characters.";
      }
  
      if (!editableData.subjectsLookingFor)
        newErrors.subjectsLookingFor = "Subjects looking for is required.";
      if (!editableData.modeOfTeaching)
        newErrors.modeOfTeaching = "Mode of teaching is required.";
      if (!editableData.availableTimings)
        newErrors.availableTimings = "Available timings are required.";
    
      if (!editableData.affordablity) {
        newErrors.affordablity = "Affordability is required.";
      } else if (!/^\d+$/.test(editableData.affordablity)) {
        newErrors.affordablity = "Affordability must be a numeric value.";
      }
    }

    // Additional validation for tutors
    if (userType === "tutor") {
      if (!editableData.highestQualification) {
        newErrors.highestQualification = "Highest qualification is required.";
      } else if (!/^(?:[A-Za-z]+|[1-9]|[12][0-9]|30)$/.test(editableData.highestQualification)) {
        newErrors.highestQualification = "Highest qualification must be alphabetic or a number from 1 to 30.";
      }

      if (!editableData.category) newErrors.category = "Category is required.";
      if (!editableData.subjectsYouAreExpertAt)
        newErrors.subjectsYouAreExpertAt =
          "Subjects you are expert at are required.";
      if (!editableData.chargesPerHour) {
      newErrors.chargesPerHour = "Charges per hour are required.";
    } else if (!/^\d+(\.\d+)?$/.test(editableData.chargesPerHour)) {
      newErrors.chargesPerHour = "Charges per hour must be a numeric value.";
    }

      if (!editableData.nationalIdType)
        newErrors.nationalIdType = "National ID type is required.";
      if (!editableData.nationalIdNum)
        newErrors.nationalIdNum = "National ID number is required.";
    }
    return newErrors;
  };

  const renderField = (label, name,isEditable=true) => (
    <div key={name} className="flex flex-col mb-4">
      <label className="text-lg font-bold text-gray-700 mb-1">{label}:</label>
      {isEditing ? (
        <>
         {name === "modeOfTeaching" ? (
            <select
              name={name}
              value={editableData[name] || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 h-10 w-full focus:outline-none focus:border-cyan-600"
            >
              <option value="studentmode">Student Mode</option>
              <option value="onlinemode">Online Mode</option>
              <option value="virtualmode">Virtual Mode</option>
            </select>
         ):name === "countryCode" ? (
          <>
          <Select
            name="countryCode"
            id="mobileNumber"
            options={countryOptions}
            onChange={(selectedOption) => {
              setSelectedCountry(selectedOption.country);
              setPersonInfo({
                ...personInfo,
                countryCode: `+${selectedOption.country.phone}`,
              });
              setFormData({
                ...formData,
                countryCode: `+${selectedOption.country.phone}`,
              });
            }}
            value={
              selectedCountry
                ? {
                    value: selectedCountry.code,
                    label: `+${selectedCountry.phone} ${selectedCountry.label}`,
                  }
                : null
            }
            isSearchable
            styles={{
              menu: (provided) => ({
                ...provided,
                minWidth: "150px",
              }),
              control: (provided) => ({
                ...provided,
                minWidth: "60px",
                height: "40px",
                backgroundColor: "transparent",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                display: "none",
              }),
              indicatorSeparator: () => null,
            }}
            className="border border-gray-500 rounded-l-md outline-none mr-0"
          />
          {errors.countryCode && (
            <span className="text-red-500 text-sm">{errors.countryCode}</span>
          )}
          </>
        ) : name === "availableTimings" ? (
          <div className="w-full">
            <select
              name="availableTimings"
              value={editableData.availableTimings || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2 h-10 focus:outline-none focus:border-cyan-600"
            >
              <option value="">Select Timing</option>
              {availableTimings.map((timing, index) => (
                <option key={index} value={timing}>
                  {timing}
                </option>
              ))}
            </select>
            {errors.availableTimings && (
              <p className="text-red-500 text-sm">
                {errors.availableTimings}
              </p>
            )}
          </div>
        ) : (
          <input
            type={name === "dob" ? "date" : "text"}
            name={name}
            value={editableData[name] || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 h-10 w-full focus:outline-none focus:border-cyan-600"
            readOnly={name === "firstName" || name === "lastName" || name === "emailId" || name === "nationalIdNum"}
          />
         )}
          {errors[name] && (
            <span className="text-red-500 text-sm">{errors[name]}</span>
          )}
        </>
      ) : (
        <span className="text-gray-800">{userData[name] || "N/A"}</span>
      )}
    </div>
  );

  const [availableTimings, setTimings] = useState([]);

  const [nationalIdFile, setNationalIdFile] = useState(null);


  const renderNationalIdFile = () => {
    if (nationalIdFile) {
      const fileName = nationalIdFile.fileName || "National_ID_File.pdf"; // Fallback file name if not provided
      return (
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold text-gray-700 mb-1">National ID File:</label>
          <a
            href={nationalIdFile.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {fileName}
          </a>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col mb-4">
          <label className="text-lg font-bold text-gray-700 mb-1">National ID File:</label>
          <span className="text-gray-800">No file available</span>
        </div>
      );
    }
  };
  
  const generateTimings = () => {
    const timings = [];
    const startHour = 0; // 00:00 (12 AM in 24-hour format)
    const endHour = 23; // 23:00 (11 PM in 24-hour format)
    const interval = 45; // 45 minutes

    let hour = startHour;
    let minute = 0;

    while (hour < endHour || (hour === endHour && minute === 15)) {
      const startTime = formatTime(hour, minute);

      // Increment time by 45 minutes to get the end time of the slot
      let endHour = hour;
      let endMinute = minute + interval;

      if (endMinute >= 60) {
        endMinute -= 60;
        endHour++;
      }

      const endTime = formatTime(endHour, endMinute);
      timings.push(`${startTime} to ${endTime} IST`);

      // Update the current time for the next slot
      minute += interval;
      if (minute >= 60) {
        minute -= 60; // Reset minutes and increment hour
        hour++;
      }
    }

    return timings;
  };
  const formatTime = (hour, minute) => {
    const amPm = hour < 12 || hour === 24 ? "AM" : "PM"; // Handle AM/PM correctly
    const formattedHour = hour % 12 || 12; // Convert 0 and 24 hour to 12 for display
    const formattedMinute = minute < 10 ? `0${minute}` : minute; // Add leading zero for minutes
    return `${formattedHour}:${formattedMinute} ${amPm}`; // Return in HH:mm AM/PM format
  };

  useEffect(() => {
    const availableTimings = generateTimings();
    setTimings(availableTimings);
    // console.log(availableTimings); // To log the available timings in IST format
  }, []);

 
  const commonFields = [
    { label: "First Name", name: "firstName", editable: false },
    { label: "Last Name", name: "lastName", editable: false },
    { label: "Email ID", name: "emailId",editable: false },
    { label: "Phone Number", name: "phoneNumber",  },
    { label: "Location", name: "location" },
    { label: "Gender", name: "gender" },
    { label: "Date of Birth", name: "dob", editable: !isEditing },
    { label: "Country Code", name: "countryCode" },
    { label: "Category", name: "category" },
    
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
    { label: "Subjects You Are Expert At", name: "subjectsYouAreExpertAt" },
    { label: "Mode of Teaching", name: "modeOfTeaching" },
    { label: "Charges Per Hour", name: "chargesPerHour" },
    { label: "Available Timings", name: "availableTimings" },
    { label: "National ID Type", name: "nationalIdType" },
    { label: "National ID Number", name: "nationalIdNum" },
    // { label :"National ID File",name:"nationalIdFile"},
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
      // ? "https://tution-application.onrender.com/tuition-application/student/update"
      // : "https://tution-application.onrender.com/tuition-application/tutor/update"
        ? "https://hrms-repository-gruhabase.onrender.com/tuition-application/student/update"
        : "https://hrms-repository-gruhabase.onrender.com/tuition-application/tutor/update";
    
    try {
      const response = await axios.patch(url, editableData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // console.log("Profile updated successfully:", response.data);
      onUpdate(editableData);

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);

      return true;
    } catch (error) {
     if(error.response){
      if(error.response.status === 400){
        const errorMessage = error.response.data.split(":")[1]
        setErrors({
          phoneNumber:errorMessage.includes("phone number") && errorMessage,
          dob:errorMessage.includes("Date of birth") && errorMessage,
          nationalIdNum: errorMessage.includes("NationalId") && errorMessage,
        })
      }
     }
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
            {userType ===  "tutor" && renderNationalIdFile()}
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