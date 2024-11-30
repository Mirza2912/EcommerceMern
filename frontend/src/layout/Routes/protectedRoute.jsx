import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component }) => {
  // //fetching data from user state
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  //   console.log(loading, error, isAuthenticated, user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};
