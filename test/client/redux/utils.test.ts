// tslint:disable
import { getEmitStringFromType, getUrl } from '../../../src/client/middlewares/utils';
import { BACKEND_URL } from '../../../src/client/redux/constants';

describe('testing getUrl', () => {
  it('tests the concatenation when path starts with /', () => {
    const path = '/lala';
    const expected = BACKEND_URL + path;
    const url = getUrl(path);
    expect(url).toEqual(expected);
  })
  it('tests the concatenation when path doesn\'t start with /', () => {
    const path = 'lala';
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
