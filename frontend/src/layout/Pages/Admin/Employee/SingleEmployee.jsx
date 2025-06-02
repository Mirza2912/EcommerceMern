import React, { useEffect, useState } from "react";
import {
  getSingleUserDetails,
  updateUserRole,
} from "../../../store/UserSlice/userSliceReducers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { FaRegEdit } from "react-icons/fa";

const SingleEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleUserDetails, isLoading } = useSelector((state) => state.auth);
  // console.log(singleUserDetails?.data?.isSuspended);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
    dispatch(updateUserRole({ role, id }));
  };

  useEffect(() => {
    dispatch(getSingleUserDetails(id));
  }, []);

  useEffect(() => {
    if (singleUserDetails?.data?.role) {
      setSelectedRole(singleUserDetails.data.role);
    }
  }, [singleUserDetails]);
  return (
    <div className="h-[90vh] flex items-center justify-center ">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="xl:w-1/2 bg-black/60 backdrop-blur-lg text-[#F7FAFC] w-full sm:w-[75%] sm:mx-auto mx-6 my-7 rounded-2xl shadow-lg border border-gray-700 p-6 sm:p-10 ">
          <div className="my-7">
            <h2 className="lg:text-6xl text-5xl font-bold  text-center mb-3">
              {singleUserDetails?.data?.name}'s Details
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className=" text-base sm:text-lg space-y-2">
              <p>
                <strong>ID:</strong> {singleUserDetails?.data?.employeeId}
              </p>
              <p>
                <strong>Name:</strong> {singleUserDetails?.data?.name}
              </p>
              <p>
                <strong>Email:</strong> {singleUserDetails?.data?.email}
              </p>

              <div className="relative">
                <div
                  className="flex items-center justify-start gap-3"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <p>
                    <strong>Role:</strong> {selectedRole}
                  </p>
                  <FaRegEdit className="text-xl hover:cursor-pointer text-gold hover:text-[#d99f18]" />
                </div>

                {isOpen && (
                  <div className="absolute left-7 z-10 mt-2 bg-white border rounded shadow-lg w-32 text-sm text-gray-900">
                    <button
                      onClick={() => handleSelect("admin")}
                      className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      Admin
                    </button>
                  </div>
                )}
              </div>
              {singleUserDetails?.data?.phone && (
                <p>
                  <strong>Phone:</strong> {singleUserDetails?.data?.phone}
                </p>
              )}
              <p>
                <strong>Joined At:</strong>{" "}
                {new Date(
                  singleUserDetails?.data?.createdAt
                ).toLocaleDateString()}
              </p>
              {singleUserDetails?.data?.updatedAt && (
                <p>
                  <strong>Last Update At:</strong>{" "}
                  {new Date(
                    singleUserDetails?.data?.updatedAt
                  ).toLocaleDateString()}
                </p>
              )}

              <p>
                <strong>Suspended:</strong>{" "}
                {/* {singleUserDetails?.data?.isSuspended
                  ? singleUserDetails?.data?.isSuspended
                  : "false"} */}
                {singleUserDetails?.data?.isSuspended &&
                singleUserDetails?.data?.isSuspended === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/admin/dashboard/employee"
              className="bg-gold hover:bg-[#d99f18] text-white px-4 py-2 rounded-md text-sm"
            >
              Back to Employees
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleEmployee;
