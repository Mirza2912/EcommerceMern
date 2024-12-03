import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../Components/Home/Toast";
import { useNavigate } from "react-router-dom";
import { clearError } from "../store/ProductSlice/productSlice";
import { getAllProducts } from "../store/ProductSlice/productSliceReducers";
import Card from "../Components/Home/Card";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import { IoGrid } from "react-icons/io5";
import { PiListBold } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Product.css";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";

const Products = () => {
  //useState for selecting category all notebook et
  const [category, setCategory] = useState("");
  // console.log(selectProduct);

  //useState for filtration
  const [filter, setFilter] = useState(false);
  // console.log(filter);

  //useState for view of products grid or list
  const [view, setView] = useState("grid");
  // console.log(view);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // console.log("Selected:", option);
    setIsOpen(false);
  };

  //getting all products
  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );
  console.log(products);

  // product per page
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  //for in stock checked
  const [inStock, setInStock] = useState(false);
  // console.log(inStock);

  //for out stock checked
  const [outStock, setOutStock] = useState(false);

  // for price
  const [price, setPrice] = useState([0, 25000]);

  //for ratings
  const [ratings, setRatings] = useState(0);

  // price handler
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const resultPerPage = 8;

  let count = 5;

  const categories = ["book", "notebook", "stationary"];

  // const Category = [
  //   {
  //     category: "Book",
  //     image:
  //       "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip",
  //   },
  //   {
  //     category: "Note Books",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNNl_ZGjlck_bYnT6kCX90tiUhqVyuSDsGw&s",
  //   },
  //   {
  //     category: "Stationary",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK8SPorTTHz6ZRi2ohXJonuj56guR7vptDWg&s",
  //   },
  // ];

  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    if (error) {
      Toast(error, "error");
      Dispatch(clearError());
    }
    Dispatch(getAllProducts(currentPage, price, ratings, category));
    // Toast("Data fetched successfully", "success");
  }, [Dispatch, error, Toast, currentPage, price, ratings, category]);

  return (
    <div className="w-[100%] min-h-[100vh] font-roboto flex flex-col items-center justify-center gap-20 bg-[url('/images/body-bg-free-img.jpg')]  bg-center bg-no-repeat bg-fixed bg-cover ">
      {/* products selection  */}

      {/* Category  */}
      {/* <div className="w-full mt-[15vmax]  flex items-center justify-center gap-5">
        {Category.map((category) => {
          return (
            <div
              key={category.category}
              className="w-32 flex flex-col items-center justify-center gap-2 "
              onClick={() => setSelectProduct(category.category)}
            >
              <figure className="w-[100%] h-32 cursor-pointer ">
                <img
                  className="w-[100%] hover:scale-105 transition-all duration-300 h-[100%] bg-cover bg-center rounded-full"
                  src={category.image}
                  alt={category.category}
                />
              </figure>
              <p
                className={`font-semibold font-roboto text-lg  cursor-pointer ${
                  selectProduct === category.category
                    ? "text-gold"
                    : "text-white"
                }`}
              >
                {category.category}
              </p>
            </div>
          );
        })}
      </div> */}

      {/* //All Products  */}
      <div className="w-[100%] mt-[10vmax] flex flex-col items-center justify-center xxsm:w-[90%] xsm:w-[80%] sm:w-[95%] md:w-[90%] sml:w-[100%] slg:w-[95%] xlg:w-[1150px] sml:px-3  bg-bg-color font-roboto">
        <div className="filters text-white flex items-center justify-between w-[100%] px-10 pt-10">
          <div className="flex items-center justify-center gap-10">
            <button
              className="flex items-center justify-center gap-1 py-2 px-6 rounded-full text-white border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53] hover:text-black"
              onClick={() => setFilter(!filter)}
            >
              <span>
                <TuneSharpIcon />
              </span>
              <span className=" font-semibold text-lg">FILTER</span>
            </button>
            <div className="icons flex items-center justify-center gap-3">
              <div className="relative flex items-center justify-center">
                <IoGrid
                  onClick={() => setView("grid")}
                  className={` ${
                    view === "grid"
                      ? "bg-gold  text-4xl p-1.5 cursor-pointer text-[white] border border-gold"
                      : " border  cursor-pointer text-4xl p-1.5 border-gold bg-transparent"
                  }`}
                />
              </div>

              <PiListBold
                onClick={() => setView("list")}
                className={` ${
                  view === "list"
                    ? "bg-gold  text-4xl p-1.5 cursor-pointer text-[white] border border-gold"
                    : " border cursor-pointer text-4xl p-1.5 border-gold bg-transparent"
                }`}
              />
            </div>
          </div>
          <div className="text-xl font-semibold text-gold">
            Available Products :
            <span className="text-gold">{productCount}</span>
          </div>

          <div className="relative inline-block text-left font-roboto">
            {/* Dropdown Button */}
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-center w-full px-3 py-2 font-semibold text-white hover:text-gold bg-transparent rounded-md shadow-sm border border-gold uppercase"
            >
              Sort Products
              <IoMdArrowDropdown
                className={`mt-0.5 text-xl font-semibold transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-12 z-10 w-[10.8rem] rounded-md bg-bg-color border border-gold">
                <div>
                  {["A - Z", "Z - A", "Low to High", "High to Low"].map(
                    (field) => {
                      return (
                        <button
                          key={field}
                          onClick={() => handleOptionClick(field)}
                          className="block w-full px-4 py-2 text-lg font-semibold text-white border-b border-gold  hover:text-gold"
                        >
                          {field}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-10 sml:gap-4 slg:gap-5 mt-[3vmax] mb-[6vmax] w-[100%]">
          {products &&
            products.map((product) => {
              return <Card key={product._id} product={product} />;
            })}
        </div>
      </div>

      {/* pagination  */}
      {/* {resultPerPage < count && (
        <div className="paginationBox w-[100%] bg-red-300">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={20}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )} */}
      {/* Filter-Section  */}
      <div
        className={`filter-section transition-all duration-300 z-50 font-roboto bg-bg-color w-[320px] min-h-[100vh] text-white ${
          filter === true ? "fixed top-0 left-0 " : "fixed top-0 left-[-100%]"
        }`}
      >
        <div className="availability flex flex-col">
          <h2 className="text-white text-2xl m-2">Availability</h2>
          <div className="flex items-center gap-2 ml-6">
            <input
              type="checkbox"
              name="inStock"
              id="checkBox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
              className="text-xl border-gray-300 bg-transparent"
            />
            <label htmlFor="checkBox">In Stock</label>
          </div>
          <div className="flex items-center gap-2 ml-6">
            <input
              type="checkbox"
              name="outStock"
              id="outStock"
              checked={outStock}
              onChange={() => setOutStock(!outStock)}
              className="text-xl border-gray-300 bg-transparent"
            />
            <label htmlFor="outStock">Out Stock</label>
          </div>
          <h2 className="text-white text-xl m-2 mt-7">Price</h2>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            step={10}
            min={0}
            max={25000}
            sx={{ width: 200, marginLeft: 5 }}
          />
          <h2 className="text-white text-xl m-2 mt-7">Ratings Above</h2>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
            sx={{ width: 200, marginLeft: 5 }}
          />
          <div className="category">
            {categories.map((category) => {
              return (
                <h2
                  key={category}
                  className="text-white cursor-pointer"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </h2>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
