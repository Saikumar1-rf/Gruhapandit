import React, { useState, useEffect } from "react";
import axiosInstance from "../AxiosInstance";
import { FaCheckCircle } from "react-icons/fa"; // Optional icon for features

const PricingMain = () => {
  const [activePlans, setActivePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivePlans = async () => {
    try {
      const response = await axiosInstance.get(
        "/tuition-application/plans/active"
      );
      setActivePlans(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching active plans:", err);
      setError("Failed to fetch active plans.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePlans();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-16">
      <h1 className="text-3xl font-extrabold mb-12 text-center text-gray-800">
        Available Pricing Plans
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {activePlans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105 bg-white"
          >
            {/* Updated the plan name container to have full width bg */}
            <div className="bg-black w-full -mx-2 px-6 py-2 rounded-sm">
              <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
            </div>
            <p className="text-lg font-medium text-gray-700 mb-4">
              ₹{plan.price} <span className="text-sm text-gray-500"></span>
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold text-gray-800">Duration:</span> {plan.duration} months
            </p>
            
            {/* Features List with Descriptions */}
            <div className="text-gray-700 mb-4">
              <strong className="text-gray-800">Features:</strong>
              <ul className="list-disc pl-5 mt-2">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start mt-1 text-gray-600">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <div>
                      <div className="font-semibold">{feature.name}</div>
                      <div className="text-sm text-gray-500">{feature.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <button className="bg-black text-white py-2 px-6 rounded-lg shadow-m transition duration-300 ease-in-out">
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingMain;