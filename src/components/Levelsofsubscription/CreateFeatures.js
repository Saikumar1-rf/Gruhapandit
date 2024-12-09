import React, { useState, useEffect } from "react";
import axiosInstance from "../AxiosInstance";

const CreateFeatures = ({ onFeatureSubmit }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
  });
  const [features, setFeatures] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    fetchFeatures();
  }, []);

  // Fetch all features
  const fetchFeatures = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axiosInstance.get(
        "/tuition-application/feature/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeatures(response.data);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Trim leading spaces from the input fields for name and description
    const trimmedValue = value.replace(/^\s+/g, ''); // Remove leading spaces

    setFormData({ ...formData, [name]: trimmedValue });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      active: true,
    });
  }

  // Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, active } = formData;
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("No JWT token found. Please login again.");
      return;
    }

    try {
      if (editingIndex !== null) {
        // Update existing feature
        const featureId = features[editingIndex].id;
        const response = await axiosInstance.patch(
          `/tuition-application/feature/update?id=${featureId}&name=${name}&description=${description}&active=${active}`,
          {
            name,
            description,
            active,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {

          // const updatedFeature = response.data;
          // const updatedFeatures = [...features];
          // updatedFeatures[editingIndex] = updatedFeature;
          // setFeatures(updatedFeatures);
          setModalOpen(false);  // Close the modal
          setPopupMessage(""); 
          setEditingIndex(null);
          setPopupMessage("Feature successfully updated!");
          setFormData({
            name: "",
            description: "",
            active: true,
          });
          fetchFeatures()
        }
      } else {
        // Create new feature
        const response = await axiosInstance.post(
          `/tuition-application/feature/create?name=${name}&description=${description}&active=${active}`,
          {
            name,
            description,
            active,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // const newFeature = response.data;
          // setFeatures([...features, newFeature]);
          // onFeatureSubmit(newFeature);
          setModalOpen(false);  // Close the modal
          setPopupMessage(""); 
          setFormData({
            name: "",
            description: "",
            active: true,
          });
          setPopupMessage("Feature successfully created!");
          fetchFeatures();
        }
      }
      

      // Automatically close modal and clear popup message after 1 seconds
      setTimeout(() => {
        setPopupMessage();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (index) => {
    setFormData(features[index]);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem("jwtToken");
    const featureId = features[index].id;

    try {
      const response = await axiosInstance.delete(
        `/tuition-application/feature/delete/${featureId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedFeatures = features.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end">
      <button
        className="px-4 py-2 bg-black text-white rounded-md"
        onClick={() => setModalOpen(true)}
      >
        Add Feature
      </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
            <h2 className="text-lg font-bold mb-4">
              {editingIndex !== null ? "Edit Feature" : "Add Feature"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium">Active</label>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="h-5 w-5"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingIndex(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  {editingIndex !== null ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {popupMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {popupMessage}
        </div>
      )}

      <div className="overflow-x-auto mt-6">
        <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full border text-center">
          <thead className="top-0 bg-gray-200">
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Active</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{feature.name}</td>
                <td className="border px-4 py-2">{feature.description}</td>
                <td className="border px-4 py-2">
                  {feature.active ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-black text-white rounded-md"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default CreateFeatures;
