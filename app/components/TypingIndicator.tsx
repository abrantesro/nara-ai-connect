'use client'

export default function TypingIndicator() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '12px 16px',
      background: 'rgba(255,255,255,0.08)',
      borderRadius: '16px 16px 16px 4px',
      width: 'fit-content',
      marginBottom: '16px'
    }}>
      <span className="typing-dot" style={{
        width: '8px',
        height: '8px',
        background: '#60a5fa',
        borderRadius: '50%',
        display: 'inline-block'
      }} />
      <span className="typing-dot" style={{
        width: '8px',
        height: '8px',
        background: '#60a5fa',
        borderRadius: '50%',
        display: 'inline-block'
      }} />
      <span className="typing-dot" style={{
        width: '8px',
        height: '8px',
        background: '#60a5fa',
        borderRadius: '50%',
        display: 'inline-block'
      }} />
    </div>
  )
}
