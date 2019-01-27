import { setRooms } from '../actions/actions';
import store from '../store';

export const initHomeSocket = (socket: SocketIOClient.Socket) => {
  socket.on('rooms', (data: any) => {
    store.dispatch(setRooms(data.rooms));
  });
};
