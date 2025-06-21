import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, replace, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addToCartBackend } from "../../store/CartSlice/CartSliceReducers";
import { addToCartLocal } from "../../store/CartSlice/CartSlice";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const {
    _id,
    category,
    discount,
    images,
    name,
    description,
    price,
    stock,
    ratings,
    numOfReviews,
  } = product;

  const options = {
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isVerified } = useSelector((state) => state.auth);
  const handleAddToCart = (id, quantity, price, stock) => {
    // console.log(product?._id);

    //data to send backend to create cart
    const itemDataToAddToCartBackend = {
      productId: id,
      quantity,
      price,
    };

    //data to send backend to create cart
    const itemDataToAddToCartLocal = {
      product: id,
      quantity,
      price,
      _id: uuidv4(),
      stock,
    };
    //when user logged in
    if (isVerified) {
      dispatch(addToCartBackend(itemDataToAddToCartBackend));
    } else {
      dispatch(addToCartLocal(itemDataToAddToCartLocal));
      toast.success("item added to cart successfully");
    }
  };
  return (
    <div
      key={product._id}
      className="group w-full h-full border bg-transparent border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all p-4 relative"
    >
      {/* Category */}
      <div className="absolute z-50 top-6 left-5 text-xs font-semibold text-white/90 bg-gold px-2 py-1 rounded-full">
        {product.category?.category}
      </div>

      {/* Discount */}
      {product.discount > 0 && (
        <div className="absolute z-50 top-6 right-5 text-xs font-semibold text-white/90 bg-gold px-2 py-1 rounded-full">
          Rs. -{product.discount}
        </div>
      )}

      {/* Image */}
      <NavLink to={`/product/${product._id}`}>
        <div className="overflow-hidden">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg mb-3 hover:scale-110  transition-transform duration-300 overflow-hidden"
          />
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-semibold text-white/90 text-center mt-3">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-white/80 text-center w-[80%] mx-auto mt-3">
          {product.description?.length > 50
            ? `${product.description.slice(0, 50)}...`
            : product.description}
        </p>

        <div className="flex flex-col items-center justify-center gap-1">
          <Rating
            {...options}
            sx={{
              mt: 1,
              "& .MuiRating-iconFilled": {
                color: "#faaf00", // Filled star color
              },
              "& .MuiRating-iconEmpty": {
                color: "#ffffff99", // Empty star color (optional)
              },
            }}
          />{" "}
          <span className="productCardSpan  font-medium text-white/80">
            {" "}
            ({numOfReviews} Reviews)
          </span>
        </div>

        {/* Price */}
        <div className="text-base font-semibold text-white/90 text-center mt-3 ">
          Rs.{product.price}
        </div>
      </NavLink>

      {/* Add to Cart Button */}
      <button
        onClick={() =>
          handleAddToCart(product._id, 1, product.price, product.stock)
        }
        className="w-full mt-3 py-2 border text-white/90 text-sm border-[#f0b343] hover:bg-[#f0b343] hover:border-[#f0b343] rounded-full transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
