import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearError } from "../store/ProductSlice/productSlice";
import { getAllProducts } from "../store/ProductSlice/productSliceReducers";
import Card from "../Components/Home/Card";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import { IoGrid } from "react-icons/io5";
import { PiListBold } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Product.css";
import Pagination from "react-js-pagination";
import { IoCloseSharp } from "react-icons/io5";
import Slider from "@mui/material/Slider";
import { toast } from "react-toastify";
import CategorySwiper from "../Components/Products/CategorySwiper/CategorySwiper";
import "./Product.css";

const Products = () => {
  //useState for selecting category all notebook et
  // const [category, setCategory] = useState("");
  const [filter, setFilter] = useState(false);
  const [view, setView] = useState("grid");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [stock, setStock] = useState(false);
  const [outStock, setOutStock] = useState(false);
  const [price, setPrice] = useState([0, 3000]);
  const [rating, setRating] = useState(0);
  // console.log(rating);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // console.log("Selected:", option);
    setIsOpen(false);
  };

  const filterHandler = () => {
    setFilter(!filter);
  };

  //getting all products
  const {
    products,
    loading,
    error,
    productCount,
    filteredProductCount,
    productsPerPage = 8,
  } = useSelector((state) => state.product);

  let count = 5;

  const Category = [
    {
      category: "",
      name: "All",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_q7UF2nqqSUQ5z0SrLwFStm1x5rbJdXqDqUvZrHog2zEve4gOstkZ_sn3B3KwEoMcU4k&usqp=CAU",
    },
    {
      category: "book",
      name: "Books",
      image:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip",
    },
    {
      category: "notebook",
      name: "Note Books",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnNPvTjGMLA0-BE-v4HXAMsXAx1kIsK1J5iQ&s",
    },
    {
      category: "stationary",
      name: "Stationary",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK8SPorTTHz6ZRi2ohXJonuj56guR7vptDWg&s",
    },
  ];

  const params = useParams();

  // const [keyword, setKeyword] = useState(params.keyword);
  const keyword = params.keyword;
  // console.log(keyword);

  let filters = {
    // category,
    // rating,
    price,
    currentPage,
    stock,
    keyword,
  };

  const clearFilters = () => {
    setCategory(""),
      setRating(0),
      setPrice([0, 3000]),
      setCurrentPage(1),
      setStock(false),
      setOutStock(false);
    Navigate("/products");
    setFilter(false);
  };

  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const [activeCategory, setCategory] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      Dispatch(clearError());
    }
    Dispatch(getAllProducts());
    // Toast("Data fetched successfully", "success");
  }, []);

  return (
    <section>
      {/* //All Products  */}

      <div className="mt-12 mb-10 sm:mt-32 sm:mb-10  lg:mt-32">
        <h2 className="lg:text-6xl text-5xl font-bold text-white/90 text-center mb-3">
          All Products
        </h2>
        <div className="flex items-center justify-center text-white/90 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <span>Products</span>
        </div>
      </div>
      <div className="w-[90vw] xl:w-[75vw] flex flex-col items-center justify-center mx-auto bg-bg-color font-roboto px-4 py-10 mb-10">
        <div className="filters text-white/90 flex items-center justify-between w-full ">
          <button
            className="flex items-center justify-center gap-1 py-2 px-3 md:px-6 rounded-full text-white border border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53] hover:text-white/90"
            onClick={filterHandler}
          >
            <span>
              <TuneSharpIcon />
            </span>
            <span className="hidden md:block font-semibold text-lg">
              FILTER
            </span>
          </button>
          <div className="text-xl sm:hidden font-semibold text-gold">
            {filteredProductCount} of {productCount}
          </div>
          <div className="md:flex items-center justify-center gap-10 hidden">
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

          <div className="text-xl hidden text-center sm:block font-semibold text-gold">
            Products :
            <span className="text-gold">
              {filteredProductCount} of {productCount}
            </span>
          </div>

          <div className="relative inline-block text-left font-roboto">
            {/* Dropdown Button */}
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-center w-full px-3 py-2 font-semibold text-white hover:text-gold bg-transparent rounded-md shadow-sm border border-gold "
            >
              sort <span className="hidden sm:block sm:ml-1"> products</span>
              <IoMdArrowDropdown
                className={`mt-0.5 text-xl font-semibold transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-12 z-10 sm:w-[8.7rem] rounded-md bg-bg-color border border-gold">
                <div>
                  {["A - Z", "Z - A", "L to H", "H to L"].map((field) => {
                    return (
                      <button
                        key={field}
                        onClick={() => handleOptionClick(field)}
                        className="block w-full px-4 py-2 text-lg font-semibold text-white border-b border-gold  hover:text-gold"
                      >
                        {field}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:px-4 pt-14 rounded-md ">
          {products && products.map((product) => <Card product={product} />)}
        </div>

        {/* pagination  */}
        {productsPerPage < productCount && (
          <div className="paginationBox  mt-10 ">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={productsPerPage}
              totalItemsCount={productCount}
              onChange={(e) => setCurrentPage(e)}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item "
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </div>

      {/* Filter-Section  */}
      {/* <div
        className={`filter-section transition-all duration-300 z-50 font-roboto bg-bg-color w-[320px] min-h-[100vh] text-white ${
          filter === true ? "fixed top-0 left-0 " : "fixed top-0 left-[-100%]"
        }`}
      >
        <div
          className="text-center mt-5 float-right mr-5 bg-red-600 cursor-pointer"
          onClick={() => setFilter(!filter)}
        >
          <IoCloseSharp className=" text-3xl" />
        </div>
        <div className="availability flex flex-col ">
          <div className=" ml-4 mt-5">
            <h2 className="text-white text-xl">Availability</h2>
            <div className="flex items-center gap-2 ml-6">
              <input
                type="checkbox"
                name="inStock"
                id="checkBox"
                checked={inStock}
                onChange={() => setInStock(!inStock)}
                className="text-xl border-gray-300 bg-transparent cursor-pointer"
              />
              <label htmlFor="checkBox" className="cursor-pointer">
                In Stock
              </label>
            </div>
            <div className="flex items-center gap-2 ml-6">
              <input
                type="checkbox"
                name="outStock"
                id="outStock"
                checked={outStock}
                onChange={() => setOutStock(!outStock)}
                className="text-xl border-gray-300 bg-transparent cursor-pointer"
              />
              <label htmlFor="outStock" className="cursor-pointer">
                Out Stock
              </label>
            </div>
          </div>
          <div className="category ml-4 mb-2 mt-5">
            <h2 className="text-white text-xl ">Category</h2>
            <h2 className="text-gold ml-6">- {category}</h2>
          </div>
          <div className="ml-4 mb-2 mt-5">
            <h2 className="text-white text-xl">Price</h2>
            <Slider
              value={price}
              onChange={(event, newPrice) => setPrice(newPrice)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              step={50}
              min={0}
              max={3000}
              sx={{ width: 200, marginLeft: 6 }}
            />
          </div>

          <div className="ml-4 mb-2 mt-5">
            <h2 className="text-white text-xl ">Ratings Above</h2>
            <Slider
              value={rating}
              onChange={(event, newRating) => setRating(newRating)}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
              sx={{ width: 200, marginLeft: 6 }}
            />
          </div>
          <div className="w-full text-center mt-10">
            <button
              className="py-2 w-[150px] bg-red-600 hover:bg-red-800 transition-all duration-300"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Products;
