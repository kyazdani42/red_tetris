import { Action } from 'redux-actions';
import { delay } from 'redux-saga';
import { all, call, put, select, take, throttle } from 'redux-saga/effects';
import * as io from 'socket.io-client';

import { AppState } from '../redux/reducer';
import { State } from '../redux/store';

import { setGameData, setKey, setPlayerName, setSocket } from '../redux/actions';
import {
  CREATE_ROOM,
  GET_SCORES,
  HANDLE_KEY_PRESS,
  JOIN_ROOM,
  LEAVE_ROOM,
} from '../redux/constants';
import { initHomeSocket, joinTheRoom } from './socketListeners';
import { getEmitStringFromType, getSetWindowEvents, getUrl } from './utils';

export default function* rootSaga() {
  const url = getUrl('/');
  const socket: SocketIOClient.Socket = io.connect(url);
  initHomeSocket(socket);
  yield all([
    call(createRoomSaga, socket),
    call(scoreSaga, socket),
    call(leaveRoomSaga),
    call(joinRoomSaga),
    call(keyPressHandler),
    call(handleKeyDownListeners)
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
    const { room, playerName } = action.payload;
    yield put(setPlayerName(playerName));
    const token = yield select((state: State) => state.app.token);
    joinTheRoom(room, playerName, token);
  }
}

function* createRoomSaga(homeSocket: SocketIOClient.Socket) {
  let action;
  while (action = yield take(CREATE_ROOM)) {
    const playerName = action.payload;
    yield put(setPlayerName(playerName));
    homeSocket.emit('createRoom');
  }
}

function* scoreSaga(homeSocket: SocketIOClient.Socket) {
  while (yield take(GET_SCORES)) {
    homeSocket.emit('getScores');
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

function* handleKeyDownListeners() {
  while (yield take([CREATE_ROOM, JOIN_ROOM])) {
    const listener = getSetWindowEvents();
    yield take(LEAVE_ROOM);
    window.removeEventListener('keydown', listener);
  }
}
