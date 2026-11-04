import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  ShieldAlert, 
  Sparkles, 
  Save, 
  ArrowUpRight, 
  RotateCcw,
  BarChart3
} from 'lucide-react';

interface MetricsKpiViewProps {
  onNotification?: (msg: string) => void;
}

export function MetricsKpiView({ onNotification }: MetricsKpiViewProps) {
  const [ctr, setCtr] = useState<number>(1.85);
  const [cpcMax, setCpcMax] = useState<number>(2.20);
  const [cplTarget, setCplTarget] = useState<number>(18.50);
  const [monthlyLeads, setMonthlyLeads] = useState<number>(450);
  const [roasTarget, setRoasTarget] = useState<number>(3.8);
  const [cacMax, setCacMax] = useState<number>(85.00);

  // Benchmarks vs Current real performance
  const currentPerformance = {
    actualCtr: 2.15,
    actualCpc: 1.95,
    actualCpl: 16.80,
    actualLeadsCurrent: 380,
    actualRoas: 4.1,
    actualCac: 74.50
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onNotification?.('Metas e KPIs atualizados! O motor de monitoramento autônomo recalculou os limites de segurança.');
  };

  const handleResetDefaults = () => {
    setCtr(1.85);
    setCpcMax(2.20);
    setCplTarget(18.50);
    setMonthlyLeads(450);
    setRoasTarget(3.8);
    setCacMax(85.00);
    onNotification?.('Valores redefinidos para os padrões recomendados de mercado.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                  <Target className="w-3 h-3" /> SLA & Limites Críticos
                </span>
                <span className="text-xs text-[#666666] font-mono">KPI Guardrail Engine</span>
              </div>
              <h2 className="text-2xl font-serif italic text-white mt-1">Métricas, Metas & Guardrails (KPIs)</h2>
              <p className="text-xs text-[#888888] font-mono">
                Defina os limites de rentabilidade e segurança para que as automações pausem ou escalem campanhas sem intervenção humana.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-4 py-2 bg-[#111111] hover:bg-[#181818] text-[#888888] hover:text-white border border-[#222222] rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrões</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Metas & Ativar Guardrails</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Guardrail Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* CTR Card */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#888888] uppercase">CTR (Taxa de Clique)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Acima da Meta (+16%)
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">{currentPerformance.actualCtr}%</span>
            <span className="text-xs font-mono text-[#666666]">meta: {ctr}%</span>
          </div>
          <div className="w-full bg-[#1F1F1F] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${Math.min(100, (currentPerformance.actualCtr / ctr) * 100)}%` }}></div>
          </div>
        </div>

        {/* CPC Card */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#888888] uppercase">CPC Médio</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Dentro do Teto
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">R$ {currentPerformance.actualCpc.toFixed(2)}</span>
            <span className="text-xs font-mono text-[#666666]">teto: R$ {cpcMax.toFixed(2)}</span>
          </div>
          <div className="w-full bg-[#1F1F1F] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${Math.min(100, (currentPerformance.actualCpc / cpcMax) * 100)}%` }}></div>
          </div>
        </div>

        {/* CPL Card */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#888888] uppercase">CPL (Custo por Lead)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Econômico (-9%)
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">R$ {currentPerformance.actualCpl.toFixed(2)}</span>
            <span className="text-xs font-mono text-[#666666]">alvo: R$ {cplTarget.toFixed(2)}</span>
          </div>
          <div className="w-full bg-[#1F1F1F] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${Math.min(100, (currentPerformance.actualCpl / cplTarget) * 100)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Form Configuration Grid */}
      <form onSubmit={handleSave} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          Configuração de Limites do Motor de IA
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              CTR Esperado (%)
            </label>
            <input
              type="number"
              step="0.05"
              value={ctr}
              onChange={(e) => setCtr(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <p className="text-[10px] text-[#666666] mt-1">Dispara alerta se criador entregar CTR abaixo deste valor.</p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              CPC Máximo Teto (R$)
            </label>
            <input
              type="number"
              step="0.10"
              value={cpcMax}
              onChange={(e) => setCpcMax(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <p className="text-[10px] text-[#666666] mt-1">Pausa automática ou renegociação de entregáveis.</p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              CPL Meta Alvo (R$)
            </label>
            <input
              type="number"
              step="0.50"
              value={cplTarget}
              onChange={(e) => setCplTarget(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <p className="text-[10px] text-[#666666] mt-1">Custo por lead qualificado validado no webhook CRM.</p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              Meta de Leads por Mês
            </label>
            <input
              type="number"
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(parseInt(e.target.value) || 0)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <p className="text-[10px] text-[#666666] mt-1">Volume necessário para bater a cota comercial.</p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              ROAS Alvo Multiplicador (ex: 3.8x)
            </label>
            <input
              type="number"
              step="0.1"
              value={roasTarget}
              onChange={(e) => setRoasTarget(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <p className="text-[10px] text-[#666666] mt-1">Retorno sobre gasto com influenciadores e tráfego.</p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              CAC Máximo Permitido (R$)
            </label>
            <input
              type="number"
              step="1.0"
              value={cacMax}
              onChange={(e) => setCacMax(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <p className="text-[10px] text-[#666666] mt-1">Custo máximo para aquisição de cliente pagante.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Regras ativas no Estúdio de Automação responderão instantaneamente a estes limites.</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
          >
            Salvar & Atualizar Guardrails
          </button>
        </div>
      </form>
    </div>
  );
}
