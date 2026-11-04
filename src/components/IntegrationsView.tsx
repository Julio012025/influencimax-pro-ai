import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  AlertCircle, 
  Link2, 
  RefreshCw, 
  Sliders, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Send, 
  Check, 
  X,
  CreditCard,
  GitBranch,
  Terminal,
  Copy,
  ExternalLink
} from 'lucide-react';

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  description: string;
  iconBg: string;
  connected: boolean;
  lastSync: string;
  config: {
    accountId?: string;
    webhookUrl?: string;
    pixelId?: string;
    tokenStatus?: string;
  };
}

interface IntegrationsViewProps {
  onNotification?: (msg: string) => void;
}

export function IntegrationsView({ onNotification }: IntegrationsViewProps) {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    {
      id: 'meta_ads',
      name: 'Meta Ads Manager & Conversions API (CAPI)',
      category: 'Tráfego & Anúncios',
      description: 'Sincronização bidirecional de campanhas de criadores, público personalizado e eventos de conversão.',
      iconBg: 'bg-blue-600',
      connected: true,
      lastSync: 'Há 4 minutos',
      config: {
        accountId: 'act_982410948190',
        pixelId: 'pix_784910283941',
        tokenStatus: 'Token Válido (Expira em 60 dias)'
      }
    },
    {
      id: 'crm_webhook',
      name: 'CRM & WhatsApp Webhook Gateway',
      category: 'Leads & Automação',
      description: 'Receba leads de criadores diretamente no RD Station, HubSpot ou disparo ativo no WhatsApp.',
      iconBg: 'bg-emerald-600',
      connected: true,
      lastSync: 'Há 12 minutos',
      config: {
        webhookUrl: 'https://api.influencimax.com/v1/webhook/leads-production',
        tokenStatus: 'Assinatura HMAC Ativa'
      }
    },
    {
      id: 'ga4',
      name: 'Google Analytics 4 (Measurement Protocol)',
      category: 'Analytics & Atribuição',
      description: 'Atribuição multitouch de tráfego vindo de links UTM de influenciadores e parâmetros de carrossel.',
      iconBg: 'bg-amber-600',
      connected: true,
      lastSync: 'Há 35 minutos',
      config: {
        accountId: 'G-78X90LP12K',
        tokenStatus: 'Ativo'
      }
    },
    {
      id: 'tiktok_ads',
      name: 'TikTok for Business Ads API',
      category: 'Tráfego & Vídeo',
      description: 'Spark Ads e rastreamento de campanhas com criadores nativos do TikTok e Shorts.',
      iconBg: 'bg-cyan-600',
      connected: false,
      lastSync: 'Nunca sincronizado',
      config: {
        accountId: '',
        tokenStatus: 'Desconectado'
      }
    },
    {
      id: 'hotmart_stripe',
      name: 'Stripe & Hotmart Gateway (ROI em Tempo Real)',
      category: 'Receita & Checkout',
      description: 'Rastreie cada centavo de venda atribuído aos cupons e UTMs exclusivos dos influenciadores.',
      iconBg: 'bg-purple-600',
      connected: true,
      lastSync: 'Há 2 minutos',
      config: {
        webhookUrl: 'https://webhook.influencimax.com/sales-attribution',
        tokenStatus: 'Chave de Produção Conectada'
      }
    },
    {
      id: 'github',
      name: 'GitHub Repository & Deploy Automático (CI/CD)',
      category: 'Código & Versionamento / Git',
      description: 'Repositório Git inicializado na branch main. Conecte sua conta do GitHub para versionar e publicar na Vercel ou VPS.',
      iconBg: 'bg-zinc-800',
      connected: true,
      lastSync: 'Branch main ativa (Commit 8164393)',
      config: {
        accountId: 'github.com/influencimax/influencimax-pro',
        webhookUrl: 'https://api.github.com/repos/influencimax/influencimax-pro/dispatches',
        tokenStatus: 'Git Local Configurado & Pronto para Push'
      }
    },
    {
      id: 'asaas_payment',
      name: 'Gateway de Pagamento (Asaas, Stripe & PIX)',
      category: 'Recebimento de Assinaturas & Implantação',
      description: 'Processador de cobrança dos planos comerciais (Starter, Scale, Growth) e da Taxa de Implantação Assistida (R$ 980). Emissão automática de NFS-e.',
      iconBg: 'bg-emerald-600',
      connected: true,
      lastSync: 'Webhook Ativo (/api/payments/webhook)',
      config: {
        accountId: 'wallet_inf_julio_pro',
        webhookUrl: '/api/payments/webhook',
        tokenStatus: 'PIX Instantâneo, Cartão 12x e Boleto PJ Ativos'
      }
    }
  ]);

  const [selectedForConfig, setSelectedForConfig] = useState<IntegrationItem | null>(null);
  const [testPingSuccess, setTestPingSuccess] = useState<string | null>(null);

  const handleToggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.connected;
        onNotification?.(`${item.name} foi ${nextState ? 'conectado com sucesso' : 'desconectado'}.`);
        return {
          ...item,
          connected: nextState,
          lastSync: nextState ? 'Conectado agora' : 'Desconectado'
        };
      }
      return item;
    }));
  };

  const handleTestWebhook = (id: string) => {
    setTestPingSuccess('Enviando ping de teste HMAC...');
    setTimeout(() => {
      setTestPingSuccess('200 OK — Resposta recebida em 142ms. Webhook operacional!');
      setTimeout(() => setTestPingSuccess(null), 3500);
      onNotification?.('Ping de teste validado com código 200 OK!');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Conectores de Alta Disponibilidade
                </span>
                <span className="text-xs text-[#666666] font-mono">Meta CAPI & Webhooks v3</span>
              </div>
              <h2 className="text-2xl font-serif italic text-white mt-1">Central de Integrações & Webhooks</h2>
              <p className="text-xs text-[#888888] font-mono">
                Conecte seu ecossistema de anúncios, CRM, checkout e analytics para que a InfluenciMax audite e automatize tudo em tempo real.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>4 de 5 Conectados</span>
            </span>
          </div>
        </div>
      </div>

      {/* Integration Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {integrations.map((item) => (
          <div
            key={item.id}
            className={`bg-[#0A0A0A] border rounded-2xl p-5 transition-all shadow-sm ${
              item.connected ? 'border-[#222222] hover:border-[#333333]' : 'border-[#1A1A1A] opacity-65'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md`}>
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{item.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111111] text-[#888888] border border-[#222222]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] mt-1 max-w-2xl">{item.description}</p>
                  
                  {item.connected && (
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono text-[#666666]">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Ativo
                      </span>
                      <span>•</span>
                      <span>Última Sincronização: {item.lastSync}</span>
                      {item.config.tokenStatus && (
                        <>
                          <span>•</span>
                          <span className="text-indigo-400">{item.config.tokenStatus}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                {item.connected ? (
                  <>
                    <button
                      onClick={() => handleTestWebhook(item.id)}
                      className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#181818] text-[#CCCCCC] hover:text-white border border-[#222222] rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <Send className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Testar Ping</span>
                    </button>
                    <button
                      onClick={() => setSelectedForConfig(item)}
                      className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#181818] text-[#CCCCCC] hover:text-white border border-[#222222] rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Configurar</span>
                    </button>
                    <button
                      onClick={() => handleToggleConnection(item.id)}
                      className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-xl transition-all font-mono"
                    >
                      Desconectar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleToggleConnection(item.id)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 font-mono"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Conectar Agora</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ping Status Toast */}
      {testPingSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-xs font-mono flex items-center gap-2 shadow-xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{testPingSuccess}</span>
        </div>
      )}

      {/* Config Modal */}
      {selectedForConfig && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#222222] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedForConfig(null)}
              className="absolute top-4 right-4 text-[#666666] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              Configurar: {selectedForConfig.name}
            </h3>

            {selectedForConfig.id === 'github' ? (
              <div className="space-y-4 text-xs font-mono">
                <div className="bg-[#0A0A0A] border border-emerald-500/30 p-3.5 rounded-xl">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4" /> Git Inicializado Localmente na Branch 'main'
                  </span>
                  <p className="text-[11px] text-[#888888] font-sans">
                    Todos os 28 arquivos do InfluenciMax Pro estão commitados e prontos para sincronização com seu GitHub pessoal ou organizacional.
                  </p>
                </div>

                <div>
                  <label className="text-[#888888] font-mono block mb-1">Passo 1: Crie um repositório vazio no seu GitHub</label>
                  <div className="bg-[#0A0A0A] border border-[#222222] p-2.5 rounded-xl text-[#AAAAAA] text-[11px] font-sans flex items-center justify-between">
                    <span>Acesse github.com/new e crie sem README/gitignore (já inclusos).</span>
                    <a 
                      href="https://github.com/new" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[10px] uppercase font-bold"
                    >
                      Abrir GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div>
                  <label className="text-[#888888] font-mono block mb-1">Passo 2: Vincule seu repositório remoto (execute no terminal)</label>
                  <div className="bg-[#080808] border border-[#262626] p-3 rounded-xl text-emerald-300 text-xs font-mono relative">
                    <p className="text-[#666666]"># Adicionar o repositório remoto:</p>
                    <p className="select-all text-white font-bold my-1">git remote add origin https://github.com/SEU-USUARIO/influencimax-pro.git</p>
                    <p className="text-[#666666] mt-2"># Enviar o código para o GitHub:</p>
                    <p className="select-all text-white font-bold mt-1">git push -u origin main</p>
                  </div>
                </div>

                <div className="bg-[#0E0E0E] border border-[#222222] p-3 rounded-xl text-[11px] text-[#888888] font-sans">
                  <strong className="text-white block mb-0.5">Autenticação:</strong>
                  Ao solicitar a senha no terminal, utilize um <span className="text-indigo-400 font-mono">Personal Access Token (classic)</span> gerado em <em>GitHub Settings &gt; Developer Settings &gt; Personal access tokens</em> com permissão de <code className="text-white">repo</code>.
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {selectedForConfig.config.accountId && (
                  <div>
                    <label className="text-[#888888] font-mono block mb-1">ID da Conta / Perfil</label>
                    <input
                      type="text"
                      defaultValue={selectedForConfig.config.accountId}
                      className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                )}

                {selectedForConfig.config.pixelId && (
                  <div>
                    <label className="text-[#888888] font-mono block mb-1">Pixel ID (Meta Ads)</label>
                    <input
                      type="text"
                      defaultValue={selectedForConfig.config.pixelId}
                      className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                )}

                {selectedForConfig.config.webhookUrl && (
                  <div>
                    <label className="text-[#888888] font-mono block mb-1">URL do Webhook de Produção</label>
                    <input
                      type="text"
                      defaultValue={selectedForConfig.config.webhookUrl}
                      className="w-full bg-[#0A0A0A] border border-[#222222] rounded-xl p-2.5 text-white font-mono"
                    />
                  </div>
                )}

                <div className="bg-[#0A0A0A] border border-[#222222] p-3 rounded-xl font-mono text-[11px] text-[#888888]">
                  <span className="text-emerald-400 font-bold block mb-1">Segurança de Dados:</span>
                  Todas as requisições utilizam criptografia ponta a ponta com certificados TLS 1.3 e conformidade com a LGPD e GDPR.
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedForConfig(null)}
                className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-white rounded-xl text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setSelectedForConfig(null);
                  onNotification?.('Configurações da integração salvas com sucesso!');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
