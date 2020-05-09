import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom right, #1248a1, #a824e0, #c20006);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const User = styled.div`
  width: 100%;
  max-width: 450px;
  height: fit-content;
  padding: 30px 20px;
  background-color: #E3E3E3;
  border-radius: 4px;
  box-shadow: 4px 4px 8px #2E2E2E;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UserHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const UserName = styled.h2`
  font-size: 30px;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const Button = styled.div`
  border: 2px solid #808080;
  border-radius: 4px;
  height: 40px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #808080;
  cursor: pointer;

  &:first-child {
    margin-right: 10px;
  }
`;

export const UserStatus = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;
