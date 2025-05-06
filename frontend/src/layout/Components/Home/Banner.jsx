// BannerSlider.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const BannerSlider = () => {
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const navigate = useNavigate();

  const { loading, bannerProducts } = useSelector((state) => state.product);
  useEffect(() => {
    setShuffledProducts(shuffleArray(bannerProducts));
  }, [bannerProducts]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full h-screen relative  overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              loop={true}
              autoplay={{
                delay: 2000, // 3 seconds delay between slides
                disableOnInteraction: false, // Keeps autoplay after user interacts
              }}
              className="w-full h-full"
            >
              {shuffledProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="w-full  h-screen relative">
                    <img
                      src={product?.images[0]?.url || ""}
                      alt={product?.images[0]?.public_id || ""}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute  text-center  inset-0 bg-black/40 flex flex-col items-center justify-center">
                      <h2 className="text-white/90 text-6xl font-bold uppercase">
                        {product.name}
                      </h2>
                      <p className="text-white/90 text-xl my-4 w-[50%]">
                        {product.description}
                      </p>
                      <button
                        onClick={() => navigate("/products")}
                        className={`w-[10rem] border rounded-full border-[#f0b343] hover:bg-[#f0b343] hover:border-[#f0b343]  text-white text-2xl py-2.5 transition duration-200 `}
                      >
                        Shop
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
      <style>
        {`    
          .swiper-pagination-bullet {
            width: 30px;
            height: 4px;
            background: black
            margin: 0 6px;
           border-radius: 2px;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
          width: 40px;
            background: #faaf00;
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

export default BannerSlider;
