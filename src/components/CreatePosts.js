import React, { useState, useEffect } from "react";
import { AiTwotoneProfile } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosInstance";
import Postsdash from "./Postsdash";
import Sidebar from "./Sidebar";

const CreatePosts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    subjectsLookingFor: "",
    subjectsYouAreExpertAt: "",
    modeOfTeaching: "",
    location: "",
    availableTimings: "",
  });
  const [errors, setErrors] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const togglePopup = (role) => {
    setSelectedRole(role);
    setShowPopup((prev) => !prev);
    if (!showPopup) {
      setFormData({
        firstName: "",
        subjectsLookingFor: "",
        subjectsYouAreExpertAt: "",
        modeOfTeaching: "",
        location: "",
        availableTimings: "",
      });
      setErrors({});
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Prevent the first character from being a space
    const trimmedValue = value.startsWith(" ") ? value.trimStart() : value;

    setFormData((prevData) => ({
      ...prevData,
      [id]: trimmedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z](?:[A-Za-z\s]*)$/;
    const subjectRegex = /^[A-Za-z0-9][A-Za-z0-9\s,.+#]*$/;

    if (!formData.firstName) newErrors.firstName = "Name is required";
    else if (!nameRegex.test(formData.firstName))
      newErrors.firstName = "Name can only contain letters and spaces";

    if (selectedRole === "student") {
      if (!formData.subjectsLookingFor) {
        newErrors.subjectsLookingFor = "Subject is required";
      } else if (!subjectRegex.test(formData.subjectsLookingFor)) {
        newErrors.subjectsLookingFor =
          "Subject can only contain letters, numbers, spaces, commas, plus signs (+), and periods (.)";
      }
    }
    if (selectedRole === "tutor") {
      if (!formData.subjectsYouAreExpertAt)
        newErrors.subjectsYouAreExpertAt = "Expertise is required";
      else if (!subjectRegex.test(formData.subjectsYouAreExpertAt))
        newErrors.subjectsYouAreExpertAt =
          "Expertise can only contain letters, numbers, spaces, and commas";
    }

    if (!formData.modeOfTeaching)
      newErrors.modeOfTeaching = "Mode of teaching/class is required";
    if (!formData.availableTimings)
      newErrors.availableTimings = "Timing is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        let payload = {};
        let url = "";

        if (selectedRole === "student") {
          url =
            "https://tution-application-testenv.onrender.com/tuition-application/studentAdvertisement/create";
            // "https://tution-application.onrender.com/tuition-application/studentAdvertisement/create";
          payload = {
            firstName: formData.firstName,
            subjectsLookingFor: formData.subjectsLookingFor,
            modeOfTeaching: formData.modeOfTeaching,
            availableTimings: formData.availableTimings,
          };
        } else if (selectedRole === "tutor") {
          url =
            "https://tution-application-testenv.onrender.com/tuition-application/tutorAdvertisement/create";
            // "https://tution-application.onrender.com/tuition-application/tutorAdvertisement/create";
          payload = {
            firstName: formData.firstName,
            subjectsYouAreExpertAt: formData.subjectsYouAreExpertAt,
            modeOfTeaching: formData.modeOfTeaching,
            availableTimings: formData.availableTimings,
          };
        }

        const response = await axiosInstance.post(url, payload);
      
        setSuccessMessage("Data submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 1000); 
        togglePopup("");
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
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

  useEffect(() => {
    const today = new Date();
    const options = { month: "short", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenPolicy = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-row'>
    <Sidebar/>

        <div className="flex-1 flex flex-col">
          <Postsdash />

{successMessage && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg text-center">
      {successMessage}
    </div>
  </div>
)}

          <div className="flex justify-center space-x-4 flex-wrap mb-56 gap-6 mt-5">
            <button
              onClick={() => togglePopup("student")}
              className="bg-blue-600 text-white py-2 px-4 rounded flex items-center"
            >
              <AiTwotoneProfile className="text-2xl mr-2" /> Students
            </button>
            <button
              onClick={() => togglePopup("tutor")}
              className="bg-blue-600 text-white py-2 px-4 rounded flex items-center"
            >
              <AiTwotoneProfile className="text-2xl mr-2" /> Teachers
            </button>
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-11/12 sm:w-1/2 max-h-[100vh] h-auto p-4 bg-white shadow-lg border-4 rounded-lg relative overflow-y-auto">
                <button
                  onClick={() => togglePopup("")}
                  className="absolute top-2 right-2 border-2 border-black px-2"
                >
                  X
                </button>
                <h1 className="text-lg sm:text-xl">
                  Title: Available tuitions for {currentDate}.
                </h1>
                <p>
                  Content:{" "}
                  {selectedRole === "student" ? "Dear Student" : "Dear Tutor"},
                  we are excited to announce available tuitions for{" "}
                  {new Date().getFullYear()}.
                </p>
                <br />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 p-4">
                  <div>
                    <label className="block">Name:</label>
                    <input
                      type="text"
                      id="firstName"
                      maxLength="30"
                      placeholder="name"
                      className={`border-2 border-black w-full p-2 ${
                        errors.firstName ? "border-red-500" : ""
                      } mb-4`}
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block">
                      {selectedRole === "student" ? "Subject" : "Subject"}:
                    </label>
                    <input
                      type="text"
                      id={
                        selectedRole === "student"
                          ? "subjectsLookingFor"
                          : "subjectsYouAreExpertAt"
                      }
                      maxLength="30"
                      placeholder={
                        selectedRole === "student" ? "subject" : "subject"
                      }
                      className={`border-2 border-black w-full p-2 ${
                        errors[
                          selectedRole === "student"
                            ? "subjectsLookingFor"
                            : "subjectsYouAreExpertAt"
                        ]
                          ? "border-red-500"
                          : ""
                      }`}
                      value={
                        selectedRole === "student"
                          ? formData.subjectsLookingFor
                          : formData.subjectsYouAreExpertAt
                      }
                      onChange={handleInputChange}
                    />
                    {errors[
                      selectedRole === "student"
                        ? "subjectsLookingFor"
                        : "subjectsYouAreExpertAt"
                    ] && (
                      <p className="text-red-500 text-sm">
                        {
                          errors[
                            selectedRole === "student"
                              ? "subjectsLookingFor"
                              : "subjectsYouAreExpertAt"
                          ]
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block">Mode of Teaching:</label>
                    <select
                      id="modeOfTeaching"
                      className={`border-2 border-black w-full p-2 ${
                        errors.modeOfTeaching ? "border-red-500" : ""
                      } mb-4`}
                      value={formData.modeOfTeaching}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select a mode
                      </option>
                      <option value="Online Mode">Student Mode</option>
                      <option value="Offline Mode">Tutor Mode</option>
                      <option value="Virtual Mode">Virtual Mode</option>
                    </select>
                    {errors.modeOfTeaching && (
                      <p className="text-red-500 text-sm">
                        {errors.modeOfTeaching}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block">Available Timings:</label>
                    <select
                      id="availableTimings"
                      className={`border-2 border-black w-full p-2 ${
                        errors.availableTimings ? "border-red-500" : ""
                      }`}
                      value={formData.availableTimings}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a time slot</option>
                      {availableTimings.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.availableTimings && (
                      <p className="text-red-500 text-sm">
                        {errors.availableTimings}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default CreatePosts;