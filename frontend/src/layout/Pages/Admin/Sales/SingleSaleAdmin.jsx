import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSale } from "../../../store/SalesSlice/saleSliceReducers";
import Loader from "../../../Components/Loader/Loader";

const SingleSaleAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, singleSale } = useSelector((state) => state.sale);
  console.log(singleSale);

  useEffect(() => {
    dispatch(getSingleSale(id));
  }, []);
  return (
    <div className=" flex items-center justify-center ">
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] xl:w-[80%] w-[90%] mx-auto sm:w-[85%] sm:mx-auto border border-gray-700 my-10 bg-black/60 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-10 text-[#F7FAFC]">
          {/* Title */}
          <div className="mb-10">
            <h2 className="lg:text-6xl text-5xl font-bold text-center  mb-2">
              Sale Details
            </h2>
            <p className="text-center text-gray-400 text-base">
              Sale Done On :
              {new Date(singleSale && singleSale?.createdAt).toLocaleString()}
            </p>
            {singleSale && singleSale?.isReturned === true && (
              <p className="text-center text-gray-400 text-base">
                Sale Returned On :
                {new Date(
                  singleSale && singleSale?.returnedAt
                ).toLocaleString()}
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
                  {singleSale && singleSale?.saleType === "PHYSICAL"
                    ? singleSale?.customerName
                    : singleSale?.createdBy?.name}
                </p>
                {singleSale?.saleType === "ONLINE" ? (
                  <p>
                    <strong className="text-lg">Email:</strong>{" "}
                    {singleSale && singleSale?.createdBy?.email}
                  </p>
                ) : (
                  <p>
                    <strong className="text-lg">Number:</strong>{" "}
                    {singleSale && singleSale?.customerNumber}
                  </p>
                )}
                <p>
                  <strong className="text-lg">Sale Type:</strong>{" "}
                  {singleSale && singleSale?.saleType}
                </p>
                <p>
                  <strong className="text-lg">Payment Status:</strong> "Paid ✅"
                </p>
              </div>
            </div>

            {/* Section: Shipping Info */}
            {singleSale && singleSale?.saleType === "ONLINE" ? (
              <div className="">
                <h3 className="text-4xl font-bold mb-4 text-gold">
                  Shipping Address
                </h3>
                <p className="text-lg">
                  {singleSale?.orderId?.shippingInfo?.address},{" "}
                  {singleSale?.orderId?.shippingInfo?.city},{" "}
                  {singleSale?.orderId?.shippingInfo?.state},{" "}
                  {singleSale?.orderId?.shippingInfo?.country}
                </p>
              </div>
            ) : (
              <div className="">
                <h3 className="text-4xl font-bold mb-4 text-gold">
                  Employee Info
                </h3>
                <p>
                  <strong className="text-lg">Name:</strong>{" "}
                  {singleSale && singleSale?.createdBy?.name}
                </p>
                <p>
                  <strong className="text-lg">Email:</strong>{" "}
                  {singleSale && singleSale?.createdBy?.email}
                </p>
                <p>
                  <strong className="text-lg">Role:</strong>{" "}
                  {singleSale && singleSale?.createdBy?.role}
                </p>
              </div>
            )}
          </div>

          {/* Section: Order Items */}
          <div className="mb-8 border-b border-gray-700 pb-4">
            <h3 className="text-4xl font-bold mb-4 text-gold">Sale Items</h3>
            <div className="space-y-4">
              {singleSale &&
                singleSale?.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border border-gray-700 rounded-lg p-2 sm:p-4"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <img
                        src={item.item?.images[0]?.url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex flex-col items-start justify-center gap-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <h4 className="text-sm font-medium">
                          {item.isReturned === true ? "Returned item" : ""}
                        </h4>
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
                {singleSale &&
                  singleSale?.items?.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
              </p>
              <p>
                <strong className="text-lg">Shipping Price:</strong> Rs.{" "}
                {singleSale && singleSale.saleType === "ONLINE"
                  ? singleSale?.orderId?.shippingPrice?.toFixed(2)
                  : 0}
              </p>
              <p>
                <strong className="text-lg">Tax:</strong> Rs.{" "}
                {singleSale && singleSale.saleType === "ONLINE"
                  ? singleSale?.orderId?.taxPrice?.toFixed(2)
                  : 0}
              </p>
              <p>
                <strong className="text-lg">Total Price:</strong>{" "}
                <span className="text-gold font-bold">
                  Rs. {singleSale && singleSale?.totalAmount?.toFixed(2)}
                </span>
              </p>

              {singleSale && singleSale?.isReturned === true && (
                <p>
                  <strong className="text-lg">Return Amount:</strong>{" "}
                  <span className="text-gold font-bold">
                    Rs. {singleSale && singleSale?.returnedAmount?.toFixed(2)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSaleAdmin;
