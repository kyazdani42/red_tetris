import { setRooms } from '../actions/actions';
import store from '../store';

export const initHomeSocket = (socket: SocketIOClient.Socket) => {
  socket.on('games', (data: any) => {
    console.log(data);
    store.dispatch(setRooms(data.games));
  });
};
