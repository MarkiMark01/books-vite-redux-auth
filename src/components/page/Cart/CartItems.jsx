import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./stylesCart.module.scss";
import bin from "../../../assets/bin.png";
import cartImg from "../../../assets/cart.svg";

const CartItems = ({ cart, handleRemoveFromCart, totalSum, handlePurchase }) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.cart__box}>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <li key={index} className={styles.cart__block}>
            <section>
              <img
                src={bin}
                alt={t("Remove bin")}
                onClick={() => handleRemoveFromCart(item)}
                className={styles.img}
              />
            </section>
            <section className={styles.wrapper}>
              <section className={styles.item1}>{t("Title")}</section>
              <section className={styles.item2}>{t("Price")}</section>
              <section className={styles.item3}>{t("Quantity")}</section>
              <section className={styles.item4}>{t("Total")}</section>
              <section className={styles.item5}>{item.title}</section>
              <section className={styles.item6}>{item.price}</section>
              <section className={styles.item7}>{item.quantity}</section>
              <section className={styles.item8}>{item.totalPrice}</section>
            </section>

            <section className={styles.item9}>
            </section>
          </li>
        ))
      ) : (
        <section className={styles.cart__emptyBlock}>
          <img src={cartImg} alt={t("Cart is empty")} />
          <p className={styles.cart__empty}>{t("Your cart is empty...")}</p>
        </section>
      )}
      {cart.length > 0 && (
        <div className={styles.cart__totalSum}>
          <span style={{ fontFamily: "Montserrat Alternates", marginRight: 25 }}>
            {t("Total Sum")}: ${totalSum}
          </span>
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
          
        </div>
      )}
    </ul>
  );
};

export default CartItems;
