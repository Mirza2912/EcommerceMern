import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import {
  deleteOrderAdmin,
  getAllOrdersAdmin,
} from "../../store/OrderSlice/orderSliceReducers";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const OrdersTable = () => {
  const { loading, allOrders } = useSelector((state) => state.order);

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();
  const disptach = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  // Filter orders by status
  const filteredOrders =
    statusFilter === "All"
      ? allOrders
      : allOrders?.filter((order) => order.orderStatus === statusFilter);

  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;

  const paginatedOrders = filteredOrders?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allOrders && allOrders?.length / ordersPerPage);

  const toggleDropdown = (orderId) => {
    setDropdownOpen(dropdownOpen === orderId ? null : orderId);
  };

  useEffect(() => {
    disptach(getAllOrdersAdmin());
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4 w-full">
          {/* FILTER SECTION */}
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
                <option className="text-black" value="Pending">
                  Pending
                </option>
                <option className="text-black" value="Processing">
                  Processing
                </option>
                <option className="text-black" value="Processing">
                  Shipped{" "}
                </option>
                <option className="text-black" value="Processing">
                  Out for Delivery{" "}
                </option>
                <option className="text-black" value="Delivered">
                  Delivered
                </option>
                <option className="text-black" value="Cancelled">
                  Cancelled
                </option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                ▼
              </div>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="overflow-x-auto rounded-t-lg md:rounded-lg border border-gray-700">
            <table className="min-w-full text-sm text-white">
              <thead>
                <tr className="bg-black/30 border-b border-gray-700 text-left text-xs sm:text-sm">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders?.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-700 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.user?.avatar?.url}
                          alt={order.user?.name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {order.user?.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {order.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center sm:text-start">
                      {order.orderItems?.length}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      Rs.{order.totalPrice}
                    </td>
                    <td className="px-4 py-3">{order.orderStatus}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          title="Edit Order"
                          to={`/admin/dashboard/orders/order/details/${order._id}`}
                        >
                          <LiaEditSolid className="text-xl text-gold hover:text-[#d99f18]" />
                        </Link>
                        <button
                          title="Delete Order"
                          onClick={() => disptach(deleteOrderAdmin(order._id))}
                        >
                          <MdDelete className="text-xl text-red-600 hover:text-red-800" />
                        </button>
                        <div className="relative">
                          <button
                            title="More Options"
                            onClick={() => toggleDropdown(order._id)}
                            className="p-1 rounded-md hover:bg-gray-800"
                          >
                            <BiDotsHorizontalRounded className="w-5 h-4" />
                          </button>
                          {dropdownOpen === order._id && (
                            <div className="absolute right-5 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1" role="menu">
                                <Link
                                  onClick={() => toggleDropdown(null)}
                                  to={`/admin/dashboard/orders/order/details/${order._id}`}
                                  className="flex items-center gap-2 pl-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                  View details
                                </Link>
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

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-sm text-white">
              Showing {paginatedOrders.length} of {allOrders.length} orders
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`bg-gold text-white px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
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
                className={`bg-gold text-white px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
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
};

export default OrdersTable;
