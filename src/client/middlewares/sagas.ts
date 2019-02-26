import { Action } from 'redux-actions';
import { delay } from 'redux-saga';
import { all, call, put, select, take, throttle } from 'redux-saga/effects';
import * as io from 'socket.io-client';

import { AppState } from '../reducers/app';
import { State } from '../store';

import { setGameData, setKey, setSocket } from '../actions/actions';
import {
  CREATE_ROOM,
  HANDLE_KEY_PRESS,
  JOIN_ROOM,
  LEAVE_ROOM,
} from '../actions/constants';
import { initGameSocket, initHomeSocket } from './socketListeners';
import { getEmitStringFromType, getUrl, request } from './utils';

export default function* rootSaga() {
  const url = getUrl('/');
  const socket: SocketIOClient.Socket = io.connect(url);
  initHomeSocket(socket);
  yield all([
    call(createRoomSaga),
    call(leaveRoomSaga),
    call(joinRoomSaga),
    call(keyPressHandler)
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
    const url = getUrl(action.payload);
    const socket: SocketIOClient.Socket = io(url);
    initGameSocket(socket);
    yield put(setSocket(socket));
  }
}

function* createRoomSaga() {
  while (yield take(CREATE_ROOM)) {
    const data = yield request('/createRoom', 'POST');
    const url = getUrl(data.gameName);
    const socket: SocketIOClient.Socket = io(url);
    initGameSocket(socket);
    yield put(setSocket(socket));
  }
}

function* keyPressHandler() {
  yield throttle(100, HANDLE_KEY_PRESS, performKeyPress);
}

function* performKeyPress(action: Action<keyType>) {
  const { payload } = action;
  const socket: AppState['socket'] = yield select((state: State) => state.app.socket);
  if (socket) {
    socket.emit(getEmitStringFromType(payload));
  }
  yield put(setKey(payload));
  yield delay(80);
  yield put(setKey(null));
}
