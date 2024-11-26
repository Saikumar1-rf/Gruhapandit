import React, { useState, useEffect } from 'react';


const LevelsOfSubscription = () => {
  const [plans, setPlans] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // For tracking which plan is being edited

  const [fields, setFields] = useState({
    name: '',
    price: '',
    duration: '',
    active: '',
  });
  const [selectOption, setSelectOption] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);

  // Load plans from localStorage
  useEffect(() => {
    const storedPlans = localStorage.getItem('plans');
    if (storedPlans) {
      setPlans(JSON.parse(storedPlans));
    }
  }, []);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('plans', JSON.stringify(plans));
  }, [plans]);

  const handleAddOption = () => {
    if (selectOption) {
      setSelectedValues([...selectedValues, selectOption]);
      setSelectOption('');
    }
  };

  const handleDeleteOption = (index) => {
    const updatedValues = selectedValues.filter((_, i) => i !== index);
    setSelectedValues(updatedValues);
  };

  const handleSubmit = () => {
    const newPlan = {
      planName: fields.name,
      price: fields.price,
      duration: fields.duration,
      active: fields.active,
      featureCount: selectedValues.join(', '),
    };

    if (editIndex !== null) {
      // Update existing plan
      const updatedPlans = [...plans];
      updatedPlans[editIndex] = newPlan;
      setPlans(updatedPlans);
    } else {
      // Add new plan
      setPlans([...plans, newPlan]);
    }

    handleCancel();
    setShowPopup(false);
  };

  const handleCancel = () => {
    setFields({ name: '', price: '', duration: '', active: '' });
    setSelectedValues([]);
    setSelectOption('');
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const plan = plans[index];
    setFields({
      name: plan.planName,
      price: plan.price,
      duration: plan.duration,
      active: plan.active,
    });
    setSelectedValues(plan.featureCount.split(', '));
    setEditIndex(index);
    setShowPopup(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Plans and Subscription</h1>

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
                <td className="border border-gray-300 px-4 py-2">{plan.planName}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.duration}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.price}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.active}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.featureCount}</td>
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
            <h2 className="text-xl font-semibold mb-4">{editIndex !== null ? 'Edit Plan' : 'Create Plan'}</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Plan Name"
                value={fields.name}
                onChange={(e) => setFields({ ...fields, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={fields.price}
                onChange={(e) => setFields({ ...fields, price: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Duration"
                value={fields.duration}
                onChange={(e) => setFields({ ...fields, duration: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Active Status"
                value={fields.active}
                onChange={(e) => setFields({ ...fields, active: e.target.value })}
                className="w-full p-2 border rounded"
              />

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

export default LevelsOfSubscription;
