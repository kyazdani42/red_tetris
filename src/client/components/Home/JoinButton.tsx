import * as React from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';

import { joinRoom } from '../../actions/actions';
import { CreateNameModal } from './CreateNameModal';

interface Props {
  dispatchJoinRoom: (id: string) => (name: string) => void;
  roomId: string;
}

const Button = styled.div`
  height: 30px;
  width: 80px;
  background-color: ${props => props.theme.colors.primary.dark};
  border: 1px solid rgba(0,0,0,0.2);
  font-size: 17px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.13);
  padding-top: 1px;
  padding-left: 5px;
  margin-left: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  transition: box-shadow 300ms;
  user-select: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.3);
  };
`;

export const JoinButton: React.SFC<Props> = ({ dispatchJoinRoom, roomId }) => {
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);
  let modal;
  if (displayModal) {
    modal = <CreateNameModal setDisplayModal={setDisplayModal} dispatch={dispatchJoinRoom(roomId)} />;
  } else {
    modal = null;
  }
  return (
    <React.Fragment>
      <Button onClick={handleClick(setDisplayModal)}><span>Join</span><Svg /></Button>
      {modal}
    </React.Fragment>
  );
};

const handleClick = (setDisplayModal: any) => (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.9';
  setTimeout(() => { target.style.opacity = '1'; }, 100);
  setDisplayModal(true);
};

const Svg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

const mapStateToProps = (_: any, { roomId }: { roomId: string }) => ({
  roomId
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchJoinRoom: (id: string) => (name: string) => dispatch(joinRoom({ room: id, playerName: name })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(JoinButton as any));
