import * as React from 'react';
import styled from 'styled-components';

import CreateNameModal from './CreateNameModal';

const Button = styled.div`
  font-family: ${props => props.theme.fonts.title};
  background-color: ${props => props.theme.colors.primary.dark};
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

export const CreateRoomButton: React.SFC<{}> = () => {
  const [displayModal, setDisplayModal] = React.useState(false);
  let modal;
  if (displayModal) {
    modal = <CreateNameModal setDisplayModal={setDisplayModal} />;
  } else {
    modal = null;
  }
  return (
    <React.Fragment>
    <Wrapper>
      <Button onClick={handleClick(setDisplayModal)}>
        New Game
      </Button>
    </Wrapper>
    {modal}
    </React.Fragment>
  );
};

const handleClick = (setDisplayModal: any) => (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.90';
  setTimeout(() => { target.style.opacity = '1'; }, 100);
  setDisplayModal(true);
};
