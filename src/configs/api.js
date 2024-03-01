import { getCookie, setCookie } from "@/utils/cookie";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// set token for every request....
axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; // this is the sent request ( we use it for send it again)
    // it means if access token doesn't exist and the request doesn't retried then send the request with refresh token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await getNewAccessToken();
      if (!response) return;
      setCookie(response.data);
      return axiosInstance(originalRequest)
    }
  }
);

const getNewAccessToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  const NewAccessToken = await axiosInstance.post("/auth/check-refresh-token", {
    refreshToken,
  });
  return NewAccessToken;
};

export { axiosInstance };
