import * as React from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';

import { joinRoom } from '../../actions/actions';
import CreateNameModal from './CreateNameModal';
import { JoinButtonStyle } from './styles';

interface Props {
  dispatchJoinRoom: (id: string) => (name: string) => void;
  roomId: string;
}
export const JoinButton: React.SFC<Props> = ({ dispatchJoinRoom, roomId }) => {
  const [displayModal, setDisplayModal] = React.useState<boolean>(false);
  let modal;
  if (displayModal) {
    modal = <CreateNameModal setDisplayModal={setDisplayModal} handleDispatch={dispatchJoinRoom(roomId)} />;
  } else {
    modal = null;
  }
  return (
    <React.Fragment>
      <JoinButtonStyle onClick={handleClick(setDisplayModal)}><span>Join</span><Svg /></JoinButtonStyle>
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
