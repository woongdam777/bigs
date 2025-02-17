import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  width: 900px;
  height: 550px;
  font-family: "Arial", sans-serif;
  background-color: var(--color-3);
  border-radius: 10px;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: var(--color-2);
  border-radius: 10px 0 0 10px;
`;

export const RightSection = styled.div`
  flex: 3;
  padding: 40px;
  background-color: var(--color-1);
  border-radius: 0 10px 10px 0;
`;

export const Logo = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin: 3rem 0;
`;

export const UserInfo = styled.div`
  width: 80%;
  font-size: 1.6rem;
  margin-top: 5rem;
`;

export const LogoutButton = styled.div`
  width: 50%;
  padding: 8px;
  margin-top: 15px;
  border: none;
  border-radius: 25px;
  font-size: 1.4rem;
  color: #fff;
  background: #007bff;
  text-align: center;
  cursor: pointer;
`;
