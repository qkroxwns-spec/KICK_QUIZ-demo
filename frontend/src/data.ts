import type { DashboardData, Account, Transaction } from './types'

const accounts: Account[] = [
  { id: 'a1', bank: '농협', number: '302-1234-5678-01', balance: 3450000, type: 'checking' },
  { id: 'a2', bank: '토스뱅크', number: '100-1234-567890', balance: 8900000, type: 'savings' },
  { id: 'a3', bank: '카카오뱅크', number: '3333-12-456789', balance: 1200000, type: 'checking' },
]

const transactions: Transaction[] = [
  { id: 't1', counterparty: 'CU 편의점', amount: -3500, type: 'withdraw', memo: '편의점', date: '2026-07-22' },
  { id: 't2', counterparty: '(주)토스페이', amount: 2000000, type: 'deposit', memo: '월급여', date: '2026-07-22' },
  { id: 't3', counterparty: '스타벅스코리아', amount: -5100, type: 'withdraw', memo: '커피', date: '2026-07-21' },
  { id: 't4', counterparty: 'ATM 출금', amount: -50000, type: 'withdraw', memo: '현금', date: '2026-07-21' },
  { id: 't5', counterparty: '통신비', amount: -55000, type: 'withdraw', memo: 'SKT', date: '2026-07-20' },
  { id: 't6', counterparty: '배달의민족', amount: -18900, type: 'withdraw', memo: '저녁', date: '2026-07-20' },
  { id: 't7', counterparty: '프리랜서 수입', amount: 850000, type: 'deposit', memo: '프로젝트', date: '2026-07-19' },
]

export const dashboardData: DashboardData = {
  user: { name: '홍길동', email: 'hong@example.com', phone: '010-1234-5678' },
  totalAssets: accounts.reduce((sum, a) => sum + a.balance, 0),
  accounts,
  recentTransactions: transactions.slice(0, 5),
}

export const allTransactions: Transaction[] = transactions
export const allAccounts: Account[] = accounts
