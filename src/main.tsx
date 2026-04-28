import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { installApiBridge } from '@/app/apiBridge';
import { AppProviders } from '@/app/AppProviders';
import { useMockApi } from '@/config/mock';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('root element not found');
}

const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
  );
};

const bootstrap = async () => {
  installApiBridge();

  if (useMockApi) {
    const { worker } = await import('@/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      quiet: true,
    });
  }

  renderApp();
};

void bootstrap();
