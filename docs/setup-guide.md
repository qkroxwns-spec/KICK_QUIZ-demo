# KICK QUIZ — 개발 환경 설정 가이드

## 사전 요구사항

- **Node.js** 18.x 이상 (LTS 권장)
- **npm** 9.x 이상 (Node.js에 포함)
- Windows / macOS / Linux 모두 지원

## 빠른 시작

### 1. 저장소 클론 및 이동

```bash
git clone <repo-url>
cd ai
```

### 2. 프론트엔드 (KICK QUIZ 앱)

```bash
cd frontend
npm install          # 의존성 설치 (React, Vite)
npm run dev          # 개발 서버 시작
# → http://localhost:5173
```

### 3. 백엔드 API (선택, Post-MVP)

```bash
cd backend
npm install          # 의존성 설치 (Express, TypeScript)
npm run dev          # tsx watch 로 핫-리로드
# → http://localhost:3000
```

### 4. 파이프라인 대시보드

```bash
node server/dashboard.mjs
# → http://localhost:8787
```

---

## 명령어 정리

| 워크스페이스 | 명령어 | 설명 |
|---|---|---|
| `frontend/` | `npm run dev` | 개발 서버 시작 (port 5173) |
| `frontend/` | `npm run build` | 프로덕션 배포용 정적 빌드 → `dist/` |
| `frontend/` | `npm run preview` | 빌드된 정적 파일 미리보기 (port 4173) |
| `backend/` | `npm run dev` | 백엔드 핫-리로드 개발 (port 3000) |
| `backend/` | `npm run build` | TypeScript 컴파일 → `dist/` |
| `backend/` | `npm start` | 컴파일된 JS 서버 실행 |
| 루트 | `node server/dashboard.mjs` | 파이프라인 상태 대시보드 (port 8787) |

---

## 프로젝트 구조 (개발 관점)

| 디렉토리 | 역할 | 주요 파일 |
|---|---|---|
| `frontend/` | KICK QUIZ 앱 (React) | `src/App.tsx`, `src/data.ts` (245문항), `src/pages/` (3탭) |
| `backend/` | API 서버 (Express) | `src/index.ts`, `src/routes/` |
| `server/` | 파이프라인 대시보드 | `dashboard.mjs` |
| `dashboard.html` | 대시보드 UI | 정적 HTML |
| `docs/` | 기획서/문서 | PRD, 기능 명세, 아키텍처, 제출문 |
| `agents/` | AI 에이전트 지침 | 12개 역할 파일 |
| `ops/` | 파이프라인 상태 | `state.json` |

## 트러블슈팅

### `npm install` 실패 시

```bash
rm -rf node_modules package-lock.json  # macOS/Linux
# 또는
Remove-Item -Recurse -Force node_modules, package-lock.json  # Windows

npm install
```

### 포트 충돌 (5173 / 3000 / 8787)

```bash
# 포트 사용 중인 프로세스 확인 후 kill
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### TypeScript 빌드 에러

```bash
cd frontend
npx tsc --noEmit     # 타입 체크만 실행 (빌드 없이)
```

### localStorage 초기화

1. 앱 설정 > 데이터 초기화 버튼 사용 (권장)
2. 또는 브라우저 DevTools > Application > Storage > localStorage > Clear

### Vite 웹뷰 사이즈 테스트

```bash
cd frontend
npm run dev -- --host 0.0.0.0
# 모바일 기기로 같은 네트워크 > IP:5173 접속
```