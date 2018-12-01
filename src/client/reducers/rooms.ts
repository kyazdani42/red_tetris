import { handleActions, Action } from 'redux-actions';
import { RoomType } from '../types';

export interface RoomReducerType {
  rooms: RoomType[];
  selectedRoom: RoomType | null;
}

const initialState: RoomReducerType = {
  rooms: [],
  selectedRoom: null 
}

const reducer = handleActions<any>(
  {
    SET_ROOMS: (state: RoomReducerType, { payload }: Action<RoomType[]>) => ({
      ...state,
      rooms: payload || state.rooms
    }),
    SET_SELECTED_ROOM: (state: RoomReducerType, { payload }: Action<RoomType>) => ({
      ...state,
      selectedRoom: payload || null
    }),
  },
  initialState
)

export default reducer;
