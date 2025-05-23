import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getALLProductsAdmin } from "../../../store/ProductSlice/productSliceReducers";
import ProductsTable from "../../../Components/Admin/ProductsTable";
import { FiPlus } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";

export default function ProductsPage() {
  const dispatch = useDispatch();
  // console.log(route);

  const { adminProducts } = useSelector((state) => state.product);
  // Add state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const products = useMemo(() => {
    if (!adminProducts) return [];

    if (!searchQuery.trim()) return adminProducts;

    return adminProducts.filter((prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [adminProducts, searchQuery]);

  useEffect(() => {
    dispatch(getALLProductsAdmin());
  }, [dispatch]);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Products Management</h1>
        <Link
          to={"/admin/dashboard/products/create-new-product"}
          className="bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-4 py-2 rounded-md flex items-center text-sm justify-center gap-1"
        >
          <FiPlus className="text-lg" />
          Add New Product
        </Link>
      </div>

      <div className="bg-black/60 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-md">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <IoMdSearch className="absolute left-2 top-3 text-xl text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              className="pl-8 bg-transparent w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-gold hover:bg-[#d99f18] text-[#F7FAFC] px-4 py-2 rounded-md flex items-center text-sm">
            Filter
          </button>
        </div>

        <ProductsTable products={products} />
      </div>
    </div>
  );
}
