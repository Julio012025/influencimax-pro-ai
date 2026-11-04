import React from 'react';
import { Campaign, AutomationRule, Creator } from '../types';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Play,
  Plus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

interface DashboardViewProps {
  campaigns: Campaign[];
  creators: Creator[];
  automations: AutomationRule[];
  onNavigateToSimulator: () => void;
  onNavigateToAutomations: () => void;
  onNavigateToDirectory: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  campaigns,
  creators,
  automations,
  onNavigateToSimulator,
  onNavigateToAutomations,
  onNavigateToDirectory,
}) => {
  // Aggregate stats
  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalActualReach = campaigns.reduce((acc, c) => acc + c.metrics.actualReach, 0);
  const totalPredictedReach = campaigns.reduce((acc, c) => acc + c.metrics.predictedReach, 0);
  const avgROI = (campaigns.reduce((acc, c) => acc + c.metrics.roi, 0) / (campaigns.length || 1)).toFixed(1);
  const activeAutomationsCount = automations.filter(a => a.active).length;

  // Aggregate trend data from active campaign
  const activeCampaign = campaigns[0] || campaigns[1];
  const chartData = activeCampaign ? activeCampaign.dailyTrend : [];

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono">
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Executive Overview
              </span>
            </div>
            <h2 className="text-3xl font-serif italic text-white tracking-tight">Executive Dashboard & Analytics</h2>
            <p className="text-xs text-[#888888] mt-1 max-w-2xl font-light">
              Real-time audience synthesis and autonomous campaign management powered by neural algorithms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToSimulator}
              className="px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simular Investimento</span>
            </button>
            <button
              onClick={onNavigateToAutomations}
              className="px-4 py-2.5 bg-[#111111] hover:bg-[#181818] text-[#E0E0E0] border border-[#222222] rounded-full font-semibold text-xs flex items-center gap-2 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Automações</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Reach Card */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5 shadow-sm hover:border-[#333333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">Alcance Preditivo vs Real</span>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-light text-white font-mono">
              {(totalActualReach / 1000).toFixed(0)}k <span className="text-xs font-normal text-[#555555]">/ {(totalPredictedReach / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+6.1% vs projeção</span>
            </div>
          </div>
        </div>

        {/* ROI Multiplier Card */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5 shadow-sm hover:border-[#333333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">Est. Campaign ROI</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-light text-white font-mono">
              {avgROI}x
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#777777] font-mono mt-1">
              <span>Retorno: R$ {(totalSpent * parseFloat(avgROI)).toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>

        {/* Active Automations Card */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5 shadow-sm hover:border-[#333333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">Automações Ativas</span>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-light text-white font-mono">
              {activeAutomationsCount} <span className="text-xs font-normal text-[#555555]">Regras</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Proteção e compliance 24/7</span>
            </div>
          </div>
        </div>

        {/* Fraud Health Score */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5 shadow-sm hover:border-[#333333] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">Qualidade Audiência</span>
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-light text-emerald-400 font-mono">
              98.2%
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#777777] font-mono mt-1">
              <span>Robôs &lt; 1.8% na base</span>
            </div>
          </div>
        </div>
      </div>

      {/* Análises Preditivas Pro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Alerta Antifraude', value: 'OK', desc: 'Monitorando cadastros...', color: 'text-emerald-400' },
          { title: 'Heatmap Retenção', value: 'Slide 3', desc: 'Ponto de evasão identificado', color: 'text-amber-400' },
          { title: 'LTV vs CAC', value: '4.2x', desc: 'Projeção de receita recorrente', color: 'text-indigo-400' },
          { title: 'Escala Sugerida', value: '+R$ 500', desc: 'ROI estimado 3.2x', color: 'text-emerald-400' }
        ].map((item, i) => (
          <div key={i} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
            <p className="text-[10px] text-[#666666] uppercase">{item.title}</p>
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-[10px] text-[#444]">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Chart & Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predictive Chart */}
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-serif italic text-white flex items-center gap-2">
                Curva Preditiva de Alcance (Forecast 7d)
              </h3>
              <p className="text-xs text-[#666666] font-mono">Ativa: {activeCampaign?.title}</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                <span className="text-[#AAAAAA]">Alcance Real</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                <span className="text-[#666666]">Projeção ML</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="date" stroke="#444444" fontSize={11} tickLine={false} />
                <YAxis stroke="#444444" fontSize={11} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#080808', borderColor: '#222222', borderRadius: '12px', fontSize: '12px', color: '#fff' }} 
                  formatter={(value: any) => [`${value.toLocaleString()} visualizações`, '']}
                />
                <Area type="monotone" dataKey="actualViews" name="Alcance Real" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="predictedViews" name="Alcance Previsto IA" stroke="#a855f7" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorPredicted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Automation Stream */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Stream de Automação
              </h3>
              <button 
                onClick={onNavigateToAutomations}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-mono"
              >
                Todas
              </button>
            </div>

            <p className="text-xs text-[#666666] mb-4">Gatilhos ativados pelo motor autônomo:</p>

            <div className="space-y-3">
              {automations.map((auto) => (
                <div key={auto.id} className="bg-[#111111] border border-[#222222] rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-white">{auto.name}</span>
                    <span className="text-[10px] font-mono text-[#555555]">{auto.lastExecuted}</span>
                  </div>
                  <p className="text-[#888888] line-clamp-2">{auto.action}</p>
                  <div className="mt-2.5 flex items-center gap-2 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {auto.category}
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Executado ({auto.executionCount}x)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1F1F1F] text-center">
            <span className="text-[10px] font-mono text-[#555555] flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" /> System Version v8.2.1-stable
            </span>
          </div>
        </div>
      </div>

      {/* Active Campaigns List */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-serif italic text-white">Campanhas em Monitoramento Autônomo</h3>
            <p className="text-xs text-[#666666] font-mono">Acompanhamento estatístico e alocação de criadores</p>
          </div>

          <button
            onClick={onNavigateToDirectory}
            className="px-4 py-2 text-xs font-semibold bg-[#111111] hover:bg-[#181818] text-[#E0E0E0] rounded-lg border border-[#222222] flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Adicionar Criadores</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns.map((camp) => {
            const pctSpent = Math.min(100, Math.round((camp.spent / camp.budget) * 100));
            return (
              <div key={camp.id} className="bg-[#111111] border border-[#222222] rounded-2xl p-5 hover:border-[#333333] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                      camp.status === 'Ativa' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {camp.status}
                    </span>
                    <span className="text-[10px] font-mono text-[#666666]">{camp.objective}</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-0.5">{camp.title}</h4>
                  <p className="text-xs text-indigo-400 font-mono mb-4">{camp.brand}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#666666]">Orçamento</span>
                      <span className="font-semibold text-white">R$ {camp.spent.toLocaleString()} / R$ {camp.budget.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${pctSpent}%` }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#080808] p-3 rounded-xl border border-[#1F1F1F] mb-4 font-mono">
                    <div>
                      <span className="text-[#555555] block text-[10px]">Alcance Previsto</span>
                      <span className="font-bold text-white">{(camp.metrics.predictedReach / 1000).toFixed(0)}k</span>
                    </div>
                    <div>
                      <span className="text-[#555555] block text-[10px]">ROI Projetado</span>
                      <span className="font-bold text-emerald-400">{camp.metrics.roi}x</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1F1F1F] text-xs">
                  <span className="text-[#666666] font-mono">{camp.creatorsCount} Criadores</span>
                  <button 
                    onClick={onNavigateToSimulator}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <span>Otimizar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
