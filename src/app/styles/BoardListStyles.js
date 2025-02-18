import styled from "styled-components";

export const BoardContainer = styled.div`
  font-size: 1.5rem;
  overflow: hidden;
`;

export const ContentContainer = styled.div`
  // flex: 1;
  // overflow-y: auto;
`;

export const BottomContainer = styled.div`
  position: sticky;
  bottom: 0;
  // background-color: var(--color-3);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CategoryContainer = styled.div`
  margin-bottom: 2rem;
`;

export const CategoryButton = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: ${(props) => (props.$active ? "#ff7eb3" : "var(--color-2)")};
  color: ${(props) => (props.$active ? "white" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.6rem;
`;

export const TableContainer = styled.div`
  background-color: var(--color-3);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 2fr;
  font-weight: bold;
  padding: 15px;
  background-color: var(--color-2);
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 2fr;
  padding: 8px 15px;
  border-bottom: 1px solid var(--color-2);
  cursor: pointer;

  &:hover {
    background-color: var(--color-2);
  }
`;

export const WriteButton = styled.button`
  margin-top: 2rem;
  padding: 10px 20px;
  background-color: #ff7eb3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.6rem;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: ${(props) => (props.$active ? "#ff7eb3" : "var(--color-2)")};
  color: ${(props) => (props.$active ? "white" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.4rem;
`;