export const metadata = {
  title: 'NARA | CONNECT HUB',
  description: 'Recepcionista Inteligente do Ecossistema Nacional de Desenvolvimento Inteligente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
