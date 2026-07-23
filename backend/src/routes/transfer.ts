import { Router } from 'express'
import { accounts, transactions, user } from '../data.js'
import type { TransferRequest } from '../types.js'

const router = Router()

router.post('/', (req, res) => {
  const { to, amount, memo } = req.body as TransferRequest

  if (!to || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const fromAccount = accounts[0]
  if (fromAccount.balance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' })
  }

  fromAccount.balance -= amount

  const tx = {
    id: `t${Date.now()}`,
    accountId: fromAccount.id,
    counterparty: to,
    amount: -amount,
    type: 'withdraw' as const,
    memo: memo || '',
    date: new Date().toISOString().split('T')[0],
  }
  transactions.unshift(tx)

  res.json({ status: 'success', txId: tx.id, remainingBalance: fromAccount.balance })
})

export default router
