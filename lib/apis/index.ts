import axios from "axios";

export const apis = axios.create({
  baseURL: "./",
});

apis.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("Token");
  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

apis.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);
