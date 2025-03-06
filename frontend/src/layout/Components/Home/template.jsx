import React from "react";

const template = ({ heading, data }) => {
  return (
    <div className="w-[100%] h-auto py-[10rem] flex items-center justify-center flex-col bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
      <div className="heading z-40 flex flex-col items-center mt-[5rem] mb-[7rem] xsm:mt-0 xsm:mb-5">
        <h2 className="text-white font-medium text-7xl xsm:text-5xl x font-roboto ">
          {heading}
        </h2>
      </div>
      <div className="flex items-center justify-center w-[95%] xsm:w-[100%] slg:w-[75%] h-auto bg-bg-color">
        {data}
      </div>
    </div>
  );
};

export default template;
