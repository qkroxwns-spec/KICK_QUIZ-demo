# Toss 미니앱 배포 준비

## 1. Toss Developer Console
- https://developers.toss.dev/ → 미니앱 등록
- 앱 이름: KICK QUIZ (킥퀴즈)
- 앱 URL: `https://{domain}/app/index.html` (실서버 도메인 필요)
- URL scheme: `toss://mini-app/{appId}`
- 최소 사이즈: 375×812 (iPhone SE)

## 2. 필요 파일

| 파일 | 내용 | 상태 |
|------|------|------|
| `manifest.json` | 앱 이름, 아이콘, 설명, URL | ❌ 미생성 |
| `icon-192.png` | 런처 아이콘 192×192 | ❌ 미생성 |
| `icon-512.png` | 런처 아이콘 512×512 | ❌ 미생성 |
| 개인정보처리방침 | Toss 요구사항 | ❌ 미생성 |
| 서비스 운영정책 | 환불/이용약관 | ❌ 미생성 |

## 3. manifest.json 예시
```json
{
  "name": "KICK QUIZ",
  "short_name": "킥퀴즈",
  "description": "매일 4문항 축구 O/X 퀴즈",
  "start_url": "/app/index.html",
  "display": "standalone",
  "orientation": "portrait",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

## 4. 배포 체크리스트
- [ ] 도메인 확보 및 HTTPS 적용
- [ ] manifest.json 생성
- [ ] 아이콘 제작 (192×192, 512×512)
- [ ] 개인정보처리방침 페이지
- [ ] Toss Developer Console 앱 등록
- [ ] Toss 웹뷰 내 실제 테스트
- [ ] 광고 슬롯 연동 (Toss 광고 or AdSense)
- [ ] 375×812 레이아웃 최종 확인

## 5. 리스크
| 리스크 | 대응 |
|--------|------|
| Toss 미니앱 심사 거절 | 가이드라인 사전 확인, 사행성 없음 강조 |
| 웹뷰 localStorage 휘발성 | 서버 세션 도입 필요시 Post-MVP |
| URL scheme 변경 | Toss 정책 변경 모니터링 |
