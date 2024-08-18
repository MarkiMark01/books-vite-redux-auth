import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../shared/Loader";

const PrivateRoutes = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Якщо `user` не null, завантаження завершене
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    // Показати лоадер або нічого не рендерити, поки завантаження користувача
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
