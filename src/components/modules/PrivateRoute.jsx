import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../shared/Loader";

const PrivateRoutes = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);
  
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
