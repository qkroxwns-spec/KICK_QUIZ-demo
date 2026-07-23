import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const raw = JSON.parse(readFileSync(join(__dirname, 'questionBank.json'), 'utf-8'))
// Normalize: {q,d,a,e} -> {question,difficulty,answer,explanation}
const questions = raw.map(x => ({
  id: x.id, question: x.q, difficulty: x.d, answer: x.a, explanation: x.e
}))

const app = express()
app.use(cors())
app.use(express.json())

const sessions = new Map()
const user = { totalP:1500, streak:5, bestStreak:12, totalSolved:120, correctCount:98, level:2, exp:800 }

function accuracy(){return user.totalSolved>0?user.correctCount/user.totalSolved:0}
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}

// 1. GET /api/v1/quiz/today
app.get('/api/v1/quiz/today',(_req,res)=>{res.json({date:new Date().toISOString().slice(0,10),streak:user.streak,totalP:user.totalP,level:{title:'아마추어',level:user.level,exp:user.exp,expToNext:5000}})})

// 2. POST /api/v1/quiz/start — pick 4
app.post('/api/v1/quiz/start',(_req,res)=>{
  const picked=shuffle(questions).slice(0,4)
  const sid=uid()
  const safe=picked.map(q=>({id:q.id,question:q.question,type:'ox',difficulty:q.difficulty}))
  sessions.set(sid,picked)
  res.json({sessionId:sid,questions:safe})
})

// 3. POST /api/v1/quiz/submit
app.post('/api/v1/quiz/submit',(req,res)=>{
  const{sessionId,answers}=req.body
  const full=sessions.get(sessionId)
  if(!full)return res.status(404).json({error:'session not found'})
  let correctCount=0
  const results=full.map((q,i)=>{const c=answers[i]===q.answer;if(c)correctCount++;return{correct:c,explanation:q.explanation}})
  const pGained=correctCount*100+(full.length-correctCount)*20
  user.totalP+=pGained;user.totalSolved+=full.length;user.correctCount+=correctCount
  sessions.delete(sessionId)
  res.json({score:correctCount,total:full.length,pGained,results})
})

// 4. POST /api/v1/penalty — 33% 3way
app.post('/api/v1/penalty',(req,res)=>{
  const{zone}=req.body;const keeper=Math.floor(Math.random()*3)
  const success=zone!==keeper
  const pGained=success?80:10
  if(success)user.totalP+=80;else user.totalP+=10
  res.json({result:success?'goal':'saved',pGained,totalP:user.totalP,keeperZone:keeper})
})

// 5. POST /api/v1/snackbox/open — Box v2
const BOX_PRIZES=[{n:'응원권',prob:50,won:10},{n:'스트릭복구권',prob:20,won:0},{n:'2X 부스터',prob:15,won:0},{n:'오답무효권',prob:10,won:0},{n:'추가문제권',prob:4,won:0},{n:'500P 직보',prob:0.7,won:500},{n:'Toss 혜택(출시후)',prob:0.3,won:0}]
app.post('/api/v1/snackbox/open',(_req,res)=>{
  const cost=300
  if(user.totalP<cost)return res.status(400).json({error:'insufficient points',remainingP:user.totalP})
  user.totalP-=cost
  const roll=Math.random()*100;let cum=0,prize=BOX_PRIZES[0]
  for(const p of BOX_PRIZES){cum+=p.prob;if(roll<cum){prize=p;break}}
  if(prize.won>0)user.totalP+=prize.won
  res.json({prize:{name:prize.n,icon:prize.n==='응원권'?'🎟️':prize.n==='스트릭복구권'?'💊':prize.n==='2X 부스터'?'⚡':prize.n==='오답무효권'?'🛡️':prize.n==='추가문제권'?'🔥':prize.n==='500P 직보'?'💰':'🎫',won:prize.won},remainingP:user.totalP})
})

// 6. GET /api/v1/user/stats
app.get('/api/v1/user/stats',(_req,res)=>{res.json({totalSolved:user.totalSolved,accuracy:Math.round(accuracy()*100)/100,bestStreak:user.bestStreak,currentStreak:user.streak,level:user.level,totalP:user.totalP})})

// 7. GET /api/v1/matches — no K League
app.get('/api/v1/matches',(_req,res)=>{
  const now=new Date();function shift(h){return new Date(now.getTime()+h*3600000).toISOString()}
  res.json([
    {home:'맨시티',away:'아스널',badgeHome:'#6cabdd',badgeAway:'#ef0107',schedule:shift(0),score:'2-1',status:'종료'},
    {home:'리버풀',away:'맨유',badgeHome:'#c8102e',badgeAway:'#da291c',schedule:shift(3),score:'3-0',status:'종료'},
    {home:'토트넘',away:'첼시',badgeHome:'#132257',badgeAway:'#034694',schedule:shift(6),score:'-',status:'예정'},
    {home:'레알',away:'바르사',badgeHome:'#febe10',badgeAway:'#a50044',schedule:shift(9),score:'-',status:'예정'},
    {home:'뮌헨',away:'도르트문트',badgeHome:'#dc052d',badgeAway:'#fde100',schedule:shift(12),score:'-',status:'예정'},
  ])
})

app.listen(3001,()=>console.log('[KICK QUIZ API] http://localhost:3001'))
