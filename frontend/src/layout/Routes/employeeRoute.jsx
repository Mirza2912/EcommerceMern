import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const [unauthorized, setUnauthorized] = useState(false);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (user && user.data?.role !== "employee") {
      if (!hasShownToast.current) {
        toast.error("EMployee route only accessed by employee...!");
        hasShownToast.current = true; // ✅ ensures toast is shown only once
        setUnauthorized(true);
      }
    }
  }, [user]);

  if (user && user.data?.role === "employee") {
    return <Outlet />;
  }

  if (unauthorized) {
    return <Navigate to="/" replace />;
  }
};

export default EmployeeRoute;
