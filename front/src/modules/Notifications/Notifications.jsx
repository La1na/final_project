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
    return <li key={idx}>{item}</li>;
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
