import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="relative w-20 h-20">
        <div className="absolute  inset-0 rounded-full border-4 border-t-gold border-gray-300 animate-spin"></div>
        <div className="absolute m-2 inset-2 rounded-full border-4 border-t-gold border-gray-200 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
