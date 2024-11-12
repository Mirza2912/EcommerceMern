import React from "react";
import Title from "../Components/Title";
import { toast } from "react-toastify";
import Hero from "../Components/Hero";
import Toast from "../Components/Toast";
import FeatureProducts from "../Components/FeatureProducts";

const Home = () => {
  return (
    <>
      <Title title="Home" />

      <div className="w-[100%]  flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')] h-auto bg-center bg-no-repeat bg-fixed bg-cover ">
        {/* Hero Section  */}
        <Hero />
        {/* Feature Products  */}
        <FeatureProducts />
      </div>
    </>
  );
};

export default Home;
