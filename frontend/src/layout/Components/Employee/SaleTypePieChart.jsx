import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesTypePieChart = ({ mySales }) => {
  //   const { mySales } = useSelector((state) => state.sale);

  let physicalCount = 0;
  let onlineCount = 0;

  mySales?.forEach((sale) => {
    if (sale.saleType === "PHYSICAL") physicalCount++;
    else if (sale.saleType === "ONLINE") onlineCount++;
  });

  const data = {
    labels: ["Physical", "Online"],
    datasets: [
      {
        label: "Sales Count",
        data: [physicalCount, onlineCount],
        backgroundColor: ["#FFD700", "#4c51bf"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
  };

  return (
    <div className="bg-black/60 p-4 rounded-lg border border-gray-700 shadow-md">
      <h2 className="text-white text-xl font-bold mb-4">Sales by Type</h2>
      <div style={{ height: "300px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesTypePieChart;
