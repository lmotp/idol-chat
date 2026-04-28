const env = import.meta.env;

export const kakaoRestApi = env.VITE_KAKAO_REST_API ?? env.REACT_APP_KAKAO_REST_API ?? '';
