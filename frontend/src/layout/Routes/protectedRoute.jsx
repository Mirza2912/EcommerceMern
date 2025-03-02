import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component }) => {
  //fetching data from user state
  const { isLoading, error, isVerify, user } = useSelector(
    (state) => state.auth
  );
  // console.log(isVerify);

  if (!isVerify) {
    return <Navigate to="/account" />;
  }

  return <Component />;
};
