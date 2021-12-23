import { put, call, takeEvery } from 'redux-saga/effects';
import { userSuccessCheck, userFailCheck } from '../actions/UserActions';
import { USER_CHECK } from '../actions/UserActions';
import api from '../api';

function* fecherUser() {
  try {
    const { data } = yield call(api.loginCheck);

    yield put(userSuccessCheck(data));
  } catch (error) {
    yield put(userFailCheck(error));
  }
}

function* rootSaga() {
  yield takeEvery(USER_CHECK, fecherUser);
}

export default rootSaga;
