// tslint:disable
jest.mock('../../../src/client/redux/store.ts')
import { setWindowEvents, getEmitStringFromType, getUrl, handleKeyDown } from '../../../src/client/middlewares/utils';
import { BACKEND_URL } from '../../../src/client/redux/constants';

describe('testing getUrl', () => {
  it('tests the concatenation when path starts with /', () => {
    const path = '/test';
    const expected = BACKEND_URL + path;
    const url = getUrl(path);
    expect(url).toEqual(expected);
  })
  it('tests the concatenation when path doesn\'t start with /', () => {
    const path = 'test';
    const expected = BACKEND_URL + '/' + path;
    const url = getUrl(path);
    expect(url).toEqual(expected);
  })
});

describe('testing getEmitStringFromType', () => {
  it('return goDown when key is space', () => {
    expect(getEmitStringFromType(' ')).toEqual('goDown');
  });
  it('return moveDown when key is down', () => {
    expect(getEmitStringFromType('down')).toEqual('moveDown');
  });
  it('return rotate when key is up', () => {
    expect(getEmitStringFromType('up')).toEqual('rotate');
  });
  it('return moveLeft when key is left', () => {
    expect(getEmitStringFromType('left')).toEqual('moveLeft');
  });
  it('return moveRight when key is right', () => {
    expect(getEmitStringFromType('right')).toEqual('moveRight');
  });
  it('return an empty string when key is null', () => {
    expect(getEmitStringFromType(null)).toEqual('');
  });
})

describe('test setWindowEvents', () => {
  it('calls the spies', () => {
    const fn1 = jest.fn();
    const window = { addEventListener: jest.fn() };
    const listener = setWindowEvents(fn1, window);
    expect(fn1).not.toHaveBeenCalled();
    expect(window.addEventListener).toHaveBeenCalledWith('keydown', listener);
  })
})

describe('testing handleKeyDown', () => {
  const emitter = jest.fn();
  const keyDown = handleKeyDown(emitter);
  it('calls the emitter with space', () => {
    keyDown({ key: ' ' });
    expect(emitter).toHaveBeenCalledWith(' ');
  })
  it('calls the emitter with up', () => {
    keyDown({ key: 'ArrowUp' });
    expect(emitter).toHaveBeenCalledWith('up');
  })
  it('calls the emitter with down', () => {
    keyDown({ key: 'ArrowDown' });
    expect(emitter).toHaveBeenCalledWith('down');
  })
  it('calls the emitter with left', () => {
    keyDown({ key: 'ArrowLeft' });
    expect(emitter).toHaveBeenCalledWith('left');
  })
  it('calls the emitter with right', () => {
    keyDown({ key: 'ArrowRight' });
    expect(emitter).toHaveBeenCalledWith('right');
  })
})
