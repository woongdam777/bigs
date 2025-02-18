import styled from "styled-components";

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px'
};

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%
  width: 900px;
  height: auto;
  font-family: "Arial", sans-serif;
  background-color: var(--color-3);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    width: 900px;
    height: 90vh;
    overflow: hidden;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--color-2);
  height: 30%;

  @media (min-width: ${breakpoints.tablet}) {
    flex: 1;
    height: 100%;
    padding: 30px;
    border-radius: 10px 0 0 10px;
  }
`;

export const RightSection = styled.div`
  padding: 20px;
  background-color: var(--color-1);
  overflow-y: auto;
  height: 70%;

  @media (min-width: ${breakpoints.tablet}) {
    height: 100%;
    flex: 3;
    padding: 40px;
    border-radius: 0 10px 10px 0;
    max-height: none;
  }
`;

export const Logo = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 1.5rem 0;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 4rem;
    margin-top: 2rem;
  }
`;

export const UserInfo = styled.div`
  width: 100%;
  font-size: 1.4rem;
  margin-top: 0rem;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.6rem;
    margin-top: 0rem;
  }
`;

export const LogoutButton = styled.div`
  width: 100%;
  padding: 8px;
  margin-top: 15px;
  border: none;
  border-radius: 25px;
  font-size: 1.4rem;
  color: #fff;
  background: #007bff;
  text-align: center;
  cursor: pointer;

  @media (min-width: ${breakpoints.tablet}) {
    width: 50%;
  }
`;
