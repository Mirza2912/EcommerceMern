import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../store/UserSlice/userSliceReducers";
import { FaList, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function AdminSidebar() {
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
          <p className="text-sm">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            {
              path: "/admin/dashboard",
              label: "Dashboard",
              icon: (
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
                  <rect x="2" y="2" width="6" height="6" />
                  <rect x="16" y="2" width="6" height="6" />
                  <rect x="2" y="16" width="6" height="6" />
                  <rect x="16" y="16" width="6" height="6" />
                </svg>
              ),
            },
            {
              path: "/admin/dashboard/users",
              label: "Users",
              icon: (
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
            {
              path: "/admin/dashboard/products",
              label: "Products",
              icon: (
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
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              ),
            },
            {
              path: "/admin/dashboard/orders",
              label: "Orders",
              icon: <FaList className="mr-3 h-5 w-5" />,
            },
          ].map(({ path, label, icon }) => (
            <NavLink
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
