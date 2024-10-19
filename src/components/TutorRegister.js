import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpAsTutor = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "", // Changed from email
    phoneNumber: "", // Changed from mobileNumber
    location: "",
    gender: "",
    dob: "", // Changed from dateOfBirth
    highestQualification: "", // Changed from qualification
    subjectsYouAreExpertAt: "", // Changed from subjects
    modeOfTeaching: "",
    chargesPerHour: 0, // chargesPerHour is expected as a number
    nationalIdType: "",
    nationalIdNum: "",
    availableTimings: "", // Changed from availableTimeSlots
    category: "",
    countryCode: "+1", // Same as before
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [availableTime, setAvailableTime] = useState([]);
  const [isLocationDetected, setIsLocationDetected] = useState(false);

  useEffect(() => {
    const timings = generateTimings(); // Generate timings on component mount
    setAvailableTime(timings);
    detectLocation(); // Call detectLocation on mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.emailId) errors.emailId = "Email is required";

    const { phoneNumber } = formData;
    const allSameDigits = /^(\d)\1*$/.test(phoneNumber);
    if (!phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
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
        // Update the API endpoint with the correct URL
        const response = await axios.post(
          "https://hrms-repository-gruhabase.onrender.com/tuition-application/tutor/create",
          formData, // formData already contains all required fields
          {
            headers: {
              "Content-Type": "application/json",

            },
          }
        );
        navigate("/create-password");
        console.log("Form submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting the form:", error.response?.data || error.message);
        setErrors({ apiError: "An error occurred while submitting the form." });
      }
    }
  };
  
  const generateTimings = () => {
    const timings = [];
    const startHour = 0; // 00:00 (12 AM in 24-hour format)
    const endHour = 23; // 23:00 (11 PM in 24-hour format)
    const interval = 45; // 45 minutes

    let hour = startHour;
    let minute = 0;
    while (hour < endHour || (hour === endHour && minute <= 15)) {
      // Adjust condition to allow more intervals
      const startTime = formatTime(hour, minute);
      // Increment time by 45 minutes to get the end time of the slot
      let endHour = hour;
      let endMinute = minute + interval;

      if (endMinute >= 60) {
        endMinute -= 60;
        endHour++;
      }

      if (endHour > 23) break; // Prevent exceeding the 23:00 hour

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[120px]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-8">
          Sign Up as a Tutor
        </h2>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              minLength={4}
              maxLength={20}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.firstName && (
              <p className="text-red-400 text-base mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              minLength={4}
              maxLength={20}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.lastName && (
              <p className="text-red-400 text-base mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">Email Id</label>
            <input
              type="text"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              minLength={4}
              maxLength={20}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.emailId && (
              <p className="text-red-400 text-base mt-1">{errors.emailId}</p>
            )}
          </div>
        
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label
              htmlFor="countryCode"
              className="block text-gray-700 font-bold"
            >
              Country Code:
            </label>
            <select
              name="countryCode"
              id="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="+91">+91 (INDIA)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AUSTRALIA)</option>
              <option value="+64">+64 (NEW ZEALAND)</option>
              <option value="+27">+27 (SOUTH AFRICA)</option>
              <option value="+977">+977 (NEPAL)</option>
              <option value="+94">+94 (SRILANKA)</option>
              <option value="+60">+60 (MALAYSIA)</option>
              <option value="+65">+65 (SINGAPORE)</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 font-bold"
            >
              Mobile Number:
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              minLength={10}
              maxLength={10}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your Mobile Number"
              onFocus={() =>
                setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }))
              }
            />
            {errors.mobileNumber && (
              <p className="text-red-400 text-base mt-1">
                {errors.mobileNumber}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Your location will be detected"
              disabled={isLocationDetected} // Disable if location is detected
            />
            {errors.location && (
              <p className="text-red-400 text-base mt-1">{errors.location}</p>
            )}
          </div>

          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-400 text-base mt-1">{errors.gender}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dateOfBirth}
              onChange={handleChange}
              onKeyDown={(e) => e.preventDefault()}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.dateOfBirth && (
              <p className="text-red-400 text-base mt-1">
                {errors.dateOfBirth}
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">
              Highest Qualification
            </label>
            <input
              type="text"
              name="highestQualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.qualification && (
              <p className="text-red-400 text-base mt-1">
                {errors.qualification}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">
              Subjects You Are Expert At
            </label>
            <input
              type="text"
              name="subjectsYouAreExpertAt"
              value={formData.subjects}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.subjects && (
              <p className="text-red-400 text-base mt-1">{errors.subjects}</p>
            )}
            
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">
              Mode of Teaching
            </label>
            <select
              name="modeOfTeaching"
              value={formData.modeOfTeaching}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="virtual">Virtual</option>
            </select>
            {errors.modeOfTeaching && (
              <p className="text-red-400 text-base mt-1">
                {errors.modeOfTeaching}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">
              Charges Per Hour
            </label>
            <input
              type="text"
              name="chargesPerHour"
              value={formData.chargesPerHour}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.chargesPerHour && (
              <p className="text-red-400 text-base mt-1">
                {errors.chargesPerHour}
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">
              National Id Type
            </label>
            <input
              type="text"
              name="nationalIdType"
              value={formData.nationalIdType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.nationalIdType && (
              <p className="text-red-400 text-base mt-1">
                {errors.nationalIdType}
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">
              National Id Number
            </label>
            <input
              type="text"
              name="nationalIdNum"
              value={formData.nationalIdNum}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.nationalIdNum && (
              <p className="text-red-400 text-base mt-1">
                {errors.nationalIdNum}
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 font-bold">
              Available Time Slots
            </label>
            <select
              name="availableTimings"
              value={formData.availableTimeSlots}
              onChange={handleChange}
              className={`w-full py-2 border rounded ${
                errors.availableTimeSlots ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Available Timing</option>
              {availableTime.map((timing, index) => (
                <option key={index} value={timing}>
                  {timing}
                </option>
              ))}
            </select>
            {errors.availableTimeSlots && (
              <p className="text-red-400 text-base mt-1">
                {errors.availableTimeSlots}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter the category"
          />
          {errors.category && (
            <p className="text-red-400 text-base mt-1">{errors.category}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};
export default SignUpAsTutor;
