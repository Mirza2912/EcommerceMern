import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, replace, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addToCartBackend } from "../../store/CartSlice/CartSliceReducers";
import { addToCartLocal } from "../../store/CartSlice/CartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { _id, category, discount, images, name, description, price, stock } =
    product;

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
    // navigate("/products");
  };
  return (
    <div className="group mx-7 sm:mx-20 md:mx-0">
      <div className=" border bg-transparent border-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-all p-4 relative">
        {/* Category */}
        <div className="absolute top-4 left-4 text-sm font-semibold text-white/90 bg-gold px-3 py-1 rounded-full">
          {category?.category || "hello"}
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 text-sm font-semibold text-white/90 bg-gold px-3 py-1 rounded-full">
            -{discount}%
          </div>
        )}

        {/* Image */}
        <NavLink to={`/product/${_id}`}>
          <div>
            <img
              src={images[0]?.url}
              alt={name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          </div>

          {/* Product Title */}
          <h3 className="text-lg font-semibold text-white/90 text-center mb-2">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/80 text-center mb-2">
            {description?.length > 50
              ? `${description.slice(0, 50)}...`
              : description}
          </p>

          {/* Price */}
          <div className="text-lg font-semibold text-white/90 text-center">
            Rs.{price}
          </div>
        </NavLink>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(_id, 1, price, stock)}
          className="w-full mt-4 py-2 border text-white/90 text-lg border-[#f0b343] hover:bg-[#f0b343] hover:border-[#f0b343] rounded-full transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
