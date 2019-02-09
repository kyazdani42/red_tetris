import * as React from 'react';
import { connect } from 'react-redux';

import Key from './Key';
import { StartButton } from './StartButton';

import { State } from '../store';

interface Props {
  socket: SocketIOClient.Socket;
}

const dispatchSpace = (socket: SocketIOClient.Socket) => () => socket.emit('goDown');
const dispatchUp = (socket: SocketIOClient.Socket) => () => socket.emit('rotate');
const dispatchDown = (socket: SocketIOClient.Socket) => () => socket.emit('moveDown');
const dispatchLeft = (socket: SocketIOClient.Socket) => () => socket.emit('moveLeft');
const dispatchRight = (socket: SocketIOClient.Socket) => () => socket.emit('moveRight');

const handleKeyPress = (
  socket: SocketIOClient.Socket,
  setClick: React.Dispatch<React.SetStateAction<keyType | null>>
) => (e: any) => {
  switch (e.key) {
    case ' ':
      setClick(' ');
      dispatchSpace(socket)();
      break;
    case 'ArrowUp':
      setClick('up');
      dispatchUp(socket)();
      break;
    case 'ArrowDown':
      setClick('down');
      dispatchDown(socket)();
      break;
    case 'ArrowLeft':
      setClick('left');
      dispatchLeft(socket)();
      break;
    case 'ArrowRight':
      setClick('right');
      dispatchRight(socket)();
      break;
  }
  setTimeout(() => setClick(null), 60);
};

const setWindowEvents = (
  socket: SocketIOClient.Socket,
  setClick: React.Dispatch<React.SetStateAction<keyType | null>>
) => {
  const listener = handleKeyPress(socket, setClick);
  window.removeEventListener('keydown', listener);
  window.addEventListener('keydown', listener);
};

const GameController: React.SFC<Props> = ({ socket }) => {
  const [click, setClick] = React.useState<keyType | null>(null);
  React.useEffect(() => setWindowEvents(socket, setClick), []);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Key type="left" keyPressed={click} emitter={dispatchLeft(socket)} />
      <Key type="right" keyPressed={click} emitter={dispatchRight(socket)} />
      <Key type="down" keyPressed={click} emitter={dispatchDown(socket)} />
      <Key type="up" keyPressed={click} emitter={dispatchUp(socket)} />
      <Key type=" " keyPressed={click} emitter={dispatchSpace(socket)} />
      <StartButton socket={socket} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  socket: state.app.socket
});

export default connect(mapStateToProps)(GameController);
