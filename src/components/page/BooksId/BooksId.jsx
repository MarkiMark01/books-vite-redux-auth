import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNewCart, getUniqueBooks } from "../../redux/books/booksOperations";
import BooksIdComponents from "./BooksIdComponents";

const BooksId = () => {
  const uniqueBook = useSelector((state) => state.books.uniqueBook);
  const cart = useSelector((state) => state.books.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getUniqueBooks(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (uniqueBook) {
      calculateTotalPrice(quantity, uniqueBook.price);
    }
  }, [uniqueBook, quantity]);

  const handleQuantity = (e) => {
    const count = e.target.value;
    let newQuantity;
    if (count === "") {
      newQuantity = "";
    } else {
      newQuantity = isNaN(count) ? 1 : Math.max(1, Math.floor(Number(count)));
    }

    setQuantity(newQuantity);
    calculateTotalPrice(newQuantity, uniqueBook.price);
  };

  const calculateTotalPrice = (quantity, price) => {
    const total = quantity * price;
    setTotalPrice(total.toFixed(2));
  };

  const handlePurchase = () => {
    dispatch(
      addNewCart({
        id: uniqueBook.id,
        title: uniqueBook.title,
        price: uniqueBook.price,
        quantity: quantity,
        totalPrice: totalPrice,
      })
    );
    setQuantity(1);
    navigate("/cart");
  };

  return (
    <BooksIdComponents
      uniqueBook={uniqueBook}
      handleQuantity={handleQuantity}
      quantity={quantity}
      totalPrice={totalPrice}
      handlePurchase={handlePurchase}
    />
  );
};

export default BooksId;
