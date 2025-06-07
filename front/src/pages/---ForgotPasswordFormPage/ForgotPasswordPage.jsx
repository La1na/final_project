import React, { useState } from "react";
import styles from "./ForgotPasswordPage.module.css";
// Комментарий: Сюда можно импортировать иконку блокировки
// import lockIcon from '../../assets/lock-icon.png';
// Комментарий: Сюда можно импортировать логотип Ichgram (возможно, маленький)
// import ichgramSmallLogo from '../../assets/ichgram-small-logo.png';

function ForgotPasswordForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: usernameOrEmail }), // Используем email для запроса сброса
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <div style={styles.lockIcon}>
          {/* Комментарий: Сюда можно вставить изображение иконки блокировки */}
        </div>
      </div>
      {/* Комментарий: Сюда можно вставить маленький логотип Ichgram */}
      <h2 style={styles.heading}>Trouble logging in?</h2>
      <p style={styles.subheading}>
        
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.message}>{message}</p>}
        <input
          type="text"
          placeholder="Email or Username"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.resetButton}>
          Reset your password
        </button>
      </form>
      <div style={styles.separator}>
        <hr style={styles.line} />
        <span style={styles.or}>OR</span>
        <hr style={styles.line} />
      </div>
      <button style={styles.createAccountButton}>Create new account</button>
      <a href="/login" style={styles.backToLogin}>
        Back to login
      </a>
    </div>
  );
}

export default ForgotPasswordForm;
