import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3000/api/auth" });

export const registerApi = async (payload) => {
  try {
    const { data } = await instance.post("/register", payload);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
