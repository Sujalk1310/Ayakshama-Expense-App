import React from 'react';
import { IoMdAddCircle } from "react-icons/io";


const ExpenseHistory = ({ openModal, transactions }) => {

  return (
    <div className="w-full flex flex-col justify-content-center aling-items-center mx-auto">
      <div className="text-center">
        <h1 className="font-semibold mt-4 mb-4">Expense History</h1>
      </div>
      <div className='flex justify-content-end'>
          <button style={{ backgroundColor: "#9fa9fa" }} className="flex w-8/12 justify-center mx-auto align-items-center gap-2 shadow border-4 border-white text-white font-bold py-3 px-4 rounded-lg" onClick={openModal}>
            <IoMdAddCircle /> Add Expense
          </button>
     </div>
      <div className="flex flex-col mt-5 w-full px-2 md:px-0 items-center">
        {(transactions && transactions.length > 0) ? transactions.map(transaction => (
          <div key={transaction.transactionId} className="tab-2 w-full md:w-8/12 rounded-2xl shadow-md shadow-white p-3 md:p-4 mb-4 gap-2 flex">
            <div className="flex md:pr-5 w-full justify-between flex-col md:flex-row">
              <div className='flex flex-col w-full'>
                  {(transaction.transactionId) ? <><p className='text-muted text-sm'><b>Transaction ID:</b> {transaction.transactionId}</p></> : <></> }
                  <p className='flex gap-1 flex-col md:flex-row flex-wrap'>
                    <p className='mb-0'><b>Type:</b> {transaction.type.type}</p>
                    {(transaction.type.type === 'Recurring') ? <p className='flex gap-1 mb-0'><p className='mb-0 hidden md:block'>|</p><p className='mb-0'><b>Frequency:</b> {transaction.frequency.type}</p></p> : <></>}
                    <p className='mb-0 hidden md:block'>|</p>
                    <p className='mb-0'><b>Category:</b> {transaction.category.name}</p>
                    <p className='mb-0 hidden md:block'>|</p>
                    <p className='mb-0'><b>Date:</b> {new Date(transaction.startDate).toLocaleDateString()}</p>
                  </p>
                  <span className='grow'></span>
                  {(transaction.description) ? 
                  <div className='mr-4'>
                    <label for="desc"><b>Description:</b></label>
                    <p id="desc" className='text-break text-sm'>{transaction.description}</p>
                  </div> : <></>}
              </div>
              <div className='flex flex-col items-center md:items-start md:w-1/2'>
                  <label for="amount" className='text-lg md:text-2xl md:self-end'><b>Amount</b></label>
                  <p id="amount" className='text-red-500 text-nowrap md:self-end text-3xl md:text-5xl'><b>- ${transaction.amount}</b></p>
                  {(transaction.merchantName) ? 
                  <>
                    <label for="merchantName" className='text-lg md:text-xl md:self-end'><b>To</b></label>
                    <p id="merchantName" className='text-wrap md:self-end text-md'>{transaction.merchantName}</p>
                  </> : <></>}
                  {(transaction.type.type === 'Recurring') ? 
                  <>
                    <label for="merchantName" className='text-lg md:text-lg md:self-end'><b>Expiry Date</b></label>
                    <p id="merchantName" className='text-wrap md:self-end text-md'>{new Date(transaction.expiryDate).toLocaleDateString()}</p>
                  </> : <></>}
              </div>
            </div>
          </div>
        )) : <div className="text-center" style={{ fontSize: "30px", fontWeight: "bold" }}>No Expense History Found!</div>}
      </div>
    </div>
  );
}

export default ExpenseHistory;
