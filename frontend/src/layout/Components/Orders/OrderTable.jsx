import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { RiShareBoxFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const OrdersTable = () => {
  const navigate = useNavigate();
  const { error, order } = useSelector((state) => state.order);

  const data = useMemo(() => {
    return (
      order &&
      order?.map((ord, index) => ({
        number: index + 1,
        image: ord.orderItems[0]?.image?.url,
        orderId: ord._id,
        price: ord.totalPrice,
        details: ord._id,
      }))
    );
  }, [order]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "number",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <div className="flex items-center justify-center">
            <img
              src={value}
              alt="Product"
              className="md:w-14 md:h-14 w-12 h-12 object-cover rounded"
            />
          </div>
        ),
      },
      {
        Header: "Order ID",
        accessor: "orderId",
        Cell: ({ value }) => <span className="text-md break-all">{value}</span>,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => (
          <span className="text-md">Rs. {value.toFixed(2)}</span>
        ),
      },
      {
        Header: "Details",
        accessor: "details",
        Cell: ({ value }) => (
          <button
            onClick={() => navigate(`/user/order/${value}`)}
            className="text-white/90 hover:text-gold"
            title="View Order"
          >
            <RiShareBoxFill className="w-5 h-5" />
          </button>
        ),
      },
    ],
    [navigate]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // using page instead of rows
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <>
      <div className="mb-7 ">
        <h2 className="lg:text-6xl text-5xl font-bold text-white/90 text-center mb-3">
          Orders
        </h2>
        <div className="flex items-center justify-center text-white/90 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <span>Orders</span>
        </div>
      </div>
      <div className="overflow-x-auto bg-bg-color p-5 lg:w-[70vw] w-full sm:w-[90vw] md:w-[80vw] md:p-7 mx-auto">
        <table
          {...getTableProps()}
          className="w-[100%] table-auto text-sm border-collapse border border-gray-400"
        >
          <thead className="bg-white/90 text-gray-900">
            {headerGroups.map((headerGroup, index) => (
              <tr
                key={index + 1}
                {...headerGroup.getHeaderGroupProps()}
                className="text-center "
              >
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index + 1}
                    {...column.getHeaderProps()}
                    className="px-4 py-3 border border-gray-400"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="text-gray-900">
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  key={index + 1}
                  {...row.getRowProps()}
                  className="text-white/90 text-center"
                >
                  {row.cells.map((cell, index) => (
                    <td
                      key={index + 1}
                      {...cell.getCellProps()}
                      className="px-4 py-2 border border-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-3 mt-5 text-white">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-1 bg-gold hover:bg-gold/70 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white/80 text-sm">
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{pageOptions.length}</strong>
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-1 bg-gold hover:bg-gold/70 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;
