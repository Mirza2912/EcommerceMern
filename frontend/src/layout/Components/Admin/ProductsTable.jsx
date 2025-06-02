import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToFeatured,
  deleteProduct,
  getALLProductsAdmin,
  makeUnfeatured,
} from "../../store/ProductSlice/productSliceReducers";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete, MdOutlineAccountCircle } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuEye } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import Loader from "../Loader/Loader";

export default function ProductsTable({ products }) {
  const dispatch = useDispatch();
  // console.log(route);

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  const { adminProducts, loading } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const paginatedProducts = products?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    adminProducts && adminProducts?.length / usersPerPage
  );

  // console.log(paginatedProducts);

  const toggleDropdown = (productId) => {
    if (dropdownOpen === productId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(productId);
    }
  };

  // useEffect(() => {
  //   dispatch(getALLProductsAdmin());
  // }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4 overflow-hidden ">
          <div className="overflow-x-auto ">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="text-sm text-[#F7FAFC] border-b border-gray-700">
                  <th className="font-medium text-left pb-3 pl-4">Product</th>
                  <th className="font-medium text-left pb-3">Price</th>
                  <th className="font-medium text-left pb-3">Stock</th>
                  <th className="font-medium text-right pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts &&
                  paginatedProducts?.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b last:border-0 border-gray-700 hover:bg-bg-color pl-4"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full flex items-center justify-center ">
                            <img
                              src={product.images && product.images[0]?.url}
                              alt={product.name}
                              className="w-full h-full bg-center bg-cover rounded-full"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {product.category?.category}
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
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm ${
                            product.stock > 0
                              ? ""
                              : product.stock === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock > 0 ? product.stock : "OutStock"}
                        </span>
                      </td>
                      <td className="py-3 text-right pr-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/dashboard/products/single-product/details/${product._id}`}
                          >
                            <LuEye className="text-xl mt-1 mr-1 text-gold hover:text-[#d99f18]" />
                          </Link>
                          <button
                            onClick={() => dispatch(deleteProduct(product._id))}
                          >
                            <MdDelete className="text-xl text-red-600 hover:text-red-800" />
                          </button>
                          <div className="">
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
                                    onClick={() => toggleDropdown(null)}
                                    to={`/admin/dashboard/products/single-product/${product._id}`}
                                    className=" flex items-center gap-1 pl-1.5 py-2 text-md text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                  >
                                    <FaRegEdit className="text-lg" />
                                    Edit Product
                                  </Link>
                                  <button
                                    onClick={() => {
                                      {
                                        product.isFeatured === true
                                          ? dispatch(
                                              makeUnfeatured(product._id)
                                            )
                                          : dispatch(
                                              addToFeatured(product._id)
                                            );
                                        toggleDropdown(null);
                                      }
                                    }}
                                    className=" flex items-center gap-1 pl-1.5 py-2 text-md text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                  >
                                    <MdOutlineAccountCircle className="text-lg" />
                                    {product.isFeatured === true
                                      ? "Un-Featured"
                                      : "Add to featured"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm ">
              Showing {paginatedProducts.length} of {adminProducts.length} users
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-3 py-1 rounded-md flex items-center text-md ${
                  currentPage === 1
                    ? " cursor-not-allowed"
                    : "hover:bg-[#d99f18]"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm border border-gray-700 rounded-md ${
                      currentPage === page
                        ? "bg-orange-50 text-gold"
                        : "hover:bg-gray-50 text-gold"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-3 py-1 rounded-md flex items-center text-md ${
                  currentPage === totalPages
                    ? " cursor-not-allowed"
                    : "hover:bg-[#d99f18]"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
