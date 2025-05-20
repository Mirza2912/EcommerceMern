import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getAllUsers } from "../../store/UserSlice/userSliceReducers";
import { getALLProductsAdmin } from "../../store/ProductSlice/productSliceReducers";
import { getAllOrdersAdmin } from "../../store/OrderSlice/orderSliceReducers";
import AdminSidebar from "../../Components/Admin/AdminSidebar";

const DashBoardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getALLProductsAdmin());
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);
  return (
    <>
      <div className="flex w-[100%] min-h-screen relative sm:mt-24 lg:mt-20">
        <AdminSidebar />
        <main className="flex-1 overflow-auto bg-[rgba(0, 0, 0, 0.6)] text-[#F7FAFC]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashBoardLayout;
