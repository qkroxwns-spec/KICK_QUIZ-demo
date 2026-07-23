import { useState } from 'react'
import { dashboardData } from '../data'

interface Props { onBack: () => void }

export default function Settings({ onBack }: Props) {
  const { user } = dashboardData
  const [notif, setNotif] = useState(true)
  const [bio, setBio] = useState(false)

  return (
    <div className="page">
      <div className="header">
        <button className="header-back" onClick={onBack}>←</button>
        <h1>설정</h1>
        <div style={{width: 28}} />
      </div>
      <div className="page-content">
        <div className="profile-card">
          <div className="profile-avatar">{user.name[0]}</div>
          <div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
          </div>
        </div>

        <div className="section-title" style={{padding: '0 4px', marginTop: 20}}>알림</div>
        <div className="setting-item">
          <span className="setting-label">푸시 알림</span>
          <button className={`toggle ${notif ? 'on' : ''}`} onClick={() => setNotif(!notif)} />
        </div>

        <div className="section-title" style={{padding: '0 4px', marginTop: 20}}>보안</div>
        <div className="setting-item">
          <span className="setting-label">생체 인증</span>
          <button className={`toggle ${bio ? 'on' : ''}`} onClick={() => setBio(!bio)} />
        </div>
        <div className="setting-item">
          <span className="setting-label">PIN 변경</span>
          <span className="setting-value">설정 완료</span>
        </div>

        <div className="section-title" style={{padding: '0 4px', marginTop: 20}}>기타</div>
        <div className="setting-item">
          <span className="setting-label">앱 버전</span>
          <span className="setting-value">v1.0.0</span>
        </div>
        <div className="setting-item">
          <span className="setting-label">로그아웃</span>
        </div>
      </div>
    </div>
  )
}
