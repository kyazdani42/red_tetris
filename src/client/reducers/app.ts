import { Action, handleActions } from 'redux-actions';
import { GameProps, RoomType } from '../types';

export interface AppState {
  playerName: string;
  socket: SocketIOClient.Socket | null;
  rooms: RoomType[];
  gameData: GameProps | null;
  key: 'up' | 'down' | 'left' | 'right' | ' ' | null;
}

const initialState: AppState = {
  playerName: 'whatever',
  socket: null,
  rooms: [],
  gameData: null,
  key: null
};

const reducer = handleActions<any>(
  {
    SET_ROOMS: (state: AppState, { payload }: Action<RoomType[]>): AppState => ({
      ...state,
      rooms: payload || state.rooms
    }),
    SET_GAME_DATA: (state: AppState, { payload }: Action<GameProps>): AppState => ({
      ...state,
      gameData: payload || null
    }),
    SET_SOCKET: (state: AppState, { payload }: Action<SocketIOClient.Socket>): AppState => ({
      ...state,
      socket: payload || null
    }),
    CREATE_ROOM: (state: AppState, { payload }: Action<any>): AppState => ({
      ...state,
      playerName: payload
    }),
    KEY_UP: (state: AppState): AppState => ({
      ...state,
      key: 'up'
    }),
    KEY_DOWN: (state: AppState): AppState => ({
      ...state,
      key: 'down'
    }),
    KEY_LEFT: (state: AppState): AppState => ({
      ...state,
      key: 'left'
    }),
    KEY_RIGHT: (state: AppState): AppState => ({
      ...state,
      key: 'right'
    }),
    KEY_SPACE: (state: AppState): AppState => ({
      ...state,
      key: ' '
    }),
    RESET_KEY: (state: AppState): AppState => ({
      ...state,
      key: null
    })
  },
  initialState
);

export default reducer;
