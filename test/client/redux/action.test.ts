// tslint:disable
import * as actions from '../../../src/client/actions/actions';
import { SET_ROOMS, CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, SET_SOCKET } from '../../../src/client/actions/constants';

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
})
