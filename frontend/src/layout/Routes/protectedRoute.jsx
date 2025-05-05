// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isVerified } = useSelector((state) => state.auth);

  return isVerified ? <Outlet /> : <Navigate to="/account" replace />;
};

export default ProtectedRoute;
