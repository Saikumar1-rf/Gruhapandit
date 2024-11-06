import React, { useState, useEffect } from "react";
import { AiTwotoneProfile } from "react-icons/ai";
import { FaEnvelope, FaBell } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
import axiosInstance from "./AxiosInstance";


const CreatePosts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
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
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z](?:[A-Za-z\s]*)$/;
    const subjectRegex = /^[A-Za-z0-9][A-Za-z0-9\s,]*$/;

    if (!formData.firstName) newErrors.firstName = "Name is required";
    else if (!nameRegex.test(formData.firstName))
      newErrors.firstName = "Name can only contain letters and spaces";

    if (selectedRole === "student") {
      if (!formData.subjectsLookingFor)
        newErrors.subjectsLookingFor = "Subject is required";
      else if (!subjectRegex.test(formData.subjectsLookingFor))
        newErrors.subjectsLookingFor =
          "Subject can only contain letters, numbers, spaces, and commas";
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
            "https://hrms-repository-gruhabase.onrender.com/tuition-application/studentAdvertisement/create";
          payload = {
            firstName: formData.firstName,
            subjectsLookingFor: formData.subjectsLookingFor,
            modeOfTeaching: formData.modeOfTeaching,
            availableTimings: formData.availableTimings,
          };
        } else if (selectedRole === "tutor") {
          url =
            "https://hrms-repository-gruhabase.onrender.com/tuition-application/tutorAdvertisement/create";
          payload = {
            firstName: formData.firstName,
            subjectsYouAreExpertAt: formData.subjectsYouAreExpertAt,
            modeOfTeaching: formData.modeOfTeaching,
            availableTimings: formData.availableTimings,
          };
        }

        const response = await axiosInstance.post(url, payload);
        console.log("Form submitted successfully:", response.data);
        togglePopup("");
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  useEffect(() => {
    const today = new Date();
    const options = { month: "short", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div>
      <div className="h-screen flex mt-20">
        <div
          className="bg-gray-200 w-2/5
        
        sm:w-1/5 min-h-screen text-black"
        >
          <div className="p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Admin Dashboard
            </h2>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/posts"
                  className="hover:text-blue-300 text-sm sm:text-base"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/allposts"
                  className="hover:text-blue-300 text-sm sm:text-base"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-300 text-sm sm:text-base"
                >
                  Create Posts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <header className="bg-blue-200 flex items-center h-14 justify-end px-4 sm:px-10 py-2">
            {/* <h1 className="text-black text-lg sm:text-xl font-bold">
              Dashboard
            </h1> */}
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-black w-5 h-5" />
              <FaBell className="text-black w-5 h-5" />
              <div className="relative flex items-center" ref={dropdownRef}>
                <IoSettings
                  className="text-black-400 h-5 w-5 cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isOpen && (
                  <div className="absolute right-0 mt-14 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link
                      to="/register/term"
                      className="block px-4 py-2 hover:bg-blue-100"
                      onClick={closeDropdown}
                    >
                      Policy
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 hover:bg-blue-100"
                      onClick={closeDropdown}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="flex justify-center mt-8 space-x-4 flex-wrap">
            <button
              onClick={() => togglePopup("student")}
              className="bg-blue-600 text-white py-2 px-4 rounded flex items-center mb-2"
            >
              <AiTwotoneProfile className="text-2xl mr-2" /> Students
            </button>
            <button
              onClick={() => togglePopup("tutor")}
              className="bg-blue-600 text-white py-2 px-4 rounded flex items-center mb-2"
            >
              <AiTwotoneProfile className="text-2xl mr-2" /> Teachers
            </button>
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-11/12 sm:w-1/2 max-h-[80vh] h-auto p-4 bg-white shadow-lg border-4 rounded-lg relative overflow-y-auto">
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
                <label className='block'>{selectedRole === 'student' ? 'Subject' : 'Subject'}:</label>
                <input
                  type='text'
                  id={selectedRole === 'student' ? 'subjectsLookingFor' : 'subjectsYouAreExpertAt'}
                  maxLength='30'
                  placeholder={selectedRole === 'student' ? 'subject' : 'subject'}
                  className={`border-2 border-black w-full p-2 ${errors[selectedRole === 'student' ? 'subjectsLookingFor' : 'subjectsYouAreExpertAt'] ? 'border-red-500' : ''}`}
                  value={selectedRole === 'student' ? formData.subjectsLookingFor : formData.subjectsYouAreExpertAt}
                  onChange={handleInputChange}
                />
                {errors[selectedRole === 'student' ? 'subjectsLookingFor' : 'subjectsYouAreExpertAt'] && <p className='text-red-500 text-sm'>{errors[selectedRole === 'student' ? 'subjectsLookingFor' : 'subjectsYouAreExpertAt']}</p>}
              </div>
                  <div>
                    <label className="block">Mode of Teaching:</label>
                    <input
                      type="text"
                      id="modeOfTeaching"
                      maxLength="30"
                      placeholder="online/offline"
                      className={`border-2 border-black w-full p-2 ${
                        errors.modeOfTeaching ? "border-red-500" : ""
                      } mb-4`}
                      value={formData.modeOfTeaching}
                      onChange={handleInputChange}
                    />
                    {errors.modeOfTeaching && (
                      <p className="text-red-500 text-sm">
                        {errors.modeOfTeaching}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block">Available Timings:</label>
                    <input
                      type="text"
                      id="availableTimings"
                      maxLength="30"
                      placeholder="timing"
                      className={`border-2 border-black w-full p-2 ${
                        errors.availableTimings ? "border-red-500" : ""
                      }`}
                      value={formData.availableTimings}
                      onChange={handleInputChange}
                    />
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
    </div>
  );
};

export default CreatePosts;
