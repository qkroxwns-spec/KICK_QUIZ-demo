import { Router } from 'express'
import { transactions } from '../data.js'
import { analyzeSpending, getMonthlyTrend, classify } from '../services/analysis.js'

const router = Router()

router.get('/spending', (_req, res) => {
  const spendings = transactions.filter(t => t.amount < 0)
  res.json(analyzeSpending(spendings))
})

router.get('/trend', (_req, res) => {
  res.json(getMonthlyTrend(transactions))
})

router.get('/classify', (req, res) => {
  const q = req.query.q
  if (!q) return res.status(400).json({ error: 'Query param q required' })
  res.json(classify(String(q)))
})

export default router
