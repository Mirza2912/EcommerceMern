import React, { useEffect } from "react";
import DashboardHeadersEmployee from "../../Components/Employee/DashboardHeaderEmployee";
import DashboardStatsEmployee from "../../Components/Employee/DashboardStatsEmployee";
import { getMyAllSales } from "../../store/SalesSlice/saleSliceReducers";
import { useDispatch, useSelector } from "react-redux";
import RecaentEmployeeSales from "../../Components/Employee/RecaentEmployeeSales";
import MonthlySalesBarChart from "../../Components/Employee/SaleBarCharts";
import SalesTypePieChart from "../../Components/Employee/SaleTypePieChart";

const EmployeeDashboardHome = () => {
  const dispatch = useDispatch();

  const { mySales } = useSelector((state) => state.sale);

  const latestFiveSales =
    mySales &&
    mySales
      ?.slice() // create a shallow copy to avoid mutating Redux state
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  // Fetch sales
  useEffect(() => {
    dispatch(getMyAllSales());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <DashboardHeadersEmployee />
      <DashboardStatsEmployee />

      <div className="w-full gap-6">
        <div className="bg-black/60 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Sales</h2>
          <RecaentEmployeeSales filteredSales={latestFiveSales} />
        </div>
      </div>
      <div className="text-2xl font-bold">
        <h2>Charts</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlySalesBarChart mySales={mySales} />
        <SalesTypePieChart mySales={mySales} />
      </div>
    </div>
  );
};

export default EmployeeDashboardHome;
