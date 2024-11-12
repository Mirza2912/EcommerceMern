import React from "react";
import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./Card.css";

const Card = ({ product }) => {
  return (
    <NavLink
      to={`/product/${product._id}`}
      className="xxsm:w-[85%] xsm:w-[75%] sm:w-[70%] md:w-[45%] slg:w-[40%] xlg:w-[30%] xxl:w-[23%]"
    >
      <div className={`card text-white bg-[#95959611]`}>
        <div className="card-img relative w-[100%]">
          <figure
            className={` overflow-hidden  after:content-[''] after:transition-all after:duration-300 after:w-[0%] hover:after:w-[100%] after:h-full after:bg-[#0505052b] after:absolute after:top-0 after:left-0`}
          >
            <img
              className={`${"h-[200px] w-[100%] ease-in duration-300 object-center object-cover"}`}
              src={`${product.images[0].url}`}
              alt={product.name}
            />
          </figure>
          <figcaption className="absolute top-2 text-black right-2 bmd:right-4 px-3 py-[3px] bg-[#ca9d2d] rounded-full">
            {product.category}
          </figcaption>
        </div>
        <div className="card-properties  my-3 pb-3 px-2 flex flex-col gap-3 items-center justify-between">
          <h2 className="w-[90%] text-center leading-tight">
            {product.description}
          </h2>
          <div className="w-[100%] flex items-center justify-center gap-1 -my-2">
            <Rating
              name="read-only"
              value={product.rating}
              readOnly
              precision={0.5}
            />
            <h2> {` (${product.numOfReviews} Reviews)`}</h2>
          </div>
          <h1 className="text-white">{product.price}</h1>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
