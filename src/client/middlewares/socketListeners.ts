import * as io from 'socket.io-client';

import { setGameData, setRooms, setSocket, setToken } from '../redux/actions';
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
    console.log(data);
  });
};

export const initGameSocket = (socket: SocketIOClient.Socket) => {
  socket.on('updateGame', (data: GameProps) => {
    store.dispatch(setGameData(data));
  });
  socket.on('token', (token: string) => {
    store.dispatch(setToken(token));
  });
};

export const joinTheRoom = (room: string, playerName: string, token: string | null) => {
  const url = getUrl(room);
  const gameSocket: SocketIOClient.Socket = io(url, {
    query: { playerName, token }
  });
  initGameSocket(gameSocket);
  store.dispatch(setSocket(gameSocket));
};
