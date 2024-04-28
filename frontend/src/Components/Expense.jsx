import React, { useState, useEffect } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import DoughnutComp from './DoughnutComp';
import LineComp from './LineComp';
import AddExpenseFrom from './AddExpenseForm';
import ExpenseHistory from './ExpenseHistory';
import { IoAnalytics } from "react-icons/io5";
import { getAPI } from '../axiosUrls';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Expense = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const requestServer = async () => {
    try {
      const response = await getAPI('/expenses');
      setTransactions(response.data);
      const typesResponse = await getAPI('/types');
      const  frequenciesResponse = await getAPI('/frequencies');
      const categoriesResponse = await getAPI('/categories');
      setTypes(typesResponse.data);
      setFrequencies(frequenciesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      toast.error(error.message); 
      if (error.statusCode === 401) navigate('/');
    }
  }

  useEffect(() => {
    requestServer();
  }, [])

  return (
    <div className='bg-transparent overflow-y-auto' style={{ paddingBottom: "150px" }}>
      <div className="flex flex-col items-center">
        {/* Collapse for Charts section */}
        <div className="mt-4 flex w-full md:px-12 justify-content-center align-items-center flex-col">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="charts"
            aria-expanded={open}
            style={{ backgroundColor: "#9fa9fa" }} 
            className="analytics d-flex justify-content-center align-items-center gap-2 shadow border-4 border-white text-white font-bold py-2 px-4 rounded-lg"
          >
            <IoAnalytics /> View Analytics
          </Button>
          <Collapse in={open}>
            <div id="charts">
              <div className="tab rounded-3xl grid grid-cols-1 sm:grid-cols-3 gap-8 m-8">
                <div>
                  <DoughnutComp title={"Type-Wise"} />
                </div>
                <div>
                  <DoughnutComp title={"Category-Wise"} />
                </div>
                <div>
                  <LineComp />
                </div>
              </div>
              {/* Horizontal divider */}
              <hr className="my-10 w-full mx-auto border-3 border-black"/>
            </div>
          </Collapse>
        </div>

        {/* Add Expense button and the overlay form part */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="sm:px-6 md:px-8 py-6 bg-white shadow-lg rounded-lg">
              <AddExpenseFrom onClose={closeModal} requestServerExpense={requestServer} types={types} frequencies={frequencies} categories={categories} />
            </div>
          </div>
        )}
        {/* Expense history section */}
        <ExpenseHistory openModal={openModal} transactions={transactions} />
      </div>
    </div>
  );
}

export default Expense;
