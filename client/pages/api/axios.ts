import axios, { AxiosInstance } from "axios";

const axiosBaseUrl: string =
  process.env.NEXT_PUBLIC_CORS_ORIGIN || "http://localhost:3000";

const instance: AxiosInstance = axios.create({
  baseURL: `${axiosBaseUrl}/api/v1/`,
  withCredentials: true,
});

export default instance;
