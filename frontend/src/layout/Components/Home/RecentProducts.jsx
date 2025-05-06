// components/RecentProductsSwiper.jsx

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";

const RecentAddedProducts = () => {
  const { loading, recentAddedProducts } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <h2 className="text-5xl sm:text-6xl font-bold text-white/90 mt-14 text-center">
        New Arrivals
      </h2>
      <section className="w-full my-14 px-4 pt-14 pb-14 bg-bg-color">
        <div className="flex justify-end items-center mb-4">
          <NavLink to="/products" className="text-gold hover:underline">
            More Products →
          </NavLink>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.1 },
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 1.8 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          loop
          className="w-full pb-12 "
        >
          {recentAddedProducts.map((product) => (
            <SwiperSlide
              key={product._id}
              className="border  bg-transparent border-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-all p-2"
            >
              <NavLink
                to={`/product/${product._id}`}
                className="relative group bg-white shadow-md rounded-lg overflow-hidden transition-all hover:shadow-xl"
              >
                {/* Category top-left */}
                <div className="absolute top-2 left-2 text-white/90 bg-gold text-xs px-2 py-1 rounded-full z-10">
                  {product?.category?.category || "Category"}
                </div>

                {/* Discount top-right */}
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 text-white/90 bg-gold text-xs px-2 py-1 rounded-full z-10">
                    {product.discount}% OFF
                  </div>
                )}

                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white/90 text-center mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/80 text-center mb-8 h-[30px]">
                    {product.description?.length > 100
                      ? `${product.description.slice(0, 70)}...`
                      : product.description}
                  </p>
                  <p className="text-lg font-semibold text-white/90 text-center">
                    Rs.{product.price}
                  </p>
                  <div className="flex items-center justify-center ">
                    <button className="w-[200px] mt-4 py-2 border text-white/90 text-lg border-[#f0b343] hover:bg-[#f0b343] hover:border-[#f0b343] rounded-full transition duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <style>
        {`
    .swiper-pagination {
    bottom: 0px !important;
     }
    .swiper-pagination-bullet {
            width: 30px;
            height: 4px;
            background: #f3f4f6;
            margin: 0 6px;
            border-radius: 2px;
            transition: all 0.3s ease;
        }
    .swiper-pagination-bullet-active {
             background: #faaf00 !important;
         }
    .swiper-button-next,
             .swiper-button-prev {
              color: #faaf00; 
             }
`}
      </style>
    </>
  );
};

export default RecentAddedProducts;
