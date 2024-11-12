import React, { useEffect, useState } from "react";
import Title from "../Components/Title";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../store/ProductSlice/productSlice.js";
import { singleProductDetails } from "../store/ProductSlice/productSliceReducers.js";
import { useParams } from "react-router-dom";
import Toast from "../Components/Toast.js";
import Rating from "@mui/material/Rating";

const SingleProductDetails = () => {
  const dispatch = useDispatch();

  //fetching products loading and error from state
  const { singleProduct, loading, error } = useSelector(
    (state) => state.products
  );
  // console.log(loading, error, singleProduct);

  const {
    name,
    description,
    images,
    price,
    rating,
    category,
    stock,
    numOfReviews,
    user,
  } = singleProduct;

  // console.log(
  //   name,
  //   description,
  //   images,
  //   price,
  //   rating,
  //   category,
  //   stock,
  //   numOfReviews,
  //   user
  // );
  // console.log(images && images[0].url);
  const [mainImage, setMainImage] = useState(`${images && images[0].url}`);
  // console.log(mainImage);

  //fetching id of product by using useParams()
  const { id } = useParams();
  //   console.log(id);
  // /*--------------------------------------*/
  // /*     Get All Products using useEffect
  // /*--------------------------------------*/
  useEffect(() => {
    if (error) {
      Toast(error, "error");
      dispatch(clearError());
    }
    setMainImage(`${images && images[0].url}`);
    dispatch(singleProductDetails(id));
    // Toast("Data fetched successfully", "success");
  }, [dispatch, error, Toast, id, images && images[0].url]);
  return (
    <>
      <Title title="Single Product" />
      <div className="w-[100%]  h-auto py-[20rem] text-white flex items-center justify-center  bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover">
        {/* //parent div  */}
        <div className="flex flex-col md:flex-row p-4 md:p-8 space-y-6 md:space-y-0 md:space-x-8 bg-bg-color min-h-screen">
          {/* Left Section: Images */}
          <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
            {/* Main Image */}
            <div className="w-full max-w-lg">
              <img
                src={`${mainImage}`}
                alt="Main Product"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 mt-4">
              {images &&
                images.map((image) => (
                  <img
                    key={image._id}
                    src={image.url}
                    alt={`${image.name}`}
                    onClick={() => setMainImage(image.url)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      images && images[0].url === image.url
                        ? "border-blue-500"
                        : "border-transparent"
                    } hover:border-blue-500`}
                  />
                ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>

            {/* Product Price */}
            <p className="text-2xl font-semibold text-blue-500">{price}</p>

            {/* Product Description */}
            <p className="text-gray-700 leading-relaxed">{description}</p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                Add to Cart
              </button>
              <button className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductDetails;
