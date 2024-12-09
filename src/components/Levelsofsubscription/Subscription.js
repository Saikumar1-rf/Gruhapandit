import React, { useState } from "react";
import CreatePlan from "./CreatePlan";
import CreateFeatures from "./CreateFeatures";
import { IoMdArrowRoundBack } from "react-icons/io";

const SubscriptionPlans = () => {
  const [activeTab, setActiveTab] = useState("createPlan");

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg h-screen">
    <button
        onClick={() => window.history.back()}
        className="text-white bg-black flex focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 mb-4 duration-300transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <IoMdArrowRoundBack className="h-5 w-5 mr-2" />
        Back
      </button>
      <h1 className="text-2xl font-bold text-center mb-6">
        Subscription Plans
      </h1>
      

      <div className="flex justify-center border-b mb-4">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "createPlan"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("createPlan")}
        >
          Create Plan
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "featuresPlan"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("createfeatures")}
        >
          Features Plan
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "createPlan" && <CreatePlan />}
        {activeTab === "createfeatures" && <CreateFeatures />}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
