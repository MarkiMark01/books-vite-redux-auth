import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./stylesHeader.module.scss";
import { useTranslation } from "react-i18next";
import usa from "../../../Assets/usa.png";
import ua from "../../../Assets/ua.png";

const Register = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
  }, [selectedLanguage]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  return (
    <>
      <header className={styles.headerRegister}>
        <section className={styles.headerRegister2}>
          <NavLink to={"/"} className={styles.logo}>
            BookStore
          </NavLink>
          <nav className={styles.navRegister}>
            <section style={{ display: "flex" }}>
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
            </section>
            <section className={styles.navReg}>
              <section style={{ marginRight: "5px" }}>
                <NavLink to="/login">{t("Log in")}</NavLink>
              </section>
            </section>
          </nav>
        </section>
      </header>
      <section className={styles.head}></section>
    </>
  );
};

export default Register;
