import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import { defaultValues, fields, registerSchema } from "./fields";

import { registerApi } from "/src/shared/api/authApi";

import ichgramLogo from "../../assets/ichgram.png";
import styles from "./SignupPage.module.css";

function SignupForm() {
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
    const { data, error } = await registerApi(values);
    if (error) return setError(error);
    reset();
    const TOKEN_KEY = "authToken";
    const token = data.token;
    localStorage.setItem(TOKEN_KEY, token);
    navigate("/");
  };

  return (
    <div className={styles.whole_container}>
      <div className={styles.wrapper}>
        <div className={styles.login_side}>
          <div className={styles.container}>
            <img
              src={ichgramLogo}
              alt="Ichgram Logo"
              className={styles.logo}
              width={190}
              height={106.87}
            />

            <p className={styles.tagline}>
              Sign up to see photos and videos from your friends.
            </p>
            {error && (
              <p className={styles.error}>
                {error?.response?.data?.message || error?.message}
              </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {errors?.email && (
                <p className={styles.error}>{errors?.email?.message}</p>
              )}
              <input {...register(fields.email.name)} {...fields.email} />

              {errors?.fullname && (
                <p className={styles.error}>{errors?.fullname?.message}</p>
              )}
              <input {...register(fields.fullname.name)} {...fields.fullname} />

              {errors?.username && (
                <p className={styles.error}>{errors?.username?.message}</p>
              )}
              <input {...register(fields.username.name)} {...fields.username} />

              {errors?.password && (
                <p className={styles.error}>{errors?.password?.message}</p>
              )}
              <input {...register(fields.password.name)} {...fields.password} />

              <p className={styles.terms}>
                People who use our service may have uploaded your contact
                information to Ichgram. <a href="/learn-more">Learn More</a>
              </p>
              <p className={styles.terms}>
                By signing up, you agree to our <a href="/terms">Terms</a>,{" "}
                <a href="/data-policy">Privacy Policy</a> and{" "}
                <a href="/cookies-policy">Cookies Policy</a>.
              </p>
              <button type="submit" className={styles.signupButton}>
                Sign up
              </button>
            </form>
          </div>
          <div className={styles.signupBox}>
            <p>
              Have an account?{" "}
              <Link to="/login" className={styles.signupLink}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
