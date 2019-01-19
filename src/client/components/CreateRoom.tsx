import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createRoom } from '../actions/actions';
import { CreateNameModal } from './CreateNameModal';

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

interface Props {
  dispatchCreateRoom: () => void;
}

export const CreateRoomButton: React.SFC<Props> = ({ dispatchCreateRoom }) => {
  const [displayModal, setDisplayModal] = React.useState(false);
  return (
    <React.Fragment>
    <Wrapper>
      <Button onClick={handleClick(setDisplayModal)}>
        New Game
      </Button>
    </Wrapper>
    {displayModal ? <CreateNameModal dispatchCreateRoom={dispatchCreateRoom} /> : null}
    </React.Fragment>
  );
};

const handleClick = (setDisplayModal: any) => (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.90';
  setTimeout(() => { target.style.opacity = '1'; }, 100);
  setDisplayModal(true);
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchCreateRoom: (username: string) => dispatch(createRoom(username))
});

export default connect(undefined, mapDispatchToProps)(CreateRoomButton);
