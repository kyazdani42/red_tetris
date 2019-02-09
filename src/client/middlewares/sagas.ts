import { delay } from 'redux-saga';
import { all, call, put, select, take } from 'redux-saga/effects';
import * as io from 'socket.io-client';

import { AppState } from '../reducers/app';
import { State } from '../store';

import { resetKey, setGameData, setSocket } from '../actions/actions';
import {
  CREATE_ROOM,
  JOIN_ROOM,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_SPACE,
  KEY_UP,
  LEAVE_ROOM,
  START_GAME
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
    call(emitSocketSaga),
    call(emitStartGame)
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

function* emitStartGame() {
  while (yield take(START_GAME)) {
    const socket = yield select((state: State) => state.app.socket);
    socket.emit('start');
  }
}

function* emitSocketSaga() {
  let action;
  while (action = yield take([KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_SPACE])) {
    const socket = yield select((state: State) => state.app.socket);
    switch (action.type) {
      case KEY_UP:
        socket.emit('rotate');
        break;
      case KEY_DOWN:
        socket.emit('moveDown');
        break;
      case KEY_LEFT:
        socket.emit('moveLeft');
        break;
      case KEY_RIGHT:
        socket.emit('moveRight');
        break;
      case KEY_SPACE:
        socket.emit('goDown');
        break;
    }
    yield delay(60);
    yield put(resetKey());
  }
}
