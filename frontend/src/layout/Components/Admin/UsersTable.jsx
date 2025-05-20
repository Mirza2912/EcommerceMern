import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import {
  deleteUser,
  getAllUsers,
} from "../../store/UserSlice/userSliceReducers";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";

// import { userDelete } from "../Store/Auth/AuthSliceReducers"

export default function UsersTable({ users }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { allUsers, isLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const disptach = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const paginatedUsers = users?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allUsers && allUsers?.length / usersPerPage);

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
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-[#F7FAFC] border-b border-gray-700">
                  <th className="font-medium text-left pb-3 pl-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-700 text-gold focus:ring-[#d99f18]"
                    />
                  </th>
                  <th className="font-medium text-left pb-3">User</th>
                  <th className="font-medium text-left pb-3">Role</th>
                  <th className="font-medium text-left pb-3">Phone</th>
                  <th className="font-medium text-left pb-3">Status</th>
                  <th className="font-medium text-right pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers &&
                  paginatedUsers?.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b last:border-0 border-gray-700"
                    >
                      <td className="py-3 pl-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full flex items-center justify-center ">
                            <img
                              src={user.avatar?.url}
                              alt={user.name}
                              className="w-full h-full bg-center bg-cover rounded-full"
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
                        <span className="text-sm t">{user.phone}</span>
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
                      <td className="py-3 text-right pr-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/dashboard/users/single-user/details/${user._id}`
                              )
                            }
                          >
                            <LiaEditSolid className="text-xl text-gold hover:text-[#d99f18]" />
                          </button>
                          <button
                            onClick={() => disptach(deleteUser(user?._id))}
                          >
                            <MdDelete className="text-xl text-red-600 hover:text-red-800" />
                          </button>
                          <div>
                            <button
                              onClick={() => toggleDropdown(user._id)}
                              className="p-1 rounded-md hover:bg-gray-800"
                            >
                              <BiDotsHorizontalRounded className="w-5 h-4" />
                            </button>
                            {dropdownOpen === user._id && (
                              <div className="absolute right-5 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div
                                  className="py-1"
                                  role="menu"
                                  aria-orientation="vertical"
                                >
                                  <Link
                                    to={`/admin/dashboard/users/single-user/details/${user._id}`}
                                    className=" flex items-center gap-2 pl-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                  >
                                    View profile
                                  </Link>
                                  <button
                                    onClick={() =>
                                      user?.isSuspended === false
                                        ? disptach(suspendUser(user._id))
                                        : disptach(unSuspendUser(user._id))
                                    }
                                    className=" flex items-center gap-2 pl-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                  >
                                    {user?.isSuspended === true
                                      ? "Unsuspend account"
                                      : " Suspend account"}
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

          <div className="flex items-center justify-between">
            <p className="text-sm ">
              Showing {paginatedUsers.length} of {allUsers.length} users
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-3 py-1 rounded-md flex items-center text-md ${
                  currentPage === 1
                    ? " cursor-not-allowed"
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
                className={`bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-3 py-1 rounded-md flex items-center text-md ${
                  currentPage === totalPages
                    ? " cursor-not-allowed"
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
