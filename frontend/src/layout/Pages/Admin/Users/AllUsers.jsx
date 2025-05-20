import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "../../../store/UserSlice/userSliceReducers";
import UsersTable from "../../../Components/Admin/UsersTable";
import { CiSearch } from "react-icons/ci";

export default function AllUsers() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.auth);

  // Add state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!allUsers) return [];

    if (!searchQuery.trim()) return allUsers;

    return allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allUsers, searchQuery]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users Management</h1>
      </div>

      <div className="bg-black/60 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-md">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <CiSearch className=" absolute top-3 text-xl left-2 text-gray-200" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-8 bg-transparent w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-4 py-2 rounded-md flex items-center text-sm">
            Filter
          </button>
        </div>

        <UsersTable users={filteredUsers} />
      </div>
    </div>
  );
}
