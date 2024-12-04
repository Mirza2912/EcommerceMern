import React from "react";
import { NavLink } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Header = () => {
  //useState for toggling the nav burger for display of nav items
  const [navItem, setnavItem] = useState(false);
  // console.log(navItem);
  // bg-bg-color
  return (
    <nav className="w-[100%] sm:absolute sm:bg-transparent sm:z-50 bg-bg-color font-roboto h-[4rem] sm:h-auto sm:mt-5 sm:py-[1rem] lg:h-[5rem] lg:py-0 flex items-center justify-center">
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
          <ul className="flex xsm:flex-col items-center justify-center xsm:h-[100%] gap-12 font-medium xsm:font-bold xsm:text-xl">
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `group relative ${
                    isActive
                      ? "text-gold font-bolder hover:text-[white] "
                      : "text-white hover:text-gold"
                  } `
                }
                to="/"
                onClick={() => setnavItem(false)}
              >
                <span
                  className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-gold scale-x-0
                      transition-transform duration-300 group-hover:scale-x-100 "
                ></span>
                Home
              </NavLink>
            </li>
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gold font-bolder hover:text-[white] "
                      : "text-white hover:text-gold"
                  } hover:text-white`
                }
                to="/about"
                onClick={() => setnavItem(false)}
              >
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                About
              </NavLink>
            </li>
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gold font-bolder hover:text-[white] "
                      : "text-white hover:text-gold"
                  } hover:text-white`
                }
                to="/products"
                onClick={() => setnavItem(false)}
              >
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                Products
              </NavLink>
            </li>
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gold font-bolder hover:text-[white] "
                      : "text-white hover:text-gold"
                  } hover:text-white`
                }
                to="/contact"
                onClick={() => setnavItem(false)}
              >
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                Contact US
              </NavLink>
            </li>
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gold font-bolder hover:text-[white] "
                      : "text-white hover:text-gold"
                  } hover:text-white`
                }
                to="/account"
                onClick={() => setnavItem(false)}
              >
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                Account
              </NavLink>
            </li>
            <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-gold font-bolder hover:text-[white] "
                      : "text-white hover:text-gold"
                  } hover:text-white`
                }
                to="/search"
                onClick={() => setnavItem(false)}
              >
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                <SearchIcon />
              </NavLink>
            </li>

            {/* <li className="relative group">
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-white font-semibold hover:text-menu-color"
                      : "text-menu-color"
                  } hover:text-white`
                }
                to="/"
                onClick={() => setnavItem(false)}
              >
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                Log Out
              </NavLink>
            </li> */}
          </ul>
        </div>
        <div className="icons sm:hidden relative">
          <RiMenuFill
            className={`text-white text-2xl ${
              navItem == true ? "xsm:hidden" : "xsm:block"
            }`}
            onClick={() => setnavItem(true)}
          />
          <IoCloseSharp
            className={`text-white text-2xl  ${
              navItem == true ? "xsm:block" : "xsm:hidden"
            }`}
            onClick={() => setnavItem(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
