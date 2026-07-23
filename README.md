# KICK QUIZ

**Toss Mini App — 매일매일 축구 퀴즈**

축구 덕후력을 매일 갱신하는 토스 미니앱. 퀴즈 풀고, 응원하고, 간식박스 열자.

---

## 기능

| 탭 | 기능 | 설명 |
|---|---|---|
| 홈 | 오늘의 퀴즈 (4문항) | 초급2+고급2, O/X 스와이프, 1일 1회, 정답 100P/오답 50P |
| 홈 | 승부차기 | 50% 확률, 결과 무관 100P, 1일 1회 |
| 홈 | 오늘의 축구 역사 TMI | 퀴즈 완료 후 노출, 무보상 |
| 홈 | 스트릭 | 연속 출석 보상 (7일/30일/100일) |
| 응원 | 매치 캘린더 | K리그 일정, 구단 컬러 배지 |
| 응원 | 응원하기 | 경기당 1회, 10P |
| 응원 | MVP 맞히기 | 경기 후 투표, 정답 20P |
| 간식박스 | P 모아서 박스 오픈 | 500P 소모, 1일 1회, 실물 경품 |
| 설정 | 프로필, 알림, 친구 초대, 데이터 초기화 | |

**Post-MVP**: 주간 챌린지, 친구 초대 시스템

---

## 프로젝트 구조

```
ai/
├── README.md                     # 프로젝트 개요
├── dashboard.html                # 파이프라인 대시보드 UI
├── agents/                       # 12개 AI 에이전트 역할 지침
│   ├── plan-lead.md / plan-specifier.md
│   ├── frontend-lead.md / frontend-developer.md
│   ├── backend-lead.md / backend-developer.md
│   ├── logic-lead.md / logic-engineer.md
│   ├── qa-lead.md / security-engineer.md
│   └── doc-lead.md / doc-writer.md
├── frontend/                     # React + Vite 프론트엔드 (KICK QUIZ 앱)
│   ├── index.html                # 단독 실행용 entry
│   ├── src/
│   │   ├── App.tsx               # 라우트 (3탭 구조)
│   │   ├── main.tsx              # ReactDOM entry
│   │   ├── data.ts               # 문제 DB (245문항), 구단 컬러 매핑
│   │   ├── types.ts              # 타입 정의
│   │   ├── index.css             # Toss 디자인 시스템 기반 스타일
│   │   ├── pages/
│   │   │   ├── HomePage.tsx      # 홈 탭 (퀴즈, 승부차기, 스트릭)
│   │   │   ├── MatchPage.tsx     # 응원 탭 (매치, MVP)
│   │   │   └── PrizePage.tsx     # 간식박스 탭 (리워드)
│   │   └── components/
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/                      # Express + TypeScript API 서버 (Post-MVP)
│   ├── src/
│   │   ├── index.ts              # 서버 엔트리
│   │   ├── routes/               # API 라우트
│   │   ├── services/             # 비즈니스 로직
│   │   └── test/                 # API 테스트
│   ├── tsconfig.json
│   └── package.json
├── server/dashboard.mjs          # 파이프라인 상태 대시보드 (port 8787)
├── docs/
│   ├── PRD.md                    # 제품 요구사항 v3
│   ├── features.md               # 기능 명세 v3
│   ├── platform-architecture.md  # Toss 미니앱 아키텍처 분석
│   ├── toss-submission-draft.md  # Toss 미니앱 센터 제출 문서
│   └── setup-guide.md            # 초기 설정 가이드
└── ops/state.json                # 파이프라인 상태 관리
```

---

## 실행 방법

### 전체 프로젝트

```bash
# 1. 프론트엔드 개발 서버 (KICK QUIZ 앱)
cd frontend && npm install && npm run dev
# → http://localhost:5173

# 2. 백엔드 API 서버 (Post-MVP)
cd backend && npm install && npm run dev
# → http://localhost:3000

# 3. 파이프라인 대시보드
node server/dashboard.mjs
# → http://localhost:8787
```

### 앱 단독 실행 (HTML)

```bash
cd frontend && npm install && npm run build && npm run preview
# → http://localhost:4173
```

또는 `frontend/dist/` 폴더를 정적 서버에 배포.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| **프레임워크** | React 18, TypeScript |
| **빌드** | Vite 6 |
| **스타일링** | Tailwind CSS / Toss 디자인 시스템 (#3182F6) |
| **로컬 데이터 (MVP)** | localStorage (5개 키) |
| **백엔드 (Post-MVP)** | Express 4, tsx |
| **대시보드** | Vanilla JS, Node.js http |
| **호스팅 타겟** | Toss 미니앱 센터 (웹뷰) |

---

## MVP 아키텍처

```
[사용자] → Toss 앱 → 미니앱 런처 → 웹뷰 → KICK QUIZ (React SPA)
                                                   │
                                                   ▼
                                            localStorage
                                          (문제/점수/스트릭)

서버 없음. 모든 데이터는 JS 번들 + localStorage.
Post-MVP에서 Express API 서버 추가 가능.
```