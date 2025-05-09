import React, { useEffect, useState } from "react";
import OrdersTable from "../../Components/Orders/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../store/OrderSlice/orderSlice";
import { getAllOrders } from "../../store/OrderSlice/orderSliceReducers";

const Order = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.order);
  // console.log(order);

  useEffect(() => {
    dispatch(getAllOrders());
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <div className="p-4 sm:my-10 md:my-14">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      <OrdersTable />
    </div>
  );
};

export default Order;
