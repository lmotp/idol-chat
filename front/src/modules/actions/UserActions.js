export const USER_CHECK = 'USER_CHECK';
export const USER_SUCCESS_CHECK = 'USER_SUCCESS_CHECK';
export const USER_FAIL_CHECK = 'USER_FAIL_CHECK';

export const userCheckActions = () => ({
  type: USER_CHECK,
});

export const userSuccessCheck = (result) => ({
  type: USER_SUCCESS_CHECK,
  result,
});

export const userFailCheck = (error) => ({
  type: USER_FAIL_CHECK,
  error,
});
