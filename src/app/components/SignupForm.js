"use client";

import { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [username, setUsername] = useState("developer@bigs.or.kr");
  const [name, setName] = useState("개발자");
  const [password, setPassword] = useState("123qwe!@#");
  const [confirmPassword, setConfirmPassword] = useState("123qwe!@#");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(username);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@%*#?&])[A-Za-z\d!@%*#?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateUsername(username)) {
      setError("유효한 이메일 형식이 아닙니다.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "비밀번호는 8자 이상이며, 숫자, 영문자, 특수문자(!%*#?&)를 포함해야 합니다."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "https://front-mission.bigs.or.kr/auth/signup",
        {
          username,
          name,
          password,
          confirmPassword
        }
      );

      console.log("회원가입 성공:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("회원가입 실패:", error.response?.data || error.message);
      setError(error.response?.data?.error || "회원가입에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>회원가입이 성공적으로 완료되었습니다!</p>
      )}
      <input
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="이메일"
        required
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="사용자 이름"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        required
      />
      <button type="submit">회원가입</button>
    </form>
  );
}
