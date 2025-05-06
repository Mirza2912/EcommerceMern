import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategorySwiper = ({ Category = [], setCategory, activeCategory }) => {
  return (
    <div className="w-full mt-[12vmax] px-4">
      <Swiper
        spaceBetween={20}
        slidesPerView={2.2}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="category-swiper"
      >
        {Category.map((child) => (
          <SwiperSlide key={child.category}>
            <div
              onClick={() => setCategory(child.category)}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
                activeCategory === child.category
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <figure className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-1 rounded-full hover:bg-gray-200 transition-all duration-300">
                <img
                  src={child.image}
                  alt={child.category}
                  className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <p className="text-sm sm:text-base font-medium text-center">
                {child.category}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper custom style */}
      <style jsx="true">{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #4c51bf;
          top: 35%;
        }

        .swiper-pagination-bullets {
          bottom: -12px !important;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 4px;
          border-radius: 2px;
          background-color: #ccc;
          margin: 0 4px !important;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background-color: #4c51bf;
          width: 20px;
        }
      `}</style>
    </div>
  );
};

export default CategorySwiper;
