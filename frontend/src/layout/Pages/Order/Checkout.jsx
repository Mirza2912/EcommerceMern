import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdPayments } from "react-icons/md";

import { Outlet } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  //   console.log(location.pathname);

  return (
    <section className="w-full px-6 mt-10 sm:mt-32  mx-auto flex flex-col items-center">
      <div className="relative flex justify-between items-center w-full max-w-xl mb-8 px-6">
        {/* Line connecting the icons */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 z-10 transform -translate-y-1/2" />

        {/* Shipping Icon */}
        <Link
          to="/checkout/shipping"
          className={`${
            location.pathname === "/checkout/shipping"
              ? "bg-gold text-white hover:bg-gold"
              : "bg-[#F0F2F5] text-gray-800 hover:bg-gold hover:text-white"
          } text-3xl ease-in duration-100 rounded-full p-4 shadow-xl z-10`}
        >
          <FaShippingFast />
        </Link>

        {/* Confirm Icon */}
        <Link
          to="/checkout/order-confirm"
          className={`${
            location.pathname === "/checkout/order-confirm"
              ? "bg-gold text-white hover:bg-gold"
              : "bg-[#F0F2F5] text-gray-800 hover:bg-gold hover:text-white"
          } text-3xl ease-in duration-100 rounded-full p-4 shadow-xl z-10`}
        >
          <GiConfirmed />
        </Link>

        {/* Payment Icon */}
        <Link
          to="/checkout/payment"
          className={`${
            location.pathname === "/checkout/payment"
              ? "bg-gold text-white hover:bg-gold"
              : "bg-[#F0F2F5] text-gray-800 hover:bg-gold hover:text-white"
          } text-3xl ease-in duration-100 rounded-full p-4 shadow-xl z-10`}
        >
          <MdPayments />
        </Link>
      </div>

      {/* Where nested routes show */}
      <Outlet />
    </section>
  );
};

export default Checkout;
