import ChatInterface from './components/ChatInterface'
import './globals.css'

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #1a2a4a 50%, #0d1b2a 100%)',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <ChatInterface />
    </main>
  )
}
