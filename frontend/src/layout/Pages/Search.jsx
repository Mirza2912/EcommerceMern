import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const Navigate = useNavigate();
  const loginFormHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      Navigate(`/products/${keyword}`);
    } else {
      Navigate("/products");
    }
  };
  return (
    <div className="w-[100%] min-h-[100vh] font-roboto flex items-center justify-center  bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover">
      <form className="w-[100%]" onSubmit={loginFormHandler}>
        <div className="flex items-center justify-center relative w-[100%]">
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
            className="w-[40%] ps-3 py-4  border rounded-s-md focus:outline-none placeholder-[#aeabab]"
          />
          <h2 className="text-white bg-gold hover:bg-[#ffbb00] py-4 px-12 rounded-e-md focus:outline-none cursor-pointer">
            <SearchIcon />
          </h2>
        </div>
      </form>
    </div>
  );
};

export default Search;
