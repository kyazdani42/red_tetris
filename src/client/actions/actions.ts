import { Action, ActionFunctionAny, createAction } from 'redux-actions';

import { RoomType } from '../types';
import {
  CREATE_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
  SET_ROOMS,
  SET_SELECTED_ROOM,
  SET_SOCKET
} from './constants';

export const setRooms: ActionFunctionAny<Action<RoomType[]>> = createAction(SET_ROOMS);
export const setSelectedRoom: ActionFunctionAny<Action<RoomType>> = createAction(SET_SELECTED_ROOM);

export const createRoom: ActionFunctionAny<Action<string>> = createAction(CREATE_ROOM);
export const joinRoom: ActionFunctionAny<Action<undefined>> = createAction(JOIN_ROOM);
export const leaveRoom: ActionFunctionAny<Action<undefined>> = createAction(LEAVE_ROOM);

export const setSocket: ActionFunctionAny<Action<SocketIOClient.Socket>> = createAction(SET_SOCKET);
