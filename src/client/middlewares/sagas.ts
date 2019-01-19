import { all, call, put, take } from 'redux-saga/effects';
import * as io from 'socket.io-client';

import { setSocket } from '../actions/actions';
import { CHANGE_PAGE, CREATE_ROOM } from '../actions/constants';
import { request } from './utils';

export default function* rootSaga() {
  do {
    yield all([
      call(createRoomSaga)
    ]);
  } while (take(CHANGE_PAGE));
}

function* createRoomSaga() {
  while (yield take(CREATE_ROOM)) {
    const data = yield request('/room', 'POST');
    const socket: SocketIOClient.Socket = io(`http://localhost:3000/${data.newRoomName}`);
    yield put(setSocket(socket));
  }
}
