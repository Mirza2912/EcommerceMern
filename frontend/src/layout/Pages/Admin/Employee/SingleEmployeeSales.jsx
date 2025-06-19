import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSalesOfEmployee } from "../../../store/SalesSlice/saleSliceReducers";
import Loader from "../../../Components/Loader/Loader";
import EmployeeSaleTable from "./EmployeeSaleTable";

const SingleEmployeeSales = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, singleEmployeeSale } = useSelector((state) => state.sale);
  console.log(singleEmployeeSale);

  const [filteredSales, setFilteredSales] = useState([]);
  //   console.log(filteredSales);

  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    setFilteredSales([]);
    dispatch(getSalesOfEmployee(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!singleEmployeeSale?.length) return;

    let filtered = [...singleEmployeeSale];
    const now = new Date();
    let fromDate;

    if (dateRange === "today") {
      fromDate = new Date();
      fromDate.setHours(0, 0, 0, 0);
    } else if (dateRange === "last7") {
      fromDate = new Date(now.setDate(now.getDate() - 7));
    } else if (dateRange === "last30") {
      fromDate = new Date(now.setDate(now.getDate() - 30));
    } else if (dateRange === "thisYear") {
      fromDate = new Date(new Date().getFullYear(), 0, 1);
    }

    if (dateRange !== "all" && fromDate) {
      filtered = filtered.filter((sale) => {
        const created = new Date(sale.createdAt);
        return created >= fromDate;
      });
    }

    setFilteredSales(filtered);
  }, [singleEmployeeSale, dateRange]);
  return singleEmployeeSale && singleEmployeeSale.length > 0 ? (
    <>
      {" "}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            {singleEmployeeSale[0]?.createdBy?.name} Sales
          </h1>
        </div>

        <div className="bg-black/60  backdrop-blur-lg p-4 md:p-6 rounded-lg border border-gray-700 shadow-md w-full ">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-[#F7FAFC]">
              Filter Sale:
            </h2>
            <div className="relative w-full max-w-xs">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
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
            </div>
          </div>
          <EmployeeSaleTable singleEmployeeSale={filteredSales} />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-center text-5xl text-gold font-bold ">
          Empty Sales
        </h2>
      </div>
    </>
  );
};

export default SingleEmployeeSales;
