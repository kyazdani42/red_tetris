import { Action, handleActions } from 'redux-actions';
import { RoomType } from '../types';

export interface State {
  playerName: string;
  socket: SocketIOClient.Socket | null;
  rooms: RoomType[];
  selectedRoom: RoomType | null;
}

const initialState: State = {
  playerName: 'whatever',
  socket: null,
  rooms: [],
  selectedRoom: null
};

const reducer = handleActions<any>(
  {
    SET_ROOMS: (state: State, { payload }: Action<RoomType[]>): State => ({
      ...state,
      rooms: payload || state.rooms
    }),
    SET_SELECTED_ROOM: (state: State, { payload }: Action<RoomType>): State => ({
      ...state,
      selectedRoom: payload || null
    }),
    SET_SOCKET: (state: State, { payload }: Action<SocketIOClient.Socket>): State => ({
      ...state,
      socket: payload || null
    })
  },
  initialState
);

export default reducer;
