import React from 'react';
import { 
  BarChart3, 
  Users, 
  Sparkles, 
  Zap, 
  FileText, 
  HelpCircle, 
  Bot, 
  TrendingUp, 
  ShieldCheck,
  Target,
  BookOpen,
  Coins,
  Globe,
  CreditCard,
  Share2
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAnalysisModal: () => void;
  onOpenPlansModal?: () => void;
  onOpenUnitEconomicsModal?: () => void;
  onOpenPaymentGatewayModal?: () => void;
  onOpenSocialKitModal?: () => void;
  onOpenImplementationGuideModal?: () => void;
  onToggleCopilot: () => void;
  isCopilotOpen: boolean;
  automationsActiveCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAnalysisModal,
  onOpenPlansModal,
  onOpenUnitEconomicsModal,
  onOpenPaymentGatewayModal,
  onOpenSocialKitModal,
  onOpenImplementationGuideModal,
  onToggleCopilot,
  isCopilotOpen,
  automationsActiveCount
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Painel Preditivo', icon: BarChart3 },
    { id: 'directory', label: 'Criadores & Fraude', icon: Users },
    { id: 'simulator', label: 'Simulador de ROI', icon: Sparkles },
    { id: 'automations', label: 'Estúdio de Automação', icon: Zap },
    { id: 'briefing', label: 'Gerador de Briefing & Compliance', icon: FileText },
    { id: 'audience', label: 'Audiência & Segmentação', icon: Target },
    { id: 'creatives', label: 'Criativos & Mídia', icon: FileText },
    { id: 'metrics', label: 'Métricas & Metas', icon: TrendingUp },
    { id: 'integrations', label: 'Integrações', icon: Bot },
    { id: 'academy', label: 'Academy & Demo', icon: BookOpen },
    { id: 'landing', label: 'Página de Vendas', icon: Globe },
  ];

  return (
    <header className="bg-[#080808] border-b border-[#1F1F1F] text-white sticky top-0 z-40 shadow-2xl">
      {/* Top Notification Bar */}
      <div className="bg-[#0C0C0C] px-4 py-1.5 text-xs border-b border-[#1F1F1F] flex flex-wrap justify-between items-center gap-2 font-mono">
        <div className="flex items-center gap-2 text-[#888888]">
          <span className="inline-flex items-center justify-center bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-mono text-[10px] border border-indigo-500/20">
            <Sparkles className="w-3 h-3 mr-1 text-indigo-400 animate-pulse" /> ENGINE IA PREDITIVO ATIVO
          </span>
          <span className="hidden sm:inline text-[11px] text-[#777777]">Sintetizador neural de audiência e detecção de anomalias em tempo real</span>
        </div>
        
        <div className="flex items-center gap-4 text-[#888888]">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auditoria: <strong className="text-emerald-400 font-mono">98.2% Autêntico</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Automações: <strong className="text-amber-300 font-mono">{automationsActiveCount} Ativas</strong></span>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#A855F7] p-0.5 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <div className="w-full h-full bg-[#080808] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-serif italic tracking-tight text-white flex items-center gap-1">
                    InfluenciMax <span className="not-italic font-sans text-xs bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">Pro AI</span>
                  </h1>
                  <span className="bg-[#111111] text-indigo-300 border border-[#222222] text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm">
                    Executive Engine
                  </span>
                </div>
                <p className="text-[11px] text-[#666666] hidden sm:block font-light">Plataforma Preditiva & Automação Autônoma de Campanha</p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              {onOpenUnitEconomicsModal && (
                <button
                  onClick={onOpenUnitEconomicsModal}
                  className="p-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/30 flex items-center gap-1"
                  title="Cálculo Despesas IA vs Ganho"
                >
                  <Coins className="w-4 h-4" />
                </button>
              )}
              {onOpenPlansModal && (
                <button
                  onClick={onOpenPlansModal}
                  className="px-2.5 py-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center gap-1 shadow-sm"
                >
                  <span>Planos</span>
                </button>
              )}
              {onOpenSocialKitModal && (
                <button
                  onClick={onOpenSocialKitModal}
                  className="p-2 text-xs font-medium text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 rounded-lg border border-pink-500/30 flex items-center gap-1"
                  title="Kit Redes Sociais & Vídeo"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
              {onOpenImplementationGuideModal && (
                <button
                  onClick={onOpenImplementationGuideModal}
                  className="p-2 text-xs font-medium text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg border border-cyan-500/30 flex items-center gap-1"
                  title="Guia Oficial de Implantação (Download MD e PDF)"
                >
                  <FileText className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onOpenAnalysisModal}
                className="p-2 text-xs font-medium text-[#888888] hover:text-white bg-[#111111] rounded-lg border border-[#222222] flex items-center gap-1"
                title="Análise Comparativa com InfluenciMax"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
              </button>
              <button
                onClick={onToggleCopilot}
                className={`p-2 text-xs font-medium rounded-lg border flex items-center gap-1 transition-all ${
                  isCopilotOpen 
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                    : 'bg-[#111111] text-purple-300 border-[#222222]'
                }`}
              >
                <Bot className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenUnitEconomicsModal && (
              <button
                onClick={onOpenUnitEconomicsModal}
                className="px-3.5 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center gap-2 transition-all font-mono shadow-sm"
              >
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span>Despesas IA vs Ganho</span>
              </button>
            )}

            {onOpenPaymentGatewayModal && (
              <button
                onClick={onOpenPaymentGatewayModal}
                className="px-3.5 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center gap-2 transition-all font-mono shadow-sm"
                title="Configurar Gateway Asaas, Stripe e Recebimentos"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>Receber Pagamentos</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-2 transition-all font-mono ${
                activeTab === 'landing'
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Página de Vendas</span>
            </button>

            {onOpenSocialKitModal && (
              <button
                onClick={onOpenSocialKitModal}
                className="px-3.5 py-1.5 text-xs font-bold text-pink-300 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 hover:from-pink-500/20 hover:to-indigo-500/20 border border-pink-500/30 rounded-lg flex items-center gap-2 transition-all font-mono shadow-sm group"
                title="Imagens, Textos, Hashtags e Roteiro de Vídeo para Redes Sociais"
              >
                <Share2 className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Kit Redes Sociais & Vídeo</span>
              </button>
            )}

            {onOpenImplementationGuideModal && (
              <button
                onClick={onOpenImplementationGuideModal}
                className="px-3.5 py-1.5 text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center gap-2 transition-all font-mono shadow-sm group"
                title="Guia Oficial de Implantação Passo a Passo Botão a Botão (Download MD e PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Guia de Implantação (Download)</span>
              </button>
            )}

            {onOpenPlansModal && (
              <button
                onClick={onOpenPlansModal}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg flex items-center gap-2 shadow-md transition-all font-mono"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Planos & Licenças</span>
              </button>
            )}

            <button
              onClick={onOpenAnalysisModal}
              className="px-3.5 py-1.5 text-xs font-medium text-[#888888] hover:text-white bg-[#111111] hover:bg-[#181818] rounded-lg border border-[#222222] flex items-center gap-2 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Diferenciais vs InfluenciMax.com</span>
            </button>

            <button
              onClick={onToggleCopilot}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-2 transition-all ${
                isCopilotOpen 
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                  : 'bg-[#111111] hover:bg-[#181818] text-purple-300 border-[#222222]'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Copilot IA</span>
              {isCopilotOpen && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center flex-wrap gap-2 mt-4 pb-1 border-t border-[#1F1F1F] pt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#111111] text-white border border-[#333333] shadow-md'
                    : 'text-[#888888] hover:text-white hover:bg-[#111111]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-[#666666]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
