import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Slide6 from "./Slide6";
import { countries } from "./Countries";
import Select from "react-select";

const TutorRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    countryCode: "",
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
  
    // Prevent the first character from being a space
    if (value.startsWith(" ")) return;
  
    if (name === "nationalIdNum") {
      if (formData.nationalIdType === "Aadhar Card") {
        // Allow only numeric input for Aadhaar and limit to 12 digits
        const formattedValue = value.replace(/[^0-9]/g, "").slice(0, 12);
        setFormData({ ...formData, [name]: formattedValue });
  
        if (formattedValue.length === 12) {
          setErrors({ ...errors, nationalIdNum: "" });
        } else {
          setErrors({ ...errors, nationalIdNum: "Aadhar must be exactly 12 digits." });
        }
      } else if (formData.nationalIdType === "Pan Card") {
        let formattedValue = value.toUpperCase();
  
        // Allow only uppercase letters in the first 5 characters
        if (formattedValue.length <= 5) {
          formattedValue = formattedValue.replace(/[^A-Z]/g, "");
        }
        // Allow only numbers in the next 4 characters
        else if (formattedValue.length <= 9) {
          formattedValue = formattedValue.slice(0, 5) + formattedValue.slice(5).replace(/[^0-9]/g, "");
        }
        // Allow only an uppercase letter in the 10th character
        else if (formattedValue.length === 10) {
          formattedValue = formattedValue.slice(0, 9) + formattedValue[9].replace(/[^A-Z]/g, "");
        } else {
          formattedValue = formattedValue.slice(0, 10); // Limit input to 10 characters
        }
  
        setFormData({ ...formData, [name]: formattedValue });
  
        // Validate full PAN format after reaching 10 characters
        if (formattedValue.length === 10) {
          if (/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formattedValue)) {
            setErrors({ ...errors, nationalIdNum: "" });
          } else {
            setErrors({
              ...errors,
              nationalIdNum: "PAN must be in the format ABCDE1234F.",
            });
          }
        } else {
          setErrors({ ...errors, nationalIdNum: "" });
        }
      }
    } else if (name === "nationalIdType") {
      setFormData({
        ...formData,
        [name]: value,
        nationalIdNum: "", // Reset the ID number field when the type changes
      });
      setErrors({ ...errors, nationalIdNum: "" });
    } else if (name === "emailId") {
      // Remove spaces and convert to lowercase for emailId
      const noSpaceValue = value.replace( `^\S$|^\S[\s\S]*\S$
` ).toLowerCase();
      setFormData({ ...formData, [name]: noSpaceValue });
  
      // Check if spaces were originally present
      if (/\s/.test(value)) {
        setErrors({
          ...errors,
          emailId: "Email should not contain spaces.",
        });
      } else {
        setErrors({ ...errors, emailId: "" });
      }
    }else if (name === "chargesPerHour") {
      // Allow only numeric values for charges per hour
      if (/^\d*\.?\d*$/.test(value)) {
        // Regular expression for numbers (optional decimal)
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, chargesPerHour: "" });
      } else {
        setErrors({
          ...errors,
          chargesPerHour: "Charges per hour must be a number.",
        });
      }
    } else if (name === "firstName" || name === "lastName" || name === "category") {
      // Only allow alphabetic characters for firstName, lastName, and category fields
      if (/[^a-zA-Z\s]/.test(value)) {
        setErrors({ ...errors, [name]: "Only alphabetic characters are allowed." });
      } else {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleHigherQualificationChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
  
    // Prevent input from starting with a space
    if (/^\s/.test(value)) {
      errorMessage = "The input should not start with a space.";
    } else {
      // Allow letters, numbers, spaces, commas, periods, underscores, and hyphens
      const validInputPattern = /^[a-zA-Z0-9\s,._-]*$/;
      if (!validInputPattern.test(value)) {
        errorMessage = "Only letters, numbers, spaces, commas, periods, underscores, and hyphens are allowed.";
      } else {
        // Extract numeric characters
        const digits = value.replace(/[^0-9]/g, ""); // Keep only numbers
  
        // Check if digits are within 1-12
        if (digits && (Number(digits) < 1 || Number(digits) > 12)) {
          errorMessage = "Only class numbers between 1 and 12 are allowed in digits.";
        } else if (value.length > 30) {
          errorMessage = "Higher Qualification can only have up to 30 characters.";
        }
      }
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      highestQualification: errorMessage,
    }));
  
    // Update form data if there is no error
    if (!errorMessage) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  

  //Mobile Number Validation//
  const [selectedCountry, setSelectedCountry] = useState("");
  const [personInfo, setPersonInfo] = useState({
    phone: "",
  });

  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: `+${country.phone} ${country.label}`, // Corrected template literal
    country,
  }));

  const validateStartDigits = (value, country) => {
    if (!country || !country.validStartDigits.length) {
      return true; // No restrictions on starting digits for this country
    }
    return country.validStartDigits.some((digit) => value.startsWith(digit));
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^(?!\d)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@(gmail|yahoo|outlook|hotmail|example|sai)\.(com|net|org|in|edu|gov|mil|us|info|org\.in)$/;
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.emailId) {
      errors.emailId = "EmailId is required";
    } else if (!emailRegex.test(formData.emailId)) {
      errors.emailId = "Invalid email format";
    } else if (/[A-Z]/.test(formData.emailId)) {
      errors.emailId = "EmailId cannot contain uppercase letters";
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
          "https://tution-application-testenv.onrender.com/tuition-application/tutor/create",
              // "https://tution-application.onrender.com/tuition-application/tutor/create",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        navigate("/create-password", { state: { emailId: formData.emailId } });
      } catch (error) {
        if (error.response) {
          // Check if the error status is 400 and extract the message
          if (error.response.status === 400) {
            // console.log(error.response.data.split(":")[1])
            const errorMessage = error.response.data.split(":")[1]
            setErrors({
              // apiError: backendErrorMessage,
              emailId: errorMessage.includes("email id") && errorMessage,
              phoneNumber:errorMessage.includes("phone number") && errorMessage,
              dob:errorMessage.includes("Date of birth") && errorMessage,
              // location:errorMessage.includes("location") && errorMessage,
              board:errorMessage.includes("board") && errorMessage,
              institution:errorMessage.includes("institution") && errorMessage,
              category:errorMessage.includes("category") && errorMessage,
              subjectsYouAreExpertAt:errorMessage.includes("subjectsYouAreExpertAt") && errorMessage,
              modeOfTeaching:errorMessage.includes("modeOfTeaching") && errorMessage,
              availableTimings:errorMessage.includes("availableTimings") && errorMessage,
              highestQualification:errorMessage.includes("highestQualification") && errorMessage,
              nationalIdNum: errorMessage.includes("NationalId") && errorMessage,
            })
          } else {
            setErrors({ apiError: "An error occurred while submitting the form." });
          }
        } else {
          setErrors({ apiError: "Network error. Please try again later." });
        }
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

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
  
    // Convert input to lowercase and remove spaces
    const lowercaseValue = value.replace(/\s/g, "").toLowerCase();
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: lowercaseValue,
    }));
  
    // Set an error if any uppercase letters were in the original input
    if (/[A-Z]/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailId: "Email should not contain uppercase letters.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailId: "",
      }));
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent the space key from being typed
    }
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
  
  const handleFocus = () => {
    if (!isLocationDetected) {
      detectLocation();
    }
  };


  return (
    <div className="flex py-20 justify-center items-center min-h-screen bg-white-200 bg-gradient-to-r">
      <div className="w-[650px] mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl border border-gray-400 p-8 bg-transparent bg-gradient-to-r shadow-md rounded-lg"
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
          <h2 className="text-xl font-bold text-center text-gray-800 text-shadow-default mb-10 mt-5">
            TUTOR REGISTRATION
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
                minLength={3}
                maxLength={20}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
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
                minLength={3}
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
              <label className="block text-gray-800 font-bold">Email ID</label>
              <input
                type="email"
                name="emailId"
                placeholder="Enter Email ID"
                value={formData.emailId}
                maxLength={40}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              />
              {errors.emailId && (
                <p className="text-red-400 text-base mt-1">{errors.emailId}</p>
              )}
            </div>
          <div className="w-full sm:w-1/2 px-2 mt-2">
              <label className="block text-gray-800 text-shadow-default font-bold  mb-1">
                Mobile Number
              </label>
              <div className="flex">
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
                <input
                  maxLength={10}
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your Mobile Number"
                  value={personInfo.phone || ""}
                  disabled={!selectedCountry}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/[^0-9]/g, "");
                    setPersonInfo({ ...personInfo, phone: inputValue });
                    setFormData({ ...formData, phoneNumber: inputValue });
                  }}
                  onInput={(e) => {
                    const inputValue = e.target.value.replace(/[^0-9]/g, "");
                    if (
                      selectedCountry &&
                      !validateStartDigits(inputValue, selectedCountry)
                    ) {
                      e.target.value = "";
                    }
                    setPersonInfo({ ...personInfo, phone: inputValue });
                    setFormData({ ...formData, phoneNumber: inputValue });
                  }}
                  className={`w-full px-3  py-2 border border-gray-500 rounded-r-md bg-transparent outline-none ${
                    selectedCountry && personInfo.phone
                      ? !validateStartDigits(personInfo.phone, selectedCountry)
                        ? "border-red-500"
                        : ""
                      : ""
                  }`}
                  style={{
                    height: "42px",
                  }}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </span>
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
                placeholder="Choose Your Current Location"
                value={formData.location}
                onChange={handleChange}
                onFocus={handleFocus}
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
                max={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 2) - 1
                  )
                    .toISOString()
                    .split("T")[0]
                }
                min={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 100)
                  )
                    .toISOString()
                    .split("T")[0]
                }
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
                onKeyDown={(e) => e.preventDefault()}
              />
              {errors.dob && (
                <p className="text-red-400 text-base mt-1">{errors.dob}</p>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Higher Qualification
              </label>
              <input
                type="text"
                name="highestQualification"
                placeholder="Enter Qualification"
                value={formData.highestQualification}
                onChange={handleHigherQualificationChange}
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
            <div className="w-full sm:w-1/2 px-2 mt-0">
              <label className="block text-gray-800 text-shadow-default font-bold">
                Mode of Teaching
              </label>
              <select
                name="modeOfTeaching"
                value={formData.modeOfTeaching}
                onChange={handleChange}
                className="w-full px-3  outline-none py-2 border rounded mt-2 bg-transparent border-gray-400 "
              >
                <option value="">Select Mode</option>
                <option value="Student Home">Student Home</option>
                <option value="Tutor Home">Tutor Home</option>
                <option value="Virtual Mode">Virtual Mode</option>
              </select>
              {errors.modeOfTeaching && (
                <span className="text-red-500 text-sm">
                  {errors.modeOfTeaching}
                </span>
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
                maxLength={8}
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

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 text-shadow-default font-bold">
                National ID Type
              </label>
              <select
                name="nationalIdType"
                value={formData.nationalIdType}
                onChange={handleChange}
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
              >
                <option value="">Select ID Type</option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="Pan Card">PAN Card</option>
              </select>
              {errors.nationalIdType && (
                <p className="text-red-400 text-base mt-1">
                  {errors.nationalIdType}
                </p>
              )}
            </div>

      
            <div className="w-full sm:w-1/2 px-2">
              <label className="block text-gray-800 font-bold">
                {formData.nationalIdType} Number
              </label>
              <input
                type="text"
                name="nationalIdNum"
                value={formData.nationalIdNum}
                onChange={handleChange}
                maxLength={formData.nationalIdType === "Aadhar Card" ? 12 : 10}
                minLength={formData.nationalIdType === "Aadhar Card" ? 12 : 10}
              
                className="w-full px-3 outline-none py-2 border rounded mt-2 bg-transparent border-gray-400"
                placeholder={
                  formData.nationalIdType === "Aadhar Card"
                    ? "Enter 12-digit Aadhar Number"
                    :formData.nationalIdType === "Pan Card"
                    ? "Enter 10-character PAN"
                    :"Enter The Number"
                }
                />
              {errors.nationalIdNum && (
                 <p className="text-red-400 text-base mt-1">
                  {errors.nationalIdNum}
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
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition duration-200"
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
