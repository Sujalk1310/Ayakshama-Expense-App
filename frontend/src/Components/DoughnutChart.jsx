import React from "react";
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ chartData }) {
  return (
    <div className="chart-container">

      <div className="rounded-lg shadow-md p-4">
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020"
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default DoughnutChart;
