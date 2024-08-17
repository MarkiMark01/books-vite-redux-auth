import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useMenuItems from "../../shared/hooks/useMenuItems";
import Register from "./Register";
import Logout from "./Logout";
import styles from "./stylesHeader.module.scss";
import ModalHeader from "./ModalHeader";

const getClassName = ({ isActive }) => {
  const className = isActive ? `${styles.link} ${styles.active}` : styles.link;
  return className;
};

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [burgerActive, setBurgerActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuItems = useMenuItems();

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
    setBurgerActive(false);
  };

  const toggleBurger = () => {
    setBurgerActive(!burgerActive);
    if (!burgerActive) {
      modalOpen();
    } else {
      modalClose();
    }
  };

  const elements = menuItems.map(({ id, to, text }) => (
    <li key={id}>
      <NavLink className={getClassName} to={to}>
        {text}
      </NavLink>
    </li>
  ));

  return (
    <>
      {user ? (
        <header className={styles.header}>
          <section className={styles.header2}>
            <nav
              className={`${styles.header__burger} ${
                burgerActive ? styles.active : ""
              }`}
              onClick={toggleBurger}
            >
              <span className={styles.header__burgerSpan}></span>
            </nav>
            <nav>
              <ul className={styles.nav}>{elements}</ul>
            </nav>
            <NavLink to={"/"} className={styles.logo}>
              BookStore
            </NavLink>
            <Logout />
          </section>
        </header>
      ) : (
        <Register />
      )}
      {isModalOpen && <ModalHeader onClose={modalClose}></ModalHeader>}
    </>
  );
};

export default Header;
