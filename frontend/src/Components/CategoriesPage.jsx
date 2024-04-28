import React from 'react';
import Categories from './Categories';
import { useState, useEffect } from 'react';
import AddCategoryForm from './AddCategoryForm';
import { FaPlus } from "react-icons/fa";
import toast from 'react-hot-toast';
import { getAPI } from '../axiosUrls';
import { useNavigate } from 'react-router-dom';

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryAnalyticsData, setCategoryAnalyticsData] = useState([]);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const requestServer = async () => {
    try {
      const response = await getAPI('/categories');
      setCategoryAnalyticsData(response.data);
    } catch (error) {
      toast.error(error.message); 
      if (error.statusCode === 401) navigate('/');
    }
  }

  useEffect(() => {
    requestServer();
  }, [])

  return (
    
    <div style={{ paddingBottom: "150px" }} className="min-h-screen px-2 flex flex-col align-items-center md:px-10 overflow-auto relative">
      {/* Empty divs to create the grid layout */}
      <div className="mt-8 flex justify-content-around w-full">
        <button
          style={{ backgroundColor: "#9fa9fa" }} 
          className="flex justify-content-center mb-5 align-items-center gap-2 shadow border-4 border-white text-white font-bold py-2 px-4 rounded-lg"
          onClick={openModal}
        >
          <FaPlus className="text-white text-lg" /> Add New Category
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <Categories categoryAnalyticsData={categoryAnalyticsData} />
      </div>
      {/* Add Expense button and the overlay form part */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <AddCategoryForm onClose={closeModal} requestServer={requestServer} />
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
