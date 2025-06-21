import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-bg-color">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
            <div className="mx-5">
              <h2 className="mb-6 text-3xl font-semibold text-white ">
                About Logo
              </h2>
              <p className="text-white text-md">
                Logo - worldwide Book and Stationary store since 2021. We sell
                over 2000+ Category products on our web-site.
              </p>
              <div className="my-7">
                {/* <img src={footerLogo} className="w-13 h-10" alt="" /> */}
                <p className="text-xl text-white font-semibold">Logo</p>
              </div>
              <p className="text-white my-7">Phone No +2345678</p>
              <div className="flex gap-4 items-center">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61577760235420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-2xl"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/mirzatayyab2912/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700 text-2xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/923095226400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 text-2xl"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            <div className="mx-5">
              <div>
                {/* <img src={footerLogo} alt="" /> */}
                <p className="text-3xl text-white font-semibold">Logo</p>
              </div>
              <p className="my-7 text-white">
                Register now to get update on promotion and coupons. Dont worry!
                Its not Spam
              </p>
              <div className="flex flex-col">
                <NavLink
                  className={"text-gold font-bold text-xl hover:text-[#d99f18]"}
                  to={"/account"}
                >
                  Register
                </NavLink>
                <NavLink
                  className={
                    "text-gold my-3 font-bold text-xl hover:text-[#d99f18]"
                  }
                  to={"/account"}
                >
                  Login
                </NavLink>
                <NavLink
                  className={
                    "text-gold  font-bold text-xl hover:text-[#d99f18]"
                  }
                  to={"/account"}
                >
                  Login As Employee
                </NavLink>
              </div>
              <div></div>
            </div>

            <div className="mx-5">
              <h2 className="mb-6 text-3xl font-semibold text-white ">
                Company
              </h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={"/about"} className="hover:underline">
                    Abount
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={"/contact"} className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={"/cart"} className="hover:underline">
                    Cart
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={"/products"} className="hover:underline">
                    Our Products
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div>
            <p className="text-white text-center pb-3">
              Copyright 2021 EG-Shop Grocery | Design By Egens Labs
            </p>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
