import { applyMiddleware, createStore } from 'redux';
import { userCheckReducers } from '../reducer/UserReducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(userCheckReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
