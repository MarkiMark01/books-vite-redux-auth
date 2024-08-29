import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "../../shared/Loader";
import styles from "./stylesBooks.module.scss";
import useDebounce from "../../shared/hooks/useDebounce";
import BooksList from "./BooksList";
import BooksFilter from "./BooksFilter";

const BooksComponents = ({
  isLoading,
  error,
  filteredBooks,
  handleView,
  textFilter,
  priceFilter,
  handlePriceFilter,
  handleTextFilter,
  user,
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
        <BooksFilter
          localTextFilter={localTextFilter}
          handleTextChange={handleTextChange}
          priceFilter={priceFilter}
          handlePriceFilter={handlePriceFilter}
        />
        <section className={styles.books__mainContainer}>
          {filteredBooks.length > 0 ? (
            <BooksList books={filteredBooks} handleView={handleView} />
          ) : isLoading ? (
            <Loader />
          ) : error ? (
            <p style={{ fontSize: "20px" }}>
              {t("Error")}: {error}
            </p>
          ) : (
            <p style={{ fontSize: "20px" }}>{t("Books not found...")}</p>
          )}
        </section>
      </section>
    </main>
  );
};

export default BooksComponents;
