// ReturnSalePage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import {
  getMyAllSales,
  returnSale,
} from "../../../store/SalesSlice/saleSliceReducers";

const ReturnSalePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [returnItems, setReturnItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const { mySales } = useSelector((state) => state.sale);
  const sales = mySales || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAllSales()).then((res) => {
      setSearchResults(res?.payload || []);
    });
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered =
      value.trim() === ""
        ? sales
        : sales.filter(
            (sale) =>
              sale.customerName.toLowerCase().includes(value.toLowerCase()) ||
              (sale.saleId &&
                sale.saleId.toString().includes(value.toLowerCase()))
          );

    setSearchResults(filtered);
    setShowDropdown(true);
  };

  const handleFocus = () => {
    setSearchResults(sales);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSale = (sale) => {
    setSelectedSale(sale);
    setReturnItems(
      sale.items.map((item) => ({
        ...item,
        returnQuantity: item.quantity,
      }))
    );
    setSearchTerm("");
    setSearchResults([]);
    setShowDropdown(false);
  };

  const handleReturnQtyChange = (itemId, value) => {
    setReturnItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, returnQuantity: Number(value) } : item
      )
    );
  };

  const handleSubmitReturn = async () => {
    try {
      const filteredItems = returnItems.filter(
        (item) => item.returnQuantity > 0
      );
      console.log({ saleData: filteredItems, saleId: selectedSale._id });

      dispatch(
        returnSale({ saleData: filteredItems, saleId: selectedSale._id })
      );
      setSelectedSale(null);
      setReturnItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-black/60 backdrop-blur-lg m-4 rounded-lg border border-gray-700 shadow-md space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Return Sale</h1>

      <div className="relative w-full" ref={dropdownRef}>
        <IoMdSearch className="absolute left-2 top-3 text-xl text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by Sale ID or Customer Name"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          className="pl-8 bg-transparent w-full h-10 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent"
        />

        {showDropdown && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 max-h-[400px] overflow-y-auto border border-gray-700 rounded-lg shadow-lg bg-black/60 backdrop-blur-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-[#F7FAFC] border-b border-gray-700">
                <tr>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2">Sale ID</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Return</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Select</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((sale) => (
                  <tr
                    key={sale._id}
                    className="hover:bg-gray-700 cursor-pointer border-b border-gray-600"
                  >
                    <td className="pl-4 py-2">{sale.customerName}</td>
                    <td className=" py-2">{sale.saleId}</td>
                    <td className="py-2">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>
                    <td className=" py-2">
                      {sale.isReturned === true ? "Returned" : ""}
                    </td>
                    <td className="py-2">Rs. {sale.totalAmount}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleSelectSale(sale)}
                        className="text-sm bg-gold text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedSale && (
        <div className="space-y-6">
          <div className="bg-black/50 p-4 border border-gray-700 rounded">
            <h2 className="text-lg font-semibold text-white mb-2">Sale Info</h2>
            <p className="text-gray-300">
              Customer: {selectedSale.customerName}
            </p>
            <p className="text-gray-300">
              Number: {selectedSale.customerNumber}
            </p>
            <p className="text-gray-300">
              Total: Rs. {selectedSale.totalAmount}
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-700 rounded-lg bg-black/60 backdrop-blur-lg">
            <table className="w-full text-left text-sm text-white">
              <thead className="text-[#F7FAFC] border-b border-gray-700">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th>Quantity</th>
                  <th>Return Quantity</th>
                </tr>
              </thead>
              <tbody>
                {returnItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={item.returnQuantity}
                        min={0}
                        max={item.quantity}
                        onChange={(e) =>
                          handleReturnQtyChange(item._id, e.target.value)
                        }
                        className="w-16 px-2 py-1 rounded bg-black text-white border border-gray-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={handleSubmitReturn}
              className="bg-gold text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Submit Return
            </button>
            <button
              onClick={() => {
                setSelectedSale(null);
                setReturnItems([]);
              }}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnSalePage;
