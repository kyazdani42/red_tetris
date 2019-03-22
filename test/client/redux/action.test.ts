// tslint:disable
import * as actions from '../../../src/client/redux/actions';
import { SET_ROOMS, CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, SET_SOCKET, SET_KEY, HANDLE_KEY_PRESS, SET_PLAYER_NAME, SET_OPTIONS, SET_TOKEN, SET_MUSIC_PLAYING, SET_ERROR, SET_MODAL } from '../../../src/client/redux/constants';

describe('testing action creators', () => {
  it('tests setRooms', () => {
    const expected = {
      type: SET_ROOMS,
      payload: []
    };
    expect(actions.setRooms([])).toEqual(expected);
  });
  it('tests createRoom', () => {
    const expected = {
      type: CREATE_ROOM,
      payload: 'test'
    };
    expect(actions.createRoom('test')).toEqual(expected);
  });
  it('tests joinRoom', () => {
    const expected = {
      type: JOIN_ROOM,
    };
    expect(actions.joinRoom()).toEqual(expected);
  });
  it('tests leaveRoom', () => {
    const expected = {
      type: LEAVE_ROOM,
    };
    expect(actions.leaveRoom()).toEqual(expected);
  });
  it('tests setSocket', () => {
    const expected = {
      type: SET_SOCKET,
      payload: null
    };
    expect(actions.setSocket(null)).toEqual(expected);
  });
  it('tests setGameData', () => {
    const expected = {
      type: SET_SOCKET,
      payload: {} 
    };
    expect(actions.setSocket({})).toEqual(expected);
  });
  it('tests setKey', () => {
    const expected = {
      type: SET_KEY,
      payload: 'key'
    };
    expect(actions.setKey('key')).toEqual(expected);
  });
  it('tests handleKeyPress', () => {
    const expected = {
      type: HANDLE_KEY_PRESS,
      payload: 'keyPress'
    };
    expect(actions.handleKeyPress('keyPress')).toEqual(expected);
  });
  it('tests setPlayerName', () => {
    const expected = {
      type: SET_PLAYER_NAME,
      payload: 'playername'
    };
    expect(actions.setPlayerName('playername')).toEqual(expected);
  });
  it('tests setOptions', () => {
    const expected = {
      type: SET_OPTIONS,
      payload: {}
    };
    expect(actions.setOptions({})).toEqual(expected);
  });
  it('tests setToken', () => {
    const expected = {
      type: SET_TOKEN,
      payload: 'token'
    };
    expect(actions.setToken('token')).toEqual(expected);
  });
  it('tests setMusicPlaying', () => {
    const expected = { type: SET_MUSIC_PLAYING }
    expect(actions.setMusicPlaying()).toEqual(expected);
  });
  it('tests setError', () => {
    const expected = {
      type: SET_ERROR,
      payload: 'error'
    };
    expect(actions.setError('error')).toEqual(expected);
  });
  it('tests setModal', () => {
    const expected = {
      type: SET_MODAL,
      payload: true
    };
    expect(actions.setModal(true)).toEqual(expected);
  });
})
