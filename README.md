# idol-chat

아이돌을 좋아하고, 덕질을 좋아하는 사람들을 위한 모임 및 채팅 서비스입니다.

## 기술 스택

- Frontend: React 18, Vite, TypeScript, Emotion
- 상태 관리: Zustand, TanStack Query
- 데이터 요청: Axios, TanStack Query, Supabase JS
- 실시간 통신: Supabase Realtime
- Backend: Supabase Auth, Postgres, Storage

## 실행 환경

- Node.js: `22.12.0` 이상
- npm: `10` 이상

## 설치

```bash
npm install
```

## 실행

### 개발 환경

```bash
npm run dev
```

- Frontend only: `http://localhost:5173`
- 서버 없이 MSW mock API가 활성화되어 로그인, 목록, 모임 흐름을 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

### 빌드 결과 미리보기

```bash
npm run preview
```

## 환경 변수

### 클라이언트

- `VITE_KAKAO_REST_API` 또는 `REACT_APP_KAKAO_REST_API`: 카카오 로컬 API 키
- `VITE_USE_MOCKS`: `true`면 프론트에서 MSW mock API를 활성화합니다. 기본값은 개발 모드에서 `true`입니다.
- `VITE_SUPABASE_URL`: Supabase 프로젝트 URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key

클라이언트는 현재 `VITE_` 접두어를 우선 사용하고, 호환을 위해 `REACT_APP_`도 함께 읽습니다.

## 폴더 구조

```text
src/
  app/                # QueryClient, Providers
  components/         # 공통 UI 컴포넌트
  config/             # 환경 변수 브리지
  design-system/      # 테마와 공통 스타일
  hooks/              # 커스텀 훅
  layouts/            # 공통 레이아웃
  pages/              # 라우트 페이지
  modules/            # 기존 Redux / Saga 로직
server/
  routes/             # API 라우트
  models/             # MongoDB 스키마
  middleware/         # 인증 등 공통 미들웨어
```

## 참고 사항

- 현재 프론트엔드는 Vite 기반으로 동작합니다.
- 공통 스타일은 `src/design-system/styles`에 모아 두었습니다.
- `src/css` 폴더는 더 이상 사용하지 않습니다.
- 실시간 채팅은 Supabase Realtime을 사용합니다.
- 개발 중에는 서버 없이 프런트만 확인하려면 `npm run dev`를 사용합니다.

## 배포

- GitHub Actions가 `main` 브랜치 push 시 `npm ci` → 타입체크 → 빌드 → GitHub Pages 배포를 수행합니다.
- GitHub Pages용 SPA fallback은 `dist/404.html`로 처리합니다.

## 메모

- 로그인, 회원가입, 모임, 채팅 기능이 중심입니다.
- 서버 로직은 Supabase 기반으로 옮겨졌고, 기존 MongoDB 데이터는 무시해도 됩니다.
