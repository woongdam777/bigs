import styled from "styled-components";

export const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--color-3);
  margin: 0 auto;
  padding: 20px;
  font-size: 1.5rem;
`;

export const BoardTitle = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 1rem;
`;

export const BoardInfo = styled.div`
  color: #666;
  margin-bottom: 2rem;
`;

export const BoardContent = styled.div`
  line-height: 1.6;
`;

export const Button = styled.button`
  margin-top: 2rem;
  padding: 10px 15px;
  background-color: var(--color-2);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1.6rem;
`;

export const EditButton = styled(Button)`
  background-color: #007bff;
  color: white;
`;

export const BoardImage = styled.img`
  max-width: 100%;
  margin-bottom: 2rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  font-size: 1.6rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-bottom: 1rem;
  font-size: 1.6rem;
`;

export const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

export const ButtonContainer = styled.div`
  margin: auto 0;
`;
