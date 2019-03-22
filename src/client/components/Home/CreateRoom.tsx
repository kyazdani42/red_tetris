import * as React from 'react';
import { connect } from 'react-redux';

import { createRoom, setModal } from '../../redux/actions';
import { State } from '../../redux/store';
import CreateNameModal from './CreateNameModal';
import { NewGameButton } from './styles';

interface Props {
  dispatchCreateRoom: (username: string) => void;
  displayModal: boolean;
  setDisplayModal: (display: boolean) => void;
}

export const CreateRoomButton: React.SFC<Props> = ({ dispatchCreateRoom, setDisplayModal, displayModal }) => {
  let modal;
  if (displayModal) {
    modal = <CreateNameModal setDisplayModal={setDisplayModal} handleDispatch={dispatchCreateRoom} />;
  } else {
    modal = null;
  }
  return (
    <React.Fragment>
      <NewGameButton onClick={handleClick(setDisplayModal)}>
        New Game
      </NewGameButton>
    {modal}
    </React.Fragment>
  );
};

export const handleClick = (setDisplayModal: any) => (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.90';
  setTimeout(() => { target.style.opacity = '1'; }, 100);
  setDisplayModal(true);
};

const mapStateToProps = (state: State) => ({
  displayModal: state.app.modal
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchCreateRoom: (username: string) => dispatch(createRoom(username)),
  setDisplayModal: (display: boolean) => dispatch(setModal(display))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomButton);
