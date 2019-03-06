import { BACKEND_URL } from '../constants';
import store from '../store';

import { handleKeyPress } from '../actions/actions';

export const request = async (path: string, method: string): Promise<any> => {
  const url = getUrl(path);
  const response = await fetch(url, {
    method,
    mode: 'cors'
  });
  return response.json();
};

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
