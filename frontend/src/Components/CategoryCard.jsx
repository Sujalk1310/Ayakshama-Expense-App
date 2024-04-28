import React from 'react';
import DoughnutCatComp from './DoughnutCatComp';

const CategoryCard = ({ name, spent, limit }) => {
  let percentageSpent = (spent / limit) * 100;
  let savings = limit - spent;

  if (spent > limit) {
    percentageSpent = 100;
    savings = 0;
  }

  return (
    <div className="tab rounded-3xl w-72 md:w-96 shadow-md p-4 shadow-white">
      <h3 className="text-3xl font-semibold">{name}</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">Spent:</p>
          <p className="text-xl font-semibold">{spent}</p>
        </div>
        <div>
          <p className="text-sm text-gray-700">Limit:</p>
          <p className="text-xl font-semibold">{limit}</p>
        </div>
      </div>
      <div className="w-full">
        <DoughnutCatComp spent={spent} limit={limit} className="h-full w-full" />
      </div>
      <div className="flex justify-center">
        <h6 className="text-gray-700">
          {percentageSpent.toFixed(2)}% Spent of limit
        </h6>
      </div>
      <div className="flex justify-center">
        <h4 className="text-gray-700">
          Savings: <span className='text-black'>{savings}</span>
        </h4>
      </div>
    </div>
  );
};

export default CategoryCard;
