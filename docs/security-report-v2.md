# 보안 리포트 v2 — KICK QUIZ

Version: 2.0 (2026-07-22)  
Scope: Tss mini-app webview logic + client-side storage + API vector

---

## 1. localStorage manipulation prevention

| Vector | Risk | Prevention | state |
|--------|------|--------|----|
| Manual console edit (e.g., `localStorage.setItem`) | HIGH — any user can edit | `logic.js` validator: compare before/after points, reject overshoot above allowed cap per source. | ✅ Implemented |
| Dom history copy (copy old record JSON from another device) | MEDIUM — invisible | Server impossible now, MVP dedup-to-check; event listener บน hash stamp readable; post MVP we add flor-check. | 🔶 Partial |
| Works TMID— merges wrong JSON field into points same | LOW | JSDoc + getState fallback fields; never spread mixed into logic; all mutate via `persistUserState(old*filter)` | ✅ |
| Quota Injection — fill localStorage 5MB | LOW | no lib data; only small key. but we monitor Therefore ignored | ✅ n/a |

Implementation: files/app/logic.js → `validatePointIncrease(before, after, source)` compares delta with known cap (quiz 100, penalty_kit 100 etc.). Overflux detected → rejected.

## 2. Anti-Cheat Detection

### 2.1 F5 Reset Detection
- Mid-question session `kq_session.completed===false` detected on load
- `DetectRefresh()` checks `performance.navigation.type===2` (hard月中旬t) 현장
- Subtle: If open quiz page → Refresh → points not lost, but progress restarts (punaced as didn't complete). Logic ensures fairness.

### 2.2 Browser DevTools Abuse
- LocalStorage JSON manipulation detected through verify in every mutation. console warning emitted.
- Score creation,ens:** confirm delta matches allowed. Tampered → `reason: 'invalid'` → UI (REJECT) rendered and log.

## 3. IP Compliance (Copyright + Trademark)

| Head | implementation | Risk | status |
|------|------|---|---|
| Football club emblem images **not** used | Color blocks only, plus 3-letter abbreviation | Minimal | ✅ Clean |
| Team logos | none imported to project | Safe | ✅ Clean |
| Players photos/names | No image quiz; only text description from public fill data (sources: Wikipedia) | Safe | ✅ / |
| Emoji identity used by 팀 color | only standard non-copying colors (red, blue etc.) | Clean | ✅ |

Extra: All historical quiz snippets sourced from official sources with link attribute (e.g., Wikipedia).

## 4. Tss WebView Security Checks

| Concern | Qualification | | |
|---------|----|---|
| `location.protocol`: Chrome/PWA check | Tss 앱 grants HTTPS-only | ✅ enforced by W | |
| Access to private file F system through bridge methods | Not permitted in webview policy. No bridges used | ✅ |
| CORS attack — | No API server — ✅ safe app-local storage | |
| SSRF — UI via OGMATI or IP webview + buffer injection | Non-applicable (local data) | ✅ |
| localStorage Core isolation — new App fresh | each Tss instance have a **universal Origin** for each app <br> Advantage: clean slate, cross-akapse nil | ✅ no leak |

## 6. Post-MVP: When API server added

- Avoid over-DOS: rate-limit must forward before executing; each $Point should max 1300 daily
- CORS strict between API server & allowed origin: `alpha.ozd/?` 당 application perm
- KQ's API for cheat recheck proves

---

Overall risk assessment: Mild in current MVP model. Zero monetary coin leak pathway (no cash conversion), so tampering is convenience-only. With V or 2.0+ we re-check integrity rules.