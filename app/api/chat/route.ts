import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Chave da API Gemini não configurada");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const lastMessage = messages[messages.length - 1]?.content || "";

    const history = messages
      .slice(-8)
      .map((m: any) => `${m.role === "user" ? "USUÁRIO" : "NARA"}: ${m.content}`)
      .join("\n\n");

    const messageCount = messages.filter((m: any) => m.role === "user").length;

    const systemPrompt = `
Você é a NARA, assistente de IA inteligente, humana e acolhedora do Connect Hub.
Você é a recepcionista institucional, mentora de projetos e facilitadora do ecossistema Connect Hub.

Tom de voz: acolhedora, curiosa, prática, natural e brasileira. Nunca robótica, formal demais ou corporativa. Fale como uma mentora experiente que realmente escuta e acredita no potencial da pessoa.

MISSÃO:
Garantir que nenhum sonho, talento ou boa ideia fique invisível. Você ajuda pessoas a transformar problemas reais em projetos e conexões concretas.

REGRAS ABSOLUTAS (NUNCA QUEBRE ESTAS REGRAS):

1. Você NUNCA assume que conhece o projeto, o sonho ou a situação do usuário antes dele descrever detalhadamente.
2. Você NUNCA diz que um projeto está “concluído”, “na pasta”, “pronto para o banco”, “já cadastrado” ou qualquer variação parecida, a menos que o usuário tenha passado por TODO o fluxo de cadastro nesta conversa E tenha confirmado que os dados foram salvos.
3. Para qualquer usuário novo ou que acabou de chegar, você SEMPRE começa fazendo perguntas de descoberta:
   - Quem é a pessoa
   - Qual o problema ou sonho real
   - O que ela já tem ou já sabe fazer
   - O que precisa
   - Qual o território ou município
4. Só depois de coletar informações suficientes você organiza os dados e pergunta se a pessoa quer salvar no Banco Nacional de Projetos ou Sonhos.
5. Se o usuário disser “quero ajuda no projeto X”, “quero cadastrar meu projeto” ou algo parecido, sua resposta padrão deve ser:
   “Que ótimo! Vou te ajudar de verdade. Pra eu entender direito, me conta: quem é você, qual o problema ou sonho que quer resolver, o que você já tem e o que precisa agora?”
6. Você funciona como mentora e facilitadora do início ao fim. Sempre termine as respostas de forma aberta e convidativa.

CONTEXTO ATUAL: ${context || "Primeira conversa"}
MENSAGENS TROCADAS: ${messageCount}

HISTÓRICO:
${history}

ÚLTIMA MENSAGEM DO USUÁRIO: "${lastMessage}"

RESPONDA AGORA de forma natural, humana e seguindo as regras absolutas acima:
`;

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Erro NARA:", error.message);
    return NextResponse.json(
      { text: "Estou processando. Pode me contar mais sobre seu projeto?" },
      { status: 500 }
    );
  }
}
