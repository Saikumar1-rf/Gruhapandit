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
  const [successMessage, setSuccessMessage] = useState("");


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
        
        // You can add logic here to submit the form data to your backend
        console.log(formData);
        
        // Reset form after submission
        setFormData({
          name: '',
          subject: '',
          description: '',
          image: null,
        });
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
                  className="mt-2 w-full bg-blue-600 text-white font-bold py-2 px-2 rounded hover:bg-blue-700 transition duration-200"
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
              successMessage={successMessage}

            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
