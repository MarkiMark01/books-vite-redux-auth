import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./stylesCart.module.scss";
import ModalWindow from "../Modal/ModalCart";
import CartButtons from "./CartButtons";
import CartItems from "./CartItems";

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
        <CartButtons
          goToBack={goToBack}
          goToHome={goToHome}
          handlePurchase={handlePurchase}
          cart={cart}
        />
        <CartItems
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          totalSum={totalSum}
        />
      </section>
      {isModalOpen && <ModalWindow onClose={closeModal}></ModalWindow>}
    </main>
  );
};

export default CartComponents;
