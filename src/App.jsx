import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserRoutes from "./components/page/UserRoutes";
import Footer from "./components/page/Footer/Footer";
import Header from "./components/page/Header/Header";
import ScrollToTop from "./components/ScrollToTop";
import "./components/i18next/i18n";
import { fetchUser } from "./components/redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="App">
      <ScrollToTop>
        <Header />
        <UserRoutes />
        <Footer />
      </ScrollToTop>
    </div>
  );
}

export default App;
