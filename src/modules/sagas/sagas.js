import { put, call, takeEvery } from 'redux-saga/effects';
import { userSuccessCheck, userFailCheck } from '../actions/UserActions';
import { USER_CHECK } from '../actions/UserActions';
import api from '../api';

//로그인 사가
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

//모임 사가

export default rootSaga;
