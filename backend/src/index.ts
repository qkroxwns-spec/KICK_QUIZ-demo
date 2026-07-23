import express from 'express'
import cors from 'cors'
import dashboardRouter from './routes/dashboard.js'
import accountsRouter from './routes/accounts.js'
import transactionsRouter from './routes/transactions.js'
import transferRouter from './routes/transfer.js'
import userRouter from './routes/user.js'
import analysisRouter from './routes/analysis.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/v1/dashboard', dashboardRouter)
app.use('/api/v1/accounts', accountsRouter)
app.use('/api/v1/transactions', transactionsRouter)
app.use('/api/v1/transfer', transferRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/analysis', analysisRouter)

app.listen(PORT, () => {
  console.log(`Toss Mini API running on http://localhost:${PORT}`)
})
