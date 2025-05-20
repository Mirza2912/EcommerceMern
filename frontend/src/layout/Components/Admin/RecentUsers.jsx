"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../store/UserSlice/userSliceReducers";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export default function RecentUsers() {
  const { allUsers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const firstFiveUsers = allUsers && allUsers?.slice(0, 5);

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (userId) => {
    if (dropdownOpen === userId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(userId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm border-b border-gray-700">
              <th className="font-medium text-left pb-3">User</th>
              <th className="font-medium text-left pb-3">Role</th>
              <th className="font-medium text-left pb-3">Status</th>
              <th className="font-medium text-right pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {firstFiveUsers &&
              firstFiveUsers?.map((user) => (
                <tr key={user._id} className="border-b last:border-0">
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
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-sm">{user.role}</span>
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
                  <td className="py-3 text-right">
                    <div className="">
                      <button
                        onClick={() => toggleDropdown(user._id)}
                        className="p-1 rounded-md hover:bg-gray-800"
                      >
                        <BiDotsHorizontalRounded className="w-5 h-4" />
                      </button>
                      {dropdownOpen === user._id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
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
                              <FaUser />
                              View details
                            </Link>
                            <Link
                              to={`/admin/dashboard/users/single-user/details/${user._id}`}
                              className=" flex items-center gap-2  pl-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              <AiFillEdit />
                              Edit user
                            </Link>
                            <button
                              onClick={() => dispatch(deleteUser(user._id))}
                              className="flex items-center gap-2 pl-3 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              <MdDelete />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <Link
          to={"/admin/dashboard/users"}
          className="bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-4 py-2 rounded-md flex items-center text-sm"
        >
          View All Users
        </Link>
      </div>
    </div>
  );
}
