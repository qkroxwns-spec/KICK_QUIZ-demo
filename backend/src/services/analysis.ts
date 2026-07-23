import type { Transaction } from '../types.js'

interface CategoryRule {
  keywords: string[]
  label: string
}

interface SpendingCategory {
  label: string
  amount: number
  count: number
}

const CATEGORIES: Record<string, CategoryRule> = {
  FOOD: { keywords: ['편의점', '스타벅스', '배달의민족', 'CU', 'GS25', '식당', '마트'], label: '식비' },
  LIVING: { keywords: ['통신비', '관리비', '전기세', '가스비', '월세'], label: '생활' },
  TRANSPORT: { keywords: ['ATM', '택시', '버스', '지하철', '주유', '고속도로'], label: '교통' },
  INCOME: { keywords: ['월급', '프리랜서', '입금', '용돈'], label: '수입' },
  SHOPPING: { keywords: ['쿠팡', 'G마켓', '11번가', '무신사', '지그재그'], label: '쇼핑' },
  OTHER: { keywords: [], label: '기타' },
}

export function classify(counterparty: string): { category: string; label: string } {
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    if (cat.keywords.some(k => counterparty.includes(k))) return { category: key, label: cat.label }
  }
  return { category: 'OTHER', label: '기타' }
}

export function analyzeSpending(transactions: Transaction[]) {
  const spending: Record<string, SpendingCategory> = {}
  let totalSpent = 0

  transactions.forEach(tx => {
    if (tx.amount >= 0) return
    const { category, label } = classify(tx.counterparty)
    if (!spending[category]) spending[category] = { label, amount: 0, count: 0 }
    spending[category].amount += Math.abs(tx.amount)
    spending[category].count++
    totalSpent += Math.abs(tx.amount)
  })

  const sorted = Object.entries(spending)
    .sort(([, a], [, b]) => b.amount - a.amount)
    .map(([key, val]) => ({
      category: key,
      label: val.label,
      amount: val.amount,
      count: val.count,
      ratio: totalSpent > 0 ? Math.round((val.amount / totalSpent) * 100) : 0,
    }))

  return { categories: sorted, totalSpent }
}

export function getMonthlyTrend(transactions: Transaction[]) {
  const monthly: Record<string, { income: number; expense: number }> = {}
  transactions.forEach(tx => {
    const month = tx.date.slice(0, 7)
    if (!monthly[month]) monthly[month] = { income: 0, expense: 0 }
    if (tx.amount > 0) monthly[month].income += tx.amount
    else monthly[month].expense += Math.abs(tx.amount)
  })
  return Object.entries(monthly).map(([month, data]) => ({ month, ...data }))
}
