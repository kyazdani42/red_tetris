import { all, call, take } from 'redux-saga/effects';

import { CHANGE_PAGE, CREATE_ROOM } from '../actions/constants';

export default function* rootSaga() {
  do {
    yield all([
      call(createRoomSaga)
    ]);
  } while (take(CHANGE_PAGE));
}

const request = (url: string, method: string): Promise<any> => {
  return fetch(`http://localhost:3000${url}`, {
    method,
    credentials: 'include'
  }).then(res => {
    console.log(res);
    return res.json()
  });
}

function* createRoomSaga() {
  while (yield take(CREATE_ROOM)) {
    console.log(1)
    const data = yield request('/room', 'POST');
    console.log(data);
  }
}