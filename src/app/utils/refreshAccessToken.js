import axios from "axios";
import Cookies from "js-cookie";

export async function refreshAccessToken() {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await axios.post(
      "https://front-mission.bigs.or.kr/auth/refresh",
      { refreshToken: refreshToken },
      { withCredentials: false }
    );

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken
    };
  } catch (error) {
    console.error("리프레시 실패:", error.response?.data || error.message);
    throw error;
  }
}
