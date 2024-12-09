// import React from 'react'

// const ContactUs = () => {
//   return (
//     <div>
//       <div className='mt-32 ml-52 bg-stone-500-200'>
//         <h1>Contact Us</h1>
//         <h1>We always care about your Future</h1>
//         </div>

//         <div className='mt-20 ml-52 border-4 p-10'>
//               <h1>Let us discuss your marketing strategy!</h1>

//               <h2>Org.nr: 559264-1871</h2>
//               <h2>Lunar Holding LDA</h2>
//               <h2>info@lunarstrategy.com</h2>
//               <h1>+467-20478390</h1>
//         </div>

//     </div>
//   )
// }

// export default ContactUs




import React from 'react';
import img from '../Asserts/10.png'
import message from '../Asserts/24.png'
import inbox from '../Asserts/23.png'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b  text-gray-800">
      {/* Header */}
      <header className="py-10 mt-32 ml-20">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg mt-2">We always care about your future</p>
      </header>
      <div className='-mt-96'>
        <img src={img}></img>
      </div>
    

  <section className="flex justify-center align-middle items-center py-10 p-5">
  <div className="bg-white rounded-lg shadow-lg p-8 w-[80%] sm:w-[50%] flex flex-col sm:flex-row bg-repeat-y border-y-2 border-blue-600">
    {/* Left Section */}
    <div className="w-full sm:w-1/2 pr-4 mb-6 sm:mb-0">
      <h2 className="text-2xl font-bold mb-4">Let us discuss your marketing strategy!</h2>
      <p className="mb-6">Reach us at:</p>
      <p className="font-medium mb-6">
        <span>Email:</span> support@example.com<br />
        <span>Phone:</span> +123 456 7890<br />
      </p>
      <div className="flex space-x-4 mb-6">
        <a href="https://www.facebook.com/people/Gruhapandit-Tuitions/61566845707627/" className="text-blue-600 hover:underline"><FaFacebook size="30" /></a>
        <a href="https://x.com/gruhapandi47996" className="text-blue-600 hover:underline"><FaSquareXTwitter size="30" /></a>
        <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
        <a href="https://www.instagram.com/gruhapandit_tuitions/" className="text-blue-600 hover:underline"><FaInstagram size="30" /></a>
      </div>
      <div className="border-blue-500 border-4 p-4 rounded-2xl w-56 h-12 text-center">
        <h1 className="-mt-2 text-blue-500">Book a free consultation</h1>
      </div>
    </div>

    {/* Right Section - Form */}
    <div className="w-full sm:w-1/2">
      <h1 className="mb-4 text-xl font-bold">Or you can also contact us here:</h1>
      <form>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <textarea
          placeholder="Message"
          className="w-full mt-4 px-4 py-2 border rounded-md h-32"
        ></textarea>
        <button className="bg-blue-500 text-white mt-4 px-6 py-2 rounded-md hover:bg-blue-600 w-full">
          Send
        </button>
      </form>
    </div>
  </div>
</section>

      {/* Subscription Section */}
      {/* Subscription Section */}
      <section className="bg-white py-10 flex flex-col md:flex-row justify-start items-center md:items-start mx-8 md:mx-32">
  <div className="text-center mt-24 md:text-left md:w-1/2">
    <h3 className="text-2xl font-bold mb-4">LET'S KEEP IN TOUCH</h3>
    <p className="mb-6">Subscribe to our newsletter to keep yourself updated</p>
    <div className="flex justify-center md:justify-start items-center space-x-4">
      {/* Input Field with Icon */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder=" | Your Location Nearby"
          className="px-4 py-2 border rounded-full w-full pl-12 bg-blue-900 text-white"
        />
        <img
          src={message} // Replace with your message/location image path
          alt="Location Icon"
          className="absolute rounded-full left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
      </div>

      {/* Subscribe Button */}
      <button className="border-4 border-purple-600 text-black px-6 py-2 rounded-full">
        Subscribe now
      </button>
    </div>
  </div>

  {/* Inbox Image */}
  <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
    <img
      src={inbox} // Replace with your inbox image path
      alt="Inbox Icon"
      className="w-96 h-96 object-contain"
    />
  </div>
</section>


    </div>
  );
};

export default ContactPage;
