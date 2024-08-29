import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BookDetails from "./BooksDetails";
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
            <BookDetails
              uniqueBook={uniqueBook}
              quantity={quantity}
              totalPrice={totalPrice}
              handleQuantity={handleQuantity}
              handlePurchase={handlePurchase}
            />
          </section>
          <section className={styles.bookId__fullDesc}>
            <Outlet />
          </section>
          {showFullDescriptionButton && (
            <section className={styles.bookId__btn2}>
              <button
                type="button"
                onClick={handlePurchase}
                className={styles.bookId__button2}
              >
                {t("Add to cart")}
              </button>
            </section>
          )}
        </section>
      ) : (
        <section className={styles.bookId__nopage}>
          <p className={styles.bookId__nopage_p}>
            {t("The book has not been selected yet...🕵️")}
          </p>
        </section>
      )}
    </main>
  );
};

export default BooksIdComponents;
