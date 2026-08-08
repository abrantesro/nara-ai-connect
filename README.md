# 🤖 NARA — Recepcionista Inteligente da CONNECT HUB

> "A Ponte das Oportunidades entre quem oferece e quem procura"

A NARA é a inteligência mestre e recepcionista institucional do **CONNECT HUB**, ecossistema nacional de desenvolvimento inteligente do Brasil.

---

## ✨ O que é a NARA?

- **Recepcionista Institucional** do site CONNECT HUB
- **Mentora de Projetos** para empreendedores, agricultores, gestores e comunidades
- **Maestrina do Ecossistema** — conecta necessidades a oportunidades

## 🏗️ Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Usuário       │────▶│  Next.js 14     │────▶│  Gemini API     │
│   (Browser)     │◀────│  (Vercel)       │◀────│  (Google AI)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **Frontend**: Next.js 14 (App Router) + React + CSS puro
- **Backend**: API Route Next.js (`/api/chat`)
- **IA**: Google Gemini API (modelo `gemini-1.5-flash` — gratuito)
- **Deploy**: Vercel Hobby (gratuito)

---

## 🚀 Deploy em 5 minutos

### 1. Clone e instale

```bash
git clone <seu-repo>
cd nara-connect-hub
npm install
```

### 2. Configure a chave da API

```bash
cp .env.example .env.local
```

Edite `.env.local`:
```
GEMINI_API_KEY=sua_chave_aqui
GEMINI_MODEL=gemini-1.5-flash
```

**Como obter a chave:**
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clique em "Create API Key"
3. Copie a chave e cole no `.env.local`

> ⚠️ **Produção**: Para uso em produção, migre para o **Google Cloud Platform** (Vertex AI) em vez do Google AI Studio.

### 3. Rode localmente

```bash
npm run dev
```

Acesse: `http://localhost:3000`

### 4. Deploy na Vercel

```bash
npm i -g vercel
vercel --prod
```

Ou conecte seu repositório GitHub na [Vercel](https://vercel.com) para deploy automático.

---

## 📁 Estrutura do Projeto

```
nara-connect-hub/
├── app/
│   ├── api/chat/route.ts      # API endpoint — comunicação com Gemini
│   ├── components/
│   │   ├── ChatInterface.tsx   # Interface principal do chat
│   │   ├── MessageBubble.tsx   # Bolhas de mensagem
│   │   └── TypingIndicator.tsx # Animação de digitação
│   ├── layout.tsx              # Layout raiz
│   ├── page.tsx                # Página inicial
│   └── globals.css             # Estilos globais
├── .env.example                # Template de variáveis
├── next.config.js              # Config Next.js (export estático)
├── package.json
└── tsconfig.json
```

---

## 🧠 System Prompt

O "cérebro" da NARA está em `app/api/chat/route.ts` na constante `SYSTEM_PROMPT`.

Para ajustar a personalidade, edite este prompt. Ele define:
- Identidade e arquétipo (Mentora Sábia)
- Protocolo de Ouro (5 passos do atendimento)
- Diretrizes por público (sonho, investidor, gestor)
- Regras críticas (LGPD, linguagem, limitações)

---

## 🔒 Segurança & LGPD

- ✅ Nunca pede dados pessoais no primeiro contato
- ✅ Solicita autorização antes de persistir dados
- ✅ Não promete resultados financeiros garantidos
- ✅ Encaminha para análise humana
- ✅ Chave da API protegida no servidor (API Route)

---

## 🎨 Personalização

### Cores
Edite `globals.css` e os estilos inline nos componentes para ajustar a identidade visual da CONNECT HUB.

### Mensagem de boas-vindas
Edite a constante `WELCOME_MESSAGE` em `ChatInterface.tsx`.

### Respostas rápidas
Edite o array `quickReplies` em `ChatInterface.tsx`.

---

## 📄 Licença

CONNECT HUB — Ecossistema Nacional de Desenvolvimento Inteligente (Brasil 2026)
