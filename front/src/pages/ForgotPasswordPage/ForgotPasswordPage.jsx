import React, { useState } from "react";
import styles from "./ForgotPasswordPage.module.css";
import { Link } from "react-router-dom";
import TroubleLogIn from "../../assets/TroubleLogIn.png";

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
    <div className={styles.whole_container}>
      <div className={styles.wrapper}>
        <div className={styles.login_side}>
          <div className={styles.container}>
            <img
              src={TroubleLogIn}
              alt="Trouble Log In Logo"
              className={styles.logo}
              width={190}
              height={106.87}
            />
            <p className={styles.info_text}>
              Enter your email, phone, or username and we'll send you a link to
              get back into your account.
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <p className={styles.error}>{error}</p>}
              <input
                type="text"
                placeholder="Username or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />

              <button type="submit" className={styles.log_in}>
                Reset your password
              </button>
            </form>

            <div className={styles.separator}>
              <hr />
              <span className={styles.separator_or}>OR</span>
              <hr />
            </div>

            <a href="/signup" className={styles.forgotPassword}>
              Create new account
            </a>
          </div>

          <div className={styles.signupBox}>
            <Link to="/login" className={styles.signupLink}>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ForgotPasswordForm;
