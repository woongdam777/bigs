// styles.js
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  :root {
    --color-1: #e0e0e0;
    --color-2: #ffffff;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: var(--color-1);
`;

export const FormContainer = styled.div`
  display: flex;
  width: 700px;
  max-width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  background-color: ${props => props.isLeft ? 'var(--color-2)' : 'var(--color-1)'};

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  bottom: 40px;
  transform: translateY(-50%);
  padding: 10px;
  font-size: 1.6rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    position: static;
    margin-top: auto;
  }
`;
