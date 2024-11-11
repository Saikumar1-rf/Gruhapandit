import React from 'react'
import { Link } from 'react-router-dom'

const Edit = () => {
  return (
    <div>
    <div className="container mx-auto p-6 lg:px-12 mt-12">
          <h1 className="text-3xl font-bold text-center mb-6">Edit Page</h1>
        </div>
      <div className="fixed bottom-4 right-4 space-y-6 ">
  <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 mr-4">
    <Link to="/edit">Edit</Link>
  </button>
  <button className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 ">
    <Link to="/emailtemplate">Back</Link>
  </button>
</div>
    </div>
  )
}

export default Edit
