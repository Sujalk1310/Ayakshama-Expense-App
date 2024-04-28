import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
  return (
    <div className="chart-container md:px-2" style={{ width: "100%" }}>
      <h2 className="text-center">Monthly Analysis</h2>
      <div className="mt-4"> {/* Add margin top */}
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: false,
                text: "Users Gained between 2016-2020"
              },
              legend: {
                display: false
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
