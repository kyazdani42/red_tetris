export const setWindowEvents = (emitAction: (type: keyType) => void) => {
  const listener = handleKeyDown(emitAction);
  window.removeEventListener('keydown', listener);
  window.addEventListener('keydown', listener);
  return listener;
};

export const handleKeyDown = (emitAction: (type: keyType) => void) => (e: any) => {
  switch (e.key) {
    case ' ':
      emitAction(' ');
      break;
    case 'ArrowUp':
      emitAction('up');
      break;
    case 'ArrowDown':
      emitAction('down');
      break;
    case 'ArrowLeft':
      emitAction('left');
      break;
    case 'ArrowRight':
      emitAction('right');
      break;
  }
};
