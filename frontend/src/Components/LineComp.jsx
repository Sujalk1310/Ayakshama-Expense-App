import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useState } from "react";
import LineChart from "./LineChart";
import { Data } from "./Data";

Chart.register(CategoryScale);

export default function App() {
  const [chartData, setChartData] = useState({
    labels: Data.labels,
    datasets: [
      {
        label: "Users Gained",
        data: Data.datasets[0].data,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  return (
    <div className="p-4 flex gap-4 flex-col justify-content-center align-items-center">
      <LineChart chartData={chartData} />
      <div className="w-full flex flex-col justify-cont p-3 px-4">
        <h3>Breakdown</h3>
        <span className="text-sm md:text-lg gap-2 flex w-full justify-content-between">  
          <p>Total Spending</p>
          <p><b>3121</b></p>
        </span>
        <span className="text-sm md:text-lg gap-2 flex w-full justify-content-between">  
          <p>Percentage(%)</p>
          <p><b>3121</b></p>
        </span>
        <span className="text-sm md:text-lg gap-2 flex w-full justify-content-between">  
          <p>Average Spending</p>
          <p><b>3121</b></p>
        </span>
      </div>
    </div>
  );
}
