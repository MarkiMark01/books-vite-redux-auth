import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./stylesCart.module.scss";
import cartImg from "../../../assets/cart.svg";
import bin from "../../../assets/bin.png";
import ModalWindow from "../Modal/ModalCart";

const CartComponents = ({
  goToBack,
  goToHome,
  handleClearCart,
  cart,
  handleRemoveFromCart,
}) => {
  const { t } = useTranslation();

  const totalSum = cart
    .reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
    .toFixed(2);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePurchase = () => {
    openModal();
    handleClearCart();
  };

  return (
    <main className={styles.cart}>
      <section className={styles.cart__container}>
        <section className={styles.cart__buttons}>
          <section className={styles.cart__buttonsBack}>
            <button
              type="button"
              onClick={() => goToBack()}
              className={styles.cart__button}
            >
              {t("Back")}
            </button>
            <button
              type="button"
              onClick={() => goToHome()}
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
                  {t("Total Price")}: ${item.totalPrice}
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
              <span style={{ fontFamily: "Montserrat Alternates" }}>
                {t("Total Sum")}: ${totalSum}
              </span>
            </div>
          )}
        </ul>
      </section>
      {isModalOpen && <ModalWindow onClose={closeModal}></ModalWindow>}
    </main>
  );
};

export default CartComponents;
