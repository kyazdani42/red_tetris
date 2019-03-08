import * as React from 'react';
import { connect } from 'react-redux';

import { createRoom } from '../../redux/actions';
import CreateNameModal from './CreateNameModal';
import { NewGameButton } from './styles';

interface Props {
  dispatchCreateRoom: (username: string) => void;
}

export const CreateRoomButton: React.SFC<Props> = ({ dispatchCreateRoom }) => {
  const [displayModal, setDisplayModal] = React.useState(false);
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
