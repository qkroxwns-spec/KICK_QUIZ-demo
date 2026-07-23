# KICK QUIZ — Manual Test Script (v2)

환경: Toss 미니앱 웹뷰 (375x812 기준), Chrome 개발자 도구
목표: logic.js + UI + storage 검증

## 1. Quiz Flow
**ID:** TC-001
**조건:** 홈→퀴즈 시작
**동작:** 퀴즈 4문제 정답 선택
**기대:** 정답 100P×4 지급 (total +400P), "오늘의 축구 역사" 표시
**실패 시 재현:** DevTools > Application > localStorage > kq_user 확인, points 필드 검증

## 2. Quiz Wrong Answer
**ID:** TC-002
**조건:** 퀴즈 중 2개 오답
**기대:** 50P×2 + 100P×2 = total +300P
**실제 검사:** DevTools → kq_user → confirm delta is exactly 300

## 3. Penalty Kick
**ID:** TC-003
**조건:** 홈→start() 클릭
**기대:** +100P. 하루 1회 제한: 2회 시도 불가
**검증:** penaltyUsed flag = true in kq_user, Date comparison

## 4. Box Open
**ID:** TC-004
**조건:** 500P 보유 + boxOpened=false → click
**기대:** 500P 소모. 결과 등급에 따라 보상 (90% 이상박스 or 굿). 확률 검증 없음
**실패 시:** points != prev-500 체크

## 5. Streak Continuity
**ID:** TC-005
**조건:** 어제 퀴즈 완료, 오늘 다시 완료
**기대:** streak +1 (e.g. 7→8). Toast 표시
**실패율 검사:** dayDiff() 검증. 시간 미스체팅 방지: 시드-일자 기준으로 사용

## 6. Storage Integrity via validatePointIncrease
**ID:** TC-006
**조건:** 브라우저에서 localStorage 직접 수정 → +999P 추가
**기대:** load 중 함수가 불량P 감지 → 로그 of violation BUT point reset 없음
**재현 방법:**
1. Application sync 시간 → 콘솔에서 state.points += 10000
2. 페이지 로드 시 logic.js validate 호출
3. console.warning 표시됨

## 7. F5 Cheat Detection
**ID:** TC-007
**조건:** 퀴즈 progress 중(1/4) → F5 하드 refresh
**기대:** alert/show `<닐`, 미완성 세션 있음 → return to lobby / "이전 풀이 있습니까?" prompt
**실현 Chance:** session JSON `complete=false` 유지

## 8. Invite Code Validation (Local)
**ID:** TC-008
**조건:** 상대가 입력 KQ-1234 → 내 코드 맞는지 확인
**기대:** SHA256 → 함수 매치 → 300P 자동 추가 (V2: 보안). 2회 사용 시 error
레Certift 밸리 아래림

---

## 9. Streak Recovery 사용
**ID:** TC-009
**조건:** 유저 streak가 고장 날 상황 → 방치 1일 → recovery item 사용
**기대:** 복원됨(100P → streak 유효)
**재현:** set: lastQuizDate 이전 2일 → reset하기 전에 applyRecovery

## 10. Level-Up Transition
**ID:** TC-010
**조건:** 포인트 999 → 1000 획득
**기대:** level `entry`→`아마춰`. Toast event 발생
**체크: `console.log(balanceProgress(1000))` → {level:'아마춰'...}

---
계세 종료.