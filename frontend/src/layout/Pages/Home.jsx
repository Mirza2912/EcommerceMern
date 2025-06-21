import React, { useEffect } from "react";
import Title from "../Components/Home/Title";
import BannerSlider from "../Components/Home/Banner";
import {
  getBannerProducts,
  getBestSellerProducts,
  getFeaturedProducts,
  getRecentAddedProducts,
} from "../store/ProductSlice/productSliceReducers";
import { useDispatch } from "react-redux";
import FeaturedProducts from "../Components/Home/FeaturedProducts";
import ImagesSection from "../Components/Home/ImagesSection";
import RecentAddedProducts from "../Components/Home/RecentProducts";
import { getAllCategories } from "../store/CategorySlice/categorySliceReducers";
import AvailableCategories from "../Components/Home/AvailableCategories";
import BestSellerProducts from "../Components/Home/BestSellerProducts";
// import FeatureProducts from "../Components/Home/FeatureProducts";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBannerProducts());
    dispatch(getFeaturedProducts());
    dispatch(getRecentAddedProducts());
    dispatch(getAllCategories());
    dispatch(getBestSellerProducts());
  }, []);
  return (
    <>
      <Title title="Home" />
      <BannerSlider />
      <AvailableCategories />
      <FeaturedProducts />
      <ImagesSection />
      <RecentAddedProducts />
      <BestSellerProducts />
    </>
  );
};

export default Home;
