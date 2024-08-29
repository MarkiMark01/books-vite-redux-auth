import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./stylesBooks.module.scss";

const BooksFilter = ({
  localTextFilter,
  handleTextChange,
  priceFilter,
  handlePriceFilter,
}) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default BooksFilter;
