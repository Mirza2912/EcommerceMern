"use client";

import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function RecentProducts() {
  const { adminProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const firstFiveOrders = adminProducts && adminProducts?.slice(0, 5);

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (productId) => {
    if (dropdownOpen === productId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(productId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm border-b border-gray-700">
              <th className="font-medium text-left pb-3">Product</th>
              <th className="font-medium text-left pb-3">Price</th>
              <th className="font-medium text-left pb-3">Stock</th>
              <th className="font-medium text-right pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {firstFiveOrders &&
              firstFiveOrders?.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-700 last:border-0"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full flex items-center justify-center ">
                        <img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-full bg-center bg-cover rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {product.category?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-sm font-medium">
                      Rs.{product.price}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : product.stock === 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock > 0 ? "InStock" : "OutStock"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div>
                      <button
                        onClick={() => toggleDropdown(product._id)}
                        className="p-1 rounded-md hover:bg-gray-800"
                      >
                        <BiDotsHorizontalRounded className="w-5 h-4" />
                      </button>
                      {dropdownOpen === product._id && (
                        <div className="absolute right-5 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <Link
                              to={`/admin/dashboard/products/single-product/${product._id}`}
                              className="flex items-center gap-2 pl-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              <FaUser />
                              View details
                            </Link>
                            <Link
                              to={`/admin/dashboard/products/single-product/details/${product._id}`}
                              className="flex items-center gap-2 pl-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              <AiFillEdit />
                              Edit product
                            </Link>
                            <button
                              //   onClick={() =>
                              //     dispatch(deleteProduct(product._id))
                              //   }
                              className="flex items-center gap-2 pl-3 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              <MdDelete />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <Link
          to={"/admin/dashboard/products"}
          className="bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-4 py-2 rounded-md flex items-center text-sm"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
