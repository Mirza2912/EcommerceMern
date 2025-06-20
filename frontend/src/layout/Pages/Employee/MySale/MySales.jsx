import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyAllSales } from "../../../store/SalesSlice/saleSliceReducers";
import EmployeeSaleTable from "../../../Components/Employee/EmployeeSaleTable";

const MySales = () => {
  const dispatch = useDispatch();
  const { mySales } = useSelector((state) => state.sale);

  const [filter, setFilter] = useState("all");
  const [returnFilter, setReturnFilter] = useState("all"); // ✅ New
  const [customerName, setCustomerName] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);

  // Fetch sales
  useEffect(() => {
    dispatch(getMyAllSales());
  }, [dispatch]);

  // Apply filters
  useEffect(() => {
    if (!mySales || mySales.length === 0) {
      setFilteredSales([]);
      return;
    }

    const now = new Date();
    let filtered = [...mySales];

    // 🔍 Filter by Date
    switch (filter) {
      case "today":
        filtered = filtered.filter((sale) => {
          const saleDate = new Date(sale.createdAt);
          return saleDate.toDateString() === now.toDateString();
        });
        break;
      case "last7":
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);
        filtered = filtered.filter((sale) => {
          const saleDate = new Date(sale.createdAt);
          return saleDate >= last7 && saleDate <= now;
        });
        break;
      case "last30":
        const last30 = new Date();
        last30.setDate(now.getDate() - 30);
        filtered = filtered.filter((sale) => {
          const saleDate = new Date(sale.createdAt);
          return saleDate >= last30 && saleDate <= now;
        });
        break;
      case "thisYear":
        filtered = filtered.filter((sale) => {
          const saleDate = new Date(sale.createdAt);
          return saleDate.getFullYear() === now.getFullYear();
        });
        break;
      default:
        break;
    }

    // 🔍 Filter by Return Status
    if (returnFilter === "returned") {
      filtered = filtered.filter((sale) => sale.isReturned === true);
    }

    // 🔍 Filter by Name/ID
    if (customerName.trim()) {
      const search = customerName.trim().toLowerCase();
      filtered = filtered.filter(
        (sale) =>
          sale.customerName?.toLowerCase().includes(search) ||
          sale.saleId?.toString().toLowerCase().includes(search)
      );
    }

    setFilteredSales(filtered);
  }, [mySales, filter, customerName, returnFilter]); // ✅ Added returnFilter to deps

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Sales Management</h1>
      </div>

      <div className="bg-black/60 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 flex-wrap">
          {/* Filter by Date */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <h2 className="text-lg font-semibold text-[#F7FAFC]">
              Filter By Date:
            </h2>
            <div className="relative w-full sm:w-[180px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full appearance-none border border-gray-700 rounded bg-transparent text-white text-sm px-3 py-2 pr-10 focus:outline-none"
              >
                <option className="text-black" value="all">
                  All Time
                </option>
                <option className="text-black" value="today">
                  Today
                </option>
                <option className="text-black" value="last7">
                  Last 7 Days
                </option>
                <option className="text-black" value="last30">
                  Last 30 Days
                </option>
                <option className="text-black" value="thisYear">
                  This Year
                </option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                ▼
              </div>
            </div>
          </div>

          {/* ✅ New Return Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <h2 className="text-lg font-semibold text-[#F7FAFC]">
              Return Filter:
            </h2>
            <div className="relative w-full sm:w-[180px]">
              <select
                value={returnFilter}
                onChange={(e) => setReturnFilter(e.target.value)}
                className="w-full appearance-none border border-gray-700 rounded bg-transparent text-white text-sm px-3 py-2 pr-10 focus:outline-none"
              >
                <option className="text-black" value="all">
                  All Sales
                </option>
                <option className="text-black" value="returned">
                  Returned Only
                </option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                ▼
              </div>
            </div>
          </div>

          {/* Search by Customer or ID */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <h2 className="text-lg font-semibold text-[#F7FAFC]">
              Search by Name or ID:
            </h2>
            <input
              type="text"
              placeholder="Customer name or sale ID"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full sm:w-[200px] border border-gray-700 rounded bg-transparent text-white text-sm px-3 py-2 focus:outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        <EmployeeSaleTable filteredSales={filteredSales} />
      </div>
    </div>
  );
};

export default MySales;
