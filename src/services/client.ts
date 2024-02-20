import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const axiosClient = axios.create({
  baseURL: "http://192.168.1.203:3000/api",
  timeout: 10000, // 10 seconds
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = SecureStore.getItem("__clerk_client_jwt");

    config.headers["Authorization"] = token;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
