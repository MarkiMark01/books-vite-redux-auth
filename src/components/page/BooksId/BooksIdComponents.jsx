import React, { useState, useEffect } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./stylesBookId.module.scss";

const BooksIdComponents = ({
  uniqueBook,
  handleQuantity,
  quantity,
  totalPrice,
  handlePurchase,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const location = useLocation();

  const [showFullDescriptionButton, setShowFullDescriptionButton] =
    useState(false);

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (location.pathname.includes(`/books/${id}/description`)) {
      setShowFullDescriptionButton(true);
    } else {
      setShowFullDescriptionButton(false);
    }
  }, [location.pathname, id]);

  return (
    <main>
      {uniqueBook ? (
        <section className={styles.bookId}>
          <section className={styles.bookId__btnBack}>
            <button
              type="button"
              onClick={goBack}
              className={styles.bookId__buttonBack}
            >
              {t("Back")}
            </button>
          </section>
          <section className={styles.bookId__box}>
            <div>
              <img
                src={uniqueBook.image}
                alt={t("Book cover")}
                className={styles.books__idImg}
              />
            </div>
            <div className={styles.bookId__info}>
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
            </div>
            <div className={styles.bookId_purchase}>
              <div className={styles.booksId__price}>
                <span>{t("Price")}:</span>
                <span className={styles.booksId__price2}>
                  ${uniqueBook.price}
                </span>
              </div>
              <label className={styles.booksId__quantity}>
                <span>{t("Quantity")}:</span>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantity}
                />
              </label>
              <div className={styles.booksId__total}>
                <span>{t("Total")}:</span>
                <span className={styles.booksId__total2}>${totalPrice}</span>
              </div>
              <div className={styles.bookId__btn}>
                <button
                  type="button"
                  onClick={handlePurchase}
                  className={styles.bookId__button}
                >
                  {t("Add to cart")}
                </button>
              </div>
            </div>
          </section>
          <section className={styles.bookId__fullDesc}>
            <Outlet />
          </section>
          {showFullDescriptionButton && (
            <div className={styles.bookId__btn2}>
              <button
                type="button"
                onClick={handlePurchase}
                className={styles.bookId__button2}
              >
                {t("Add to cart")}
              </button>
            </div>
          )}
        </section>
      ) : (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <p
            style={{
              fontSize: "22px",
              fontWeight: 600,
              fontFamily: "Montserrat Alternates",
            }}
          >
            {t("The book has not been selected yet...🕵️")}
          </p>
        </section>
      )}
    </main>
  );
};

export default BooksIdComponents;
