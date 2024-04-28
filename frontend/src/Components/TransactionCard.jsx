import React from 'react';

const TransactionCard = ({ transaction }) => {
    return (
      <div className="flex flex-row items-center bg-teal-500 rounded-lg p-4 shadow-md mb-4">
        <div className="flex-grow">
          <p className="text-lg font-semibold text-white mb-2">{transaction.merchantName}</p>
          <p className="text-gray-200"><span className="font-semibold">Type:</span> {transaction.type}</p>
          <p className="text-gray-200"><span className="font-semibold">Transaction ID:</span> {transaction.transactionId}</p>
          <p className="text-gray-200"><span className="font-semibold">Category:</span> {transaction.category}</p>
        </div>
        <div>
          <p className="text-gray-200"><span className="font-semibold">Amount:</span> ${transaction.amount.toFixed(2)}</p>
        </div>
      </div>
    );
  };

export default TransactionCard;