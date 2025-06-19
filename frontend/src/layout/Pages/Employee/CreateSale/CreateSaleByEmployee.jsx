import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsEmployee } from "../../../store/ProductSlice/productSliceReducers";
import { IoMdSearch } from "react-icons/io";
import { createNewSaleByEmployee } from "../../../store/SalesSlice/saleSliceReducers";

const CreateSaleByEmployee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [productQuantities, setProductQuantities] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { employeeProducts } = useSelector((state) => state.product);
  //   console.log(employeeProducts);

  const products = employeeProducts || [];

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered =
      value.trim() === ""
        ? products.slice(0, 10)
        : products
            .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 10);
    setSearchResults(filtered);
    setShowDropdown(true);
  };

  const handleFocus = () => {
    setSearchResults(products.slice(0, 10));
    setShowDropdown(true);
  };

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !inputRef.current.contains(e.target)
    ) {
      setShowDropdown(false);
    }
  };

  const handleQuantityInput = (productId, value, maxStock) => {
    const quantity = Math.max(1, Math.min(Number(value), maxStock));
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const addItemToSale = (product) => {
    const quantity = productQuantities[product._id] || 1;
    const exists = saleItems.find((item) => item._id === product._id);
    if (exists) {
      const updated = saleItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setSaleItems(updated);
    } else {
      setSaleItems([
        ...saleItems,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          quantity,
          item: product._id,
        },
      ]);
    }
    setSearchTerm("");
    setSearchResults([]);
    setProductQuantities({});
    setShowDropdown(false);
  };

  const handleQuantityChange = (id, value) => {
    setSaleItems((prevItems) =>
      prevItems.map((item) => {
        const qty = Math.min(Number(value), item.stock || 9999);
        return item._id === id
          ? { ...item, quantity: qty < 1 ? 1 : qty }
          : item;
      })
    );
  };

  const removeItem = (id) => {
    setSaleItems(saleItems.filter((item) => item._id !== id));
  };

  const totalAmount = saleItems.reduce(
    (sum, item) =>
      sum + item.quantity * item.price - item.discount * item.quantity,
    0
  );

  const handleSaveSale = () => {
    if (!customerName || !customerNumber || saleItems.length === 0) return;

    const saleData = {
      saleType: "PHYSICAL",
      customerName,
      customerNumber,
      items: saleItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        discount: item.discount,
        item: item.item, // product ID
      })),
      totalAmount,
    };

    // console.log(saleData);

    dispatch(createNewSaleByEmployee(saleData));
    setCustomerName("");
    setCustomerNumber("");
    setSaleItems([]);
  };

  useEffect(() => {
    dispatch(getAllProductsEmployee());
  }, [saleItems, dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <h1 className="text-2xl sm:text-4xl mt-5 ml-5 font-bold text-white">
        Create Sale
      </h1>
      <div className="space-y-6 bg-black/60 backdrop-blur-lg p-4 sm:p-6 m-2 sm:m-6 rounded-lg border border-gray-700 shadow-md">
        {/* Product Search */}
        <div className="relative w-full " ref={dropdownRef}>
          <IoMdSearch className="absolute left-2 top-3 text-xl text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search product by name..."
            value={searchTerm}
            onChange={handleSearch}
            onFocus={handleFocus}
            className="pl-8 bg-transparent w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent text-white"
          />

          {/* Dropdown Table */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-2 max-h-[400px] overflow-x-auto border border-gray-700 rounded-lg shadow-lg bg-black/60 backdrop-blur-lg">
              <table className="min-w-[600px] w-full text-left text-sm">
                <thead>
                  <tr className="text-[#F7FAFC] border-b border-gray-700">
                    <th className="py-3 pl-4">Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Discount</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-700 hover:bg-gray-800"
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full overflow-hidden">
                            <img
                              src={product.images && product.images[0]?.url}
                              alt={product.name}
                              className="w-full h-full object-cover"
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
                      <td>Rs. {product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.discount}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max={product.stock}
                          value={productQuantities[product._id] || 1}
                          onChange={(e) =>
                            handleQuantityInput(
                              product._id,
                              e.target.value,
                              product.stock
                            )
                          }
                          className="w-16 px-2 py-1 rounded bg-black text-white border border-gray-700"
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => addItemToSale(product)}
                          className="bg-gold text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Add Item
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sale Items Table */}
        {saleItems.length > 0 && (
          <div className="overflow-x-auto border border-gray-700 rounded-lg bg-black/60 backdrop-blur-lg">
            <table className="min-w-[600px] w-full text-left text-sm text-white">
              <thead>
                <tr className="text-[#F7FAFC] border-b border-gray-700">
                  <th className="py-3 pl-4">Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {saleItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="py-3 pl-4">{item.name}</td>
                    <td>Rs. {item.price}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(item._id, e.target.value)
                        }
                        className="w-16 px-2 py-1 text-white bg-black rounded border border-gray-700"
                      />
                    </td>
                    <td>Rs. {item.discount * item.quantity}</td>
                    <td>
                      Rs.{" "}
                      {item.quantity * item.price -
                        item.discount * item.quantity}
                    </td>
                    <td>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Customer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="bg-transparent w-full h-10 px-3 rounded-md border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="text"
            placeholder="Customer Number"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            className="bg-transparent w-full h-10 px-3 rounded-md border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        {/* Total and Action */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xl text-white font-semibold">
            Total: Rs. {totalAmount}
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleSaveSale}
              className="bg-gold text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Save Sale
            </button>
            <button
              onClick={() => {
                setSaleItems([]);
                setSearchTerm("");
                setSearchResults([]);
                setProductQuantities({});
                setShowDropdown(false);
              }}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSaleByEmployee;
