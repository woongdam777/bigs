import styled from "styled-components";

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px'
};

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-3);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 30px;
    max-width: 800px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2rem;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
    padding: 12px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2rem;
  resize: vertical;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
    padding: 12px;
    height: 200px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2rem;
  background-color: white;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
    padding: 12px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
    padding: 12px 24px;
  }
`;
