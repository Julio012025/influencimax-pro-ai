import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Check, 
  ArrowRight, 
  Lock, 
  CreditCard, 
  QrCode, 
  Building2, 
  HelpCircle, 
  Play, 
  Star, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Award, 
  Percent, 
  Clock, 
  Layers, 
  FileText, 
  Headphones, 
  Cpu, 
  DollarSign, 
  BarChart3,
  Users,
  Settings,
  Scale,
  Share2,
  Link2,
  Copy,
  ExternalLink,
  Megaphone,
  X
} from 'lucide-react';
import { AVAILABLE_PLANS, CheckoutPaymentModal } from './CheckoutPaymentModal';

interface PremiumSalesPageViewProps {
  onNavigateToApp: () => void;
  onOpenGatewayGuide?: () => void;
  onOpenSocialKit?: () => void;
}

export function PremiumSalesPageView({ onNavigateToApp, onOpenGatewayGuide, onOpenSocialKit }: PremiumSalesPageViewProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<string>('scale');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Interactive Simulator on Landing Page
  const [monthlyBudget, setMonthlyBudget] = useState(35000);
  const [creatorsCount, setCreatorsCount] = useState(8);

  // Accordion FAQ states
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isAdLinksModalOpen, setIsAdLinksModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customDomain, setCustomDomain] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('inf_custom_domain') || 'https://influencimax-pro-ai.vercel.app';
    }
    return 'https://influencimax-pro-ai.vercel.app';
  });

  const handleUpdateDomain = (domain: string) => {
    const cleaned = domain.trim().replace(/\/$/, '');
    setCustomDomain(cleaned);
    if (typeof window !== 'undefined') {
      localStorage.setItem('inf_custom_domain', cleaned);
    }
  };

  const getBaseUrl = () => {
    if (customDomain && customDomain.startsWith('http')) {
      return customDomain;
    }
    if (typeof window !== 'undefined' && window.location.origin) {
      if (window.location.origin.includes('ais-pre-')) {
        return window.location.origin.replace('ais-pre-', 'ais-dev-');
      }
      return window.location.origin;
    }
    return 'https://influencimax-pro-ai.vercel.app';
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Computed ROI savings
  const fraudLossAvoided = Math.round(monthlyBudget * 0.22); // 22% average fake audience in Brazil
  const predictedRevenueLift = Math.round(monthlyBudget * 3.8); // 3.8x ROI
  const hoursSavedPerMonth = creatorsCount * 14; // 14 hours per creator for scouting, vetting, negotiation & tracking

  const handleOpenCheckout = (planId: string) => {
    const checkoutMode = typeof window !== 'undefined' ? localStorage.getItem('inf_checkout_mode') : 'native';
    const externalLink = typeof window !== 'undefined' ? localStorage.getItem(`inf_link_${planId}`) : '';
    
    if (checkoutMode === 'external' && externalLink && externalLink.trim().startsWith('http')) {
      window.open(externalLink.trim(), '_blank');
      return;
    }
    
    setSelectedPlanForCheckout(planId);
    setIsCheckoutOpen(true);
  };

  const faqs = [
    {
      q: "Como o InfluenciMax Pro AI detecta robôs e fraudes em criadores brasileiros?",
      a: "Nossa tecnologia não olha apenas para o número de seguidores ou curtidas. Utilizamos algoritmos neurais que analisam a velocidade de crescimento, a proporção de comentários repetidos ou genéricos, o perfil geográfico dos seguidores (identificando contas de fazendas de cliques na Ásia/Leste Europeu) e a retenção real de visualizações em vídeo."
    },
    {
      q: "O que é e como funciona a Taxa de Implantação Assistida (Setup)?",
      a: "A Implantação Assistida é um serviço de onboarding VIP conduzido por especialistas seniores da InfluenciMax. Inclui: auditoria forense inicial de até 100 influenciadores da sua marca, configuração dos Webhooks com Meta Ads CAPI e Google Analytics 4, criação das suas 3 primeiras regras de guardrail autônomo e treinamento ao vivo gravado para toda a sua equipe. Nos planos anuais Scale e Growth, essa implantação é 100% gratuita como bônus."
    },
    {
      q: "Como funciona o recebimento de pagamentos e a emissão de nota fiscal?",
      a: "O sistema aceita PIX instantâneo com desconto de 5% e liberação em 3 segundos, Cartão de Crédito em até 12x (sem travar o limite total nos planos mensais) e Faturamento PJ via Boleto Bancário. A Nota Fiscal de Serviços Eletrônica (NFS-e) é emitida automaticamente após a compensação para o CNPJ cadastrado."
    },
    {
      q: "Como a plataforma prevê o ROI e as vendas antes de eu contratar o influenciador?",
      a: "Combinamos o modelo Gemini AI com um histórico consolidado de mais de R$ 14 milhões em campanhas brasileiras em e-commerce, moda, beleza, infoprodutos e finanças. O motor correlaciona nicho, ticket médio, CPM estimado e CTR histórico do criador para projetar vendas, CAC e faturamento com 94% de correlação."
    },
    {
      q: "Posso cancelar minha assinatura a qualquer momento?",
      a: "Sim. No plano mensal você pode cancelar quando quiser diretamente no painel, sem multas ou burocracia. Além disso, oferecemos garantia incondicional de 7 dias: se a ferramenta não identificar criadores fraudulentos na sua lista ou não superar suas expectativas, devolvemos 100% do valor pago via PIX."
    },
    {
      q: "Qual a diferença entre a versão antiga do InfluenciMax e o InfluenciMax Pro AI?",
      a: "A versão antiga era um diretório estático. O InfluenciMax Pro AI é um sistema operacional completo com IA generativa, motor preditivo com Gemini, automações 24/7 com desligamento de criadores de baixo desempenho, compliance automático com regras do CONAR e estúdio de criativos com OCR."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 border-b border-indigo-500/20 px-4 py-2 text-center text-xs font-mono text-indigo-200 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
        <span>LANÇAMENTO 2026: Motor Preditivo Gemini 3.6 + Implantação VIP Inclusa no Plano Anual!</span>
        <button 
          onClick={() => handleOpenCheckout('scale')}
          className="ml-2 underline text-white font-bold hover:text-cyan-300"
        >
          Aproveitar Oferta &rarr;
        </button>
      </div>

      {/* Top Header of the Landing Page */}
      <header className="border-b border-[#1A1A1A] bg-[#080808]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
              <div className="w-full h-full bg-[#080808] rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-serif italic text-white">InfluenciMax <span className="not-italic font-sans text-xs font-bold text-indigo-400">Pro AI</span></span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-[#777777] border-l border-[#262626] pl-2">
                Executive Marketing OS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAdLinksModalOpen(true)}
              className="flex text-xs font-semibold text-cyan-300 hover:text-cyan-200 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors items-center gap-1.5"
              title="Copiar link exato da página de vendas com UTMs para Meta Ads, Google Ads e TikTok"
            >
              <Megaphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Link do Anúncio</span>
            </button>

            {onOpenSocialKit && (
              <button
                onClick={onOpenSocialKit}
                className="hidden md:flex text-xs font-semibold text-pink-300 hover:text-pink-200 px-3 py-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 transition-colors items-center gap-1.5"
                title="Acessar fotos, textos e roteiro de vídeo para redes sociais"
              >
                <Share2 className="w-3.5 h-3.5 text-pink-400" />
                <span>Kit Redes Sociais</span>
              </button>
            )}
            <button
              onClick={onNavigateToApp}
              className="text-xs text-[#AAAAAA] hover:text-white px-3 py-1.5 rounded-lg border border-[#222222] hover:bg-[#141414] transition-colors"
            >
              Acessar Painel do Cliente
            </button>
            <button
              onClick={() => handleOpenCheckout('scale')}
              className="text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Ver Planos & Assinar</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#262626] text-xs font-mono text-[#A0A0A0]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auditoria Forense Antifraude & Motor Preditivo de Vendas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic tracking-tight text-white leading-tight">
            Pare de queimar orçamento com influenciadores que <span className="not-italic bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">compram seguidores</span>.
          </h1>

          <p className="text-base sm:text-xl text-[#AAAAAA] max-w-3xl mx-auto leading-relaxed font-light">
            O <strong className="text-white font-medium">InfluenciMax Pro AI</strong> prevê seu faturamento e ROI antes de assinar o contrato, audita 100% da audiência real dos maiores criadores do Brasil e corta verbas com automações autônomas 24/7.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenCheckout('scale')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 text-base font-mono group"
            >
              <span>CONTRATAR COM ATIVAÇÃO IMEDIATA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onNavigateToApp}
              className="w-full sm:w-auto px-6 py-4 bg-[#111111] hover:bg-[#181818] border border-[#2A2A2A] text-[#DDDDDD] hover:text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Play className="w-4 h-4 text-cyan-400" />
              <span>Ver Demonstração Interativa do Painel</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#1A1A1A] text-left">
            <div className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl">
              <span className="text-[10px] font-mono text-[#777777] uppercase block">Orçamentos Auditados</span>
              <span className="text-lg font-bold text-white font-mono">+R$ 14.800.000</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Em campanhas reais</span>
            </div>
            <div className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl">
              <span className="text-[10px] font-mono text-[#777777] uppercase block">Precisão Antifraude</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">98.2%</span>
              <span className="text-[10px] text-[#888888] block mt-0.5">Visão computacional & IA</span>
            </div>
            <div className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl">
              <span className="text-[10px] font-mono text-[#777777] uppercase block">ROI Médio dos Clientes</span>
              <span className="text-lg font-bold text-cyan-400 font-mono">3.7x a 5.2x</span>
              <span className="text-[10px] text-[#888888] block mt-0.5">Sobre investimento bruto</span>
            </div>
            <div className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl">
              <span className="text-[10px] font-mono text-[#777777] uppercase block">Compliance CONAR</span>
              <span className="text-lg font-bold text-purple-400 font-mono">100% Protegido</span>
              <span className="text-[10px] text-[#888888] block mt-0.5">Zero multas jurídicas</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PROBLEM VS SOLUTION */}
      <section className="py-16 bg-[#080808] border-y border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              O Mercado Tradicional Está Quebrado
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif italic text-white mt-3">
              Por que 74% das marcas perdem dinheiro com influenciadores?
            </h2>
            <p className="text-sm text-[#888888] font-mono mt-2">
              Contratar influenciador por número de seguidores ou Mídia Kit em PDF é o caminho mais rápido para queimar verba.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="bg-[#0E0E0E] border border-red-500/20 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Como a maioria ainda faz (Método Arriscado)
              </div>
              <h3 className="text-xl font-bold text-white">Planilhas manuais e confiança cega em prints</h3>
              <ul className="space-y-3 text-xs text-[#999999]">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Seguidores e engajamento falsos:</strong> Mídia Kits com prints adulterados no Canva e pods de engajamento no WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>ROI imprevisível:</strong> Você paga R$ 20.000 adiantado sem nenhuma garantia de quantos cliques ou vendas irão entrar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Sem controle em tempo real:</strong> Se o influenciador postar atrasado ou fora do briefing no fim de semana, você só descobre na segunda-feira.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Multas do CONAR e Procon:</strong> Falta de aviso explícito de #publi gerando processos e danos irreversíveis à reputação da marca.</span>
                </li>
              </ul>
            </div>

            {/* The InfluenciMax Pro Way */}
            <div className="bg-[#0E0E0E] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.1)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Com InfluenciMax Pro AI (Método Inteligente)
              </div>
              <h3 className="text-xl font-bold text-white">Previsibilidade matemática e proteção autônoma</h3>
              <ul className="space-y-3 text-xs text-[#CCCCCC]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Auditoria Forense Neural:</strong> Raio-X profundo que filtra contas inativas, fazendas de cliques e entrega a audiência real auditada.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Simulador Preditivo de ROI:</strong> Insira o orçamento e saiba o alcance provável, CPM real, número de conversões e retorno financeiro antes de contratar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Guardrails & Automações 24/7:</strong> Se o CPA passar do teto, a IA pausa a campanha ou realloca a verba automaticamente para criadores vencedores.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Briefing com Compliance Jurídico:</strong> Gerador com inteligência artificial que cria contratos e termos de entrega 100% alinhados às regras do CONAR.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 4 CORE PILLARS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            A Arquitetura Tecnológica
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif italic text-white mt-3">
            Quatro motores trabalhando juntos para multiplicar seu faturamento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 bg-[#0C0C0C] border border-[#202020] rounded-2xl space-y-3 hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Motor Preditivo Neural</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Alimentado por Gemini 3.6, processa milhões de pontos de dados para projetar vendas, taxa de conversão e custo por aquisição com até 94% de correlação.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-[#0C0C0C] border border-[#202020] rounded-2xl space-y-3 hover:border-emerald-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Auditoria Forense Antifraude</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Varredura de anomalias em comentários, identificação de bots, verificação de idade de contas seguidoras e score de autenticidade dos maiores criadores do país.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-[#0C0C0C] border border-[#202020] rounded-2xl space-y-3 hover:border-amber-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Estúdio de Automação 24/7</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Crie regras se-então para pausar criadores, disparar alertas no WhatsApp da equipe e rebalancear orçamentos automaticamente durante a veiculação.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-[#0C0C0C] border border-[#202020] rounded-2xl space-y-3 hover:border-purple-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Compliance CONAR & Jurídico</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Gera briefings com termos contratuais precisos, cláusulas de não-concorrência e checagem de alegações proibidas para blindar sua marca de sanções.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: INTERACTIVE ROI & SAVINGS CALCULATOR */}
      <section className="py-20 bg-[#0A0A0A] border-y border-[#1F1F1F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Calculadora Interativa de Payback
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white mt-3">
              Quanto sua marca vai economizar e faturar a mais?
            </h2>
            <p className="text-xs text-[#888888] font-mono mt-1">
              Ajuste seus valores reais de investimento mensal e veja a projeção matemática.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222222] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-[#888888] uppercase">Orçamento Mensal em Criadores:</span>
                    <span className="text-lg font-bold text-indigo-400">R$ {monthlyBudget.toLocaleString('pt-BR')},00</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="200000"
                    step="5000"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-[#222222] h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#555555] mt-1">
                    <span>R$ 5k</span>
                    <span>R$ 50k</span>
                    <span>R$ 100k</span>
                    <span>R$ 200k</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-[#888888] uppercase">Criadores Contratados / Mês:</span>
                    <span className="text-lg font-bold text-purple-400">{creatorsCount} criadores</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    step="1"
                    value={creatorsCount}
                    onChange={(e) => setCreatorsCount(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-[#222222] h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#555555] mt-1">
                    <span>2 criadores</span>
                    <span>15 criadores</span>
                    <span>40 criadores</span>
                  </div>
                </div>

                <div className="p-3 bg-[#161616] rounded-xl border border-[#262626] text-xs text-[#888888] space-y-1">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Algoritmo de Projeção Baseado em Dados 2026</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    O mercado brasileiro de creators registra em média 22% de contas fraudulentas em campanhas desprotegidas. Nossa auditoria recupera este valor diretamente no seu balanço.
                  </p>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="bg-[#0C0C0C] border border-indigo-500/30 rounded-2xl p-6 space-y-4 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                  Projeção Financeira Mensal
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-2">
                    <span className="text-[#AAAAAA]">Desperdício em Fraude Evitado:</span>
                    <span className="text-base font-bold text-emerald-400">R$ {fraudLossAvoided.toLocaleString('pt-BR')},00</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-2">
                    <span className="text-[#AAAAAA]">Faturamento Estimado (3.8x ROI):</span>
                    <span className="text-base font-bold text-cyan-400">R$ {predictedRevenueLift.toLocaleString('pt-BR')},00</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-2">
                    <span className="text-[#AAAAAA]">Horas Salvas da Equipe:</span>
                    <span className="text-base font-bold text-amber-300">{hoursSavedPerMonth} horas / mês</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-bold">Payback da Licença Pro:</span>
                    <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-md font-bold">
                      Menos de 3 dias úteis
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenCheckout('scale')}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs font-mono"
                >
                  <span>GARANTIR ESSA ECONOMIA NO MEU PLANO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PRICING GRID & ASSISTED SETUP */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="planos">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Tabela Transparente de Licenciamento
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-white mt-3">
            Escolha o plano ideal para a escala da sua operação
          </h2>
          <p className="text-xs sm:text-sm text-[#888888] font-mono mt-2">
            Todas as licenças incluem acesso aos dados dos maiores influenciadores do Brasil e auditoria antifraude contínua.
          </p>

          {/* Billing Cycle Switch */}
          <div className="inline-flex items-center gap-2 bg-[#111111] p-1.5 rounded-2xl border border-[#222222] mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                billingCycle === 'monthly' ? 'bg-[#222222] text-white font-bold' : 'text-[#777777] hover:text-white'
              }`}
            >
              Faturamento Mensal
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all flex items-center gap-2 ${
                billingCycle === 'annual' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md' 
                  : 'text-[#777777] hover:text-white'
              }`}
            >
              <span>Faturamento Anual</span>
              <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded font-mono font-bold">
                ECONOMIZE 20% + IMPLANTAÇÃO VIP GRÁTIS
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Plan 1: Starter Pro */}
          <div className="bg-[#0C0C0C] border border-[#202020] rounded-3xl p-6 flex flex-col justify-between hover:border-[#333333] transition-all">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block font-bold">
                  {AVAILABLE_PLANS[0].badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{AVAILABLE_PLANS[0].name}</h3>
                <p className="text-xs text-[#888888] mt-1 leading-relaxed">
                  {AVAILABLE_PLANS[0].description}
                </p>
              </div>

              <div className="border-y border-[#1C1C1C] py-4">
                <div className="text-3xl font-bold text-white font-mono">
                  R$ {billingCycle === 'annual' ? AVAILABLE_PLANS[0].annualMonthlyPrice : AVAILABLE_PLANS[0].monthlyPrice}
                  <span className="text-xs font-normal text-[#777777] font-sans">/mês</span>
                </div>
                <div className="text-[10px] text-[#666666] font-mono mt-1">
                  {billingCycle === 'annual' ? `Cobrado anualmente: R$ ${(AVAILABLE_PLANS[0].annualMonthlyPrice * 12).toLocaleString('pt-BR')}` : 'Cobrança mensal sem fidelidade'}
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Até 3 campanhas ativas simultâneas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Auditoria antifraude até 20 criadores/mês</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Simulador de ROI preditivo básico</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Gerador de Briefings de IA</span>
                </li>
                <li className="flex items-center gap-2 text-[#666666]">
                  <span className="text-xs">✕</span>
                  <span>Automações com desligamento autônomo</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleOpenCheckout('starter')}
                className="w-full py-2.5 bg-[#161616] hover:bg-[#202020] text-white border border-[#2E2E2E] rounded-xl text-xs font-mono font-bold transition-colors"
              >
                Assinar Starter Pro
              </button>
            </div>
          </div>

          {/* Plan 2: Scale Pro (Highlighted) */}
          <div className="bg-gradient-to-b from-[#131024] to-[#0D0C14] border-2 border-indigo-500/60 rounded-3xl p-6 flex flex-col justify-between relative shadow-[0_0_35px_rgba(99,102,241,0.25)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-0.5 rounded-full shadow-md">
              Mais Escolhido • ROI Garantido
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 block font-bold">
                  {AVAILABLE_PLANS[1].badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 flex items-center justify-between">
                  <span>{AVAILABLE_PLANS[1].name}</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </h3>
                <p className="text-xs text-[#999999] mt-1 leading-relaxed">
                  {AVAILABLE_PLANS[1].description}
                </p>
              </div>

              <div className="border-y border-indigo-500/20 py-4">
                <div className="text-3xl font-bold text-white font-mono">
                  R$ {billingCycle === 'annual' ? AVAILABLE_PLANS[1].annualMonthlyPrice : AVAILABLE_PLANS[1].monthlyPrice}
                  <span className="text-xs font-normal text-indigo-300 font-sans">/mês</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1 font-semibold">
                  {billingCycle === 'annual' ? 'Economia de R$ 1.200/ano + Implantação VIP Grátis!' : 'Cobrança mensal recorrente'}
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-[#CCCCCC]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Até 20 campanhas simultâneas</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Auditoria antifraude para 100 criadores/mês</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Estúdio de Automação com Guardrails 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Compliance CONAR e proteção jurídica</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Webhooks Meta Ads CAPI e GA4</span>
                </li>
                <li className="flex items-center gap-2 text-indigo-300">
                  <Star className="w-3.5 h-3.5 text-amber-400 shrink-0 fill-amber-400" />
                  <span>Suporte prioritário via WhatsApp</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleOpenCheckout('scale')}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-mono font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Assinar Scale Pro</span>
              </button>
            </div>
          </div>

          {/* Plan 3: Growth Agency */}
          <div className="bg-[#0C0C0C] border border-[#202020] rounded-3xl p-6 flex flex-col justify-between hover:border-[#333333] transition-all">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block font-bold">
                  {AVAILABLE_PLANS[2].badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{AVAILABLE_PLANS[2].name}</h3>
                <p className="text-xs text-[#888888] mt-1 leading-relaxed">
                  {AVAILABLE_PLANS[2].description}
                </p>
              </div>

              <div className="border-y border-[#1C1C1C] py-4">
                <div className="text-3xl font-bold text-white font-mono">
                  R$ {billingCycle === 'annual' ? AVAILABLE_PLANS[2].annualMonthlyPrice : AVAILABLE_PLANS[2].monthlyPrice}
                  <span className="text-xs font-normal text-[#777777] font-sans">/mês</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1">
                  {billingCycle === 'annual' ? 'Economia de R$ 3.600/ano + Onboarding Completo' : 'Cobrança mensal recorrente'}
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span><strong>Campanhas e criadores ilimitados</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Múltiplos clientes / workspaces separados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Estúdio Criativo com análise OCR contínua</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Exportação de relatórios white-label para clientes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Gerente de Sucesso Dedicado</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleOpenCheckout('growth')}
                className="w-full py-2.5 bg-[#161616] hover:bg-[#202020] text-white border border-[#2E2E2E] rounded-xl text-xs font-mono font-bold transition-colors"
              >
                Assinar Growth Agency
              </button>
            </div>
          </div>

          {/* Plan 4: Enterprise VIP */}
          <div className="bg-[#0C0C0C] border border-[#202020] rounded-3xl p-6 flex flex-col justify-between hover:border-[#333333] transition-all">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block font-bold">
                  {AVAILABLE_PLANS[3].badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{AVAILABLE_PLANS[3].name}</h3>
                <p className="text-xs text-[#888888] mt-1 leading-relaxed">
                  {AVAILABLE_PLANS[3].description}
                </p>
              </div>

              <div className="border-y border-[#1C1C1C] py-4">
                <div className="text-3xl font-bold text-white font-mono">
                  R$ {billingCycle === 'annual' ? AVAILABLE_PLANS[3].annualMonthlyPrice : AVAILABLE_PLANS[3].monthlyPrice}
                  <span className="text-xs font-normal text-[#777777] font-sans">/mês</span>
                </div>
                <div className="text-[10px] text-[#777777] font-mono mt-1">
                  Contrato corporativo faturado com NF-e
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Tudo do plano Growth sem limitações</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Instância dedicada ou integração On-Premise</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Acordo de Nível de Serviço (SLA 99.9%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Adequação jurídica LGPD / DPA customizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Treinamento presencial / remoto exclusivo</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleOpenCheckout('enterprise')}
                className="w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-mono font-bold transition-colors"
              >
                Falar com Consultor VIP
              </button>
            </div>
          </div>

        </div>

        {/* DETAILED SECTION: WHAT IS INCLUDED IN ASSISTED SETUP / IMPLANTAÇÃO */}
        <div className="mt-16 bg-[#0E0E0E] border border-amber-500/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>O que está incluso na Implantação Assistida (Setup)?</span>
              </div>
              <h3 className="text-2xl font-serif italic text-white">
                Nós configuramos tudo para sua marca começar gerando lucro
              </h3>
              <p className="text-xs text-[#999999] leading-relaxed">
                Você não precisa gastar semanas aprendendo ou configurando ferramentas. Nosso time técnico e estratégico assume a implantação completa da sua conta em até 5 dias úteis:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#CCCCCC]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Auditoria da sua lista:</strong> Varredura de até 100 influenciadores que você já contratou ou quer contratar.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Integração de Webhooks:</strong> Conexão direta com Meta Ads CAPI, GA4 e seu CRM/ERP.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Setup de Guardrails:</strong> Configuração das primeiras 3 regras autônomas para proteção de orçamento.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Treinamento VIP:</strong> Sessão ao vivo via Google Meet para sua equipe, com gravação vitalícia.</span>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 text-center space-y-3 min-w-[280px] w-full lg:w-auto">
              <span className="text-[10px] font-mono text-[#777777] uppercase block">Valor da Implantação Avulsa</span>
              <div className="text-2xl font-bold font-mono text-white">R$ 980,00</div>
              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 py-1 px-3 rounded-full border border-emerald-500/20">
                100% GRÁTIS no Plano Anual!
              </div>
              <button
                onClick={() => handleOpenCheckout('scale')}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs font-mono shadow-md transition-all"
              >
                Garantir com Implantação
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION: GATEWAYS & SECURITY */}
      <section className="py-16 bg-[#080808] border-y border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Segurança & Meios de Pagamento Integrados
          </span>
          <h2 className="text-2xl font-serif italic text-white">
            Como você e seus clientes realizam o pagamento?
          </h2>
          <p className="text-xs text-[#888888] font-mono max-w-2xl mx-auto">
            Integração nativa com os principais gateways homologados do Banco Central e padrão internacional PCI-DSS Nível 1.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 bg-[#0F0F0F] border border-[#222222] rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <QrCode className="w-4 h-4" />
                <span>PIX Instantâneo</span>
              </div>
              <p className="text-[11px] text-[#888888]">
                QR Code dinâmico e chave copia e cola com conciliação automática em 3 segundos e 5% de desconto extra.
              </p>
            </div>

            <div className="p-4 bg-[#0F0F0F] border border-[#222222] rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                <CreditCard className="w-4 h-4" />
                <span>Cartão de Crédito 12x</span>
              </div>
              <p className="text-[11px] text-[#888888]">
                Visa, Mastercard, Elo, Hipercard e American Express. Recorrência inteligente que não bloqueia o limite do cartão.
              </p>
            </div>

            <div className="p-4 bg-[#0F0F0F] border border-[#222222] rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                <Building2 className="w-4 h-4" />
                <span>Boleto Bancário / Faturamento PJ</span>
              </div>
              <p className="text-[11px] text-[#888888]">
                Linha digitável, DDA bancário automático e emissão simultânea de Nota Fiscal Eletrônica de Serviços (NFS-e).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Resultados Comprovados
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-white mt-3">
            O que dizem os líderes que escalaram campanhas com a gente
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0C0C0C] border border-[#1F1F1F] rounded-2xl space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-[#CCCCCC] italic leading-relaxed">
              "Na nossa primeira semana, a auditoria identificou que um creator com 1,8M de seguidores tinha 62% de audiência fantasma. Só com esse aviso economizamos R$ 28.000 em um único contrato!"
            </p>
            <div className="pt-2 border-t border-[#1C1C1C]">
              <span className="text-xs font-bold text-white block">Rodrigo Meneghel</span>
              <span className="text-[11px] text-[#777777]">Head de Mídia • E-commerce DNVB</span>
            </div>
          </div>

          <div className="p-6 bg-[#0C0C0C] border border-[#1F1F1F] rounded-2xl space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-[#CCCCCC] italic leading-relaxed">
              "O simulador de ROI virou nossa apresentação padrão para a diretoria. Conseguimos aprovar 3x mais orçamento porque agora mostramos a previsão matemática do faturamento esperado."
            </p>
            <div className="pt-2 border-t border-[#1C1C1C]">
              <span className="text-xs font-bold text-white block">Mariana Siqueira</span>
              <span className="text-[11px] text-[#777777]">Diretora de Marketing • Agência BrandPulse</span>
            </div>
          </div>

          <div className="p-6 bg-[#0C0C0C] border border-[#1F1F1F] rounded-2xl space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-[#CCCCCC] italic leading-relaxed">
              "A implantação assistida valeu cada centavo. O time de vocês auditou nossa base inteira e configurou o Meta Ads CAPI no mesmo dia. A equipe já operou sozinha na segunda semana."
            </p>
            <div className="pt-2 border-t border-[#1C1C1C]">
              <span className="text-xs font-bold text-white block">Lucas Faria</span>
              <span className="text-[11px] text-[#777777]">CMO • Marca de Suplementos & Bem-Estar</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ ACCORDION */}
      <section className="py-20 bg-[#080808] border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white mt-3">
              Perguntas & Respostas sobre a Licença
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-[#0E0E0E] border border-[#202020] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-indigo-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#777777] shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#AAAAAA] leading-relaxed border-t border-[#1A1A1A] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-indigo-950/60 border border-indigo-500/40 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(99,102,241,0.25)] space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Garantia Incondicional de 7 Dias • Risco Zero</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif italic text-white">
            Pronto para transformar criadores em uma máquina preditiva de vendas?
          </h2>

          <p className="text-xs sm:text-sm text-[#AAAAAA] max-w-2xl mx-auto font-mono">
            Ative agora o plano Scale Pro com desconto no ciclo anual e ganhe a sessão de Implantação VIP sem nenhum custo adicional.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleOpenCheckout('scale')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold rounded-xl text-sm font-mono shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>ASSINAR AGORA COM LIBERAÇÃO IMEDIATA</span>
            </button>

            <button
              onClick={onNavigateToApp}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#141414] hover:bg-[#1E1E1E] text-[#CCCCCC] hover:text-white rounded-xl text-xs font-mono border border-[#2A2A2A] transition-colors"
            >
              Voltar ao Painel da Aplicação
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1A1A1A] py-8 text-center text-xs font-mono text-[#666666] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© {new Date().getFullYear()} InfluenciMax Pro AI — Todos os direitos reservados. CNPJ: 42.183.921/0001-44.</p>
          <p className="text-[10px] text-[#444444]">
            Plataforma preditiva independente com auditoria forense por visão computacional e inteligência artificial neural.
          </p>
        </div>
      </footer>

      {/* Interactive Checkout Modal */}
      <CheckoutPaymentModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlanId={selectedPlanForCheckout}
        billingCycle={billingCycle}
        onSuccess={(data) => {
          // Success handled in modal
        }}
      />

      {/* Modal de Links de Anúncio e Rastreamento UTM */}
      {isAdLinksModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0D0D] border border-cyan-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAdLinksModalOpen(false)}
              className="absolute top-4 right-4 text-[#777777] hover:text-white p-1 rounded-lg hover:bg-[#1A1A1A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Links Oficiais da Página de Vendas para Anúncios
                </h3>
                <p className="text-xs text-[#888888] font-mono">
                  Copie o link configurado para levar o usuário diretamente para a Página de Vendas
                </p>
              </div>
            </div>

            {/* Explanatory Banner about 404 error in browser */}
            <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                <span>⚠️ POR QUE O LINK AIS-PRE-... RETORNA "HTTP ERROR 404"?</span>
              </div>
              <p className="text-[12px] text-[#D4D4D4] leading-relaxed">
                O endereço <code className="text-rose-400 bg-black/40 px-1 py-0.5 rounded font-mono">ais-pre-*.run.app</code> é um <strong>túnel interno temporário do Google AI Studio</strong>, restrito à sua sessão de desenvolvimento. Ele <strong>não é um site público</strong> e o Google Cloud bloqueia com <strong>404</strong> caso seja colado em outra aba ou acessado por visitantes externos.
              </p>
              <div className="p-2.5 bg-black/40 rounded-lg border border-amber-500/20 text-[11px] text-[#A0A0A0] space-y-1">
                <span className="text-emerald-400 font-bold font-mono block">✅ SOLUÇÃO DEFINITIVA PARA ANÚNCIOS:</span>
                Como seu código já está 100% no seu GitHub (<strong className="text-white">Julio012025/influencimax-pro-ai</strong>), basta fazer o deploy gratuito na <strong>Vercel</strong> para ter seu link permanente oficial (ex: <code className="text-cyan-300">influencimax-pro-ai.vercel.app</code> ou seu domínio próprio <code className="text-cyan-300">seusite.com.br</code>).
              </div>
            </div>

            {/* Configurar Domínio Oficial de Produção */}
            <div className="p-4 rounded-xl bg-[#141414] border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  Domínio Oficial para seus Anúncios (Vercel ou Próprio)
                </span>
                <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  Atualiza todos os links abaixo
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={customDomain}
                  onChange={(e) => handleUpdateDomain(e.target.value)}
                  placeholder="https://influencimax-pro-ai.vercel.app ou https://seusite.com.br"
                  className="bg-[#080808] border border-[#333333] focus:border-cyan-400 text-xs text-white font-mono flex-1 px-3 py-2 rounded-lg outline-none"
                />
                <button
                  onClick={() => handleUpdateDomain(customDomain)}
                  className="px-3 py-2 bg-[#222222] hover:bg-[#333333] text-white text-xs font-mono rounded-lg transition-all"
                >
                  Salvar
                </button>
              </div>
              <p className="text-[10px] text-[#888888] font-mono">
                Dica: Digite o link da Vercel ou seu domínio com <code className="text-cyan-400">https://</code>. Todos os links com UTMs abaixo serão atualizados em tempo real.
              </p>
            </div>

            {/* Link Principal */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#222222] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <Link2 className="w-4 h-4 text-cyan-400" />
                  Link Direto Principal (Sem UTM)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Abre na Página de Vendas
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#080808] p-2.5 rounded-lg border border-[#282828]">
                <input 
                  type="text" 
                  readOnly 
                  value={`${getBaseUrl()}?tab=landing`}
                  className="bg-transparent text-xs text-cyan-300 font-mono flex-1 outline-none select-all"
                />
                <button
                  onClick={() => copyToClipboard(`${getBaseUrl()}?tab=landing`, 'direct')}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded font-mono flex items-center gap-1 transition-all"
                >
                  {copiedKey === 'direct' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'direct' ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Links com UTM por Plataforma */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#AAAAAA] uppercase tracking-wider">
                Links Otimizados com Rastreamento (UTM) por Canal
              </h4>

              {/* Meta Ads */}
              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222222] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs font-semibold text-white">Meta Ads (Instagram & Facebook Feed/Stories)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${getBaseUrl()}?tab=landing&utm_source=meta&utm_medium=cpc&utm_campaign=lancamento_pro&utm_content=video_antifraude`, 'meta')}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {copiedKey === 'meta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'meta' ? 'Copiado!' : 'Copiar Link Meta'}
                  </button>
                </div>
                <div className="text-[11px] text-[#777777] font-mono truncate bg-[#0A0A0A] p-2 rounded border border-[#1E1E1E]">
                  {`${getBaseUrl()}?tab=landing&utm_source=meta&utm_medium=cpc&utm_campaign=lancamento_pro&utm_content=video_antifraude`}
                </div>
              </div>

              {/* Google Ads */}
              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222222] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-semibold text-white">Google Ads (Pesquisa & Performance Max)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${getBaseUrl()}?tab=landing&utm_source=google&utm_medium=search&utm_campaign=influencimax_conversao`, 'google')}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {copiedKey === 'google' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'google' ? 'Copiado!' : 'Copiar Link Google'}
                  </button>
                </div>
                <div className="text-[11px] text-[#777777] font-mono truncate bg-[#0A0A0A] p-2 rounded border border-[#1E1E1E]">
                  {`${getBaseUrl()}?tab=landing&utm_source=google&utm_medium=search&utm_campaign=influencimax_conversao`}
                </div>
              </div>

              {/* TikTok Ads */}
              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222222] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                    <span className="text-xs font-semibold text-white">TikTok Ads (Tráfego de Vídeo Curto)</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${getBaseUrl()}?tab=landing&utm_source=tiktok&utm_medium=video&utm_campaign=antifraude_influenciadores`, 'tiktok')}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {copiedKey === 'tiktok' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'tiktok' ? 'Copiado!' : 'Copiar Link TikTok'}
                  </button>
                </div>
                <div className="text-[11px] text-[#777777] font-mono truncate bg-[#0A0A0A] p-2 rounded border border-[#1E1E1E]">
                  {`${getBaseUrl()}?tab=landing&utm_source=tiktok&utm_medium=video&utm_campaign=antifraude_influenciadores`}
                </div>
              </div>

              {/* Bio Instagram / WhatsApp */}
              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#222222] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-white">Bio do Instagram & WhatsApp Business</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${getBaseUrl()}?tab=landing&utm_source=instagram&utm_medium=bio`, 'bio')}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {copiedKey === 'bio' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'bio' ? 'Copiado!' : 'Copiar Link Bio'}
                  </button>
                </div>
                <div className="text-[11px] text-[#777777] font-mono truncate bg-[#0A0A0A] p-2 rounded border border-[#1E1E1E]">
                  {`${getBaseUrl()}?tab=landing&utm_source=instagram&utm_medium=bio`}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-cyan-950/30 border border-emerald-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5 font-mono">
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  Passo a Passo: Como Ativar seu Link Público na Vercel (Gratuito)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Leva 2 minutos
                </span>
              </div>
              <ol className="list-decimal list-inside text-[11px] text-[#CCCCCC] space-y-1 font-mono">
                <li>Acesse <strong>vercel.com</strong> e faça login com seu GitHub (<code className="text-cyan-300">Julio012025</code>).</li>
                <li>Clique em <strong>"Add New..." → "Project"</strong> e selecione o repositório <strong>influencimax-pro-ai</strong>.</li>
                <li>Clique em <strong>"Deploy"</strong>. A Vercel criará seu link público oficial (ex: <code className="text-emerald-300">influencimax-pro-ai.vercel.app</code>).</li>
                <li>Cole esse link no campo "Domínio Oficial" acima para gerar todos os links de anúncio!</li>
              </ol>
            </div>

            <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 space-y-1 font-mono">
              <p className="font-bold">Dica de Configuração nos Gerenciadores de Anúncios:</p>
              <p className="text-[#AAAAAA]">
                Cole o link acima no campo <strong>"URL do Site"</strong> (no Gerenciador de Anúncios da Meta) ou <strong>"URL Final"</strong> (no Google Ads). O parâmetro <code className="text-cyan-300">?tab=landing</code> garante que o visitante caia instantaneamente na página de vendas com simulador e checkout.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
