import { useState, useEffect } from "react";
import styles from "./CreatePage.module.css";
import avatar from "/src/assets/ICHavatar.png";
import uploadImg from "/src/assets/fileUpload.png";

function Create({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUser(data[2]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Пожалуйста, выберите файл");
      return;
    }

    const formData = new FormData();
    formData.append("author", user);
    formData.append("caption", caption);
    formData.append("selectedFile", selectedFile);

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Успешно загружено:", result);
    } catch (error) {
      console.error("Ошибка при отправке поста:", error);
    }

    onClose();
  };
  // на бек из токена достаешь юзерайди, создаешь обїект Post, заполняешь его и сохраняешь
  const handleModalClick = (e) => {
    e.stopPropagation();
    // console.log(e);
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.modalHeader}>
          <h3>Create new post</h3>
          <button className={styles.shareButton} onClick={handleUpload}>
            Share
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="preview"
                className={styles.previewImage}
              />
            ) : (
              <label htmlFor="file-upload" className={styles.placeholder}>
                <div className={styles.uploadIcon}>
                  <img src={uploadImg} alt="" />
                </div>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </label>
            )}
          </div>
          <div className={styles.rightPanel}>
            {user && (
              <div className={styles.userInfo}>
                <img src={avatar} alt="avatar" className={styles.avatar} />
                <span className={styles.username}>{user.username}</span>
              </div>
            )}
            <textarea
              className={styles.captionInput}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
