import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../redux/store';
import {
  CreateRoomStyle,
  ErrorStyle,
  InputWrapper,
  LabelStyle,
  ModalStyle,
  ModalWrapper,
  NameInputStyle
} from './styles';

interface Props {
  playerName: string | null;
  handleDispatch: (username: string) => void;
  setDisplayModal: (d: boolean) => void;
}

export const CreateNameModal: React.SFC<Props> = ({ handleDispatch, setDisplayModal, playerName }) => {
  const [error, setError] = React.useState(null);
  if (playerName) {
    handleDispatch(playerName);
    return null;
  }
  return (
    <ModalWrapper onClick={handleRemoveModal(setDisplayModal)} id="modal-name">
      <ModalStyle>
        <InputWrapper>
          <LabelStyle>Pick a username</LabelStyle>
          <NameInputStyle onKeyDown={handleKeyDown(handleDispatch, setError)} autoFocus={true} />
          {error ? <ErrorStyle>{error}</ErrorStyle> : null}
        </InputWrapper>
        <CreateRoomStyle onClick={handleCreateRoom(handleDispatch, setError)}>
          Launch Game
        </CreateRoomStyle>
      </ModalStyle>
    </ModalWrapper>
  );
};

const handleRemoveModal = (setDisplayModal: any) => (e: any) => {
  if (e.target.id === 'modal-name') {
    setDisplayModal(false);
  }
};

const handleCreateRoom = (dispatch: (username: string) => void, setError: any) => (e: any) => {
  const value = e.target.previousSibling.firstChild.nextElementSibling.value;
  if (!value.length) {
    setError('please enter something');
  } else {
    dispatch(value);
  }
};

const handleKeyDown = (dispatch: (username: string) => void, setError: any) => (e: any) => {
  setError(null);
  if (e.key === 'Enter') {
    if (!e.target.value.length) {
      setError('please enter something');
    } else {
      dispatch(e.target.value);
    }
  }
};

const mapStateToProps = (state: State, ownProps: any) => ({
  playerName: state.app.playerName,
  ...ownProps
});

export default connect(mapStateToProps)(CreateNameModal);
