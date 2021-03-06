import { USER_SUCCESS_CHECK, USER_FAIL_CHECK } from '../actions/UserActions';

const userInfo = {};

const userCheckReducers = (state = userInfo, action) => {
  switch (action.type) {
    case USER_SUCCESS_CHECK:
      return {
        ...state,
        result: action.result,
      };
    case USER_FAIL_CHECK:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userCheckReducers;
