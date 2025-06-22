import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import {
  deleteUser,
  getAllUsers,
  suspendUser,
  unSuspendUser,
} from "../../store/UserSlice/userSliceReducers";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete, MdOutlineAccountCircle } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { LuEye } from "react-icons/lu";

// import { userDelete } from "../Store/Auth/AuthSliceReducers"

export default function UsersTable({ users }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { allUsers, isLoading } = useSelector((state) => state.auth);

  // console.log(users);

  const [statusFilter, setStatusFilter] = useState("All");
  // console.log(statusFilter);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const disptach = useDispatch();

  const filtereedUsers =
    statusFilter === "All"
      ? users
      : users?.filter((order) => order.role === statusFilter);
  // console.log(filtereedUsers);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const paginatedUsers = filtereedUsers?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users && users?.length / usersPerPage);

  const toggleDropdown = (userId) => {
    if (dropdownOpen === userId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(userId);
    }
  };
  useEffect(() => {
    disptach(getAllUsers());
  }, [disptach]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-4 w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-[#F7FAFC]">
              Filter by Status:
            </h2>
            <div className="relative w-full max-w-xs">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none border border-gray-700 rounded bg-transparent text-white text-sm px-3 py-2 pr-10 focus:outline-none"
              >
                <option className="text-black" value="All">
                  All
                </option>
                <option className="text-black" value="admin">
                  Admin
                </option>
                <option className="text-black" value="user">
                  User
                </option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                ▼
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-left">
              <thead>
                <tr className="text-sm text-[#F7FAFC] border-b border-gray-700">
                  <th className=" font-medium text-left pb-3 pl-4">User</th>
                  <th className=" font-medium text-left pb-3">Role</th>
                  <th className=" font-medium text-left pb-3">Phone</th>
                  <th className=" font-medium text-left pb-3">Status</th>
                  <th className=" font-medium text-right pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers &&
                  paginatedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b  last:border-0 border-gray-700 hover:bg-bg-color"
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full overflow-hidden">
                            <img
                              src={user.avatar?.url}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm">{user.role}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm">{user.phone}</span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isOnline
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.isOnline ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right ">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/dashboard/users/single-user/details/${user._id}`
                              )
                            }
                          >
                            <LuEye className="text-xl text-gold hover:text-[#d99f18]" />
                          </button>
                          <button
                            onClick={() =>
                              disptach(
                                deleteUser({ id: user._id, type: "user" })
                              )
                            }
                          >
                            <MdDelete className="text-xl text-red-600 hover:text-red-800" />
                          </button>
                          <div className="">
                            <button
                              onClick={() => toggleDropdown(user._id)}
                              className="p-1 rounded-md hover:bg-gray-800"
                            >
                              <BiDotsHorizontalRounded className="w-5 h-4" />
                            </button>
                            {dropdownOpen === user._id && (
                              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                                <div
                                  className="py-1 "
                                  role="menu"
                                  aria-orientation="vertical"
                                >
                                  <Link
                                    onClick={() => toggleDropdown(null)}
                                    to={`/admin/dashboard/users/single-user/details/${user._id}`}
                                    className="flex items-center gap-1 pl-2 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left "
                                    role="menuitem"
                                  >
                                    <FaRegEdit className="text-lg" />
                                    Edit User
                                  </Link>
                                  <button
                                    onClick={() => {
                                      user.isSuspended
                                        ? disptach(
                                            unSuspendUser({
                                              id: user._id,
                                              type: "user",
                                            })
                                          )
                                        : disptach(
                                            suspendUser({
                                              id: user._id,
                                              type: "user",
                                            })
                                          );

                                      toggleDropdown(null);
                                    }}
                                    className="flex items-center gap-1 pl-1.5 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                  >
                                    <MdOutlineAccountCircle className="text-lg" />

                                    {user.isSuspended
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
              Showing {paginatedUsers.length} of {users.length} users
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`bg-gold text-white px-3 py-1 rounded-md text-sm ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-[#d99f18]"
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
                        : "hover:bg-gray-50"
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
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-[#d99f18]"
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
}
