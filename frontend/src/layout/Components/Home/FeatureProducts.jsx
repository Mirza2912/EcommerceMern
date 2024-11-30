import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast.js";
// import "../../Toast.css";
import Card from "./Card.jsx";
import { clearError } from "../../store/ProductSlice/productSlice.js";
import { getAllProducts } from "../../store/ProductSlice/productSliceReducers.js";

const FeatureProducts = () => {
  const dispatch = useDispatch();

  //fetching products loading and error from state
  const { products, loading, error } = useSelector((state) => state.products);
  // console.log(loading, error, products);

  // /*--------------------------------------*/
  // /*     Get All Products using useEffect
  // /*--------------------------------------*/
  useEffect(() => {
    if (error) {
      Toast(error, "error");
      dispatch(clearError());
    }
    dispatch(getAllProducts());
    // Toast("Data fetched successfully", "success");
  }, [dispatch, error, Toast]);
  return (
    <div className="w-[100%] slg:w-[80%] xsm:w-[80%] sm:w-[75%] md:w-[85%] md:px-2 xlg:w-[90%] bg-bg-color font-roboto">
      {/* Feature Product Heading  */}
      <div className="Feature-heading font-roboto text-white text-center flex items-center my-[5vmax] justify-center">
        <h2 className="text-[2.5vmax] xsm:text-[4vmax] border-b w-fit">
          Feature Products
        </h2>
      </div>

      {/* Feature Products  */}
      <div className="flex flex-wrap  justify-center xlg:gap-5 gap-10 my-[6vmax] xxsm:w-[100%]">
        {products &&
          products.map((product) => {
            return <Card key={product._id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default FeatureProducts;
