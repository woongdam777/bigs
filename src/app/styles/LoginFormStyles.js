import styled from "styled-components";

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px'
};

export const FormWrapper = styled.form`
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 100%;
  padding: 10px;
  border-radius: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    height: 100vh;
  }
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  color: #4a4a4a;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 25px;
  border: none;
  background-color: #f5f5f5;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  border: none;
  border-radius: 25px;
  font-size: 1.6rem;
  color: #fff;
  background: #ff7eb3;
  cursor: pointer;
`;