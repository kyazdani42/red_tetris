export const setWindowEvents = (emitAction: (type: keyType | null) => () => void) => {
  const listener = handleKeyPress(emitAction);
  window.removeEventListener('keydown', listener);
  window.addEventListener('keydown', listener);
  return listener;
};

export const handleKeyPress = (emitAction: (type: keyType | null) => () => void) => (e: any) => {
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

export const emitter = (
  socket: SocketIOClient.Socket,
  setClick: React.Dispatch<React.SetStateAction<keyType | null>>
) => (type: keyType | null) => () => {
  const emitString = getEmitStringFromType(type);
  socket.emit(emitString);
  setClick(type);
  setTimeout(() => setClick(null), 60);
};

export const getEmitStringFromType = (type: keyType | null) => {
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
