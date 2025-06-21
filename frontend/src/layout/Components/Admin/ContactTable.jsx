import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteSingleContact,
  getAllContacts,
} from "../../store/ContactSlice/contactSliceReducer";
import Loader from "../Loader/Loader";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { clearError } from "../../store/ContactSlice/contactSlice";

const ContactTable = ({ contacts }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.contact);

  const [currentPage, setCurrentPage] = useState(1);
  const contactPerPage = 8;

  const startIndex = (currentPage - 1) * contactPerPage;
  const endIndex = startIndex + contactPerPage;

  const paginatedContacts = contacts?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(contacts && contacts?.length / contactPerPage);

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4 w-full overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-left">
              <thead>
                <tr className="text-sm text-[#F7FAFC] border-b border-gray-700">
                  <th className=" font-medium text-left pb-3 pl-4">Sender</th>
                  <th className=" font-medium text-left pb-3">Email</th>
                  <th className=" font-medium text-right pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts &&
                  paginatedContacts.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b  last:border-0 border-gray-700 hover:bg-bg-color"
                    >
                      <td className="py-3 pl-4">
                        <span className="text-sm">{user.name}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm">{user.email}</span>
                      </td>
                      <td className="py-3 pr-4 text-right ">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/dashboard/contact/single-contact/details/${user._id}`
                              )
                            }
                          >
                            <LuEye className="text-xl text-gold hover:text-[#d99f18]" />
                          </button>
                          <button
                            onClick={() =>
                              dispatch(deleteSingleContact(user._id))
                            }
                          >
                            <MdDelete className="text-xl text-red-600 hover:text-red-800" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-400">
              Showing {paginatedContacts.length} of {contacts.length} users
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`bg-gold text-white px-3 py-1 rounded-md text-sm ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50"
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
                        : "hover:bg-gray-50"
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
                className={`bg-gold text-white px-3 py-1 rounded-md text-sm ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
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
};

export default ContactTable;
