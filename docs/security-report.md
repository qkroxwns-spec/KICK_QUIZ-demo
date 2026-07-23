# 보안 점검 보고서

## 1. 인증/인가
- 현재 API에 인증 미들웨어 없음 → 토큰 기반 인증(JWT) 필요
- 송금 API는 인증된 사용자만 접근 가능해야 함
- **권장**: Express 미들웨어로 JWT 검증 추가

## 2. 입력 검증
- 송금 금액: 양수 체크, 최대 금액 제한 필요
- 계좌번호/연락처: SQL Injection 방지를 위한 sanitize
- **권장**: express-validator 또는 zod 스키마 검증

## 3. 데이터 보호
- 계좌번호 마스킹: 프론트엔드에서 이미 처리 중 (number.replace)
- 비밀번호/PIN: 해시 저장 필수 (bcrypt)
- **권장**: 민감 정보 응답에서 제외

## 4. CORS
- 현재 모든 origin 허용 → 프로덕션에서는 특정 도메인만 허용
- **권장**: 허용 origin 목록 제한

## 5. Rate Limiting
- 송금 API에 rate limit 미적용 → abuse 가능
- **권장**: express-rate-limit 도입

## 6. 취약점 스캔 결과
- npm audit: 0 vulnerabilities (양호)
- 종속성: express, cors — 이상 없음

## 조치 우선순위
| 이슈 | 심각도 | 조치 |
|------|--------|------|
| 인증 미들웨어 없음 | 🔴 HIGH | JWT 도입 |
| 입력 검증 없음 | 🟡 MEDIUM | zod 스키마 검증 |
| CORS 전면 허용 | 🟡 MEDIUM | origin 제한 |
| Rate limit 없음 | 🟢 LOW | express-rate-limit |
