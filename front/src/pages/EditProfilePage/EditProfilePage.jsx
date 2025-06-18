import React, { useEffect, useState } from "react";
import styles from "./EditProfilePage.module.css";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import avatar from "/src/assets/ICHavatar.png";

function Edit() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        if (data.length > 0) {
          setUsername(data[2].username || "");
          setWebsite(data[2].website || "");
          setAbout(data[2].about || "");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load user data");
      }
    };
    fetchUsers();
  }, []);

  const handleSave = async () => {
    if (users.length === 0) return;
    try {
      const response = await fetch(`http://localhost:3000/api/users/${users[2].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, website, about }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.inner_container}>
        <h1 className={styles.profileEdit_text}>Edit profile</h1>
        <div className={styles.profileAvatar_block}>
          <img className={styles.avatar} src={avatar} alt="avatar" />
          <div className={styles.profileAvatar_text}>
            <h2 className={styles.username}>{username}</h2>
            <p className={styles.aboutInBlock}>{about}</p>
          </div>
          <button className={styles.newPhoto_button}>New photo</button>
        </div>

        <div className={styles.edit_container}>
          <div className={styles.item}>
            <h3>Username</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <h3>Website</h3>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <h3>About</h3>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>

        <button className={styles.save_button} onClick={handleSave}>
          Save
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default Edit;
