import * as io from 'socket.io-client';

import { setGameData, setRooms, setSocket } from '../actions/actions';
import store from '../store';
import { getUrl } from './utils';

export const initHomeSocket = (socket: SocketIOClient.Socket) => {
  socket.on('games', (data: any) => {
    store.dispatch(setRooms(data.games));
  });
  socket.on('gameName', (data: { gameName: string, playerName: string }) => {
    const { gameName, playerName } = data;
    const url = getUrl(gameName);
    const gameSocket: SocketIOClient.Socket = io(url, {
      query: { playerName }
    });
    initGameSocket(gameSocket);
    store.dispatch(setSocket(gameSocket));
  });
};

export const initGameSocket = (socket: SocketIOClient.Socket) => {
  socket.on('updateGame', (data: GameProps) => {
    store.dispatch(setGameData(data));
  });
};
