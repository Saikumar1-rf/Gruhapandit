import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Slide6 from "./Slide6";

const TutorRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    location: "",
    gender: "",
    dob: "",
    highestQualification: "",
    subjectsYouAreExpertAt: "",
    modeOfTeaching: "",
    chargesPerHour: "",
    nationalIdType: "",
    nationalIdNum: "",
    availableTimings: "",
    category: "",
    countryCode: "+1",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [availableTime, setAvailableTime] = useState([]);
  const [isLocationDetected, setIsLocationDetected] = useState(false);

  useEffect(() => {
    const timings = generateTimings();
    setAvailableTime(timings);
    detectLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.trimStart();
    setFormData({ ...formData, [name]: newValue });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.emailId) {
      errors.emailId = "Email ID is required";
    } else if (!emailRegex.test(formData.emailId)) {
      errors.emailId = "Enter a valid Email ID";
    }

    const { phoneNumber } = formData;
    const allSameDigits = /^(\d)\1*$/.test(phoneNumber);
    if (!phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone Number must be exactly 10 digits";
    } else if (phoneNumber.startsWith("0")) {
      errors.phoneNumber = "Phone Number cannot start with 0";
    } else if (allSameDigits) {
      errors.phoneNumber = "Phone Number cannot consist of all the same digits";
    }
    if (!formData.location) errors.location = "Location is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.dob) errors.dob = "Date of Birth is required";
    if (!formData.highestQualification)
      errors.highestQualification = "Qualification is required";
    if (!formData.subjectsYouAreExpertAt)
      errors.subjectsYouAreExpertAt = "Subjects are required";
    if (!formData.modeOfTeaching)
      errors.modeOfTeaching = "Mode of Teaching is required";
    if (!formData.chargesPerHour)
      errors.chargesPerHour = "Charges Per Hour is required";
    if (!formData.nationalIdType)
      errors.nationalIdType = "National Id Type is required";
    if (!formData.nationalIdNum)
      errors.nationalIdNum = "National Id Number is required";
    if (!formData.availableTimings)
      errors.availableTimings = "Available Timings is required";
    if (!formData.category) errors.category = "Category is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "https://hrms-repository-gruhabase.onrender.com/tuition-application/tutor/create",
          formData,
          {
            headers: {
              "Content-Type": "application/json",

            },
          }
        );
        navigate("/create-password");
        console.log("Form submitted successfully:", response.data);
      } catch (error) {
        console.error(
          "Error submitting the form:",
          error.response?.data || error.message
        );
        setErrors({ apiError: "An error occurred while submitting the form." });
      }
    }
  };

  const generateTimings = () => {
    const timings = [];
    const startHour = 0;
    const endHour = 23;
    const interval = 45;

    let hour = startHour;
    let minute = 0;
    while (hour < endHour || (hour === endHour && minute <= 15)) {
      const startTime = formatTime(hour, minute);
      let endHour = hour;
      let endMinute = minute + interval;

      if (endMinute >= 60) {
        endMinute -= 60;
        endHour++;
      }

      if (endHour > 23) break;

      const endTime = formatTime(endHour, endMinute);
      timings.push(`${startTime} to ${endTime} IST`);

      minute += interval;
      if (minute >= 60) {
        minute -= 60;
        hour++;
      }
    }
    return timings;
  };

  const formatTime = (hour, minute) => {
    const amPm = hour < 12 || hour === 24 ? "AM" : "PM";
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute} ${amPm}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
          )
            .then((response) => response.json())
            .then((data) => {
              const { suburb, city, state, country, postcode } = data.address;
              const exactLocation = `${suburb}, ${city}, ${state}, ${country}, ${postcode}`;
              setFormData((prevFormData) => ({
                ...prevFormData,
                location: exactLocation,
              }));
              setIsLocationDetected(true);
            })
            .catch((error) =>
              setErrors((prevErrors) => ({
                ...prevErrors,
                location: "Unable to retrieve location",
              }))
            );
        },
        (error) => {
          console.error("Error detecting location:", error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            location: "Unable to detect location",
          }));
        }
      );
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Geolocation is not supported by this browser",
      }));
    }
  };

  return (
    <div className="flex py-20 justify-center items-center min-h-screen bg-gray-100 mt-2 bg-gradient-to-r from-gray-200 to-blue-300">
      <div className="w-[650px] mx-auto p-4 mt-9">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl border border-gray-400 p-8 bg-transparent bg-gradient-to-r from-gray-200 to-blue-300 shadow-md rounded-lg"
        >
          <div>
            <p>
              <strong className="text-red-500 text-shadow-default">
                Note:{" "}
              </strong>
              <a
                className="text-blue-600 text-shadow-default hover:underline cursor-pointer"
                onClick={handleOpenModal}
              >
                Terms and Conditions
              </a>
            </p>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 text-shadow-default mb-10 mt-5">
            Tutor Registration
          </h2>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                minLength={4}
                maxLength={20}
                className="w-full px-3 mt-2 bg-transparent border-gray-400 py-2 border rounded"
              />
              {errors.firstName && (
                <p className="text-red-400 text-base mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                minLength={4}
                maxLength={20}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.lastName && (
                <p className="text-red-400 text-base mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Email ID
              </label>
              <input
                type="email"
                name="emailId"
                placeholder="Enter Email ID"
                value={formData.emailId}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.emailId && (
                <p className="text-red-400 text-base mt-1">{errors.emailId}</p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={10}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.phoneNumber && (
                <p className="text-red-400 text-base mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.location && (
                <p className="text-red-400 text-base mt-1">{errors.location}</p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-400 text-base mt-1">{errors.gender}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.dob && (
                <p className="text-red-400 text-base mt-1">{errors.dob}</p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Highest Qualification
              </label>
              <input
                type="text"
                name="highestQualification"
                placeholder="Enter Qualification"
                value={formData.highestQualification}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.highestQualification && (
                <p className="text-red-400 text-base mt-1">
                  {errors.highestQualification}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Subjects You Are Expert At
              </label>
              <input
                type="text"
                name="subjectsYouAreExpertAt"
                placeholder="Enter Subjects"
                value={formData.subjectsYouAreExpertAt}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.subjectsYouAreExpertAt && (
                <p className="text-red-400 text-base mt-1">
                  {errors.subjectsYouAreExpertAt}
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Mode of Teaching
              </label>
              <input
                type="text"
                name="modeOfTeaching"
                placeholder="Enter Mode of Teaching"
                value={formData.modeOfTeaching}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.modeOfTeaching && (
                <p className="text-red-400 text-base mt-1">
                  {errors.modeOfTeaching}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Charges Per Hour
              </label>
              <input
                type="text"
                name="chargesPerHour"
                placeholder="Enter Charges"
                value={formData.chargesPerHour}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.chargesPerHour && (
                <p className="text-red-400 text-base mt-1">
                  {errors.chargesPerHour}
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                National ID Type
              </label>
              <input
                type="text"
                name="nationalIdType"
                placeholder="Enter National ID Type"
                value={formData.nationalIdType}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.nationalIdType && (
                <p className="text-red-400 text-base mt-1">
                  {errors.nationalIdType}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                National ID Number
              </label>
              <input
                type="text"
                name="nationalIdNum"
                placeholder="Enter National ID Number"
                value={formData.nationalIdNum}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.nationalIdNum && (
                <p className="text-red-400 text-base mt-1">
                  {errors.nationalIdNum}
                </p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Available Timings
              </label>
              <select
                name="availableTimings"
                value={formData.availableTimings}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              >
                <option value="">Select Timing</option>
                {availableTime.map((timing, index) => (
                  <option key={index} value={timing}>
                    {timing}
                  </option>
                ))}
              </select>
              {errors.availableTimings && (
                <p className="text-red-400 text-base mt-1">
                  {errors.availableTimings}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4 ">
            <div className="w-full sm:w-1/2 px-2 ">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="Enter Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.category && (
                <p className="text-red-400 text-base mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full px-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white shadow-lg rounded-lg max-w-4xl w-full mx-auto h-[90vh] overflow-y-auto p-8">
              <button
                className="absolute top-3 right-3 text-red-700 font-bold hover:text-red-500 "
                onClick={handleCloseModal}
              >
                X
              </button>
              <Slide6 />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorRegister;
