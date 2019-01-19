import * as React from 'react';
import styled from 'styled-components';

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
  width: 400px;
  height: 200px;
  margin: auto;
  margin-top: 50%;
  transform: translateY(-200px);
  background-color: #000;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.2);
`;

interface Props {
  dispatchCreateRoom: () => any;
}

export const CreateNameModal: React.SFC<Props> = ({ dispatchCreateRoom }) => (
  <ModalWrapper>
    <ModalStyle>
      <div onClick={dispatchCreateRoom} />
    </ModalStyle>
  </ModalWrapper>
);
