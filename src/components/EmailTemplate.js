import React from 'react'
import { Link } from 'react-router-dom'

const EmailTemplate = () => {
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="container mx-auto p-6 lg:px-12">
        <h1 className="text-3xl font-bold text-center mb-6">Email Template</h1>
      </div>
      <div className="flex space-x-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600">
          <Link to="/editemaill">Edit</Link>
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600">
          <Link to="/posts">Back</Link>
        </button>
      </div>
    </div>
  )
}

export default EmailTemplate
