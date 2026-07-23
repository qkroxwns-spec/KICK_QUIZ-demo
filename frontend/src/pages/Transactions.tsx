import { useState } from 'react'
import { allTransactions } from '../data'

interface Props { onBack: () => void }

function formatAmount(n: number) {
  return n.toLocaleString('ko-KR') + '원'
}

export default function Transactions({ onBack }: Props) {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw'>('all')

  const filtered = filter === 'all'
    ? allTransactions
    : allTransactions.filter(t => t.type === (filter === 'deposit' ? 'deposit' : 'withdraw'))

  return (
    <div className="page">
      <div className="header">
        <button className="header-back" onClick={onBack}>←</button>
        <h1>거래내역</h1>
        <div style={{width: 28}} />
      </div>
      <div className="page-content">
        <div className="filter-bar">
          {(['all', 'deposit', 'withdraw'] as const).map(f => (
            <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? '전체' : f === 'deposit' ? '입금' : '출금'}
            </button>
          ))}
        </div>
        {filtered.map(t => (
          <div key={t.id} className="tx-item">
            <div className="tx-icon">{t.type === 'deposit' ? '💰' : '💳'}</div>
            <div className="tx-info">
              <div className="tx-name">{t.counterparty}</div>
              <div className="tx-memo">{t.memo} · {t.date}</div>
            </div>
            <div className={`tx-amount ${t.amount > 0 ? 'positive' : 'negative'}`}>
              {t.amount > 0 ? '+' : ''}{formatAmount(t.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
