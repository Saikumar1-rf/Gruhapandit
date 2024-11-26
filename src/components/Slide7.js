import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';

const Slide7 = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axiosInstance.get('/tuition-application/documents/get-gallery');
        setGalleryItems(response.data || []); // Assuming the API returns an array
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      }
    };
  
    fetchGalleryItems();
  }, []);

  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {galleryItems.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.imageUrl}  // Directly use the image URL returned by the backend
              alt={item.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold break-words">{item.name}</h2>
            <p className="text-gray-600 break-words">{item.subject}</p>
            <p className="text-gray-500 mt-2 break-words">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide7;
