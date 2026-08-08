'use client'

import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: `Olá! Que bom ter você aqui na CONNECT HUB. ✨

Eu sou a NARA, sua recepcionista e mentora neste ecossistema. Meu trabalho é simples: garantir que nenhum talento fique invisível e nenhuma boa ideia fique sem apoio.

Me conta: o que te trouxe aqui hoje? Estou aqui para ouvir.`
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      })

      if (!response.ok) {
        throw new Error('Erro na comunicação')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch (err: any) {
      setError('Estou refletindo sobre sua ideia... Poderia repetir? Às vezes a conexão dá uma travadinha.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const quickReplies = [
    'Tenho um projeto social',
    'Sou gestor público',
    'Quero investir',
    'Sou agricultor',
    'Preciso de mentoria'
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '800px',
      margin: '0 auto',
      background: 'rgba(10, 22, 40, 0.6)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(255,255,255,0.08)',
      borderRight: '1px solid rgba(255,255,255,0.08)'
    }}>
      {/* Header */}
      <header style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        background: 'rgba(10, 22, 40, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 600,
          color: '#fff',
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
        }}>
          N
        </div>
        <div>
          <h1 style={{
            fontSize: '17px',
            fontWeight: 600,
            color: '#fff',
            margin: 0,
            letterSpacing: '0.3px'
          }}>
            NARA
          </h1>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
            margin: 0,
            marginTop: '2px'
          }}>
            Recepcionista & Mentora · CONNECT HUB
          </p>
        </div>
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: 'rgba(34, 197, 94, 0.15)',
          borderRadius: '20px',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            background: '#22c55e',
            borderRadius: '50%',
            display: 'inline-block'
          }} />
          <span style={{
            fontSize: '12px',
            color: '#22c55e',
            fontWeight: 500
          }}>
            Online
          </span>
        </div>
      </header>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            color: '#fca5a5',
            fontSize: '14px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && !isLoading && (
        <div style={{
          padding: '0 24px 12px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(reply)
                inputRef.current?.focus()
              }}
              style={{
                padding: '8px 14px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '20px',
                color: '#93c5fd',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
              }}
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div style={{
        padding: '16px 24px 24px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(10, 22, 40, 0.8)',
        backdropFilter: 'blur(12px)'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Me conta sua ideia, sonho ou necessidade..."
            rows={1}
            style={{
              flex: 1,
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              color: '#e8ecf1',
              fontSize: '15px',
              fontFamily: 'inherit',
              resize: 'none',
              outline: 'none',
              transition: 'border-color 0.2s',
              minHeight: '48px',
              maxHeight: '120px'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            style={{
              padding: '12px 20px',
              background: input.trim() && !isLoading 
                ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                : 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '14px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '52px',
              fontFamily: 'inherit'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        <p style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
          marginTop: '10px'
        }}>
          A NARA protege seus dados sob a LGPD · CONNECT HUB 2026
        </p>
      </div>
    </div>
  )
}
