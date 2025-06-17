import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
// const token = localStorage.getItem("token");

// axios
//   .post(
//     "http://localhost:3000/api/users",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )
//   .then((response) => {
//     console.log("Успех:", response.data);
//   })
//   .catch((error) => {
//     console.error("Ошибка:", error.response?.data || error.message);
//   });
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const seconds = Math.floor((now - date) / 1000);

// ;
//   return `${date.getDate()}} `;
// };
function Notifications({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);

    axios
      .get("http://localhost:3000/api/users/notification", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNotifications(res.data.result);
      })
      .catch((err) => {
        console.error(
          "Ошибка при загрузке уведомлений:",
          err.response?.data || err.message
        );
        setNotifications([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const elements = notifications.map((item, idx) => {
    // console.log(item.user?.username);
    return (
      <li key={idx}>
        <img className={styles.userImg} src={item.user?.avatar} alt="" />
        <div className={styles.notificationContent}>
          <span className={styles.username}> {item.user?.username}</span>
          <span className={styles.message}> {item.text}</span>
          <span className={styles.date}> {new Date(item.date).getDate()} d</span>
        </div>
        <img className={styles.postImg} src={item.post?.imageURL} alt="" />
      </li>
    );
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Notifications</h3>
        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul>{elements}</ul>
        )}
      </div>
    </div>
  );
}

export default Notifications;
