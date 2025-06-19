import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import EmployeeSideBar from "../../Components/Employee/EmployeeSideBar";

const EmployeeDashBoardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllUsers());
    // dispatch(getALLProductsAdmin());
    // dispatch(getAllOrdersAdmin());
    // dispatch(getAllSales());
  }, []);
  return (
    <>
      <div className="flex w-[100%] min-h-screen sm:mt-24 lg:mt-20 relative">
        <EmployeeSideBar />
        <main className="flex-1 overflow-auto bg-[rgba(0, 0, 0, 0.6)] text-[#F7FAFC]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default EmployeeDashBoardLayout;
