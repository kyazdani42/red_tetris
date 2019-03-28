import * as React from 'react';
import { connect } from 'react-redux';

import { createRoom, setModal } from '../../redux/actions';
import { State } from '../../redux/store';
import CreateNameModal from './CreateNameModal';
import { NewGameButton } from './styles';
import { handleClick } from './utils';

interface Props {
  dispatchCreateRoom: (username: string) => void;
  displayModal: boolean;
  dispatchSetModal: (display: boolean) => void;
}

export const CreateRoomButton: React.SFC<Props> = ({
  dispatchCreateRoom,
  dispatchSetModal,
  displayModal
}) => {
  let modal;
  if (displayModal) {
    modal = (
      <CreateNameModal
        className="name-modal"
        setDisplayModal={dispatchSetModal}
        handleDispatch={dispatchCreateRoom}
      />
    );
  } else {
    modal = null;
  }
  return (
    <React.Fragment>
      <NewGameButton onClick={handleClick(dispatchSetModal)}>New Game</NewGameButton>
      {modal}
    </React.Fragment>
  );
};

export const mapStateToProps = (state: State) => ({
  displayModal: state.app.modal
});

export const mapDispatchToProps = (dispatch: any) => ({
  dispatchCreateRoom: (username: string) => dispatch(createRoom(username)),
  dispatchSetModal: (display: boolean) => dispatch(setModal(display))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoomButton);
