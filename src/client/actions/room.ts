import { createAction, Action, ActionFunctionAny } from 'redux-actions';
import { RoomType } from '../types';
import { SET_ROOMS, SET_SELECTED_ROOM, HANDLE_JOIN_ROOM } from './constants';

export const setRooms: ActionFunctionAny<Action<RoomType[]>> = createAction(SET_ROOMS);
export const setSelectedRoom: ActionFunctionAny<Action<RoomType>> = createAction(SET_SELECTED_ROOM);
export const handleJoinRoom: ActionFunctionAny<Action<undefined>> = createAction(HANDLE_JOIN_ROOM);