# 기능 로드맵 — KICK QUIZ v5

## Phase 1: 승부예측

| 항목 | 상세 |
|------|------|
| 위치 | 응원탭 매치 카드 하단 |
| 방식 | 매치당 승/무/패 버튼, 킥오프 전까지 선택 |
| 보상 | 적중 +30P / 오답 +5P (참여보상) |
| 제약 | 1경기 1회, 주간 TOP3 표시 |
| 데이터 | admin.html에서 score 결과 입력시 자동 정산 |
| 개발 | app/index.html cheer 탭 확장, 예측 상태 localStorage 저장 |

## Phase 2: 주간 챌린지

| 항목 | 상세 |
|------|------|
| 요일 | 매주 일요일 |
| 방식 | 8문제 (초급4+고급4), 상위 10% 보상 |
| 보상 | 참여 50P / 상위 10% +500P + 특별칭호 |
| 큐레이션 | 일요일 시드 별도 (`seed+10000`), 전체 QUIZ에서 8문항 |
| UI | 홈탭에 일요일 뱃지, 카운트다운 타이머 |

## Phase 3: 크롤러 시스템

| 항목 | 상세 |
|------|------|
| 대상 | EPL/UCL 경기 일정 + 결과 |
| 방식 | `server/crawler.mjs` — node-cron + cheerio |
| 주기 | 주 1회 자동 실행 → `matches.json` 저장 |
| fallback | 크롤링 실패시 수동 admin.html 유지 |
| 데이터 | 리그 공개 일정만 (저작권 침해 없음) |
| 법률 | 해시(보안)·페이지(법률) 검토 완료 |

## 개발 일정 (예상)
```
승부예측  ─── 2일 (앱 + admin 연동)
주간챌린지 ── 3일 (앱 + 보상 + UI)
크롤러    ─── 2일 (crawler.mjs + 스케줄러)
통합테스트 ── 1일
```

## 용량/성능 참고
```
app/index.html: 28KB (단일파일)
questionBank.json: 6.5KB
express.mjs: 2.1KB
dashboard.mjs: 1.8KB
admin.html: 6.8KB
```
