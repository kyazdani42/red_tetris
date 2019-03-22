import * as React from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';

import { joinRoom, setModal } from '../../redux/actions';
import { State } from '../../redux/store';
import CreateNameModal from './CreateNameModal';
import { JoinButtonStyle } from './styles';
import { handleClick } from './utils';

interface Props {
  dispatchJoinRoom: (id: string) => (name: string) => void;
  dispatchSetModal: (display: boolean) => void;
  displayModal: boolean;
  roomId: string;
}
export const JoinButton: React.SFC<Props> = ({
  dispatchJoinRoom,
  roomId,
  dispatchSetModal,
  displayModal
}) => {
  let modal;
  if (displayModal) {
    modal = (
      <CreateNameModal
        className="name-modal"
        setDisplayModal={dispatchSetModal}
        handleDispatch={dispatchJoinRoom(roomId)}
      />
    );
  } else {
    modal = null;
  }
  return (
    <React.Fragment>
      <JoinButtonStyle onClick={handleClick(dispatchSetModal)}>
        <span>Join</span>
        <Svg />
      </JoinButtonStyle>
      {modal}
    </React.Fragment>
  );
};

const Svg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

const mapStateToProps = (state: State, { roomId }: { roomId: string }) => ({
  roomId,
  displayModal: state.app.modal
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchJoinRoom: (id: string) => (name: string) =>
    dispatch(joinRoom({ room: id, playerName: name })),
  dispatchSetModal: (display: boolean) => dispatch(setModal(display))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(JoinButton as any));
