import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../../store/UserSlice/userSliceReducers";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import Loader from "../../../Components/Loader/Loader";
import EmployeeTable from "../../../Components/Admin/EmployeeTable";

const AllEmployee = () => {
  const dispatch = useDispatch();

  const { allEmployees, isLoading } = useSelector((state) => state.auth);
  // console.log(allEmployees);

  // Add state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter admin based on search query
  const employees = useMemo(() => {
    if (!allEmployees) return [];

    if (!searchQuery.trim()) return allEmployees;

    return allEmployees.filter((emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allEmployees, searchQuery]);
  // console.log(employees);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 md:p-6 space-y-6 w-full overflow-hidden ">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Employee Management
            </h1>
            <Link
              to={"/admin/dashboard/employee/create-new-employee"}
              className="bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-4 py-2 rounded-md flex items-center text-sm justify-center gap-1"
            >
              <FiPlus className="text-lg" />
              Add New Employee
            </Link>
          </div>

          {/* Main Card with Search and Table */}
          <div className="bg-black/60  backdrop-blur-lg p-4 md:p-6 rounded-lg border border-gray-700 shadow-md w-full ">
            {/* Search Bar */}
            <div className="flex items-center mb-4">
              <div className="relative w-full">
                <IoMdSearch className="absolute left-3 top-2.5 text-xl text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employee..."
                  className="pl-10 bg-transparent w-full h-10 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table Component */}
            <div className="overflow-x-auto ">
              <EmployeeTable employees={employees} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllEmployee;
