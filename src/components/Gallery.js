import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Postsdash from "./Postsdash";
import DialogueBox from "./DialogueBox";
import axiosInstance from "./AxiosInstance";

const Gallery = () => {
  // const navigate = useNavigate();
  const userID = localStorage.getItem("userId");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
    image: null,
  });

  const category = "UPLOAD IMAGE";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, subject, description, image } = formData;

    const formDataToUpload = new FormData();
    formDataToUpload.append("userId", userID);
    formDataToUpload.append("fileName", image?.name || "");
    formDataToUpload.append("category", category);
    formDataToUpload.append("name", name);
    formDataToUpload.append("subject", subject);
    formDataToUpload.append("description", description);

    try {
      const response = await axiosInstance.post(
        `/tuition-application/documents/upload-gallery`,
        formDataToUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Postsdash />

        <div className="flex flex-1 items-center justify-center p-4 mb-52">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-center mb-4">
              Submit Information
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <button
                  className="mt-2 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                  onClick={handleUploadClick}
                  type="button"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>

          {isDialogOpen && (
            <DialogueBox
              userId={userID}
              category="GALLERY"
              onClose={handleCloseDialog}
              onSubmit={(data) => console.log("Submitted data:", data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;


// import React, { useEffect, useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from './AxiosInstance';
// import DialogueBox from "./DialogueBox";

// const Gallery = () => {
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();


//   const [dialogueBoxData, setDialogueBoxData] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const userID = localStorage.getItem("userId");
  


//   const [formData, setFormData] = useState({
//     name: '',
//     subject: '',
//     description: '',
//     image: null,
//   });
//   const category = 'UPLOAD IMAGE';

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleUploadClick=()=>{
//     setIsDialogOpen(true);
//   }

//   const handleCloseDialog=()=>{
//     setIsDialogOpen(false);
//   }

//   const handleDialogueBoxSubmit = (data) => {
//     setDialogueBoxData(data); // Store the submitted data in the state
//     setIsDialogOpen(false); // Close the dialog after submission
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { name, subject, description, image } = formData;

//     // Create a FormData object to handle file uploads
//     const formDataToUpload = new FormData();
//     formDataToUpload.append('userId', userID);
//     formDataToUpload.append('fileName', image?.name || '');
//     formDataToUpload.append('category', category); // Adjust the category as needed
//     formDataToUpload.append('name', name);
//     formDataToUpload.append('subject', subject);
//     formDataToUpload.append('description', description);
  
//     try {
//       // Make the POST request
//       const response = await axiosInstance.post(
//         `/tuition-application/documents/upload-gallery?userId=${userID}&fileName=${image}&category=${category}&name=${formData.name}&subject=${formData.subject}&description=${formData.description}`,
//         // `https://tution-application.onrender.com/tuition-application/documents/upload-gallery`,
//         formDataToUpload,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add token if required
//           },
//         }
//       );
  
//       console.log('Upload successful:', response.data);
    
//     // Reset form after submission
    
//   } catch (error) {
//     console.error('File upload error:', error);
//     if (error.response && error.response.status === 403) {
//       console.log('Upload failed: Unauthorized access. Check your credentials or permissions.');
//     } else {
//       console.log('Upload failed: An unexpected error occurred.');
//     }
//   }
// };

//   return (
//         <div className="flex flex-col items-center p-4">
//           <h3 className="text-xl font-semibold mb-4">Submit Information</h3>
//           <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
//             <div className="mb-6">
//               <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
//               <button 
//               className='bg-blue-600 text-black font-bold py-2 rounded hover:bg-blue-700 transition duration-200'
//               onChange={handleChange}
//               onClick={handleUploadClick}
//               >
//                 upload
//               </button>
//             </div>

//           </form>

//           {isDialogOpen && (
//         <DialogueBox
//           userId={userID}
//           category="GALLERY"
//           onClose={handleCloseDialog}
//           onSubmit={handleDialogueBoxSubmit}
//           //  outevent={(data) => console.log("Callback Data:", data)}
//         />
//       )}
//         </div>
//   );
// };

// export default Gallery;