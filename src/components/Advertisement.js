import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { Sidebar } from "lucide-react";
import Postsdash from "./Postsdash";


const Advertisement = () => {
  const [popupType, setPopupType] = useState(""); // Controls which popup is open
  const [techItems, setTechItems] = useState([]);
  const [nonTechItems, setNonTechItems] = useState([]);
  const [locationItems,setLocationItems]=useState([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const BackButton = () => {
    navigate("/posts");
  };

  const handlePopup = (type) => {
    setPopupType(type);
    setInputValue(""); // Reset input value on open
  };

  const closePopup = () => {
    setPopupType("");
  };

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      if (popupType === "technical") {
        setTechItems([...techItems, inputValue]);
      } else if (popupType === "non-technical") {
        setNonTechItems([...nonTechItems, inputValue]);
      }else if (popupType === "location"){
        setLocationItems([...locationItems,inputValue]);
      }
      setInputValue("");
      setPopupType("");

    }
  };

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      {/* Buttons */}
      <div>
      </div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handlePopup("technical")}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
        >
          TECHNICAL
        </button>
        <button
          onClick={() => handlePopup("non-technical")}
          className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
        >
          Non-Technical
        </button>
        <button
          onClick={() => handlePopup("location")}
          className="bg-black text-white py-2 px-4 rounded shadow hover:bg-black"
        >
          Location
        </button>
      </div>

      {/* Popup */}
      {popupType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">
              {popupType === "technical"
                ? "Technical"
                : popupType === "non-technical"
                ? "Non-Technical"
                : "Location"}
            </h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter ${
                popupType === "technical" ? "Technical" : popupType === "Non-Technical" ? "Non-Technical" : "Location"
              } Item`}
              className="border w-full p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between">
              <button
                onClick={handleAdd}
                className={`${
                  popupType === "technical" ? "bg-blue-500" : popupType === "non-technical" ? "bg-green-500" : "bg-black"  
                } text-white py-2 px-4 rounded shadow hover:bg-opacity-80`}
              >
                Add
              </button>
              <button
                onClick={closePopup}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded shadow hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items Display */}
      <div className="w-full max-w-4xl mt-6 flex space-x-8">
        {/* Technical Items */}
        <div className="w-1/2">
          <h4 className="text-lg font-semibold mb-2 text-blue-500">
            Technical Items:
          </h4>
          <ul className="list-disc list-inside mb-6 bg-gray-200 p-4 rounded shadow">
            {techItems.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Non-Technical Items */}
        <div className="w-1/2">
          <h4 className="text-lg font-semibold mb-2 text-green-500">
            Non-Technical Items:
          </h4>
          <ul className="list-disc list-inside bg-gray-200 p-4 rounded shadow">
            {nonTechItems.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div className="w-1/2">
          <h4 className="text-lg font-semibold mb-2 text-black-500">
            Location:
          </h4>
          <ul className="list-disc list-inside bg-gray-200 p-4 rounded shadow">
            {locationItems.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Advertisement;


// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeftIcon } from '@heroicons/react/solid';

// const Advertisement = () => {
//   const [popupType, setPopupType] = useState(""); // Controls which popup is open
//   const [techItems, setTechItems] = useState([]);
//   const [nonTechItems, setNonTechItems] = useState([]);
//   const [locationItems, setLocationItems] = useState([]);
//   const [inputValue, setInputValue] = useState("");

//   const navigate = useNavigate();

//   const BackButton = () => {
//     navigate("/posts");
//   };

//   const handlePopup = (type) => {
//     setPopupType(type);
//     setInputValue(""); // Reset input value on open
//   };

//   const closePopup = () => {
//     setPopupType("");
//   };

//   const handleAdd = () => {
//     if (inputValue.trim() !== "") {
//       if (popupType === "technical") {
//         setTechItems([...techItems, inputValue]);
//       } else if (popupType === "non-technical") {
//         setNonTechItems([...nonTechItems, inputValue]);
//       } else if (popupType === "location") {
//         setLocationItems([...locationItems, inputValue]);
//       }
//       setInputValue("");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => handlePopup("technical")}
//           className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
//         >
//           TECHNICAL
//         </button>
//         <button
//           onClick={() => handlePopup("non-technical")}
//           className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
//         >
//           Non-Technical
//         </button>
//         <button
//           onClick={() => handlePopup("location")}
//           className="bg-orange-500 text-white py-2 px-4 rounded shadow hover:bg-orange-600"
//         >
//           Location
//         </button>
//       </div>

//       {/* Popup */}
//       {popupType && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
//             <h3 className="text-xl font-semibold mb-4">
//               {popupType === "technical"
//                 ? "Technical"
//                 : popupType === "non-technical"
//                 ? "Non-Technical"
//                 : "Location"}
//             </h3>
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder={`Enter ${
//                 popupType === "technical"
//                   ? "Technical"
//                   : popupType === "non-technical"
//                   ? "Non-Technical"
//                   : "Location"
//               } Item`}
//               className="border w-full p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={handleAdd}
//                 className={`${
//                   popupType === "technical" ? "bg-blue-500" : popupType === "non-technical" ? "bg-green-500" : "bg-orange-500"
//                 } text-white py-2 px-4 rounded shadow hover:bg-opacity-80`}
//               >
//                 Add
//               </button>
//               <button
//                 onClick={closePopup}
//                 className="bg-gray-300 text-gray-700 py-2 px-4 rounded shadow hover:bg-gray-400"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Items Display */}
//       <div className="w-full max-w-4xl mt-6 flex space-x-8">
//         {/* Technical Items */}
//         <div className="w-1/3">
//           <h4 className="text-lg font-semibold mb-2 text-blue-500">
//             Technical Items:
//           </h4>
//           <ul className="list-disc list-inside mb-6 bg-gray-200 p-4 rounded shadow">
//             {techItems.map((item, index) => (
//               <li key={index} className="text-gray-700">
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Non-Technical Items */}
//         <div className="w-1/3">
//           <h4 className="text-lg font-semibold mb-2 text-green-500">
//             Non-Technical Items:
//           </h4>
//           <ul className="list-disc list-inside bg-gray-200 p-4 rounded shadow">
//             {nonTechItems.map((item, index) => (
//               <li key={index} className="text-gray-700">
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Location Items */}
//         <div className="w-1/3">
//           <h4 className="text-lg font-semibold mb-2 text-orange-500">
//             Location Items:
//           </h4>
//           <ul className="list-disc list-inside bg-gray-200 p-4 rounded shadow">
//             {locationItems.map((item, index) => (
//               <li key={index} className="text-gray-700">
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Advertisement;
