import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegFaceFrown } from "react-icons/fa6";

import { toast } from "react-toastify";
import { singleProductDetails } from "../store/ProductSlice/productSliceReducers";
import Loader from "../Components/Loader/Loader";
import { MdDelete } from "react-icons/md";
import {
  clearError,
  removeCartItemLocal,
  updateCartItemLocal,
} from "../store/CartSlice/CartSlice";
import {
  addToCartUpdateBackend,
  deleteCartItemBackend,
} from "../store/CartSlice/CartSliceReducers";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, error, loading } = useSelector((state) => state.cart);
  //   console.log(cartItems);

  const { singleProduct } = useSelector((state) => state.product);
  // console.log(singleProduct);

  const [cart, setCart] = useState([]);
  //   console.log(cart);

  const [subTotal, setSubTotal] = useState(0);
  // console.log(subTotal);

  const { isVerified } = useSelector((state) => state.auth);
  const [editCartQuantity, setEditCartQuantity] = useState(null);

  //method for handle item of cart updation
  const handleAddToCartUpdate = (quantity, itemId, price) => {
    // console.log(quantity, itemId, price);

    //object to send backend to update item
    const updateDataToCartItemBackend = {
      itemId,
      quantity,
      price,
    };
    // console.log(updateDataToCartItemBackend);

    //object to send backend to update item
    const updateDataToCartItemLocal = {
      productId: itemId,
      quantity,
      price,
    };

    //if user logged in
    if (isVerified) {
      dispatch(addToCartUpdateBackend(updateDataToCartItemBackend));
    }

    //if user not loggin
    if (!isVerified) {
      dispatch(updateCartItemLocal(updateDataToCartItemLocal));
    }
    setEditCartQuantity(null);
  };

  const [quantity, setQuantity] = useState(1);
  const handleIncrease = (id) => {
    const findItem = cart?.find((item) => item?._id === id);
    setQuantity((prev) => (findItem?.product?.stock > prev ? prev + 1 : prev));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRemoveItem = (id) => {
    // console.log(id);

    if (!isVerified) {
      //when local item remove
      dispatch(removeCartItemLocal(id));
      setCart(cartItems);
    } else {
      dispatch(deleteCartItemBackend(id));
      setCart(cartItems);
    }
  };

  useEffect(() => {
    const total = cart?.reduce((acc, item) => {
      const price = item?.product?.price || 0;
      const discount = item?.product?.discount || 0;
      const quantity = item?.quantity || 0;

      return acc + quantity * (price - discount);
    }, 0);

    setSubTotal(total);
  }, [cart]);

  useEffect(() => {
    let updatedCart = [];

    //if any error come
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    //check if user not logged in then we will check singleproduct object and convert our items of cart's product id to its actuall product because if user not logged in then in cart item there will be not actual product not product id
    if (isVerified === false) {
      if (cartItems?.length > 0) {
        cartItems?.forEach((item) => {
          // If product details exist in the singleProduct object
          if (singleProduct && singleProduct[item?.product]) {
            updatedCart.push({
              product: singleProduct[item.product],
              quantity: item.quantity,
              price: item.price,
              _id: item._id,
            });
          } else {
            // If product details are not available, dispatch to  fetch product
            dispatch(singleProductDetails(item?.product));
          }
        });
        // Update the cart state after looping through the cartItems
        setCart(updatedCart);
      } else {
        setCart([]);
      }
    } else if (isVerified === true) {
      setCart(cartItems);
    }
  }, [cartItems, singleProduct, isVerified, error]);

  return (
    <>
      {/* Cart Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-col items-center justify-center mb-20 ">
          {/* heading div  */}
          {cart && cart.length > 0 ? (
            <div className="mt-12 mb-10 sm:mt-32 sm:mb-10  lg:mt-32">
              <h2 className="lg:text-6xl text-5xl font-bold text-white/90 text-center mb-3">
                Shopping Cart
              </h2>
              <div className="flex items-center justify-center text-white/90 gap-1 text-md font-normal">
                <Link to={"/"}>Home</Link>
                <span>/</span>
                <span>Cart</span>
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* parent div  */}
          {loading ? (
            <Loader />
          ) : cart && cart.length > 0 ? (
            <div className="bg-bg-color w-full lg:flex lg:gap-5 lg:justify-center sm:w-[90%] md:w-[70%] lg:w-[95%] xl:w-[80%] px-5  py-10">
              <div className="w-full lg:w-[55%] flex items-start justify-center">
                {/* carts */}
                <div className="flex flex-col w-full border border-gray-400">
                  {/* headings */}
                  <div className="w-full flex items-center justify-between px-4 py-3 text-white/90 text-lg font-semibold border-b border-gray-300">
                    <h3 className="w-2/4">Items</h3>
                    <h3 className="w-1/4 text-center">Qty</h3>
                    <h3 className="w-1/4 text-right pr-2">Price</h3>
                  </div>

                  {/* cart items */}
                  {cart.map((item, index) => (
                    <div
                      key={item._id}
                      className={`w-full flex items-center justify-between py-3 px-2 ${
                        index !== cart.length - 1 && "border-b border-gray-300"
                      }`}
                    >
                      {/* Item image & name */}
                      <div className="w-2/4 flex items-center gap-2">
                        <img
                          className="w-16 h-16 object-cover object-center"
                          src={
                            item?.product?.images?.length > 0
                              ? item?.product?.images[0]?.url
                              : "/src/assets/profile.jpg"
                          }
                          alt={item.product?.name}
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-white/90">
                            {item.product?.name}
                          </p>
                          <p className="text-sm text-white/90">
                            Rs.
                            {item.product?.discount > 0
                              ? item.product?.price + item.product?.discount
                              : item.product?.price}
                          </p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="w-1/4 flex flex-col items-center">
                        {editCartQuantity === item._id ? (
                          <div className="flex items-center gap-2 border border-white/90">
                            <button
                              className="text-lg border-r border-white/90 hover:bg-bg-color text-white/90 font-normal px-3 py-1"
                              onClick={handleDecrease}
                            >
                              -
                            </button>
                            <div className="text-lg font-normal text-white/90">
                              {quantity}
                            </div>
                            <button
                              className="text-lg py-1 border-l border-white/90 hover:bg-bg-color text-white/90 font-normal px-3"
                              onClick={() => handleIncrease(item._id)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <p className="text-lg font-semibold text-white/90">
                            {item.quantity}
                          </p>
                        )}
                        {editCartQuantity ? (
                          <p
                            onClick={() =>
                              handleAddToCartUpdate(
                                quantity,
                                item._id,
                                item.product?.price * quantity
                              )
                            }
                            className="text-sm text-gold hover:underline cursor-pointer mt-1"
                          >
                            update
                          </p>
                        ) : (
                          <p
                            onClick={() => setEditCartQuantity(item._id)}
                            className="text-sm text-gold hover:underline cursor-pointer mt-1"
                          >
                            edit
                          </p>
                        )}
                      </div>

                      {/* Price and delete */}
                      <div className="w-1/4 text-right text-white/90 flex flex-col items-end pr-2">
                        <p className="text-sm">
                          Rs.{item.product?.price * item.quantity}
                        </p>
                        <MdDelete
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-lg hover:text-gold cursor-pointer mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* subtotal  */}
              <div className="w-full h-[280px] lg:w-[40%] border border-gray-300 mt-10 lg:mt-0">
                <div className="px-4 py-3 w-full text-start text-white/90 font-semibold text-lg border-b border-gray-300">
                  <h2>Cart Total</h2>
                </div>
                <div className="w-full px-5 py-5 flex flex-col items-center justify-center">
                  <div className="w-full flex items-center justify-between text-white/90 text-lg font-semibold">
                    <p>Sub total</p>
                    <p>Rs.{subTotal}</p>
                  </div>
                  <div className="w-full flex items-center justify-between text-white/90 text-lg font-semibold">
                    <p>Shipping</p>
                    <p>Rs.200</p>
                  </div>
                  <div className="w-full border-t border-gray-300 mt-6 pt-2 flex items-center justify-between text-white/90 text-lg font-semibold">
                    <p>Total</p>
                    <p>Rs.{subTotal + 200}</p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center">
                  <button
                    onClick={() => navigate("/checkout/shipping")}
                    className="border-[#ffc253] border hover:bg-[#ffce53] hover:border-[#ffce53]  text-xl text-white/90 ease-in duration-150 rounded-full px-10 py-2 mb-5"
                    type="button"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center my-20">
              <p className="text-center flex items-center justify-center gap-5  text-4xl sm:text-6xl font-bold text-gold ">
                Your Cart Is Empty Cart <FaRegFaceFrown />
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
      )}
    </>
  );
};

export default Cart;
