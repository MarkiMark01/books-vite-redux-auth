import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getBooks } from "../../redux/books/booksOperations";
import { setUniqueBook } from "../../redux/books/booksSlice";
import BooksComponents from "./BooksComponents";

const Books = () => {
  const books = useSelector((state) => state.books.books);
  const isLoading = useSelector((state) => state.books.isLoading);
  const error = useSelector((state) => state.books.error);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [textFilter, setTextFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("All books");

  const navigate = useNavigate();

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const numericPrice = parseFloat(book.price);
      return (
        book.title?.toLowerCase().includes(textFilter.toLowerCase()) &&
        (priceFilter === "All books" ||
          (priceFilter === "from $0 to $15" &&
            numericPrice >= 0 &&
            numericPrice <= 15) ||
          (priceFilter === "from $15 to $30" &&
            numericPrice > 15 &&
            numericPrice <= 30) ||
          (priceFilter === "more than $30" && numericPrice > 30))
      );
    });
  }, [books, textFilter, priceFilter]);

  const handleTextFilter = (e) => {
    setTextFilter(e.target.value);
  };

  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleView = (book) => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(setUniqueBook(book));
    navigate(`/books/${book.id}`);
    setTextFilter("");
  };

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <BooksComponents
      isLoading={isLoading}
      error={error}
      filteredBooks={filteredBooks}
      handleView={handleView}
      isLogin={!!user}
      textFilter={textFilter}
      priceFilter={priceFilter}
      handlePriceFilter={handlePriceFilter}
      handleTextFilter={handleTextFilter}
    />
  );
};

export default Books;
