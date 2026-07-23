# API 명세서 — KICK QUIZ

## Base
`http://localhost:3001/api/v1`

---

### 1. GET /quiz/today
**오늘의 퀴즈 메타 정보**

```json
{
  "date": "2026-07-22",
  "totalQuestions": 4,
  "rewardPerQuestion": 100,
  "completed": false,
  "streak": 5,
  "todayP": 400,
  "level": { "title": "프로 덕후", "level": 3, "exp": 120, "expToNext": 2000 }
}
```

### 2. POST /quiz/start
**퀴즈 세션 시작**

Request: `{}`
Response:
```json
{
  "sessionId": "s_abc123",
  "questions": [
    {
      "id": "q1", "difficulty": "easy", "type": "ox",
      "question": "EPL 최다 우승팀은 맨체스터 유나이티드다.",
      "answer": true
    },
    {
      "id": "q2", "difficulty": "easy", "type": "ox",
      "question": "2002 월드컵 4강에서 대한민국의 상대는 독일이었다.",
      "answer": true
    },
    {
      "id": "q3", "difficulty": "hard", "type": "ox",
      "question": "발롱도르 최다 수상 선수는 크리스티아누 호날두다.",
      "answer": false
    },
    {
      "id": "q4", "difficulty": "hard", "type": "ox",
      "question": "박지성은 EPL에서 4회 우승했다.",
      "answer": true
    }
  ]
}
```

### 3. POST /quiz/submit
**퀴즈 답안 제출**

Request:
```json
{
  "sessionId": "s_abc123",
  "answers": [
    { "questionId": "q1", "answer": true },
    { "questionId": "q2", "answer": true },
    { "questionId": "q3", "answer": false },
    { "questionId": "q4", "answer": true }
  ]
}
```

Response:
```json
{
  "score": 4,
  "total": 4,
  "pGained": 400,
  "bonusP": 100,
  "results": [
    { "questionId": "q1", "correct": true, "explanation": "맨유는 20회 우승으로 EPL 최다 기록이다." },
    { "questionId": "q2", "correct": true, "explanation": "2002년 6월 25일 4강전, 대한민국은 독일에게 0-1로 패배했다." },
    { "questionId": "q3", "correct": true, "explanation": "메시가 8회로 최다. 호날두는 5회이다." },
    { "questionId": "q4", "correct": true, "explanation": "박지성은 2006-07, 2007-08, 2008-09, 2010-11 우승." }
  ],
  "streak": 6,
  "totalP": 1200
}
```

### 4. POST /penalty
**승부차기 실행**

Request: `{}`
Response:
```json
{
  "result": "goal",
  "pGained": 100,
  "totalP": 1300
}
```

### 5. POST /snackbox/open
**간식박스 오픈**

Request: `{}`
Response:
```json
{
  "prize": {
    "tier": 3,
    "label": "츄파춥스 모바일 교환권",
    "type": "physical",
    "value": 500
  },
  "remainingP": 800
}
```

### 6. GET /user/stats
**사용자 통계**

```json
{
  "nickname": "축구왕",
  "totalP": 1300,
  "streak": 6,
  "bestStreak": 12,
  "level": 3,
  "levelTitle": "프로 덕후",
  "accuracy": 0.85,
  "totalSolved": 120,
  "rankPercentile": 15
}
```

### 7. GET /matches
**주간 매치 일정 (크롤링 데이터)**

```json
[
  {
    "matchId": "m1",
    "date": "2026-07-24",
    "time": "20:00",
    "homeTeam": { "name": "아스널", "abbr": "ARS", "colors": { "primary": "#EF0107", "secondary": "#FFFFFF" } },
    "awayTeam": { "name": "첼시", "abbr": "CHE", "colors": { "primary": "#034694", "secondary": "#FFFFFF" } },
    "homeScore": 2, "awayScore": 1,
    "status": "finished",
    "cheered": false
  }
]
```

### 8. POST /matches/:id/cheer
**응원하기**

Response:
```json
{ "status": "ok", "pGained": 10, "totalP": 1310 }
```

### 9. GET /user/coupons
**쿠폰함**

```json
[
  { "id": "c1", "label": "츄파춥스 교환권", "status": "pending", "date": "2026-07-22" }
]
```

## 데이터 모델

```typescript
interface User {
  id: string; nickname: string; level: number; totalP: number;
  streak: number; bestStreak: number; totalSolved: number;
  accuracy: number; todayCompleted: boolean;
}

interface Question {
  id: string; difficulty: 'easy' | 'hard'; type: 'ox' | 'multiple';
  question: string; answer: boolean | number;
  explanation: string; source: string;
}

interface Prize {
  tier: number; label: string; type: 'physical' | 'digital';
  value: number; probability: number;
}

interface Match {
  id: string; date: string; time: string;
  homeTeam: TeamInfo; awayTeam: TeamInfo;
  homeScore?: number; awayScore?: number;
  status: 'scheduled' | 'live' | 'finished';
}

interface TeamInfo {
  name: string; abbr: string;
  colors: { primary: string; secondary: string };
}
```
