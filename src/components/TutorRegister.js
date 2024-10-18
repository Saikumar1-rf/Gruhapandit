import React, { useState, useEffect } from "react";
import { countries } from "./Countries";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slide6 from "./Slide6";

const TutorRegister = ({ setIsSubmitted }) => {

  const handleCreatePassword = () => {
    setShowModal(false);
    navigate("/create-password"); 
  };
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    countryCode: "",
    phoneNumber: "",
    location: "",
    gender: "",
    dob: "",
    highestQualification: "",
    subjectsYouAreExpertAt: "",
    modeOfTeaching: "",
    nationalIdType: "",
    nationalIdNum: "",
    passportNumber: "",
    // file: null,
    chargesPerHour: "",
    availableTimings: "",
    category: "",
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const [selectedCountryCode, setSelectedCountryCode] = useState("");

  //Mobile Number Validation//
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [personInfo, setPersonInfo] = useState({
    phone: "",
  });

  const validateStartDigits = (value, country) => {
    if (!country || !country.validStartDigits.length) {
      return true; // No restrictions on starting digits for this country
    }
    return country.validStartDigits.some((digit) => value.startsWith(digit));
  };

  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: `(+${country.phone}) ${country.label}`,
    country,
  }));
  //******/

  const [errors, setErrors] = useState({
    nationalIdType: "",
    nationalIdNum: "",
    passportNumber: "",
    file: "",
  });

  const [charCount, setCharCount] = useState(0);
  //Location Validation//
  const [isLocationDetected, setIsLocationDetected] = useState(false); // Prevent multiple detections

  // Function to detect the user's location using the Geolocation API
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Use reverse geocoding to get the city, state, area, and country
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
          )
            .then((response) => response.json())
            .then((data) => {
              const { suburb, city, state, country, postcode } = data.address; // suburb = area/neighborhood
              const exactLocation = `${suburb}, ${city}, ${state}, ${country}, ${postcode}`;

              // Set the location as "Area, City, State, Country"
              setFormData((prevFormData) => ({
                ...prevFormData,
                location: exactLocation,
              }));
              setIsLocationDetected(true); // Mark as detected to prevent re-fetch
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

  // Handle the onFocus event to detect location when the input is focused
  const handleFocus = () => {
    if (!isLocationDetected) {
      detectLocation(); // Detect location only if not already detected
    }
  };
  //******/

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value.trimStart();

    // Validation logic
    if (name === "afford") {
      if (/^[0-9]*$/.test(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setErrors((prevState) => ({
          ...prevState,
          afford: "",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          afford: "Only numeric values are allowed.",
        }));
      }
    }

    if (name === "passportNumber") {
      const regex = /^[A-Z][0-9]{7}$/;
      const maxLength = 8;

      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passportNumber: "Passport Number is required",
        }));
      } else if (value.length !== maxLength) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passportNumber: `Passport Number must be exactly ${maxLength} characters long`,
        }));
      } else if (!regex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passportNumber:
            "Invalid passport number format. It should start with a letter followed by 7 digits (e.g., A1234567).",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passportNumber: "",
        }));
      }
    }

    if (name === "emailId") {
      newValue = value.replace(/\s+/g, "").toLowerCase();
    }

    if (name === "chargesPerHour") {
      // Prevent input if more than 7 digits (allow decimal)
      if (newValue.length > 7) {
        return;
      }
      // Ensure it's a numeric value
      if (!/^\d*\.?\d*$/.test(newValue)) {
        return; // Prevent any non-numeric input
      }
    }

    // Validation logic for firstName and lastName
    if (name === "firstName" || name === "lastName") {
      const regex = /^[A-Za-z][A-Za-z\s]*$/; // Allow alphabets and spaces, must start with a letter
      if (!regex.test(newValue) && newValue !== "") {
        return; // Ignore input if it contains non-alphabetic characters
      }
    }

    if (name === "subject") {
      setCharCount(value.length);
    }

    if (
      name === "nationalIdNum" &&
      formData.nationalIdType === "Aadhaar Card"
    ) {
      // Check if the value is numeric and does not exceed 12 digits
      if (!/^\d*$/.test(value) || value.length > 12) {
        return; // Prevent any non-numeric input
      }
    }

    // Update the form data
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleNameChar = (e) => {
    const key = e.key;
    const value = e.target.value;

    const nameRegex = /^[A-Za-z\s]*$/; // Allow letters and spaces
    let newError = {};

    // Prevent empty input or spaces at the beginning
    if ((value === "" && key === " ") || !nameRegex.test(key)) {
      e.preventDefault(); // Prevent spaces if the value is empty
    } else if (value.trim() === "" && key === " ") {
      e.preventDefault(); // Prevent spaces if the value is empty
    } else if (!/^[A-Za-z]/.test(value) && key !== " ") {
      newError.firstName = "Must start with a Character"; // Adjust error message as needed
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "emailId") {
      e.target.value = value.replace(/\s+/g, "");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, file: "" }));
  };

  const validate = () => {
    const newErrors = {};
    //first name
    if (!formData.firstName || !formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "First Name must be at least 3 characters";
    }

    // Last Name
    if (!formData.lastName || !formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (formData.lastName.trim().length < 3) {
      newErrors.lastName = "Last Name must be at least 3 characters";
    }

    //email
    const emailRegex =
      /^(?!\d)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@(gmail|yahoo|outlook|hotmail|example|sai)\.(com|net|org|in|edu|gov|mil|us|info|org\.in)$/;
    if (!formData.emailId) {
      newErrors.emailId = "Email is required";
    } else if (!emailRegex.test(formData.emailId)) {
      newErrors.emailId = "Invalid email format";
    }
    //mobile
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Mobile Number is required";

    //gender
    if (!formData.gender) newErrors.gender = "Gender is required";
    //location
    if (!formData.location) newErrors.location = "Location is required";
    //DOB
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    //sub are req
    if (!formData.subjectsYouAreExpertAt.trim())
      newErrors.subjectsYouAreExpertAt = "Subject is required";
    //Mode of teaching
    if (!formData.modeOfTeaching)
      newErrors.modeOfTeaching = "Mode of teaching is required";
    //charges per hour
    if (!formData.chargesPerHour)
      newErrors.chargesPerHour = "Charges per hour is required";
    else if (isNaN(formData.chargesPerHour) || formData.chargesPerHour <= 0)
      newErrors.chargesPerHour = "Charges must be a positive number";

    if (!formData.nationalIdType)
      newErrors.nationalIdType = "Government ID Proof is required";
    // Validate Highest Qualification
    const qualificationRegex =
      /^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

    if (!formData.highestQualification.trim()) {
      newErrors.highestQualification = "Highest qualification is required";
    } else if (!qualificationRegex.test(formData.highestQualification)) {
      newErrors.highestQualification =
        "Invalid qualification format. Only letters, numbers, and special characters are allowed.";
    }

    // Charges Per Hour validation
    if (!formData.chargesPerHour) {
      newErrors.chargesPerHour = "Charges per hour is required";
    } else if (isNaN(formData.chargesPerHour) || formData.chargesPerHour <= 0) {
      newErrors.chargesPerHour = "Charges must be a positive number";
    } else if (formData.chargesPerHour.length > 10) {
      newErrors.chargesPerHour = "Charges per hour cannot exceed 10 digits";
    }

    // Aadhaar Card validation
    if (formData.nationalIdType === "Aadhaar Card") {
      const aadhaarRegex = /^\d{12}$/; // Aadhaar should be exactly 12 digits
      if (!formData.nationalIdNum.trim()) {
        newErrors.nationalIdNum = "Aadhaar number is required";
      } else if (!aadhaarRegex.test(formData.nationalIdNum.trim())) {
        newErrors.nationalIdNum =
          "Invalid Aadhaar number format. It must be 12 digits.";
      }
    }

    // Passport validation

    if (formData.nationalIdType === "Passport Number") {
      if (!formData.passportNumber)
        newErrors.passportNumber = "Passport Number is required";
      // Add any specific validation logic for passport number here if needed
    }

    if (!formData.file) newErrors.file = "File upload is required";

    if (!formData.availableTimings) {
      newErrors.availableTimings = "Available timing is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        // Create FormData to handle file and other data
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("emailId", formData.emailId);
        formDataToSend.append("countryCode", formData.countryCode);
        formDataToSend.append("phoneNumber", formData.phoneNumber);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("dob", formData.dob);
        formDataToSend.append(
          "highestQualification",
          formData.highestQualification
        );
        formDataToSend.append(
          "subjectsYouAreExpertAt",
          formData.subjectsYouAreExpertAt
        );
        formDataToSend.append("modeOfTeaching", formData.modeOfTeaching);
        formDataToSend.append("nationalIdType", formData.nationalIdType);
        formDataToSend.append("nationalIdNum", formData.nationalIdNum);
        formDataToSend.append("passportNumber", formData.passportNumber);
        formDataToSend.append("chargesPerHour", formData.chargesPerHour);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("availableTimings", formData.availableTimings);
        // formDataToSend.append("file", formData.file); // Add the file
        console.log("form submit", formDataToSend);
        // Axios POST request
        const response = await axios.post(
          "https://hrms-repository-gruhabase.onrender.com/tuition-application/tutor/create",
          formDataToSend,
          {
            headers: {
              "Content-Type": "application/json", // Send as JSON
            },
          }
        );

        // Handle response
        console.log("Form submitted successfully", response.data);

        // If successful, set the submission state and navigate to success page
        setIsSubmitted(true);
        navigate("/success");
      } catch (error) {
        // Handle error
        console.error("Error submitting form", error);
      }
    } else {
      setErrors(newErrors);
    }
  };



  const [availableTimings, setTimings] = useState([]);

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
  // useEffect to set the generated timings on component mount
  useEffect(() => {
    const availableTimings = generateTimings();
    setTimings(availableTimings);
    // console.log(availableTimings); // To log the available timings in IST format
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="max-w-3xl sm-640px mx-auto mt-[150px] p-10 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div>
        <p>
          <strong className="text-red-500">Note: </strong>
          <a
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={handleOpenModal} // Open modal on click
          >
            Terms and Conditions
          </a>
        </p>
      </div>
      <h2 className="text-3xl font-bold text-center text-cyan-600 mb-8">
        Sign Up as a Tutor
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Row 1: First Name and Last Name */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              minLength={3}
              maxLength={20}
              name="firstName"
              placeholder="Enter your First Name"
              value={formData.firstName}
              onKeyDown={handleNameChar}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>
          <div className="w-1/2 pl-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              minLength={3}
              maxLength={20}
              name="lastName"
              placeholder="Enter your Last Name"
              value={formData.lastName}
              onChange={handleChange}
              onKeyDown={handleNameChar}
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* Row 2: Email and Mobile Number */}
        <div className="flex mb-3">
          <div className="w-full pr-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Email:
            </label>
            <input
              type="emailId"
              name="emailId"
              placeholder="Enter your Email"
              maxLength={30}
              value={formData.emailId}
              onChange={handleChange}
              onInput={handleInput}
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.emailId ? "border-red-500" : ""
              }`}
            />
            {errors.emailId && (
              <span className="text-red-500 text-sm">{errors.emailId}</span>
            )}
          </div>

          <div className="w-full pl-3 mt-2 mb-4">
            <label className="text-sm font-medium text-gray-700 float-start">
              Mobile Number:
            </label>
            <div className="flex float-start w-full">
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
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    display: "none",
                  }),
                  indicatorSeparator: () => null,
                }}
                className="w-1/4 border border-gray-500 rounded-l-md outline-none"
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
                className={`w-full px-4 py-2 border border-gray-500 ${
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
              <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
            )}
          </div>
        </div>

        {/* Row 3: Location and Gender */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Location:
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Select Your Location"
              value={formData.location}
              onChange={handleChange}
              onFocus={handleFocus}
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.location ? "border-red-500" : ""
              }`}
            />
            {errors.location && (
              <span className="text-red-500 text-sm">{errors.location}</span>
            )}
          </div>
          <div className="w-1/2 pl-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Gender:
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.gender ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            )}
          </div>
        </div>

        {/* Row 4: Date of Birth and Highest Qualification */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              max={
                new Date(
                  new Date().setFullYear(new Date().getFullYear() - 4) - 1
                )
                  .toISOString()
                  .split("T")[0]
              }
              min={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
                  .toISOString()
                  .split("T")[0]
              }
              className={`w-full px-4 py-2 border border-gray-500 outline-none  ${
                errors.dob ? "border-red-500" : ""
              }`}
              onKeyDown={(e) => e.preventDefault()}
            />
            {errors.dob && (
              <span className="text-red-500 text-sm">{errors.dob}</span>
            )}
          </div>
          <div className="w-1/2 pl-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Highest Qualification:
            </label>
            <input
              type="text"
              name="highestQalification"
              maxLength={15}
              placeholder="Enter Your Highest Qualification"
              value={formData.highestQualification}
              onChange={(e) => {
                const newValue = e.target.value;
                setFormData({ ...formData, highestQualification: newValue });
              }}
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.highestQualification ? "border-red-500" : ""
              }`}
            />
            {errors.highestQualification && (
              <span className="text-red-500 text-sm">
                {errors.highestQualification}
              </span>
            )}
          </div>
        </div>

        {/* Row 5: Subjects and Mode of Teaching */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Subjects You Are Expert At:
            </label>
            <textarea
              type="text"
              name="subjectsYouAreExpertAt"
              value={formData.subjectsYouAreExpertAt}
              onChange={handleChange}
              placeholder="Enter Subjects You are expert at"
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.subjectsYouAreExpertAt ? "border-red-500" : ""
              } h-10`}
            />
            {errors.subjectsYouAreExpertAt && (
              <span className="text-red-500 text-sm">
                {errors.subjectsYouAreExpertAt}
              </span>
            )}
          </div>
          <div className="w-1/2 pl-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Mode of Teaching:
            </label>
            <select
              name="modeOfTeaching"
              value={formData.modeOfTeaching}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-500 outline-none  ${
                errors.modeOfTeaching ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Mode</option>
              <option value="online">Student Home</option>
              <option value="offline">Tutor Home</option>
              <option value="offline">Virtual Mode</option>
            </select>
            {errors.modeOfTeaching && (
              <span className="text-red-500 text-sm">
                {errors.modeOfTeaching}
              </span>
            )}
          </div>
        </div>

        {/* Row 6: Charges Per Hour and Available Time Slots */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Charges Per Hour:
            </label>
            <input
              type="text"
              name="chargesPerHour"
              value={formData.chargesPerHour}
              placeholder="Enter the amount"
              onChange={handleChange}
              maxLength={7}
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.chargesPerHour ? "border-red-500" : ""
              }`}
            />
            {errors.chargesPerHour && (
              <span className="text-red-500 text-sm">
                {errors.chargesPerHour}
              </span>
            )}
          </div>
          <div className="w-1/2 pl-3">
            <label className="float-start mt-2 text-sm font-medium text-gray-700">
              Available Time slots
            </label>
            <select
              name="availableTimings"
              value={formData.availableTimings}
              onChange={handleChange}
              className={`w-[320px]  py-2 border border-gray-500 outline-none  ${
                errors.availableTimings ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Available Timing</option>
              {availableTimings.map((timing, index) => (
                <option key={index} value={timing}>
                  {timing}
                </option>
              ))}
            </select>
            {errors.availableTimings && (
              <span className="text-red-500 text-sm">
                {errors.availableTimings}
              </span>
            )}
          </div>
        </div>

        {/* Row 7: Category and Government ID Proof */}
        <div className="flex mb-3">
          <div className="w-1/2 pr-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Category:
            </label>
            <input
              type="text"
              name="category"
              maxLength={30}
              placeholder="Enter the category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                errors.category ? "border-red-500" : ""
              }`}
            />
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category}</span>
            )}
          </div>
          <div className="w-1/2 pl-3">
            <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
              Government ID Proof:
            </label>
            <select
              name="nationalIdType"
              value={formData.nationalIdType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-500 outline-none${
                errors.nationalIdType ? "border-red-500" : ""
              }`}
            >
              <option value="">Select ID Proof</option>
              <option value="Aadhaar Card">Aadhaar Card</option>
              <option value="Passport Number">Passport Number</option>
            </select>
            {errors.nationalIdType && (
              <span className="text-red-500 text-sm">
                {errors.nationalIdType}
              </span>
            )}
          </div>
        </div>

        {/* Row 8: Aadhaar/Passport Number and Document Upload */}
        <div className="flex mb-3">
          {formData.nationalIdType && (
            <>
              <div className="w-1/2 pr-3">
                <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
                  {formData.nationalIdType === "Aadhaar Card"
                    ? "Aadhaar Number:"
                    : "Passport Number:"}
                </label>
                <input
                  type="text"
                  name={
                    formData.nationalIdType === "Aadhaar Card"
                      ? "nationalIdNum"
                      : "passportNumber"
                  }
                  value={
                    formData.nationalIdType === "Aadhaar Card"
                      ? formData.nationalIdNum
                      : formData.passportNumber
                  }
                  onChange={handleChange}
                  maxLength={
                    formData.nationalIdType === "Aadhaar Card" ? 12 : 8
                  }
                  className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                    formData.nationalIdType === "Aadhaar Card" &&
                    errors.nationalIdNum
                      ? "border-red-500"
                      : formData.nationalIdType === "Passport Number" &&
                        errors.passportNumber
                      ? "border-red-500"
                      : ""
                  }`}
                />

                {formData.nationalIdType === "Aadhaar Card" &&
                  errors.nationalIdNum && (
                    <span className="text-red-500 text-sm">
                      {errors.nationalIdNum}
                    </span>
                  )}
                {formData.nationalIdType === "Passport Number" &&
                  errors.passportNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.passportNumber}
                    </span>
                  )}
              </div>

              <div className="w-1/2 pl-3">
                {/* Document Upload */}
                <label className="block mb-2 text-sm font-medium text-gray-700 float-start">
                  Upload{" "}
                  {formData.nationalIdType === "Aadhaar Card"
                    ? "Aadhaar Document:"
                    : "Passport Document:"}
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-2 border border-gray-500 outline-none ${
                    errors.file ? "border-red-500" : ""
                  }`}
                />
                {errors.file && (
                  <span className="text-red-500 text-sm">{errors.file}</span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="w-24 bg-blue-600 text-white py-2  hover:bg-blue-500"
            onClick={handleCreatePassword}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
      {/* Render Modal */}
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
  );
};

export default TutorRegister;
