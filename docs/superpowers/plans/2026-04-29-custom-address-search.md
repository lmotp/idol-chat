# 커스텀 주소 검색 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 카카오 맵/로컬 API 의존을 제거하고, 현재 위치 버튼은 유지한 채 회원가입과 모임 생성에서 커스텀 주소 검색 모달을 사용하게 만든다.

**Architecture:** 주소 검색과 현재 위치 처리를 각각 작은 계층으로 분리한다. 클라이언트는 `AddressApi`만 알고, 실제 구현은 Supabase Edge Function을 통해 Nominatim을 호출하는 방식으로 숨긴다. UI는 `LocationModal`이 직접 렌더링하고, `SignUp`과 `MakeClass`는 같은 주소 선택 흐름을 공유한다.

**Tech Stack:** React 18, TypeScript, Vite, Supabase Edge Functions, browser Geolocation API, Emotion, GitHub Pages

---

### Task 1: 주소 공급자와 타입 계층 만들기

**Files:**
- Create: `src/types/domain/address.ts`
- Create: `src/services/address/addressApi.ts`
- Create: `supabase/functions/_shared/cors.ts`
- Create: `supabase/functions/address-search/index.ts`
- Create: `supabase/functions/address-reverse/index.ts`
- Modify: `src/vite-env.d.ts`

- [ ] **Step 1: 주소 검색/역지오코딩 타입을 먼저 정의한다**

```ts
export interface AddressSuggestion {
  id: string;
  label: string;
  roadAddress?: string;
  jibunAddress?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressApi {
  search(query: string): Promise<AddressSuggestion[]>;
  reverse(latitude: number, longitude: number): Promise<string | null>;
}
```

- [ ] **Step 2: Supabase Edge Function으로 검색/역지오코딩 프록시를 만든다**

검색은 `address-search`, 역지오코딩은 `address-reverse`로 분리한다. 두 함수는 공통 CORS 헬퍼를 공유하고, Nominatim 응답을 클라이언트 친화적인 형태로 정규화한다.

```ts
// supabase/functions/_shared/cors.ts
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, authorization, x-client-info, apikey",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};
```

```ts
// supabase/functions/address-reverse/index.ts
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const { latitude, longitude } = await req.json();

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        "User-Agent": "idol-chat-address-search",
        Accept: "application/json",
      },
    },
  );

  const raw = await response.json();
  const address = raw?.display_name ?? null;

  return new Response(JSON.stringify({ address }), {
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
});
```

```ts
// supabase/functions/address-search/index.ts
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const query = url.searchParams.get("query") ?? "";

  if (!query.trim()) {
    return new Response(JSON.stringify([]), { headers: { ...corsHeaders, "content-type": "application/json" } });
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=10&q=${encodeURIComponent(query)}`,
    {
      headers: {
        "User-Agent": "idol-chat-address-search",
        Accept: "application/json",
      },
    },
  );

  const raw = await response.json();
  const normalized = Array.isArray(raw)
    ? raw.map((item) => ({
        id: String(item.place_id),
        label: item.display_name,
        roadAddress: item.address?.road ?? "",
        jibunAddress: item.address?.suburb ?? item.address?.city_district ?? "",
        latitude: Number(item.lat),
        longitude: Number(item.lon),
      }))
    : [];

  return new Response(JSON.stringify(normalized), {
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
});
```

- [ ] **Step 3: 클라이언트에서 쓸 주소 API 래퍼를 만든다**

```ts
// src/services/address/addressApi.ts
import { supabase } from "@/app/supabaseClient";
import type { AddressApi, AddressSuggestion } from "@/types/domain/address";

export const addressApi: AddressApi = {
  async search(query) {
    const { data, error } = await supabase.functions.invoke<AddressSuggestion[]>("address-search", {
      body: { query },
    });

    if (error) throw error;
    return data ?? [];
  },
  async reverse(latitude, longitude) {
    const { data, error } = await supabase.functions.invoke<{ address: string | null }>("address-reverse", {
      body: { latitude, longitude },
    });

    if (error) throw error;
    return data?.address ?? null;
  },
};
```

- [ ] **Step 4: 카카오용 env 타입을 제거하고 남은 클라이언트 env를 정리한다**

```ts
interface ImportMetaEnv {
  readonly VITE_USE_MOCKS?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}
```

- [ ] **Step 5: 타입체크로 새 계층이 깨지지 않는지 확인한다**

Run: `npx tsc --noEmit --pretty false`
Expected: 새 타입과 Supabase 함수 래퍼가 문법적으로 문제 없고, 남은 Kakao 참조는 다음 Task에서 정리될 준비 상태가 된다.

---

### Task 2: 커스텀 주소 검색 모달 만들기

**Files:**
- Modify: `src/components/Modal/LocationModal.tsx`
- Create: `src/components/Modal/LocationSearchItem.tsx`
- Create: `src/components/Modal/LocationSearchEmpty.tsx`
- Create: `src/components/Modal/LocationModal.styles.ts`

- [ ] **Step 1: 모달 입력/결과/로딩 상태를 커스텀 UI로 분리한다**

`LocationModal`은 이제 카카오 팝업을 띄우는 래퍼가 아니라, 직접 검색 폼과 결과 목록을 렌더링한다.

```tsx
type LocationModalProps = {
  setNowLocation: (value: string) => void;
  onClose?: () => void;
  onUseCurrentLocation: () => Promise<void>;
};

const [query, setQuery] = useState("");
const [results, setResults] = useState<AddressSuggestion[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

- [ ] **Step 2: 검색 제출 시 addressApi.search를 호출한다**

```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const next = await addressApi.search(query);
    setResults(next);
  } catch (err) {
    setError("주소를 불러오지 못했습니다.");
  } finally {
    setLoading(false);
  }
};
```

- [ ] **Step 3: 결과 선택과 취소 동작을 구현한다**

```tsx
const handleSelect = (item: AddressSuggestion) => {
  setNowLocation(item.label);
  setResults([]);
  onClose?.();
};
```

결과가 없을 때는 빈 상태를 보여주고, 취소를 누르면 현재 입력값은 유지한 채 모달만 닫는다.

- [ ] **Step 4: 현재 위치 버튼과 같은 시각 언어를 맞춘다**

`LocationModal.styles.ts`에는 결과 리스트, 빈 상태, 버튼 영역만 둔다. 입력, 리스트, 버튼이 한 파일에서 섞이지 않도록 분리한다.

- [ ] **Step 5: 브라우저에서 모달이 열리고 선택 UI가 보이는지 확인한다**

Run: `npm run build`
Expected: 모달이 새 UI를 렌더링하고 결과 리스트/빈 상태가 컴파일 단계에서 문제 없이 연결된다.

---

### Task 3: 현재 위치 버튼 흐름을 공통 훅으로 분리하기

**Files:**
- Create: `src/hooks/useCurrentLocation.ts`
- Modify: `src/components/Modal/LocationModal.tsx`

- [ ] **Step 1: 위치 권한과 주소 변환을 담당하는 훅을 만든다**

```ts
export const useCurrentLocation = () => {
  const resolveCurrentLocation = async (): Promise<string> => {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });

    const address = await addressApi.reverse(position.coords.latitude, position.coords.longitude);
    if (!address) {
      throw new Error("현재 위치를 주소로 변환하지 못했습니다.");
    }

    return address;
  };

  return { resolveCurrentLocation };
};
```

- [ ] **Step 2: LocationModal에서 현재 위치 버튼을 이 훅으로 연결한다**

```tsx
const { resolveCurrentLocation } = useCurrentLocation();

const handleCurrentLocation = async () => {
  const address = await resolveCurrentLocation();
  setNowLocation(address);
};
```

- [ ] **Step 3: 권한 거부/실패 메시지를 사용자에게 보여준다**

현재 위치가 실패해도 모달은 유지하고, 주소 검색은 계속 사용할 수 있게 한다.

```tsx
catch {
  setError("현재 위치를 가져오지 못했습니다. 직접 주소를 검색해 주세요.");
}
```

- [ ] **Step 4: 브라우저에서 현재 위치 버튼이 입력칸을 채우는지 확인한다**

Run: `npm run build`
Expected: 현재 위치 흐름이 모달 UI와 분리된 채로 동작한다.

---

### Task 4: 회원가입/모임 생성 화면에 공통 주소 레이어를 연결하고 카카오 흔적을 제거하기

**Files:**
- Modify: `src/pages/SignUp.tsx`
- Modify: `src/pages/MakeClass.tsx`
- Modify: `src/config/env.ts` or delete it if 비어 있으면
- Modify: `README.md`
- Modify: `.github/workflows/pages.yml`
- Modify: `src/vite-env.d.ts`
- Delete: `src/config/env.ts` if Kakao 관련 값만 남아 있으면
- Remove: any remaining Kakao-specific imports from `src/pages/SignUp.tsx`, `src/pages/MakeClass.tsx`, `src/components/Modal/LocationModal.tsx`

- [ ] **Step 1: SignUp과 MakeClass가 같은 주소 모달을 열도록 바꾼다**

```tsx
overlay.open(({ isOpen, close, unmount }) => (
  <Modal open={isOpen} onClose={close} onExit={unmount} ariaLabel="현재 위치 선택">
    <LocationModal
      setNowLocation={setNowLocation}
      onClose={close}
      onUseCurrentLocation={handleCurrentLocation}
    />
  </Modal>
));
```

- [ ] **Step 2: Kakao 관련 import와 상수를 제거한다**

`kakaoRestApi`를 읽는 코드는 전부 삭제하고, `LocationModal` 내부도 `addressApi`만 보게 만든다.

```ts
// before
import { kakaoRestApi } from "@/config/env";

// after
import { addressApi } from "@/services/address/addressApi";
```

- [ ] **Step 3: 배포 워크플로에서 Kakao secret 주입을 제거한다**

```yml
- name: Build
  env:
    VITE_USE_MOCKS: "false"
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
  run: npm run build
```

- [ ] **Step 4: README에서 Kakao 키 설명을 지우고 새 주소 흐름을 적는다**

문서에는 이제 다음만 남긴다.
- 커스텀 주소 검색 모달
- 현재 위치 버튼 유지
- Supabase Edge Function 기반 주소 변환

- [ ] **Step 5: 필요하면 GitHub repo secret `VITE_KAKAO_REST_API`를 삭제한다**

이 단계는 실제 배포가 정상 동작한 뒤에만 진행한다. 저장소 시크릿을 삭제하는 외부 작업이므로, 실행 전 사용자 확인이 필요하다.

- [ ] **Step 6: 저장소 전체에서 Kakao 문자열이 남아 있지 않은지 확인한다**

Run: `rg -n "Kakao|kakao|REACT_APP_" src README.md .github/workflows`
Expected: 주소 입력과 배포에서 더 이상 Kakao 관련 문자열이 나오지 않는다.

---

### Task 5: 브라우저 검증과 최종 정리

**Files:**
- None new; verify the files changed above

- [ ] **Step 1: 타입체크와 빌드를 다시 통과시킨다**

Run: `npx tsc --noEmit --pretty false && npm run build`
Expected: 실패 없이 통과하고, 번들에 Kakao 참조가 남지 않는다.

- [ ] **Step 2: 브라우저에서 회원가입과 모임 생성 흐름을 직접 확인한다**

확인 순서:
1. `/signup`에서 주소 모달 열기
2. 주소 검색 결과 선택
3. 현재 위치 버튼으로 입력칸 채우기
4. `/pages/class/make`에서 같은 흐름 반복

- [ ] **Step 3: 변경사항을 커밋한다**

```bash
git add src supabase/functions README.md .github/workflows/pages.yml
git commit -m "refactor: 카카오 없이 주소 검색 전환"
```
