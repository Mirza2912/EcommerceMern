// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isVerified } = useSelector((state) => state.auth);
  if (isVerified) {
    return <Outlet />;
  } else {
    // toast.error("You need to sign in to access the resources");
    return <Navigate to="/account" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
