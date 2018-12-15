import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: ${props => props.theme.fonts.title};
  background-color: ${props => props.theme.colors.primary.normal};
  border-radius: 24px;
  color: #fff;
  height: 50px;
  width: 150px;
  font-size: 22px;
  border: 1px solid rgba(0,0,0,0.5);
  text-align: center;
  line-height: 50px;
  margin: auto;
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.94;
  }
`;

export const CreateRoomButton = () => (
  <Wrapper onClick={handleClick}>
    New Game
  </Wrapper>
);

const handleClick = (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.6';
  window.setTimeout(() => target.style.opacity = '1', 100)
}