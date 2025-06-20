import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlySalesBarChart = ({ mySales }) => {
  //   const { mySales } = useSelector((state) => state.sale);
  //   console.log(mySales);

  const monthlyTotals = Array(12).fill(0);

  mySales?.forEach((sale) => {
    const date = new Date(sale.createdAt);
    const monthIndex = date.getMonth();
    monthlyTotals[monthIndex] += sale.totalAmount;
  });

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Sales (Rs.)",
        data: monthlyTotals,
        backgroundColor: "#FFD700",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "#333" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#333" },
      },
    },
  };

  return (
    <div className="bg-black/60 p-4 rounded-lg border border-gray-700 shadow-md">
      <h2 className="text-white text-xl font-bold mb-4">Monthly Sales</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlySalesBarChart;
