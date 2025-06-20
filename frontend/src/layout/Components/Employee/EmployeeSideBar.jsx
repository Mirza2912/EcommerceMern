import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaList, FaBars } from "react-icons/fa";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { VscDebugStepBack } from "react-icons/vsc";
import { IoBarChartOutline } from "react-icons/io5";
import { userLogOut } from "../../store/UserSlice/userSliceReducers";

export default function EmployeeSideBar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(userLogOut());
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        className="lg:hidden fixed top-[10rem] sm:top-[12rem] md:top-[8.2rem] md:right-[18rem] right-2 sm:right-7 z-50 lg:z-0 bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-4 py-2 rounded-md flex items-center text-sm"
        onClick={toggleSidebar}
      >
        {isOpen ? "close panel" : "open panel"}
      </button>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 bg-bg-color" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
        w-64 bg-[rgba(0, 0, 0, 0.8)] text-[#E2E8F0] border-t border-r border-b border-gray-700 min-h-screen flex-col`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-gold">Logo</h1>
          <p className="text-sm">Employee Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            {
              path: "/employee/dashboard",
              label: "Dashboard",
              icon: <RxDashboard className="text-xl mr-3" />,
            },

            {
              path: "/employee/dashboard/create-sale",
              label: "Create Sale",
              icon: <IoMdAdd className="text-xl mr-3" />,
            },
            {
              path: "/employee/dashboard/my-sales",
              label: "My Sales",
              icon: <FaList className="text-xl mr-3" />,
            },
            {
              path: "/employee/dashboard/return-sale",
              label: "Return Sale",
              icon: <VscDebugStepBack className="mr-3 h-5 w-5" />,
            },
            {
              path: "/admin/dashboard/sales",
              label: "Sales Summary",
              icon: <IoBarChartOutline className="mr-3 h-5 w-5" />,
            },
            {
              path: "/employee/dashboard/profile",
              label: "My Profile",
              icon: <FiUsers className="mr-3 h-5 w-5" />,
            },
          ].map(({ path, label, icon }) => (
            <NavLink
              end
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-[rgba(255, 215, 0, 0.2)] text-gold text-lg flex items-center justify-start p-2"
                  : "text-[#E2E8F0] hover:bg-[rgba(255, 215, 0, 0.1)] hover:text-gold text-lg flex items-center justify-start p-2"
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 relative">
          <button
            onClick={handleLogout}
            className="flex px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-gray-100 hover:text-black w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
