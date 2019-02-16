import * as React from 'react';
import styled from 'styled-components';

interface Props {
  socket: SocketIOClient.Socket;
}

const Button = styled.h3`
  position: absolute;
  top: 70px;
  right: -102px;
  text-align: center;
  color: #fff;
  background-color: #000;
  border: 1px solid #fff;
  height: 40px;
  line-height: 40px;
  width: 100px;
  cursor: pointer;
  :hover {
    border: 1px solid red;
    text-shadow: 1px 1px 1px red;
  }
`;

export const StartButton: React.SFC<Props> = ({ socket }) => (
  <Button onClick={() => socket.emit('start')}>
    start
  </Button>
);
