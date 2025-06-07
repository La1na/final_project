import * as Yup from "yup";

export const defaultValues = {
  usernameOrEmail: "email@email.com",
  password: "sdfsdfsdf44",
};

export const fields = {
  usernameOrEmail: {
    type: "text",
    name: "usernameOrEmail",
    label: "Email",
    placeholder: "Username Or Email",
  },
  password: {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Password",
  },
};

export const registerSchema = Yup.object({
  usernameOrEmail: Yup.string().trim().required(),
  password: Yup.string().trim().required(),
});
