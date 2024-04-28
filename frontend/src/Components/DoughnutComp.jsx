import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutComp = ({ title }) => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
        ],
        hoverBackgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
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
      <h2>{title}</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutComp;
