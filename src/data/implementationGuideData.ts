/**
 * DOCUMENTO OFICIAL DE IMPLANTAÇÃO PASSO A PASSO
 * SISTEMA: InfluenciMax Pro AI - Executive Engine
 * 
 * Este arquivo contém o conteúdo na íntegra para download em Markdown (.md),
 * visualização na interface e exportação formatada para impressão/PDF.
 */

export const IMPLEMENTATION_GUIDE_MARKDOWN = `# DOCUMENTO OFICIAL DE IMPLANTAÇÃO PASSO A PASSO: INFLUNCIMAX PRO AI
**Plataforma Preditiva & Automação Autônoma de Campanhas com Influenciadores**  
*Versão do Sistema: 2026.4 (Executive Enterprise) | Idioma: Português (Brasil)*  
*Classificação: Manual Técnico & Operacional de Implantação e Onboarding Completo*

---

## SUMÁRIO EXECUTIVO

O **InfluenciMax Pro AI** é um sistema operacional completo (Influencer Marketing OS) desenhado para marcas diretas ao consumidor (D2C), grandes agências e anunciantes de alta performance. Diferente de plataformas legadas que funcionam apenas como diretórios estáticos, o InfluenciMax Pro AI opera com:
1. **Auditoria Neural Antifraude**: Varredura de seguidores fantasmas, pods de engajamento e verificação de autenticidade prévia.
2. **Simulador Preditivo de ROI**: Algoritmo preditivo de alcance, conversão, CAC esperado e retorno sobre investimento antes de despender 1 real.
3. **Estúdio de Automação & Guardrails 24/7**: Regras autônomas que pausam campanhas, notificam criadores ou barram pagamentos caso métricas caiam ou regras do CONAR sejam desrespeitadas.
4. **Gerador de Briefings Jurídicos e Compliance**: Geração instantânea de contratos, briefings técnicos e termos de compliance em conformidade com o CONAR e LGPD.
5. **Infraestrutura de Monetização e Gateways**: Suporte nativo a cobranças e repasses via Asaas (PIX / Boleto / Cartão) e Stripe.

Este manual guiará você **botão a botão** por cada módulo do sistema e apresentará um **caso prático real de implantação do zero**, deixando a sua conta 100% pronta e operando em produção.

---

# PARTE I: GUIA DE IMPLANTAÇÃO BOTÃO A BOTÃO (TELA POR TELA)

### ETAPA 0: CABEÇALHO GLOBAL & STATUS DO SISTEMA
No topo de qualquer tela do InfluenciMax Pro, localize os seguintes controles:
- **Barra de Telemetria Superior**: Exibe o status da \`ENGINE IA PREDITIVO ATIVO\`, índice de \`Auditoria Autêntica\` (ex: 98.2%) e \`Automações Ativas\` em tempo real.
- **Botão [Receber Pagamentos]** (ícone de Cartão, borda âmbar): Abre o assistente de parametrização de Gateways (Asaas e Stripe) para gerenciar recebimento de planos e repasses para influenciadores.
- **Botão [Página de Vendas]** (ícone de Globo): Alterna para a Landing Page de alta conversão para comercialização de assinaturas e planos do InfluenciMax.
- **Botão [Kit Redes Sociais & Vídeo]** (ícone de Compartilhar, gradiente rosa/roxo): Abre o pacote completo de imagens HD geradas, textos comerciais para Instagram, LinkedIn, TikTok e roteiro de gravação de vídeo curto.
- **Botão [Despesas IA vs Ganho]** (ícone de Moeda, cor esmeralda): Abre a calculadora de Unit Economics do seu SaaS para monitorar custo de tokens da IA vs LTV/Margem por cliente.
- **Botão [Planos & Licenças]** (gradiente roxo/índigo): Exibe a tabela de planos comerciais (Starter, Growth, Scale Pro, Enterprise) e ativa o Checkout.
- **Botão [Copilot IA]** (ícone de Robô, canto direito): Abre a gaveta lateral do assistente de inteligência artificial para tirar dúvidas e solicitar análises em linguagem natural a qualquer momento.

---

### ETAPA 1: CONFIGURAÇÃO DE RECEBIMENTOS & GATEWAY (MODAL DE GATEWAYS)
Antes de rodar campanhas comerciais ou cobrar assinaturas de clientes, configure seu gateway financeiro:
1. Clique no botão **[Receber Pagamentos]** no topo da tela.
2. Na aba **"Gateways Disponíveis"**:
   - Para o Brasil (PIX instantâneo e Cartão nacional), clique em **[Selecionar Asaas]** (Recomendado).
   - Para vendas internacionais ou multinacionais, clique em **[Selecionar Stripe]**.
3. Preencha os campos:
   - **Ambiente**: Escolha a chave seletora \`[Sandbox / Testes]\` para simulação ou \`[Produção Real]\` para faturamento ativo.
   - **Chave de API (API Key / Token)**: Cole sua chave obtida no painel do Asaas ou Stripe.
   - **Chave Secreta do Webhook**: Cole a assinatura secreta para recepção de notificações de pagamento aprovado.
   - **Chave PIX da Conta**: Insira sua chave (CNPJ ou Chave Aleatória).
4. Em **Métodos Habilitados**: Marque as caixas de seleção:
   - ☑ **PIX com Liquidação Instantânea (QR Code dinâmico + Copia e Cola)**
   - ☑ **Cartão de Crédito com Antifraude Integrado**
   - ☑ **Boleto Bancário Registrado com Baixa Automática**
5. Em **Controle de Implantação e Setup**:
   - Defina o valor da **Taxa de Setup / Onboarding** (Ex: R$ 1.500,00 ou R$ 3.000,00).
   - Marque \`Cobrança obrigatória no primeiro ciclo\`.
6. Clique no botão **[Salvar Credenciais & Ativar Gateway]**.
7. Clique no botão de teste **[Simular Disparo de Webhook de Teste]** para validar se o sistema processa eventos de pagamento aprovado em milissegundos.

---

### ETAPA 2: NAVEGAÇÃO & RADAR ANTIFRAUDE (ABA: CRIADORES & FRAUDE)
Objetivo: Auditar a base de influenciadores e blindar o orçamento de seguidores comprados.
1. No menu principal, clique na aba **[Criadores & Fraude]**.
2. **Barra de Busca e Filtros Rápidos**:
   - No campo de busca, digite o nome de um criador (ex: *Bianca Andrade*, *Casimiro*, *Whindersson*, *Camila Coelho*).
   - No seletor de Nicho, filtre por: \`Moda & Beleza\`, \`Tech & Games\`, \`Finanças & Negócios\`, \`Fitness & Saúde\`, \`Gastronomia\`, etc.
   - No seletor de Tier, selecione: \`Nano (10k-50k)\`, \`Micro (50k-200k)\`, \`Mid-tier (200k-1M)\` ou \`Mega/Celebridade (1M+)\`.
3. **Card do Criador**:
   - Observe o **Score de Autenticidade**: Criadores com taxa acima de 90% recebem o selo verde \`Autêntico\`.
   - Observe o **Alerta de Anomalia**: Se houver suspeita de robôs ou picos de engajamento falso em horários estranhos, o card exibe uma tarja vermelha \`Anomalia Detectada\`.
4. **Botões de Ação no Card**:
   - Clique em **[Auditar Perfil Detalhado]**: Exibe o raio-x demográfico (idade, gênero, cidades principais de seguidores e percentual de bots).
   - Clique em **[Exportar Dossiê de Auditoria]**: Gera relatório de compliance do influenciador para envio à diretoria da marca.
   - Clique em **[Simular com Este Criador]**: Direciona o criador automaticamente para o simulador preditivo de ROI.

---

### ETAPA 3: SIMULADOR PREDITIVO DE ROI (ABA: SIMULADOR DE ROI)
Objetivo: Prever alcance real, conversões em vendas e margem antes de assinar contratos.
1. No menu principal, clique na aba **[Simulador de ROI]**.
2. **Painel de Parâmetros de Entrada (Coluna Esquerda)**:
   - **Nome da Campanha**: Digite o título comercial (ex: *Lançamento Sérum Glow 2026*).
   - **Marca / Anunciante**: Digite o nome da marca (ex: *Lumina Cosméticos*).
   - **Orçamento Total Previsto (R$)**: Ajuste a barra deslizante ou digite o valor (ex: \`R$ 45.000,00\`).
   - **Ticket Médio do Produto Vendido (R$)**: Insira o preço de venda do item no e-commerce (ex: \`R$ 189,00\`).
   - **Taxa de Conversão Esperada da Landing Page (%)**: Preencha com sua média de mercado (ex: \`2.8%\`).
   - **Seleção de Mix de Criadores**: Marque as caixas dos criadores auditados que farão parte da rodada.
3. **Execução do Modelo Preditivo**:
   - Clique no botão **[Executar Simulação Preditiva Neural]** (ou ajuste os sliders para recalcular dinamicamente).
4. **Interpretação dos Resultados (Coluna Direita)**:
   - **Alcance Líquido Preditivo**: Volume de pessoas únicas que visualizarão o criativo (já descontando sobreposição de audiência).
   - **Estimativa de Conversões**: Número exato de pedidos previstos gerados pelos links rastreados / cupons.
   - **Receita Bruta Projetada (GMV)**: Valor financeiro esperado de faturamento.
   - **ROI / ROAS Estimado**: Multiplicador de retorno (ex: \`3.7x\`).
   - **CAC Preditivo**: Custo de aquisição de cliente estimado em comparação ao CAC médio de Meta Ads e Google Ads.
5. **Conversão da Simulação em Campanha Operacional**:
   - Clique no botão de ação primária **[🚀 Lançar Campanha com Monitoramento Autônomo]**.
   - O sistema criará o registro oficial no Dashboard e ativará os robôs de vigilância.

---

### ETAPA 4: ESTÚDIO DE AUTOMAÇÃO & GUARDRAILS 24/7 (ABA: ESTÚDIO DE AUTOMAÇÃO)
Objetivo: Proteger o investimento contra atrasos de criadores, métricas estagnadas e crises de imagem.
1. No menu principal, clique na aba **[Estúdio de Automação]**.
2. **Painel de Guardrails Ativos**:
   - Cada card representa uma regra autônoma (Ex: *Trava de Segurança de Visualizações*, *Vigilância de Comentários Tóxicos*, *Gatilho de Bonificação por Performance*).
   - Use o botão interruptor **[Toggle Ativar/Desativar]** ao lado de cada regra para ligar ou desligar instantaneamente.
3. **Criação de uma Nova Regra Autônoma**:
   - Clique no botão superior direito **[+ Nova Regra Autônoma]**.
   - **Campo: Nome da Regra**: Digite um nome claro (ex: \`Congelar Pagamento se Stories não bater 15k views em 8h\`).
   - **Campo: Tipo de Monitoramento**:
     - \`Métricas de Performance\` (Views, Cliques, Salvos)
     - \`Segurança de Marca / Sentimento\` (Comentários negativos, cancelamento)
     - \`Compliance CONAR\` (Falta de hashtag #publi, atraso na publicação)
   - **Campo: Condição / Gatilho (Trigger)**:
     - Selecione: \`Taxa de visualização < 30% da meta após 6 horas de publicação\`
   - **Campo: Ação Imediata Executada pela IA**:
     - Selecione: \`Pausar repasse financeiro no Asaas + Notificar Criador via WhatsApp + Alerta no Slack da Marca\`
   - Clique no botão **[Salvar e Ativar Guardrail]**.

---

### ETAPA 5: GERADOR DE BRIEFING & COMPLIANCE CONAR (ABA: GERADOR DE BRIEFING)
Objetivo: Gerar briefings à prova de erros jurídicos e em total conformidade com as normas brasileiras.
1. No menu principal, clique na aba **[Gerador de Briefing & Compliance]**.
2. **Formulário de Configuração do Criativo**:
   - **Objetivo do Conteúdo**: Escolha \`Conversão Direta com Cupom\`, \`Awareness / Reconhecimento\` ou \`Educação de Produto\`.
   - **Plataformas Selecionadas**: Marque Instagram (Reels + Stories), TikTok ou YouTube Shorts.
   - **Mensagens Obrigatórias (Key Message)**: Insira os benefícios principais que o criador precisa citar.
   - **O que NÃO Fazer (No-Gos)**: Exemplo: Não usar filtros que alterem o resultado real da pele, não fazer alegações medicinais falsas.
3. **Geração por Inteligência Artificial**:
   - Clique no botão **[Gerar Briefing Executivo com IA]**.
   - A IA sintetizará:
     - Roteiro estruturado segundo o framework Hook -> Problema -> Solução -> Prova -> Chamada para Ação (CTA).
     - Cláusula de Identificação Publicitária obrigatória do **CONAR** (\`#publi\` visível nos primeiros 3 segundos, áudio claro declarando patrocínio).
     - Cláusula de Cessão de Direitos de Imagem e Autorização de Uso em Dark Posts (Tráfego Pago).
4. **Exportação**:
   - Clique em **[Copiar Briefing para Área de Transferência]** ou **[Exportar em PDF / Word para Envio]**.

---

### ETAPA 6: AUDIÊNCIA, CRIATIVOS & MÉTRICAS (ABAS COMPLEMENTARES)
1. **Aba [Audiência & Segmentação]**:
   - Analise o mapa de calor de retenção dos Stories e a sobreposição de seguidores entre os influenciadores escolhidos para não pagar duas vezes pela mesma pessoa.
2. **Aba [Criativos & Mídia]**:
   - Realize o upload do vídeo ou imagem entregue pelo criador.
   - O motor de visão computacional analisa o criativo e prevê se o gancho inicial prenderá a atenção além dos 3 primeiros segundos.
3. **Aba [Métricas & Metas]**:
   - Acompanhe o funil consolidado: Impressões -> Cliques no Link -> Visitas à Loja -> Checkout Iniciado -> Vendas Concluídas -> ROAS Real vs Projetado.

---

# PARTE II: CASO PRÁTICO REAL DE IMPLANTAÇÃO
### "Do Zero à Campanha no Ar com Tudo Configurado"

Para ilustrar a implantação na prática, acompanhe a configuração passo a passo da marca fictícia **Lumina Cosméticos Brasil** (marca de D2C de cosméticos e dermocosméticos).

### 1. DADOS DE ENTRADA DO CLIENTE
- **Nome da Empresa**: Lumina Cosméticos Brasil Ltda.
- **Nicho**: Beleza, Skincare e Cuidados Pessoais.
- **Campanha**: "Operação Pele Iluminada - Lançamento Sérum Niacinamida 15%".
- **Orçamento Total**: R$ 45.000,00.
- **Produto**: Sérum Niacinamida 30ml com Preço de Venda = R$ 149,90.
- **Meta Comercial**: 1.100 pedidos faturados (R$ 164.890,00 em GMV) gerando ROAS de no mínimo 3.5x.

---

### 2. EXECUÇÃO PASSO A PASSO NA PLATAFORMA

#### PASSO 1: CONFIGURAÇÃO DO GATEWAY DE PAGAMENTO (ASAAS)
1. O Diretor de Marketing clica no botão **[Receber Pagamentos]** no topo do InfluenciMax Pro.
2. Seleciona o **Asaas** como provedor financeiro da conta.
3. Insere a Chave de API de Produção do Asaas da Lumina Cosméticos.
4. Cadastra a Chave PIX CNPJ da Lumina (\`12.345.678/0001-90\`).
5. Ativa as opções:
   - PIX com Liquidação Imediata.
   - Cartão de Crédito em até 6x sem juros no checkout.
   - Regra de split de comissão automática: 10% de comissão direta para influenciadores sobre pedidos aprovados com o cupom de cada um.
6. Clica em **[Salvar Credenciais & Ativar Gateway]**. Status exibido: \`Conectado (Produção)\`.

#### PASSO 2: AUDITORIA ANTIFRAUDE E SELEÇÃO DO TRIO DE CRIADORES
1. O gestor navega até a aba **[Criadores & Fraude]**.
2. Filtra pelo nicho \`Moda & Beleza\`.
3. Analisa 4 criadores pré-selecionados:
   - **Criador A (Mega)**: Taxa de autenticidade de 97.4%, engajamento orgânico consistente. **[APROVADO]**.
   - **Criador B (Mid-tier - Especialista em Dermocosméticos)**: Taxa de 98.6%, alto poder de recomendação técnica. **[APROVADO]**.
   - **Criador C (Nano/Micro)**: Taxa de 99.1%, comunidade hiper-engajada no TikTok. **[APROVADO]**.
   - **Criador D (Candidato Avaliado)**: O InfluenciMax disparou a tarja vermelha \`Anomalia: 43% de seguidores provenientes de fazendas de cliques fora do Brasil\`. **[REJEITADO PELA IA]**.
4. Clica em **[Exportar Dossiê de Auditoria]** para arquivar a validação de conformidade dos 3 criadores aprovados.

#### PASSO 3: MODELAGEM MATEMÁTICA NO SIMULADOR DE ROI
1. O gestor clica na aba **[Simulador de ROI]**.
2. Preenche os parâmetros da Lumina Cosméticos:
   - *Nome da Campanha*: \`Lumina - Pele Iluminada Q3\`
   - *Budget*: \`R$ 45.000,00\`
   - *Ticket Médio*: \`R$ 149,90\`
   - *Taxa de Conversão*: \`3.1%\` (baseada no histórico da loja Shopify da marca)
3. Seleciona os 3 criadores aprovados no mix.
4. A IA sintetiza a projeção estatística de Monte Carlo:
   - **Alcance Líquido Preditivo**: 1.340.000 pessoas únicas.
   - **Cliques Qualificados no Link**: 41.540 visitas.
   - **Pedidos Projetados**: 1.287 unidades.
   - **GMV Estimado**: R$ 192.921,30.
   - **ROI / ROAS Estimado**: **4.28x**.
   - **CAC Preditivo**: R$ 34,96 (contra R$ 62,00 do Meta Ads da empresa).
5. O gestor clica no botão **[🚀 Lançar Campanha com Monitoramento Autônomo]**. A campanha é criada no sistema instantaneamente.

#### PASSO 4: CONFIGURAÇÃO DOS GUARDRAILS DE PROTEÇÃO 24/7
1. O gestor clica na aba **[Estúdio de Automação]**.
2. Verifica e liga 3 regras essenciais com um clique no botão **[Toggle]**:
   - **Regra 1: "Trava de Segurança de Visualizações Mínimas"**: Se o vídeo de Stories do criador não atingir ao menos 20.000 visualizações nas primeiras 6 horas após publicação, a IA envia um alerta ao criador sugerindo repostagem com sticker de interação.
   - **Regra 2: "Monitor de Sentimento & Crise de Marca"**: Se a taxa de comentários negativos ou com menções de alergia/irritação passar de 4%, a IA congela imediatamente o impulsionamento de tráfego pago daquele criador e abre um chamado no Slack do SAC.
   - **Regra 3: "Guilhotina CONAR de #Publi"**: A visão computacional do InfluenciMax verifica o frame do vídeo publicado; se a legenda ou tela não contiver a tag publicitária legível, o criador é notificado para correção em até 15 minutos para evitar processos no CONAR.

#### PASSO 5: GERAÇÃO DO BRIEFING E TERMOS CONAR
1. O gestor clica na aba **[Gerador de Briefing & Compliance]**.
2. Insere os pontos centrais: *"Proibido prometer cura para acne grave; uso obrigatório da tag #publi no início do vídeo; foco na textura leve e controle de oleosidade"*.
3. Clica em **[Gerar Briefing Executivo com IA]**.
4. O documento é gerado contendo o script do roteiro, diretrizes de filmagem na luz natural e o termo de autorização de imagem para anúncios.
5. Clica em **[Copiar Briefing]** e envia diretamente para o agente dos influenciadores.

#### PASSO 6: ACOMPANHAMENTO EM TEMPO REAL NO PAINEL
1. Com a campanha no ar, o gestor acompanha o **[Painel Preditivo]**:
   - O velocímetro de Alcance Real vs Preditivo demonstra **+7.4% acima da estimativa**.
   - O gráfico de conversões diárias contabiliza os pedidos aprovados diretamente integrados ao webhook de pagamento.
   - A margem líquida e o ROAS real são recalculados a cada minuto sem necessidade de planilhas manuais.

---

# PARTE III: CHECKLIST DE GO-LIVE (ENTREGA TÉCNICA)

Antes de considerar a implantação finalizada, certifique-se de preencher esta lista de checagem:

- [x] **Gateway Financeiro Configurado**: Chaves de API Asaas/Stripe salvas e webhook de teste validado com status 200 OK.
- [x] **Política de Repasses Definida**: Regras de pagamento por entrega (fixo) ou percentual de vendas (afiliado) parametrizadas.
- [x] **Auditoria Antifraude Concluída**: Nenhum criador contratado possui menos de 85% de autenticidade no radar neural.
- [x] **Simulação de ROI Aprovada**: Projeção de ROAS superior ao CAC de referência da marca.
- [x] **Guardrails 24/7 Ativados**: Pelo menos 2 automações de contingência e segurança de marca habilitadas.
- [x] **Briefing com Validação CONAR**: Roteiro aprovado contendo identificação de publicidade explícita.
- [x] **Equipe Capacitada**: Gestores e assessores treinados no uso do Copilot IA para consultas operacionais rápidas.

---

### INFORMAÇÕES DE SUPORTE & EXPANSÃO
- **Suporte Técnico**: suporte@influencimax.ai
- **Base de Conhecimento**: Disponível na aba **[Academy & Demo]** dentro da plataforma.
- **Ambiente Oficial**: InfluenciMax Pro AI (Executive Engine 2026).
`;

export interface GuideSection {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  steps: {
    stepNumber: string;
    actionTitle: string;
    buttonLabel: string;
    screenTab: string;
    instructions: string[];
    proTip?: string;
  }[];
}

export const GUIDE_STRUCTURED_SECTIONS: GuideSection[] = [
  {
    id: 'setup-gateway',
    title: '1. Configuração Financeira & Gateway de Pagamentos',
    iconName: 'CreditCard',
    summary: 'Configuração do Asaas (PIX instantâneo/Cartão) e Stripe para receber assinaturas e automatizar repasses a criadores.',
    steps: [
      {
        stepNumber: '1.1',
        actionTitle: 'Acessar Central de Recebimentos',
        buttonLabel: '[Receber Pagamentos] (Topo da Tela)',
        screenTab: 'Cabeçalho Global',
        instructions: [
          'Clique no botão de borda âmbar no cabeçalho superior.',
          'O modal "Configuração de Gateway de Pagamento & Cobrança" será exibido.',
          'Escolha entre o provedor Asaas (Brasil / PIX) ou Stripe (Internacional).'
        ],
        proTip: 'Para o mercado nacional, o Asaas oferece conciliação automática de PIX e menores taxas por transação.'
      },
      {
        stepNumber: '1.2',
        actionTitle: 'Parametrizar Chaves de API e Webhook',
        buttonLabel: '[Salvar Credenciais & Ativar Gateway]',
        screenTab: 'Modal de Gateway',
        instructions: [
          'Insira sua Chave de API de Produção do Asaas ou Stripe.',
          'Informe a chave secreta do Webhook para receber confirmações instantâneas de pagamento.',
          'Cadastre sua Chave PIX (CNPJ ou E-mail) para liquidação imediata dos fundos.',
          'Marque as opções de pagamento ativas: PIX, Cartão de Crédito e Boleto Bancário.'
        ],
        proTip: 'Sempre realize um teste utilizando o botão "[Simular Disparo de Webhook de Teste]" antes de rodar campanhas reais.'
      }
    ]
  },
  {
    id: 'fraud-audit',
    title: '2. Auditoria de Criadores & Detecção de Fraude',
    iconName: 'ShieldCheck',
    summary: 'Inspeção profunda de perfis para eliminar bots, seguidores comprados e engajamento artificial.',
    steps: [
      {
        stepNumber: '2.1',
        actionTitle: 'Filtrar Base por Nicho e Tier',
        buttonLabel: '[Filtro por Nicho] e [Seletor de Tier]',
        screenTab: 'Aba: Criadores & Fraude',
        instructions: [
          'Acesse a aba "Criadores & Fraude" no menu horizontal.',
          'Utilize a caixa de busca para encontrar o perfil desejado ou filtre por categorias (Beleza, Tech, Finanças, etc.).',
          'Analise o selo de Autenticidade (valores acima de 90% indicam público real e engajado).'
        ]
      },
      {
        stepNumber: '2.2',
        actionTitle: 'Auditar Perfil e Exportar Dossiê',
        buttonLabel: '[Auditar Perfil Detalhado] e [Exportar Dossiê]',
        screenTab: 'Aba: Criadores & Fraude',
        instructions: [
          'Clique em "[Auditar Perfil Detalhado]" no card do influenciador.',
          'Examine a quebra de audiência por localização geográfica e percentual de contas suspeitas.',
          'Clique em "[Exportar Dossiê de Auditoria]" para baixar o relatório de compliance daquele criador.'
        ],
        proTip: 'Descarte criadores com mais de 15% de anomalia ou picos inexplicáveis de seguidores em finais de semana.'
      }
    ]
  },
  {
    id: 'roi-simulation',
    title: '3. Simulador Preditivo de ROI & Lançamento',
    iconName: 'Sparkles',
    summary: 'Cálculo estatístico de alcance real, receita projetada e conversão antes de investir.',
    steps: [
      {
        stepNumber: '3.1',
        actionTitle: 'Definir Parâmetros Comerciais da Campanha',
        buttonLabel: '[Executar Simulação Preditiva Neural]',
        screenTab: 'Aba: Simulador de ROI',
        instructions: [
          'Acesse a aba "Simulador de ROI".',
          'Defina o Orçamento Total (ex: R$ 45.000,00), Ticket Médio (ex: R$ 149,90) e Taxa de Conversão estimada (ex: 3.1%).',
          'Marque os criadores auditados que integrarão a campanha.',
          'Analise as métricas calculadas em tempo real: Alcance Líquido, Vendas Projetadas, GMV e ROAS.'
        ]
      },
      {
        stepNumber: '3.2',
        actionTitle: 'Lançar Campanha com Monitoramento 24/7',
        buttonLabel: '[🚀 Lançar Campanha com Monitoramento Autônomo]',
        screenTab: 'Aba: Simulador de ROI',
        instructions: [
          'Revise a projeção de ROAS e CAC.',
          'Clique no botão principal de lançamento.',
          'A campanha será registrada no Dashboard com rastreamento autônomo ativado.'
        ]
      }
    ]
  },
  {
    id: 'automations-studio',
    title: '4. Estúdio de Automações & Guardrails 24/7',
    iconName: 'Zap',
    summary: 'Configuração de robôs autônomos para pausar campanhas, barrar pagamentos ou emitir alertas de crise.',
    steps: [
      {
        stepNumber: '4.1',
        actionTitle: 'Ativar Regras Prontas de Proteção',
        buttonLabel: '[Toggle Liga/Desliga] em cada Card',
        screenTab: 'Aba: Estúdio de Automação',
        instructions: [
          'Acesse a aba "Estúdio de Automação".',
          'Ative a regra "Trava de Segurança de Visualizações Mínimas".',
          'Ative a regra "Vigilância de Comentários Tóxicos e Cancelamento".',
          'Ative a regra "Guilhotina CONAR de #Publi".'
        ]
      },
      {
        stepNumber: '4.2',
        actionTitle: 'Criar Regra Personalizada',
        buttonLabel: '[+ Nova Regra Autônoma]',
        screenTab: 'Aba: Estúdio de Automação',
        instructions: [
          'Clique no botão superior direito.',
          'Defina o Gatilho (Trigger): ex: "Se engajamento cair abaixo de 2% nas primeiras 4 horas".',
          'Defina a Ação (Action): ex: "Suspender repasse no Asaas e disparar mensagem WhatsApp para a agência".',
          'Clique em "[Salvar e Ativar Guardrail]".'
        ]
      }
    ]
  },
  {
    id: 'briefing-compliance',
    title: '5. Gerador de Briefing & Compliance CONAR',
    iconName: 'FileText',
    summary: 'Criação de briefings comerciais com proteção jurídica e regras explícitas do CONAR e LGPD.',
    steps: [
      {
        stepNumber: '5.1',
        actionTitle: 'Gerar Roteiro Estruturado por IA',
        buttonLabel: '[Gerar Briefing Executivo com IA]',
        screenTab: 'Aba: Gerador de Briefing & Compliance',
        instructions: [
          'Preencha o objetivo de conteúdo, canais (Reels, TikTok, Stories) e mensagens-chave.',
          'Informe os "No-Gos" (o que o criador está expressamente proibido de citar).',
          'Clique no botão de geração e receba o roteiro com Hook de 3 segundos, Prova Social e CTA.'
        ]
      },
      {
        stepNumber: '5.2',
        actionTitle: 'Validar Cláusulas e Exportar',
        buttonLabel: '[Copiar Briefing] e [Exportar em PDF / Word]',
        screenTab: 'Aba: Gerador de Briefing & Compliance',
        instructions: [
          'Verifique as cláusulas obrigatórias de identificação publicitária (#publi visível).',
          'Exporte o documento oficial pronto para assinatura e envio ao influenciador.'
        ]
      }
    ]
  }
];

export const PRACTICAL_CASE_STUDY = {
  brand: 'Lumina Cosméticos Brasil Ltda',
  segment: 'D2C Skincare & Cosméticos Naturais',
  campaignName: 'Operação Pele Iluminada - Lançamento Sérum Niacinamida 15%',
  budget: 'R$ 45.000,00',
  productPrice: 'R$ 149,90',
  targetGoal: '1.100 pedidos faturados | GMV R$ 164.890,00 | ROAS mín 3.5x',
  actualProjectedROAS: '4.28x',
  creatorsSelected: [
    { name: 'Bianca Andrade (Boca Rosa)', role: 'Mega Influencer (Topo de Funil / Desejo)', authenticity: '97.4%' },
    { name: 'Dra. Luiza Martins', role: 'Dermatologista & Mid-tier (Autoridade Técnica)', authenticity: '98.6%' },
    { name: 'Clara Resenhas Skincare', role: 'Nano Influencer (Prova Social & Comunidade)', authenticity: '99.1%' }
  ],
  resultsSummary: [
    'Alcance Líquido Preditivo: 1.340.000 pessoas únicas',
    'Cliques Qualificados Rastreados: 41.540 acessos à loja virtual',
    'Pedidos Convertidos: 1.287 vendas aprovadas',
    'Faturamento Bruto (GMV): R$ 192.921,30',
    'ROAS Efetivo: 4.28x (Retorno de R$ 4,28 para cada R$ 1,00 investido)',
    'CAC Preditivo Obtido: R$ 34,96 (43% mais econômico que Meta Ads)'
  ]
};
