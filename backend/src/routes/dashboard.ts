import { Router } from 'express'
import { user, accounts, transactions } from '../data.js'

const router = Router()

router.get('/', (_req, res) => {
  const totalAssets = accounts.reduce((s, a) => s + a.balance, 0)
  res.json({
    user,
    totalAssets,
    accounts,
    recentTransactions: transactions.slice(0, 5),
  })
})

export default router
