import React from "react";
import DashboardHeaders from "../../Components/Admin/DashboardHeader";
import DashboardStats from "../../Components/Admin/DashboardStats";
import RecentUsers from "../../Components/Admin/RecentUsers";
import RecentProducts from "../../Components/Admin/RecentProducts";
import MonthlySalesBarChart from "../../Components/Employee/SaleBarCharts";
import SalesTypePieChart from "../../Components/Employee/SaleTypePieChart";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const { sales } = useSelector((state) => state.sale);
  return (
    <div className="p-6 space-y-6">
      <DashboardHeaders />
      <DashboardStats />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-black/60 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
          <RecentUsers />
        </div>

        <div className="bg-black/60 backdrop-blur-lg  p-6 rounded-lg border border-gray-700 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
          <RecentProducts />
        </div>
      </div>
      <div className="text-2xl font-bold">
        <h2>Charts</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlySalesBarChart mySales={sales} />
        <SalesTypePieChart mySales={sales} />
      </div>
    </div>
  );
};

export default DashboardHome;
