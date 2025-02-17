"use client";

import { useState } from "react";
import axios from "axios";
import {
  FormWrapper,
  Title,
  Input,
  SignupButton
} from '../styles/SignupFormStyles';

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
    <FormWrapper onSubmit={handleSubmit}>
      <Title>회원가입</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>회원가입이 성공적으로 완료되었습니다!</SuccessMessage>}
      <Input
        type="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="이메일"
        required
      />
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="사용자 이름"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <Input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        required
      />
      <SignupButton type="submit">Sign Up</SignupButton>
    </FormWrapper>
  );
}