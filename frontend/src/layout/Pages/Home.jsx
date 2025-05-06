import React, { useEffect } from "react";
import Title from "../Components/Home/Title";
import BannerSlider from "../Components/Home/Banner";
import {
  getBannerProducts,
  getFeaturedProducts,
  getRecentAddedProducts,
} from "../store/ProductSlice/productSliceReducers";
import { useDispatch } from "react-redux";
import FeaturedProducts from "../Components/Home/FeaturedProducts";
import ImagesSection from "../Components/Home/ImagesSection";
import RecentAddedProducts from "../Components/Home/RecentProducts";
// import FeatureProducts from "../Components/Home/FeatureProducts";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBannerProducts());
    dispatch(getFeaturedProducts());
    dispatch(getRecentAddedProducts());
  }, []);
  return (
    <>
      <Title title="Home" />
      <BannerSlider />
      <FeaturedProducts />
      <ImagesSection />
      <RecentAddedProducts />

      {/* Hero Section  */}
      {/* <Hero /> */}
      {/* Feature Products  */}
      {/* <FeatureProducts /> */}
    </>
  );
};

export default Home;
