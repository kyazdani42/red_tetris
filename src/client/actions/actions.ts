import { Action, ActionFunctionAny, createAction } from 'redux-actions';

import { AppState } from '../reducers/app';

import {
  CREATE_ROOM,
  HANDLE_KEY_PRESS,
  JOIN_ROOM,
  LEAVE_ROOM,
  SET_GAME_DATA,
  SET_KEY,
  SET_OPTIONS,
  SET_PLAYER_NAME,
  SET_ROOMS,
  SET_SOCKET,
} from '../constants';

export const setRooms: ActionFunctionAny<Action<RoomType[]>> = createAction(SET_ROOMS);

export const createRoom: ActionFunctionAny<Action<string>> = createAction(CREATE_ROOM);
export const joinRoom: ActionFunctionAny<Action<undefined>> = createAction(JOIN_ROOM);
export const leaveRoom: ActionFunctionAny<Action<undefined>> = createAction(LEAVE_ROOM);

export const setSocket: ActionFunctionAny<Action<SocketIOClient.Socket>> = createAction(SET_SOCKET);

export const setGameData: ActionFunctionAny<Action<GameProps>> = createAction(SET_GAME_DATA);
export const setKey: ActionFunctionAny<Action<keyType>> = createAction(SET_KEY);
export const handleKeyPress: ActionFunctionAny<Action<keyType>> = createAction(HANDLE_KEY_PRESS);

export const setPlayerName: ActionFunctionAny<Action<string>> = createAction(SET_PLAYER_NAME);
export const setOptions: ActionFunctionAny<Action<AppState['options']>> = createAction(SET_OPTIONS);
