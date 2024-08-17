import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./stylesNoPage.module.scss";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.nopage}>
      <p>{t("Oops, something went wrong... Error 404")} 🕵️</p>
      <section className={styles.nopageLink}>
        <NavLink to="/">{t("Go to books")}</NavLink>
      </section>
    </div>
  );
};

export default NotFoundPage;
