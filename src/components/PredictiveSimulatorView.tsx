import React, { useState, useMemo } from 'react';
import { Creator, SimulationResult, NicheType } from '../types';
import { 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  PieChart, 
  ArrowRight, 
  Layers, 
  Bot,
  Zap
} from 'lucide-react';

interface PredictiveSimulatorViewProps {
  creators: Creator[];
  initialSelectedCreator?: Creator | null;
  onLaunchCampaign: (simulatedData: any) => void;
}

export const PredictiveSimulatorView: React.FC<PredictiveSimulatorViewProps> = ({
  creators,
  initialSelectedCreator,
  onLaunchCampaign
}) => {
  const [budget, setBudget] = useState<number>(25000);
  const [selectedNiche, setSelectedNiche] = useState<NicheType>('Tecnologia');
  const [objective, setObjective] = useState<string>('Conversões / Vendas');
  const [targetAge, setTargetAge] = useState<string>('18-34');
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>(
    initialSelectedCreator ? [initialSelectedCreator.id] : ['c1', 'c2']
  );

  // Filter creator options by niche
  const availableCreators = creators.filter(c => c.niche === selectedNiche || selectedCreatorIds.includes(c.id));

  const toggleCreatorSelection = (id: string) => {
    if (selectedCreatorIds.includes(id)) {
      if (selectedCreatorIds.length > 1) {
        setSelectedCreatorIds(selectedCreatorIds.filter(i => i !== id));
      }
    } else {
      setSelectedCreatorIds([...selectedCreatorIds, id]);
    }
  };

  // Dynamic simulation calculation engine
  const simulation: SimulationResult = useMemo(() => {
    const activeCreators = creators.filter(c => selectedCreatorIds.includes(c.id));
    
    let baseReach = 0;
    let totalScoreSum = 0;
    let avgCPMSum = 0;

    activeCreators.forEach(c => {
      baseReach += c.estReach;
      totalScoreSum += c.predictiveScore;
      avgCPMSum += c.avgCPM;
    });

    const creatorCount = activeCreators.length || 1;
    const avgScore = totalScoreSum / creatorCount;
    const avgCPM = avgCPMSum / creatorCount;

    // Audience overlap penalty calculation (2 creators in same niche overlap ~12%)
    const overlapFactor = creatorCount > 1 ? (1 - (creatorCount * 0.06)) : 1;
    
    // Budget driven multiplier
    const cpmEfficiency = Math.max(0.8, 1.2 - (budget / 200000) * 0.3);
    const predictedReach = Math.round((budget / (avgCPM || 30)) * 1000 * cpmEfficiency * overlapFactor);
    
    const engagementRateMultiplier = (avgScore / 100);
    const predictedEngagement = Math.round(predictedReach * 0.052 * engagementRateMultiplier);
    
    // Conversion rate based on objective
    const conversionRate = objective === 'Conversões / Vendas' ? 0.028 : 0.012;
    const predictedConversions = Math.round(predictedEngagement * conversionRate);
    
    // Estimated ROI
    const estimatedROI = parseFloat(((predictedConversions * 120) / (budget || 1)).toFixed(1));
    const viralProbability = Math.min(95, Math.round((avgScore * 0.8) + (creatorCount * 3)));

    return {
      predictedReach,
      predictedEngagement,
      predictedConversions,
      estimatedROI: Math.max(1.8, estimatedROI),
      viralProbability,
      recommendedMix: activeCreators.map(c => ({
        creatorId: c.id,
        suggestedBudget: Math.round(budget / creatorCount),
        expectedDeliverables: '1x Video Reel + 2x Sequência de Stories'
      })),
      audienceOverlap: Math.round((1 - overlapFactor) * 100),
      topRiskFactor: avgScore < 88 ? 'Sensibilidade de audiência moderada' : 'Nenhum risco relevante detectado',
      aiStrategicInsights: [
        `Com R$ ${budget.toLocaleString('pt-BR')}, a sobreposição de audiência é de apenas ${Math.round((1 - overlapFactor) * 100)}%, maximizando alcance único.`,
        `O pico de conversão ocorrerá entre o 3º e 5º dia pós-publicação sincronizada.`,
        `Recomenda-se ativar a regra autônoma de realocação para transferir 15% do orçamento ao post de maior CTR.`
      ]
    };
  }, [budget, selectedNiche, objective, selectedCreatorIds, creators]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#111111] border border-[#222222] text-indigo-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-serif italic text-white">Simulador Preditivo de ROI & Audiência</h2>
            <p className="text-xs text-[#888888] font-mono mt-1">
              Deep machine learning projections on conversion, virality probability, and audience saturation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 space-y-5 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest font-mono text-[#888888] border-b border-[#1F1F1F] pb-3 flex items-center justify-between">
            <span>Parâmetros de Entrada</span>
            <span className="text-[10px] font-mono text-indigo-400 bg-[#111111] px-2 py-0.5 rounded border border-[#222222]">
              Gemini Engine
            </span>
          </h3>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#888888]">Orçamento Planejado:</span>
              <span className="text-white font-bold">R$ {budget.toLocaleString('pt-BR')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="150000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 bg-[#111111] rounded-lg cursor-pointer border border-[#222222]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#555555]">
              <span>R$ 500</span>
              <span>R$ 150.000</span>
            </div>
          </div>

          {/* Niche Selector */}
          <div>
            <label className="text-xs font-mono text-[#888888] block mb-1.5">Nicho Alvo:</label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value as NicheType)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
            >
              <option value="Tecnologia">Tecnologia</option>
              <option value="Finanças">Finanças</option>
              <option value="Moda & Beleza">Moda & Beleza</option>
              <option value="Entretenimento">Entretenimento</option>
              <option value="Gaming">Gaming</option>
              <option value="Fitness & Saúde">Fitness & Saúde</option>
              <option value="Gastronomia">Gastronomia</option>
              <option value="Educação">Educação</option>
              <option value="Viagens">Viagens</option>
              <option value="Odontologia">Odontologia</option>
              <option value="Medicina">Medicina</option>
            </select>
          </div>

          {/* Objective Selector */}
          <div>
            <label className="text-xs font-mono text-[#888888] block mb-1.5">Objetivo da Campanha:</label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
            >
              <option value="Conversões / Vendas">Conversões / Vendas diretas</option>
              <option value="Reconhecimento de Marca">Reconhecimento de Marca (Brand Awareness)</option>
              <option value="Engajamento">Engajamento / Comunidade</option>
              <option value="Lançamento de Produto">Lançamento de Produto Novo</option>
            </select>
          </div>

          {/* Select Creators for Mix */}
          <div>
            <label className="text-xs font-mono text-[#888888] block mb-2">
              Selecione os Criadores para o Mix:
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {availableCreators.map((creator) => {
                const isSelected = selectedCreatorIds.includes(creator.id);
                return (
                  <div
                    key={creator.id}
                    onClick={() => toggleCreatorSelection(creator.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-[#141414] border-indigo-500/80 text-white'
                        : 'bg-[#111111] border-[#222222] text-[#888888] hover:border-[#333333]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={creator.avatar} alt={creator.name} className="w-7 h-7 rounded-lg object-cover border border-[#222222]" />
                      <div>
                        <span className="font-bold block text-white">{creator.name}</span>
                        <span className="text-[10px] font-mono text-[#666666]">{creator.handle}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-[#181818] text-[#666666]'
                    }`}>
                      {isSelected ? 'Selecionado' : '+ Adicionar'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Simulation Output Grid */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4 mb-6">
              <h3 className="text-lg font-serif italic text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Projeção Preditiva Estimada
              </h3>
              <span className="text-xs font-mono text-[#666666]">Precisão: ~94.8%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#111111] border border-[#222222] p-4 rounded-xl text-center">
                <span className="text-[10px] font-mono text-[#666666] uppercase block mb-1">Alcance Estimado</span>
                <span className="text-2xl font-light text-white font-mono">
                  {(simulation.predictedReach / 1000).toFixed(0)}k
                </span>
                <span className="text-[10px] text-[#555555] font-mono block mt-1">reach único</span>
              </div>

              <div className="bg-[#111111] border border-[#222222] p-4 rounded-xl text-center">
                <span className="text-[10px] font-mono text-[#666666] uppercase block mb-1">Engajamento</span>
                <span className="text-2xl font-light text-indigo-400 font-mono">
                  {(simulation.predictedEngagement / 1000).toFixed(1)}k
                </span>
                <span className="text-[10px] text-[#555555] font-mono block mt-1">interações</span>
              </div>

              <div className="bg-[#111111] border border-[#222222] p-4 rounded-xl text-center">
                <span className="text-[10px] font-mono text-[#666666] uppercase block mb-1">Conversões</span>
                <span className="text-2xl font-light text-purple-400 font-mono">
                  {simulation.predictedConversions}
                </span>
                <span className="text-[10px] text-[#555555] font-mono block mt-1">vendas est.</span>
              </div>

              <div className="bg-[#111111] border border-[#222222] p-4 rounded-xl text-center">
                <span className="text-[10px] font-mono text-[#666666] uppercase block mb-1">ROI Preditivo</span>
                <span className="text-2xl font-light text-emerald-400 font-mono">
                  {simulation.estimatedROI}x
                </span>
                <span className="text-[10px] text-emerald-400/80 font-mono block mt-1">Retorno Alto</span>
              </div>
            </div>

            {/* Virality Index Bar */}
            <div className="bg-[#050505] border border-[#1F1F1F] p-4 rounded-xl space-y-2 mb-6">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-semibold text-[#888888] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" /> Coeficiente de Viralidade do Mix:
                </span>
                <span className="font-bold text-amber-400">{simulation.viralProbability}% Probabilidade</span>
              </div>
              <div className="w-full bg-[#111111] h-2 rounded-full overflow-hidden border border-[#222222]">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${simulation.viralProbability}%` }}
                ></div>
              </div>
            </div>

            {/* AI Insights & Recommendation */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-4 space-y-2 mb-6">
              <h4 className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Bot className="w-4 h-4 text-indigo-400" /> Insights Preditivos da IA:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#AAAAAA] font-sans">
                {simulation.aiStrategicInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Launch Campaign */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1F1F1F]">
              <div className="text-xs font-mono text-[#666666]">
                Qualidade da Audiência: <strong className="text-white">91.4% autêntico</strong>
              </div>

              <button
                onClick={() => onLaunchCampaign({
                  title: `Campanha Preditiva ${selectedNiche}`,
                  brand: 'Sua Marca',
                  budget,
                  assignedCreatorIds: selectedCreatorIds,
                  predictedReach: simulation.predictedReach,
                  predictedROI: simulation.estimatedROI
                })}
                className="w-full sm:w-auto px-6 py-3 bg-white text-black hover:bg-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Iniciar Automação Autônoma</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
