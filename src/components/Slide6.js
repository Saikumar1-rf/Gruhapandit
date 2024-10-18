import React from "react";

const Slide6 = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
      {/* Terms and Conditions Section */}
      <div className="mb-10">
        <h2 className="bg-blue-600 text-white text-xl font-bold py-3 px-4 rounded-t-md">
          Terms and Conditions
        </h2>

        <div className="p-4 border border-gray-200 rounded-b-md">
          <h3 className="text-blue-600 text-lg font-semibold mt-4">
            Introduction
          </h3>
          <p className="text-gray-700 mb-4">
            Welcome to UrbanProLearningSolutions. By accessing or using our
            platform, you agree to comply with and be bound by the following
            terms and conditions. Please review them carefully before using our
            services. If you do not agree with these terms, you should not use
            this platform.
          </p>

          <h3 className="text-blue-600 text-lg font-semibold mt-4">
            User Responsibilities
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Users, both students and tutors, must provide accurate information
              during registration.
            </li>
            <li>
              Tutors are responsible for ensuring the accuracy of the subjects
              and courses they offer.
            </li>
            <li>
              Students must ensure timely payments for the booked sessions.
            </li>
          </ul>

          <h3 className="text-blue-600 text-lg font-semibold mt-4">
            Booking and Payment
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Students can book sessions based on the tutor's availability.
            </li>
            <li>Registration fee is 500 INR for both Students and Tutors.</li>
            <li>
              Payment must be made in advance for confirmed bookings, and prices
              are displayed in INR.
            </li>
            <li>
              Payment gateways may apply processing fees, which will be clearly
              communicated during the transaction.
            </li>
          </ul>

          <h3 className="text-blue-600 text-lg font-semibold mt-4">
            Use of Platform
          </h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              UrbanProLearningSolutions reserves the right to modify or
              terminate services at any time.
            </li>
            <li>
              Users are prohibited from misusing the platform by posting
              harmful, offensive, or inappropriate content.
            </li>
            <li>
              For cancellations and refunds, please refer to our specific terms
              below. Please read them carefully before proceeding with bookings.
            </li>
          </ul>

          <h3 className="text-blue-600 text-lg font-semibold mt-4">
            Limitation of Liability
          </h3>
          <p className="text-gray-700 mb-4">
            UrbanProLearningSolutions is not responsible for any damage or loss
            resulting from the use of our platform, including loss of data, or
            the actions of users (tutors and students).
          </p>

          <h3 className="text-blue-600 text-lg font-semibold mt-4">Privacy</h3>
          <p className="text-gray-700 mb-4">
            Your personal data is handled according to our privacy policy, which
            ensures your information is protected and not shared with third
            parties without consent.
          </p>
        </div>
      </div>

      {/* Refund and Cancellation Section */}
      <div>
        <h2 className="bg-blue-600 text-white text-xl font-bold py-3 px-4 rounded-t-md">
          Refund and Cancellation
        </h2>

        <div className="p-4 border border-gray-200 rounded-b-md">
          <h3 className="text-blue-600 text-lg font-semibold mt-4">
          We do not offer refunds and Cancellations are also not permitted. Thank you for your understanding.
          </h3>
          
         
        </div>
      </div>
    </div>
  );
};

export default Slide6;
