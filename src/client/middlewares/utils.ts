import { BACKEND_URL } from '../redux/constants';
import store from '../redux/store';

import { handleKeyPress } from '../redux/actions';

export const getUrl = (path: string): string =>
  path.startsWith('/') ? `${BACKEND_URL}${path}` : `${BACKEND_URL}/${path}`;

export const getEmitStringFromType = (type: keyType | null = null) => {
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

// two next function untested, too many level of abstraction
// might wanna split. Fucking jest makes tdd too hard to do
export const setWindowEvents = () => {
  const emitter = (type: keyType) => store.dispatch(handleKeyPress(type));
  const listener = handleKeyDown(emitter);
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
