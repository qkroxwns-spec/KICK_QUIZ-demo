export interface Account {
  id: string
  bank: string
  number: string
  balance: number
  type: 'checking' | 'savings'
}

export interface Transaction {
  id: string
  accountId: string
  counterparty: string
  amount: number
  type: 'deposit' | 'withdraw'
  memo: string
  date: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
}

export interface TransferRequest {
  to: string
  amount: number
  memo?: string
}

export interface DashboardResponse {
  user: User
  totalAssets: number
  accounts: Account[]
  recentTransactions: Transaction[]
}
