import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Key from './Key';
import { StartButton } from './StartButton';

import { State } from '../store';

const ControllerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

interface Props {
  socket: SocketIOClient.Socket;
}

const GameController: React.SFC<Props> = ({ socket }) => {
  const [click, setClick] = React.useState<keyType | null>(null);
  const emitAction = emitter(socket, setClick);
  React.useEffect(() => {
    const listener = setWindowEvents(emitAction);
    return () => window.removeEventListener('keydown', listener);
  }, []);
  return (
    <ControllerWrapper>
      <Key type="left" keyPressed={click} emitter={emitAction('left')} />
      <Key type="right" keyPressed={click} emitter={emitAction('right')} />
      <Key type="down" keyPressed={click} emitter={emitAction('down')} />
      <Key type="up" keyPressed={click} emitter={emitAction('up')} />
      <Key type=" " keyPressed={click} emitter={emitAction(' ')} />
      <StartButton socket={socket} />
    </ControllerWrapper>
  );
};

const setWindowEvents = (emitAction: (type: keyType | null) => () => void) => {
  const listener = handleKeyPress(emitAction);
  window.removeEventListener('keydown', listener);
  window.addEventListener('keydown', listener);
  return listener;
};

const handleKeyPress = (emitAction: (type: keyType | null) => () => void) => (e: any) => {
  switch (e.key) {
    case ' ':
      emitAction(' ')();
      break;
    case 'ArrowUp':
      emitAction('up')();
      break;
    case 'ArrowDown':
      emitAction('down')();
      break;
    case 'ArrowLeft':
      emitAction('left')();
      break;
    case 'ArrowRight':
      emitAction('right')();
      break;
  }
};

const emitter = (
  socket: SocketIOClient.Socket,
  setClick: React.Dispatch<React.SetStateAction<keyType | null>>
) => (type: keyType | null) => () => {
  const emitString = getEmitStringFromType(type);
  socket.emit(emitString);
  setClick(type);
  setTimeout(() => setClick(null), 60);
};

const getEmitStringFromType = (type: keyType | null) => {
  switch (type) {
    case ' ':
      return 'goDown';
    case 'down':
      return 'moveDown';
    case 'up':
      return 'rotate';
    case 'left':
      return 'moveLeft';
    case 'right':
      return 'moveRight';
    default:
      return '';
  }
};

const mapStateToProps = (state: State) => ({
  socket: state.app.socket
});

export default connect(mapStateToProps)(GameController);
