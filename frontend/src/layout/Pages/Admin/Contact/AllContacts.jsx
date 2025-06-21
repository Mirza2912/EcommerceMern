import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts } from "../../../store/ContactSlice/contactSliceReducer";
import ContactTable from "../../../Components/Admin/ContactTable";

const AllContacts = () => {
  const { contacts } = useSelector((state) => state.contact);
  console.log(contacts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllContacts());
  }, []);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Contact Management</h1>
      </div>{" "}
      <div className="bg-black/60 backdrop-blur-lg p-6 rounded-lg border border-gray-700 shadow-md">
        {/* <UsersTable users={filteredUsers} /> */}
        <ContactTable contacts={contacts} />
      </div>
    </div>
  );
};

export default AllContacts;
