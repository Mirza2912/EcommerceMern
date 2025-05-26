import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdmin } from "../../../store/OrderSlice/orderSliceReducers";
import OrdersTable from "../../../Components/Admin/OrdersTable";
// import OrdersTable from "../../components/orders-table";

const AllOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, []);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Orders Management</h1>
      </div>

      <div className="bg-black/60 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-md">
        <OrdersTable />
      </div>
    </div>
  );
};

export default AllOrders;
