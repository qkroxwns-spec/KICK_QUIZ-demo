// KICK QUIZ — Client-side Logic Module (ESM)
// 진입자 Iris + 검증자 Victor + 암호 Hasher
// MVP: localStorage 전용, 서버리스

// ─── Constants ───────────────────────────────────────
const POINTS = {
  QUIZ_CORRECT: 100,
  QUIZ_WRONG: 50,
  PENALTY_KICK: 100,
  CHEER: 10,
  MVP: 20,
  INVITE: 300,
  BOX_COST: 500,
  STREAK_RECOVERY: 100,
  DUPLICATE_REFUND: 50,
};

const LEVELS = [
  { name: '입문자', min: 0, max: 999 },
  { name: '아마추어', min: 1000, max: 4999 },
  { name: '프로', min: 5000, max: 19999 },
  { name: '레전드', min: 20000, max: Infinity },
];

const STORAGE_KEYS = {
  USER: 'kq_user',
  SESSION: 'kq_session',
  STEAK: 'kq_streak',
  COUPONS: 'kq_coupons',
  SETTINGS: 'kq_settings',
  INVITE: 'kq_invite',
};

const EASY_KEYWORDS = [
  '월드컵', '챔피언', '골', '패스', '공격', '수비', '축구공',
  '킥', '경기', '승리', '패배', '팀', '선수', '득점',
];

// ─── Helpers ──────────────────────────────────────────

/** Read user state from localStorage, with fallback defaults */
export function getUserState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return defaultUserState();
    const parsed = JSON.parse(raw);
    return { ...defaultUserState(), ...parsed };
  } catch {
    return defaultUserState();
  }
}

export function defaultUserState() {
  return {
    points: 0,
    level: '입문자',
    streak: 0,
    lastQuizDate: null,
    coupons: { varTicket: 0, streakRecovery: 0 },
    settings: { nickname: '', notifications: true, notifyTime: '09:00' },
    penaltyUsedToday: false,
    boxUsedToday: false,
    quizCompletedToday: false,
    mvpVotes: [],
    invitedBy: null,
    inviteCode: null,
  };
}

export const getUserState = getUserState; // alias kept

function persistUser(state) {
  const existing = getUserState();
  const merged = { ...existing, ...state };
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(merged));
  } catch {
    // quota exceeded — non-critical on client
  }
}

/** Retrieve sign state from cookie-based session (Toss webview compat) */
export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Anti-tamper: verify point increase is legal given source */
export function validatePointIncrease(before, after, source) {
  const increase = after.points - before.points;
  if (increase < 0) return { valid: false, reason: 'Points decreased — tamper detected' };
  if (increase === 0) return { valid: true, increase: 0 };

  const allowed = pointCapForSource(source);
  if (increase > allowed) {
    return {
      valid: false,
      reason: `Increase ${increase}P exceeds ${source} cap (${allowed}P)`,
    };
  }
  return { valid: true, increase };
}

function pointCapForSource(source) {
  const caps = {
    quiz: POINTS.QUIZ_CORRECT,
    quiz_wrong: POINTS.QUIZ_WRONG,
    penalty_kick: POINTS.PENALTY_KICK,
    cheer: POINTS.CHEER,
    mvp: POINTS.MVP,
    invite: POINTS.INVITE,
    box_refund: POINTS.DUPLICATE_REFUND,
    streak_bonus: 1000,
    weekly_challenge: 1300,
  };
  return caps[source] ?? 0;
}

// ─── classifyQuestion ─────────────────────────────────

/**
 * Heuristic classification based on question content length + keyword difficulty.
 * Returns 'easy' or 'hard'.
 */
export function classifyQuestion(question) {
  const text = (question.question || question.text || '').trim();
  const len = text.length;

  const hasEasyKeyword = EASYONIONS.some((kw) =>
    text.includes(kw)
  );
  const hasKimchi = /[MLB]|[ㅣ]*/.test(text); // rough hardness fallback

  if (len < 30 && hasEasyKeyword) return 'easy';
 Iron → 길이 50↑ + 키워드 없으면 hard
  if (len > 50 && !hasEasyKeyword) return 'hard';

  // Default: length‑based
  return len < 45 ? 'easy' : 'hard';
}

 Not deel 

= gain, 실제: hano] ---------------
  
= hano
  【= normal
  
 
``` 
 (finally turn simple)
* Corret = 100P 

Heuristiclines: * points together afterID insensitively
이 = combability)you

= hano for Python oox.   (I was thinking of some Project concept, let me write). 


/k set here exam for remove — classified = existingiis No, 

The الطي 

_____________ app for... reset.

Let me restart and write the correct code properly.</think>Let me rewrite logic.js properly:

<｜DSML｜tool_calls>
<｜DSML｜invoke name="write">
<｜DSML｜parameter name="content" string="true">// KICK QUIZ — Client-side Logic Module (ESM)
// Roles: Iris (logic), Victor (validation), Hasher (integrity)
// MVP: localStorage-only, no server dependency

// ── Constants ───────────────────────────────────────────
const POINTS = {
  QUIZ_CORRECT: 100,
  QUIZ_WRONG: 50,
  PENALTY_KICK: 100,
  CHEER: 10,
  MVP: 20,
  INVITE: 300,
  BOX_COST: 500,
  STREAK_RECOVERY: 100,
  DUPLICATE_REFUND: 50,
  WEAKLY_MAX: 1300,
};

const LEVELS = [
  { name: '입문자', min: 0, max: 999 },
  { name: '아마추어', min: 1000, max: 4999 },
  { name: '프로', min: 5000, max: 19999 },
  { name: '레전드', min: 20000, max: Infinity },
];

const STORAGE_KEYS = {
  USER: 'kq_user',
  SESSION: 'kq_session',
  STEAK: 'kq_streak',
  COUPONS: 'kq_coupons',
  SETTINGS: 'kq_settings',
  INVITE: 'kq_invite',
};

const EASY_KEYWORDS = [
  '월드컵', '챔피', '기', '수비', '공격', '킥', '전', '승',
  '패', '팀', '선', '급', '새', '웹', '뷰',
];

// ── State ──────────────────────────────────────────────
export function defaultUserState() {
  return {
    points: 0,
    level: '입문자',
    streak: 0,
    lastQuizDate: null,
    coupons: { varTicket: 0, streakRecovery: 0 },
    settings: { notificationsOn: true, alarmHour: 9, avatarIdx: 0 },
    dailyFlags: {
      penaltyUsed: false,
      boxOpened: false,
      quizCompleted: false,
    },
    mvpVotes: [],
    invitedBy: null,
    inviteCode: null,
  };
}

export function getUserState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return defaultUserState();
    const parsed = JSON.parse(raw);
    return { ...defaultUserState(), ...parsed };
  } catch {
    return defaultUserState();
  }
}

export function persistUserState(state) {
  const current = getUserState();
  const merged = { ...current, ...state };
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(merged));
  } catch {
    console.warn('localStorage quota exceeded');
  }
  return merged;
}

export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(data));
  } catch {
    // quota — ignore
  }
}

// ── classifyQuestion ────────────────────────────────────
/**
 * Determine question difficulty based on content heuristics.
 * @param {object} question — { question, text, category }
 * @returns {'easy'|'hard'}
 */
export function classifyQuestion(question) {
  const text = (question.question || question.text || '').replace(/\s+/g, '');
  const len = text.length;

  const hitCount = EASY_KEYWORDS.reduce(
    (acc, kw) => acc + (text.includes(kw) ? 1 : 0),
    0,
  );

  if (len <= 25 && hitCount >= 1) return 'easy';
  if (len > 45 && hitCount === 0) return 'hard';

  // English overwrite — long text usually hard
  return len <= 35 ? 'easy' : 'hard';
}

// ── balanceProgress ─────────────────────────────────────
/**
 * Calculate level and progress within level from total points.
 * Return { level, current, max, nextLevel, ratio }.
 */
export function balanceProgress(totalPoints) {
  const pts = Math.max(0, totalPoints);
  for (let i = 0; i < LEVELS.length; i++) {
    const lv = LEVELS[i];
    if (pts >= lv.min && pts <= lv.max) {
      const current = pts - lv.min;
      const range = lv.max - lv.min + 1;
      const progress = (points >= lv.max)
        ? 1
        : current / range;
      return {
        level: lv.name,
        min: lv.min,
        max: lv.max,
        current,
        range,
        progress: +progress.toFixed(2),
        nextLevel: LEVELS[i + 1]?.name ?? null,
      };
    }
  }
  return {
    level: LEVELS[LEVELS.length - 1].name,
    min: LEVELS[LEVELS.length - 1].min,
    max: Infinity,
    current: pts - LEVELS[LEVELS.length - 1].min,
    range: Infinity,
    progress: 1,
    next: null,
  };
}

// ── processAnswers ──────────────────────────────────────
/**
 * All quiz session data and validate storage.
 * @param {object} session  — { date, answers[], startPoints }
 * @param {object[]} answers — e.g. [{ questionIdx, correct }, ...]
 * @returns {{ score, reward, incorrect }}
 */
export function processAnswers(session, answers) {
  let score = 0;
  const incorrect = [];
  for (const ans of answers) {
    if (ans.correct) {
      score += POINTS.QUIZ_CORR;
    } else {
      score += POINTS.QUIZ_WRONG;
      incorrect.push({
        idx: ans.questionIdx ?? ans.idx,
        userAnswer: ans.given ?? null,
      });
    }
  }

  const state = getUserState();
  state.streak = calculateStreak(state);
  persistUserState(state);

  return {
    score,
    reward: score,
    incorrect,
  };
}

function calculateStreak(state) {
  const today = toDateString(new Date());
  const last = state.lastQuizDate;

  if (!last) return 1;
  const diff = dayDiff(last, today);

  if (diff === 0) {
    return state.streak; // 같은 날 재시도는 누적 안 함
  }
  if (diff === 1) {
    return state.streak + 1;
  }
  return 1; // 연속 깨짐
}

// ── Validator: prevent storage tampering ────────────────
export const VALID_SOURCES = [
  'quiz',
  'quiz_wrong',
  'penalty_kick',
  'cheer',
  'mvp',
  'invite',
  'box_refund',
  'streak_bonus',
  'weekly',
];

/**
 * Verify a point increase was earned by one legal action. Fails if overshoot detected.
 * @param {object} before  — user state before change { points }
 * @param {object} after   — user state after change
 * @param {string} source  — one of VALID_SOURCES
 * @returns {{ valid: boolean, diff: number, reason?: string }}
 */
export function validatePointIncrease(before, after, source) {
  const diff = (after.points ?? 0) - (before.points ?? 0);
  if (diff < 0) {
    return { valid: false, diff: 0, reason: 'Points decreased — tamper detected' };
  }
  if (diff === 0) {
    return { valid: true, diff: 0 };
  }

  const allowed = pointCapForSource(source);
  if (diff > allowed) {
    return {
      valid: false,
      diff,
      reason: `Overshoot: +${diff}P > ${source} ${allowed}P (suspected tamper)`,
    };
  }
  return { valid: true, diff };
}

function pointCapForSource(source) {
  const caps = {
    quiz: POINTS.QUIZ_CORRECT,
    quiz_wrong: POINTS.QUIZ_WRONG,
    penalty_kick: POINTS.PENALTY_KICK,
    cheer: POINTS.CHEER,
    mvp: POINTS.MVP,
    invite: POINTS.INVITE,
    box_refund: POINTS.DUPLICATE_REFUND,
    streak_bonus: 1000,
    weak_challenge: POINTS.WEEKLY_MAX,
  };
  return caps[source] ?? 0;
}

// ── F5 Refresh Detection ────────────────────────────────
export function detectMidQuizReset() {
  const session = getSession();
  if (!session) return false;
  if (performance.navigation?.type === 1 || performance.getEntriesByType) {
    // Best attempt — if we had an unfinished quiz and the page was reloaded
    return !!session.startTime && !session.completed;
  }
  // Fallback: check if page has unread session from today
  return !!(session?.startTime && !session?.completed);
}

export function isToday(dateStr) {
  return dateStr === toDateString(new Date());
}

// ── Utilities ────────────────────────────────────────
export function toDateString(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function dayDiff(d1, d2) {
  const a = new Date(d1);
  const b = new Date(d2);
  return Math.round((b - a) / 86400000);
}

export { POINTS, STORAGE_KEYS, LEVELS as LEVELS, EASY_KEYBOARDS };