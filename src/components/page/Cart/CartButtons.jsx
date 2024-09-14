import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./stylesCart.module.scss";

const CartButtons = ({ goToBack, goToHome, handlePurchase, cart }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.cart__buttons}>
      <section className={styles.cart__buttonsBack}>
        <button
          type="button"
          onClick={goToBack}
          className={styles.cart__button}
        >
          {t("Back")}
        </button>
        <button
          type="button"
          onClick={goToHome}
          className={styles.cart__button}
        >
          {t("Home")}
        </button>
      </section>
      <section>
        <button
          type="button"
          onClick={handlePurchase}
          className={styles.cart__button}
          disabled={cart.length === 0}
        >
          {t("Purchase")}
        </button>
      </section>
    </section>
  );
};

export default CartButtons;
