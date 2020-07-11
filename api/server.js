const axios = require("axios");
import { AsyncStorage } from "react-native";

const api = axios.create({
  baseURL: "https://2b228533530b.ngrok.io",
  // baseURL: "http://localhost:4000",
});

api.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.token = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
