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
  background-color: rgba(255,255,255,0.1);
`;

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
  height: 150px;
  margin: auto;
  margin-top: 50%;
  transform: translateY(-200px);
  background-color: #000;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.2);
`;

const CreateRoomStyle = styled.div`
  padding: 5px;
  width: 120px;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.3);
`;

const NameInputStyle = styled.input`
  border: 1px solid #eee;
  border-radius: 4px;
  width: 300px;
  height: 30px;
`;

interface Props {
  dispatchCreateRoom: (username: string) => void;
  setDisplayModal: (d: boolean) => void;
}

const handleRemoveModal = (setDisplayModal: any) => (e: any) => {
  if (e.target.id === 'modal-name') {
    setDisplayModal(false);
  }
};

const handleCreateRoom = (dispatchCreateRoom: (username: string) => void) => (e: any) => {
  dispatchCreateRoom(e.target.previousSibling.value);
}

export const CreateNameModal: React.SFC<Props> = ({ dispatchCreateRoom, setDisplayModal }) => (
  <ModalWrapper onClick={handleRemoveModal(setDisplayModal)} id="modal-name">
    <ModalStyle>
      <NameInputStyle />
      <CreateRoomStyle onClick={handleCreateRoom(dispatchCreateRoom)} />
    </ModalStyle>
  </ModalWrapper>
);

const mapDispatchToProps = (dispatch: any) => ({
  dispatchCreateRoom: (username: string) => dispatch(createRoom(username))
});

export default connect(undefined, mapDispatchToProps)(CreateNameModal);
