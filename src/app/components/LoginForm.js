"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const [username, setUsername] = useState("developer@bigs.or.kr");
  const [password, setPassword] = useState("123qwe!@#");
  const [error, setError] = useState(null);
  const { setIsLoggedIn } = useAuth();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("https://front-mission.bigs.or.kr/auth/signin", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      Cookies.set("refreshToken", refreshToken, { secure: true });
      login(accessToken);  // AuthContext의 login 함수 사용

      console.log("로그인 성공:", response.data);
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      setError(error.response?.data?.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="이메일"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <button type="submit">로그인</button>
    </form>
  );
}
