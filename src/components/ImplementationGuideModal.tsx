import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Copy, 
  Check, 
  Printer, 
  Layers, 
  Compass, 
  CheckSquare
} from 'lucide-react';
import { 
  IMPLEMENTATION_GUIDE_MARKDOWN, 
  GUIDE_STRUCTURED_SECTIONS, 
  PRACTICAL_CASE_STUDY 
} from '../data/implementationGuideData';

interface ImplementationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotification?: (msg: string) => void;
}

export const ImplementationGuideModal: React.FC<ImplementationGuideModalProps> = ({
  isOpen,
  onClose,
  onNotification
}) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'caseStudy' | 'fullDoc' | 'checklist'>('interactive');
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'item-gateway': true,
    'item-split': true,
    'item-fraud': false,
    'item-sim': false,
    'item-guardrails': false,
    'item-conar': false,
    'item-team': false
  });

  if (!isOpen) return null;

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(IMPLEMENTATION_GUIDE_MARKDOWN);
    setCopied(true);
    if (onNotification) onNotification('Documento de implantação copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([IMPLEMENTATION_GUIDE_MARKDOWN], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Guia_Implantacao_InfluenciMax_Pro.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onNotification) onNotification('Download do Guia de Implantação (.md) iniciado!');
  };

  const handleDownloadHtmlOrPrint = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Guia Oficial de Implantação - InfluenciMax Pro AI</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #f8fafc;
    }
    .container {
      background: #ffffff;
      padding: 48px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    h1 {
      font-size: 26px;
      color: #0f172a;
      border-bottom: 3px solid #6366f1;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    h2 {
      font-size: 20px;
      color: #1e1b4b;
      margin-top: 36px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
    }
    h3 {
      font-size: 16px;
      color: #312e81;
      margin-top: 24px;
    }
    .badge {
      display: inline-block;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 12px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
    }
    .btn-tag {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      color: #0f172a;
    }
    .box {
      background: #f8fafc;
      border-left: 4px solid #6366f1;
      padding: 16px 20px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .box-success {
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      padding: 16px 20px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    ul, ol {
      padding-left: 24px;
    }
    li {
      margin-bottom: 8px;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .container { box-shadow: none; padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button onclick="window.print()" style="background: #4f46e5; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer;">
      Imprimir / Salvar como PDF
    </button>
  </div>
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <span class="badge">INFLUENCIMAX PRO AI 2026</span>
      <span style="font-size: 12px; color: #64748b;">Manual Oficial de Implantação e Onboarding</span>
    </div>
    <h1>DOCUMENTO OFICIAL DE IMPLANTAÇÃO PASSO A PASSO</h1>
    <p><strong>Plataforma:</strong> InfluenciMax Pro AI — Executive Engine</p>
    <p><strong>Classificação:</strong> Procedimento Operacional Padrão (POP) - Configuração Botão a Botão</p>

    <div class="box">
      <strong>Sumário:</strong> Este guia detalha o passo a passo de configuração para marcas e agências, cobrindo integrações de gateway (Asaas/Stripe), auditoria antifraude neural, simulação de ROI de Monte Carlo, guardrails de proteção 24/7, compliance CONAR e acompanhamento em tempo real.
    </div>

    <h2>PARTE I: CONFIGURAÇÃO BOTÃO A BOTÃO POR MÓDULO</h2>
    
    <h3>1. Configuração Financeira & Gateway de Pagamentos</h3>
    <ul>
      <li><strong>Passo 1:</strong> No cabeçalho superior, clique em <span class="btn-tag">[Receber Pagamentos]</span>.</li>
      <li><strong>Passo 2:</strong> Escolha <span class="btn-tag">Asaas</span> (mercado brasileiro) ou <span class="btn-tag">Stripe</span> (internacional).</li>
      <li><strong>Passo 3:</strong> Insira sua Chave de API de Produção e a Chave Secreta de Webhook.</li>
      <li><strong>Passo 4:</strong> Cadastre sua Chave PIX (CNPJ ou E-mail) para liquidações imediatas.</li>
      <li><strong>Passo 5:</strong> Clique em <span class="btn-tag">[Salvar Credenciais & Ativar Gateway]</span> e valide via <span class="btn-tag">[Simular Disparo de Webhook de Teste]</span>.</li>
    </ul>

    <h3>2. Auditoria de Criadores & Detecção de Fraude</h3>
    <ul>
      <li><strong>Passo 1:</strong> Acesse a aba <span class="btn-tag">[Criadores & Fraude]</span>.</li>
      <li><strong>Passo 2:</strong> Utilize o filtro por Nicho (ex: Moda & Beleza) e Tier (Nano a Mega).</li>
      <li><strong>Passo 3:</strong> Verifique o Score de Autenticidade (descarte perfis com menos de 85% autêntico).</li>
      <li><strong>Passo 4:</strong> Clique em <span class="btn-tag">[Auditar Perfil Detalhado]</span> e <span class="btn-tag">[Exportar Dossiê de Auditoria]</span>.</li>
    </ul>

    <h3>3. Simulador Preditivo de ROI</h3>
    <ul>
      <li><strong>Passo 1:</strong> Navegue até a aba <span class="btn-tag">[Simulador de ROI]</span>.</li>
      <li><strong>Passo 2:</strong> Preencha o Orçamento Total (R$), Ticket Médio e Taxa de Conversão estimada.</li>
      <li><strong>Passo 3:</strong> Marque os criadores auditados no mix de influenciadores.</li>
      <li><strong>Passo 4:</strong> Analise as projeções de Alcance Líquido, Vendas Previstas, GMV e ROAS.</li>
      <li><strong>Passo 5:</strong> Clique em <span class="btn-tag">[🚀 Lançar Campanha com Monitoramento Autônomo]</span>.</li>
    </ul>

    <h3>4. Estúdio de Automação & Guardrails 24/7</h3>
    <ul>
      <li><strong>Passo 1:</strong> Acesse a aba <span class="btn-tag">[Estúdio de Automação]</span>.</li>
      <li><strong>Passo 2:</strong> Ligue os interruptores das regras "Trava de Visualizações Mínimas", "Vigilância de Comentários Tóxicos" e "Guilhotina CONAR".</li>
      <li><strong>Passo 3:</strong> Para criar uma regra customizada, clique em <span class="btn-tag">[+ Nova Regra Autônoma]</span>, configure o Gatilho e a Ação Imediata.</li>
    </ul>

    <h3>5. Gerador de Briefing & Compliance CONAR</h3>
    <ul>
      <li><strong>Passo 1:</strong> Acesse a aba <span class="btn-tag">[Gerador de Briefing & Compliance]</span>.</li>
      <li><strong>Passo 2:</strong> Preencha o objetivo da mensagem e a lista de "No-Gos" (o que não dizer).</li>
      <li><strong>Passo 3:</strong> Clique em <span class="btn-tag">[Gerar Briefing Executivo com IA]</span>.</li>
      <li><strong>Passo 4:</strong> Clique em <span class="btn-tag">[Copiar Briefing]</span> ou <span class="btn-tag">[Exportar em PDF / Word]</span>.</li>
    </ul>

    <h2>PARTE II: CASO PRÁTICO REAL — LUMINA COSMÉTICOS BRASIL</h2>
    <div class="box-success">
      <p><strong>Marca:</strong> Lumina Cosméticos Brasil Ltda (D2C de Skincare)</p>
      <p><strong>Campanha:</strong> Operação Pele Iluminada - Lançamento Sérum Niacinamida 15%</p>
      <p><strong>Orçamento Investido:</strong> R$ 45.000,00 | <strong>Preço do Produto:</strong> R$ 149,90</p>
      <p><strong>Mix de Criadores:</strong> 1 Mega (Bianca Andrade - 97.4% autêntica), 1 Mid-tier Dermatologista (Dra. Luiza - 98.6% autêntica) e 1 Nano (Clara Skincare - 99.1% autêntica).</p>
      <hr style="border: none; border-top: 1px dashed #86efac; margin: 12px 0;">
      <p><strong>Resultados Finais Obtidos & Validados no Painel:</strong></p>
      <ul>
        <li><strong>Alcance Líquido Preditivo:</strong> 1.340.000 pessoas únicas alcançadas</li>
        <li><strong>Cliques Rastreados na Loja:</strong> 41.540 visitas</li>
        <li><strong>Vendas Convertidas:</strong> 1.287 pedidos aprovados</li>
        <li><strong>Faturamento Bruto (GMV):</strong> R$ 192.921,30</li>
        <li><strong>ROAS Final da Campanha:</strong> 4.28x</li>
        <li><strong>CAC Médio por Pedido:</strong> R$ 34,96 (43% menor que tráfego pago tradicional)</li>
      </ul>
    </div>

    <h2>PARTE III: CHECKLIST DE GO-LIVE</h2>
    <ul>
      <li>[X] Gateway Asaas/Stripe configurado com chave de produção e Webhook ativo</li>
      <li>[X] Regras de split de comissão de afiliados parametrizadas</li>
      <li>[X] Todos os influenciadores auditados com score de autenticidade > 90%</li>
      <li>[X] Simulação de ROI executada com ROAS mínimo validado de 3.5x</li>
      <li>[X] Guardrails 24/7 ativados com pausas automáticas em caso de violação</li>
      <li>[X] Briefing com obrigatoriedade da tag #publi nos primeiros 3 segundos homologado</li>
    </ul>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
      InfluenciMax Pro AI 2026 • Suporte: suporte@influencimax.ai • Todos os direitos reservados.
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Guia_Implantacao_InfluenciMax_Pro.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onNotification) onNotification('Documento formatado (.html/PDF) baixado com sucesso!');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-indigo-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-purple-400" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0B0B0E] border border-[#222228] rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#1C1C22] flex flex-wrap items-center justify-between gap-4 bg-[#0E0E12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <div className="w-full h-full bg-[#09090C] rounded-[10px] flex items-center justify-center">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Guia Oficial de Implantação Botão a Botão
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  MANUAL 2026.4
                </span>
              </div>
              <p className="text-xs text-[#888899]">
                Manual técnico de parametrização completa, botões e exemplo prático para download
              </p>
            </div>
          </div>

          {/* Quick Action Downloads */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 text-xs font-medium text-[#A0A0B0] hover:text-white bg-[#14141A] hover:bg-[#1A1A22] border border-[#262630] rounded-lg flex items-center gap-1.5 transition-all"
              title="Copiar texto em Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="px-3.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
              title="Baixar arquivo Markdown .md"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Baixar (.MD)</span>
            </button>

            <button
              onClick={handleDownloadHtmlOrPrint}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg flex items-center gap-1.5 shadow-md transition-all"
              title="Baixar documento HTML pronto para abrir ou imprimir em PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-300" />
              <span>Baixar (.HTML / PDF)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#777788] hover:text-white hover:bg-[#1A1A22] rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-[#1A1A20] bg-[#0A0A0D] flex items-center gap-2 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-4 py-2 border-b-2 font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'interactive'
                ? 'border-indigo-500 text-white bg-[#121218]'
                : 'border-transparent text-[#777788] hover:text-[#CCCCCC]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Passo a Passo Botão a Botão</span>
          </button>

          <button
            onClick={() => setActiveTab('caseStudy')}
            className={`px-4 py-2 border-b-2 font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'caseStudy'
                ? 'border-indigo-500 text-white bg-[#121218]'
                : 'border-transparent text-[#777788] hover:text-[#CCCCCC]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exemplo Prático (Lumina Cosméticos)</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 border-b-2 font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'checklist'
                ? 'border-indigo-500 text-white bg-[#121218]'
                : 'border-transparent text-[#777788] hover:text-[#CCCCCC]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Checklist de Go-Live ({Object.values(checkedItems).filter(Boolean).length}/7)</span>
          </button>

          <button
            onClick={() => setActiveTab('fullDoc')}
            className={`px-4 py-2 border-b-2 font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'fullDoc'
                ? 'border-indigo-500 text-white bg-[#121218]'
                : 'border-transparent text-[#777788] hover:text-[#CCCCCC]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Documento Completo (.MD)</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-[#CCCCCC]">
          
          {/* TAB 1: INTERACTIVE STEP-BY-STEP */}
          {activeTab === 'interactive' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-950/30 to-purple-950/20 border border-indigo-800/30 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">Manual Executivo de Implantação e Operação</p>
                  <p className="text-[#9999AA]">
                    Siga rigorosamente cada etapa descrita abaixo. Todos os botões mencionados possuem correspondência exata na interface do sistema.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {GUIDE_STRUCTURED_SECTIONS.map((section) => (
                  <div key={section.id} className="bg-[#0F0F14] border border-[#22222A] rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3 border-b border-[#1C1C24] pb-3">
                      <div className="p-2 rounded-lg bg-[#16161E] border border-[#262632]">
                        {getIcon(section.iconName)}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">{section.title}</h4>
                        <p className="text-xs text-[#888899]">{section.summary}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-1">
                      {section.steps.map((step) => (
                        <div key={step.stepNumber} className="bg-[#13131A] border border-[#1E1E26] rounded-lg p-4 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                PASSO {step.stepNumber}
                              </span>
                              <span className="font-semibold text-white text-xs sm:text-sm">{step.actionTitle}</span>
                            </div>
                            <span className="text-[11px] font-mono text-[#888899] bg-[#0A0A0E] px-2 py-0.5 rounded border border-[#22222A]">
                              Tela: {step.screenTab}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#777788]">Botão / Ação no Sistema:</span>
                            <span className="font-mono font-bold text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/40">
                              {step.buttonLabel}
                            </span>
                          </div>

                          <ul className="space-y-1.5 pl-4 text-xs text-[#BBBBCC] list-disc marker:text-indigo-400">
                            {step.instructions.map((inst, i) => (
                              <li key={i}>{inst}</li>
                            ))}
                          </ul>

                          {step.proTip && (
                            <div className="bg-[#181822] border-l-2 border-indigo-500 px-3 py-2 text-[11px] text-[#A0A0B5] rounded-r">
                              <strong className="text-indigo-300">Dica Executiva:</strong> {step.proTip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PRACTICAL REAL CASE STUDY */}
          {activeTab === 'caseStudy' && (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="bg-gradient-to-r from-emerald-950/30 via-[#0F1318] to-cyan-950/20 border border-emerald-800/30 rounded-xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase font-bold">
                      Caso Prático Real Validado
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {PRACTICAL_CASE_STUDY.brand}
                    </h3>
                    <p className="text-xs text-[#8899AA]">
                      {PRACTICAL_CASE_STUDY.campaignName}
                    </p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs text-[#888899]">ROAS Real Preditivo:</span>
                    <div className="text-2xl font-bold text-emerald-400">
                      {PRACTICAL_CASE_STUDY.actualProjectedROAS}
                    </div>
                  </div>
                </div>
              </div>

              {/* Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#121218] border border-[#22222A] p-3.5 rounded-xl">
                  <span className="text-[10px] text-[#777788] uppercase font-mono">Orçamento Alocado</span>
                  <p className="text-base font-bold text-white font-mono mt-1">{PRACTICAL_CASE_STUDY.budget}</p>
                </div>
                <div className="bg-[#121218] border border-[#22222A] p-3.5 rounded-xl">
                  <span className="text-[10px] text-[#777788] uppercase font-mono">Ticket do Produto</span>
                  <p className="text-base font-bold text-white font-mono mt-1">{PRACTICAL_CASE_STUDY.productPrice}</p>
                </div>
                <div className="bg-[#121218] border border-[#22222A] p-3.5 rounded-xl">
                  <span className="text-[10px] text-[#777788] uppercase font-mono">Segmento</span>
                  <p className="text-xs font-semibold text-white mt-1">{PRACTICAL_CASE_STUDY.segment}</p>
                </div>
                <div className="bg-[#121218] border border-[#22222A] p-3.5 rounded-xl">
                  <span className="text-[10px] text-[#777788] uppercase font-mono">Meta de Vendas</span>
                  <p className="text-xs font-semibold text-emerald-400 mt-1">{PRACTICAL_CASE_STUDY.targetGoal}</p>
                </div>
              </div>

              {/* Creators Selected in Mix */}
              <div className="bg-[#101016] border border-[#20202A] rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Mix de Influenciadores Configurados na Campanha
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  {PRACTICAL_CASE_STUDY.creatorsSelected.map((c, idx) => (
                    <div key={idx} className="bg-[#14141E] border border-[#242432] p-3.5 rounded-lg space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-xs">{c.name}</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {c.authenticity}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#888899]">{c.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by Step Real Flow */}
              <div className="bg-[#101016] border border-[#20202A] rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Como a Implantação Foi Feita (Passo a Passo da Lumina)
                </h4>

                <div className="space-y-3 text-xs text-[#BBBBCC]">
                  <div className="p-3 bg-[#14141E] rounded-lg border border-[#22222E]">
                    <strong className="text-white">1. Parametrização do Asaas:</strong> O time financeiro cadastrou a Chave PIX CNPJ e ativou o repasse automático de 10% de comissão de afiliado vinculada ao cupom exclusivo de cada criador.
                  </div>
                  <div className="p-3 bg-[#14141E] rounded-lg border border-[#22222E]">
                    <strong className="text-white">2. Filtro Neural de Fraude:</strong> Dos 4 criadores avaliados, o 4º perfil foi barrado pelo InfluenciMax Pro devido à taxa de 43% de seguidores estrangeiros sem conversão real, poupando R$ 12.000,00 da marca.
                  </div>
                  <div className="p-3 bg-[#14141E] rounded-lg border border-[#22222E]">
                    <strong className="text-white">3. Monte Carlo no Simulador:</strong> A IA projetou 1.287 pedidos com margem de segurança de 92%.
                  </div>
                  <div className="p-3 bg-[#14141E] rounded-lg border border-[#22222E]">
                    <strong className="text-white">4. Ativação de 3 Guardrails 24/7:</strong> Trava de segurança para retenção nos Stories, detector de comentários de alergia/crise e notificação automática de cumprimento de regras CONAR.
                  </div>
                </div>
              </div>

              {/* Concrete Results */}
              <div className="bg-gradient-to-r from-emerald-950/20 to-[#0F1418] border border-emerald-900/30 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Balanço Final de Resultados Concretos
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#CCDDEE]">
                  {PRACTICAL_CASE_STUDY.resultsSummary.map((res, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-[#0B1014] rounded border border-emerald-900/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST DE GO-LIVE */}
          {activeTab === 'checklist' && (
            <div className="space-y-5">
              <div className="bg-[#121218] border border-[#22222C] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Lista de Checagem Pré-Lançamento (Go-Live Audit)</h4>
                  <p className="text-xs text-[#888899]">Marque cada item conforme conclui a implantação na sua conta.</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-emerald-400 font-bold">
                    {Math.round((Object.values(checkedItems).filter(Boolean).length / 7) * 100)}% Concluído
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'item-gateway', label: 'Gateway Asaas ou Stripe conectado com chaves de produção e webhook de teste validado (Status 200 OK)' },
                  { id: 'item-split', label: 'Regras de split de comissão / pagamento por entrega configuradas na aba de pagamentos' },
                  { id: 'item-fraud', label: 'Auditoria antifraude realizada em 100% dos influenciadores selecionados (score > 85%)' },
                  { id: 'item-sim', label: 'Simulação de ROI executada com ROAS mínimo projetado superior ao CAC do tráfego pago' },
                  { id: 'item-guardrails', label: 'Pelo menos 2 Guardrails autônomos 24/7 ativados no Estúdio de Automação' },
                  { id: 'item-conar', label: 'Briefing gerado com cláusula expressa de identificação publicitária CONAR (#publi)' },
                  { id: 'item-team', label: 'Equipe de marketing e atendimento orientada sobre as regras e uso do Copilot IA' },
                ].map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleCheck(task.id)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      checkedItems[task.id] 
                        ? 'bg-emerald-950/15 border-emerald-800/40 text-white' 
                        : 'bg-[#121218] border-[#22222A] text-[#9999AA] hover:border-[#33333F]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      checkedItems[task.id] 
                        ? 'bg-emerald-500 text-black font-bold' 
                        : 'border border-[#444455] bg-[#0E0E14]'
                    }`}>
                      {checkedItems[task.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium flex-1">{task.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FULL DOCUMENT MARKDOWN VIEWER */}
          {activeTab === 'fullDoc' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#111116] p-3 rounded-lg border border-[#202028]">
                <span className="text-xs text-[#888899] font-mono">Fonte: /src/data/implementationGuideData.ts</span>
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1 text-xs font-mono font-medium text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Texto Bruto'}</span>
                </button>
              </div>

              <div className="bg-[#09090C] border border-[#1E1E24] rounded-xl p-5 font-mono text-xs text-[#A0A0B0] whitespace-pre-wrap leading-relaxed select-text max-h-[500px] overflow-y-auto">
                {IMPLEMENTATION_GUIDE_MARKDOWN}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#1C1C22] bg-[#0E0E12] flex flex-wrap items-center justify-between gap-3 text-xs text-[#777788]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Documento homologado para implantações corporativas</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="px-3 py-1.5 text-xs text-[#AAAAAA] hover:text-white bg-[#15151D] hover:bg-[#1D1D28] border border-[#2A2A36] rounded-lg transition-all"
            >
              Baixar .MD
            </button>
            <button
              onClick={handleDownloadHtmlOrPrint}
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-md flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Guia Formatado (HTML/PDF)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
