import React, { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import gradi from "../Asserts/Step (1).jpg";
import tutions from "../Asserts/tutio.jpg";
import axiosInstance from "./AxiosInstance";
import ProfileDetails from "./ProfileDetails";
import Slide6 from "./Slide6";
import gradi from "../Asserts/user3.jpg";
import gruhapa from "../Asserts/gruhapandit.png";
import DialogueBox from "./DialogueBox";
// import DialogueBox from "./Upload/Dialougebox";

const TutorDash = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [editMode, setEditMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  // const [isProfileOpen,setIsProfileOpen]=useState(false);

  const [dialogueBoxData, setDialogueBoxData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userID = localStorage.getItem('userId')
  const handleOpenPolicy = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const API_URL =
    "https://hrms-repository-gruhabase.onrender.com/tuition-application/userHomePage/";
    // "https://tution-application.onrender.com/tuition-application/userHomePage/"

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(API_URL);
        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data.flatMap((item) => item));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []); 

  
  const userId = localStorage.getItem("userId");
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }

      try {
        const url =
          userType === "student"
            ? `/tuition-application/student/${userId}`
            : `/tuition-application/tutor/${userId}`;

        const response = await axiosInstance.get(url);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId, userType]);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleLogout = async () => {
    try {
      // If there is a backend endpoint to invalidate the token, call it here
      const token = localStorage.getItem("jwtToken");
      if (token) {
        await axiosInstance.post(`/tuition-application/authenticate/logout?emailId=${userData.emailId}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      // Clear local storage and sensitive state
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
  
      // Clear React state to reset user data
      setUserData({});
      setPosts([]);
  
      // Redirect user to the login page
      navigate("/", { replace: true });
    } catch (error) {
      // Proceed with client-side logout even if server logout fails
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
  
      setUserData({});
      setPosts([]);
      navigate("/", { replace: true });
    }
  };
  

  const handleProfileClick = () => {
    setShowProfile(true); // Open the profile modal
  };

  const handleCloseProfile = () => {
    setShowProfile(false); // Close the profile modal
  };

  // const handlePolicyClick = () => {
  //   navigate("/register/term");
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileUpdate = (updatedData) => {
    setUserData(updatedData);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found. Please log in again.");
      return;
    }
    try {
      const url = userType === "student"
        ? "/tuition-application/student/update"
        : "/tuition-application/tutor/update";
 
      await axiosInstance.patch(url, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} details updated successfully!`);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleDialogueBoxSubmit = (data) => {
    setDialogueBoxData(data); // Store the submitted data in the state
    setIsDialogOpen(false); // Close the dialog after submission
  };
  const UserId = localStorage.getItem(userId)
  console.log(UserId);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 sticky">
      <header className="bg-cyan-700 flex items-center h-16 justify-between px-4 md:px-10 py-2 shadow-md relative">
        <img src={gruhapa} alt="Gruha Pandit" className="w-20 md:w-24" />
        <div className="flex items-center space-x-4 text-white ml-auto">
          <FaEnvelope className="w-5 h-5 cursor-pointer" />
          <FaBell className="w-5 h-5 cursor-pointer" />
          <div
            className="relative flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <FaCog className="w-5 h-5" />
            {showDropdown && (
              <div className="absolute right-0 top-14 w-40 bg-white shadow-lg rounded-md">
                <ul className="text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={handleUploadClick}
                  >
                   Upload NationaId
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={handleOpenPolicy}
                  >
                    Policy
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {editMode ? (
        <div className="w-full md:w-3/4 mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Edit {userType.charAt(0).toUpperCase() + userType.slice(1)} Details
          </h2>
          <div className="flex flex-col gap-4">
            <input
              name="firstName"
              value={userData.firstName || ""}
              onChange={handleInputChange}
              placeholder="First Name"
              className="border px-4 py-2 rounded-md"
            />
            <input
              name="lastName"
              value={userData.lastName || ""}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="border px-4 py-2 rounded-md"
            />
           <input
              name={userType === "student" ? "subjectsLookingFor" : "subjectYouAreExpertAt"}
              value={
                userType === "student"
                  ? userData.subjectsLookingFor || ""
                  : userData.subjectYouAreExpertAt || ""
              }
              onChange={handleInputChange}
              placeholder={userType === "student" ? "Subjects Looking For" : "Subjects You Are Expert At"}
              className="border px-4 py-2 rounded-md"
            />

            <button
              onClick={handleUpdate}
              className="bg-cyan-700 text-white px-4 py-2 rounded-md mt-4"
            >
              Update Details
            </button>
          </div>
        </div>
      ) : (
        <>
          <main className="w-full md:w-3/5 mx-auto mt-10 p-3 flex justify-center bg-white">
            <img
              src={gradi}
              alt="Graduation pic"
              className="w-full h-48 md:h-56 object-cover rounded-md"
            />
          </main>
  
          <div className="w-full md:w-3/4 mx-auto mt-6">
            <header className="bg-cyan-700 text-white px-4 py-3 rounded-t-md">
              <h2 className="text-lg font-semibold">Your Required Posts</h2>
            </header>
            <div className="bg-white shadow-md p-6 rounded-b-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {posts.length > 0 ? (
    posts.map((post, index) => (
      <div
        key={index}
        className="border border-cyan-500 p-4 rounded-md shadow-md hover:scale-105 transition-transform h-[300px] flex flex-col justify-between"
      >
        <h4 className="text-lg font-bold text-center">{post.firstName}</h4>
        
        {userType === "tutor" ? (
          <p className="text-sm">
            <strong>Expertise:</strong> {post.subjectsYouAreExpertAt || "N/A"}
          </p>
        ) : (
          <p className="text-sm">
            <strong>Subjects Looking For:</strong> {post.subjectsLookingFor || "N/A"}
          </p>
        )}
        
        <p className="text-sm">
          <strong>Mode of Teaching:</strong> {post.modeOfTeaching}
        </p>
        <p className="text-sm">
          <strong>Timings:</strong> {post.availableTimings}
        </p>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-700">No posts available.</p>
  )}
</div>

        </div>
          </div>
        </>
      )}


{isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white shadow-lg rounded-lg max-w-4xl w-full mx-auto h-[90vh] overflow-y-auto p-8">
            <button
              className="absolute top-3 right-3 text-red-700 font-bold hover:text-red-500 "
              onClick={handleCloseModal}
            >
              X
            </button>
            <Slide6/>
          </div>
        </div>
      )}
  
      {/* Profile Modal */}
      {showProfile && (
        <ProfileDetails
          userData={userData}
          userType={userType}
          onClose={handleCloseProfile}
          onUpdate={handleProfileUpdate} // Pass the update handler
        />
      )}
      {isDialogOpen && <DialogueBox 
          userId = {userID} 
            category="NATIONAL_ID"
            onClose={handleCloseDialog}
             onSubmit={handleDialogueBoxSubmit} 
            //  outevent={(data) => console.log("Callback Data:", data)}
             />}
    </div>
  );
};

export default TutorDash;