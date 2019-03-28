import * as React from 'react';
import { connect } from 'react-redux';

import { setError } from '../../redux/actions';
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
  dispatchSetError: (error: string | null) => void;
  error: string | null;
}

export const CreateNameModal: React.SFC<Props> = ({
  handleDispatch,
  setDisplayModal,
  playerName,
  dispatchSetError,
  error
}) => {
  if (playerName) {
    handleDispatch(playerName);
    return null;
  }
  return (
    <ModalWrapper onClick={handleRemoveModal(setDisplayModal)} id="modal-name">
      <ModalStyle>
        <InputWrapper>
          <LabelStyle>Pick a username</LabelStyle>
          <NameInputStyle
            onKeyDown={handleKeyDown(handleDispatch, dispatchSetError)}
            autoFocus={true}
          />
          {error ? <ErrorStyle className="error">{error}</ErrorStyle> : null}
        </InputWrapper>
        <CreateRoomStyle onClick={handleCreateRoom(handleDispatch, dispatchSetError)}>
          Launch Game
        </CreateRoomStyle>
      </ModalStyle>
    </ModalWrapper>
  );
};

export const handleRemoveModal = (setDisplayModal: any) => (e: any) => {
  if (e.target.id === 'modal-name') {
    setDisplayModal(false);
  }
};

export const handleCreateRoom = (
  dispatch: (username: string) => void,
  dispatchSetError: (error: string | null) => void
) => (e: any) => {
  const value = e.target.previousSibling.firstChild.nextElementSibling.value;
  if (!value.length) {
    dispatchSetError('please enter something');
  } else {
    dispatch(value);
  }
};

export const handleKeyDown = (
  dispatch: (username: string) => void,
  dispatchSetError: (error: string | null) => void
) => (e: any) => {
  dispatchSetError(null);
  if (e.key === 'Enter') {
    if (!e.target.value.length) {
      dispatchSetError('please enter something');
    } else {
      dispatch(e.target.value);
    }
  }
};

export const mapStateToProps = (state: State, ownProps: any) => ({
  playerName: state.app.playerName,
  error: state.app.error,
  ...ownProps
});

export const mapDispatchToProps = (dispatch: any) => ({
  dispatchSetError: (error: string | null) => dispatch(setError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNameModal);
