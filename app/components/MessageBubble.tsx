'use client'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '16px',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        maxWidth: '80%',
        padding: '14px 18px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser 
          ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' 
          : 'rgba(255,255,255,0.08)',
        color: isUser ? '#fff' : '#e8ecf1',
        fontSize: '15px',
        lineHeight: '1.6',
        wordBreak: 'break-word',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: isUser 
          ? '0 4px 15px rgba(37, 99, 235, 0.3)' 
          : '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        {message.content}
      </div>
    </div>
  )
}
