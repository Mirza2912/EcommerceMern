// components/RecentProductsSwiper.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";

const RelatedProducts = () => {
  const { recentAddedProducts, relatedProducts } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <section className="border-gray-700 bg-black/60 backdrop-blur-lg rounded-2xl shadow-lg  h-auto w-full sm:w-[90%] mx-auto my-14 px-4 lg:px-10 py-10  ">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-white/90">
            Related Products
          </h3>
          <NavLink
            to="/products"
            className="text-gold hover:underline text-sm sm:text-base"
          >
            More Products →
          </NavLink>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={700}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-12 "
        >
          {relatedProducts?.map((product) => (
            <SwiperSlide key={product._id}>
              <NavLink
                to={`/product/${product._id}`}
                className="group  border border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-gold text-white text-xs px-3 py-1 rounded-full shadow-sm">
                    {product?.category?.category || "Category"}
                  </div>
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-gold text-white text-xs px-3 py-1 rounded-full shadow-sm">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white/90 text-center mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-white/70 text-center mb-4 line-clamp-2">
                      {product.description?.length > 100
                        ? `${product.description.slice(0, 70)}...`
                        : product.description}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-white/90 mb-3">
                      Rs. {product.price}
                    </p>
                    <button className="w-full py-2 border text-white/90 border-gold hover:bg-gold hover:text-black font-medium rounded-full transition-all duration-200">
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
            .swiper-wrapper{
            display: flex;
            items-center: center;
            justify-content: center;
            gap: 10px;
            }
         .swiper-slide {
  margin-right: 0px !important;
}

        `}
      </style>
    </>
  );
};

export default RelatedProducts;
