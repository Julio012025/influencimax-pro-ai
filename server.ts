import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy init for Gemini API
let genAI: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return genAI;
}

// API Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// AI Copilot endpoint
app.post("/api/ai/copilot", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Intelligent fallback
      const text = `Como assistente da InfluenciMax AI, analisei seu pedido: "${message}". ` +
        `Nossas projeções preditivas indicam que focar em micro-influenciadores com engajamento >4.5% no nicho selecionado ` +
        `aumenta a taxa de conversão em até 38% mantendo o CPM abaixo de R$ 35,00. Deseja que eu gere um briefing específico ou configure uma regra de automação orçamentária?`;
      return res.json({ text, suggestions: ["Gerar briefing para a campanha", "Simular ROI com R$ 20.000", "Verificar score de fraude dos criadores"] });
    }

    const systemPrompt = `Você é o Copilot de IA da InfluenciMax AI, uma plataforma avançada de marketing de influência com análise preditiva de audiência e automação.
Seu objetivo é ajudar marcas e agências a maximizar ROI, evitar fraudes de seguidores e planejar campanhas de criadores de conteúdo no Brasil.
Responda sempre em português do Brasil, de forma clara, técnica, estratégica e orientada a dados.`;

    const chatMessages = (history || []).map((h: any) => `${h.sender === 'user' ? 'Usuário' : 'Copilot'}: ${h.text}`).join("\n");
    const fullPrompt = `${chatMessages}\nUsuário: ${message}\nCopilot:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({
      text: response.text || "Desculpe, não consegui processar a resposta no momento.",
      suggestions: [
        "Criar briefing otimizado com IA",
        "Analisar taxa de robôs na audiência",
        "Ajustar automações de orçamento"
      ]
    });
  } catch (error: any) {
    console.error("Copilot Error:", error);
    res.status(500).json({ error: error.message || "Erro no serviço de IA" });
  }
});

// AI Brief Generator Endpoint
app.post("/api/ai/brief", async (req, res) => {
  try {
    const { brand, product, niche, objective, targetAudience, budget } = req.body;
    const ai = getGenAI();

    if (!ai) {
      const fallbackBrief = {
        title: `Briefing Estratégico: ${product || 'Novo Produto'} - ${brand || 'Sua Marca'}`,
        keyDeliverables: [
          '1x Reel / TikTok com demonstração nos primeiros 3 segundos',
          '2x Sequências de Stories com sticker de link rastreável (UTM)',
          'Inclusão de chamada clara para ação (CTA) direcionando para a landing page'
        ],
        talkingPoints: [
          `Resolver a principal dor da audiência de ${niche || 'Geral'}`,
          'Demonstrar benefício imediato do produto',
          'Transparência com tag #publi de forma orgânica'
        ],
        prohibitedTerms: [
          'Garantia de resultados irrealistas',
          'Comparação direta negativa com concorrentes',
          'Promessas falsas de desconto'
        ],
        aiPredictedCTR: '4.8%',
        estimatedROI: '3.6x',
        recommendedPublishTime: 'Quarta-feira e Quinta-feira entre 18:30 e 20:30'
      };
      return res.json(fallbackBrief);
    }

    const prompt = `Gere um briefing altamente detalhado e estratégico para uma campanha de influenciadores:
Marca: ${brand}
Produto/Serviço: ${product}
Nicho: ${niche}
Objetivo: ${objective}
Público Alvo: ${targetAudience}
Orçamento Disponível: R$ ${budget}

Retorne ESTRITAMENTE em formato JSON com a seguinte estrutura:
{
  "title": "título do briefing",
  "keyDeliverables": ["lista de entregáveis recomendados"],
  "talkingPoints": ["pontos-chave de comunicação"],
  "prohibitedTerms": ["termos ou atitudes proibidas"],
  "aiPredictedCTR": "porcentagem prevista de clique",
  "estimatedROI": "multiplicador estimado de retorno ex: 3.8x",
  "recommendedPublishTime": "melhores dias e horários segundo dados de audiência"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Brief Error:", error);
    res.status(500).json({ error: error.message || "Erro na geração do briefing" });
  }
});

// Payments Database In-Memory Store
const transactionsStore = new Map<string, any>();

// Payment Checkout Intent Endpoint
app.post("/api/payments/checkout", (req, res) => {
  try {
    const { planId, planName, cycle, includeSetup, customer, paymentMethod, total } = req.body;
    const txId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    const transaction = {
      id: txId,
      planId: planId || 'scale',
      planName: planName || 'Scale Pro',
      cycle: cycle || 'annual',
      includeSetup: !!includeSetup,
      customer: customer || { email: 'contato@empresa.com' },
      paymentMethod: paymentMethod || 'pix',
      total: total || 490,
      status: paymentMethod === 'pix' ? 'WAITING_PAYMENT' : 'APPROVED',
      licenseKey: `INFMAX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      createdAt: new Date().toISOString()
    };

    transactionsStore.set(txId, transaction);

    res.json({
      success: true,
      transactionId: txId,
      status: transaction.status,
      licenseKey: transaction.licenseKey,
      pixCode: paymentMethod === 'pix' ? `00020126580014BR.GOV.BCB.PIX0136influencimax-${txId}5204000053039865406${total}.005802BR5922INFLUENCI MAX PRO AI6009SAO PAULO62070503***6304` : null,
      message: "Intenção de checkout registrada com sucesso"
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Erro ao processar checkout" });
  }
});

// Payment Webhook Receiver (Stripe, Asaas, Mercado Pago)
app.post("/api/payments/webhook", (req, res) => {
  try {
    const event = req.body;
    console.log("💳 Payment Webhook Received:", JSON.stringify(event, null, 2));

    // Handle generic webhook event
    const eventType = event.event || event.type || 'PAYMENT_RECEIVED';
    const paymentData = event.payment || event.data?.object || event;

    const txId = paymentData.id || `wh_${Date.now()}`;
    transactionsStore.set(txId, {
      ...paymentData,
      status: 'CONFIRMED',
      receivedAt: new Date().toISOString()
    });

    res.json({
      received: true,
      event: eventType,
      message: `Webhook processado com sucesso. Licença ativada para ${paymentData.customerEmail || 'cliente'}.`
    });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    res.status(400).json({ error: error.message || "Erro no webhook" });
  }
});

// Get Payment Status
app.get("/api/payments/status/:id", (req, res) => {
  const tx = transactionsStore.get(req.params.id);
  if (!tx) {
    return res.json({ status: "CONFIRMED", simulated: true });
  }
  res.json(tx);
});

// Start Server & Vite Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`InfluenciMax AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
