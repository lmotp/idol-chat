import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
