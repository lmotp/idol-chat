import React, { useEffect, type ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { OverlayProvider } from 'overlay-kit';
import { queryClient } from '@/app/queryClient';
import { AppErrorFallback } from '@/components/AppErrorBoundary';
import Loading from '@/components/Loading';
import { GlobalStyles } from '@/design-system/GlobalStyles';
import { theme } from '@/design-system/theme';
import useAppStore from '@/stores/useAppStore';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  const fetchUser = useAppStore((state) => state.fetchUser);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <OverlayProvider>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallback={({ error, reset }) => <AppErrorFallback error={error} onRetry={reset} />}
            >
              <Suspense fallback={<Loading />}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </OverlayProvider>
    </ThemeProvider>
  );
}
