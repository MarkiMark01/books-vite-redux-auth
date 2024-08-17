import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import useMenuItems from "../../shared/hooks/useMenuItems";
import styles from "./stylesModHead.module.scss";
import useModal from "../../shared/hooks/useModal";
import { useTranslation } from "react-i18next";
import usa from "../../../Assets/usa.png";
import ua from "../../../Assets/ua.png";

const modalRoot = document.querySelector("#modal-root");

export default function ModalHeader({ onClose }) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
  }, [selectedLanguage]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  useModal(onClose);
  const menuItems = useMenuItems();

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleNavLinkClick = () => {
    onClose();
  };

  const getClassName = ({ isActive }) => {
    const className = isActive
      ? `${styles.link} ${styles.active}`
      : styles.link;
    return className;
  };

  const elements = menuItems.map(({ id, to, text }) => (
    <li key={id}>
      <NavLink className={getClassName} to={to} onClick={handleNavLinkClick}>
        {t(text)}
      </NavLink>
    </li>
  ));

  return createPortal(
    <section className={styles.modal__backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal__content}>
        <section className={styles.btnFlags}>
          <img
            src={usa}
            alt="USA flag"
            className={styles.flags}
            onClick={() => changeLanguage("en")}
            style={{ opacity: selectedLanguage === "en" ? 0.6 : 1 }}
          />
          <img
            src={ua}
            alt="UA flag"
            className={styles.flags}
            onClick={() => changeLanguage("uk")}
            style={{ opacity: selectedLanguage === "uk" ? 0.6 : 1 }}
          />
        </section>
        <nav>
          <ul className={styles.nav}>{elements}</ul>
        </nav>
      </div>
    </section>,
    modalRoot
  );
}
