import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import ichgramLogo from "../../assets/ichgram.png";
import phone1 from "../../assets/phone1.png";
import phone2 from "../../assets/phone2.png";

function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className={styles.whole_container}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          {/* <img src={phone1} alt="Phone 1" className={styles.imageBase} /> */}
          <img src={phone2} alt="Phone 2" className={styles.imageOverlay} />
        </div>

        <div className={styles.login_side}>
          <div className={styles.container}>
            <img
              src={ichgramLogo}
              alt="Ichgram Logo"
              className={styles.logo}
              width={190}
              height={106.87}
            />

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <p className={styles.error}>{error}</p>}
              <input
                type="text"
                placeholder="Username or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className={styles.log_in}>
                Log In
              </button>
            </form>

            <div className={styles.separator}>
              <hr />
              <span className={styles.separator_or}>OR</span>
              <hr />
            </div>

            <a href="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>

          <div className={styles.signupBox}>
            <p>
              Don’t have an account?{" "}
              <Link to="/signup" className={styles.signupLink}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
