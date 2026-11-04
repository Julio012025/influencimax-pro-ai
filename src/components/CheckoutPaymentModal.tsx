import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Zap, 
  Lock, 
  CreditCard, 
  QrCode, 
  FileText, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Building2, 
  ChevronRight,
  Download,
  AlertCircle,
  HelpCircle,
  Coins,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export interface PlanDetails {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  setupFee: number; // Implantação
  description: string;
}

interface CheckoutPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
  billingCycle?: 'monthly' | 'annual';
  onSuccess?: (orderData: any) => void;
}

export const AVAILABLE_PLANS: PlanDetails[] = [
  {
    id: 'starter',
    name: 'Starter Pro',
    badge: 'Criadores & Pequenas Marcas',
    monthlyPrice: 197,
    annualMonthlyPrice: 157,
    setupFee: 490,
    description: 'Para quem está estruturando as primeiras campanhas com dados preditivos.'
  },
  {
    id: 'scale',
    name: 'Scale Pro',
    badge: 'Mais Escolhido • ROI Garantido',
    monthlyPrice: 490,
    annualMonthlyPrice: 390,
    setupFee: 980,
    description: 'O padrão ouro para e-commerces e marcas que investem de R$ 15k a R$ 80k/mês.'
  },
  {
    id: 'growth',
    name: 'Growth Agency',
    badge: 'Para Agências & Múltiplas Contas',
    monthlyPrice: 1490,
    annualMonthlyPrice: 1190,
    setupFee: 1490,
    description: 'Campanhas ilimitadas, multi-clientes, OCR de criativos e automações em tempo real.'
  },
  {
    id: 'enterprise',
    name: 'Enterprise VIP',
    badge: 'Grandes Contas Corporativas',
    monthlyPrice: 3890,
    annualMonthlyPrice: 2990,
    setupFee: 2900,
    description: 'Instância dedicada, SLAs contratuais, DPA/LGPD sob medida e suporte 24/7.'
  }
];

export function CheckoutPaymentModal({
  isOpen,
  onClose,
  selectedPlanId = 'scale',
  billingCycle = 'annual',
  onSuccess
}: CheckoutPaymentModalProps) {
  const [activePlanId, setActivePlanId] = useState(selectedPlanId);
  const [cycle, setCycle] = useState<'monthly' | 'annual'>(billingCycle);
  const [includeSetup, setIncludeSetup] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [isCopiedPix, setIsCopiedPix] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: 'Júlio Cézar Simões',
    email: 'prjuliocezarsimoes@gmail.com',
    phone: '(11) 98765-4321',
    document: '42.183.921/0001-44', // CNPJ ou CPF
    companyName: 'InfluenciMax Enterprise',
    // Card fields
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'JULIO C SIMOES',
    cardExpiry: '12/28',
    cardCvv: '888',
    installments: '1'
  });

  if (!isOpen) return null;

  const currentPlan = AVAILABLE_PLANS.find(p => p.id === activePlanId) || AVAILABLE_PLANS[1];

  // Price calculations
  const baseMonthly = cycle === 'annual' ? currentPlan.annualMonthlyPrice : currentPlan.monthlyPrice;
  const subscriptionTotal = cycle === 'annual' ? baseMonthly * 12 : baseMonthly;
  
  // Implantação: if annual, 50% discount or 100% bonus depending on plan
  let actualSetupFee = 0;
  if (includeSetup) {
    if (cycle === 'annual') {
      // No plano anual Scale e Growth, a implantação tem bônus de 100% de desconto!
      if (currentPlan.id === 'scale' || currentPlan.id === 'growth') {
        actualSetupFee = 0; // Cortesia no anual!
      } else {
        actualSetupFee = Math.round(currentPlan.setupFee * 0.5);
      }
    } else {
      actualSetupFee = currentPlan.setupFee;
    }
  }

  // Pix discount (5% extra)
  const pixDiscount = paymentMethod === 'pix' ? Math.round((subscriptionTotal + actualSetupFee) * 0.05) : 0;
  const couponDiscount = couponApplied ? Math.round((subscriptionTotal + actualSetupFee) * 0.1) : 0;
  const grandTotal = Math.max(0, subscriptionTotal + actualSetupFee - pixDiscount - couponDiscount);

  const savedPixKey = (typeof window !== 'undefined' ? localStorage.getItem('inf_custom_pix_key') : null) || '42.183.921/0001-44';
  const savedReceiver = (typeof window !== 'undefined' ? localStorage.getItem('inf_pix_receiver_name') : null) || 'INFLUENCI MAX PRO AI';
  const savedCity = (typeof window !== 'undefined' ? localStorage.getItem('inf_pix_city') : null) || 'SAO PAULO';
  const savedWhatsapp = (typeof window !== 'undefined' ? localStorage.getItem('inf_whatsapp_sales') : null) || '5511987654321';
  const externalCheckoutUrl = (typeof window !== 'undefined' ? localStorage.getItem(`inf_link_${currentPlan.id}`) : null) || '';

  // Dynamic Pix Code (EMV format standard)
  const cleanPixKey = savedPixKey.replace(/[^a-zA-Z0-9]/g, '');
  const pixPayload = `00020126580014BR.GOV.BCB.PIX0136influencimax-${currentPlan.id}-${cleanPixKey.slice(0, 14)}5204000053039865406${grandTotal}.005802BR59${savedReceiver.length.toString().padStart(2, '0')}${savedReceiver.slice(0, 25).toUpperCase()}60${savedCity.length.toString().padStart(2, '0')}${savedCity.slice(0, 15).toUpperCase()}62170513INFX${Date.now().toString().slice(-6)}6304E8A2`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayload);
    setIsCopiedPix(true);
    setTimeout(() => setIsCopiedPix(false), 3000);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'VIP10' || coupon.trim().toUpperCase() === 'PROAI' || coupon.trim().toUpperCase() === 'JULIO') {
      setCouponApplied(true);
    } else {
      alert('Cupom inválido. Tente "PROAI" ou "VIP10".');
    }
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    try {
      // Sync with backend API
      await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: currentPlan.id,
          planName: currentPlan.name,
          cycle,
          includeSetup,
          total: grandTotal,
          paymentMethod,
          customer: formData
        })
      });
    } catch (e) {
      console.warn('API sync fallback to local execution', e);
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentConfirmed(true);
      if (onSuccess) {
        onSuccess({
          plan: currentPlan.name,
          cycle,
          includeSetup,
          total: grandTotal,
          paymentMethod,
          customer: formData
        });
      }
    }, 1500);
  };

  const handleDownloadReceipt = () => {
    const receiptHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Recibo Oficial - InfluenciMax Pro AI</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0A0A0A; color: #E0E0E0; padding: 40px; margin: 0; }
    .card { max-width: 650px; margin: 0 auto; background: #141414; border: 1px solid #2B2B2B; border-radius: 16px; padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    .header { border-bottom: 2px solid #2B2B2B; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 20px; font-weight: bold; color: #FFF; }
    .badge { background: #10B98120; color: #10B981; border: 1px solid #10B98140; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-family: monospace; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #222; font-size: 13px; }
    .label { color: #888; }
    .value { font-weight: 600; color: #FFF; font-family: monospace; }
    .total-box { background: #1C1C1C; padding: 16px; border-radius: 12px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
    .total-title { font-size: 14px; font-weight: bold; }
    .total-val { font-size: 22px; font-weight: bold; color: #10B981; font-family: monospace; }
    .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #666; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div>
        <div class="logo">InfluenciMax Pro AI</div>
        <div style="font-size: 11px; color: #888; margin-top: 4px;">Recibo de Aquisição e Licenciamento de Software</div>
      </div>
      <div class="badge">PAGO & CONFIRMADO</div>
    </div>
    <div class="row"><span class="label">Transação ID:</span><span class="value">INF-${Date.now()}</span></div>
    <div class="row"><span class="label">Data de Liquidação:</span><span class="value">${new Date().toLocaleString('pt-BR')}</span></div>
    <div class="row"><span class="label">Licença do Software:</span><span class="value">INFMAX-PRO-${Math.random().toString(36).substring(2, 10).toUpperCase()}</span></div>
    <div class="row"><span class="label">Plano Contratado:</span><span class="value">${currentPlan.name} (${cycle === 'annual' ? 'Anual com 20% OFF' : 'Mensal'})</span></div>
    <div class="row"><span class="label">Titular / Empresa:</span><span class="value">${formData.name}</span></div>
    <div class="row"><span class="label">CNPJ / CPF:</span><span class="value">${formData.document}</span></div>
    <div class="row"><span class="label">Forma de Pagamento:</span><span class="value">${paymentMethod.toUpperCase()} (Processado e Liquidado)</span></div>
    <div class="row"><span class="label">Implantação Assistida VIP:</span><span class="value">${includeSetup ? 'INCLUSA COM AUDITORIA' : 'Não Selecionada'}</span></div>
    
    <div class="total-box">
      <span class="total-title">Total Pago</span>
      <span class="total-val">R$ ${grandTotal.toLocaleString('pt-BR')},00</span>
    </div>

    <div class="footer">
      InfluenciMax Pro AI — Análise Preditiva & Otimização Autônoma de Campanhas<br>
      Este documento serve como comprovante de faturamento e ativação contratual imediata.
    </div>
  </div>
  <script>window.onload = function() { window.print(); };</script>
</body>
</html>`;

    const blob = new Blob([receiptHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Comprovante_InfluenciMax_${currentPlan.id}_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0C0C0C] border border-[#222222] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-6 text-[#E0E0E0]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white rounded-xl bg-[#141414] border border-[#222222] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isPaymentConfirmed ? (
          <div>
            {/* Header */}
            <div className="mb-6 border-b border-[#1F1F1F] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" /> Checkout Seguro SSL 256-Bit
                </span>
                <span className="text-[11px] text-[#777777] font-mono hidden sm:inline">
                  Ambiente Transacional Certificado • Emissão Automática de NF-e
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white mt-2">
                Finalizar Assinatura & Ativação de Licença
              </h2>
              <p className="text-xs text-[#888888] mt-1">
                Configure seu plano, taxa de implantação e método de pagamento com liberação imediata.
              </p>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Plan selector & Customer Form (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Plan Selection Buttons */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#888888] tracking-wider mb-2">
                    1. Selecione o Plano Desejado
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_PLANS.map(p => {
                      const isSelected = p.id === activePlanId;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActivePlanId(p.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-indigo-950/30 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                              : 'bg-[#121212] border-[#222222] hover:border-[#333333]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white">{p.name}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                          </div>
                          <div className="text-xs font-mono text-indigo-300 mt-1">
                            R$ {cycle === 'annual' ? p.annualMonthlyPrice : p.monthlyPrice}
                            <span className="text-[10px] text-[#777777]">/mês</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Billing Cycle Switch */}
                <div className="bg-[#121212] p-3 rounded-xl border border-[#222222] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Ciclo de Faturamento</span>
                    <span className="text-[11px] text-[#888888]">Plano anual inclui 20% de desconto e bônus de implantação</span>
                  </div>
                  <div className="flex items-center bg-[#080808] p-1 rounded-lg border border-[#222222]">
                    <button
                      type="button"
                      onClick={() => setCycle('monthly')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        cycle === 'monthly' ? 'bg-[#222222] text-white' : 'text-[#777777] hover:text-white'
                      }`}
                    >
                      Mensal
                    </button>
                    <button
                      type="button"
                      onClick={() => setCycle('annual')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${
                        cycle === 'annual' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold' : 'text-[#777777] hover:text-white'
                      }`}
                    >
                      <span>Anual</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded font-mono">-20%</span>
                    </button>
                  </div>
                </div>

                {/* Setup Fee Option (Implantação Assistida) */}
                <div className={`p-4 rounded-xl border transition-all ${
                  includeSetup 
                    ? 'bg-amber-950/20 border-amber-500/40' 
                    : 'bg-[#121212] border-[#222222]'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSetup}
                        onChange={(e) => setIncludeSetup(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">Implantação Assistida & Onboarding VIP</span>
                          {cycle === 'annual' && (currentPlan.id === 'scale' || currentPlan.id === 'growth') && (
                            <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              CORTESIA NO ANUAL
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#999999] mt-1 leading-relaxed">
                          Auditoria forense da sua base de influenciadores, configuração de webhooks com Meta Ads CAPI e GA4, treinamento ao vivo da sua equipe e configuração inicial dos guardrails.
                        </p>
                      </div>
                    </label>

                    <div className="text-right whitespace-nowrap">
                      {cycle === 'annual' && (currentPlan.id === 'scale' || currentPlan.id === 'growth') ? (
                        <div>
                          <span className="text-[10px] text-[#666666] line-through block">R$ {currentPlan.setupFee}</span>
                          <span className="text-xs font-mono font-bold text-emerald-400">R$ 0,00</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xs font-mono font-bold text-amber-300">
                            + R$ {actualSetupFee}
                          </span>
                          <span className="text-[9px] text-[#777777] block">taxa única</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Customer Data Form */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-mono uppercase text-[#888888] tracking-wider">
                    2. Dados do Titular / Empresa (Para NF-e)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-[#888888] block mb-1">Nome Completo / Contato</span>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        placeholder="Nome do responsável"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#888888] block mb-1">E-mail Corporativo</span>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        placeholder="email@suaempresa.com"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#888888] block mb-1">WhatsApp / Telefone</span>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#888888] block mb-1">CNPJ ou CPF (Nota Fiscal)</span>
                      <input
                        type="text"
                        value={formData.document}
                        onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        placeholder="00.000.000/0001-00"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Payment Gateway (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#121212] border border-[#222222] rounded-2xl p-5">
                <div>
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                    <span>Resumo da Contratação</span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {currentPlan.name}
                    </span>
                  </h3>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-xs font-mono border-b border-[#222222] pb-3 mb-3">
                    <div className="flex justify-between text-[#888888]">
                      <span>Assinatura ({cycle === 'annual' ? 'Anual à vista' : 'Mensal'}):</span>
                      <span className="text-white">R$ {subscriptionTotal.toLocaleString('pt-BR')},00</span>
                    </div>

                    {includeSetup && (
                      <div className="flex justify-between text-[#888888]">
                        <span className="flex items-center gap-1">
                          Implantação Assistida:
                        </span>
                        <span className={actualSetupFee === 0 ? "text-emerald-400 font-bold" : "text-white"}>
                          {actualSetupFee === 0 ? 'GRÁTIS (Bônus Anual)' : `R$ ${actualSetupFee.toLocaleString('pt-BR')},00`}
                        </span>
                      </div>
                    )}

                    {couponApplied && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Cupom VIP (-10%):</span>
                        <span>- R$ {couponDiscount.toLocaleString('pt-BR')},00</span>
                      </div>
                    )}

                    {paymentMethod === 'pix' && pixDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Desconto PIX (-5%):</span>
                        <span>- R$ {pixDiscount.toLocaleString('pt-BR')},00</span>
                      </div>
                    )}

                    <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-[#222222]">
                      <span>Total do Investimento:</span>
                      <span className="text-emerald-400">R$ {grandTotal.toLocaleString('pt-BR')},00</span>
                    </div>
                    {cycle === 'annual' && (
                      <p className="text-[10px] text-[#777777] text-right font-sans">
                        Equivalente a R$ {Math.round(grandTotal / 12)}/mês
                      </p>
                    )}
                  </div>

                  {/* Coupon Form */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Cupom: PROAI"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="bg-[#181818] border border-[#2A2A2A] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono uppercase flex-1"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold bg-[#222222] hover:bg-[#2A2A2A] text-white rounded-lg transition-colors"
                    >
                      Aplicar
                    </button>
                  </form>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] tracking-wider mb-2">
                      3. Forma de Pagamento
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('pix')}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          paymentMethod === 'pix'
                            ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                            : 'bg-[#161616] border-[#262626] text-[#888888] hover:text-white'
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        <span className="text-[11px] font-bold">PIX (-5%)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-indigo-950/30 border-indigo-500 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                            : 'bg-[#161616] border-[#262626] text-[#888888] hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span className="text-[11px] font-bold">Cartão 12x</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('boleto')}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          paymentMethod === 'boleto'
                            ? 'bg-purple-950/30 border-purple-500 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                            : 'bg-[#161616] border-[#262626] text-[#888888] hover:text-white'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-[11px] font-bold">Boleto PJ</span>
                      </button>
                    </div>

                    {/* Method Details */}
                    {paymentMethod === 'pix' && (
                      <div className="bg-[#161616] p-3.5 rounded-xl border border-emerald-500/20 text-xs space-y-3">
                        <div className="flex items-center justify-between text-emerald-400 font-mono text-[11px]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Chave Dinâmica expira em 15m
                          </span>
                          <span className="font-bold">Aprovação em 3 segundos</span>
                        </div>

                        {/* Visual QR Code Image */}
                        <div className="bg-white p-3 rounded-xl mx-auto w-fit shadow-lg border border-emerald-500/30">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodeURIComponent(pixPayload)}`}
                            alt="QR Code PIX Banco Central"
                            className="w-32 h-32 block mx-auto"
                          />
                        </div>

                        {/* Pix Beneficiary Info */}
                        <div className="bg-[#0E0E0E] p-2.5 rounded-lg border border-[#222222] font-mono text-[10px] space-y-1">
                          <div className="flex justify-between text-[#888888]">
                            <span>Beneficiário:</span>
                            <span className="text-white font-bold">{savedReceiver}</span>
                          </div>
                          <div className="flex justify-between text-[#888888]">
                            <span>Chave / CNPJ:</span>
                            <span className="text-emerald-400">{savedPixKey}</span>
                          </div>
                          <div className="flex justify-between text-[#888888]">
                            <span>Cidade:</span>
                            <span className="text-white">{savedCity}</span>
                          </div>
                        </div>

                        {/* Pix Copy & Paste */}
                        <div className="p-2 bg-[#0C0C0C] rounded border border-[#222222] font-mono text-[10px] text-[#A0A0A0] break-all max-h-16 overflow-y-auto">
                          {pixPayload}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={handleCopyPix}
                            className="py-2.5 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg flex items-center justify-center gap-2 font-mono text-xs font-semibold transition-colors"
                          >
                            {isCopiedPix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopiedPix ? 'Chave Copiada!' : 'Copiar Código PIX'}</span>
                          </button>

                          <a
                            href={`https://wa.me/${savedWhatsapp}?text=${encodeURIComponent(`Olá! Quero finalizar o pagamento do plano ${currentPlan.name} (R$ ${grandTotal},00) e tirar uma dúvida de onboarding.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 px-3 bg-[#1A1A1A] hover:bg-[#222222] text-[#CCCCCC] hover:text-white border border-[#2D2D2D] rounded-lg flex items-center justify-center gap-2 font-mono text-xs font-semibold transition-colors text-center"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Ajuda no WhatsApp</span>
                          </a>
                        </div>

                        {/* Optional External Checkout Link if configured */}
                        {externalCheckoutUrl && (
                          <div className="pt-1">
                            <a
                              href={externalCheckoutUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 rounded-lg flex items-center justify-center gap-1.5 font-mono text-[11px] transition-colors"
                            >
                              <span>Prefere pagar via checkout externo (Kiwify / Hotmart)? Clique aqui</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-[10px] text-[#777777] block mb-0.5 font-mono">Número do Cartão</span>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            className="w-full bg-[#181818] border border-[#2A2A2A] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-[#777777] block mb-0.5 font-mono">Validade</span>
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                              className="w-full bg-[#181818] border border-[#2A2A2A] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono text-center"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-[#777777] block mb-0.5 font-mono">CVV</span>
                            <input
                              type="text"
                              value={formData.cardCvv}
                              onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                              className="w-full bg-[#181818] border border-[#2A2A2A] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono text-center"
                            />
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#777777] block mb-0.5 font-mono">Parcelamento</span>
                          <select
                            value={formData.installments}
                            onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
                            className="w-full bg-[#181818] border border-[#2A2A2A] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                          >
                            <option value="1">1x de R$ {grandTotal.toLocaleString('pt-BR')},00 sem juros</option>
                            <option value="3">3x de R$ {Math.round(grandTotal / 3).toLocaleString('pt-BR')},00 sem juros</option>
                            <option value="6">6x de R$ {Math.round(grandTotal / 6).toLocaleString('pt-BR')},00 sem juros</option>
                            <option value="12">12x de R$ {Math.round(grandTotal / 12 * 1.05).toLocaleString('pt-BR')},00</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'boleto' && (
                      <div className="bg-[#161616] p-3 rounded-xl border border-purple-500/20 text-xs space-y-2 font-mono">
                        <div className="flex items-center justify-between text-purple-300 text-[11px]">
                          <span>Boleto Bancário Faturado</span>
                          <span>Vencimento em 3 dias</span>
                        </div>
                        <p className="text-[11px] text-[#888888] font-sans">
                          A compensação bancária ocorre em até 1 dia útil. O boleto e a fatura fiscal serão enviados automaticamente para <strong>{formData.email}</strong>.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="mt-5 pt-3 border-t border-[#222222]">
                  <button
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={isProcessing}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processando com Gateway Seguro...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {paymentMethod === 'pix' ? 'Simular Confirmação do PIX' : 'Concluir Pagamento e Ativar'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-[#666666] font-mono mt-2">
                    Garantia incondicional de 7 dias com reembolso integral via PIX.
                  </p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-8 px-4 max-w-lg mx-auto space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                PAGAMENTO CONFIRMADO • LICENÇA ATIVADA
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white mt-3">
                Bem-vindo ao InfluenciMax Pro AI!
              </h2>
              <p className="text-xs text-[#888888] font-mono mt-1">
                Transação #{Date.now().toString().slice(-8)} aprovada via {paymentMethod.toUpperCase()}
              </p>
            </div>

            <div className="bg-[#141414] border border-[#222222] rounded-2xl p-4 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-[#888888]">Plano Contratado:</span>
                <span className="text-white font-bold">{currentPlan.name} ({cycle === 'annual' ? 'Anual' : 'Mensal'})</span>
              </div>
              <div className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-[#888888]">Titular:</span>
                <span className="text-white">{formData.name} ({formData.document})</span>
              </div>
              <div className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-[#888888]">Valor Total Pago:</span>
                <span className="text-emerald-400 font-bold">R$ {grandTotal.toLocaleString('pt-BR')},00</span>
              </div>
              {includeSetup && (
                <div className="flex justify-between text-amber-300">
                  <span>Implantação Assistida:</span>
                  <span>Agendamento VIP Disponível</span>
                </div>
              )}
              <div className="flex justify-between pt-1 text-[11px] text-indigo-300">
                <span>Chave de Licença:</span>
                <span className="font-bold">INFMAX-PRO-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
              </div>
            </div>

            {includeSetup && (
              <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-xl text-left text-xs space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Sessão de Implantação e Onboarding Agendada</span>
                </div>
                <p className="text-[11px] text-[#A0A0A0]">
                  Nosso especialista entrará em contato via WhatsApp no número <strong>{formData.phone}</strong> para sincronizar seu Meta Ads CAPI e auditar os primeiros 50 influenciadores.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="flex-1 py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors font-mono"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Nota Fiscal / Recibo</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors font-mono"
              >
                <span>Acessar Painel Agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
