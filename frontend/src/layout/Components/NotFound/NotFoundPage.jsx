import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20 pt-10  px-5 text-gray-800">
      <h1 className="text-9xl font-bold text-white/90 dark:text-gray-900">
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4 text-white/90 dark:text-gray-900">
        Page Not Found
      </h2>
      <p className="text-lg mt-2 text-white/90 dark:text-gray-900">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]  font-bold   text-white/90 rounded-full shadow  transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
