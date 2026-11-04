import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Building2, 
  CreditCard, 
  ArrowRight,
  Headphones,
  FileCheck
} from 'lucide-react';

interface CommercialPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string) => void;
}

export function CommercialPlansModal({ isOpen, onClose, onSelectPlan }: CommercialPlansModalProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Growth AI',
      badge: 'Para Marcas em Escala',
      monthlyPrice: 1490,
      annualPrice: 1190,
      desc: 'Ideal para e-commerces e marcas que investem até R$ 50k/mês com criadores.',
      features: [
        'Até 15 campanhas ativas simultâneas',
        'Motor preditivo de alcance Brasil',
        'Auditoria antifraude até 50 criadores/mês',
        'Estúdio Criativo com análise OCR básica',
        'Integração Meta Ads & Webhook CRM',
        'Suporte por e-mail e SLA de 24h'
      ],
      popular: false,
      buttonText: 'Contratar Plano Growth'
    },
    {
      name: 'Scale Pro',
      badge: 'Mais Escolhido • ROI Garantido',
      monthlyPrice: 3890,
      annualPrice: 2990,
      desc: 'Para marcas e agências com investimento de R$ 50k a R$ 250k/mês.',
      features: [
        'Campanhas e criadores ilimitados',
        'Motor preditivo Neural Global & Brasil',
        'Auditoria antifraude profunda contínua',
        'Estúdio de Automação com Guardrails 24/7',
        'Gerador de Briefings com compliance CONAR',
        'Conexão Meta Ads CAPI + GA4 + WhatsApp Webhook',
        'Gerente de Sucesso Dedicado e SLA de 2h'
      ],
      popular: true,
      buttonText: 'Assinar Scale Pro'
    },
    {
      name: 'Enterprise Custom',
      badge: 'Grandes Contas & Agências',
      monthlyPrice: 8900,
      annualPrice: 6990,
      desc: 'Para grandes corporações com auditoria jurídica e governança de dados.',
      features: [
        'Tudo do Scale Pro sem restrições de uso',
        'Instância dedicada ou integração On-Premise',
        'Automações orçamentárias autônomas avançadas',
        'SLA 99.9% de uptime contratual',
        'Contrato corporativo faturado com nota fiscal',
        'Adequação jurídica LGPD e DPA sob medida',
        'Treinamento presencial/remoto da equipe'
      ],
      popular: false,
      buttonText: 'Falar com Consultor Enterprise'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111111] border border-[#222222] rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Licenciamento Comercial & Planos
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-white mt-3">
            Planos Comerciais InfluenciMax Pro AI
          </h2>
          <p className="text-xs sm:text-sm text-[#888888] font-mono mt-2">
            Escolha o modelo de licenciamento ideal para sua marca ou agência. Recupere o investimento logo na primeira campanha eliminando criadores fraudulentos.
          </p>

          {/* Billing Switch */}
          <div className="inline-flex items-center gap-2 bg-[#0A0A0A] p-1.5 rounded-2xl border border-[#222222] mt-6">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-[#222222] text-white shadow-sm'
                  : 'text-[#666666] hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'text-[#666666] hover:text-white'
              }`}
            >
              <span>Anual</span>
              <span className="text-[9px] bg-emerald-400 text-black px-1.5 py-0.2 rounded-full font-bold">20% OFF</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const price = billingPeriod === 'annual' ? p.annualPrice : p.monthlyPrice;
            return (
              <div
                key={p.name}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                  p.popular
                    ? 'bg-gradient-to-b from-[#181824] to-[#0E0E14] border-2 border-indigo-500/60 shadow-[0_0_30px_rgba(99,102,241,0.25)]'
                    : 'bg-[#0A0A0A] border border-[#1F1F1F]'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
                    Mais Popular
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase block mb-1">
                    {p.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                  <p className="text-xs text-[#888888] mb-5 min-h-[32px]">{p.desc}</p>

                  <div className="mb-6 font-mono">
                    <span className="text-xs text-[#666666]">R$ </span>
                    <span className="text-3xl font-bold text-white">{price.toLocaleString('pt-BR')}</span>
                    <span className="text-xs text-[#666666]"> /mês</span>
                    {billingPeriod === 'annual' && (
                      <span className="block text-[10px] text-emerald-400 mt-0.5">Cobrado anualmente</span>
                    )}
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-[#1F1F1F] mb-6">
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectPlan(p.name);
                    onClose();
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    p.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg'
                      : 'bg-[#1A1A1A] hover:bg-[#252525] text-white border border-[#2A2A2A]'
                  }`}
                >
                  <span>{p.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantees */}
        <div className="mt-8 pt-6 border-t border-[#1F1F1F] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#666666]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garantia de 14 dias ou reembolso integral</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span>Emissão automática de Nota Fiscal e contrato B2B</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-purple-400" />
            <span>Cartão de Crédito, Pix ou Boleto Bancário</span>
          </div>
        </div>
      </div>
    </div>
  );
}
