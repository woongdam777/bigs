// styles.js
import styled, { createGlobalStyle } from 'styled-components';

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px'
};

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
    --color-1: #b0b0b0;
    --color-2: #e0e0e0;
    --color-3: #ffffff;
  }
`;

export const Logo = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  align-self: flex-start;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 10px;
  font-family: 'Arial', sans-serif;
  background-color: var(--color-3);

  @media (min-width: ${breakpoints.tablet}) {
    padding: 20px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  font-size: 1.4rem;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    height: 550px;
    font-size: 1.5rem;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-color: ${(props) => props.$isLeft ? 'var(--color-2)' : 'var(--color-1)'};

  @media (min-width: ${breakpoints.tablet}) {
    padding: 40px;
  }
`;

export const ToggleButton = styled.button`
  position: static;
  margin-top: auto;
  padding: 8px;
  font-size: 1.4rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  @media (min-width: ${breakpoints.tablet}) {
    position: absolute;
    bottom: 40px;
    transform: translateY(-50%);
    padding: 10px;
    font-size: 1.6rem;
  }
`;
