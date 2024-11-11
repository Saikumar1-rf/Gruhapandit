import React from 'react'
import { Link } from 'react-router-dom'

const EmailTemplate = () => {
  return (
    <div>
      <div className="container mx-auto p-6 lg:px-12 mt-12">
        <h1 className="text-3xl font-bold text-center mb-6">EmailTemplate</h1>

        {/* Card */}
        <div className="bg-slate-200 shadow-md rounded-lg p-6 mt-6 max-w-lg mx-auto">
          <div className="space-y-4">
            <Link to="/student-registration">
              <button className="w-full  px-4 py-2 ">
                Student Registration
              </button>
            </Link>
            <Link to="/tutor-registration">
              <button className="w-full  px-4 py-2  ">
                Tutor Registration
              </button>
            </Link>
            <Link to="/tutor-registration">
              <button className="w-full  px-4 py-2  ">
                ForgotPassword
              </button>
            </Link>
            <Link to="/tutor-registration">
              <button className="w-full  px-4 py-2  ">
                Change password
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Fixed buttons */}
      <div className="fixed bottom-4 right-4 space-y-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 mr-4">
          <Link to="/edit">Edit</Link>
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600">
          <Link to="/posts">Back</Link>
        </button>
      </div>
    </div>
  )
}

export default EmailTemplate
