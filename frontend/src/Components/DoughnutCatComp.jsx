import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutCatComp = ({ spent, limit }) => {
  const data = {
    datasets: [
      {
        data: (spent > limit) ? [limit] : [spent, limit - spent],
        backgroundColor: [
          '#FF6384', // Red
          '#FFCE56', // Yellow
        ],
        hoverBackgroundColor: [
          '#FF6384', // Red
          '#FFCE56', // Yellow
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#ffffff',
        },
      },
    },
  };

  return (
    <div className="p-4 flex flex-col justify-content-center align-items-center gap-4">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutCatComp;
