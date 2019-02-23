import * as React from 'react';

import { StartButtonStyle } from './styles';

interface Props {
  socket: SocketIOClient.Socket;
}

export const StartButton: React.SFC<Props> = ({ socket }) => (
  <StartButtonStyle onClick={() => socket.emit('start')}>
    start
  </StartButtonStyle>
);
