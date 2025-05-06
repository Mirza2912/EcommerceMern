import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { shippingAddress, loading } = useSelector((state) => state.order);
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  const handleProceedToPayment = () => {
    const data = {
      shippingPrice: shipping,
      totalPrice: subTotal + shipping,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/checkout/payment");
  };

  useEffect(() => {
    const total = cartItems?.reduce((acc, item) => {
      const price = item?.product?.price || 0;
      const discount = item?.product?.discount || 0;
      const quantity = item?.quantity || 0;

      return acc + quantity * (price - discount);
    }, 0);

    setSubTotal(total);
    setShipping(total > 5000 ? 0 : 200);
  }, [cartItems]);
  return (
    <>
      <div className=" mb-10 ">
        <h2 className="lg:text-6xl text-5xl font-bold text-white/90 text-center mb-3">
          Order Confirmation
        </h2>
        <div className="flex items-center justify-center text-white/90 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <span>Confirm-Order</span>
        </div>
      </div>
      <div className="w-full lg:flex items-start justify-center gap-5 sm:w-[80%] md:w-[70%] lg:w-full xl:w-[80%] mb-10  bg-bg-color p-5">
        <div className="w-full flex flex-col ">
          <div className="shipping border border-gar-300 p-3 my-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-4xl  font-bold text-gold">Shipping Info</h2>
              <Link
                to={"/checkout/shipping"}
                className=" ease-in duration-100 rounded bg-gold  hover:bg-gold text-white/90 py-1 px-2"
              >
                Edit
              </Link>
            </div>
            <div className="w-full pl-2 border border-gray-300 p-5">
              <div className="text-white/90 flex items-center gap-4 mb-2">
                <p className="text-xl ">Address: </p>
                <p className="text-lg font-normal">
                  {shippingAddress?.address}
                </p>
              </div>
              <div className="text-white/90 flex items-center gap-4 mb-2">
                <p className="text-xl ">Phone: </p>
                <p className="text-lg font-normal">
                  {shippingAddress?.phoneNo}
                </p>
              </div>
              <div className="text-white/90 flex items-center gap-4">
                <p className="text-xl ">Postal Code: </p>
                <p className="text-lg font-normal">
                  {shippingAddress?.postalCode}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full border  border-gray-300 p-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-4xl  font-bold text-gold">Cart Items</h2>
              <Link
                to={"/cart"}
                className=" ease-in duration-100 rounded bg-gold  hover:bg-gold text-white/90 py-1 px-2"
              >
                Edit
              </Link>
            </div>
            <div className=" w-full  flex items-start justify-center">
              {/* carts  */}
              <div className="flex items-center flex-col justify-center w-full  border border-gray-400">
                {/* headings  */}
                <div className="w-full flex items-center justify-between px-4 py-3 text-white/90 text-lg font-semibold border-b border-gray-300">
                  <h3>Items</h3>
                  <h3 className="ml-24">Qty</h3>
                  <h3>Price</h3>
                </div>

                {/* carts  */}
                {cartItems?.map((item, index) => (
                  <div
                    key={item._id}
                    className={`w-full flex items-center justify-between py-3 px-2 ${
                      index !== cartItems.lenght - 1 &&
                      "border-b border-grap-300"
                    }`}
                  >
                    <div className="items-image-name flex items-center justify-center gap-1">
                      <img
                        className="w-16 h-16 object-cover object-center"
                        src={
                          item?.product?.images?.length > 0
                            ? item?.product?.images[0]?.url
                            : "/src/assets/profile.jpg"
                        }
                        alt={item.product?.name}
                      />
                      <div className="flex flex-col items-start gap-4">
                        <p className="text-sm text-white/90 font-normal">
                          {item.product?.name}
                        </p>
                        <p className="text-sm text-white/90 font-normal">
                          Rs.
                          {item.product?.discount > 0
                            ? item.product?.price + item.product?.discount
                            : item.product?.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-between ">
                      <p className="text-lg font-semibold text-white/90 ">
                        {item.quantity}
                      </p>
                    </div>

                    <div className="total-price text-sm font-normal flex items-end  gap-6 flex-col text-white/90 text-center">
                      <p>Rs.{item.product?.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* total section  */}
            </div>
          </div>
        </div>
        <div className="w-full border border-gray-300 mt-5 p-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-4xl  font-bold text-gold">Order Summary</h2>
          </div>
          <div className="text-white/90  p-3 sm:p-6 border border-gray-300">
            <p className="mb-2">
              <strong>Subtotal:</strong> Rs.{subTotal}
            </p>
            <p className="mb-2">
              <strong>Shipping Charges:</strong> Rs.{shipping}
            </p>
            <p className="mb-4">
              <strong>Total:</strong> Rs.{subTotal + shipping}
            </p>
            <button
              type="submit"
              onClick={handleProceedToPayment}
              className={`w-[50%] border rounded-full border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]  text-white font-bold py-3 transition duration-200 ${
                loading && "opacity-50 hover:cursor-wait"
              }`}
            >
              Next: Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
