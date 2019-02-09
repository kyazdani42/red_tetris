import * as React from 'react';

interface Props {
  socket: SocketIOClient.Socket;
}

export const StartButton: React.SFC<Props> = ({ socket }) => (
  <div style={{ backgroundColor: '#fff' }} onClick={() => socket.emit('start')}>
    start
  </div>
);
