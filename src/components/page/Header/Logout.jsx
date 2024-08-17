import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../../redux/auth/authSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "../Header/stylesHeader.module.scss";

import icon from "../../../assets/pngegg.png";
import usa from "../../../assets/usa.png";
import ua from "../../../assets/ua.png";

const LANGUAGE_KEY = "language";

const Logout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleSignOut = async () => {
    await dispatch(signOutUser());
    navigate("/");
  };

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, selectedLanguage);
  }, [selectedLanguage]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  return (
    <section className={styles.logout}>
      <section className={styles.btnFlags}>
        <img
          src={usa}
          alt="USA flag"
          aria-label="Change language to English"
          className={styles.flags}
          onClick={() => changeLanguage("en")}
          style={{ opacity: selectedLanguage === "en" ? 0.6 : 1 }}
        />
        <img
          src={ua}
          alt="Ukraine flag"
          aria-label="Change language to Ukrainian"
          className={styles.flags}
          onClick={() => changeLanguage("uk")}
          style={{ opacity: selectedLanguage === "uk" ? 0.6 : 1 }}
        />
      </section>
      {user && (
        <>
          <img src={icon} alt="Avatar" className={styles.logout__icon} />
          <span className={styles.logout__name}>
            {user.user_metadata?.full_name || user.email}
          </span>
          <button onClick={handleSignOut} className={styles.logout__btn}>
            {t("Log out")}
          </button>
        </>
      )}
    </section>
  );
};

export default Logout;
