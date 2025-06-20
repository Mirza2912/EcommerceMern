import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardHeadersEmployee = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back{" "}
          <span className="text-gold text-xl font-semibold">
            {" "}
            {user?.data?.name}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to={"/employee/dashboard/create-sale"}
          className="bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-4 py-2 rounded-md flex items-center text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create Sale
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeadersEmployee;
