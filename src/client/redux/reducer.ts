import { Action, handleActions } from 'redux-actions';
import { getDataFromCookie, setCookie } from './cookieUtils';

export interface AppState {
  playerName: string | null;
  socket: SocketIOClient.Socket;
  rooms: RoomType[];
  musicPlaying: boolean;
  gameData: GameProps | null;
  error: string | null;
  modal: boolean;
  key: keyType | null;
  options: Options;
  token: string | null;
}

const { playerName, token } = getDataFromCookie();

const initialState: AppState = {
  playerName,
  token,
  modal: false,
  socket: null as any,
  rooms: [],
  gameData: null,
  key: null,
  musicPlaying: true,
  error: null,
  options: {
    reverse: false,
    mirror: false,
    invisible: false,
    speed: false
  },
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
      playerName: payload,
      modal: false
    }),
    SET_KEY: (state: AppState, { payload }: Action<keyType>): AppState => ({
      ...state,
      key: payload || null
    }),
    SET_PLAYER_NAME: (state: AppState, { payload }: Action<string>): AppState => ({
      ...state,
      playerName: payload || null
    }),
    SET_MUSIC_PLAYING: (state: AppState): AppState => ({
      ...state,
      musicPlaying: !state.musicPlaying
    }),
    SET_OPTIONS: (state: AppState, { payload }: Action<Options>): AppState => ({
      ...state,
      options: payload || state.options
    }),
    SET_TOKEN: (state: AppState, { payload }: Action<string>): AppState => {
      setCookie(state.playerName as string, payload as string);
      return {
        ...state,
        token: payload as string
      };
    },
    SET_ERROR: (state: AppState, { payload }: Action<string | null>): AppState => ({
      ...state,
      error: payload || null
    }),
    SET_MODAL: (state: AppState, { payload }: Action<boolean>): AppState => ({
      ...state,
      modal: payload || false
    })
  },
  initialState
);

export default reducer;
