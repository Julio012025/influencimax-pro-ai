import React from 'react';
import { INFLUENCIMAX_COMPARISON } from '../data/mockData';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';

interface InfluenciMaxAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfluenciMaxAnalysisModal: React.FC<InfluenciMaxAnalysisModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Análise Detalhada: InfluenciMax.com vs InfluenciMax AI</h2>
            <p className="text-xs text-slate-400">
              Relatório de engenharia reversa e melhorias estruturais implementadas em nossa plataforma.
            </p>
          </div>
        </div>

        {/* Section 1: Site Analysis */}
        <div className="space-y-4 mb-8 text-xs text-slate-300">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-sm text-cyan-300 mb-2">1. O que o site InfluenciMax.com oferece atualmente:</h3>
            <p className="leading-relaxed text-slate-300">
              O InfluenciMax tradicional é uma plataforma de conexão e gestão de campanhas com influenciadores focada no mercado brasileiro. Seus recursos principais englobam a busca de criadores por contagem de seguidores e segmento, canal de mensageria para envio de briefings, esteira de aprovação manual de artes/vídeos e geração de relatórios de métricas estáticas históricas (ex: curtidas e alcance passado).
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 p-4 rounded-2xl border border-indigo-500/30">
            <h3 className="font-bold text-sm text-indigo-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              2. Como nossa plataforma InfluenciMax AI se torna substancialmente SUPERIOR:
            </h3>
            <p className="leading-relaxed text-slate-200">
              Transformamos a gestão tradicional reativa em um **Sistema Operacional Autônomo e Preditivo com IA Gemini**. Em vez de olhar para dados estáticos passados, prevemos o futuro da campanha antes do investimento ser realizado e automatizamos decisões sem intervenção humana manual.
            </p>
          </div>
        </div>

        {/* Section 2: Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Traditional site list */}
          <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-2xl space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              InfluenciMax Tradicional
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {INFLUENCIMAX_COMPARISON.traditionalSiteFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-600 mt-0.5">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our advanced site list */}
          <div className="bg-indigo-950/30 border border-cyan-500/30 p-5 rounded-2xl space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              InfluenciMax AI (Nossa Plataforma)
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              {INFLUENCIMAX_COMPARISON.ourAdvancedPlatformFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30"
          >
            Explorar Plataforma InfluenciMax AI
          </button>
        </div>
      </div>
    </div>
  );
};
