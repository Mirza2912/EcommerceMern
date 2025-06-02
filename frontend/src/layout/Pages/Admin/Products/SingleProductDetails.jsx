import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getRelatedProducts,
  singleProductDetails,
} from "../../../store/ProductSlice/productSliceReducers";
import Loader from "../../../Components/Loader/Loader";
import RelatedProducts from "../../../Components/Home/RelatedProducts";

const SingleProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState("");

  const { singleProduct, loading, relatedProducts } = useSelector(
    (state) => state.product
  );
  // console.log(relatedProducts);

  let singleProductAdmin = singleProduct[id];

  useEffect(() => {
    dispatch(singleProductDetails(id));
  }, []);
  useEffect(() => {
    if (singleProductAdmin) {
      if (singleProductAdmin?.images?.length > 0) {
        setMainImage(singleProductAdmin.images[0].url);
      }

      if (singleProductAdmin?.category?._id) {
        dispatch(getRelatedProducts(singleProductAdmin.category._id));
      }
    }
  }, [singleProduct]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="min-h-[90vh] flex items-center justify-center flex-col">
            <div className="lg:w-[95%] xl:w-[75%] sm:w-[80%] w-full mx-6 sm:mx-4 md:w-[90%] md:mx-6 my-7 border border-gray-700 bg-black/60 backdrop-blur-lg rounded-2xl shadow-lg p-4 sm:p-6 md:p-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-10">
                {singleProductAdmin?.name}
              </h2>

              <div className="flex flex-col md:flex-row gap-6 items-start w-full ">
                {/* Product Image */}
                <div className="w-full mx-auto sm:w-[80%] md:w-1/2 ">
                  {/* Big Main Image */}
                  <img
                    src={mainImage}
                    alt="Selected"
                    className="w-full h-auto max-h-[300px] object-cover object-center rounded shadow-md"
                  />

                  {/* Small Thumbnails */}
                  <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                    {singleProductAdmin?.images &&
                      singleProductAdmin?.images?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt={`Thumbnail ${idx}`}
                          className={`w-12 h-12 sm:w-14 sm:h-14 object-cover border-2 rounded cursor-pointer ${
                            mainImage === img.url
                              ? "border-gold"
                              : "border-gray-400"
                          }`}
                          onClick={() => setMainImage(img.url)}
                        />
                      ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="w-full sm:w-[80%] mx-auto md:w-1/2  text-lg sm:text-base text-white">
                  <div className="mb-1.5">
                    <span className="font-semibold  text-xl ">Name:</span>{" "}
                    {singleProductAdmin?.name}
                  </div>
                  <div className="mb-1.5">
                    <span className="font-semibold  text-xl ">Price:</span> Rs.
                    {singleProductAdmin?.price}
                  </div>
                  <div className="mb-1.5">
                    <span className="font-semibold text-xl ">Category:</span>{" "}
                    {singleProductAdmin?.category?.category}
                  </div>
                  <div className="mb-1.5">
                    <span className="font-semibold text-xl ">
                      IsReturnable:
                    </span>{" "}
                    {singleProductAdmin?.isReturnAble === true ? "Yes" : "No"}
                  </div>
                  <div className="mb-1.5">
                    <span className="font-semibold text-xl ">Discount:</span>{" "}
                    Rs.
                    {singleProductAdmin?.discount}
                  </div>
                  <div className="mb-1.5">
                    <span className="font-semibold  text-xl ">Stock:</span>{" "}
                    <span
                      className={
                        singleProductAdmin?.stock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {singleProductAdmin?.stock > 0
                        ? `${singleProductAdmin?.stock}`
                        : "Out of Stock"}
                    </span>
                  </div>
                  <div className="mb-1.5">
                    <span className="font-semibold text-xl ">CreatedAt:</span>{" "}
                    {new Date(
                      singleProductAdmin?.createdAt
                    ).toLocaleDateString()}
                  </div>
                  <div className="mb-1.5">
                    <span className="font-semibold  text-xl ">
                      Description:
                    </span>
                    <p className=" mt-1">{singleProductAdmin?.description}</p>
                  </div>
                  <div className="mt-6 text-center flex items-center justify-start">
                    <Link
                      to="/admin/dashboard/products"
                      className="bg-gold hover:bg-[#d99f18] text-white px-6 py-2 rounded shadow  transition"
                    >
                      Back to Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RelatedProducts />
        </>
      )}
    </>
  );
};

export default SingleProductDetails;
