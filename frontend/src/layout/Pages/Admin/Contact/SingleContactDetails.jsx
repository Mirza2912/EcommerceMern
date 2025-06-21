import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleContactDetails } from "../../../store/ContactSlice/contactSliceReducer";
import Loader from "../../../Components/Loader/Loader";

const SingleContactDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, singleContact } = useSelector((state) => state.contact);
  console.log(singleContact);

  useEffect(() => {
    dispatch(getSingleContactDetails(id));
  }, []);
  return (
    <div className="h-[90vh] flex items-center justify-center ">
      {loading ? (
        <Loader />
      ) : (
        <div className="xl:w-1/2 bg-black/60 backdrop-blur-lg text-[#F7FAFC] w-full sm:w-[75%] sm:mx-auto mx-6 my-7 rounded-2xl shadow-lg border border-gray-700 p-6 sm:p-10 ">
          <div className="my-7">
            <h2 className="lg:text-6xl text-5xl font-bold  text-center mb-3">
              Contact Details
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className=" text-base sm:text-lg space-y-2">
              <p>
                <strong>ID:</strong> {singleContact?._id}
              </p>
              <p>
                <strong>Name:</strong> {singleContact?.name}
              </p>
              <p>
                <strong>Email:</strong> {singleContact?.email}
              </p>
              <p>
                <strong>Subject:</strong> {singleContact?.subject}
              </p>
              <p>
                <strong>Message:</strong> {singleContact?.message}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/admin/dashboard/contact"
              className="bg-gold hover:bg-[#d99f18] text-white px-4 py-2 rounded-md text-sm"
            >
              Back to Contacts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleContactDetails;
