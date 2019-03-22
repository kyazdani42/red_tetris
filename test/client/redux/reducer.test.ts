// tslint:disable
import * as actions from '../../../src/client/redux/actions';
import reducer from '../../../src/client/redux/reducer';

describe('testing reducer', () => {
  const initialState = {
    playerName: 'tester',
    socket: null,
    error: null,
    rooms: [],
    gameData: null,
    key: null,
    musicPlaying: false,
    options: {
      reverse: false,
      mirror: false,
      invisible: false,
      speed: false
    },
    token: null
  };
  it('returns the initialState with the new rooms', () => {
    const state = { ...initialState, rooms: ['test', 'test'] };
    const nextState = reducer(state, actions.setRooms([]))
    const expected = { ...state, rooms: [] };
    expect(nextState).toEqual(expected);
  })
  it('returns the initialState when new rooms are null', () => {
    const state = { ...initialState, rooms: ['test', 'test'] };
    const nextState = reducer(state, actions.setRooms(null))
    expect(nextState).toEqual(state);
  })
  it('returns the initialState with the new gameData', () => {
    const state = { ...initialState, gameData: { test: 'test' } };
    const nextState = reducer(state, actions.setGameData({}))
    const expected = { ...state, gameData: {} };
    expect(nextState).toEqual(expected);
  })
  it('returns the initialState when new rooms as null if new rooms are undefined or null', () => {
    const state = { ...initialState, gameData: { test: 'test' } };
    const nextState = reducer(state, actions.setGameData(undefined))
    const expected = { ...initialState, gameData: null };
    expect(nextState).toEqual(expected);
  })
  it('returns the initialState with the new socket', () => {
    const state = initialState;
    const nextState = reducer(state, actions.setSocket('test'))
    const expected = { ...state, socket: 'test' };
    expect(nextState).toEqual(expected);
  })
  it('returns the initialState with a null socket if socket is undefined or null', () => {
    const state = { ...initialState, socket: 'socket' };
    const nextState = reducer(state, actions.setSocket(undefined))
    const expected = { ...state, socket: null };
    expect(nextState).toEqual(expected);
  })
  it('returns the initialState with the new playerName', () => {
    const state = { ...initialState, playerName: null };
    const nextState = reducer(state, actions.createRoom('test'))
    const expected = { ...state, playerName: 'test' };
    expect(nextState).toEqual(expected);
  })
  it('returns the initialState with the key set', () => {
    const state = { ...initialState, key: null };
    const nextState = reducer(state, actions.setKey('up'))
    const expected = { ...state, key: 'up' };
    expect(nextState).toEqual(expected);
  })
  it('returns the initialState with the token', () => {
    const state = initialState;
    const nextState = reducer(state, actions.setToken('token'))
    const expected = { ...state, token: 'token' };
    expect(nextState).toEqual(expected);
  })
  it('returns the initialState with the options', () => {
    const state = initialState;
    const newOptions = {
      reverse: true,
      mirror: false,
      invisible: true,
      speed: false
    };
    const nextState = reducer(state, actions.setOptions(newOptions))
    const expected = { ...state, options: newOptions };
    expect(nextState).toEqual(expected);
  })
  it('toggles music playing', () => {
    const state = initialState;
    const nextState = reducer(state, actions.setMusicPlaying());
    const expected = { ...state, musicPlaying: true };
    expect(nextState).toEqual(expected);
  })
  it('set an error in the state', () => {
    const state = initialState;
    const nextState = reducer(state, actions.setError('testerror'));
    const expected = { ...state, error: 'testerror' };
    expect(nextState).toEqual(expected);
  })
});
