import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  ChevronRight, 
  X, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Layers, 
  TrendingUp, 
  Bot, 
  ShieldCheck, 
  Zap, 
  Calendar, 
  PhoneCall,
  Download,
  ExternalLink
} from 'lucide-react';

interface AcademyDemoViewProps {
  onNavigateToTab?: (tab: string) => void;
  onNotification?: (msg: string) => void;
}

export function AcademyDemoView({ onNavigateToTab, onNotification }: AcademyDemoViewProps) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  // Booking form states
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingBudget, setBookingBudget] = useState('R$ 20.000 a R$ 50.000/mês');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const demoTourSteps = [
    {
      stepNumber: 1,
      tabId: 'audience',
      title: '1. Sintetizador de Audiência & Detecção de Personas',
      headline: 'Mapeie clientes reais com poder de compra e zero robôs',
      desc: 'O motor neural examina clusters semânticos no mercado brasileiro e global. Ele gera o Reach Score da audiência e projeta o CPM exato antes de qualquer gasto.',
      actionLabel: 'Ir para Audiência & Segmentação',
      badge: 'Motor Preditivo Ativo',
      preview: {
        metric1: 'Reach Score: 94/100',
        metric2: 'Volume Único: 1.42M',
        metric3: 'CPM Estimado: R$ 34,20'
      }
    },
    {
      stepNumber: 2,
      tabId: 'directory',
      title: '2. Auditoria de Criadores & Detecção de Fraude',
      headline: 'Auditoria de bot em lote e score de autenticidade acima de 98%',
      desc: 'Nossa visão computacional audita o engajamento de cada influenciador, separando contas fakes e pods de comentários de audiências reais com alto poder de conversão.',
      actionLabel: 'Explorar Criadores & Fraude',
      badge: 'Filtro Anti-Bot <1.8%',
      preview: {
        metric1: 'Autenticidade: 96% Real',
        metric2: 'Engajamento Médio: 5.6%',
        metric3: 'Sensibilidade de Fraude: Baixa'
      }
    },
    {
      stepNumber: 3,
      tabId: 'creatives',
      title: '3. Estúdio Criativo & Visão Computacional OCR',
      headline: 'Valide contraste e formato carrossel antes de subir no Meta Ads',
      desc: 'Faça a composição de até 6 slides. O sistema verifica a densidade de texto (regra dos 20%), legibilidade em mobile e a presença obrigatória da tag de compliance #publi.',
      actionLabel: 'Abrir Estúdio Criativo',
      badge: 'OCR Computer Vision 98%',
      preview: {
        metric1: 'Contraste WCAG: AAA',
        metric2: 'Retenção Slide 1: 88%',
        metric3: 'Compliance CONAR: Aprovado'
      }
    },
    {
      stepNumber: 4,
      tabId: 'simulator',
      title: '4. Simulador Preditivo de ROI & Orçamento',
      headline: 'Preveja vendas, CAC e multiplicador de ROI com precisão estatística',
      desc: 'Misture criadores de nichos variados, ajuste a verba e descubra a sobreposição de audiência e a curva de conversão estimada nos primeiros 7 a 30 dias.',
      actionLabel: 'Abrir Simulador de ROI',
      badge: 'Multiplicador Previsto 3.8x',
      preview: {
        metric1: 'Retorno Estimado: R$ 95.000',
        metric2: 'Sobreposição de Base: 12%',
        metric3: 'Probabilidade Viral: 88%'
      }
    },
    {
      stepNumber: 5,
      tabId: 'automations',
      title: '5. Estúdio de Automação & Guardrails Autônomos',
      headline: 'O sistema gerencia verba e desativa criadores que não performam',
      desc: 'Regras 24/7 que monitoram desvios de CPC, CPL e CTR. Se um criador tiver CTR abaixo do piso, a verba é realocada instantaneamente para o anúncio com maior retorno.',
      actionLabel: 'Acessar Automações',
      badge: 'Monitoramento 24/7',
      preview: {
        metric1: 'Gatilho de Proteção: Ativo',
        metric2: 'Tempo de Resposta: <100ms',
        metric3: 'Economia Projetada: +24%'
      }
    }
  ];

  const tutorialSections = [
    {
      id: 0,
      title: 'Módulo 1: Configuração Estratégica de Audiência',
      content: [
        'Acesse a aba "Audiência & Segmentação" no menu superior.',
        'Selecione se o seu motor de alcance é Brasil (nacional) ou Global.',
        'Insira os cargos tomadores de decisão (ex: "Diretor Escolar, Mantenedor, Coordenador Pedagógico").',
        'Defina os interesses específicos e a faixa etária correspondente ao poder de compra.',
        'Clique em "Calcular Reach Score & Síntese" para receber o diagnóstico neural de saturação e o volume de pessoas impactadas.'
      ]
    },
    {
      id: 1,
      title: 'Módulo 2: Seleção de Criadores e Verificação de Fraude',
      content: [
        'Abra "Criadores & Fraude" para ver a listagem com pontuação preditiva.',
        'Utilize o filtro Anti-Bot para excluir qualquer influenciador com mais de 2% de seguidores inativos ou robôs.',
        'Analise a taxa de autenticidade (índice ideal: acima de 92%).',
        'Clique em "Simular com Criador" no perfil desejado para transferi-lo instantaneamente ao Simulador de ROI.'
      ]
    },
    {
      id: 2,
      title: 'Módulo 3: Criação de Carrossel e Auditoria OCR',
      content: [
        'Na aba "Criativos & Mídia", personalize os títulos e subtítulos dos 6 slides.',
        'Preencha o Texto Principal (Primary Text) com a chamada para ação e verifique a contagem de caracteres.',
        'Mantenha ativada a "Análise de Visão Computacional OCR" e clique em "Re-auditar OCR".',
        'Confira o parecer da IA para certificar-se de que a tag #publi e as regras de contraste estão em conformidade.'
      ]
    },
    {
      id: 3,
      title: 'Módulo 4: Simulação de ROI e Lançamento de Campanha',
      content: [
        'Vá para "Simulador de ROI", defina o orçamento total desejado (ex: R$ 25.000) e selecione o objetivo comercial.',
        'Escolha múltiplos criadores para o motor calcular automaticamente a sobreposição de audiência (overlap).',
        'Revise os insights estratégicos gerados por IA e a probabilidade de viralização.',
        'Clique em "Lançar Campanha com Monitoramento" para enviar os dados para o Painel Preditivo em tempo real.'
      ]
    },
    {
      id: 4,
      title: 'Módulo 5: Guardrails e Automações Autônomas',
      content: [
        'Em "Estúdio de Automação", visualize as regras pré-configuradas de contingência e escalabilidade.',
        'Ative o gatilho "Realoque 20% do orçamento caso o CTR supere 3.5% nas primeiras 6 horas".',
        'Ajuste os pisos de segurança em "Métricas & Metas (KPIs)" para que o sistema proteja sua margem 24 horas por dia.'
      ]
    }
  ];

  const handleDownloadWordDoc = () => {
    const wordContent = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>InfluenciMax Pro AI - Manual Oficial do Usuário</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1A1A1A;
      background-color: #FFFFFF;
      margin: 2.5cm 2.0cm 2.5cm 2.0cm;
    }
    h1 {
      font-size: 24pt;
      color: #312E81;
      font-weight: bold;
      border-bottom: 2pt solid #4F46E5;
      padding-bottom: 8pt;
      margin-top: 18pt;
      margin-bottom: 12pt;
      page-break-before: always;
    }
    .cover-h1 {
      page-break-before: avoid !important;
      font-size: 28pt;
      color: #1E1B4B;
      border-bottom: 3pt solid #6366F1;
      margin-top: 30pt;
    }
    h2 {
      font-size: 16pt;
      color: #4338CA;
      font-weight: bold;
      margin-top: 16pt;
      margin-bottom: 8pt;
      border-left: 4pt solid #6366F1;
      padding-left: 8pt;
    }
    h3 {
      font-size: 13pt;
      color: #1F2937;
      font-weight: bold;
      margin-top: 12pt;
      margin-bottom: 6pt;
    }
    p, li {
      font-size: 11pt;
      color: #374151;
      margin-bottom: 6pt;
    }
    ul, ol {
      margin-left: 20pt;
      margin-bottom: 10pt;
    }
    .cover-box {
      border: 1pt solid #E0E7FF;
      background-color: #EEF2FF;
      padding: 24pt;
      border-radius: 8pt;
      text-align: center;
      margin-bottom: 30pt;
    }
    .badge {
      display: inline-block;
      background-color: #4F46E5;
      color: #FFFFFF;
      padding: 4pt 10pt;
      font-size: 9pt;
      font-weight: bold;
      border-radius: 4pt;
      letter-spacing: 1pt;
      text-transform: uppercase;
    }
    .callout {
      background-color: #F8FAFC;
      border-left: 4pt solid #3B82F6;
      padding: 10pt 14pt;
      margin: 12pt 0;
      font-size: 10.5pt;
    }
    .callout-success {
      background-color: #F0FDF4;
      border-left: 4pt solid #10B981;
      padding: 10pt 14pt;
      margin: 12pt 0;
      font-size: 10.5pt;
    }
    .callout-warning {
      background-color: #FFFBEB;
      border-left: 4pt solid #F59E0B;
      padding: 10pt 14pt;
      margin: 12pt 0;
      font-size: 10.5pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14pt 0;
      font-size: 10pt;
    }
    th {
      background-color: #312E81;
      color: #FFFFFF;
      font-weight: bold;
      padding: 8pt;
      border: 1pt solid #4338CA;
      text-align: left;
    }
    td {
      padding: 8pt;
      border: 1pt solid #E5E7EB;
      vertical-align: top;
    }
    tr:nth-child(even) {
      background-color: #F9FAFB;
    }
    .footer-note {
      font-size: 9pt;
      color: #6B7280;
      border-top: 1pt solid #E5E7EB;
      padding-top: 12pt;
      margin-top: 24pt;
      text-align: center;
    }
  </style>
</head>
<body>

  <!-- CAPA -->
  <div class='cover-box'>
    <span class='badge'>Manual Oficial & Plano Estratégico 2026</span>
    <h1 class='cover-h1'>InfluenciMax Pro AI</h1>
    <p style='font-size: 14pt; color: #4B5563; font-weight: 600; margin-top: 8pt;'>
      Predictive Influencer Marketing & Autonomous Campaign Engine
    </p>
    <p style='font-size: 11pt; color: #6B7280; margin-top: 12pt;'>
      Guia de Implantação Operacional, Análise de Mercado e Passo a Passo Completo do Usuário
    </p>
    <div style='margin-top: 20pt; font-size: 10pt; color: #4B5563;'>
      <strong>Versão:</strong> 2.4 Enterprise | 
      <strong>Data:</strong> Novembro de 2026 | 
      <strong>Classificação:</strong> Confidencial / Comercial
    </div>
  </div>

  <!-- SUMÁRIO EXECUTIVO -->
  <h2>1. Visão Geral & Proposta de Valor</h2>
  <p>
    O <strong>InfluenciMax Pro AI</strong> é uma plataforma corporativa pioneira voltada à orquestração, auditoria antifraude e automação preditiva de campanhas com influenciadores digitais e criadores de conteúdo (UGC). Diferente de catálogos tradicionais que atuam apenas como vitrines estáticas, o InfluenciMax Pro integra inteligência neural preditiva, visão computacional OCR e guardrails autônomos 24 horas por dia.
  </p>
  <div class='callout-success'>
    <strong>Resultados Comprovados em Pilotos:</strong>
    <ul>
      <li>Redução de até <strong>40% no CAC</strong> (Custo de Aquisição de Clientes).</li>
      <li>Eliminação de <strong>98.2% de contas robôs e pods de engajamento falso</strong>.</li>
      <li>Previsão de ROAS com acurácia média superior a <strong>88%</strong> antes do primeiro desembolso de verba.</li>
      <li>Economia de mais de 25 horas semanais da equipe de marketing através de briefings gerados em IA e automações autônomas de contingência.</li>
    </ul>
  </div>

  <!-- PASSO A PASSO DOS 10 MÓDULOS -->
  <h1>2. Passo a Passo Detalhado dos 10 Módulos do Sistema</h1>
  <p>Siga as instruções operacionais abaixo para operar o ecossistema com máxima eficiência:</p>

  <h2>Módulo 1: Painel Preditivo (Executive Dashboard)</h2>
  <p><strong>Objetivo:</strong> Fornecer à diretoria e aos gestores uma visão consolidada de performance preditiva vs. realizada em tempo real.</p>
  <ol>
    <li><strong>Acesso:</strong> Clique na primeira aba <em>"Painel Preditivo"</em> no menu de navegação superior.</li>
    <li><strong>Indicadores Chave (Cards de Topo):</strong>
      <ul>
        <li><strong>Alcance Preditivo vs. Real:</strong> Mostra o volume de impressões alcançadas contra a projeção matemática da IA.</li>
        <li><strong>Est. Campaign ROI:</strong> Multiplicador de retorno financeiro e faturamento gerado pela base de influenciadores ativos.</li>
        <li><strong>Automações Ativas:</strong> Quantidade de guardrails autônomos protegendo sua verba neste instante.</li>
        <li><strong>Qualidade da Audiência:</strong> Índice de autenticidade consolidado das bases (mantido acima de 98%).</li>
      </ul>
    </li>
    <li><strong>Interação com Gráficos:</strong> Acompanhe a curva de visualizações preditivas versus dados reais do pixel para identificar saturação precoce de criativos.</li>
    <li><strong>Ações Rápidas:</strong> Utilize o botão <em>"Simular Investimento"</em> para saltar diretamente ao módulo de alocação de verba.</li>
  </ol>

  <h2>Módulo 2: Criadores & Fraude (Creator Directory & Anti-Bot)</h2>
  <p><strong>Objetivo:</strong> Filtrar, auditar e homologar criadores com alto poder de conversão, eliminando fraudes de seguidores comprados.</p>
  <ol>
    <li>Acesse a aba <em>"Criadores & Fraude"</em>.</li>
    <li><strong>Filtro Anti-Bot Ativo:</strong> Mantenha o slider de tolerância de bot abaixo de 2% para garantir que apenas criadores limpos sejam exibidos.</li>
    <li><strong>Análise de Ficha Técnica do Criador:</strong> Verifique os 4 pilares:
      <ul>
        <li><em>Reach Score Preditivo:</em> Potencial de atração orgânica do influenciador.</li>
        <li><em>Taxa de Autenticidade:</em> Proporção de humanos reais ativos nas interações.</li>
        <li><em>Engajamento Médio:</em> Taxa líquida de curtidas/comentários qualificados.</li>
        <li><em>Nicho & Projeção de ROAS:</em> Segmento (Finanças, Tecnologia, Moda, etc.) e retorno estimado.</li>
      </ul>
    </li>
    <li><strong>Simular com Criador:</strong> Clique no botão de simulação do card do criador para transferir seus parâmetros matemáticos diretamente ao Simulador de ROI.</li>
  </ol>

  <h2>Módulo 3: Simulador Preditivo de ROI & Orçamento</h2>
  <p><strong>Objetivo:</strong> Testar cenários financeiros, detectar sobreposição de audiência (overlap) e simular múltiplos de receita antes de investir.</p>
  <ol>
    <li>Acesse a aba <em>"Simulador de ROI"</em>.</li>
    <li><strong>Definição de Parâmetros de Entrada:</strong>
      <ul>
        <li>Insira a <em>Verba Total de Campanha (R$)</em> (ex: R$ 25.000).</li>
        <li>Selecione o <em>Objetivo Estratégico</em> (Vendas/Conversão, Aquisição de Leads ou Reconhecimento de Marca).</li>
      </ul>
    </li>
    <li><strong>Seleção de Mix de Criadores:</strong> Marque 2 ou mais criadores da lista. O sistema calculará instantaneamente:
      <ul>
        <li><em>Retorno Financeiro Estimado (R$):</em> Faturamento projetado com base em taxas de conversão históricas.</li>
        <li><em>Múltiplo de ROI Estimado (ex: 3.8x):</em> Ganho líquido projetado sobre a verba investida.</li>
        <li><em>Taxa de Overlap (Sobreposição):</em> Percentual de seguidores compartilhados para evitar que você pague duas vezes pela mesma pessoa.</li>
        <li><em>Probabilidade Viral:</em> Índice de propensão de tração algorítmica orgânica.</li>
      </ul>
    </li>
    <li><strong>Lançar Campanha com Monitoramento:</strong> Ao clicar no botão de lançamento, a campanha é instantaneamente injetada no Painel Executivo e as regras de contingência são vinculadas.</li>
  </ol>

  <h2>Módulo 4: Estúdio de Automação (Autonomous Guardrails 24/7)</h2>
  <p><strong>Objetivo:</strong> Proteger a margem de lucro com regras autônomas que realocam orçamentos ou pausam anúncios com baixa performance.</p>
  <ol>
    <li>Acesse a aba <em>"Estúdio de Automação"</em>.</li>
    <li><strong>Regras Pré-Configuradas Disponíveis:</strong>
      <ul>
        <li><em>Escala Inteligente de Top Performers:</em> Se o CTR de um anúncio superar 3.5% nas primeiras 6 horas, o sistema realoca automaticamente +20% do orçamento.</li>
        <li><em>Pausa de Contingência Antifraude:</em> Se a taxa de retenção ou autenticidade despencar, o anúncio do criador é pausado e o gestor recebe alerta via Webhook/WhatsApp.</li>
        <li><em>Proteção de Piso de CPL:</em> Se o Custo por Lead exceder o teto estipulado, reduz o lance em 30%.</li>
      </ul>
    </li>
    <li><strong>Ativação / Criação:</strong> Use os botões de alternância para ligar/desligar regras ou clique em <em>"Adicionar Nova Automação"</em> para estipular condições personalizadas.</li>
  </ol>

  <h2>Módulo 5: Gerador de Briefing & Compliance CONAR</h2>
  <p><strong>Objetivo:</strong> Redigir roteiros e contratos blindados em segundos com auxílio de IA generativa.</p>
  <ol>
    <li>Acesse <em>"Gerador de Briefing & Compliance"</em>.</li>
    <li>Selecione o criador contratado, o produto a ser divulgado e o objetivo de vendas.</li>
    <li>Clique em <em>"Gerar Briefing com IA"</em>.</li>
    <li>O sistema entregará:
      <ul>
        <li>Gancho viral nos primeiros 3 segundos (Hook).</li>
        <li>Desenvolvimento da dor e demonstração de solução.</li>
        <li>Call to Action (CTA) com cupom rastreado exclusivo.</li>
        <li>Checklist de compliance obrigatório (inclusão de #publi, regras de menção legal e diretrizes CONAR).</li>
      </ul>
    </li>
  </ol>

  <h2>Módulo 6: Audiência & Segmentação Neural</h2>
  <p><strong>Objetivo:</strong> Sintetizar personas, calcular saturação e projetar o CPM exato do público-alvo.</p>
  <ol>
    <li>Acesse a aba <em>"Audiência & Segmentação"</em>.</li>
    <li>Escolha entre alcance <em>Brasil (Nacional)</em> ou <em>Global</em>.</li>
    <li>Digite os cargos e perfis de interesse (ex: "Diretor Escolar, Gestor Financeiro, CMO").</li>
    <li>Ajuste as faixas etárias correspondentes ao poder de compra desejado.</li>
    <li>Clique em <em>"Calcular Reach Score & Síntese"</em> para receber a projeção de volume impactado e o CPM ideal sugerido para lances.</li>
  </ol>

  <h2>Módulo 7: Criativos & Mídia (OCR Computer Vision)</h2>
  <p><strong>Objetivo:</strong> Auditar a legibilidade e contraste de criativos carrossel antes de investir verba no Meta Ads ou TikTok.</p>
  <ol>
    <li>Acesse <em>"Criativos & Mídia"</em>.</li>
    <li>Configure o título, subtítulo e visual dos 6 slides do carrossel.</li>
    <li>Escreva o texto principal e verifique o contador de caracteres e densidade de palavras.</li>
    <li>Clique em <em>"Re-auditar OCR"</em> para rodar o modelo de visão computacional:
      <ul>
        <li>Verificação de contraste WCAG (Classificação AAA/AA).</li>
        <li>Regra de densidade de texto inferior a 20% da área útil da imagem.</li>
        <li>Detecção visual da hashtag obrigatória de compliance #publi.</li>
      </ul>
    </li>
  </ol>

  <h2>Módulo 8: Métricas & Metas (KPI Performance Matrix)</h2>
  <p><strong>Objetivo:</strong> Estabelecer metas mínimas aceitáveis de ROAS, CAC, CTR e acompanhar o pacing financeiro diário.</p>
  <ol>
    <li>Acesse <em>"Métricas & Metas"</em>.</li>
    <li>Defina as metas da campanha atual (ex: ROAS mínimo de 3.5x, CAC máximo de R$ 65,00).</li>
    <li>Acompanhe a barra de progresso em tempo real e o pacing do orçamento investido contra o prazo restante da campanha.</li>
  </ol>

  <h2>Módulo 9: Central de Integrações</h2>
  <p><strong>Objetivo:</strong> Sincronizar dados com Meta Ads API, TikTok Ads, Google Analytics 4, Shopify e Webhooks.</p>
  <ol>
    <li>Acesse <em>"Integrações"</em>.</li>
    <li>Visualize os conectores ativos (Meta Graph API v19, TikTok Marketing API, GA4 Measurement Protocol e Shopify REST Admin).</li>
    <li>Configure Webhooks para envio de eventos em tempo real para seu CRM (HubSpot, RD Station ou Salesforce).</li>
  </ol>

  <h2>Módulo 10: Academy & Demonstração Interativa</h2>
  <p><strong>Objetivo:</strong> Treinar novos operadores da equipe, apresentar a ferramenta para clientes e realizar tours interativos guiados.</p>
  <ol>
    <li>Acesse <em>"Academy & Demo"</em>.</li>
    <li>Clique em <em>"Iniciar Demonstração Interativa"</em> para abrir a navegação guiada passo a passo em 5 etapas com diagnósticos simulados em tempo real.</li>
    <li>Utilize o botão <em>"Baixar Manual Oficial em Word"</em> para disponibilizar cópias físicas ou editáveis deste documento.</li>
    <li>Utilize <em>"Agendar Sessão VIP"</em> para agendar atendimento executivo individual.</li>
  </ol>

  <!-- ANÁLISE DE MERCADO E PLANOS COMERCIAIS -->
  <h1>3. Análise de Mercado & Estrutura de Precificação Comercial</h1>
  
  <h2>Panorama Competitivo Global e Nacional</h2>
  <p>
    O mercado global de Marketing de Influência ultrapassou <strong>US$ 24 bilhões</strong> em 2024 e mantém taxa composta de crescimento anual (CAGR) de mais de 25%. No Brasil e na América Latina, o país lidera em consumo de redes sociais e compras influenciadas por criadores digitais.
  </p>
  <p>No entanto, as ferramentas existentes no mercado sofrem de limitações graves:</p>
  <ul>
    <li><strong>Traackr / Grin (EUA):</strong> Preços proibitivos em dólar (US$ 2.000 a US$ 5.000/mês), sem suporte à legislação CONAR brasileira e sem automações autônomas de pausa de orçamento.</li>
    <li><strong>Influency.me / Squid (Brasil):</strong> Focadas em agenciamento ou catálogos manuais de criadores, exigindo dezenas de planilhas e sem motor de IA para predição de ROI antes da campanha.</li>
    <li><strong>HypeAuditor:</strong> Excelente em detecção de fraude, porém ausente em esteira criativa OCR, geração de briefings em IA e guardrails de campanhas.</li>
  </ul>

  <div class='callout'>
    <strong>O Oceano Azul do InfluenciMax Pro:</strong>
    O InfluenciMax Pro AI é o primeiro a combinar <em>Auditoria Antifraude + Predição Estatística de ROI + Visão Computacional OCR + Guardrails Autônomos de Verba 24/7</em> em uma única suíte SaaS unificada.
  </div>

  <h2>Modelos de Precificação Sugeridos para Comercialização</h2>
  <table>
    <tr>
      <th>Plano Comercial</th>
      <th>Valor de Assinatura</th>
      <th>Público Alvo</th>
      <th>Recursos Inclusos</th>
    </tr>
    <tr>
      <td><strong>Growth AI</strong></td>
      <td><strong>R$ 1.490 / mês</strong><br>(ou R$ 14.300 / ano)</td>
      <td>Startups, e-commerces em tração e marcas D2C</td>
      <td>
        • Até 3 campanhas ativas simultâneas<br>
        • Auditoria antifraude de até 50 criadores/mês<br>
        • Simulador de ROI preditivo padrão<br>
        • 2 Guardrails autônomos de orçamento<br>
        • 3 usuários inclusos
      </td>
    </tr>
    <tr>
      <td><strong>Scale Pro</strong><br><em>(Mais Vendido)</em></td>
      <td><strong>R$ 3.890 / mês</strong><br>(ou R$ 37.300 / ano)</td>
      <td>Agências de performance, médias empresas e marcas digitais</td>
      <td>
        • Campanhas ilimitadas<br>
        • Auditoria de até 300 criadores/mês<br>
        • Estúdio Criativo com Visão Computacional OCR<br>
        • Geração ilimitada de Briefings com IA & Compliance<br>
        • Todas as 4 regras de automação autônoma 24/7<br>
        • 10 usuários inclusos + Suporte prioritário
      </td>
    </tr>
    <tr>
      <td><strong>Enterprise Custom</strong></td>
      <td><strong>A partir de R$ 8.900 / mês</strong><br>+ 3% a 5% sobre ad spend</td>
      <td>Grandes corporações, holdings e multinacionais</td>
      <td>
        • Auditoria ilimitada de criadores com API dedicada<br>
        • Modelos neurais customizados com dados proprietários da marca<br>
        • Integração via Webhook privado e Single Sign-On (SSO)<br>
        • Gerente de Sucesso de Conta dedicado (CSM sênior)<br>
        • SLA garantido de 99.9% e contratos customizados
      </td>
    </tr>
  </table>

  <h3>Modelo Híbrido Recomendado (SaaS + Sucesso de Mídia)</h3>
  <p>
    Para maximizar a receita recorrente (ARR) e alinhar incentivos com grandes anunciantes, adote o modelo <strong>SaaS Base + Take Rate de 3% a 5%</strong> sobre o montante de verba gerenciada que ultrapassar R$ 100.000/mês. Isso permite escalar a receita sem elevar o custo operacional da plataforma.
  </p>

  <!-- SUPORTE E SEGURANÇA -->
  <h1>4. Diretrizes de Segurança, Privacidade & Suporte</h1>
  <p>
    O InfluenciMax Pro foi concebido respeitando as normas da Lei Geral de Proteção de Dados (LGPD) e diretrizes internacionais de privacidade da Meta, TikTok e Google. Nenhuma credencial de criador ou dado sensível de cartão é armazenado em texto plano.
  </p>
  <div class='callout-warning'>
    <strong>Recomendações para Treinamento de Equipe:</strong>
    Recomenda-se que todo novo analista de marketing passe pelo tour interativo na aba <em>"Academy & Demo"</em> antes de lançar campanhas com verba superior a R$ 10.000.
  </div>

  <div class='footer-note'>
    Documento emitido por <strong>InfluenciMax Pro AI Systems</strong> | Todos os direitos reservados.<br>
    Para suporte corporativo ou agendamento de homologação, utilize o canal de agendamento na plataforma.
  </div>

</body>
</html>`;

    const blob = new Blob(['\ufeff', wordContent], {
      type: 'application/msword;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'InfluenciMax_Pro_Manual_Oficial.doc';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    onNotification?.('📄 Download do Manual Oficial em Word (.doc) iniciado com sucesso!');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingModalOpen(false);
      onNotification?.('Demonstração agendada com sucesso! Um especialista sênior entrará em contato.');
    }, 1800);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 font-mono">
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-indigo-400" /> Centro de Treinamento & Onboarding
              </span>
              <span className="text-xs text-[#666666] font-mono">Guia de Escala 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              InfluenciMax Academy & Demonstração Interativa
            </h1>
            <p className="text-xs sm:text-sm text-[#888888] mt-2 font-mono leading-relaxed">
              Aprenda a operar o sistema operacional preditivo de influenciadores, simular ROAS de campanhas e ativar guardrails autônomos para escalar com previsibilidade.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleDownloadWordDoc}
              className="px-4 py-3 bg-[#131313] hover:bg-[#1A1A1A] text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 hover:border-indigo-500/60 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all group"
              title="Baixar Manual Passo a Passo Completo em Formato Word (.doc)"
            >
              <Download className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>Baixar Manual Word (.doc)</span>
            </button>
            <button
              onClick={() => {
                setDemoStep(0);
                setIsDemoOpen(true);
              }}
              className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Iniciar Demonstração Interativa</span>
            </button>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-3 bg-[#111111] hover:bg-[#181818] text-[#E0E0E0] border border-[#222222] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Agendar Sessão VIP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Interactive Demo Card + Full Detailed Tutorial */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Product Tour Launcher (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-5 text-indigo-400">
                <Play className="w-7 h-7 fill-indigo-400 ml-1 cursor-pointer hover:scale-110 transition-transform" onClick={() => setIsDemoOpen(true)} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Demonstração Guiada Passo a Passo</h2>
              <p className="text-xs text-[#888888] font-mono leading-relaxed mb-6">
                Faça o tour interativo de 5 etapas para ver em tempo real como o InfluenciMax AI reduz o CAC em 40% e elimina fraudes de influenciadores.
              </p>

              <div className="space-y-3">
                {demoTourSteps.map((s, idx) => (
                  <div
                    key={s.stepNumber}
                    onClick={() => {
                      setDemoStep(idx);
                      setIsDemoOpen(true);
                    }}
                    className="p-3 bg-[#111111] hover:bg-[#181818] border border-[#222222] hover:border-indigo-500/40 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs flex items-center justify-center font-bold">
                        {s.stepNumber}
                      </span>
                      <span className="text-xs font-semibold text-white">{s.title.split('.')[1] || s.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#666666]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#1F1F1F]">
              <button
                onClick={() => setIsDemoOpen(true)}
                className="w-full py-3 bg-[#111111] hover:bg-[#181818] border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>Abrir Tour Completo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Value Highlights Box */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Diferenciais de Nível Empresarial
            </h3>
            <div className="space-y-2 text-xs font-mono text-[#888888]">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Zero planilhas manuais de acompanhamento</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Auditoria antifraude de seguidores via IA</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Automação autônoma de orçamento e ROI</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Conformidade com normas CONAR e Meta Ads</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Comprehensive Tutorial (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Manual Completo de Operação</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadWordDoc}
                  className="px-3 py-1.5 bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                  title="Baixar Manual Passo a Passo em Word (.doc)"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Baixar em Word (.doc)</span>
                </button>
                <span className="text-[11px] font-mono text-[#666666]">5 Módulos Práticos</span>
              </div>
            </div>
            <p className="text-xs text-[#888888] font-mono mb-6">
              Siga cada etapa para extrair o ROI máximo do sistema. Clique em qualquer módulo para expandir os procedimentos:
            </p>

            <div className="space-y-3">
              {tutorialSections.map((sec) => {
                const isOpen = activeAccordion === sec.id;
                return (
                  <div
                    key={sec.id}
                    className={`border rounded-xl transition-all ${
                      isOpen ? 'bg-[#111111] border-indigo-500/40 shadow-md' : 'bg-[#0E0E0E] border-[#222222]'
                    }`}
                  >
                    <button
                      onClick={() => setActiveAccordion(isOpen ? null : sec.id)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-indigo-400' : 'bg-[#444444]'}`}></span>
                        {sec.title}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-[#888888] transition-transform ${isOpen ? 'rotate-90 text-indigo-400' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#1F1F1F] text-xs text-[#AAAAAA] space-y-2">
                        {sec.content.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-[#1A1A1A] text-indigo-300 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tour Modal */}
      {isDemoOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-[#222222] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsDemoOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tour Step Indicator */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
                {demoTourSteps[demoStep].badge}
              </span>
              <span className="text-xs font-mono text-[#666666]">
                Passo {demoStep + 1} de {demoTourSteps.length}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {demoTourSteps[demoStep].title}
            </h3>
            <p className="text-sm text-indigo-300 font-medium mb-4">
              {demoTourSteps[demoStep].headline}
            </p>
            <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed mb-6">
              {demoTourSteps[demoStep].desc}
            </p>

            {/* Live Simulated Preview Box */}
            <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-4 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666] block mb-2">
                Diagnóstico em Tempo Real do Módulo:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-[#111111] p-3 rounded-xl border border-[#1F1F1F]">
                  <span className="text-xs font-mono font-bold text-white block">
                    {demoTourSteps[demoStep].preview.metric1}
                  </span>
                </div>
                <div className="bg-[#111111] p-3 rounded-xl border border-[#1F1F1F]">
                  <span className="text-xs font-mono font-bold text-emerald-400 block">
                    {demoTourSteps[demoStep].preview.metric2}
                  </span>
                </div>
                <div className="bg-[#111111] p-3 rounded-xl border border-[#1F1F1F]">
                  <span className="text-xs font-mono font-bold text-cyan-400 block">
                    {demoTourSteps[demoStep].preview.metric3}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#222222]">
              <button
                onClick={() => {
                  if (onNavigateToTab) {
                    onNavigateToTab(demoTourSteps[demoStep].tabId);
                  }
                  setIsDemoOpen(false);
                }}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
              >
                <span>{demoTourSteps[demoStep].actionLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                {demoStep > 0 && (
                  <button
                    onClick={() => setDemoStep(demoStep - 1)}
                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#CCCCCC] rounded-xl text-xs font-semibold"
                  >
                    Anterior
                  </button>
                )}
                <button
                  onClick={() => {
                    if (demoStep < demoTourSteps.length - 1) {
                      setDemoStep(demoStep + 1);
                    } else {
                      setIsDemoOpen(false);
                      onNotification?.('Tour finalizado com sucesso! Explore os módulos live.');
                    }
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
                >
                  <span>{demoStep < demoTourSteps.length - 1 ? 'Próximo Passo' : 'Concluir Tour'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#222222] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-5 right-5 text-[#666666] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Agendar Demonstração Privada</h3>
                <p className="text-xs text-[#888888] font-mono">Sessão exclusiva de diagnóstico para o seu negócio.</p>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Agendamento Solicitado!</h4>
                <p className="text-xs text-[#888888] font-mono max-w-xs mx-auto">
                  Entraremos em contato em até 2 horas úteis pelo WhatsApp e e-mail informado.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[#888888] font-mono block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Eduardo"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[#888888] font-mono block mb-1">E-mail Corporativo</label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@suaempresa.com.br"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[#888888] font-mono block mb-1">Nome da Empresa / SaaS</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: NextScale Corp"
                    value={bookingCompany}
                    onChange={(e) => setBookingCompany(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[#888888] font-mono block mb-1">Orçamento Mensal Estimado de Mídia</label>
                  <select
                    value={bookingBudget}
                    onChange={(e) => setBookingBudget(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="R$ 10.000 a R$ 20.000/mês">R$ 10.000 a R$ 20.000/mês</option>
                    <option value="R$ 20.000 a R$ 50.000/mês">R$ 20.000 a R$ 50.000/mês</option>
                    <option value="R$ 50.000 a R$ 150.000/mês">R$ 50.000 a R$ 150.000/mês</option>
                    <option value="Acima de R$ 150.000/mês">Acima de R$ 150.000/mês (Enterprise)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Confirmar Agendamento de Demonstração
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
