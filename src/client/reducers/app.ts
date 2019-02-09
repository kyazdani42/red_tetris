import { Action, handleActions } from 'redux-actions';

export interface AppState {
  playerName: string;
  socket: SocketIOClient.Socket;
  rooms: RoomType[];
  gameData: GameProps | null;
}

const initialState: AppState = {
  playerName: 'whatever',
  socket: null as any,
  rooms: [],
  gameData: null,
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
      socket: payload || null as any
    }),
    CREATE_ROOM: (state: AppState, { payload }: Action<any>): AppState => ({
      ...state,
      playerName: payload
    }),
  },
  initialState
);

export default reducer;
