import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.top_part}>
        <NavLink className={styles.item} to="/homepage">
          <p className={styles.itemText}>Home</p>
        </NavLink>
        <NavLink className={styles.item} to="/">
          <p className={styles.itemText}>Search</p>
        </NavLink>
         <NavLink className={styles.item} to="/explore">
          <p className={styles.itemText}>Explore</p>
        </NavLink>
        <NavLink className={styles.item} to="/">
          <p className={styles.itemText}>Messages</p>
        </NavLink>
         <NavLink className={styles.item} to="/">
          <p className={styles.itemText}>Notifications</p>
        </NavLink>
        <NavLink className={styles.item} to="/">
          <p className={styles.itemText}>Create</p>
        </NavLink>
      </div>
      <div className={styles.bottom_part}>
        <p>© 2024 ICHgram</p>
      </div>
    </div>
  );
}

export default Footer;
