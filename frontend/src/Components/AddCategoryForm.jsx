import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../axiosUrls';
import toast from 'react-hot-toast';

const AddExpenseFrom = ({ onClose, requestServer }) => {
  const [formData, setFormData] = useState({
    name: '',
    limit: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await postAPI('/add/category', { name: formData.name, limit: formData.limit });
        toast.success(response.message);
        requestServer();
    } catch (error) {
        toast.error(error.message);
        if (error.statusCode === 401) navigate('/');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center md:py-4 justify-center z-50">
      <div className="px-4 sm:px-6 flex flex-col w-72 md:px-8 py-6 bg-white shadow-lg rounded-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3>Add Category</h3>
          <button className="bg-red-500 text-white py-1 px-2 text-3xl rounded" onClick={onClose}><IoMdClose /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-content-between align-items-between gap-2 md:gap-4">
            <div className="mb-4 flex flex-col w-full">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="limit"
                className="block text-gray-700 font-bold mb-2"
              >
                Set Limit
              </label>
              <input
                type="Number"
                id="limit"
                name="limit"
                value={formData.limit}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"
            >
              Submit
            </button>
          </div>
      </form>
    </div>
    </div>
  );
};

export default AddExpenseFrom;
