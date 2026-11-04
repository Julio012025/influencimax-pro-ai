import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  Users, 
  TrendingUp, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3,
  Download,
  RotateCcw
} from 'lucide-react';

interface AudienceIntelligenceViewProps {
  onNavigateToSimulator?: () => void;
  onNotification?: (msg: string) => void;
}

export function AudienceIntelligenceView({ onNavigateToSimulator, onNotification }: AudienceIntelligenceViewProps) {
  const [motor, setMotor] = useState<'Brasil' | 'Global'>('Brasil');
  const [cargo, setCargo] = useState('Diretor Escolar, Coordenador Pedagógico, Gestor de EdTech');
  const [interesse, setInteresse] = useState('Gestão Escolar, Tecnologia Educacional, SaaS B2B, Liderança');
  const [faixaEtaria, setFaixaEtaria] = useState('30-60');
  const [localizacao, setLocalizacao] = useState('Capitais e Regiões Metropolitanas (SP, RJ, MG, PR, RS)');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationResult, setCalculationResult] = useState<any>({
    reachScore: 94,
    estimatedMarketSize: 1420000,
    recommendedBudget: 28000,
    estimatedCPM: 34.20,
    adClutterRisk: 'Baixo (12%)',
    highAffinityRegions: ['São Paulo (42%)', 'Rio de Janeiro (21%)', 'Minas Gerais (15%)', 'Sul (14%)'],
    genderRatio: { male: 46, female: 54 },
    intentRate: 8.7,
    topKeywords: ['SaaS de Gestão', 'Inovação em Ensino', 'Capacitação Docente', 'EdTech 2026']
  });

  const personas = [
    {
      name: 'Decisores EdTech & B2B Escolar',
      cargos: 'Diretores Escolares, Coordenadores, Mantenedores',
      interesses: 'Gestão Escolar, Tecnologia Educacional, ERP, Inovação',
      faixa: '30-60',
      loc: 'Capitais e Regiões Metropolitanas'
    },
    {
      name: 'Investidores & Alta Renda B2C',
      cargos: 'Empresários, Médicos, Executivos C-Level, Advogados',
      interesses: 'Investimentos, Private Banking, Finanças, Imóveis de Luxo',
      faixa: '30-60',
      loc: 'Brasil (SP, RJ, Brasília, Curitiba)'
    },
    {
      name: 'Early Adopters Gen-Z & Criadores',
      cargos: 'Designers, Devs, Criadores de Conteúdo, Estudantes',
      interesses: 'Inteligência Artificial, Gadgets, Produtividade, Gaming',
      faixa: '18-30',
      loc: 'Brasil (Nacional)'
    }
  ];

  const handleApplyPersona = (p: typeof personas[0]) => {
    setCargo(p.cargos);
    setInteresse(p.interesses);
    setFaixaEtaria(p.faixa);
    setLocalizacao(p.loc);
    handleCalculate(p.cargos, p.interesses);
  };

  const handleCalculate = (cArg = cargo, iArg = interesse) => {
    setIsCalculating(true);
    setTimeout(() => {
      // Dynamic computation
      const wordCount = (cArg + ' ' + iArg).split(',').length;
      const baseReach = motor === 'Brasil' ? 1200000 : 8500000;
      const calculatedScore = Math.min(99, Math.max(78, 85 + (wordCount * 2)));
      const audienceSize = Math.round(baseReach * (calculatedScore / 100));

      setCalculationResult({
        reachScore: calculatedScore,
        estimatedMarketSize: audienceSize,
        recommendedBudget: Math.round(audienceSize * 0.02),
        estimatedCPM: motor === 'Brasil' ? 32.50 : 54.00,
        adClutterRisk: calculatedScore > 90 ? 'Excelente (Baixa Saturação)' : 'Moderado',
        highAffinityRegions: motor === 'Brasil' 
          ? ['São Paulo (44%)', 'Rio de Janeiro (19%)', 'Minas Gerais (14%)', 'Região Sul (15%)', 'Outros (8%)']
          : ['América Latina (38%)', 'Europa (32%)', 'América do Norte (30%)'],
        genderRatio: { male: 48, female: 52 },
        intentRate: parseFloat(((calculatedScore * 0.09) + 0.4).toFixed(1)),
        topKeywords: (iArg || 'Inovação, Tecnologia').split(',').map(s => s.trim()).filter(Boolean)
      });
      setIsCalculating(false);
      onNotification?.('Análise de audiência sintetizada pelo motor neural!');
    }, 800);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      perfil: { cargo, interesse, faixaEtaria, localizacao, motor },
      metricas: calculationResult,
      dataExport: new Date().toISOString()
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `audiencia-influencimax-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onNotification?.('Relatório de audiência exportado com sucesso!');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Motor Neural Preditivo
                </span>
                <span className="text-xs text-[#666666] font-mono">Reach Synthesis v4.1</span>
              </div>
              <h2 className="text-2xl font-serif italic text-white mt-1">Audiência, Cargos & Segmentação Fina</h2>
              <p className="text-xs text-[#888888] font-mono">
                Identifique exatamente onde está seu cliente ideal antes de contratar criadores ou veicular anúncios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-[#111111] hover:bg-[#181818] text-white border border-[#222222] rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Exportar Dados</span>
            </button>
            {onNavigateToSimulator && (
              <button
                onClick={onNavigateToSimulator}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Simular ROI nesta Audiência</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Personas Bar */}
        <div className="mt-6 pt-4 border-t border-[#1F1F1F]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] block mb-2">
            Modelos Rápidos de Personas de Mercado:
          </span>
          <div className="flex flex-wrap gap-2">
            {personas.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPersona(p)}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#222222] hover:border-indigo-500/40 text-slate-300 flex items-center gap-2 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Form on Left, Live Synthesized Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: 5 cols */}
        <div className="lg:col-span-5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <Layers className="w-4 h-4 text-indigo-400" />
            Parâmetros do Perfil Alvo
          </h3>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              Motor Geográfico
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Brasil', 'Global'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMotor(m)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    motor === m 
                      ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                      : 'bg-[#111111] text-[#777777] border-[#222222] hover:text-white'
                  }`}
                >
                  {m === 'Brasil' ? '🇧🇷 Mercado Brasil' : '🌐 Mercado Global'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              Cargos Target & Tomadores de Decisão
            </label>
            <textarea
              rows={2}
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Ex: Diretor de Marketing, CEO, Coordenador Pedagógico..."
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              Interesses, Dores & Tecnologias
            </label>
            <textarea
              rows={2}
              value={interesse}
              onChange={(e) => setInteresse(e.target.value)}
              placeholder="Ex: SaaS B2B, Inteligência Artificial, Gestão Financeira..."
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
                Faixa Etária
              </label>
              <select
                value={faixaEtaria}
                onChange={(e) => setFaixaEtaria(e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="30-60">30 a 60 anos (Executivo / B2B)</option>
                <option value="18-30">18 a 30 anos (Gen-Z & E-comm)</option>
                <option value="25-45">25 a 45 anos (Consumo Premium)</option>
                <option value="Todas">Todas as idades</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
                Filtro Antifraude
              </label>
              <div className="bg-[#111111] border border-[#222222] rounded-xl p-2.5 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Base &gt; 98% Real</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-1.5">
              Regiões e Cidades Foco
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#666666] absolute left-3 top-3" />
              <input
                type="text"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={() => handleCalculate()}
            disabled={isCalculating}
            className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isCalculating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Calculando com Motor Neural...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Calcular Reach Score & Síntese</span>
              </>
            )}
          </button>
        </div>

        {/* Right Dashboard: 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Metric Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">Reach Score IA</span>
              <div className="text-3xl font-bold font-mono text-indigo-400 mt-1 flex items-baseline gap-1">
                {calculationResult.reachScore}
                <span className="text-xs text-[#666666] font-normal">/100</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Alta densidade de decisores
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">Volume Total Estimado</span>
              <div className="text-3xl font-bold font-mono text-white mt-1">
                {(calculationResult.estimatedMarketSize / 1000000).toFixed(2)}M
              </div>
              <p className="text-[10px] text-[#777777] mt-1 font-mono">
                Público único mapeado
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">CPM Preditivo</span>
              <div className="text-3xl font-bold font-mono text-cyan-400 mt-1">
                R$ {calculationResult.estimatedCPM.toFixed(2)}
              </div>
              <p className="text-[10px] text-[#777777] mt-1 font-mono">
                Intenção: <strong className="text-white">{calculationResult.intentRate}%</strong>
              </p>
            </div>
          </div>

          {/* Regional & Demographics Breakdown */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white font-mono flex items-center justify-between">
              <span>Distribuição Regional & Afinidade</span>
              <span className="text-xs text-indigo-400 font-normal">Geo Neural Heatmap</span>
            </h4>

            <div className="space-y-2">
              {calculationResult.highAffinityRegions.map((reg: string, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs bg-[#111111] border border-[#222222] px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{reg}</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">Alta Relevância</span>
                </div>
              ))}
            </div>

            {/* Gender and Clutter */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1F1F1F]">
              <div className="bg-[#111111] p-3 rounded-xl border border-[#222222]">
                <span className="text-[10px] text-[#666666] uppercase block font-mono">Divisão de Gênero</span>
                <div className="text-xs font-mono font-bold text-white mt-1">
                  Masculino {calculationResult.genderRatio.male}% | Feminino {calculationResult.genderRatio.female}%
                </div>
              </div>
              <div className="bg-[#111111] p-3 rounded-xl border border-[#222222]">
                <span className="text-[10px] text-[#666666] uppercase block font-mono">Saturação de Concorrência</span>
                <div className="text-xs font-mono font-bold text-emerald-400 mt-1">
                  {calculationResult.adClutterRisk}
                </div>
              </div>
            </div>
          </div>

          {/* Keywords & Semantic Clusters */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5">
            <h4 className="text-sm font-bold text-white font-mono mb-3">
              Clusters Semânticos Detectados na Audiência
            </h4>
            <div className="flex flex-wrap gap-2">
              {calculationResult.topKeywords.map((kw: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
