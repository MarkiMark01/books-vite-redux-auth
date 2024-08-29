import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./stylesBookId.module.scss";

const BookDetails = ({
  uniqueBook,
  quantity,
  totalPrice,
  handleQuantity,
  handlePurchase,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <>
      <section>
        <img
          src={uniqueBook.image}
          alt={t("Book cover")}
          className={styles.books__idImg}
        />
      </section>
      <section className={styles.bookId__info}>
        <p className={styles.bookId__title}>{uniqueBook.title}</p>
        <p className={styles.bookId__author}>
          {t("Book author")}: {uniqueBook.author}
        </p>
        <p className={styles.bookId__level}>
          {t("Book level")}: {uniqueBook.level}
        </p>
        <p className={styles.bookId__sd}>{t("Short description")}:</p>
        <p className={styles.bookId__sDescription}>
          {t(uniqueBook.shortDescription)}
        </p>
        <Link
          to={`/books/${id}/description`}
          className={styles.bookId__description}
        >
          {t("Full description")}
        </Link>
      </section>
      <section className={styles.bookId_purchase}>
        <section className={styles.booksId__price}>
          <span>{t("Price")}:</span>
          <span className={styles.booksId__price2}>${uniqueBook.price}</span>
        </section>
        <label className={styles.booksId__quantity}>
          <span>{t("Quantity")}:</span>
          <input type="number" value={quantity} onChange={handleQuantity} />
        </label>
        <section className={styles.booksId__total}>
          <span>{t("Total")}:</span>
          <span className={styles.booksId__total2}>${totalPrice}</span>
        </section>
        <section className={styles.bookId__btn}>
          <button
            type="button"
            onClick={handlePurchase}
            className={styles.bookId__button}
          >
            {t("Add to cart")}
          </button>
        </section>
      </section>
    </>
  );
};

export default BookDetails;
