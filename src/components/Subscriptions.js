import React, { useState, useEffect } from "react";

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    price: "",
    duration: "",
    active: "",
  });
  
  const [selectOption, setSelectOption] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [errors, setErrors] = useState({});

  // Load plans from localStorage on component mount
  useEffect(() => {
    const storedPlans = JSON.parse(localStorage.getItem("plans")) || [];
    setPlans(storedPlans);
  }, []);

  // Save plans to localStorage whenever plans change
  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);

  // Save plans to localStorage whenever plans change
  useEffect(() => {
    if (plans.length > 0) {
      localStorage.setItem("plans", JSON.stringify(plans));
    }
  }, [plans]);


  const validateForm = () => {
    const newErrors = {};
    if (!fields.name) newErrors.name = "Plan Name is required";
    if (!fields.price) newErrors.price = "Price is required";
    if (!fields.duration) newErrors.duration = "Duration is required";
    if (!fields.active) newErrors.active = "Active status is required";
    if (selectedValues.length === 1)
      newErrors.features = "At least one feature is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 1;
  };

  const handleAddOption = () => {
    if (selectOption && !selectedValues.includes(selectOption)) {
      setSelectedValues([...selectedValues, selectOption]);
      setSelectOption("");
    } else {
      alert("This option is already selected!");
    }
  };


  const handleDeleteOption = (index) => {
    const updatedValues = selectedValues.filter((_, i) => i !== index);
    setSelectedValues(updatedValues);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newPlan = {
      planName: fields.name,
      price: fields.price,
      duration: fields.duration,
      active: fields.active,
      featureIds:["f1","f2"]
    };
    const updatedPlans = [...plans, newPlan];
    setPlans(updatedPlans);
    handleCancel();
    setShowPopup(false);
  };

  const handleEdit = (index) => {
    const plan = plans[index];
    setFields({
      name: plan.planName,
      price: plan.price,
      duration: plan.duration,
      active: plan.active,
    });
    setSelectedValues(plan.featureCount.split(", "));
    setShowPopup(true);

    // Remove the plan temporarily for editing
    setPlans(plans.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setFields({ name: "", price: "", duration: "", active: "" });
    setSelectedValues([]);
    setSelectOption("");
    setErrors({});
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Plans and Subscription
      </h1>

      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
      >
        Create Plan
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Plan Name</th>
              <th className="border border-gray-300 px-4 py-2">Duration</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Active</th>
              <th className="border border-gray-300 px-4 py-2">Feature Count</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {plan.planName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {plan.duration}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {plan.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {plan.active}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {plan.featureCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Creating Plans</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Plan Name"
                value={fields.name}
                onChange={(e) =>
                  setFields({ ...fields, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
              <input
                type="number"
                placeholder="Price"
                value={fields.price}
                onChange={(e) =>
                  setFields({ ...fields, price: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
              <input
                type="number"
                placeholder="Duration"
                value={fields.duration}
                onChange={(e) =>
                  setFields({ ...fields, duration: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              {errors.duration && (
                <p className="text-red-500">{errors.duration}</p>
              )}
              <input
                type="text"
                placeholder="Plan Active Status"
                value={fields.active}
                onChange={(e) =>
                  setFields({ ...fields, active: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              {errors.active && (
                <p className="text-red-500">{errors.active}</p>
              )}
              <div className="flex items-center gap-2">
                <select
                  value={selectOption}
                  onChange={(e) => setSelectOption(e.target.value)}
                  className="flex-1 p-2 border rounded"
                >
                  <option value="">Select a Feature</option>
                  <option value="Feature 1">Feature 1</option>
                  <option value="Feature 2">Feature 2</option>
                  <option value="Feature 3">Feature 3</option>
                </select>
                <button
                  onClick={handleAddOption}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>
              {errors.features && (
                <p className="text-red-500">{errors.features}</p>
              )}
              <div className="space-y-2">
                {selectedValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded"
                  >
                    <span>{value}</span>
                    <button
                      onClick={() => handleDeleteOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  handleCancel();
                  setShowPopup(false);
                }}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-400"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
