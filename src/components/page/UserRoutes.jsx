import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { Loader } from "../shared/Loader";

const Books = lazy(() => import("./Books/Books"));
const Login = lazy(() => import("./Login/Login"));
const PrivateRoutes = lazy(() => import("../modules/PrivateRoute"));
const BooksId = lazy(() => import("../page/BooksId/BooksId"));
const Description = lazy(() => import("../page/BooksId/Description"));
const Cart = lazy(() => import("../page/Cart/Cart"));
const NotFoundPage = lazy(() => import("./NotFoundPage/NotFoundPage"));
const About = lazy(() => import("./About/About"));

const UserRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/books/:id" element={<BooksId />}>
            <Route path="description" element={<Description />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
