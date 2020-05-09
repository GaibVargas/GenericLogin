import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 250px;
  padding: 25px 15px;
  background-color: #F54040;
  color: #F5F5F5;
  text-align: center;
  border-radius: 4px;
  box-shadow: 4px 4px 8px #2E2E2E;

  .text {
    font-size: 18px;
  }

  .close {
    position: absolute;
    padding: 10px;
    top: -5px;
    right: 0px;
    cursor: pointer;
  }
`;
