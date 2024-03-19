import styled from 'styled-components';

const PlainButton = styled.button`
  color: inherit;
  background-color: inherit;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  font-weight: inherit;
  padding: 0;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

export default PlainButton;
