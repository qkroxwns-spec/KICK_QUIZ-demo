import { useState } from 'react'
import { allAccounts } from '../data'

interface Props { onBack: () => void }

type Step = 'form' | 'confirm' | 'complete'

function formatAmount(n: number) {
  return n.toLocaleString('ko-KR') + '원'
}

export default function Transfer({ onBack }: Props) {
  const [step, setStep] = useState<Step>('form')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')

  const myAccount = allAccounts[0]
  const numAmount = parseInt(amount.replace(/,/g, '')) || 0

  const handleSend = () => {
    if (!to || !numAmount) return
    setStep('confirm')
  }

  const handleConfirm = () => setStep('complete')

  if (step === 'confirm') {
    return (
      <div className="page">
        <div className="header">
          <button className="header-back" onClick={() => setStep('form')}>←</button>
          <h1>송금 확인</h1>
          <div style={{width: 28}} />
        </div>
        <div className="page-content">
          <div className="confirm-amount">{formatAmount(numAmount)}</div>
          <div className="confirm-box">
            <div className="confirm-row">
              <span className="confirm-label">받는 분</span>
              <span className="confirm-value">{to}</span>
            </div>
            <div className="confirm-row">
              <span className="confirm-label">내 계좌</span>
              <span className="confirm-value">{myAccount.bank} {myAccount.number}</span>
            </div>
            <div className="confirm-row">
              <span className="confirm-label">메모</span>
              <span className="confirm-value">{memo || '-'}</span>
            </div>
            <div className="confirm-row">
              <span className="confirm-label">예상 잔액</span>
              <span className="confirm-value">{formatAmount(myAccount.balance - numAmount)}</span>
            </div>
          </div>
          <div style={{marginTop: 24}}>
            <button className="btn btn-primary" onClick={handleConfirm}>확인 및 송금</button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'complete') {
    return (
      <div className="page">
        <div className="complete-screen">
          <div className="complete-icon">✅</div>
          <div className="complete-title">송금 완료</div>
          <div className="complete-sub">{to}님에게 {formatAmount(numAmount)}를 보냈어요</div>
          <button className="btn btn-primary" onClick={onBack}>홈으로</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="header">
        <button className="header-back" onClick={onBack}>←</button>
        <h1>송금</h1>
        <div style={{width: 28}} />
      </div>
      <div className="page-content">
        <div className="form-group">
          <label className="form-label">받는 분 (계좌번호 또는 연락처)</label>
          <input className="form-input" value={to} onChange={e => setTo(e.target.value)} placeholder="계좌번호 또는 전화번호" />
        </div>
        <div className="form-group">
          <label className="form-label">금액</label>
          <input className="form-input" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))} placeholder="0" inputMode="numeric" />
        </div>
        <div className="form-group">
          <label className="form-label">메모 (선택)</label>
          <input className="form-input" value={memo} onChange={e => setMemo(e.target.value)} placeholder="메모를 입력하세요" />
        </div>
        <div style={{marginTop: 24}}>
          <button className={`btn ${to && numAmount > 0 ? 'btn-primary' : 'btn-disabled'}`} onClick={handleSend}>다음</button>
        </div>
      </div>
    </div>
  )
}
