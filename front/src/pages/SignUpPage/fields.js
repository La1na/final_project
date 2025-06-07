import * as Yup from "yup";

export const defaultValues = {
  username: "sdfsdfsdfsdf",
  email: "email@email.com",
  password: "sdfsdfsdf44",
  fullname: "sdfsdfsdfsdf",
};

export const fields = {
  username: {
    type: "text",
    name: "username",
    label: "Username",
    placeholder: "Username",
  },
  email: {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "Email",
  },
  password: {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Password",
  },

  fullname: {
    name: "fullname",
    type: "text",
    label: "Fullname",
    placeholder: "Full Name",
  },
};

const usernameRule = {
  regexp: /^[a-zA-Z0-9]+$/,
  message: "В username запрещены спецсимволы",
};

const passwordRule = {
  regexp: /^(?=.*[A-Za-z])(?=.*\d).+$/,
  message: "Пароль должен содержать минимум 1 цифру и букву",
};

export const registerSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required()
    .matches(usernameRule.regexp, usernameRule.message),
  email: Yup.string().trim().required().email(),
  password: Yup.string()
    .trim()
    .required()
    .min(6, "пароль должен содержать минимум 6 символов")
    .matches(passwordRule.regexp, passwordRule.message),
  fullname: Yup.string()
    .trim()
    .required()
    .min(6, "имя должно содержать минимум 6 символов"),
});
