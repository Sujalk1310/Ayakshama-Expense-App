import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { getAPI, postAPI } from '../axiosUrls';
import toast from 'react-hot-toast';

const AddExpenseFrom = ({ onClose, requestServerExpense, types, frequencies, categories }) => {
  const [formData, setFormData] = useState({
    type: '',
    transactionId: '',
    merchantName: '',
    amount: '',
    description: '',
    frequency: '',
    startDate: '',
    category: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const today = new Date();
      const formattedDate = today.toISOString().substr(0, 10);
      formData.startDate = formattedDate;
      if (types.length > 0 && frequencies.length > 0) {
        setFormData(prevFormData => ({
          ...prevFormData,
          type: types[0].type,
          frequency: frequencies[0].type,
          category: (categories.length > 0) ? categories[0].name : ''
        }));
      } else {
        throw new Error("Couldn't fetch data");
      }
    } catch (error) {
      toast.error(error.message); 
      if (error.statusCode === 401) navigate('/');
    }
  
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
  
    // If the type is "Miscellaneous", set the category to "Miscellaneous"
    if (name === "type" && value === "Miscellaneous") {
      updatedFormData = { ...updatedFormData, category: "Miscellaneous" };
    }
  
    setFormData(updatedFormData);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
        const response = await postAPI('/add/expense', { 
          type: formData.type, 
          transactionId: formData.transactionId, 
          merchantName: formData.merchantName, 
          amount: formData.amount, 
          description: formData.description, 
          frequency: formData.frequency, 
          startDate: formData.startDate, 
          category: formData.category 
        }); 
        if (response.flag && response.flag === 1) toast(response.message, { icon: '⚠️' });
        toast.success("Expense added successfully.");
        requestServerExpense();
    } catch (error) {
        toast.error(error.message); 
        if (error.statusCode === 401) navigate('/');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0  flex items-center md:py-4 justify-center z-50">
      <div className="px-4 sm:px-6 md:px-8 py-6 bg-white h-full shadow-lg md:rounded-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3>Add Expense</h3>
          <button className="bg-red-500 text-white py-1 px-2 text-3xl rounded" onClick={onClose}><IoMdClose /></button>
        </div>
        <form onSubmit={handleSubmit}>
        {/* Type */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
              Type
            </label>
            <div className="relative">
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full appearance-none px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
              required
            >
              {types.map(type => (
                <option key={type.type} value={type.type} selected={formData.type === type.type}>{type.type}</option>
              ))}
            </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-6-6h12z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Transaction ID and Merchant Name */}
          <div className="flex flex-col md:flex-row justify-content-between align-items-between gap-2 md:gap-4">
            {/* Transaction ID */}
            <div className="mb-4 md:w-1/2">
              <label
                htmlFor="transactionId"
                className="block text-gray-700 font-bold mb-2"
              >
                Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Merchant Name */}
            <div className="mb-4 md:w-1/2">
              <label
                htmlFor="merchantName"
                className="block text-gray-700 font-bold mb-2"
              >
                Merchant Name
              </label>
              <input
                type="text"
                id="merchantName"
                name="merchantName"
                value={formData.merchantName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Recurring Frequency and Start Date */}
          {formData.type === 'Recurring' && (
            <div className="flex gap-2 md:gap-4 flex-col justify-content-between align-items-between md:flex-row">
              {/* Recurring Frequency */}
              <div className="mb-4">
                <label
                  htmlFor="recurringFrequency"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Recurring Frequency
                </label>
                <select
                  id="recurringFrequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full appearance-none px-8 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
                  required
                >
                  {frequencies.map(frequency => (
                    <option key={frequency.type} value={frequency.type} selected={formData.frequency === frequency.type}>{frequency.type}</option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-6 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
          )}

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              Category
            </label>
            <div className="relative">
              {(formData.type === "Miscellaneous") ? (
                <input
                  type="text"
                  id="category"
                  name="category"
                  value="Miscellaneous"
                  className="w-full px-3 py-2 border rounded shadow bg-gray-200 appearance-none focus:outline-none focus:shadow-outline"
                  disabled
                />
              ) : ( (categories.length > 0) ? (<select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full appearance-none px-3 py-2 border rounded shadow focus:outline-none focus:shadow-outline"
                  required
                >
                  {categories.map(category => (
                    <option key={category.name} value={category.name} selected={formData.category === category.name}>{category.name}</option>
                  ))}
                </select>) : (
                    <input type="text" value="No Categories Found" 
                    className="w-full px-3 py-2 border rounded shadow bg-gray-200 appearance-none focus:outline-none focus:shadow-outline" 
                    disabled />
                  )
              )}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-6-6h12z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cost */}
          <div className="mb-4">
            <label
              htmlFor="cost"
              className="block text-gray-700 font-bold mb-2"
            >
              Amount
            </label>
            <input
              type="Number"
              id="amount"
              name="amount"
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Add New Category and Submit Buttons */}
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"
              onClick={() => navigate('/dashboard/categories')}
            >
              Add New Category
            </button>
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
