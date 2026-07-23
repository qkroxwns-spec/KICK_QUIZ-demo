import { Router } from 'express'
import { user } from '../data.js'

const router = Router()

router.get('/profile', (_req, res) => {
  res.json(user)
})

export default router
