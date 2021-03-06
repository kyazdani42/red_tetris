import { Action, handleActions } from 'redux-actions';
import { getDataFromCookie, setCookie } from './cookieUtils';

export interface AppState {
  playerName: string | null;
  socket: SocketIOClient.Socket;
  scores: BestScore[] | null;
  rooms: RoomType[];
  musicPlaying: boolean;
  playerScore: BestScore | null;
  gameData: GameProps | null;
  error: string | null;
  joinModal: boolean;
  createModal: boolean;
  key: keyType | null;
  options: Options;
  token: string | null;
}

const { playerName, token } = getDataFromCookie();

const initialState: AppState = {
  playerName,
  token,
  joinModal: false,
  createModal: false,
  scores: null,
  playerScore: null,
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
      socket: payload || (null as any)
    }),
    CREATE_ROOM: (state: AppState, { payload }: Action<any>): AppState => ({
      ...state,
      playerName: payload,
      createModal: false
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
    SET_CREATE_MODAL: (state: AppState, { payload }: Action<boolean>): AppState => ({
      ...state,
      createModal: payload || false
    }),
    SET_JOIN_MODAL: (state: AppState, { payload }: Action<boolean>): AppState => ({
      ...state,
      joinModal: payload || false
    }),
    SET_SCORES: (state: AppState, { payload }: Action<BestScore[]>): AppState => ({
      ...state,
      scores: payload || null
    }),
    SET_PLAYER_SCORE: (state: AppState, { payload }: Action<BestScore | null>): AppState => ({
      ...state,
      playerScore: payload || null
    })
  },
  initialState
);

export default reducer;
