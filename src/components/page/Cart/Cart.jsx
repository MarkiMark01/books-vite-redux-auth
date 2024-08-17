import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteCart,
  fetchCart,
  clearAllCart,
} from "../../redux/books/booksOperations";
import { useNavigate } from "react-router-dom";
import CartComponents from "./CartComponents";

const Cart = () => {
  const cart = useSelector((state) => state.books.cart) || [];
  const totalPrice = useSelector((state) =>
    state.books.cart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (item) => {
    dispatch(deleteCart(item.id));
  };

  const handleClearCart = () => {
    dispatch(clearAllCart());
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const goToHome = () => {
    navigate("/");
  };
  const goToBack = () => {
    navigate(-1);
  };

  return (
    <CartComponents
      goToBack={goToBack}
      goToHome={goToHome}
      handleClearCart={handleClearCart}
      cart={cart}
      totalPrice={totalPrice}
      handleRemoveFromCart={handleRemoveFromCart}
    />
  );
};

export default Cart;
