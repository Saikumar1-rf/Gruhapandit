import { useState, useEffect } from "react";
import { countries } from "./Countries";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slide6 from "./Slide6";

const StudentRegister = ({ setIsSubmitted }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    countryCode: "",
    dob: "",
    location: "",
    gender: "",
    studentClass: "",
    board: "",
    institution: "",
    category: "",
    subjectsLookingFor: "",
    modeOfTeaching: "",
    affordablity: "",
    availableTimings: "",
  });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Handle the Create Password button click inside the modal
  // const handleCreatePassword = () => {
  //   // Close the modal and navigate to the Create Password page
  //   setShowModal(false);
  //   navigate("/create-password"); // Adjust the route as per your app structure
  // };
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const [errors, setErrors] = useState({});
  const [isLocationDetected, setIsLocationDetected] = useState(false); // Prevent multiple detections

  //studying class
  const handleStudyingClassChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (/^\d+$/.test(value)) {
      if (Number(value) < 1 || Number(value) > 12) {
        errorMessage = "Please enter a number between 1 and 12";
      }
    } else {
      const validInputPattern = /^[a-zA-Z0-9\s]*$/;
      if (!validInputPattern.test(value)) {
        errorMessage = "Special characters are not allowed.";
      } else if (value.length > 30) {
        errorMessage = "Studying Class can only have up to 30 characters";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      studentClass: errorMessage,
    }));

    if (!errorMessage) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //subject tuition looking for
  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    const validInputPattern = /^[a-zA-Z0-9\s,]*$/;

    if (!validInputPattern.test(value)) {
      errorMessage =
        "Special characters are not allowed except for commas to separate subjects.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      subjectsLookingFor: errorMessage,
    }));

    if (!errorMessage && value.length <= 50) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [availableTimings, setTimings] = useState([]);

  //timing slots validations

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

  //Date of Birth
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  const getDaysInMonth = (month, year) => {
    switch (parseInt(month)) {
      case 1: // January
      case 3: // March
      case 5: // May
      case 7: // July
      case 8: // August
      case 10: // October
      case 12: // December
        return 31;
      case 4: // April
      case 6: // June
      case 9: // September
      case 11: // November
        return 30;
      case 2: // February
        return isLeapYear(year) ? 29 : 28;
      default:
        return 31;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true); // Set submitting state
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
        formDataToSend.append("studentClass", formData.studentClass);
        formDataToSend.append("subjectsLookingFor", formData.subjectsLookingFor);
        formDataToSend.append("affordablity", formData.affordablity);
        formDataToSend.append("institution", formData.institution);
        formDataToSend.append("board", formData.board);
        formDataToSend.append("modeOfTeaching", formData.modeOfTeaching);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("availableTimings", formData.availableTimings);
        // formDataToSend.append("file", formData.file); // Add the file if needed

        console.log("form submit", formDataToSend);

        // Axios POST request with proper headers for FormData
        const response = await axios.post(
          "https://hrms-repository-gruhabase.onrender.com/tuition-application/student/create",
          // "https://tution-application.onrender.com/tuition-application/student/create",
          formDataToSend,
          {
            headers: {
              "Content-Type": "application/json", //when we want to send images/vides
            },
          }
        );

        // Handle response
        navigate("/create-password"); // Navigate only after successful API call
        console.log("Form submitted successfully", response.data);

        // If successful, set the submission state and navigate to the success page
        setIsSubmitted(true);
        console.log('navigated');        
      } catch (error) {
        // Handle error
        // console.error("Error submitting form", error);
        setIsSubmitting(false); // Reset submitting state on error
      }
    } else {
      setErrors(newErrors); // Show validation errors if any
    }
};

 

  //Affordability per month
  const handleAffordChange = (e) => {
    const { name, value } = e.target;

    // Allow numeric values including decimal points
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      const affordValue = value === "" ? "" : parseFloat(value); // Handle empty string appropriately

      if (value === "0") {
        setErrors((prevState) => ({
          ...prevState,
          affordablity: "Zero is not allowed as a valid amount.",
        }));
      } else {
        // If valid input, update the form data as a number
        setFormData((prevState) => ({
          ...prevState,
          [name]: affordValue,
        }));
        // Clear any existing errors
        setErrors((prevState) => ({
          ...prevState,
          affordablity: "",
        }));
      }
    } else {
      // Set error if input is not a valid number
      setErrors((prevState) => ({
        ...prevState,
        affordablity: "Only numeric values are allowed.",
      }));
    }
  };

  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter, arrow keys, and decimal point
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Escape" ||
      e.key === "Enter" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "."
    ) {
      return;
    }

    // Prevent any non-numeric key (except control keys)
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value.trimStart();
    const today = new Date();
    const CurrentYear = today.getFullYear();
    const [year, month, day] = value.split("-");
    let errorMsg = "";

    if (year && (year.length !== 4 || parseInt(year) > CurrentYear)) {
      errorMsg =
        "Year should be 4 digits and not greater than the current year.";
    }
    // Validate month (1-12)
    if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
      errorMsg = "Month should be between 1 and 12.";
    }

    // Validate day based on the number of days in the month and year
    const maxDays = getDaysInMonth(month, year);
    if (day && (parseInt(day) < 1 || parseInt(day) > maxDays)) {
      errorMsg = `Day should be between 1 and ${maxDays} for the selected month and year.`;
    }

    if (name === "email") {
      newValue = value.replace(/\s+/g, "").toLowerCase();
    }

    if (value === "0") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        studentClass: "Zero is not allowed as a valid entry.",
      }));
      return; // Prevent further processing
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  // Function to detect the user's location using the Geolocation API
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
              const exactLocation = `${suburb}, ${city}, ${state}, ${country},${postcode}`;
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

  // Handle the onFocus event to detect location when the input is focused
  const handleFocus = () => {
    if (!isLocationDetected) {
      detectLocation();
    }
  };

  //validate first Name
  const handleNameChar = (e) => {
    const key = e.key;
    const value = e.target.value;

    const nameRegex = /^[A-Za-z]/;
    let newError = {};

    if ((value === "" && key === " ") || !/[a-zA-Z\s]/.test(key)) {
      e.preventDefault();
    } else if (!nameRegex.test(value)) {
      newError.Organizationname = "Must start with a Character";
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      e.target.value = value.replace(/\s+/g, "");
    }
  };

  const validate = () => {
    const newErrors = {};
    //first Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = "First Name must be at least 3 characters";
    }
    //last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "last Name is required";
    } else if (formData.lastName.trim().length < 3) {
      newErrors.lastName = "Last Name must be at least 3 characters";
    }
    const emailRegex =
      /^(?!\d)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@(gmail|yahoo|outlook|hotmail|example|sai)\.(com|net|org|in|edu|gov|mil|us|info|org\.in)$/;

    if (!formData.emailId) {
      newErrors.emailId = "emailId is required";
    } else if (!emailRegex.test(formData.emailId)) {
      newErrors.emailId = "Invalid email format";
    }
    //phoneNumber
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number must be 10 digits and start with 6-9";
    }

    //board
    if (!formData.board.trim()) {
      newErrors.board = "Board is required";
    } else if (formData.board.length < 2) {
      newErrors.board = "Board Name must be at least 3 characters";
    }

    //school/college
    if (!formData.institution.trim()) {
      newErrors.institution = "School/college is required";
    } else if (formData.institution.trim().length < 3) {
      newErrors.institution =
        "School/College Name must be at least 3 characters";
    }

    //date of birth
    if (!formData.dob.trim()) {
      newErrors.dob = "Date of Birth is required";
    }

    //location
    if (!formData.location.trim()) {
      newErrors.location = "location is required";
    }

    //gender
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    //studying class
    if (!formData.studentClass.trim()) {
      newErrors.studentClass = "Studying Class is required";
    }
    //category
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    //Subject
    if (!formData.subjectsLookingFor.trim()) {
      newErrors.subjectsLookingFor = "Subject tuition looking for is required";
    } else if (formData.subjectsLookingFor.length < 2) {
      newErrors.subjectsLookingFor =
        "SubsubjectsLookingForject Name must be at least 2 characters";
    }

    //mode of teaching
    if (!formData.modeOfTeaching.trim()) {
      newErrors.modeOfTeaching = "Mode of teaching is required";
    }

    //affordability
    if (typeof formData.affordablity === "string") {
      if (!formData.affordablity.trim()) {
        newErrors.affordablity = "Affordability is required";
      }
    } else if (!formData.affordablity || formData.affordablity <= 0) {
      newErrors.affordablity = "Affordability must be greater than zero";
    }

    //timings
    if (!formData.availableTimings.trim()) {
      newErrors.availableTimings = "timings is required";
    }

    return newErrors;
  };

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className="bg-gray-100 mt-22 pt-20 bg-gradient-to-r from-gray-200 to-blue-300 ...">
      <div className="w-[650px]  mx-auto  border border-gray-400  p-4  mt-9">
        <div>
          <p>
            <strong className="text-red-500 text-shadow-default">Note: </strong>
            <a
              className="text-blue-600 text-shadow-default hover:underline cursor-pointer"
              onClick={handleOpenModal} // Open modal on click
            >
              Terms and Conditions
            </a>
          </p>
        </div>
        <h2 className="text-2xl font-bold text-center mt-8 text-gray-800 text-shadow-default mb-6">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex ">
            {/* ---------first Name------------ */}
            <div className="my-2 relative">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                minLength={3}
                maxLength={20}
                name="firstName"
                onChange={handleChange}
                onKeyDown={handleNameChar}
                value={formData.firstName}
                placeholder="Enter your First Name"
                className={`w-[300px] py-2  px-2 mt-2 bg-transparent mr-6 border border-gray-500 outline-none  ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              ></input>
              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName}</span>
              )}
            </div>

            {/* ------------Last Name--------------- */}

            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                minLength={3}
                maxLength={20}
                name="lastName"
                onChange={handleChange}
                onKeyDown={handleNameChar}
                value={formData.lastName}
                placeholder="Enter your Last Name"
                className={`w-[300px] py-2 px-2 mt-2 bg-transparent mr-6 border border-gray-500 outline-none  ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              ></input>
              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            {/* --------------Email-------------------- */}
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Email Id
              </label>
              <input
                type="emailId"
                id="emailId"
                name="emailId"
                maxLength={45}
                value={formData.emailId}
                onChange={handleChange}
                onInput={handleInput}
                placeholder="Enter your Email Id"
                className={`w-[300px] py-2 mt-2 bg-transparent px-2 border border-gray-500 outline-none  ${
                  errors.emailId ? "border-red-500" : ""
                }`}
              ></input>
              {errors.emailId && (
                <span className="text-red-500 text-sm">{errors.emailId}</span>
              )}
            </div>

            {/* --------------Phone Number---------------------- */}
            <div className="pr-3 mt-2">
              <label className=" float-start  text-sm font-medium text-gray-900 text-shadow-default">
                Mobile Number
              </label>
              <div className="flex float-start">
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
                      backgroundColor:'transparent',                    
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      display: "none",
                    }),
                    indicatorSeparator: () => null,
                  }}
                  className="border mt-2 bg-transparent border-gray-500  outline-none"
                />

                <input
                  maxLength={10}
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your Mobile Number"
                  value={personInfo.phone || ""}
                  disabled={!selectedCountry}
                  onChange={(e) => {
                    const inputvalue = e.target.value.replace(/[^0-9]/g, "");
                    setPersonInfo({ ...personInfo, phone: inputvalue });
                    setFormData({ ...formData, phoneNumber: inputvalue });
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
                  className={`w-[225px] mt-2 bg-transparent px-4 py-4 border border-gray-500 outline-none   ${
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

          {/* ------------Date of birth------------------ */}
          <div className="flex gap-6">
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
               
                max={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 4) - 1
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
                className={`w-[300px] py-2 px-2 mt-2 bg-transparent border border-gray-500 outline-none  ${
                  errors.dob ? "border-red-500" : ""
                }`}
                onKeyDown={(e) => e.preventDefault()}
              ></input>
              {errors.dob && (
                <span className="text-red-500 text-sm">{errors.dob}</span>
              )}
            </div>

            {/* -----------------Location-------------------------- */}
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Enter your Current Location"
                className={`w-[300px] py-2 px-2 mt-2 bg-transparent border border-gray-500 outline-none  ${
                  errors.location ? "border-red-500" : ""
                }`}
              ></input>
              {errors.location && (
                <span className="text-red-500 text-sm">{errors.location}</span>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            {/* ----------Gender------------ */}
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-[300px] py-2 border mt-2 bg-transparent border-gray-500 outline-none "
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-sm">{errors.gender}</span>
              )}
            </div>

            {/* ----------Studying class--------------- */}
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Studying Class
              </label>
              <input
                type="text"
                id="studentClass"
                name="studentClass"
                value={formData.studentClass}
                onChange={handleStudyingClassChange}
                placeholder="Enter your Standard/Class"
                className={`w-[300px] py-2 px-2 mt-2 bg-transparent border border-gray-500 outline-none  ${
                  errors.studentClass ? "border-red-500" : ""
                }`}
              ></input>
              {errors.studentClass && (
                <span className="text-red-500 text-sm">
                  {errors.studentClass}
                </span>
              )}
            </div>
          </div>

          {/* -----------------Board and School/College------------------------- */}
          <div className="flex gap-6">
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Board
              </label>
              <input
                type="text"
                id="board"
                name="board"
                value={formData.board}
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                onKeyDown={handleNameChar}
                placeholder="Enter your Board"
                className={`w-[300px] py-2 px-2 border mt-2 bg-transparent border-gray-500 outline-none  ${
                  errors.board ? "border-red-500" : ""
                }`}
              ></input>
              {errors.board && (
                <span className="text-red-500 text-sm">{errors.board}</span>
              )}
            </div>
            {/* --------school--------- */}
            <div className="my-2">
              <label className="float-start  text-sm font-medium text-gray-900 text-shadow-default">
                School/institution
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                maxLength={50}
                onKeyDown={handleNameChar}
                onChange={handleChange}
                placeholder="Enter your School/institution"
                className={`w-[300px] py-2 px-2 mt-2 bg-transparent border border-gray-500 outline-none  ${
                  errors.institution ? "border-red-500" : ""
                }`}
              ></input>
              {errors.institution && (
                <span className="text-red-500 text-sm">
                  {errors.institution}
                </span>
              )}
            </div>
          </div>

          {/* ---------------Subject and Teaching--------------------- */}
          <div className="flex gap-6">
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Subjects tuition looking for
              </label>
              <input
                type="text"
                name="subjectsLookingFor"
                placeholder="Enter Subject you are Looking for"
                value={formData.subjectsLookingFor}
                maxLength={50}
                onChange={handleSubjectChange}
                // onKeyDown={handleNameChar}
                className={`w-[300px] py-2 px-2 mt-2 bg-transparent border border-gray-500 outline-none  ${
                  errors.subjectsLookingFor ? "border-red-500" : ""
                }`}
              />
              {errors.subjectsLookingFor && (
                <span className="text-red-500 text-sm">
                  {errors.subjectsLookingFor}
                </span>
              )}
            </div>
            {/* ----------mode of teaching----------- */}
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Mode of Teaching
              </label>
              <select
                name="modeOfTeaching"
                value={formData.modeOfTeaching}
                onChange={handleChange}
                className="w-[300px] py-2 border border-gray-700 mt-2 bg-transparent text-gray-900 text-shadow-default outline-none "
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

          {/* -------------affordability and timings----------------- */}
          <div className="flex gap-6">
            <div className="my-2">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Your Affordability per month
              </label>
              <input
                type="text"
                name="affordablity"
                placeholder="Your affordability per month"
                value={formData.affordablity}
                onChange={handleAffordChange}
                onKeyDown={handleKeyDown}
                maxLength={7}
                className={`w-[300px] py-2 px-2 mt-2 bg-transparent border border-gray-500 outline-none  ${
                  errors.affordablity ? "border-red-500" : ""
                }`}
              />
              {errors.affordablity && (
                <span className="text-red-500 text-sm">
                  {errors.affordablity}
                </span>
              )}
            </div>

            {/* timing slots */}
            <div className="my-3">
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Available Time slots
              </label>
              <select
                name="availableTimings"
                value={formData.availableTimings}
                onChange={handleChange}
                className={`w-[300px] py-1.5 mt-2 bg-transparent border border-gray-500 outline-none  ${
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
          <div>
            <div>
              <label className="float-start text-sm font-medium text-gray-900 text-shadow-default">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="Text Here...."
                value={formData.category}
                onChange={handleChange}
                maxLength={30}
                className={`w-[300px]  mr-[1000px] mt-2 bg-transparent py-2 px-2 border border-gray-500 outline-none  ${
                  errors.category ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex justify-end mb-4">
              <button
                type="submit"
                className="w-full mt-10 bg-cyan-600 text-gray-900 text-shadow-defaultfont-bold py-2 rounded-lg  hover:bg-blue-500"
                // onClick={handleCreatePassword}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
            </div>
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
              <Slide6  />
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default StudentRegister;
