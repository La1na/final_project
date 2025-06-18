import styles from "./ErrorPage.module.css";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import phone1 from "../../assets/phone1.png";
import phone2 from "../../assets/phone2.png";

function Error() {
  return (
    <div className={styles.errorPage}>
      <Header />
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img src={phone2} alt="Phone 2" className={styles.imageOverlay} />
        </div>
        <div className={styles.text}>
          <h1>Oops! Page Not Found (404 Error)</h1>
          <p>
            We're sorry, but the page you’re looking for doesn’t seem to exist.
            <br />
            If you typed the URL manually, please double-check the spelling.
            <br />
            If you clicked on a link, it may be outdated or broken.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Error;
