import React from "react";
import { NavLink } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const { isVerified } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems?.length);

  const [navItem, setnavItem] = useState(false);
  return (
    <nav className="w-[100%] sm:fixed sm:z-50 bg-bg-color font-roboto h-[4rem] sm:h-auto  sm:py-[1rem] lg:h-[5rem] lg:py-0 flex items-center justify-center">
      <div className="container xxsm:px-[1rem] xsm:flex xsm:items-center xsm:justify-between xsm:w-[100%] xsm:px-[2rem] sm:w-[100%] sm:block lg:w-[100%] lg:px-[2rem] lg:flex xl:w-[80%] items-center justify-between">
        {/* Logo Image */}
        <div className="logo sm:w-[100%] sm:text-center sm:mb-[0.5rem] lg:w-auto lg:mb-0">
          <h1 className="text-white">Logo</h1>
        </div>
        {/* Navbar menu  */}
        <div
          className={` flex items-center justify-center gap-10 font-medium  ${
            navItem == true
              ? "xsm:block xsm:h-[calc(100vh-4rem)] xsm:w-[100%] xsm:absolute xsm:left-0 xsm:bottom-0 xsm:mx-0 xsm:z-50  xsm:text-center xsm:bg-bg-color"
              : "xsm:hidden"
          }`}
        >
          <ul className="flex xsm:flex-col items-center justify-center xsm:h-[100%] gap-9 font-medium xsm:font-bold xsm:text-xl">
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `relative  py-1 font-medium transition duration-200
                  ${
                    isActive
                      ? 'text-gold font-semibold after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-full after:bg-gold'
                      : 'text-white hover:text-white after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300'
                  }`
                }
                to="/"
                onClick={() => setnavItem(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `relative  py-1 font-medium transition duration-200
                ${
                  isActive
                    ? 'text-gold font-semibold after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-full after:bg-gold'
                    : 'text-white hover:text-white after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300'
                }`
                }
                to="/about"
                onClick={() => setnavItem(false)}
              >
                About
              </NavLink>
            </li>
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `relative  py-1 font-medium transition duration-200
                ${
                  isActive
                    ? 'text-gold font-semibold after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-full after:bg-gold'
                    : 'text-white hover:text-white after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300'
                }`
                }
                to="/products"
                onClick={() => setnavItem(false)}
              >
                Products
              </NavLink>
            </li>
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `relative  py-1 font-medium transition duration-200
                  ${
                    isActive
                      ? 'text-gold font-semibold after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-full after:bg-gold'
                      : 'text-white hover:text-white after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300'
                  }`
                }
                to="/contact"
                onClick={() => setnavItem(false)}
              >
                Contact US
              </NavLink>
            </li>
            {isVerified ? (
              <li className="relative group">
                <NavLink
                  className={({ isActive }) =>
                    `relative  py-1 font-medium transition duration-200
                ${
                  isActive
                    ? 'text-gold font-semibold after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-full after:bg-gold'
                    : 'text-white hover:text-white after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300'
                }`
                  }
                  to="/user/profile"
                  onClick={() => setnavItem(false)}
                >
                  Profile
                </NavLink>
              </li>
            ) : (
              <li className="relative group">
                <NavLink
                  className={({ isActive }) =>
                    `relative  py-1 font-medium transition duration-200
                ${
                  isActive
                    ? 'text-gold font-semibold after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-full after:bg-gold'
                    : 'text-white hover:text-white after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300'
                }`
                  }
                  to="/account"
                  onClick={() => setnavItem(false)}
                >
                  Account
                </NavLink>
              </li>
            )}
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `relative  py-1 font-medium transition duration-200
                ${
                  isActive
                    ? 'text-gold font-semibold after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-full after:bg-gold'
                    : 'text-white hover:text-white after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300'
                }`
                }
                to="/search"
                onClick={() => setnavItem(false)}
              >
                <SearchIcon />
              </NavLink>
            </li>
            <li className="relative group">
              <p className="absolute bottom-4  text-white/90 text-center  ml-4 w-[25px] h-[25px] rounded-full bg-gold">
                {cartItems?.length > 0 ? cartItems?.length : 0}
              </p>
              <NavLink
                className={({ isActive }) =>
                  `relative text-2xl py-1 font-medium transition duration-200
                ${
                  isActive
                    ? "text-gold font-semibold "
                    : 'text-white hover:text-white after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2.5px]  after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300'
                }`
                }
                to="/cart"
                onClick={() => setnavItem(false)}
              >
                <IoCartOutline />
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="icons sm:hidden relative">
          <RiMenuFill
            className={`text-white hover:cursor-pointer text-2xl ${
              navItem == true ? "xsm:hidden" : "xsm:block"
            }`}
            onClick={() => setnavItem(true)}
          />
          <IoCloseSharp
            className={`text-white hover:cursor-pointer text-2xl  ${
              navItem == true ? "xsm:block" : "xsm:hidden"
            }`}
            onClick={() => setnavItem(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
