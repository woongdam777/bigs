"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import { GlobalStyle, Logo, Container, FormContainer, FormSection, ToggleButton } from './styles/globalStyles';
import { AuthProvider, useAuth} from './context/AuthContext';

function UnauthContent({ isLogin, setIsLogin }) {
  return (
    <FormContainer>
      <FormSection $isLeft={true}>
        <Logo>BIGS</Logo>
        {isLogin ? (
          <p>계정이 있으시면 로그인해주세요.</p>
        ) : (
          <p>새로운 계정을 만들어보세요.</p>
        )}

        <ToggleButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "회원가입 " : "로그인 "}
          <span>하시겠습니까?</span>
        </ToggleButton>
      </FormSection>
      <FormSection $isLeft={false}>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </FormSection>
    </FormContainer>
  );
}

function HomeContent() {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoggedIn } = useAuth();

  return (
    <Container>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <UnauthContent isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </Container>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <HomeContent />
    </AuthProvider>
  );
}
