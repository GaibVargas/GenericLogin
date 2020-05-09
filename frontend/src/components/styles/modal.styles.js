import styled from 'styled-components';

export const Box = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);

  display: ${props => props.show ? 'flex' : 'none'};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.div`
  width: 100%;
  max-width: 420px;
  height: fit-content;
  background-color: #FFF;
  padding: 35px 20px;
  color: #575757;
  border-radius: 4px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 0px;
  right: 5px;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-size: 35px;
  margin-bottom: 25px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5px;
`;

export const Label = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
  margin-top: 20px;
`;

export const Input = styled.input`
  height: 38px;
  border: 2px solid ${props => props.error ? '#E33232' : '#E3E3E3' };
  border-radius: 4px;
  font-size: 18px;
  padding: 0 10px;
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
