import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './middlewares/sagas';
import app, { AppState } from './reducers/app';

export interface State {
  app: AppState;
}

const reducers = combineReducers<State>({
  app
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
