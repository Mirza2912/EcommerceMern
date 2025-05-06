import React, { useState } from "react";
import { FaAddressBook, FaPhoneAlt, FaShippingFast } from "react-icons/fa";
import { MdAccountBalance, MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { TbMapPinCode } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../store/OrderSlice/orderSlice";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, shippingAddress } = useSelector((state) => state.order);
  // console.log(shippingAddress);

  const [shipping, setShipping] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "Pakistan",
    state: shippingAddress?.state || "",
    phoneNo: shippingAddress?.phoneNo || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShipping({ ...shipping, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setShippingAddress(shipping));
    setShipping({
      address: "",
      city: "",
      postalCode: "",
      country: "Pakistan",
      state: "",
      //   phoneNo: "",
    });
    navigate("/checkout/order-confirm");
  };

  return (
    <>
      <div className=" mb-10 ">
        <h2 className="lg:text-6xl text-5xl font-bold text-white/90 text-center mb-3">
          Shopping Address
        </h2>
        <div className="flex items-center justify-center text-white/90 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <span>Shipping</span>
        </div>
      </div>
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[35%] mb-10 rounded-2xl p-6 md:p-8 border border-gray-600">
        <form className="space-y-4" onSubmit={submitHandler}>
          <div className="relative">
            <FaAddressBook className="absolute top-4 left-3 text-xl text-gray-500" />

            <input
              type="text"
              id="address"
              name="address"
              value={shipping?.address}
              onChange={handleChange}
              required
              placeholder="your address *Required"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>

          <div className=" relative">
            <MdAccountBalance className="absolute top-4 left-3 text-xl text-gray-500" />

            <input
              type="text"
              id="country"
              name="country"
              value={shipping?.country}
              onChange={handleChange}
              required
              placeholder="country *Required"
              className="w-full pl-10 pr-4 py-3  rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>
          <div className="relative">
            <MdAccountBalance className="absolute top-4 left-3 text-xl text-gray-500" />
            <select
              name="state"
              value={shipping?.state}
              onChange={handleChange}
              className=" w-full pl-10 pr-4 py-3  rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            >
              <option value="">Select State</option>
              {State.getStatesOfCountry("PK").map((state) => (
                <option key={state.isoCode} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <MdAccountBalance className="absolute top-4 left-3 text-xl text-gray-500" />
            <select
              name="city"
              value={shipping?.city}
              onChange={handleChange}
              className=" w-full pl-10 pr-4 py-3  rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            >
              <option value="">Select City</option>
              {City.getCitiesOfState(
                "PK",
                `${
                  State.getStatesOfCountry("PK").find(
                    (state) => state.name === shipping.state
                  )?.isoCode
                }`
              ).map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className=" relative">
            <TbMapPinCode className="absolute top-4 left-3 text-xl text-gray-500" />

            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shipping?.postalCode}
              onChange={handleChange}
              required
              placeholder="postal code *Required"
              className="w-full pl-10 pr-4 py-3  rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>

          <div className=" relative">
            <FaPhoneAlt className="absolute top-4 left-3 text-xl text-gray-500" />

            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={shipping?.phoneNo}
              onChange={handleChange}
              required
              placeholder="phone no *Required eg:030xxxxxxxx"
              className="w-full pl-10 pr-4 py-3  rounded-md border border-gray-300 focus:ring-2 focus:ring-gold outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full border rounded-full border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]  text-white font-bold py-3 transition duration-200 ${
              loading && "opacity-50 hover:cursor-wait"
            }`}
          >
            Next: Confirm Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Shipping;
