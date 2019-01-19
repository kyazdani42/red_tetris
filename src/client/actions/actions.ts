import { Action, ActionFunctionAny, createAction } from 'redux-actions';
import { RoomType } from '../types';
import { CHANGE_PAGE, CREATE_ROOM, HANDLE_JOIN_ROOM, SET_ROOMS, SET_SELECTED_ROOM } from './constants';

export const setRooms: ActionFunctionAny<Action<RoomType[]>> = createAction(SET_ROOMS);
export const setSelectedRoom: ActionFunctionAny<Action<RoomType>> = createAction(SET_SELECTED_ROOM);
export const handleJoinRoom: ActionFunctionAny<Action<undefined>> = createAction(HANDLE_JOIN_ROOM);

export const changePage: ActionFunctionAny<Action<any>> = createAction(CHANGE_PAGE);
export const createRoom: ActionFunctionAny<Action<undefined>> = createAction(CREATE_ROOM);
