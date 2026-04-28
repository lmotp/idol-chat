/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_REST_API?: string;
  readonly REACT_APP_KAKAO_REST_API?: string;
  readonly VITE_SOCKET_URL?: string;
  readonly REACT_APP_SOCKET_URL?: string;
  readonly VITE_USE_MOCKS?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
