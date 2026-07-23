# 초대 시스템 실현 가능성 분석

## Toss 정책
- Toss 앱 내 공유하기 API 존재 (URL 공유)
- 사용자간 초대링크: Toss 자체 초대코드 시스템(toss.im/invite/...) 사용 가능
- Toss 미니앱에서 다른 사용자 식별: Toss 내부 userId 참조 가능 (접근 권한 범위 확인 필요)

## 기술적 구현 (MVP)

### Option A: 링크 공유 (간단)
- 앱 내 초대코드 생성: `kickquiz-{사용자ID}-{랜덤4자리}`
- URL: `https://toss.im/share?text=KICK+QUIZ+함께하세요!&url=...`
- code=Toss 공유API로 친구에 전송
- 상대가 앱 열면 초대코드 자동 인식 → localStorage에 `invitedBy` 저장
- 문제점: 앱 설치 없이 웹뷰이므로 쿠키/세션 공유 어려움

### Option B: Toss 미니앱 초대 파라미터
- Toss 미니앱 URL에 `?invite=CODE` 파라미터 전달
- 앱 진입 시 파라미터 읽어서 localStorage 저장
- 초대한 사람: 코드 생성 시 `inviteCode` 저장
- 초대받은 사람: 첫 진입 시 `invitedBy` 저장 + 300P 지급
- 초대한 사람: 친구가 앱 실행 시 추가 300P 지급
- 문제점: 동일인 중복 초대 방지 로직 필요, Toss 정책 확인 필요

### Option C: 추후 서버 기반
- Express API에 `/invite/create`, `/invite/claim` 엔드포인트
- 서버에서 고유 코드 관리, 중복 방지
- Post-MVP 고려

## 리스크
1. Toss 미니앱 간 사용자 식별 정책 불명확
2. 중복/자기초대 방지 어려움 (localStorage 기반)
3. 초대 보상으로 인한 포인트 인플레이션

## 결론
- **MVP**: Option B (URL 파라미터)로 1차 구현 가능
- **검증 필요**: Toss 미니앱 URL 파라미터 전달 지원 여부, 사용자 식별 범위
- **대안**: MVP에서는 초대 시스템 제외하고, Toss 배포 후 정책 확인 후 추가
