import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userCheckActions } from '../modules/actions/UserActions';

export const withAuthCheck = (WrapComponents, isAdmin = false) => {
  const AuthCheckFunc = (props) => {
    const user = useSelector((state) => state.userCheckReducers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(userCheckActions());
      if (!user.result?.loginSuccess) {
        // 로그인이 안됬을때
        if (isAdmin) {
          // 로그인이 필요한 페이지일때
          navigate('/');
        }
      } else if (isAdmin === null) {
        //로그인 됬을때 회원가입이나 로그인일때 메인페이지로 돌아가기
        navigate('/pages/home');
      }
    }, [dispatch]);

    return <WrapComponents {...props} user={user} />;
  };
  return <AuthCheckFunc />;
};
