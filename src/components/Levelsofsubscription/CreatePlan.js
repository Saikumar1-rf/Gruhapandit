import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../AxiosInstance";

const CreatePlan = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    duration: 0,
    featureIds: [],
    active: true,
  });

  const [plans, setPlans] = useState([]);
  const [features, setFeatures] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [featuresFetched, setFeaturesFetched] = useState(false);
  const plansFetched = useRef(false);

  useEffect(() => {
    fetchFeatures();

    if (!plansFetched.current) {
      fetchPlans();  // Fetch active plans on mount
      plansFetched.current = true;
    }
  }, []);

  const fetchFeatures = async () => {
    if (featuresFetched) return;

    try {
      const response = await axiosInstance.get(
        "/tuition-application/feature/all"
      );
      const activeFeatures = response.data.filter((feature) => feature.active);
      setFeatures(activeFeatures);
      setFeaturesFetched(true);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axiosInstance.get(
        "/tuition-application/plans/active"  // Fetch active plans
      );
      setPlans(response.data);  // Update the state with the fetched active plans
    } catch (error) {
      console.error("Error fetching active plans:", error);  // Adjust error message
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Trim leading spaces from the input fields for name and description
    const trimmedValue = value.replace(/^\s+/g, ''); // Remove leading spaces

    setFormData({ ...formData, [name]: trimmedValue });
  };


  const handleFeatureChange = (e) => {
    const selectedFeatureId = e.target.value;
    if (selectedFeatureId && !formData.featureIds.includes(selectedFeatureId)) {
      setFormData({
        ...formData,
        featureIds: [...formData.featureIds, selectedFeatureId],
      });
    }
  };

  const handleFeatureRemove = (featureId) => {
    const updatedFeatureIds = formData.featureIds.filter(
      (id) => id !== featureId
    );
    setFormData({ ...formData, featureIds: updatedFeatureIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      id: formData.id,
      name: formData.name,
      price: formData.price,
      duration: formData.duration,
      featureIds: formData.featureIds,
      active: formData.active,
    };

    try {
      if (editingIndex !== null) {
        await axiosInstance.patch(
          `/tuition-application/plans/update`,
          requestBody
        );
        const updatedPlans = [...plans];
        // updatedPlans[editingIndex] = requestBody;
        // setPlans(updatedPlans);

        setEditingIndex(null);
      } else {
        await axiosInstance.post(
          "/tuition-application/plans/create",
          requestBody
        );
        // setPlans([...plans, requestBody]);
    
      }
      fetchPlans()
      setModalOpen(false);
      setFormData({
        name: "",
        price: 0,
        duration: 0,
        featureIds: [],
        active: true,
      });
    } catch (error) {
      console.error("Error submitting plan:", error);
    }
  };

  const handleEdit = (index) => {
    const planToEdit = plans[index];

    // Extract feature IDs from the plan's features
    const featureIds = planToEdit.features
      ? planToEdit.features.map((f) => f.id)
      : [];

    setFormData({
      id: planToEdit.id,
      name: planToEdit.name,
      price: planToEdit.price,
      duration: planToEdit.duration,
      featureIds,
      active: planToEdit.active,
    });

    setEditingIndex(index);
    setModalOpen(true);
    fetchFeatures();
  };

  const handleDelete = async (index) => {
    const planToDelete = plans[index];
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
    try {
      await axiosInstance.delete(
        `/tuition-application/plans/delete/${planToDelete.id}`
      );
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const availableFeatures = features.filter(
    (feature) => !formData.featureIds.includes(feature.id)
  );

  const handleFeatureDelete = (deletedFeatureId) => {
    // Remove the deleted feature from all plans
    const updatedPlans = plans.map((plan) => ({
      ...plan,
      featureIds: plan.featureIds.filter((id) => id !== deletedFeatureId),
    }));

    setPlans(updatedPlans);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end">
      <button
        className="px-4 py-2 bg-black text-white rounded-md"
        onClick={() => setModalOpen(true)}
      >
        Create Plan
      </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
            <h2 className="text-lg font-bold mb-4">
              {editingIndex !== null ? "Edit Plan" : "Create Plan"}
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
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Duration (months)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Features</label>
                <select
                  className="w-full p-2 border rounded-md"
                  onChange={handleFeatureChange}
                  value=""
                >
                  <option value="">Select Features</option>
                  {availableFeatures.length > 0 ? (
                    availableFeatures.map((feature) => (
                      <option key={feature.id} value={feature.id}>
                        {feature.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No features available</option>
                  )}
                </select>
              </div>
              <div className="mt-2">
                {formData.featureIds.length > 0 && (
                  <ul className="list-disc pl-5">
                    {formData.featureIds.map((featureId, index) => {
                      const feature = features.find((f) => f.id === featureId);
                      return (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex items-center justify-between"
                        >
                          {feature ? feature.name : "Feature not found"}
                          <button
                            type="button"
                            className="ml-2 text-red-500"
                            onClick={() => handleFeatureRemove(featureId)}
                          >
                            X
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
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
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black  text-white rounded-md"
                >
                  {editingIndex !== null ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Duration</th>
              <th className="border px-4 py-2">Features</th>
              <th className="border px-4 py-2">Active</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length > 0 ? (
              plans.map((plan, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{plan.name}</td>
                  <td className="border px-4 py-2">{plan.price}</td>
                  <td className="border px-4 py-2">{plan.duration}</td>
                  <td className="border px-4 py-2">
                    {plan.features ? plan.features.length : 0
                      ? plan.features.map((feature, featureIndex) => (
                          <span key={featureIndex}>{feature.name}, </span>
                       ))
                      : "No features available"}
                  </td>
                  <td className="border px-4 py-2">
                    {plan.active ? "Yes" : "No"}
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No plans available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatePlan;
