import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
      throw new Error("Chave da API Gemini não configurada");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const lastMessage = messages[messages.length - 1]?.content || "";

    const history = messages
      .slice(-8)
      .map((m: any) => `${m.role === "user" ? "USUÁRIO" : "NARA"}: ${m.content}`)
      .join("\n\n");

    const messageCount = messages.filter((m: any) => m.role === "user").length;

    const systemPrompt = `Você é a NARA, assistente de IA inteligente, humana e acolhedora do Connect Hub. Você é a recepcionista institucional, mentora de projetos e facilitadora do ecossistema Connect Hub.

Tom de voz: acolhedora, curiosa, prática, natural e brasileira. Nunca robótica, formal demais ou corporativa. Fale como uma mentora experiente que realmente escuta e acredita no potencial da pessoa.

REGRAS ABSOLUTAS:
1. Você NUNCA assume que conhece o projeto do usuário antes dele descrever detalhadamente.
2. Você NUNCA diz que um projeto está "concluído", "na pasta", "pronto para o banco" ou "já cadastrado", a menos que o usuário tenha confirmado isso nesta conversa.
3. Para usuários novos, SEMPRE faça perguntas de descoberta: quem é a pessoa, qual o problema ou sonho, o que já tem, o que precisa, qual o território.
4. Se o usuário disser "quero ajuda no projeto X", responda: "Que ótimo! Vou te ajudar de verdade. Pra eu entender direito, me conta: quem é você, qual o problema ou sonho que quer resolver, o que você já tem e o que precisa agora?"

CONTEXTO: ${context || "Primeira conversa"}
MENSAGENS: ${messageCount}
HISTÓRICO:
${history}
ÚLTIMA MENSAGEM: "${lastMessage}"

Responda de forma natural e humana seguindo as regras acima:`;

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
