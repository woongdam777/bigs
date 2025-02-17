"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Main from "./components/Main";
import { GlobalStyle, Container, FormContainer, FormSection, ToggleButton } from './styles/globalStyles';
import { AuthProvider, useAuth } from './context/AuthContext';

function UnauthenticatedContent({ isLogin, setIsLogin }) {
  return (
    <FormContainer>
      <FormSection $isLeft={true}>
        {isLogin ? (
          <>
            <h2>로그인 안내</h2>
            <p>계정이 있으시면 로그인해주세요.</p>
          </>
        ) : (
          <>
            <h2>회원가입 안내</h2>
            <p>새로운 계정을 만들어보세요.</p>
          </>
        )}
        <ToggleButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "회원가입" : "로그인"}
        </ToggleButton>
      </FormSection>
      <FormSection>
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
        <Main />
      ) : (
        <UnauthenticatedContent isLogin={isLogin} setIsLogin={setIsLogin} />
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
