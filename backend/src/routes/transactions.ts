import { Router } from 'express'
import { transactions } from '../data.js'

const router = Router()

router.get('/', (req, res) => {
  let result = [...transactions]
  const { from, to, type } = req.query

  if (type === 'deposit' || type === 'withdraw') {
    result = result.filter(t => t.type === type)
  }
  if (from) {
    result = result.filter(t => t.date >= from)
  }
  if (to) {
    result = result.filter(t => t.date <= to)
  }

  res.json(result)
})

export default router
