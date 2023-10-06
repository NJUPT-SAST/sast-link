import axios from "axios";

export const apis = axios.create({});

apis.interceptors.request.use((config) => {
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
