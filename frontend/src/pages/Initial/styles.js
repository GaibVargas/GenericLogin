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

export const MainTitle = styled.h1`
  color: #E3E3E3;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border: 2px solid ${props => props.color};
  border-radius: 4px;
  background-color: transparent;
  color: ${props => props.color};
  font-size: 20px;
  margin-top: 40px;
  cursor: pointer;
`;
