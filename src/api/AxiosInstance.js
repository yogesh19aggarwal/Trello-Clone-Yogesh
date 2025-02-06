import axios from "axios";
import { config } from "../config/config";

const { baseUrl, apiKey, apiToken } = config;

export const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
    accept: "application/json",
  },
  params: {
    key: apiKey,
    token: apiToken,
  },
});