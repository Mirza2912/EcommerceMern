import React from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuEye } from "react-icons/lu";

const RecaentEmployeeSales = ({ filteredSales }) => {
  const { loading } = useSelector((state) => state.sale);
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
                {filteredSales?.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-700 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">{order.saleId}</td>
                    <td className="px-4 py-3">
                      {order.isReturned === true ? "Returned" : ""}
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
                          title="View Sale"
                          to={`/employee/dashboard/my-sales/single-sale/${order._id}`}
                        >
                          <LuEye className="text-xl text-gold hover:text-[#d99f18]" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default RecaentEmployeeSales;
