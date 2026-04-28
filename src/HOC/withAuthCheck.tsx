import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '@/stores/useAppStore';
import type { AuthUser } from '@/types/domain/user';
import type { ComponentType } from 'react';

type InjectedAuthProps = {
  user?: AuthUser;
};

export const withAuthCheck = (
  WrapComponents: ComponentType<InjectedAuthProps & Record<string, unknown>>,
  isAdmin: boolean | null = false,
) => {
  const AuthCheckFunc = (props: Record<string, unknown>) => {
    const user = useAppStore((state) => state.user);
    const fetchUser = useAppStore((state) => state.fetchUser);
    const navigate = useNavigate();

    useEffect(() => {
      let mounted = true;

      const checkAuth = async () => {
        const result = await fetchUser();

        if (!mounted) {
          return;
        }

        if (!result?.loginSuccess && isAdmin) {
          navigate('/');
          return;
        }

        if (result?.loginSuccess && isAdmin === null) {
          navigate('/pages/home');
        }
      };

      void checkAuth();

      return () => {
        mounted = false;
      };
    }, [fetchUser, isAdmin, navigate]);

    return <WrapComponents {...props} user={user.result} />;
  };
  return <AuthCheckFunc />;
};
