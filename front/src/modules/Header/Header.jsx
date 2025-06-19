import { useState } from "react";
import { NavLink } from "react-router-dom";
import Notifications from "../Notifications/Notifications";
import Create from "../../pages/CreatePage/CreatePage";
import Search from "../Search/Search";
import styles from "./Header.module.css";
import IchgramLogo from "/src/assets/ichgram.png";
import home from "/src/assets/navbarLogos/home.png";
import search from "/src/assets/navbarLogos/search.png";
import explore from "/src/assets/navbarLogos/explore.png";
import messages from "/src/assets/navbarLogos/messages.png";
import notifications from "/src/assets/navbarLogos/notifications.png";
import create from "/src/assets/navbarLogos/create.png";
import profile from "/src/assets/navbarLogos/profile.png";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreate, setShowCreate] = useState(false)

  const handleSearchClick = () => {
    setShowSearch(true);
    setShowNotifications(false);
    setShowCreate(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(true);
    setShowSearch(false);
    setShowCreate(false);
  };

  const handleCreateClick = () => {
    setShowCreate(true);
    setShowSearch(false);
    setShowNotifications(false);
  };
  return (
    <>
      <div className={styles.container}>
        <img src={IchgramLogo} alt="" className={styles.logo} />
        <div className={styles.navbar}>
          <NavLink className={styles.item} to="/homepage">
            <img className={styles.itemImg} src={home} alt="no image" />
            <p className={styles.itemText}>Home</p>
          </NavLink>
          <div className={styles.item} onClick={handleSearchClick}>
            <img className={styles.itemImg} src={search} alt="no image" />
            <p className={styles.itemText}>Search</p>
          </div>
          <NavLink className={styles.item} to="/explore">
            <img className={styles.itemImg} src={explore} alt="no image" />
            <p className={styles.itemText}>Explore</p>
          </NavLink>
          <NavLink className={styles.item} to="/">
            <img className={styles.itemImg} src={messages} alt="no image" />
            <p className={styles.itemText}>Messages</p>
          </NavLink>
          <div className={styles.item} onClick={handleNotificationsClick}>
            <img className={styles.itemImg} src={notifications} alt="no image" />
            <p className={styles.itemText}>Notifications</p>
          </div>
          <NavLink className={styles.item} onClick={handleCreateClick}>
            <img className={styles.itemImg} src={create} alt="no image" />
            <p className={styles.itemText}>Create</p>
          </NavLink>
          <NavLink className={`${styles.item} ${styles.profile}`} to="/myprofile">
            <img className={styles.itemImg} src={profile} alt="no image" />
            <p className={styles.itemText}>Profile</p>
          </NavLink>
        </div>
      </div>

      {showSearch && <Search onClose={() => setShowSearch(false)} />}
      {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
      {showCreate && <Create onClose={() => setShowCreate(false)}/>}
    </>
  );
}

export default Header;
