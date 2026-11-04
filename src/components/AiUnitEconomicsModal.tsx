import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  DollarSign, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  Zap, 
  Layers, 
  HelpCircle,
  Coins,
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';

interface AiUnitEconomicsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiUnitEconomicsModal({ isOpen, onClose }: AiUnitEconomicsModalProps) {
  // Interactive Simulator States
  const [activeUsers, setActiveUsers] = useState<number>(100);
  const [planPrice, setPlanPrice] = useState<number>(490); // R$ médio (entre Pro e Growth)
  const [briefingsPerUser, setBriefingsPerUser] = useState<number>(15);
  const [auditsPerUser, setAuditsPerUser] = useState<number>(25);
  const [chatMessagesPerUser, setChatMessagesPerUser] = useState<number>(40);

  if (!isOpen) return null;

  // Gemini 2.5 Flash API Pricing (convertido para R$ considerando câmbio R$ 5,85):
  // Input: $0.075 / 1M tokens (~R$ 0,44 / 1M tokens)
  // Output: $0.30 / 1M tokens (~R$ 1,75 / 1M tokens)
  const COST_PER_INPUT_TOKEN = (0.075 * 5.85) / 1000000;
  const COST_PER_OUTPUT_TOKEN = (0.30 * 5.85) / 1000000;

  // Custo por Briefing IA: ~2.500 input tokens + 1.200 output tokens
  const costPerBriefing = (2500 * COST_PER_INPUT_TOKEN) + (1200 * COST_PER_OUTPUT_TOKEN); // ~R$ 0,0032
  // Custo por Auditoria Antifraude: ~3.000 input tokens + 800 output tokens
  const costPerAudit = (3000 * COST_PER_INPUT_TOKEN) + (800 * COST_PER_OUTPUT_TOKEN); // ~R$ 0,0027
  // Custo por mensagem no Copilot IA: ~1.200 input tokens + 400 output tokens
  const costPerMessage = (1200 * COST_PER_INPUT_TOKEN) + (400 * COST_PER_OUTPUT_TOKEN); // ~R$ 0,0012
  // Custo algorítmico preditivo (embeddings / inferência complementar): ~R$ 0,005 fixo/mês
  const costPerAlgorithmic = 0.005;

  // Totais por usuário individual
  const aiCostBriefings = briefingsPerUser * costPerBriefing;
  const aiCostAudits = auditsPerUser * costPerAudit;
  const aiCostChat = chatMessagesPerUser * costPerMessage;
  const totalAiCostPerUser = aiCostBriefings + aiCostAudits + aiCostChat + costPerAlgorithmic;

  // Outros custos variáveis estimados por usuário (servidor, database, gateway ~3.99%)
  const paymentGatewayFee = planPrice * 0.0399;
  const cloudHostingPerUser = 2.50; // AWS/Vercel/CloudSQL rateado

  // Lucro e margens
  const netEarningsPerUser = planPrice - totalAiCostPerUser - paymentGatewayFee - cloudHostingPerUser;
  const aiExpenseRatio = (totalAiCostPerUser / planPrice) * 100;
  const grossAiMargin = 100 - aiExpenseRatio;

  // Faturamento e despesas em escala com base na quantidade de usuários
  const totalMonthlyRevenue = activeUsers * planPrice;
  const totalMonthlyAiCost = activeUsers * totalAiCostPerUser;
  const totalMonthlyNetProfit = activeUsers * netEarningsPerUser;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0C0C0C] border border-[#222222] rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white rounded-xl bg-[#161616] border border-[#2A2A2A] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-emerald-500/20 to-indigo-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400">
              <Coins className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Unit Economics Audit
                </span>
                <span className="text-xs text-[#888888]">Google Gemini 2.5 vs Modelo SaaS</span>
              </div>
              <h2 className="text-2xl font-serif italic text-white mt-1">
                Despesas com IA vs. Ganhos por Usuário
              </h2>
              <p className="text-xs text-[#888888] font-mono">
                Análise financeira real de custos de API (tokens) comparados à receita de assinatura recorrente (MRR).
              </p>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222222] p-3 rounded-2xl flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#888888] uppercase">Margem de Lucro IA</span>
              <p className="text-xl font-bold font-mono text-emerald-400">{grossAiMargin.toFixed(2)}%</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Resumo Executivo em 3 Destaques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#121212] border border-red-500/20 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs text-[#888888] font-mono mb-1">
              <span>Custo IA por Usuário/Mês</span>
              <Cpu className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-red-400">
              R$ {totalAiCostPerUser.toFixed(2)}
            </p>
            <p className="text-[11px] text-[#888888] mt-1 font-mono">
              Consumindo {briefingsPerUser} briefings + {auditsPerUser} auditorias + {chatMessagesPerUser} msgs no Copilot.
            </p>
          </div>

          <div className="bg-[#121212] border border-indigo-500/20 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs text-[#888888] font-mono mb-1">
              <span>Receita por Usuário/Mês</span>
              <DollarSign className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-indigo-400">
              R$ {planPrice.toFixed(2)}
            </p>
            <p className="text-[11px] text-[#888888] mt-1 font-mono">
              Plano SaaS mensal configurado no simulador interativo.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-950/40 to-[#121212] border border-emerald-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs text-[#888888] font-mono mb-1">
              <span>Diferença (Lucro Líquido / Usuário)</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-emerald-400">
              + R$ {netEarningsPerUser.toFixed(2)}
            </p>
            <p className="text-[11px] text-[#888888] mt-1 font-mono">
              Após abater IA (R$ {totalAiCostPerUser.toFixed(2)}), Gateway e Servidores.
            </p>
          </div>
        </div>

        {/* Tabela Comparativa Detalhada */}
        <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden mb-8">
          <div className="px-5 py-3.5 bg-[#161616] border-b border-[#222222] flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Detalhamento de Consumo de Tokens (Google Gemini 2.5 Flash)
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              Custo por 1M de Tokens: R$ 0,44 (In) / R$ 1,75 (Out)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0D0D0D] text-[#888888] uppercase border-b border-[#1F1F1F]">
                <tr>
                  <th className="py-3 px-4">Operação no Sistema</th>
                  <th className="py-3 px-4">Uso Mensal Médio</th>
                  <th className="py-3 px-4">Tokens Estimados</th>
                  <th className="py-3 px-4">Custo IA em Reais (R$)</th>
                  <th className="py-3 px-4">Impacto no Usuário</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A] text-[#CCCCCC]">
                <tr className="hover:bg-[#141414] transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" /> Gerador de Briefings & Cláusulas CONAR
                  </td>
                  <td className="py-3 px-4">{briefingsPerUser} briefings/mês</td>
                  <td className="py-3 px-4 text-[#888888]">~55.500 tokens</td>
                  <td className="py-3 px-4 text-red-400 font-bold">R$ {aiCostBriefings.toFixed(3)}</td>
                  <td className="py-3 px-4 text-emerald-400">0,0{((aiCostBriefings / planPrice) * 100).toFixed(1)}% do plano</td>
                </tr>

                <tr className="hover:bg-[#141414] transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Auditoria Neural Antifraude de Criadores
                  </td>
                  <td className="py-3 px-4">{auditsPerUser} criadores analisados</td>
                  <td className="py-3 px-4 text-[#888888]">~95.000 tokens</td>
                  <td className="py-3 px-4 text-red-400 font-bold">R$ {aiCostAudits.toFixed(3)}</td>
                  <td className="py-3 px-4 text-emerald-400">0,0{((aiCostAudits / planPrice) * 100).toFixed(1)}% do plano</td>
                </tr>

                <tr className="hover:bg-[#141414] transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Copilot IA & Assistente Estratégico
                  </td>
                  <td className="py-3 px-4">{chatMessagesPerUser} perguntas/respostas</td>
                  <td className="py-3 px-4 text-[#888888]">~64.000 tokens</td>
                  <td className="py-3 px-4 text-red-400 font-bold">R$ {aiCostChat.toFixed(3)}</td>
                  <td className="py-3 px-4 text-emerald-400">0,0{((aiCostChat / planPrice) * 100).toFixed(1)}% do plano</td>
                </tr>

                <tr className="hover:bg-[#141414] transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-white flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" /> Simulador Preditivo de ROI & Análises Locais
                  </td>
                  <td className="py-3 px-4">Uso Ilimitado</td>
                  <td className="py-3 px-4 text-[#888888]">Algoritmo Local + Node.js</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">R$ 0,005</td>
                  <td className="py-3 px-4 text-emerald-400">Insignificante</td>
                </tr>

                <tr className="bg-[#141414] font-bold">
                  <td className="py-3 px-4 text-white">TOTAL DE DESPESAS DE IA / USUÁRIO:</td>
                  <td className="py-3 px-4 text-indigo-300">Uso Médio/Alto Mensal</td>
                  <td className="py-3 px-4 text-indigo-300">~214.500 tokens</td>
                  <td className="py-3 px-4 text-red-400 text-sm">R$ {totalAiCostPerUser.toFixed(2)}/mês</td>
                  <td className="py-3 px-4 text-emerald-400 text-sm">Apenas {aiExpenseRatio.toFixed(2)}% da mensalidade</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Simulador Interativo com Sliders */}
        <div className="bg-[#121212] border border-[#222222] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" /> Simulador Interativo de Escala & Lucratividade
            </h3>
            <span className="text-xs text-[#888888] font-mono">Arraste os valores para projetar seu negócio</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between text-xs font-mono text-[#888888] mb-1">
                <span>Número de Usuários Ativos</span>
                <strong className="text-white font-bold">{activeUsers} clientes</strong>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={activeUsers}
                onChange={(e) => setActiveUsers(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#666666] font-mono mt-1">
                <span>10</span>
                <span>500</span>
                <span>1.000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-[#888888] mb-1">
                <span>Preço do Plano Mensal (R$)</span>
                <strong className="text-white font-bold">R$ {planPrice},00</strong>
              </div>
              <input
                type="range"
                min="97"
                max="1490"
                step="50"
                value={planPrice}
                onChange={(e) => setPlanPrice(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#666666] font-mono mt-1">
                <span>R$ 97 (Starter)</span>
                <span>R$ 490 (Pro)</span>
                <span>R$ 1.490 (Growth)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-[#888888] mb-1">
                <span>Briefings de IA gerados / mês</span>
                <strong className="text-white font-bold">{briefingsPerUser} briefings</strong>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={briefingsPerUser}
                onChange={(e) => setBriefingsPerUser(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#666666] font-mono mt-1">
                <span>5</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Resultado Projetado em Escala */}
          <div className="mt-6 pt-6 border-t border-[#1F1F1F] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono">
            <div className="bg-[#181818] p-4 rounded-xl border border-[#262626]">
              <span className="text-[10px] text-[#888888] uppercase block">Faturamento Mensal (MRR)</span>
              <span className="text-xl font-bold text-white mt-1 block">
                R$ {totalMonthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="bg-[#181818] p-4 rounded-xl border border-red-500/20">
              <span className="text-[10px] text-red-400 uppercase block">Despesa Total com IA (Tokens)</span>
              <span className="text-xl font-bold text-red-400 mt-1 block">
                R$ {totalMonthlyAiCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-[#888888] mt-0.5 block">
                Apenas {aiExpenseRatio.toFixed(2)}% do faturamento
              </span>
            </div>

            <div className="bg-gradient-to-r from-emerald-950/60 to-[#181818] p-4 rounded-xl border border-emerald-500/40">
              <span className="text-[10px] text-emerald-400 uppercase block">Lucro Líquido Estimado</span>
              <span className="text-xl font-bold text-emerald-400 mt-1 block">
                R$ {totalMonthlyNetProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-[#888888] mt-0.5 block">
                Margem Líquida SaaS: {((totalMonthlyNetProfit / totalMonthlyRevenue) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Conclusão de Mercado para Investidores / Compradores */}
        <div className="bg-[#141414] border border-[#222222] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <p className="text-xs text-[#AAAAAA] leading-relaxed">
              <strong className="text-white">Conclusão Econômica:</strong> O modelo Gemini 2.5 Flash entrega latência ultrarrápida com custo de menos de <strong className="text-emerald-400">R$ 0,50 por usuário ativo ao mês</strong>. O negócio é extremamente lucrativo com margens brutas superiores a <strong className="text-emerald-400">99% no custo direto de inteligência artificial</strong>.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-md"
          >
            Fechar Relatório
          </button>
        </div>
      </div>
    </div>
  );
}
