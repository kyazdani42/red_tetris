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

export const getSetWindowEvents = () =>
  setWindowEvents((type: keyType) => store.dispatch(handleKeyPress(type)), window);

export const setWindowEvents = (emitter: (type: keyType) => void, window: any) => {
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
