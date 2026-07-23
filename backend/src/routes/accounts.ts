import { Router } from 'express'
import { accounts, transactions } from '../data.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(accounts)
})

router.get('/:id', (req, res) => {
  const account = accounts.find(a => a.id === req.params.id)
  if (!account) return res.status(404).json({ error: 'Account not found' })
  const txs = transactions.filter(t => t.accountId === account.id)
  res.json({ ...account, transactions: txs })
})

export default router
