import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userCheckActions } from '../modules/actions/UserActions';

export const WithAuthCheck = (WrapComponents) => {
  const AuthCheckFunc = (props) => {
    const user = useSelector((state) => state);
    console.log(user, '테스트');
    console.log(props);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(userCheckActions());
    }, [dispatch]);

    return <WrapComponents {...props} />;
  };
  return AuthCheckFunc();
};
