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
import Pagination from "react-js-pagination";
import { IoCloseSharp } from "react-icons/io5";
import Slider from "@mui/material/Slider";
import { toast } from "react-toastify";
import "./Product.css";

const Products = () => {
  const [filter, setFilter] = useState(false);
  const [view, setView] = useState("grid");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 3000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [outStock, setOutStock] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const filterHandler = () => setFilter(!filter);
  const handleOptionClick = (option) => setIsOpen(false);

  const {
    products,
    loading,
    error,
    productCount,
    filteredProductCount,
    productsPerPage = 8,
  } = useSelector((state) => state.product);
  console.log(products);

  const params = useParams();
  const keyword = params.keyword || "";

  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const stock = inStock ? true : outStock ? false : undefined;

  useEffect(() => {
    if (error) {
      toast.error(error);
      Dispatch(clearError());
    }

    Dispatch(
      getAllProducts({
        keyword,
        price,
        category,
        page: currentPage,
        stock,
        rating,
      })
    );
  }, [keyword, price, category, currentPage, stock, rating, error, Dispatch]);

  const clearFilters = () => {
    setCategory("");
    setRating(0);
    setPrice([0, 3000]);
    setCurrentPage(1);
    setInStock(false);
    setOutStock(false);
    Navigate("/products");
    setFilter(false);
  };

  return (
    <section>
      {/* Header */}
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

      {/* Products Content */}
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

          <div className="text-xl hidden text-center sm:block font-semibold text-gold">
            Products :{" "}
            <span className="text-gold">
              {filteredProductCount} of {productCount}
            </span>
          </div>

          <div className="relative inline-block text-left font-roboto">
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

            {isOpen && (
              <div className="absolute top-12 z-10 sm:w-[8.7rem] rounded-md bg-bg-color border border-gold">
                <div>
                  {["A - Z", "Z - A", "L to H", "H to L"].map((field) => (
                    <button
                      key={field}
                      onClick={() => handleOptionClick(field)}
                      className="block w-full px-4 py-2 text-lg font-semibold text-white border-b border-gold hover:text-gold"
                    >
                      {field}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:px-4 pt-14 rounded-md ">
          {products &&
            products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
        </div>

        {/* Pagination */}
        {productsPerPage < productCount && (
          <div className="paginationBox mt-10">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={productsPerPage}
              totalItemsCount={productCount}
              onChange={(e) => setCurrentPage(e)}
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
        )}
      </div>

      {/* ✅ Sidebar Filter Panel - Fully Functional Now */}
      <div
        className={`filter-section transition-all duration-300 z-[100] font-roboto bg-bg-color w-[320px] min-h-[100vh] text-white ${
          filter ? "fixed top-0 left-0 " : "fixed top-0 left-[-100%]"
        }`}
      >
        <div
          className="text-center mt-5 float-right mr-5 bg-red-600 cursor-pointer"
          onClick={filterHandler}
        >
          <IoCloseSharp className=" text-3xl" />
        </div>

        <div className="availability flex flex-col ">
          <div className=" ml-4 mt-5">
            <h2 className="text-white text-xl">Availability</h2>
            <div className="flex items-center gap-2 ml-6">
              <input
                type="checkbox"
                id="inStock"
                checked={inStock}
                onChange={() => {
                  setInStock(!inStock);
                  setOutStock(false);
                  setCurrentPage(1);
                }}
                className="text-xl bg-transparent cursor-pointer"
              />
              <label htmlFor="inStock" className="cursor-pointer">
                In Stock
              </label>
            </div>
            <div className="flex items-center gap-2 ml-6">
              <input
                type="checkbox"
                id="outStock"
                checked={outStock}
                onChange={() => {
                  setOutStock(!outStock);
                  setInStock(false);
                  setCurrentPage(1);
                }}
                className="text-xl bg-transparent cursor-pointer"
              />
              <label htmlFor="outStock" className="cursor-pointer">
                Out Stock
              </label>
            </div>
          </div>

          <div className="category ml-4 mb-2 mt-5">
            <h2 className="text-white text-xl">Category</h2>
            <div className="flex flex-col ml-6 gap-1 mt-2">
              {products &&
                products.map((cat) => (
                  <button
                    key={cat.category._id}
                    onClick={() => {
                      setCategory(cat.category?.category);
                      setCurrentPage(1);
                    }}
                    className={`text-left text-md hover:text-gold ${
                      category === cat.category?.category
                        ? "text-gold font-bold"
                        : "text-white"
                    }`}
                  >
                    {cat.category?.category}
                  </button>
                ))}
            </div>
          </div>

          <div className="ml-4 mb-2 mt-5">
            <h2 className="text-white text-xl">Price</h2>
            <Slider
              value={price}
              onChange={(event, newPrice) => {
                setPrice(newPrice);
                setCurrentPage(1);
              }}
              valueLabelDisplay="auto"
              step={50}
              min={0}
              max={3000}
              sx={{ width: 200, marginLeft: 6 }}
            />
          </div>

          <div className="ml-4 mb-2 mt-5">
            <h2 className="text-white text-xl">Ratings Above</h2>
            <Slider
              value={rating}
              onChange={(event, newRating) => {
                setRating(newRating);
                setCurrentPage(1);
              }}
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
      </div>
    </section>
  );
};

export default Products;
