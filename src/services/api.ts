import axios from "axios";
import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem("token");

    if (error.response.status === 401 && !originalRequest._retry && token) {
      originalRequest._retry = true;

      try {
        const response = await axios.patch<{ token: string }>(
          `${env.VITE_API_URL}/token/refresh`,
          null,
          {
            withCredentials: true,
          },
        );

        const { token } = response.data;

        localStorage.setItem("token", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        localStorage.removeItem("token");
        return Promise.reject(error);
      }
    }
    if (error.response.status === 404) {
      localStorage.removeItem("token");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export const apiRoutes = {
  register: "/register",
  login: "/sessions",
  profile: "/me",
  transactions: "/transactions",
  summary: "/transactions/summary",
  updateProfile: "/profile",
} as const;
