import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Transfer from './pages/Transfer'
import Transactions from './pages/Transactions'
import Settings from './pages/Settings'

type Page = 'dashboard' | 'transfer' | 'transactions' | 'settings'

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />
      case 'transfer': return <Transfer onBack={() => setPage('dashboard')} />
      case 'transactions': return <Transactions onBack={() => setPage('dashboard')} />
      case 'settings': return <Settings onBack={() => setPage('dashboard')} />
    }
  }

  return (
    <div className="app">
      {renderPage()}
      <nav className="bottom-nav">
        <button className={`nav-item ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage('dashboard')}>
          <span className="nav-icon">🏠</span>
          <span>홈</span>
        </button>
        <button className={`nav-item ${page === 'transfer' ? 'active' : ''}`} onClick={() => setPage('transfer')}>
          <span className="nav-icon">↗️</span>
          <span>송금</span>
        </button>
        <button className={`nav-item ${page === 'transactions' ? 'active' : ''}`} onClick={() => setPage('transactions')}>
          <span className="nav-icon">📋</span>
          <span>내역</span>
        </button>
        <button className={`nav-item ${page === 'settings' ? 'active' : ''}`} onClick={() => setPage('settings')}>
          <span className="nav-icon">⚙️</span>
          <span>설정</span>
        </button>
      </nav>
    </div>
  )
}
