import { Action, handleActions } from 'redux-actions';

export interface AppState {
  playerName: string | null;
  socket: SocketIOClient.Socket;
  rooms: RoomType[];
  gameData: GameProps | null;
  key: keyType | null;
  options: Options;
}

const initialState: AppState = {
  playerName: null,
  socket: null as any,
  rooms: [],
  gameData: null,
  key: null,
  options: {
    reverse: false,
    mirror: false,
    invisible: false,
    speed: false
  }
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
    SET_KEY: (state: AppState, { payload }: Action<keyType>): AppState => ({
      ...state,
      key: payload || null
    }),
    SET_PLAYER_NAME: (state: AppState, { payload }: Action<string>): AppState => ({
      ...state,
      playerName: payload || null
    }),
    SET_OPTIONS: (state: AppState, { payload }: Action<Options>): AppState => ({
      ...state,
      options: payload || state.options
    })
  },
  initialState
);

export default reducer;
