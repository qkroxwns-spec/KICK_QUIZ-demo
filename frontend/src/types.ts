export interface Account {
  id: string
  bank: string
  number: string
  balance: number
  type: 'checking' | 'savings'
}

export interface Transaction {
  id: string
  counterparty: string
  amount: number
  type: 'deposit' | 'withdraw'
  memo: string
  date: string
}

export interface User {
  name: string
  email: string
  phone: string
}

export interface DashboardData {
  user: User
  totalAssets: number
  accounts: Account[]
  recentTransactions: Transaction[]
}
