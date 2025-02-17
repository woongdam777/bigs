import axios from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "./refreshAccessToken";

const axiosInstance = axios.create({
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 시 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken, refreshToken } = await refreshAccessToken();
        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken); // 새 리프레시 토큰도 저장

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 실패:", refreshError.message);
        // 여기서 로그아웃 처리를 할 수 있습니다.
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
