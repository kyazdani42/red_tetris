import { Action, ActionFunctionAny, createAction } from 'redux-actions';

import { AppState } from './reducer';

import {
  CREATE_ROOM,
  GET_SCORES,
  HANDLE_KEY_PRESS,
  JOIN_ROOM,
  LEAVE_ROOM,
  SET_ERROR,
  SET_GAME_DATA,
  SET_KEY,
  SET_MODAL,
  SET_MUSIC_PLAYING,
  SET_OPTIONS,
  SET_PLAYER_NAME,
  SET_ROOMS,
  SET_SOCKET,
  SET_TOKEN,
} from './constants';

export const setRooms: ActionFunctionAny<Action<RoomType[]>> = createAction(SET_ROOMS);

export const createRoom: ActionFunctionAny<Action<string>> = createAction(CREATE_ROOM);
export const joinRoom: ActionFunctionAny<Action<undefined>> = createAction(JOIN_ROOM);
export const leaveRoom: ActionFunctionAny<Action<undefined>> = createAction(LEAVE_ROOM);
export const setModal: ActionFunctionAny<Action<boolean>> = createAction(SET_MODAL);

export const setSocket: ActionFunctionAny<Action<SocketIOClient.Socket>> = createAction(SET_SOCKET);

export const setGameData: ActionFunctionAny<Action<GameProps>> = createAction(SET_GAME_DATA);
export const setKey: ActionFunctionAny<Action<keyType>> = createAction(SET_KEY);
export const handleKeyPress: ActionFunctionAny<Action<keyType>> = createAction(HANDLE_KEY_PRESS);

export const setPlayerName: ActionFunctionAny<Action<string>> = createAction(SET_PLAYER_NAME);
export const setError: ActionFunctionAny<Action<string | null>> = createAction(SET_ERROR);
export const setOptions: ActionFunctionAny<Action<AppState['options']>> = createAction(SET_OPTIONS);
export const setToken: ActionFunctionAny<Action<string>> = createAction(SET_TOKEN);
export const setMusicPlaying: ActionFunctionAny<Action<undefined>> = createAction(SET_MUSIC_PLAYING);

export const getScores: ActionFunctionAny<Action<undefined>> = createAction(GET_SCORES);
