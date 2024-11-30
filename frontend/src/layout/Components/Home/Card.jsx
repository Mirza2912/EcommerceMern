import React from "react";
import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./Card.css";

const Card = ({ product }) => {
  return (
    <NavLink
      to={`/product/${product._id}`}
      className={`card xxsm:w-[90%] xsm:w-[80%] sm:w-[45%] sml:w-[32%] slg:w-[30%] xlg:w-[23%] p-3 sml:p-0 slg:p-3  rounded-md  hover:bg-[#95959611]`}
    >
      <div className="card-img relative w-[100%]">
        <figure
          className={`w-[100%] h-[350px] slg:h-[300px] xlg:h-[250px] xxl:h-[270px] overflow-hidden  after:content-[''] after:transition-all after:duration-300 after:w-[0%] hover:after:w-[100%] after:h-full after:bg-[#0505052b] after:absolute after:top-0 after:left-0`}
        >
          <img
            className={`${"w-[100%] h-[100%] ease-in duration-300 "}`}
            src={`${product.images[0].url}`}
            alt={product.name}
            loading="lazy"
          />
        </figure>
        <figcaption className="absolute top-2 text-black right-2 bmd:right-4 px-3 py-[3px] bg-[#ca9d2d] rounded-full">
          {product.category}
        </figcaption>
        {product.discount ? (
          <figcaption className="absolute top-2 text-black left-2 bmd:right-4 px-3 py-[3px] bg-[#ca9d2d] rounded-full">
            -{product.discount}%
          </figcaption>
        ) : (
          <></>
        )}
      </div>
      <div className="card-properties text-white font-roboto mt-5 mb-2 px-2 flex flex-col gap-3 items-center ">
        <h2 className="w-[90%] text-center leading-tight text-[#a1a1a2]">
          {product.category}
        </h2>
        <h2 className="w-[90%] text-center leading-tight">{product.name}</h2>
        <div className="w-[100%] flex items-center justify-center gap-1 -my-2">
          <Rating
            name="read-only"
            value={product.rating}
            readOnly
            precision={0.5}
          />
          <h2> {` (${product.numOfReviews} Reviews)`}</h2>
        </div>
        <h1 className="text-white">{product.price} PKR</h1>
      </div>
    </NavLink>
  );
};

export default Card;
