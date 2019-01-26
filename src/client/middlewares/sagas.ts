import { all, call, put, select, take } from 'redux-saga/effects';
import * as io from 'socket.io-client';

import { State } from '../reducers/rooms';

import { setSocket } from '../actions/actions';
import { CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM } from '../actions/constants';
import { request } from './utils';

export default function* rootSaga() {
  yield all([
    call(createRoomSaga),
    call(leaveRoomSaga),
    call(joinRoomSaga)
  ]);
}

function* createRoomSaga() {
  while (yield take(CREATE_ROOM)) {
    const data = yield request('/room', 'POST');
    const socket: SocketIOClient.Socket = io(`http://localhost:3000/${data.newRoomName}`);
    yield put(setSocket(socket));
  }
}

function* leaveRoomSaga() {
  while (yield take(LEAVE_ROOM)) {
    const socket: State['socket'] = yield select((state: any) => state.room.socket);
    if (socket) {
      socket.emit('disconnect');
      yield put(setSocket(null));
    }
  }
}

function* joinRoomSaga() {
  let action;
  while (action = yield take(JOIN_ROOM)) {
    const socket: SocketIOClient.Socket = io(`http://localhost:3000/${action.payload}`);
    yield put(setSocket(socket));
  }
}
