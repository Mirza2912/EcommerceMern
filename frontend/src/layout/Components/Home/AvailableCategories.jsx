import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Loader from "../Loader/Loader";

const AvailableCategories = () => {
  const { categories, loading } = useSelector((state) => state.category);
  //   console.log(categories);

  return (
    <section className="w-full mt-20 px-4 sm:px-8 lg:px-16 bg-black">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-5xl sm:text-6xl font-bold text-white/90 mb-10 text-center">
          Shop by Categories
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="flex gap-5 w-full flex-wrap items-center justify-center mx-auto">
            {categories.map((category) => (
              <NavLink to="/products">
                <div
                  key={category._id}
                  className="bg-black/60  backdrop-blur-lg border border-gray-700 transition-all duration-200 p-4 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer w-96 sm:w-56 py-5"
                >
                  <h3 className="text-lg font-medium text-white text-center">
                    {category.category}
                  </h3>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableCategories;
