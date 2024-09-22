import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./stylesCart.module.scss";

const CartButtons = ({ goBack }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.cart__buttons}>
      <section className={styles.cart__buttonsBack}>
        <button
          type="button"
          onClick={goBack}
          className={styles.cart__button}
        >
          {t("Back")}
        </button>
      </section>
    </section>
  );
};

export default CartButtons;
