import React from "react";
import Title from "../Components/Home/Title";
import Hero from "../Components/Home/Hero";
import FeatureProducts from "../Components/Home/FeatureProducts";

const Home = () => {
  return (
    <>
      <Title title="Home" />

      <div className="w-[100%]  flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
        {/* Hero Section  */}
        <Hero />
        {/* Feature Products  */}
        <FeatureProducts />
      </div>
    </>
  );
};

export default Home;
