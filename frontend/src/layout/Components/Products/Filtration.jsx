import React, { useState } from "react";
import Slider from "@mui/material/Slider";
const Filtration = ({ category, filter }) => {
  console.log(category);

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

  return (
    <div
      className={`filter-section transition-all duration-300 z-50 font-roboto bg-bg-color w-[320px] min-h-[100vh] text-white ${
        filter === true
          ? "absolute top-0 left-0 "
          : "absolute top-0 left-[-100%]"
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
      </div>
    </div>
  );
};

export default Filtration;
