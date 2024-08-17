import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styles from "./stylesAbout.module.scss";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.about}>
      <h2>{t("Online Bookstore")}</h2>
      <section className={styles.aboutText}>
        <article>
          {t(
            "At Book Store, we invite you to embark on a journey through the enchanting realms of literature, where every page unfolds a new adventure. Our online bookstore is a haven for book enthusiasts, offering an extensive and diverse collection that caters to every taste and preference."
          )}
        </article>
        <article>
          📚{" "}
          {t(
            "Explore a World of Books: From timeless classics that have shaped generations to the latest page-turners captivating readers worldwide, our curated selection spans various genres, ensuring there's something for everyone. Immerse yourself in fiction, get inspired by non-fiction, or let the little ones discover magical worlds in our children's section."
          )}
        </article>
        <article>
          🏡{" "}
          {t(
            "Visit Our Imaginary Storefront: While our physical address is purely fictional, the warmth and joy of exploring our virtual bookstore are very real. Wander through the digital aisles, browse book covers, and read engaging summaries - all from the comfort of your home."
          )}
        </article>
        <article>
          📞{" "}
          {t(
            "Customer Support: Have a question or need assistance? Our friendly and fictional customer support team is just a phone call away."
          )}
        </article>
        <article>
          {t(
            "Dial 555-123-4567 for personalized assistance or drop us an email at info@bookhaven.com."
          )}
        </article>
        <article>
          🌐{" "}
          {t(
            "Online Ordering Made Easy: Experience the convenience of online shopping with our user-friendly platform. Browse, add to your cart, and securely check out - all in a few clicks. We ship to imaginary locations worldwide!"
          )}
        </article>
        <article>
          {t(
            "Whether you're an avid reader, a casual browser, or a gift-giver in search of the perfect literary present, Book Haven is your destination for literary bliss. Discover the joy of reading with us – where every book is an adventure waiting to be unfolded. Happy reading! 📖✨"
          )}
        </article>
      </section>
      <section className={styles.goHome}>
        <NavLink to="/">{t("Go to books")}</NavLink>
      </section>
    </div>
  );
};

export default About;
