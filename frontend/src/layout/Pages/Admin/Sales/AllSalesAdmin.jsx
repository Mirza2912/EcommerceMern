import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSales } from "../../../store/SalesSlice/saleSliceReducers";
import SalesTable from "../../../Components/Admin/SalesTable";

const AllSalesAdmin = () => {
  const [active, setActive] = useState("all");

  const dispatch = useDispatch();

  const { sales } = useSelector((state) => state.sale);
  const [filteredSales, setFilteredSales] = useState([]);
  // console.log(filteredSales);

  const [dateRange, setDateRange] = useState("all");

  const filters = [
    { key: "all", label: "🧾 All Sales" },
    { key: "physical", label: "🏪 Physical Sales" },
    { key: "online", label: "💻 Online Sales" },
    { key: "returned", label: "🔄 Returned" },
  ];

  const filterSales = (key) => {
    let filtered = sales;

    // Type filter
    if (key !== "all") {
      if (key === "physical") {
        filtered = filtered.filter((sale) => sale.saleType === "PHYSICAL");
      } else if (key === "online") {
        filtered = filtered.filter((sale) => sale.saleType === "ONLINE");
      } else if (key === "returned") {
        filtered = filtered.filter((sale) => sale.isReturned === true);
      }
    }

    // Date filter
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
        const created =
          sale.saleType === "ONLINE"
            ? new Date(sale.orderId?.createdAt)
            : new Date(sale.createdAt);
        return created >= fromDate;
      });
    }

    setFilteredSales(filtered);
  };

  // const filterSales = (key) => {
  //   if (key === "all") {
  //     setFilteredSales(sales);
  //   } else if (key === "physical") {
  //     setFilteredSales(sales.filter((sale) => sale.saleType === "PHYSICAL"));
  //   } else if (key === "online") {
  //     setFilteredSales(sales.filter((sale) => sale.saleType === "ONLINE"));
  //   } else if (key === "returned") {
  //     setFilteredSales(sales.filter((sale) => sale.isReturned === true));
  //   } else if (key === "cancelled") {
  //     setFilteredSales(sales.filter((sale) => sale.isCancelled === true));
  //   }
  // };
  const handleClick = (key) => {
    setActive(key);
    filterSales(key);
  };

  useEffect(() => {
    if (sales?.length) {
      filterSales("all"); // show all sales initially
    }
  }, [sales, dateRange]);

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Sales Management</h1>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-4">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => handleClick(filter.key)}
            className={`text-sm sm:text-base px-4 py-2 rounded-full font-medium transition-all duration-200
            ${
              active === filter.key
                ? "bg-gold text-white shadow-md"
                : "bg-gray-800 text-white hover:text-[#d99f18]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="bg-black/60 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-[#F7FAFC]">
            Filter By Date:
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
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
              ▼
            </div>
          </div>
        </div>

        <SalesTable filteredSales={filteredSales} />
      </div>
    </div>
  );
};

export default AllSalesAdmin;
