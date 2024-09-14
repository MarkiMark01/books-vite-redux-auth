import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./stylesBooks.module.scss";

const BooksList = ({ books, handleView }) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.books__container}>
      {books.map((book) => (
        <li key={book.id} className={styles.books__box}>
          <img
            src={book.image}
            alt={t("Book cover")}
            className={styles.books__img}
          />
          <p className={styles.books__title}>{book.title}</p>
          <p className={styles.books__author}>{book.author}</p>
          <section className={styles.book__purchase}>
            <p className={styles.books__price}>${book.price}</p>
            <button
              type="button"
              onClick={() => handleView(book)}
              className={styles.books__button}
            >
              {t("View")}
            </button>
          </section>
        </li>
      ))}
    </ul>
  );
};

export default BooksList;
