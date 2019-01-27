import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createRoom } from '../actions/actions';

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(10,0,0,0.7);
`;

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
  height: 150px;
  margin: auto;
  margin-top: 20vh;
  background-color: #000;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.2);
`;

const CreateRoomStyle = styled.div`
  font-family: ${props => props.theme.fonts.title};
  background-color: ${props => props.theme.colors.primary.normal};
  font-weight: bold;
  border-radius: 24px;
  color: #fff;
  line-height: 40px;
  height: 40px;
  width: 120px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.3);
  user-select: none;
  cursor: pointer;
  :hover {
    opacity: 0.94;
  }
`;

const InputWrapper = styled.div`
  width: 300px;
  height: 65px;
`;

const LabelStyle = styled.label`
  font-family: ${props => props.theme.fonts.title};
  width: 50px;
  margin: auto;
  font-size: 14px;
  color: #fff;
`;

const NameInputStyle = styled.input`
  margin: auto;
  padding: 5px 10px 5px 10px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 4px;
  width: 300px;
  height: 30px;
`;

interface Props {
  dispatch: (username: string) => void;
  setDisplayModal: (d: boolean) => void;
}

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

export const CreateNameModal: React.SFC<Props> = ({ dispatch, setDisplayModal }) => {
  const [error, setError] = React.useState(null);
  return (
    <ModalWrapper onClick={handleRemoveModal(setDisplayModal)} id="modal-name">
      <ModalStyle>
        <InputWrapper>
          <LabelStyle>Pick a username</LabelStyle>
          <NameInputStyle onKeyDown={handleKeyDown(dispatch, setError)} autoFocus={true} />
          {error ? <span style={{ color: 'red', fontSize: '14px' }}>{error}</span> : null}
        </InputWrapper>
        <CreateRoomStyle onClick={handleCreateRoom(dispatch, setError)}>Launch Game</CreateRoomStyle>
      </ModalStyle>
    </ModalWrapper>
  );
};
