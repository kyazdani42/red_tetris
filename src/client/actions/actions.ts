import { Action, ActionFunctionAny, createAction } from 'redux-actions';

import { GameProps, RoomType } from '../types';
import {
  CREATE_ROOM,
  JOIN_ROOM,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_SPACE,
  KEY_UP,
  LEAVE_ROOM,
  RESET_KEY,
  SET_GAME_DATA,
  SET_ROOMS,
  SET_SOCKET
} from './constants';

export const setRooms: ActionFunctionAny<Action<RoomType[]>> = createAction(SET_ROOMS);

export const createRoom: ActionFunctionAny<Action<string>> = createAction(CREATE_ROOM);
export const joinRoom: ActionFunctionAny<Action<undefined>> = createAction(JOIN_ROOM);
export const leaveRoom: ActionFunctionAny<Action<undefined>> = createAction(LEAVE_ROOM);

export const setSocket: ActionFunctionAny<Action<SocketIOClient.Socket>> = createAction(SET_SOCKET);

export const setGameData: ActionFunctionAny<Action<GameProps>> = createAction(SET_GAME_DATA);

export const keyUp: ActionFunctionAny<Action<undefined>> = createAction(KEY_UP);
export const keyDown: ActionFunctionAny<Action<undefined>> = createAction(KEY_DOWN);
export const keyLeft: ActionFunctionAny<Action<undefined>> = createAction(KEY_LEFT);
export const keyRight: ActionFunctionAny<Action<undefined>> = createAction(KEY_RIGHT);
export const keySpace: ActionFunctionAny<Action<undefined>> = createAction(KEY_SPACE);
export const resetKey: ActionFunctionAny<Action<undefined>> = createAction(RESET_KEY);
