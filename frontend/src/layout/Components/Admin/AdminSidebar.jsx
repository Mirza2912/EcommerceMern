import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../store/UserSlice/userSliceReducers";
import { FaList } from "react-icons/fa";

export default function AdminSidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogOut());
  };

  return (
    <aside className="w-64 bg-[rgba(0, 0, 0, 0.8)] text-[#E2E8F0] border-t border-r border-b border-gray-700 h-screen  flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-gold">Logo</h1>
        <p className="text-sm ">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavLink
          to={"/admin/dashboard"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-[rgba(255, 215, 0, 0.2)] text-gold text-lg  flex items-center justify-start p-2"
              : "text-[#E2E8F0]hover:bg-[rgba(255, 215, 0, 0.1)] hover:text-gold text-lg flex items-center justify-start p-2"
          }
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
            <rect x="2" y="2" width="6" height="6" />
            <rect x="16" y="2" width="6" height="6" />
            <rect x="2" y="16" width="6" height="6" />
            <rect x="16" y="16" width="6" height="6" />
          </svg>
          Dashboard
        </NavLink>

        <NavLink
          to={"/admin/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? "bg-[rgba(255, 215, 0, 0.2)] text-gold text-lg  flex items-center justify-start p-2"
              : "text-[#E2E8F0]hover:bg-[rgba(255, 215, 0, 0.1)] hover:text-gold text-lg flex items-center justify-start p-2"
          }
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Users
        </NavLink>

        <NavLink
          to={"/admin/dashboard/products"}
          className={({ isActive }) =>
            isActive
              ? "bg-[rgba(255, 215, 0, 0.2)] text-gold text-lg  flex items-center justify-start p-2"
              : "text-[#E2E8F0]hover:bg-[rgba(255, 215, 0, 0.1)] hover:text-gold text-lg flex items-center justify-start p-2"
          }
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
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Products
        </NavLink>

        <NavLink
          to={"/admin/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-[rgba(255, 215, 0, 0.2)] text-gold text-lg  flex items-center justify-start p-2"
              : "text-[#E2E8F0] hover:bg-[rgba(255, 215, 0, 0.1)] hover:text-gold text-lg flex items-center justify-start p-2"
          }
        >
          <FaList className="mr-3 h-5 w-5" />
          Orders
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-700 mt-auto">
        {/* <NavLink
          to={"/admin/dashboard/setting"}
          className={({ isActive }) =>
            isActive
              ? "bg-orange-50 text-orange-500 flex items-center justify-start p-2"
              : "text-gray-700 hover:bg-gray-100 flex items-center justify-start p-2"
          }
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
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </NavLink> */}

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100 w-full"
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
  );
}
