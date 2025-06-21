import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleOrderDetailsAdmin,
  updateOrderStatus,
} from "../../../store/OrderSlice/orderSliceReducers";
import Loader from "../../../Components/Loader/Loader";
import { IoMdArrowDropdown } from "react-icons/io";

const SingleOrderDetailsAdmin = () => {
  const { id } = useParams();

  const { singleOrderAdmin, loading } = useSelector((state) => state.order);
  // console.log(singleOrderAdmin && singleOrderAdmin?.data);

  const dispatch = useDispatch();
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setStatusDropdown(false);

    const data = {
      id,
      status: newStatus,
    };
    dispatch(updateOrderStatus(data));
  };

  useEffect(() => {
    if (singleOrderAdmin?.data?.orderStatus) {
      setSelectedStatus(singleOrderAdmin.data.orderStatus);
    }
  }, [singleOrderAdmin]);
  useEffect(() => {
    dispatch(getSingleOrderDetailsAdmin(id));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] xl:w-[80%] w-[90%] mx-auto sm:w-[85%] sm:mx-auto border border-gray-700 my-10 bg-black/60 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-10 text-[#F7FAFC]">
          {/* Title */}
          <div className="mb-10">
            <h2 className="lg:text-6xl text-5xl font-bold text-center  mb-2">
              Order Details
            </h2>
            <p className="text-center text-gray-400 text-base">
              Placed On :{" "}
              {new Date(
                singleOrderAdmin && singleOrderAdmin?.data?.createdAt
              ).toLocaleString()}
            </p>
            {singleOrderAdmin?.data?.updatedAt &&
              singleOrderAdmin?.data?.createdAt !==
                singleOrderAdmin?.data?.updatedAt && (
                <p className="text-center text-gray-400 text-base">
                  Last Update At:{" "}
                  {new Date(singleOrderAdmin?.data?.updatedAt).toLocaleString()}
                </p>
              )}
          </div>

          <div className="w-[100%] flex justify-between lg:flex-row flex-col mb-8 pb-4 border-b border-gray-700">
            {/* Section: User Info & Status */}
            <div className="border-b border-gray-700 lg:border-none mb-8 lg:mb-0 pb-4 lg-pb-0">
              <h3 className="text-4xl font-bold mb-4 text-gold">
                Customer Info
              </h3>
              <div className="space-y-2 text-md mb-2">
                <p>
                  <strong className="text-lg">Name:</strong>{" "}
                  {singleOrderAdmin && singleOrderAdmin?.data?.user?.name}
                </p>
                <p>
                  <strong className="text-lg">Email:</strong>{" "}
                  {singleOrderAdmin && singleOrderAdmin?.data?.user?.email}
                </p>
                <p>
                  <strong className="text-lg">Payment Method:</strong>{" "}
                  {singleOrderAdmin && singleOrderAdmin?.data?.paymentMethod}
                </p>
                <p>
                  <strong className="text-lg">Payment Status:</strong>{" "}
                  {singleOrderAdmin && singleOrderAdmin?.data?.isPaid
                    ? "Paid ✅"
                    : "Not Paid ❌"}
                </p>
              </div>

              <div className="relative ">
                <div
                  onClick={() => setStatusDropdown(!statusDropdown)}
                  className="flex items-center gap-1 text-lg cursor-pointer"
                >
                  <strong>Order Status:</strong>{" "}
                  <span className="text-gold ml-2">{selectedStatus}</span>
                  <IoMdArrowDropdown className="text-gold text-2xl" />
                </div>

                {statusDropdown && (
                  <div className="absolute z-10 mt-2 left-16 bg-white text-black border rounded shadow-lg w-40 text-sm">
                    {[
                      "Pending",
                      "Processing",
                      "Shipped",
                      "Out for Delivery",
                      "Delivered",
                    ].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section: Shipping Info */}
            <div className="">
              <h3 className="text-4xl font-bold mb-4 text-gold">
                Shipping Address
              </h3>
              <p className="text-lg">
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.shippingInfo?.address}
                ,{" "}
                {singleOrderAdmin && singleOrderAdmin?.data?.shippingInfo?.city}
                ,{" "}
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.shippingInfo?.state}
                ,{" "}
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.shippingInfo?.country}
              </p>
            </div>
          </div>

          {/* Section: Order Items */}
          <div className="mb-8 border-b border-gray-700 pb-4">
            <h3 className="text-4xl font-bold mb-4 text-gold">Order Items</h3>
            <div className="space-y-4">
              {singleOrderAdmin &&
                singleOrderAdmin?.data?.orderItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border border-gray-700 rounded-lg p-2 sm:p-4"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <img
                        src={item.image?.url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex flex-col items-start justify-center gap-4">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-md font-semibold">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Section: Pricing Summary */}
          <div>
            <h3 className="text-4xl font-bold mb-4 text-gold">
              Pricing Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md">
              <p>
                <strong className="text-lg">Items Price:</strong> Rs.{" "}
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.itemsPrice?.toFixed(2)}
              </p>
              <p>
                <strong className="text-lg">Shipping Price:</strong> Rs.{" "}
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.shippingPrice?.toFixed(2)}
              </p>
              <p>
                <strong className="text-lg">Tax:</strong> Rs.{" "}
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.taxPrice?.toFixed(2)}
              </p>
              <p>
                <strong className="text-lg">Total Price:</strong>{" "}
                <span className="text-gold font-bold">
                  Rs.{" "}
                  {singleOrderAdmin &&
                    singleOrderAdmin?.data?.totalPrice?.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleOrderDetailsAdmin;
