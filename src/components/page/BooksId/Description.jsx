import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueBooks } from "../../redux/books/booksOperations";
import styles from "./stylesBookId.module.scss";
import { useTranslation } from "react-i18next";

const Description = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const book = useSelector((state) => state.books.uniqueBook);

  useEffect(() => {
    dispatch(getUniqueBooks(id));
  }, [dispatch, id]);

  return (
    <main>
      {book && (
        <>
          <section>
            <p style={{ fontFamily: "Salsa" }}>{t(book.description)}</p>
          </section>
          <section>
            <button
              type="button"
              onClick={() => navigate(`/books/${id}/`)}
              className={styles.bookId__fullDescButton}
            >
              {t("Close")}
            </button>
          </section>
        </>
      )}
    </main>
  );
};

export default Description;
