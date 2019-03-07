import * as React from 'react';
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
  dispatch: (username: string) => void;
  setDisplayModal: (d: boolean) => void;
}

export const CreateNameModal: React.SFC<Props> = ({ dispatch, setDisplayModal }) => {
  const [error, setError] = React.useState(null);
  return (
    <ModalWrapper onClick={handleRemoveModal(setDisplayModal)} id="modal-name">
      <ModalStyle>
        <InputWrapper>
          <LabelStyle>Pick a username</LabelStyle>
          <NameInputStyle onKeyDown={handleKeyDown(dispatch, setError)} autoFocus={true} />
          {error ? <ErrorStyle>{error}</ErrorStyle> : null}
        </InputWrapper>
        <CreateRoomStyle onClick={handleCreateRoom(dispatch, setError)}>
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
