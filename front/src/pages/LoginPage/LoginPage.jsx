import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginApi } from "/src/shared/api/authApi";

import { defaultValues, fields, registerSchema } from "./fields";

import ichgramLogo from "../../assets/ichgram.png";
import phone1 from "../../assets/phone1.png";
import phone2 from "../../assets/phone2.png";

import styles from "./LoginPage.module.css";

function LoginForm() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (values) => {
    const { data, error } = await loginApi(values);
    if (error) return setError(error);
    reset();
    const TOKEN_KEY = "authToken";
    const token = data.token;
    localStorage.setItem(TOKEN_KEY, token);
    navigate("/homepage");
  };

  return (
    <div className={styles.whole_container}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
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

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <input
                {...register(fields.usernameOrEmail.name)}
                {...fields.usernameOrEmail}
              />
              <input {...register(fields.password.name)} {...fields.password} />
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
