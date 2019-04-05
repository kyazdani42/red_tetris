import * as io from 'socket.io-client';

import { setGameData, setPlayerScore, setRooms, setScores, setSocket, setToken } from '../redux/actions';
import store from '../redux/store';
import { getUrl } from './utils';

export const initHomeSocket = (socket: SocketIOClient.Socket) => {
  socket.on('games', (data: any) => {
    store.dispatch(setRooms(data.games));
  });
  socket.on('gameName', (data: { gameName: string }) => {
    const { gameName } = data;
    const { playerName, token } = store.getState().app;
    joinTheRoom(gameName, playerName as string, token);
  });
  socket.on('scores', (data: BestScore[]) => {
    store.dispatch(setScores(data));
  });
  socket.on('playerScore', (data: BestScore) => {
    store.dispatch(setPlayerScore(data));
  });
};

export const joinTheRoom = (room: string, playerName: string, token: string | null) => {
  const url = getUrl(room);
  token = token || '';
  playerName = playerName || '';
  const gameSocket: SocketIOClient.Socket = io(url, {
    query: { playerName, token }
  });
  initGameSocket(gameSocket);
  store.dispatch(setSocket(gameSocket));
};

export const initGameSocket = (socket: SocketIOClient.Socket) => {
  socket.on('updateGame', (data: GameProps) => {
    store.dispatch(setGameData(data));
  });
  socket.on('token', (token: string) => {
    store.dispatch(setToken(token));
  });
  socket.on('playerScore', (data: BestScore) => {
    store.dispatch(setPlayerScore(data));
  });
};
