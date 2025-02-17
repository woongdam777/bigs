"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  FormWrapper,
  Title,
  Input,
  LoginButton
} from '../styles/LoginFormStyles';

export default function LoginForm() {
  const [username, setUsername] = useState("developer@bigs.or.kr");
  const [password, setPassword] = useState("123qwe!@#");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://front-mission.bigs.or.kr/auth/signin",
        {
          username,
          password,
        }
      );

      const { accessToken, refreshToken } = response.data;

      Cookies.set("refreshToken", refreshToken, { secure: true });
      login(accessToken);

      console.log("로그인 성공:", response.data);
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      setError(error.response?.data?.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>로그인</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="e-mail"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
      />
      <LoginButton type="submit">Log In</LoginButton>
    </FormWrapper>
  );
}
