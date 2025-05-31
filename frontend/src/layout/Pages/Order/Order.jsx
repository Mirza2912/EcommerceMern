import React, { useEffect, useState } from "react";
import OrdersTable from "../../Components/Orders/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../store/OrderSlice/orderSlice";
import { getAllOrders } from "../../store/OrderSlice/orderSliceReducers";
import { FaRegFaceFrown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Order = () => {
  const dispatch = useDispatch();
  const { error, order } = useSelector((state) => state.order);
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
      {order?.length > 0 ? (
        <>
          <h2 className="text-xl font-bold mb-4">Your Orders</h2>
          <OrdersTable />
        </>
      ) : (
        <div className="text-center my-20">
          <p className="text-center flex items-center justify-center gap-5  text-4xl sm:text-6xl font-bold text-gold ">
            You haven’t placed any orders yet. <FaRegFaceFrown />
          </p>
          <Link to={"/products"}>
            <button
              type="button"
              className="font-medium mt-3 text-gold hover:text-[#9f522bf8]"
            >
              Continue Shopping...
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Order;
