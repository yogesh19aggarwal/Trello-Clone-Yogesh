import axios from "axios";

// creating axios for api calling
export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // importing api url from env
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
    accept: "application/json",
  },
});
