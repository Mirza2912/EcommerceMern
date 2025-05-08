import React, { useEffect, useMemo, useState } from "react";
import { BiSolidFace } from "react-icons/bi";
import { FaAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/OrderSlice/orderSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../../store/OrderSlice/orderSlice";

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  //   console.log(selectedOption);

  const isLoading = false;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const { shippingAddress } = useSelector((state) => state.order);
  // console.log(shippingAddress);

  const { user } = useSelector((state) => state.auth);

  const { loading, order, error } = useSelector((state) => state.order);
  //   console.log(order);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const orderItems = useMemo(() => {
    return cartItems.map((item) => ({
      item: item?.product?._id,
      name: item?.product?.name,
      quantity: item?.quantity,
      price: item?.product?.price,
      image: {
        public_id: item?.product?.images[0]?.public_id,
        url: item?.product?.images[0]?.url,
      },
    }));
  }, [cartItems]);

  const itemsPrice = cartItems?.reduce((acc, item) => acc + item.price, 0);

  const orderData = {
    shippingInfo: shippingAddress,
    orderItems,
    paymentMethod: selectedOption,
    shippingPrice: orderInfo?.shippingPrice,
    itemsPrice,
    totalPrice: orderInfo?.totalPrice,
  };

  const handleSubmit = () => {
    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <>
      <div className=" mb-5">
        <h2 className="lg:text-6xl text-5xl font-bold text-white/90 text-center mb-3">
          Payment
        </h2>
        <div className="flex items-center justify-center text-white/90 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <span>Payment</span>
        </div>
      </div>
      <div className="flex items-center justify-center bg-bg-color p-6 mb-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Choose Payment Method
          </h2>

          <div className="space-y-4">
            {/* COD Option */}
            <div
              className={`cursor-pointer border-2 rounded-xl p-4 transition ${
                selectedOption === "COD"
                  ? "border-gold bg-gold text-white/90 hover:bg-gold/90"
                  : "border-gold hover:bg-gold hover:text-white/90"
              }`}
              onClick={() => setSelectedOption("COD")}
            >
              <h3 className="text-lg font-medium">Cash on Delivery</h3>
            </div>

            {/* Card Option */}
            <div
              className={`cursor-pointer border-2 rounded-xl p-4 transition ${
                selectedOption === "CARD"
                  ? "border-gold bg-gold text-white/90 hover:bg-gold/90"
                  : "border-gold hover:bg-gold hover:text-white/90"
              }`}
              onClick={() => setSelectedOption("CARD")}
            >
              <h3 className="text-lg font-medium">Pay with Card</h3>
            </div>
          </div>

          {/* Card Payment Form */}
          {selectedOption === "CARD" && (
            <form className="mt-6 space-y-4 relative">
              <BiSolidFace className="absolute top-8 left-3 text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
              />
              <FaAddressCard className="absolute top-[5rem] left-3 text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
              />
              <div className="flex gap-4 relative">
                <BsCalendar2DateFill className="absolute top-4 left-3 text-xl text-gray-500" />

                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
                />
                <div className="relative">
                  <BsCalendar2DateFill className="absolute top-4 left-3 text-xl text-gray-500" />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
              </div>
            </form>
          )}

          {/* COD Confirmation */}
          {selectedOption === "COD" && (
            <div className="mt-6 text-center text-gold font-medium">
              You have selected Cash on Delivery.
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full border mt-3 rounded-full border-[#ffc253] hover:bg-[#ffce53] hover:text-white/90 hover:border-[#ffce53]  text-black font-bold py-3 transition duration-200 ${
              isLoading && "opacity-50 hover:cursor-wait"
            }`}
          >
            {isLoading ? <LoaderForForms input={"Register"} /> : "Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
