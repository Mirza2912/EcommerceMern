import React from "react";

const LoaderForForms = ({ input }) => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-5 w-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="4" className="text-white" />
      </svg>
      {input}...
    </div>
  );
};

export default LoaderForForms;
