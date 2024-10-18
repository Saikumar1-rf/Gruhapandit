import React, { useState } from 'react';
import { AiTwotoneProfile } from 'react-icons/ai';
import axiosInstance from './AxiosInstance';  
import DashHeader from './DashHeader';

const CreatePosts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    subjectsLookingFor: '', // For students
    subjectsYouAreExpertAt: '', // For teachers
    modeOfTeaching: '',
    location: '',
    availableTimings: '',
  });
  const [errors, setErrors] = useState({});

  const togglePopup = (role) => {
    setSelectedRole(role);
    setShowPopup((prev) => !prev);
    if (!showPopup) {
      setFormData({
        firstName: '',
        subjectsLookingFor: '',
        subjectsYouAreExpertAt: '',
        modeOfTeaching: '',
        location: '',
        availableTimings: '',
      });
      setErrors({});
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const subjectRegex = /^[A-Za-z0-9\s,]+$/;

    if (!formData.firstName) newErrors.firstName = 'Name is required';
    else if (!nameRegex.test(formData.firstName)) newErrors.firstName = 'Name can only contain letters and spaces';

    if (selectedRole === 'student') {
      if (!formData.subjectsLookingFor) newErrors.subjectsLookingFor = 'Subject is required';
      else if (!subjectRegex.test(formData.subjectsLookingFor)) newErrors.subjectsLookingFor = 'Subject can only contain letters, numbers, spaces, and commas';
    }

    if (selectedRole === 'tutor') {
      if (!formData.subjectsYouAreExpertAt) newErrors.subjectsYouAreExpertAt = 'Expertise is required';
      else if (!subjectRegex.test(formData.subjectsYouAreExpertAt)) newErrors.subjectsYouAreExpertAt = 'Expertise can only contain letters, numbers, spaces, and commas';
    }

    if (!formData.modeOfTeaching) newErrors.modeOfTeaching = 'Mode of teaching/class is required';
    if (!formData.availableTimings) newErrors.availableTimings = 'Timing is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        let payload = {};
        let url = '';

        // Different API URL and payload based on selected roles
        if (selectedRole === 'student') {
          url = 'https://hrms-repository-gruhabase.onrender.com/tuition-application/studentAdvertisement/create';
          payload = {
            firstName: formData.firstName,
            subjectsLookingFor: formData.subjectsLookingFor,
            modeOfTeaching: formData.modeOfTeaching,
            availableTimings: formData.availableTimings,
          };
        } else if (selectedRole === 'tutor') {
          url = 'https://hrms-repository-gruhabase.onrender.com/tuition-application/tutorAdvertisement/create';
          payload = {
            firstName: formData.firstName,
            subjectsYouAreExpertAt: formData.subjectsYouAreExpertAt, // For tutors
            modeOfTeaching: formData.modeOfTeaching,
            availableTimings: formData.availableTimings,
          };
        }

        // Make the API request with the appropriate payload
        const response = await axiosInstance.post(url, payload);
        console.log('Form submitted successfully:', response.data);

        // Close the popup after successful submission
        togglePopup('');
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    }
  };

  return (
    <div>
      <DashHeader/>
      <div className="flex justify-center mt-[20%] space-x-4">
        <button onClick={() => togglePopup('student')} className="bg-blue-600 text-white py-2 px-4 rounded flex items-center">
          <AiTwotoneProfile className="text-2xl mr-2" /> Students
        </button>
        <button onClick={() => togglePopup('tutor')} className="bg-blue-600 text-white py-2 px-4 rounded flex items-center">
          <AiTwotoneProfile className="text-2xl mr-2" /> Teachers
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-1/2 p-4 bg-white shadow-lg border-2 rounded-lg">
            <button onClick={() => togglePopup('')} className="border-2 border-black float-right px-2">X</button>
            <h1 className="text-lg">Title: Available tuitions for Oct 28.</h1>
            <p>Content: {selectedRole === 'student' ? 'Dear Student' : 'Dear Tutor'}, we are excited to announce available tuitions for the month of 2024.</p>
            <br />
            <div className='grid grid-cols-2 gap-4 p-4'>
              <div>
                <label className='block'>Name:</label>
                <input
                  type='text'
                  id="firstName"
                  maxLength='30'
                  placeholder='name'
                  className={`border-2 border-black w-full p-2 ${errors.firstName ? 'border-red-500' : ''}`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
              </div>
              <div>
                <label className='block'>{selectedRole === 'student' ? 'Subject' : 'Expertise'}:</label>
                <input
                  type='text'
                  id={selectedRole === 'student' ? 'subjectsLookingFor' : 'subjectsYouAreExpertAt'}
                  maxLength='30'
                  placeholder={selectedRole === 'student' ? 'subject' : 'expertise'}
                  className={`border-2 border-black w-full p-2 ${errors[selectedRole === 'student' ? 'subjectsLookingFor' : 'subjectsYouAreExpertAt'] ? 'border-red-500' : ''}`}
                  value={selectedRole === 'student' ? formData.subjectsLookingFor : formData.subjectsYouAreExpertAt}
                  onChange={handleInputChange}
                />
                {errors[selectedRole === 'student' ? 'subjectsLookingFor' : 'subjectsYouAreExpertAt'] && <p className='text-red-500 text-sm'>{errors[selectedRole === 'student' ? 'subjectsLookingFor' : 'subjectsYouAreExpertAt']}</p>}
              </div>
              <div>
                <label className='block'>Mode of {selectedRole === 'student' ? 'Teaching' : 'Class'}:</label>
                <select
                  id='modeOfTeaching'
                  className={`border-2 border-black w-full p-2 ${errors.modeOfTeaching ? 'border-red-500' : ''}`}
                  value={formData.modeOfTeaching}
                  onChange={handleInputChange}
                >
                  <option value=''>...select...</option>
                  <option value='virtual'>Virtual Mode</option>
                  <option value={selectedRole === 'student' ? 'student' : 'in-person'}>
                    {selectedRole === 'student' ? 'Student Mode' : 'In-Person Mode'}
                  </option>
                  <option value='tutor'>Tutor Mode</option>
                </select>
                {errors.modeOfTeaching && <p className='text-red-500 text-sm'>{errors.modeOfTeaching}</p>}
              </div>
              <div>
                <label className='block'>Timing:</label>
                <input
                  type='text'
                  id='availableTimings'
                  placeholder='timing'
                  className={`border-2 border-black w-full p-2 ${errors.availableTimings ? 'border-red-500' : ''}`}
                  value={formData.availableTimings}
                  onChange={handleInputChange}
                />
                {errors.availableTimings && <p className='text-red-500 text-sm'>{errors.availableTimings}</p>}
              </div>
            </div>
            <button className='bg-blue-600 text-white py-2 px-4 rounded' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePosts;
