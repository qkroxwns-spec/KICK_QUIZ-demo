import { dashboardData } from '../data'

interface Props {
  onNavigate: (page: 'dashboard' | 'transfer' | 'transactions' | 'settings') => void
}

function formatAmount(n: number) {
  return n.toLocaleString('ko-KR') + '원'
}

export default function Dashboard({ onNavigate }: Props) {
  const { user, totalAssets, accounts, recentTransactions } = dashboardData

  return (
    <div className="page">
      <div className="header">
        <h1>토스</h1>
        <button className="header-back" onClick={() => onNavigate('settings')}>⚙️</button>
      </div>

      <div className="balance-card">
        <div className="greeting">안녕하세요, {user.name}님</div>
        <div className="amount">{formatAmount(totalAssets)}</div>
        <div className="label">총 자산</div>
      </div>

      <div className="quick-actions">
        <button className="quick-action-btn" onClick={() => onNavigate('transfer')}>
          <div className="icon icon-send">↗️</div>
          <span>송금</span>
        </button>
        <button className="quick-action-btn">
          <div className="icon icon-charge">⬇️</div>
          <span>충전</span>
        </button>
        <button className="quick-action-btn" onClick={() => onNavigate('transactions')}>
          <div className="icon icon-list">📋</div>
          <span>내역</span>
        </button>
      </div>

      <div className="section">
        <div className="section-title">
          <span>내 계좌</span>
          <span className="more">전체보기</span>
        </div>
        {accounts.slice(0, 2).map(a => (
          <div key={a.id} className="account-card">
            <div className="top">
              <span className="bank">{a.bank}</span>
              <span className="balance">{formatAmount(a.balance)}</span>
            </div>
            <div className="number">{a.number.replace(/\d{4}$/g, '****')}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-title">
          <span>최근 거래</span>
          <span className="more" onClick={() => onNavigate('transactions')}>더보기</span>
        </div>
        {recentTransactions.map(t => (
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
