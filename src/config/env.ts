const env = import.meta.env;

export const socketUrl = env.VITE_SOCKET_URL ?? env.REACT_APP_SOCKET_URL ?? globalThis.location?.origin ?? '';
export const kakaoRestApi = env.VITE_KAKAO_REST_API ?? env.REACT_APP_KAKAO_REST_API ?? '';
