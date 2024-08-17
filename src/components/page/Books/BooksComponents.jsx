import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "../../shared/loader";
import styles from "./stylesBooks.module.scss";
import useDebounce from "../../shared/hooks/useDebounce";

const BooksComponents = ({
  isLoading,
  error,
  filteredBooks,
  handleView,
  textFilter,
  priceFilter,
  handlePriceFilter,
  handleTextFilter,
  user, // Додаємо проп user для перевірки стану користувача
}) => {
  const { t } = useTranslation();
  const [localTextFilter, setLocalTextFilter] = useState(textFilter);

  const debouncedTextFilter = useDebounce(localTextFilter, 400);

  useEffect(() => {
    handleTextFilter({ target: { value: debouncedTextFilter } });
  }, [debouncedTextFilter, handleTextFilter]);

  const handleTextChange = (e) => {
    setLocalTextFilter(e.target.value);
  };

  return (
    <main>
      <section className={styles.books}>
        <section className={styles.books__filter}>
          <input
            type="text"
            placeholder={t("Search by book title")}
            value={localTextFilter}
            onChange={handleTextChange}
            className={styles.books__filterText}
          />
          <select
            value={priceFilter}
            onChange={handlePriceFilter}
            className={styles.books__filterPrice}
          >
            <option value="All books">{t("All books")}</option>
            <option value="from $0 to $15">{t("from $0 to $15")}</option>
            <option value="from $15 to $30">{t("from $15 to $30")}</option>
            <option value="more than $30">{t("more than $30")}</option>
          </select>
        </section>
        <section className={styles.books__mainContainer}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p style={{ fontSize: "20px" }}>
              {t("Error")}: {error}
            </p>
          ) : (
            <div>
              {filteredBooks.length > 0 ? (
                <ul className={styles.books__container}>
                  {filteredBooks.map((book) => (
                    <li key={book.id} className={styles.books__box}>
                      <img
                        src={book.image}
                        alt={t("Book cover")}
                        className={styles.books__img}
                      />
                      <p className={styles.books__title}>{book.title}</p>
                      <p className={styles.books__author}>{book.author}</p>
                      <div className={styles.book__purchase}>
                        <p className={styles.books__price}>${book.price}</p>
                        <button
                          type="button"
                          onClick={() => handleView(book)}
                          className={styles.books__button}
                        >
                          {t("View")}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: "20px" }}>{t("Books not found...")}</p>
              )}
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default BooksComponents;
