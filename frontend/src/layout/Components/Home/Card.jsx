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
  };
  return (
    // <div className="group  w-[70vw] sm:w-[40vw] sml:w-[50vw]  h-[400px] mx-auto ">
    //   <div className=" border bg-transparent border-gray-400 rounded-lg shadow-lg hover:shadow-xl transition-all p-4 relative">
    //     {/* Category */}
    //     <div className="absolute top-6 left-6 text-sm font-semibold text-white/90 bg-gold px-3 py-1 rounded-full">
    //       {category?.category}
    //     </div>

    //     {/* Discount */}
    //     {discount > 0 && (
    //       <div className="absolute top-6 right-6 text-sm font-semibold text-white/90 bg-gold px-3 py-1 rounded-full">
    //         Rs. -{discount}
    //       </div>
    //     )}

    //     {/* Image */}
    //     <NavLink to={`/product/${_id}`}>
    //       <div>
    //         <img
    //           src={images[0]?.url}
    //           alt={name}
    //           className="w-full h-48 object-cover rounded-lg mb-4"
    //         />
    //       </div>

    //       {/* Product Title */}
    //       <h3 className="text-md font-semibold text-white/90 text-center mb-2">
    //         {name}
    //       </h3>

    //       {/* Description */}
    //       <p className="text-sm text-white/80 text-center mb-2  w-[80%] mx-auto">
    //         {description?.length > 50
    //           ? `${description.slice(0, 50)}...`
    //           : description}
    //       </p>

    //       {/* Price */}
    //       <div className="text-lg font-semibold text-white/90 text-center">
    //         Rs.{price}
    //       </div>
    //     </NavLink>

    //     {/* Add to Cart Button */}
    //     <button
    //       onClick={() => handleAddToCart(_id, 1, price, stock)}
    //       className="w-full mt-4 py-2 border text-white/90 text-lg border-[#f0b343] hover:bg-[#f0b343] hover:border-[#f0b343] rounded-full transition duration-200"
    //     >
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>

    <div
      key={product._id}
      className="group w-full h-full border bg-transparent border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all p-4 relative"
    >
      {/* Category */}
      <div className="absolute top-6 left-5 text-xs font-semibold text-white/90 bg-gold px-2 py-1 rounded-full">
        {product.category?.category}
      </div>

      {/* Discount */}
      {product.discount > 0 && (
        <div className="absolute top-6 right-5 text-xs font-semibold text-white/90 bg-gold px-2 py-1 rounded-full">
          Rs. -{product.discount}
        </div>
      )}

      {/* Image */}
      <NavLink to={`/product/${product._id}`}>
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />

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
