import { put, call, takeLatest } from 'redux-saga/effects';
import { userSuccessCheck, userFailCheck } from '../actions/UserActions';
import { USER_CHECK } from '../actions/UserActions';
import api from '../api';

function* fecherUser() {
  try {
    console.log(api.loginCheck);
    const { data } = yield call(api.loginCheck);

    yield put(userSuccessCheck(data));
  } catch (error) {
    yield put(userFailCheck(error));
  }
}

export function* rootSaga() {
  yield takeLatest(USER_CHECK, fecherUser);
}
