import axios from "axios";

const API_BASE = "https://2478-137-184-161-129.ngrok-free.app/TabebAI";

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers!["Authorization"] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      // if you’re using react-router v6:
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);