import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllEmployees,
  suspendUser,
  unSuspendUser,
} from "../../store/UserSlice/userSliceReducers";
import { LuEye } from "react-icons/lu";
import { MdDelete, MdOutlineAccountCircle } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import Loader from "../Loader/Loader";

const EmployeeTable = ({ employees }) => {
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  const { allEmployees, isLoading } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 8;

  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;

  const paginatedEmployees = employees?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    employees && employees?.length / employeesPerPage
  );

  // useEffect(() => {
  //   dispatch(getAllEmployees());
  // }, []);

  const toggleDropdown = (employeeId) => {
    if (dropdownOpen === employeeId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(employeeId);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-4 w-full overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-left">
              <thead>
                <tr className="text-sm text-[#F7FAFC] border-b border-gray-700">
                  <th className="font-medium text-left pb-3 pl-4">Employee</th>
                  <th className="font-medium text-left pb-3">ID</th>
                  <th className="font-medium text-left pb-3">Sales</th>
                  <th className="font-medium text-left pb-3">Status</th>
                  <th className="font-medium text-right pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees &&
                  paginatedEmployees?.map((employee) => (
                    <tr
                      key={employee._id}
                      className="border-b last:border-0 border-gray-700 hover:bg-bg-color"
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full overflow-hidden">
                            <img
                              src={employee.avatar && employee.avatar?.url}
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {employee.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-medium">
                          {employee.employeeId}
                        </span>
                      </td>
                      <td className="py-3">
                        <Link
                          to={`/admin/dashboard/employee/single-employee-sales/${employee._id}`}
                          className="text-gold hover:underline"
                        >
                          View Sales
                        </Link>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            employee.isOnline
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {employee.isOnline ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right ">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/dashboard/employee/single-employee/details/${employee._id}`}
                          >
                            <LuEye className="text-xl mr-1 mt-1 text-gold hover:text-[#d99f18]" />
                          </Link>
                          <button
                            onClick={() =>
                              dispatch(
                                deleteUser({ id: employee._id, type: "emp" })
                              )
                            }
                          >
                            <MdDelete className="text-xl text-red-600 hover:text-red-800" />
                          </button>
                          <div>
                            <button
                              onClick={() => toggleDropdown(employee._id)}
                              className="p-1 rounded-md hover:bg-gray-800"
                            >
                              <BiDotsHorizontalRounded className="w-5 h-4" />
                            </button>
                            {dropdownOpen === employee._id && (
                              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                                <div
                                  className="py-1"
                                  role="menu"
                                  aria-orientation="vertical"
                                >
                                  <Link
                                    onClick={() => toggleDropdown(null)}
                                    to={`/admin/dashboard/employees/single-employee/${employee._id}`}
                                    className="flex items-center gap-1 pl-2 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                  >
                                    <FaRegEdit className="text-lg" />
                                    Edit Employee
                                  </Link>
                                  <button
                                    onClick={() => {
                                      employee.isSuspended === true
                                        ? dispatch(
                                            unSuspendUser({
                                              id: employee._id,
                                              type: "emp",
                                            })
                                          )
                                        : dispatch(
                                            suspendUser({
                                              id: employee._id,
                                              type: "emp",
                                            })
                                          );
                                      toggleDropdown(null);
                                    }}
                                    className="flex items-center gap-1 pl-1.5 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                  >
                                    <MdOutlineAccountCircle className="text-lg" />
                                    {employee.isSuspended === true
                                      ? "Unsuspend account"
                                      : "Suspend account"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-400">
              Showing {paginatedEmployees.length} of {employees.length}{" "}
              employees
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`bg-gold text-white px-3 py-1 rounded-md text-sm ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm border border-gray-700 rounded-md ${
                      currentPage === page
                        ? "bg-orange-50 text-gold"
                        : "hover:bg-gray-50 text-gold"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`bg-gold text-white px-3 py-1 rounded-md text-sm ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
