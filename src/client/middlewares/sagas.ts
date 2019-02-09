import { all, call, put, select, take } from 'redux-saga/effects';
import * as io from 'socket.io-client';

import { AppState } from '../reducers/app';
import { State } from '../store';

import { setGameData, setSocket } from '../actions/actions';
import {
  CREATE_ROOM,
  JOIN_ROOM,
  LEAVE_ROOM,
} from '../actions/constants';
import { initGameSocket, initHomeSocket } from './socketListeners';
import { request } from './utils';

export default function* rootSaga() {
  const socket: SocketIOClient.Socket = io.connect('http://localhost:3000/');
  initHomeSocket(socket);
  yield all([
    call(createRoomSaga),
    call(leaveRoomSaga),
    call(joinRoomSaga),
  ]);
}

function* leaveRoomSaga() {
  while (yield take(LEAVE_ROOM)) {
    const socket: AppState['socket'] = yield select((state: State) => state.app.socket);
    if (socket) {
      socket.emit('leaveRoom');
      yield put(setSocket(null));
      yield put(setGameData(null));
    }
  }
}

function* joinRoomSaga() {
  let action;
  while (action = yield take(JOIN_ROOM)) {
    const socket: SocketIOClient.Socket = io(`http://localhost:3000/${action.payload}`);
    initGameSocket(socket);
    yield put(setSocket(socket));
  }
}

function* createRoomSaga() {
  while (yield take(CREATE_ROOM)) {
    const data = yield request('/createRoom', 'POST');
    const socket: SocketIOClient.Socket = io(`http://localhost:3000/${data.gameName}`);
    initGameSocket(socket);
    yield put(setSocket(socket));
  }
}
