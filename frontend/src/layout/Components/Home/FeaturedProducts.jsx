import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Card from "./Card";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { loading, featuredProducts } = useSelector((state) => state.product);

  return (
    <section className="mt-20  px-4 md:px-8 my-14">
      <div className="max-w-7xl w-[100%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white/90">
            Featured Products
          </h2>
        </div>

        {/* Responsive Grid */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 w-[100%] relative md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 py-14 rounded-md bg-bg-color">
            <Link className="absolute top-5 right-5 text-gold hover:underline text-lg">
              more
            </Link>
            {featuredProducts.map((product) => (
              <Card product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default FeaturedProducts;
