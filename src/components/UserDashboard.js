import React, { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import tutions from "../Asserts/tutio.jpg";
import axiosInstance from "./AxiosInstance";
import ProfileDetails from "./ProfileDetails";
import Slide6 from "./Slide6";
import gradi from "../Asserts/user3.jpg";
import gruhapa from "../Asserts/gruhapandit.png";
import DialogueBox from "./DialogueBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import pandit from "../Asserts/oip.jpg";
import pandit1 from "../Asserts/Step (3).png";
import pandit2 from "../Asserts/v68_82.png";
import ReviewsBox from "../components/Reviews/ReviewsBox";
import UserFooter from "./UserFooter";

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
  const userID = localStorage.getItem("userId");

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Open and close review dialog
  const handleOpenReview = () => {
    setIsReviewOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewOpen(false);
  };

  const handleReviewSubmit = (reviewData) => {
    console.log("Review Submitted:", reviewData);
    // You can send the review data to the server here
  };
  const handleOpenPolicy = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dropdownRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const API_URL =
    // "https://hrms-repository-gruhabase.onrender.com/tuition-application/userHomePage/";
    "https://tution-application.onrender.com/tuition-application/userHomePage/";

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
        await axiosInstance.post(
          `/tuition-application/authenticate/logout?emailId=${userData.emailId}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };
  const handleSubmitReview = () => {
    setShowProfile(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileUpdate = (updatedData) => {
    setUserData(updatedData);
  };

  // const handleUpdate = async () => {
  //   const token = localStorage.getItem("jwtToken");
  //   if (!token) {
  //     console.error("No token found. Please log in again.");
  //     return;
  //   }
  //   try {
  //     const url =
  //       userType === "student"
  //         ? "/tuition-application/student/update"
  //         : "/tuition-application/tutor/update";

  //     await axiosInstance.patch(url, userData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     alert(
  //       `${
  //         userType.charAt(0).toUpperCase() + userType.slice(1)
  //       } details updated successfully!`
  //     );
  //     setEditMode(false);
  //   } catch (error) {
  //     console.error("Error updating user data:", error);
  //   }
  // };

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleDialogueBoxSubmit = (data) => {
    setDialogueBoxData(data);
    setIsDialogOpen(false);
  };
  const UserId = localStorage.getItem(userId);
  console.log(UserId);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-cyan-700 flex items-center h-16 justify-between px-4 md:px-10 py-2 shadow-md sticky top-0 z-50">
          <img
            src={gruhapa}
            alt="Gruha Pandit"
            className="w-20 md:w-24 filter invert brightness-0"
          />
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
                <div
                  className="absolute right-0 top-14 w-40 bg-white shadow-lg rounded-md z-50"
                  ref={dropdownMenuRef}
                >
                  <ul className="text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={handleProfileClick}
                    >
                      Profile
                    </li>
                    {userType === "tutor" && (
                      <li
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer z-50"
                        onClick={handleUploadClick}
                      >
                        Upload NationaId
                      </li>
                    )}

                    <li
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={handleOpenReview}
                    >
                      Review
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
              Edit {userType.charAt(0).toUpperCase() + userType.slice(1)}{" "}
              Details
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
                name={
                  userType === "student"
                    ? "subjectsLookingFor"
                    : "subjectYouAreExpertAt"
                }
                value={
                  userType === "student"
                    ? userData.subjectsLookingFor || ""
                    : userData.subjectYouAreExpertAt || ""
                }
                onChange={handleInputChange}
                placeholder={
                  userType === "student"
                    ? "Subjects Looking For"
                    : "Subjects You Are Expert At"
                }
                className="border px-4 py-2 rounded-md"
              />

              <button
                // onClick={handleUpdate}
                className="bg-cyan-700 text-white px-4 py-2 rounded-md mt-4"
              >
                Update Details
              </button>
            </div>
          </div>
        ) : (
          <>
            <main className="w-full md:w-3/5 mx-auto mt-10 p-6 flex flex-col justify-center bg-white rounded-md shadow-md mb-1 transform hover:scale-105 transition-all duration-300 ease-in-out">
              {userData.firstName && userData.lastName ? (
                <div>
                  <h1 className="text-3xl font-semibold text-center text-gray-800 mb-3">
                    Welcome,{" "}
                    <span className="text-blue-500">
                      {" "}
                      {userData.firstName}{" "}
                    </span>
                    <span className="text-blue-500"> {userData.lastName} </span>
                  </h1>
                  <p className="text-center text-gray-600 text-lg">
                    {userType === "tutor"
                      ? "As a tutor, you can manage your posts and connect with students."
                      : "As a student, you can browse available tutors and post your requirements."}
                  </p>
                </div>
              ) : (
                <p className="text-center text-gray-600 text-lg">
                  Loading user data...
                </p>
              )}
            </main>
            <main className="w-full md:w-3/5 mx-auto mt-10 p-6 bg-white rounded-md shadow-md mb-6">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="rounded-md"
                style={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                {[
                  {
                    src: gradi,
                    alt: "Graduation Pic",
                    caption: "Graduation Event",
                  },
                  {
                    src: pandit,
                    alt: "Tuitions Pic",
                    caption: "Tutoring Sessions",
                  },
                  {
                    src: tutions,
                    alt: "Tuitions Pic",
                    caption: "Tutoring Sessions",
                  },
                  {
                    src: pandit1,
                    alt: "Tuitions Pic",
                    caption: "Tutoring Sessions",
                  },
                  {
                    src: pandit2,
                    alt: "Tuitions Pic",
                    caption: "Tutoring Sessions",
                  },
                ].map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-60 sm:h-80 lg:h-96 object-cover rounded-md"
                      />
                      {image.caption && (
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                          {image.caption}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </main>
            <div className="w-full md:w-3/4 mx-auto mt-6 mb-7">
              <header className="bg-cyan-700 text-white px-4 py-3 rounded-t-md">
                <h2 className="text-lg font-semibold">Location:</h2>
              </header>
              <div className="bg-white shadow-md p-6 rounded-b-md">
                {posts.length > 0 ? (
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false,
                    }}
                    modules={[Navigation, Pagination, Autoplay]}
                    className="w-full"
                  >
                    {posts.map((post, index) => (
                      <SwiperSlide key={index}>
                        <div className="border border-cyan-500 p-4 rounded-md shadow-md hover:scale-105 transition-transform h-[300px] flex flex-col justify-between">
                          <h4 className="text-lg font-bold text-center">
                            {post.firstName}
                          </h4>

                          {userType === "tutor" ? (
                            <p className="text-sm">
                              <strong>subjectsLooking For:</strong>
                              {post.subjectsLookingFor || "N/A"}
                            </p>
                          ) : (
                            <p className="text-sm">
                              <strong>Expertise:</strong>
                              {post.subjectsYouAreExpertAt || "N/A"}
                            </p>
                          )}

                          {userType === "tutor" ? (
                            <p className="text-sm">
                              <strong>Mode Of Learning:</strong>
                              {post.modeOfTeaching || "N/A"}
                            </p>
                          ) : (
                            <p className="text-sm">
                              <strong>Mode Of Teaching:</strong>
                              {post.modeOfTeaching || "N/A"}
                            </p>
                          )}
                          <p className="text-sm">
                            <strong>Timings:</strong>{" "}
                            {post.availableTimings || "N/A"}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className="text-center text-gray-700">
                    No posts available.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full md:w-3/4 mx-auto mt-6 mb-7">
              <header className="bg-cyan-700 text-white px-4 py-3 rounded-t-md">
                <h2 className="text-lg font-semibold">Tutors Available To Teach:</h2>
              </header>
              <div className="bg-white shadow-md p-6 rounded-b-md">
                {posts.length > 0 ? (
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false,
                    }}
                    modules={[Navigation, Pagination, Autoplay]}
                    className="w-full"
                  >
                    {posts.map((post, index) => (
                      <SwiperSlide key={index}>
                        <div className="border border-cyan-500 p-4 rounded-md shadow-md hover:scale-105 transition-transform h-[300px] flex flex-col justify-between">
                          <h4 className="text-lg font-bold text-center">
                            {post.firstName}
                          </h4>

                          {userType === "tutor" ? (
                            <p className="text-sm">
                              <strong>subjectsLooking For:</strong>
                              {post.subjectsLookingFor || "N/A"}
                            </p>
                          ) : (
                            <p className="text-sm">
                              <strong>Expertise:</strong>
                              {post.subjectsYouAreExpertAt || "N/A"}
                            </p>
                          )}

                          {userType === "tutor" ? (
                            <p className="text-sm">
                              <strong>Mode Of Learning:</strong>
                              {post.modeOfTeaching || "N/A"}
                            </p>
                          ) : (
                            <p className="text-sm">
                              <strong>Mode Of Teaching:</strong>
                              {post.modeOfTeaching || "N/A"}
                            </p>
                          )}
                          <p className="text-sm">
                            <strong>Timings:</strong>{" "}
                            {post.availableTimings || "N/A"}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p className="text-center text-gray-700">
                    No posts available.
                  </p>
                )}
              </div>
            </div>
            <UserFooter />
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
              <Slide6 />
            </div>
          </div>
        )}

        {isReviewOpen && (
          <ReviewsBox
            userType={userType}
            onClose={handleCloseReview}
            onSubmit={handleReviewSubmit}
          />
        )}

        {showProfile && (
          <ProfileDetails
            userData={userData}
            userType={userType}
            onClose={handleCloseProfile}
            onUpdate={handleProfileUpdate}
          />
        )}
        {isDialogOpen && (
          <DialogueBox
            userId={userID}
            category="NATIONAL_ID"
            onClose={handleCloseDialog}
            onSubmit={handleDialogueBoxSubmit}
            //  outevent={(data) => console.log("Callback Data:", data)}
          />
        )}
      </div>
    </>
  );
};

export default TutorDash;
 

// import React, { useState, useRef, useEffect } from "react";
// import { FaEnvelope, FaBell, FaCog } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import tutions from "../Asserts/tutio.jpg";
// import axiosInstance from "./AxiosInstance";
// import ProfileDetails from "./ProfileDetails";
// import Slide6 from "./Slide6";
// import gradi from "../Asserts/user3.jpg";
// import gruhapa from "../Asserts/gruhapandit.png";
// import DialogueBox from "./DialogueBox";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import pandit from "../Asserts/oip.jpg";
// import pandit1 from "../Asserts/Step (3).png";
// import pandit2 from "../Asserts/v68_82.png";
// import ReviewsBox from "../components/Reviews/ReviewsBox";
// import UserFooter from "./UserFooter";


// const TutorDash = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [userData, setUserData] = useState({});
//   const [userType, setUserType] = useState(localStorage.getItem("userType"));
//   const [editMode, setEditMode] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   // const [isProfileOpen,setIsProfileOpen]=useState(false);

//   const [dialogueBoxData, setDialogueBoxData] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const userID = localStorage.getItem("userId");

//   const [isReviewOpen, setIsReviewOpen] = useState(false);

//   // Open and close review dialog
//   const handleOpenReview = () => {
//     setIsReviewOpen(true);
//   };

//   const handleCloseReview = () => {
//     setIsReviewOpen(false);
//   };

//   const handleReviewSubmit = (reviewData) => {
//     console.log("Review Submitted:", reviewData);
//     // You can send the review data to the server here
//   };
//   const handleOpenPolicy = () => {
//     setIsModalOpen(true);
//   };
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const dropdownRef = useRef(null);
//   const dropdownMenuRef = useRef(null);
//   const navigate = useNavigate();

//   const handleClickOutside = (event) => {
//     if (
//       dropdownRef.current &&
//       !dropdownRef.current.contains(event.target) &&
//       dropdownMenuRef.current &&
//       !dropdownMenuRef.current.contains(event.target)
//     ) {
//       setShowDropdown(false);
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const API_URL =
//     // "https://hrms-repository-gruhabase.onrender.com/tuition-application/userHomePage/";
//     "https://tution-application.onrender.com/tuition-application/userHomePage/";

//   // Fetch posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axiosInstance.get(API_URL);
//         if (response.data && Array.isArray(response.data)) {
//           setPosts(response.data.flatMap((item) => item));
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const userId = localStorage.getItem("userId");

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!userId) {
//         console.error("User ID is undefined");
//         return;
//       }

//       try {
//         const url =
//           userType === "student"
//             ? `/tuition-application/student/${userId}`
//             : `/tuition-application/tutor/${userId}`;

//         const response = await axiosInstance.get(url);
//         setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();
//   }, [userId, userType]);
//   const toggleDropdown = () => setShowDropdown((prev) => !prev);

//   const handleLogout = async () => {
//     try {
//       // If there is a backend endpoint to invalidate the token, call it here
//       const token = localStorage.getItem("jwtToken");
//       if (token) {
//         await axiosInstance.post(
//           `/tuition-application/authenticate/logout?emailId=${userData.emailId}`,
//           null,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       }
//       // Clear local storage and sensitive state
//       localStorage.removeItem("jwtToken");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("userType");

//       // Clear React state to reset user data
//       setUserData({});
//       setPosts([]);

//       // Redirect user to the login page
//       navigate("/", { replace: true });
//     } catch (error) {
//       // Proceed with client-side logout even if server logout fails
//       localStorage.removeItem("jwtToken");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("userType");

//       setUserData({});
//       setPosts([]);
//       navigate("/", { replace: true });
//     }
//   };

//   const handleProfileClick = () => {
//     setShowProfile(true);
//   };

//   const handleCloseProfile = () => {
//     setShowProfile(false);
//   };
//   const handleSubmitReview = () => {
//     setShowProfile(false);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleProfileUpdate = (updatedData) => {
//     setUserData(updatedData);
//   };

//   const handleUpdate = async () => {
//     const token = localStorage.getItem("jwtToken");
//     if (!token) {
//       console.error("No token found. Please log in again.");
//       return;
//     }
//     try {
//       const url =
//         userType === "student"
//           ? "/tuition-application/student/update"
//           : "/tuition-application/tutor/update";

//       await axiosInstance.patch(url, userData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert(
//         `${
//           userType.charAt(0).toUpperCase() + userType.slice(1)
//         } details updated successfully!`
//       );
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };

//   const handleUploadClick = () => {
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//   };
//   const handleDialogueBoxSubmit = (data) => {
//     setDialogueBoxData(data);
//     setIsDialogOpen(false);
//   };
//   const UserId = localStorage.getItem(userId);
//   console.log(UserId);

//   return (
//     <>
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <header className="bg-cyan-700 flex items-center h-16 justify-between px-4 md:px-10 py-2 shadow-md sticky top-0 z-50">
//         <img src={gruhapa} alt="Gruha Pandit" className="w-20 md:w-24 filter invert brightness-0" />
//         <div className="flex items-center space-x-4 text-white ml-auto">
//           <FaEnvelope className="w-5 h-5 cursor-pointer" />
//           <FaBell className="w-5 h-5 cursor-pointer" />
//           <div
//             className="relative flex items-center space-x-2 cursor-pointer"
//             onClick={toggleDropdown}
//             ref={dropdownRef}
//           >
//             <FaCog className="w-5 h-5" />
//             {showDropdown && (
//               <div
//                 className="absolute right-0 top-14 w-40 bg-white shadow-lg rounded-md z-50"
//                 ref={dropdownMenuRef}
//               >
//                 <ul className="text-gray-700">
//                   <li
//                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                     onClick={handleProfileClick}
//                   >
//                     Profile
//                   </li>
//                   {userType === "tutor" && (
//                     <li
//                       className="px-4 py-2 hover:bg-blue-100 cursor-pointer z-50"
//                       onClick={handleUploadClick}
//                     >
//                       Upload NationaId
//                     </li>
//                   )}

//                   <li
//                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                     onClick={handleOpenReview}
//                   >
//                     Review
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                     onClick={handleOpenPolicy}
//                   >
//                     Policy
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-red-500 cursor-pointer"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {editMode ? (
//         <div className="w-full md:w-3/4 mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
//           <h2 className="text-2xl font-semibold text-center mb-6">
//             Edit {userType.charAt(0).toUpperCase() + userType.slice(1)} Details
//           </h2>
//           <div className="flex flex-col gap-4">
//             <input
//               name="firstName"
//               value={userData.firstName || ""}
//               onChange={handleInputChange}
//               placeholder="First Name"
//               className="border px-4 py-2 rounded-md"
//             />
//             <input
//               name="lastName"
//               value={userData.lastName || ""}
//               onChange={handleInputChange}
//               placeholder="Last Name"
//               className="border px-4 py-2 rounded-md"
//             />
//             <input
//               name={
//                 userType === "student"
//                   ? "subjectsLookingFor"
//                   : "subjectYouAreExpertAt"
//               }
//               value={
//                 userType === "student"
//                   ? userData.subjectsLookingFor || ""
//                   : userData.subjectYouAreExpertAt || ""
//               }
//               onChange={handleInputChange}
//               placeholder={
//                 userType === "student"
//                   ? "Subjects Looking For"
//                   : "Subjects You Are Expert At"
//               }
//               className="border px-4 py-2 rounded-md"
//             />

//             <button
//               onClick={handleUpdate}
//               className="bg-cyan-700 text-white px-4 py-2 rounded-md mt-4"
//             >
//               Update Details
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <main className="w-full md:w-3/5 mx-auto mt-10 p-6 flex flex-col justify-center bg-white rounded-md shadow-md mb-1 transform hover:scale-105 transition-all duration-300 ease-in-out">
//             {userData.firstName && userData.lastName ? (
//               <div>
//                 <h1 className="text-3xl font-semibold text-center text-gray-800 mb-3">
//                   Welcome,{" "}
//                   <span className="text-blue-500"> {userData.firstName} </span>
//                   <span className="text-blue-500"> {userData.lastName} </span>
//                 </h1>
//                 <p className="text-center text-gray-600 text-lg">
//                   {userType === "tutor"
//                     ? "As a tutor, you can manage your posts and connect with students."
//                     : "As a student, you can browse available tutors and post your requirements."}
//                 </p>
//               </div>
//             ) : (
//               <p className="text-center text-gray-600 text-lg">
//                 Loading user data...
//               </p>
//             )}
//           </main>
//           <main className="w-full md:w-3/5 mx-auto mt-10 p-6 bg-white rounded-md shadow-md mb-6">
//             <Swiper
//               modules={[Navigation, Pagination, Autoplay]}
//               spaceBetween={20}
//               slidesPerView={1}
//               navigation
//               pagination={{ clickable: true }}
//               autoplay={{
//                 delay: 2000,
//                 disableOnInteraction: false,
//               }}
//               loop={true}
//               className="rounded-md"
//               style={{
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//               }}
//             >
//               {[
//                 {
//                   src: gradi,
//                   alt: "Graduation Pic",
//                   caption: "Graduation Event",
//                 },
//                 {
//                   src: pandit,
//                   alt: "Tuitions Pic",
//                   caption: "Tutoring Sessions",
//                 },
//                 {
//                   src: tutions,
//                   alt: "Tuitions Pic",
//                   caption: "Tutoring Sessions",
//                 },
//                 {
//                   src: pandit1,
//                   alt: "Tuitions Pic",
//                   caption: "Tutoring Sessions",
//                 },
//                 {
//                   src: pandit2,
//                   alt: "Tuitions Pic",
//                   caption: "Tutoring Sessions",
//                 },
//               ].map((image, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="relative">
//                     <img
//                       src={image.src}
//                       alt={image.alt}
//                       className="w-full h-60 sm:h-80 lg:h-96 object-cover rounded-md"
//                     />
//                     {image.caption && (
//                       <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
//                         {image.caption}
//                       </div>
//                     )}
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </main>
//           <div className="w-full md:w-3/4 mx-auto mt-6 mb-7">
//             <header className="bg-cyan-700 text-white px-4 py-3 rounded-t-md">
//               <h2 className="text-lg font-semibold">Your Required Posts</h2>
//             </header>
//             <div className="bg-white shadow-md p-6 rounded-b-md">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {posts.length > 0 ? (
//                   posts.map((post, index) => (
//                     <div
//                       key={index}
//                       className="border border-cyan-500 p-4 rounded-md shadow-md hover:scale-105 transition-transform h-[300px] flex flex-col justify-between"
//                     >
//                       <h4 className="text-lg font-bold text-center">
//                         {post.firstName}
//                       </h4>

//                       {userType === "tutor" ? (
//                             <p className="text-sm">
//                               <strong>subjectsLooking For:</strong>
//                               {post.subjectsLookingFor || "N/A"}
//                             </p>
//                           ) : (
//                             <p className="text-sm">
//                               <strong>Expertise:</strong>
//                               {post.subjectsYouAreExpertAt || "N/A"}
//                             </p>
//                           )}

//                       <p className="text-sm">
//                         <strong>Mode of Teaching:</strong> {post.modeOfTeaching}
//                       </p>
//                       <p className="text-sm">
//                         <strong>Timings:</strong> {post.availableTimings}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-700">
//                     No posts available.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       )}


// <main className="w-full md:w-3/5 mx-auto mt-10 p-6 bg-white rounded-md shadow-md mb-6">
//   <div className="overflow-hidden">
//     <div className="flex space-x-4 animate-scroll pb-4">
//       {[
//         {
//           src: gradi,
//           alt: "Graduation Pic",
//           caption: "Graduation Event",
//         },
//         {
//           src: pandit,
//           alt: "Tuitions Pic",
//           caption: "Tutoring Sessions",
//         },
//         {
//           src: tutions,
//           alt: "Tuitions Pic",
//           caption: "Tutoring Sessions",
//         },
//         {
//           src: pandit1,
//           alt: "Tuitions Pic",
//           caption: "Tutoring Sessions",
//         },
//         {
//           src: pandit2,
//           alt: "Tuitions Pic",
//           caption: "Tutoring Sessions",
//         },
        
//       ].map((image, index) => (
//         <div
//           key={index}
//           className="relative w-[300px] h-[350px] bg-gray-100 border-2 border-gray-300 rounded-md shadow-lg flex flex-col justify-between"
//         >
//           <div className="w-full h-[250px] bg-gray-200 rounded-t-md overflow-hidden">
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="w-full h-full object-cover rounded-t-md"
//             />
//           </div>
//           {image.caption && (
//             <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
//               {image.caption}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// </main>

// <style jsx>{`
//   @keyframes scroll {
//     0% {
//       transform: translateX(0);
//     }
//     100% {
//       transform: translateX(-100%);
//     }
//   }

//   .animate-scroll {
//     animation: scroll 20s linear infinite;
//   }
// `}</style>



//       {isModalOpen && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="relative bg-white shadow-lg rounded-lg max-w-4xl w-full mx-auto h-[90vh] overflow-y-auto p-8">
//             <button
//               className="absolute top-3 right-3 text-red-700 font-bold hover:text-red-500 "
//               onClick={handleCloseModal}
//             >
//               X
//             </button>
//             <Slide6 />
//           </div>
//         </div>
//       )}
    
//       {isReviewOpen && (
//         <ReviewsBox
//           userType={userType}
//           onClose={handleCloseReview}
//           onSubmit={handleReviewSubmit}
//         />
//       )}

//       {showProfile && (
//         <ProfileDetails
//           userData={userData}
//           userType={userType}
//           onClose={handleCloseProfile}
//           onUpdate={handleProfileUpdate}
//         />
//       )}
//       {isDialogOpen && (
//         <DialogueBox
//           userId={userID}
//           category="NATIONAL_ID"
//           onClose={handleCloseDialog}
//           onSubmit={handleDialogueBoxSubmit}
//           //  outevent={(data) => console.log("Callback Data:", data)}
//         />
//       )}
//     </div>
//     <div>
//     <UserFooter/>
//     </div>
//     </>
//   );
// };

// export default TutorDash;
