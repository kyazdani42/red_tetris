import * as React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  font-family: ${props => props.theme.fonts.title};
  background-color: ${props => props.theme.colors.primary.normal};
  border-radius: 24px;
  color: #fff;
  line-height: 50px;
  height: 50px;
  width: 150px;
  font-size: 22px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.3);
  user-select: none;
  cursor: pointer;
  :hover {
    opacity: 0.94;
  }
`;

const Wrapper = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const CreateRoomButton = () => (
  <Wrapper>
    <Button onClick={handleClick}>
      New Game
    </Button>
  </Wrapper>
);

const handleClick = (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.90';
  setTimeout(() => { target.style.opacity = '1'; }, 100);
};
