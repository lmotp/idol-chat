import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BackBar from '@/components/BackBar';
import { apiClient } from '@/app/apiClient';
import { supabase, hasSupabaseConfig } from '@/app/supabaseClient';
import { AuthButton, AuthButtonWrap, Form, Input, InputWrap, Label } from '@/design-system/styles/FormStyle';
import useAppStore from '@/stores/useAppStore';
import type { AuthResponse } from '@/types/domain/user';

const GotoSingUp = styled.div`
  font-size: 12px;
  color: rgb(181, 181, 181);
`;

const SignUpValue = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  color: rgb(111, 111, 111);
`;

const LoginContainer = styled.section`
  width: 100%;
  height: 100vh;
`;

const DEFAULT_PROFILE_IMG = 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240';

const ErrorContent = styled.div<{ error?: string }>`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  height: 20px;
  visibility: ${({ error }) => (error ? 'visible' : 'hidden')};
`;

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const setUser = useAppStore((state) => state.setUser);

  const normalizeEmail = (value: string) => value.trim().replace(/^["']+|["']+$/g, '');

  const loginFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const info = {
      email: normalizeEmail(emailRef.current?.value ?? ''),
      password: passwordRef.current?.value ?? '',
    };
    const email = info.email;

    if (!info.email.length) {
      return setErrorMessage('이메일을 입력해주세요');
    }

    if (!info.password.length) {
      return setErrorMessage('비밀번호를 입력해주세요');
    }

    const signIn = async () => {
      if (hasSupabaseConfig && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword(info);

        if (error || !data.user) {
          throw error ?? new Error('로그인에 실패했습니다.');
        }

        if (data.session) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          });

          if (sessionError) {
            throw sessionError;
          }
        }

        let profile = await supabase
          .from('profiles')
          .select('id,email,nickname,profileimg,myself,gender,location,first_category,category,login_time')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profile.error) {
          throw profile.error;
        }

        if (!profile.data) {
          const payload = {
            id: data.user.id,
            email,
            nickname: data.user.user_metadata?.nickname ?? email.split('@')[0] ?? '사용자',
            profileimg: data.user.user_metadata?.profileimg ?? DEFAULT_PROFILE_IMG,
            myself: data.user.user_metadata?.myself ?? '안녕하세요? 잘 부탁드립니다',
            gender: data.user.user_metadata?.gender ?? 'nothing',
            location: data.user.user_metadata?.location ?? '',
            first_category: false,
            category: ['전체'],
            login_time: new Date().toISOString(),
          };

          const { error: upsertError } = await supabase.from('profiles').upsert(payload);
          if (upsertError) {
            throw upsertError;
          }

          profile = await supabase
            .from('profiles')
            .select('id,email,nickname,profileimg,myself,gender,location,first_category,category,login_time')
            .eq('id', data.user.id)
            .single();

          if (profile.error || !profile.data) {
            throw profile.error ?? new Error('프로필을 찾을 수 없습니다.');
          }
        }

        const response: AuthResponse = {
          loginSuccess: true,
          _id: profile.data.id,
          email: profile.data.email,
          nickname: profile.data.nickname,
          profileimg: profile.data.profileimg ?? DEFAULT_PROFILE_IMG,
          profileImg: profile.data.profileimg ?? DEFAULT_PROFILE_IMG,
          myself: profile.data.myself ?? '',
          gender: profile.data.gender ?? 'nothing',
          location: profile.data.location ?? '',
          category: profile.data.category ?? ['전체'],
          firstCategory: Boolean(profile.data.first_category),
          loginTime: profile.data.login_time ?? new Date().toISOString(),
        };

        setUser(response);
        if (!response.firstCategory) {
          navigate('/category');
        } else {
          navigate('/pages/home');
        }
        return;
      }

      apiClient
        .post<AuthResponse>('/api/auth/login', info)
        .then(({ data }) => {
          if (data.loginSuccess) {
            setUser(data);
            if (!data.firstCategory) {
              navigate('/category');
            } else {
              navigate('/pages/home');
            }
          }
        })
        .catch(({ response }: { response?: { data?: { message?: string } } }) => {
          setErrorMessage(response?.data?.message ?? '로그인에 실패했습니다.');
        });
    };

    void signIn().catch((error: unknown) => {
      const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      setErrorMessage(message);
    });
  };

  return (
    <LoginContainer>
      <BackBar title="로그인" />
      <Form onSubmit={loginFunc}>
        <InputWrap>
          <Label htmlFor="email">이메일</Label>
          <Input type="text" id="email" placeholder="이메일을 입력해주세요." ref={emailRef}></Input>
        </InputWrap>

        <InputWrap>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            autoComplete="off"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            ref={passwordRef}
          ></Input>
        </InputWrap>

        <ErrorContent error={errorMessage}>{`* ${errorMessage}`}</ErrorContent>

        <AuthButtonWrap mt={'0'}>
          <AuthButton color="black">로그인하기</AuthButton>

          <GotoSingUp>
            아직 회원이 아니신가요?
            <Link to="/signup">
              <SignUpValue>회원가입</SignUpValue>
            </Link>
          </GotoSingUp>
        </AuthButtonWrap>
      </Form>
    </LoginContainer>
  );
};

export default Login;
