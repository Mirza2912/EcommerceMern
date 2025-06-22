import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSale,
  getAllSales,
} from "../../store/SalesSlice/saleSliceReducers";
import Loader from "../Loader/Loader";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { LuEye } from "react-icons/lu";

const SalesTable = ({ filteredSales }) => {
  //   console.log(filteredSales);

  const { loading, sales } = useSelector((state) => state.sale);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const salesPerPage = 8;

  const startIndex = (currentPage - 1) * salesPerPage;
  const endIndex = startIndex + salesPerPage;

  const paginatedSales = filteredSales?.slice(startIndex, endIndex);
  //   console.log(paginatedSales);

  const totalPages = Math.ceil(
    filteredSales && filteredSales?.length / salesPerPage
  );

  useEffect(() => {
    dispatch(getAllSales());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4 w-full">
          {/* TABLE SECTION */}
          <div className="overflow-x-auto rounded-t-lg md:rounded-lg border border-gray-700">
            <table className="min-w-full text-sm text-white">
              <thead>
                <tr className="bg-black/30 border-b border-gray-700 text-left text-xs sm:text-sm">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Sale ID</th>
                  <th className="py-3 px-4">Return</th>
                  <th className="py-3 px-4">Return At</th>
                  <th className="py-3 px-4">Sale Type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 ">Done At</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSales?.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-700 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3">
                      {order.customerName || order.orderId?.user?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {order.saleId || order._id || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {order.isReturned ? "Returned" : ""}
                    </td>
                    <td className="px-4 py-3">
                      {order.isReturned === true
                        ? new Date(order.returnedAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-4 py-3 text-center sm:text-start">
                      {order.saleType}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      Rs.{order.totalAmount}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-4">
                        <Link
                          title="Edit Order"
                          to={`/admin/dashboard/sales/single-sale/${order._id}`}
                        >
                          <LuEye className="text-xl text-gold hover:text-[#d99f18]" />
                        </Link>
                        <button
                          title="Delete Order"
                          onClick={() => dispatch(deleteSale(order._id))}
                        >
                          <MdDelete className="text-xl text-red-600 hover:text-red-800" />
                        </button>
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
              Showing {paginatedSales.length} of {filteredSales.length} sales
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

export default SalesTable;
