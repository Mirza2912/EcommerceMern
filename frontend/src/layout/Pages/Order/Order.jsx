import React from "react";
import { useSelector } from "react-redux";

const Order = () => {
  const { order } = useSelector((state) => state.order);
  //   console.log(order);

  return <div>Order</div>;
};

export default Order;
