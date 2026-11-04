import React, { useState } from 'react';
import { AutomationRule } from '../types';
import { 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Settings, 
  Sliders, 
  Activity, 
  AlertTriangle,
  ArrowRight,
  X
} from 'lucide-react';

interface AutomationStudioViewProps {
  automations: AutomationRule[];
  onToggleRule: (id: string) => void;
  onAddRule: (rule: AutomationRule) => void;
}

export const AutomationStudioView: React.FC<AutomationStudioViewProps> = ({
  automations,
  onToggleRule,
  onAddRule
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCategory, setNewRuleCategory] = useState<AutomationRule['category']>('Orçamento');
  const [newRuleTrigger, setNewRuleTrigger] = useState('');
  const [newRuleCondition, setNewRuleCondition] = useState('');
  const [newRuleAction, setNewRuleAction] = useState('');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName || !newRuleTrigger || !newRuleAction) return;

    const newRule: AutomationRule = {
      id: `auto_${Date.now()}`,
      name: newRuleName,
      trigger: newRuleTrigger,
      condition: newRuleCondition || 'Sem condição extra',
      action: newRuleAction,
      active: true,
      executionCount: 0,
      lastExecuted: 'Criado agora',
      category: newRuleCategory
    };

    onAddRule(newRule);
    setIsModalOpen(false);
    setNewRuleName('');
    setNewRuleTrigger('');
    setNewRuleCondition('');
    setNewRuleAction('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl text-amber-400">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-serif italic text-white">Estúdio de Automações Autônomas</h2>
              <p className="text-xs text-[#888888] font-mono mt-1">
                Real-time rule engine for automated budget re-allocation, compliance moderation, and instant payouts.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-black hover:bg-slate-200 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Regra</span>
          </button>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {automations.map((rule) => (
          <div 
            key={rule.id}
            className={`bg-[#0A0A0A] border rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between ${
              rule.active ? 'border-[#333333]' : 'border-[#1F1F1F] opacity-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#111111] text-amber-400 border border-[#222222]">
                  {rule.category}
                </span>

                {/* Toggle Switch */}
                <button
                  onClick={() => onToggleRule(rule.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    rule.active ? 'bg-indigo-600' : 'bg-[#222222]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      rule.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-3">{rule.name}</h3>

              {/* Trigger - Condition - Action Block */}
              <div className="space-y-2 text-xs bg-[#050505] p-3.5 rounded-xl border border-[#1F1F1F] mb-4 font-mono">
                <div className="flex items-start gap-2 text-[#E0E0E0]">
                  <span className="text-amber-400 font-semibold min-w-16">SE:</span>
                  <span className="text-[#AAAAAA]">{rule.trigger}</span>
                </div>
                <div className="flex items-start gap-2 text-[#E0E0E0]">
                  <span className="text-indigo-400 font-semibold min-w-16">E:</span>
                  <span className="text-[#888888]">{rule.condition}</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-400 font-semibold pt-1 border-t border-[#1F1F1F]">
                  <span className="min-w-16">ENTÃO:</span>
                  <span>{rule.action}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#666666] pt-3 border-t border-[#1F1F1F]">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-indigo-400" /> Executado {rule.executionCount} vezes
              </span>
              <span className="flex items-center gap-1 text-[#555555]">
                <Clock className="w-3.5 h-3.5" /> {rule.lastExecuted}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for New Automation Rule */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white rounded-lg bg-[#111111] border border-[#222222]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-serif italic text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Criar Nova Regra de Automação
            </h3>

            <form onSubmit={handleCreateRule} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#888888] font-semibold block mb-1">Nome da Regra:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Alerta de Violação de Marca"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <div>
                <label className="text-[#888888] font-semibold block mb-1">Categoria:</label>
                <select
                  value={newRuleCategory}
                  onChange={(e) => setNewRuleCategory(e.target.value as any)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                >
                  <option value="Orçamento">Orçamento</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Alertas de Fraude">Alertas de Fraude</option>
                  <option value="Pagamentos">Pagamentos</option>
                  <option value="Engajamento">Engajamento</option>
                </select>
              </div>

              <div>
                <label className="text-[#888888] font-semibold block mb-1">Gatilho (SE):</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Taxa de engajamento cair abaixo de 2.5%"
                  value={newRuleTrigger}
                  onChange={(e) => setNewRuleTrigger(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <div>
                <label className="text-[#888888] font-semibold block mb-1">Condição Adicional (E):</label>
                <input
                  type="text"
                  placeholder="Ex: Campanha ativada há mais de 48 horas"
                  value={newRuleCondition}
                  onChange={(e) => setNewRuleCondition(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <div>
                <label className="text-[#888888] font-semibold block mb-1">Ação Autônoma (ENTÃO):</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pausar veiculação do anúncio e enviar notificação por email"
                  value={newRuleAction}
                  onChange={(e) => setNewRuleAction(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1F1F1F]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#111111] hover:bg-[#181818] text-[#888888] rounded-xl font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-white text-black hover:bg-slate-200 font-bold rounded-xl uppercase tracking-wider"
                >
                  Ativar Regra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
