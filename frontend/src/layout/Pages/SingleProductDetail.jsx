import React, { useEffect, useState } from "react";
import Title from "../Components/Home/Title.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../store/ProductSlice/productSlice.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { singleProductDetails } from "../store/ProductSlice/productSliceReducers.js";
import Loader from "../Components/Loader/Loader.jsx";
import { toast } from "react-toastify";
import { addToCartLocal } from "../store/CartSlice/CartSlice.js";
import { v4 as uuidv4 } from "uuid";
import { addToCartBackend } from "../store/CartSlice/CartSliceReducers.js";

const SingleProductDetails = () => {
  //fetching id of product by using useParams()
  const { id } = useParams();
  // console.log(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // console.log(selectedImageIndex);

  //fetching products loading and error from state
  const {
    singleProduct,
    loading: productLoading,
    error,
  } = useSelector((state) => state.product);
  const { isVerified } = useSelector((state) => state.auth);
  const { loading: cartLoading } = useSelector((state) => state.cart);

  const isAnyLoading = productLoading || cartLoading;

  const [quantity, setQuantity] = useState(1);

  let product = null;
  if (id in singleProduct) {
    product = singleProduct[id];
  }
  // console.log(product);

  const handleIncrease = () => {
    if (product?.stock > quantity) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // console.log(product?._id);

    //data to send backend to create cart
    const itemDataToAddToCartBackend = {
      productId: product?._id,
      quantity,
      price: product?.price * quantity,
    };

    //data to send backend to create cart
    const itemDataToAddToCartLocal = {
      product: product?._id,
      quantity,
      price: product?.price * quantity,
      _id: uuidv4(),
      stock: product?.stock,
    };
    //when user logged in
    if (isVerified) {
      dispatch(addToCartBackend(itemDataToAddToCartBackend));
    } else {
      dispatch(addToCartLocal(itemDataToAddToCartLocal));
      toast.success("item added to cart successfully");
    }
    navigate("/products", { replace: true });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(singleProductDetails(id));
  }, []);
  return (
    <>
      <Title title="Single Product" />
      <div className=" mx-auto p-4 ">
        {isAnyLoading ? (
          <Loader />
        ) : product ? (
          <div className="p-3  lg:p-10 shadow-xl rounded-xl ">
            <div className="mt-12 sm:mt-28 sm:mb-10 lg:mt-20">
              <h2 className="lg:text-7xl text-5xl font-bold text-white/90 text-center mb-3">
                {product.name}
              </h2>
              <div className="flex items-center justify-center text-white/90 gap-1 text-sm">
                <Link to={"/"}>Home</Link>
                <span>/</span>
                <Link to={"/products"}>Product</Link>
                <span>/</span>
                <span>{product.name}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:w-full  gap-10 md:gap-0 my-16 items-center md:items-start md:justify-items-center ">
              {/* Images Section */}
              <div className="md:ml-8 lg:ml-14 lg:h-[30rem]  ">
                <div className="flex flex-col items-center mx-auto w-full sm:w-[80%] md:w-full gap-3 sm:gap-5 lg:h-full">
                  {/* Main Image */}
                  <div className="h-[300px] w-full lg:h-[22rem] lg:w-[35rem]">
                    <img
                      src={product?.images[0]?.url || "/src/assets/profile.jpg"}
                      alt={product?.name}
                      className="w-full h-full  object-cover  rounded-lg"
                      id="mainImage"
                    />
                  </div>

                  {/* Thumbnail Images */}
                  <div className="flex space-x-2 overflow-x-auto">
                    {product?.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 border-white/90 hover:border-gold ${
                          selectedImageIndex === index
                            ? "border-gold"
                            : " border-white/90"
                        }`}
                        onClick={() => {
                          const mainImage =
                            document.getElementById("mainImage");
                          if (mainImage) {
                            mainImage.src = image.url;
                          }
                          setSelectedImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="pl-5 md:pl-0 sm:w-[80%] md:ml-24">
                <h1 className="text-4xl font-bold text-white/90 mb-4">
                  {product?.name}
                </h1>
                <p className="text-xl  text-white/90 mb-4">
                  {product?.description}
                </p>
                <p className="text-2xl font-semibold text-white/90 mb-4">
                  Rs.{product?.price}
                </p>
                {product?.discount > 0 && (
                  <p className="text-2xl font-semibold text-white/90 mb-4">
                    Rs.{product?.discount}
                  </p>
                )}
                <p
                  className={`text-2xl font-semibold mb-4 ${
                    product?.stock > 0 ? "text-gold" : "text-red-600"
                  }`}
                >
                  {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <p className="text-xl  text-white/90 mb-4">
                  {product?.category?.category || "N/A"}
                </p>
                <p className="text-xl text-white/90 mb-4">
                  {product?.isReturnAble ? "ReturnAble" : "No Return"}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4  mt-3">
                  <div className="flex items-center gap-4 border border-white/90 rounded">
                    <button
                      className="rounded-l  text-lg  border-r-2 border-r-white/90 hover:bg-bg-color text-white/90 font-bold py-2 px-5 "
                      onClick={handleDecrease}
                    >
                      -
                    </button>
                    <div className="text-xl font-semibold w-[15px] text-center text-white/90">
                      {quantity}
                    </div>
                    <button
                      className="rounded-r border-l-2 border-l-white/90 text-lg hover:bg-bg-color text-white/90 font-bold py-2 px-5 "
                      onClick={handleIncrease}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  // onClick={handleAddToCart}
                  disabled={isAnyLoading}
                  onClick={handleAddToCart}
                  className="border-[#ffc253] border hover:bg-[#ffce53] hover:border-[#ffce53]  text-xl text-white/90 ease-in duration-150 rounded-full px-10 py-2 my-5"
                  type="button"
                >
                  {isAnyLoading ? <Loader /> : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Product not found</p>
        )}
      </div>
    </>
  );
};

export default SingleProductDetails;
