import styles from "./EditProfilePage.module.css";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import avatar from "/src/assets/ICHavatar.png";
function Edit() {
  return (
    <div className={styles.container}>
      <Header />
      <h1>Edit profile</h1>
      <div className={styles.profileAvatar_block}>
        <img className={styles.avatar} src={avatar} alt="avatar" />
        <div className={styles.profileAvatar_text}>
          <h2 className={styles.username}>itcareerhub</h2>
          <p>• Гарантия помощи с трудоустройством в ведущие IT-компании</p>
        </div>
        <button className={styles.newPhoto_button}>New photo</button>
      </div>

      <div className={styles.edit_container}>
            <div className={styles.item}>
                <h3>Username</h3>
                <input type="text" />
            </div>
            <div className={styles.item}>
                
            </div>
            <div className={styles.item}>

            </div>
      </div>
      <Footer />
    </div>
  );
}

export default Edit;
