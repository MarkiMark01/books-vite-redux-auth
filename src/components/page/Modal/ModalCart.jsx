import React from "react";
import { createPortal } from "react-dom";
import styles from "./stylesModalCart.module.scss";
import gift from "../../../Assets/thanks.jpg";
import useModal from "../../shared/hooks/useModal";

const modalRoot = document.querySelector("#modal-root");

export default function ModalWindow({ onClose }) {
  useModal(onClose);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.modal__backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal__content}>
        <div className={styles.modal__giftBox}>
          <img src={gift} alt="Gift 'Thank you'" className={styles.gift} />
          <button className={styles.modal__ok} onClick={handleBackdropClick}>
            Ok
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
