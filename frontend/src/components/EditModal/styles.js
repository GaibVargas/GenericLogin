import styled from 'styled-components';

export const ErrorLabel = styled.span`
  font-size: 14px;
  margin-top: 5px;
  color: #E33232;
  display: ${props => props.show ? 'block' : 'none'};
`;
