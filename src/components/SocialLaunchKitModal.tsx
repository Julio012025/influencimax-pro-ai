import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Instagram, 
  Linkedin, 
  Video, 
  Facebook, 
  Download, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Camera, 
  Volume2, 
  Flame, 
  ExternalLink,
  Share2,
  Hash,
  Eye,
  Sliders,
  ShieldAlert,
  TrendingUp,
  FileText
} from 'lucide-react';

interface SocialLaunchKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotification?: (msg: string) => void;
}

export const SocialLaunchKitModal: React.FC<SocialLaunchKitModalProps> = ({
  isOpen,
  onClose,
  onNotification
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'instagram' | 'linkedin' | 'tiktok' | 'facebook' | 'videoPlan'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Teleprompter / Video recording state
  const [isPlayingTimer, setIsPlayingTimer] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isPlayingTimer) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => {
          if (prev >= 60) {
            setIsPlayingTimer(false);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingTimer]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (onNotification) {
      onNotification(`📋 ${label} copiado para a área de transferência!`);
    }
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const images = [
    {
      title: 'Post Feed & Carrossel (1:1)',
      ratio: '1:1 Quadrado',
      purpose: 'Instagram Feed, Carrossel de Auditoria & Facebook Post',
      path: '/src/assets/images/social_instagram_feed_1793667659473.jpg',
      badge: 'Instagram & Facebook Feed',
      desc: 'Dashboard analítico futurista mostrando 98.2% de autenticidade, radar antifraude de seguidores falsos e predição de ROI de 3.8x.'
    },
    {
      title: 'Stories, Reels & TikTok (9:16)',
      ratio: '9:16 Vertical',
      purpose: 'Instagram Stories, Reels, TikTok & Shorts',
      path: '/src/assets/images/social_stories_reels_1793667661042.jpg',
      badge: 'TikTok, Reels & Stories',
      desc: 'Mockup vertical de smartphone com alerta de robôs bloqueados, curva de crescimento verde neon e ROI disparando de 1.2x para 4.1x.'
    },
    {
      title: 'Banner Executivo B2B (16:9)',
      ratio: '16:9 Widescreen',
      purpose: 'LinkedIn Feed, Artigos, Twitter/X & Facebook Ads',
      path: '/src/assets/images/social_linkedin_b2b_1793667660242.jpg',
      badge: 'LinkedIn & Corporativo',
      desc: 'Executiva analisando o ecossistema InfluenciMax Pro em escritório corporativo moderno com vista panorâmica noturna.'
    }
  ];

  // Copy Content per Platform
  const instagramCopy = `🚨 PARE de queimar verba contratando influenciador no escuro!

Você sabia que mais de 38% do investimento em influenciadores no Brasil é engolido por SEGUIDORES FANTASMAS, métricas de vaidade e engajamento comprado? 📉💸

Se você ainda contrata criador olhando só número de seguidores e prints de mídia kit… sua marca está jogando dinheiro na lata de lixo.

Chegou o 𝐈𝐧𝐟𝐥𝐮𝐞𝐧𝐜𝐢𝐌𝐚𝐱 𝐏𝐫𝐨 𝐀𝐈 — o primeiro Sistema Operacional Preditivo de Marketing de Influência do Brasil:

⚡ 𝗔𝘂𝗱𝗶𝘁𝗼𝗿𝗶𝗮 𝗔𝗻𝘁𝗶𝗳𝗿𝗮𝘂𝗱𝗲 𝗲𝗺 𝗦𝗲𝗴𝘂𝗻𝗱𝗼𝘀: Identifica robôs, pods de engajamento e contas inativas com 98.2% de precisão neural.
⚡ 𝗦𝗶𝗺𝘂𝗹𝗮𝗱𝗼𝗿 𝗱𝗲 𝗥𝗢𝗜 𝗣𝗿𝗲𝗱𝗶𝘁𝗶𝘃𝗼: Saiba exatamente a estimativa de retorno em vendas e faturamento ANTES de fechar o contrato.
⚡ 𝗚𝘂𝗮𝗿𝗱𝗿𝗮𝗶𝗹𝘀 𝗲 𝗔𝘂𝘁𝗼𝗺𝗮çã𝗼 𝟮𝟰/𝟳: Regras autônomas que pausão pagamentos ou disparam alertas caso o criador não atinja as metas contratuais.
⚡ 𝗖𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝗖𝗢𝗡𝗔𝗥 𝗔𝘂𝘁𝗼𝗺á𝘁𝗶𝗰𝗼: Análise prévia de legendas e briefings para blindar sua empresa de multas e processos.

Chega de "achar" que vai dar certo. Tome decisões baseadas em ciência de dados e algoritmos preditivos.

👉 Quer ver uma auditoria ao vivo da sua marca ou criadores favoritos?
Comente "AUDITORIA" ou clique no link da bio para testar agora!

#marketingdeinfluencia #influencermarketing #inteligenciagenerativa #gestaodecampanha #growthmarketing #roi #metricasdemarketing #ecommercebrasil #negociosdigitais`;

  const instagramHashtags = `#marketingdeinfluencia #influencermarketing #influenciador #criadoresdeconteudo #marketingdigital #inteligenciaartificial #ia #martech #growthmarketing #roimarketing #vendasonline #ecommercebrasil #gestaodecampanhas #midiasdigitais #antifraude #negociosdigitais #socialmediamarketing #agenciadepublicidade #cmo #marketingbrasil #estrategiadigital #vendasb2b #inovacaomarketing #influencimaxpro #influencimax`;

  const linkedinCopy = `38% do orçamento de Marketing de Influência no Brasil é desperdiçado em métricas de vaidade. 

Como CMO ou Diretor de Growth, quanto da sua verba este mês foi para criadores que entregaram apenas comentários genéricos de robôs?

Durante anos, o mercado de Creator Economy operou na base de:
1. Mídia kits em PDF desatualizados;
2. Prints manipuláveis de alcance;
3. Decisões tomadas com base em intuição e simpatia;
4. Falta total de previsibilidade de retorno sobre o investimento (ROI).

Esse modelo acabou.

Apresentamos o InfluenciMax Pro AI — o Sistema Operacional Preditivo que transforma contratação de influenciadores em uma ciência exata orientada a resultados comerciais:

🔹 Motor Preditivo de ROI: Projeta alcance qualificado, taxa de conversão e receita esperada antes do desembolso financeiro.
🔹 Auditoria de Fraude & Qualidade de Audiência: Varredura de anomalias em tempo real que mapeia robôs, contas compradas e engajamento inautêntico.
🔹 Automações Autônomas & Guardrails 24/7: Disparo de gatilhos automáticos caso um influenciador não atinja os milestones de entrega acordados.
🔹 Conformidade CONAR & Jurídica: Algoritmo de compliance regulatório que revisa roteiros e briefings antes da postagem.

Grandes marcas não apostam. Elas calculam.

Se a sua equipe de marketing ou agência quer auditar os criadores da sua próxima campanha com inteligência artificial, acesse a demonstração no link abaixo ou envie uma mensagem direta.

#InfluencerMarketing #GrowthMarketing #CMO #MarketingROI #MarTech #InteligenciaArtificial #MarketingDigital #DataDrivenMarketing`;

  const linkedinHashtags = `#InfluencerMarketing #GrowthMarketing #CMO #ChiefMarketingOfficer #MarTech #DataDriven #MarketingROI #InteligenciaArtificial #CreatorEconomy #PerformanceMarketing`;

  const tiktokCopy = `POV: Você acabou de descobrir que pagou R$ 10.000 para uma influenciadora cheia de robô árabe e chinês 🤡💀

Não passe essa vergonha na sua empresa!

Testando o InfluenciMax Pro AI: a inteligência artificial que audita o perfil do criador em 3 segundos, mostra a porcentagem real de robôs e calcula quanto você vai lucrar na campanha antes de assinar contrato 🧠💸

Link na bio para testar grátis! 🚀

#marketingdigital #dicasdeia #inteligenciaartificial #influenciador #hackdemarketing #empreendedorismo #lojavirtual #drophippingbrasil #vendasonline #marketingdeinfluencia`;

  const tiktokHashtags = `#marketingdigital #dicasdeia #inteligenciaartificial #influenciador #hackdemarketing #empreendedorismo #ecommercebrasil #negocios #vendas #fy #foryou #viralbrasil`;

  const facebookCopy = `Atenção donos de e-commerce, agências e empresários: 
Você ainda contrata influenciadores olhando número de seguidores?

Então você precisa saber disso:
Mais de 30% das contas com mais de 100k seguidores no Brasil possuem audiência inativa ou robôs comprados. Quando você paga por uma publi, seu anúncio não aparece para clientes reais, mas sim para fazendas de cliques.

Com o InfluenciMax Pro AI, você blinda seu investimento:
✅ Auditoria Completa: Saiba a porcentagem exata de audiência autêntica de qualquer influenciador do Brasil.
✅ Simulador de Vendas: Calcule o Retorno Esperado (ROI) antes de transferir qualquer centavo.
✅ Automações que Protegem seu Bolso: O sistema monitora a campanha e avisa caso haja quebra de contrato ou baixo desempenho.

Não jogue dinheiro fora. Profissionalize suas campanhas de influenciadores hoje mesmo.

👉 Clique no botão abaixo para conhecer a plataforma e simular sua próxima campanha!`;

  const facebookHashtags = `#marketingdeinfluencia #ecommercebrasil #vendas #marketingdigital #empresarios #gestaodetrafego #anuncios #roi #influencimax`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#09090B] border border-[#27272A] rounded-2xl shadow-2xl text-white my-6 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1F1F23] bg-gradient-to-r from-[#0C0D14] via-[#09090B] to-[#120E1C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center">
                <Share2 className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Kit de Lançamento em Redes Sociais
                  <span className="text-[10px] bg-gradient-to-r from-pink-500 to-purple-500 text-white font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Pronto para Postar
                  </span>
                </h2>
              </div>
              <p className="text-xs text-[#888888]">
                Imagens de alta resolução, textos persuasivos, hashtags estratégicas e roteiro de gravação de vídeo curto.
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg transition-colors border border-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1F1F23] bg-[#0E0E11] px-5 overflow-x-auto no-scrollbar gap-1 pt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-white bg-[#18181B]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>Imagens & Criativos (3 Formatos)</span>
          </button>

          <button
            onClick={() => setActiveTab('instagram')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'instagram'
                ? 'border-pink-500 text-white bg-[#18181B]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Instagram (Feed & Carrossel)</span>
          </button>

          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'linkedin'
                ? 'border-blue-500 text-white bg-[#18181B]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn (B2B Executivo)</span>
          </button>

          <button
            onClick={() => setActiveTab('tiktok')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'tiktok'
                ? 'border-cyan-400 text-white bg-[#18181B]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <Flame className="w-4 h-4 text-cyan-400" />
            <span>TikTok & Reels (Viral)</span>
          </button>

          <button
            onClick={() => setActiveTab('facebook')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'facebook'
                ? 'border-indigo-400 text-white bg-[#18181B]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <Facebook className="w-4 h-4 text-indigo-400" />
            <span>Facebook (Direct Response)</span>
          </button>

          <button
            onClick={() => setActiveTab('videoPlan')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'videoPlan'
                ? 'border-emerald-400 text-white bg-[#18181B]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
            }`}
          >
            <Video className="w-4 h-4 text-emerald-400" />
            <span className="flex items-center gap-1.5">
              Roteiro de Vídeo Curto (60s)
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* TAB 1: OVERVIEW / IMAGES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-black p-4 rounded-xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    3 Imagens de Campanha Geradas com Alta Resolução
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Essas imagens foram concebidas com base na identidade visual escura premium do InfluenciMax Pro AI (cyber-luxury, dados neurais e métricas reais).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                    ✓ Prontas para Publicação
                  </span>
                </div>
              </div>

              {/* Grid of Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {images.map((img, idx) => (
                  <div key={idx} className="bg-[#121216] border border-[#27272A] rounded-xl overflow-hidden flex flex-col group hover:border-indigo-500/50 transition-all shadow-xl">
                    <div className="relative overflow-hidden bg-black flex items-center justify-center aspect-square md:aspect-auto md:h-64">
                      <img 
                        src={img.path} 
                        alt={img.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-500/30">
                          {img.ratio}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-indigo-600/90 backdrop-blur-md text-[10px] font-sans font-semibold text-white px-2.5 py-1 rounded-md">
                          {img.badge}
                        </span>
                      </div>
                      <a 
                        href={img.path} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-semibold text-white backdrop-blur-[2px]"
                      >
                        <ExternalLink className="w-4 h-4" /> Ver em Tela Cheia
                      </a>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-sm text-white">{img.title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 line-clamp-3 leading-relaxed">
                          {img.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500">{img.purpose}</span>
                        <a
                          href={img.path}
                          download={`influencimax_${idx + 1}.jpg`}
                          className="px-2.5 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg flex items-center gap-1.5 border border-zinc-700 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Baixar</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action shortcuts */}
              <div className="p-4 rounded-xl bg-[#121216] border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-zinc-400">
                  💡 <strong>Dica Pro:</strong> Navegue pelas abas acima para copiar a legenda completa de cada rede com um único clique.
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('instagram')}
                    className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 border border-pink-500/30 font-medium transition-colors"
                  >
                    Ver Textos Instagram
                  </button>
                  <button
                    onClick={() => setActiveTab('videoPlan')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 font-medium transition-colors"
                  >
                    Ver Roteiro de Vídeo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTAGRAM */}
          {activeTab === 'instagram' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-pink-400" />
                    Copywriting para Instagram (Feed & Carrossel)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Otimizado com gancho de retenção, quebra de objeções, prova social e chamada para direct/link da bio.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(instagramCopy, 'ig_copy', 'Texto do Instagram')}
                    className="px-3.5 py-2 text-xs font-bold rounded-lg bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-2 shadow-lg shadow-pink-600/20 transition-colors"
                  >
                    {copiedKey === 'ig_copy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedKey === 'ig_copy' ? 'Copiado!' : 'Copiar Legenda Completa'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual preview */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-[#121216] p-3 rounded-xl border border-zinc-800">
                    <span className="text-[11px] font-mono text-zinc-400 mb-2 block font-semibold">Imagem Recomendada (1:1):</span>
                    <img 
                      src="/src/assets/images/social_instagram_feed_1793667659473.jpg" 
                      alt="Post Feed" 
                      className="w-full rounded-lg object-cover aspect-square border border-zinc-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-3 flex justify-between items-center text-[11px]">
                      <span className="text-zinc-400">Formato: 1080 x 1080px</span>
                      <a 
                        href="/src/assets/images/social_instagram_feed_1793667659473.jpg" 
                        download="instagram_feed_influencimax.jpg"
                        className="text-pink-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Download className="w-3.5 h-3.5" /> Baixar
                      </a>
                    </div>
                  </div>

                  {/* Hashtags box */}
                  <div className="bg-[#121216] p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Hash className="w-4 h-4 text-pink-400" /> 25 Hashtags Selecionadas
                      </span>
                      <button
                        onClick={() => handleCopy(instagramHashtags, 'ig_tags', 'Hashtags Instagram')}
                        className="text-[11px] font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-1"
                      >
                        {copiedKey === 'ig_tags' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copiar Tags</span>
                      </button>
                    </div>
                    <div className="p-2.5 bg-black/60 rounded-lg text-[11px] font-mono text-zinc-300 leading-relaxed border border-zinc-800/80">
                      {instagramHashtags}
                    </div>
                  </div>
                </div>

                {/* Text editor box */}
                <div className="lg:col-span-2 bg-[#121216] p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
                        Texto da Legenda
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        ~1.250 caracteres • Alta Conversão
                      </span>
                    </div>

                    <pre className="font-sans text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed p-4 bg-black/50 rounded-xl border border-zinc-800/80 max-h-[380px] overflow-y-auto font-normal">
                      {instagramCopy}
                    </pre>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">
                      📌 Sugestão de fixação: Fixe o primeiro comentário com o link do seu site.
                    </span>
                    <button
                      onClick={() => handleCopy(instagramCopy, 'ig_copy_bot', 'Texto do Instagram')}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-2 shadow-sm transition-colors"
                    >
                      {copiedKey === 'ig_copy_bot' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>Copiar Legenda</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LINKEDIN */}
          {activeTab === 'linkedin' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-blue-400" />
                    Copywriting para LinkedIn (B2B / Liderança de Mercado)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Linguagem executiva focada em CMOs, Diretores de Marketing, Founders de E-commerce e Agências de Publicidade.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(linkedinCopy, 'li_copy', 'Texto do LinkedIn')}
                    className="px-3.5 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-colors"
                  >
                    {copiedKey === 'li_copy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedKey === 'li_copy' ? 'Copiado!' : 'Copiar Artigo/Post LinkedIn'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-[#121216] p-3 rounded-xl border border-zinc-800">
                    <span className="text-[11px] font-mono text-zinc-400 mb-2 block font-semibold">Banner Recomendado (16:9):</span>
                    <img 
                      src="/src/assets/images/social_linkedin_b2b_1793667660242.jpg" 
                      alt="Banner B2B" 
                      className="w-full rounded-lg object-cover aspect-video border border-zinc-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-3 flex justify-between items-center text-[11px]">
                      <span className="text-zinc-400">Formato: 1920 x 1080px (Widescreen)</span>
                      <a 
                        href="/src/assets/images/social_linkedin_b2b_1793667660242.jpg" 
                        download="linkedin_b2b_influencimax.jpg"
                        className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Download className="w-3.5 h-3.5" /> Baixar
                      </a>
                    </div>
                  </div>

                  <div className="bg-[#121216] p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Hash className="w-4 h-4 text-blue-400" /> Tags Corporativas
                      </span>
                      <button
                        onClick={() => handleCopy(linkedinHashtags, 'li_tags', 'Hashtags LinkedIn')}
                        className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        {copiedKey === 'li_tags' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copiar Tags</span>
                      </button>
                    </div>
                    <div className="p-2.5 bg-black/60 rounded-lg text-[11px] font-mono text-zinc-300 leading-relaxed border border-zinc-800/80">
                      {linkedinHashtags}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#121216] p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
                        Texto do Post
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        Tom: Thought Leadership & Análise de ROI
                      </span>
                    </div>

                    <pre className="font-sans text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed p-4 bg-black/50 rounded-xl border border-zinc-800/80 max-h-[380px] overflow-y-auto font-normal">
                      {linkedinCopy}
                    </pre>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">
                      💼 Ideal para postar nas terças ou quintas-feiras entre 08h e 10h da manhã.
                    </span>
                    <button
                      onClick={() => handleCopy(linkedinCopy, 'li_copy_bot', 'Texto do LinkedIn')}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-sm transition-colors"
                    >
                      {copiedKey === 'li_copy_bot' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>Copiar Post</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TIKTOK & REELS */}
          {activeTab === 'tiktok' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-cyan-400" />
                    Copy & Tags para TikTok & Reels (Alto Engajamento)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Frase de impacto inicial para prender o scroll nos primeiros 2 segundos e hashtags de retenção orgânica.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(tiktokCopy, 'tt_copy', 'Texto TikTok')}
                    className="px-3.5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition-colors"
                  >
                    {copiedKey === 'tt_copy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedKey === 'tt_copy' ? 'Copiado!' : 'Copiar Texto TikTok'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-[#121216] p-3 rounded-xl border border-zinc-800">
                    <span className="text-[11px] font-mono text-zinc-400 mb-2 block font-semibold">Imagem / Capa Recomendada (9:16):</span>
                    <img 
                      src="/src/assets/images/social_stories_reels_1793667661042.jpg" 
                      alt="Stories e Reels" 
                      className="w-full rounded-lg object-cover aspect-[9/16] max-h-72 border border-zinc-800 mx-auto"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-3 flex justify-between items-center text-[11px]">
                      <span className="text-zinc-400">Formato: 1080 x 1920px (Vertical)</span>
                      <a 
                        href="/src/assets/images/social_stories_reels_1793667661042.jpg" 
                        download="tiktok_stories_influencimax.jpg"
                        className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Download className="w-3.5 h-3.5" /> Baixar
                      </a>
                    </div>
                  </div>

                  <div className="bg-[#121216] p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Hash className="w-4 h-4 text-cyan-400" /> Tags Virais TikTok
                      </span>
                      <button
                        onClick={() => handleCopy(tiktokHashtags, 'tt_tags', 'Hashtags TikTok')}
                        className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        {copiedKey === 'tt_tags' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copiar Tags</span>
                      </button>
                    </div>
                    <div className="p-2.5 bg-black/60 rounded-lg text-[11px] font-mono text-zinc-300 leading-relaxed border border-zinc-800/80">
                      {tiktokHashtags}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#121216] p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
                        Texto de Apoio / Legenda
                      </span>
                      <span className="text-[11px] text-cyan-400 font-mono">
                        🔥 Estilo POV / Curiosidade Rápida
                      </span>
                    </div>

                    <pre className="font-sans text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed p-4 bg-black/50 rounded-xl border border-zinc-800/80 max-h-[380px] overflow-y-auto font-normal">
                      {tiktokCopy}
                    </pre>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">
                      ⚡ Dica: Use um som em alta com volume em 5% no fundo do vídeo.
                    </span>
                    <button
                      onClick={() => handleCopy(tiktokCopy, 'tt_copy_bot', 'Texto TikTok')}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2 shadow-sm transition-colors"
                    >
                      {copiedKey === 'tt_copy_bot' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>Copiar Legenda TikTok</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FACEBOOK */}
          {activeTab === 'facebook' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Facebook className="w-5 h-5 text-indigo-400" />
                    Copywriting para Facebook (Direct Response / Tráfego & Grupos)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Focado em proprietários de negócios locais, lojas online e donos de marcas procurando segurança antes de investir.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(facebookCopy, 'fb_copy', 'Texto Facebook')}
                    className="px-3.5 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-colors"
                  >
                    {copiedKey === 'fb_copy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedKey === 'fb_copy' ? 'Copiado!' : 'Copiar Post Facebook'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-[#121216] p-3 rounded-xl border border-zinc-800">
                    <span className="text-[11px] font-mono text-zinc-400 mb-2 block font-semibold">Imagem Recomendada:</span>
                    <img 
                      src="/src/assets/images/social_instagram_feed_1793667659473.jpg" 
                      alt="Facebook Feed" 
                      className="w-full rounded-lg object-cover aspect-square border border-zinc-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-3 flex justify-between items-center text-[11px]">
                      <span className="text-zinc-400">Formato: 1:1 Feed ou 16:9 Banner</span>
                    </div>
                  </div>

                  <div className="bg-[#121216] p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Hash className="w-4 h-4 text-indigo-400" /> Tags para Facebook
                      </span>
                      <button
                        onClick={() => handleCopy(facebookHashtags, 'fb_tags', 'Hashtags Facebook')}
                        className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        {copiedKey === 'fb_tags' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copiar Tags</span>
                      </button>
                    </div>
                    <div className="p-2.5 bg-black/60 rounded-lg text-[11px] font-mono text-zinc-300 leading-relaxed border border-zinc-800/80">
                      {facebookHashtags}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#121216] p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
                        Texto Completo do Post
                      </span>
                      <span className="text-[11px] text-indigo-400 font-mono">
                        🔥 Dor do Anunciante + Solução Imediata
                      </span>
                    </div>

                    <pre className="font-sans text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed p-4 bg-black/50 rounded-xl border border-zinc-800/80 max-h-[380px] overflow-y-auto font-normal">
                      {facebookCopy}
                    </pre>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">
                      🎯 Funciona com tráfego pago (Objetivo: Mensagens ou Cadastros).
                    </span>
                    <button
                      onClick={() => handleCopy(facebookCopy, 'fb_copy_bot', 'Texto Facebook')}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-sm transition-colors"
                    >
                      {copiedKey === 'fb_copy_bot' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>Copiar Post Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COMPLETE VIDEO RECORDING PLAN (60 SECONDS SCRIPT & TELEPROMPTER) */}
          {activeTab === 'videoPlan' && (
            <div className="space-y-6">
              
              {/* Teleprompter & Timer Bar */}
              <div className="bg-[#121216] p-4 rounded-xl border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      Plano de Gravação de Vídeo Curto (Reels / TikTok / Shorts)
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                        Duração Ideal: 60s
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Roteiro segundo a segundo com enquadramento de câmera, texto na tela e instruções de fala.
                    </p>
                  </div>
                </div>

                {/* Teleprompter Clock Control */}
                <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded-xl border border-zinc-800">
                  <span className="text-xs text-zinc-400 font-mono">Cronômetro:</span>
                  <span className={`text-lg font-mono font-bold ${secondsElapsed >= 55 ? 'text-red-400' : 'text-emerald-400'}`}>
                    00:{secondsElapsed < 10 ? `0${secondsElapsed}` : secondsElapsed} / 01:00
                  </span>
                  <button
                    onClick={() => setIsPlayingTimer(!isPlayingTimer)}
                    className="p-1.5 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
                    title={isPlayingTimer ? 'Pausar' : 'Iniciar Treino'}
                  >
                    {isPlayingTimer ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsPlayingTimer(false);
                      setSecondsElapsed(0);
                    }}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Reiniciar Cronômetro"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pre-recording Technical Guide */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#121216] p-3.5 rounded-xl border border-zinc-800">
                  <span className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs">
                    <Camera className="w-4 h-4 text-cyan-400" /> 1. Enquadramento & Luz
                  </span>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Câmera na altura dos olhos (plano médio do peito para cima). Luz frontal forte ou janela. Olhe direto para a lente, não para a tela.
                  </p>
                </div>

                <div className="bg-[#121216] p-3.5 rounded-xl border border-zinc-800">
                  <span className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs">
                    <Volume2 className="w-4 h-4 text-amber-400" /> 2. Áudio & Energia
                  </span>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Microfone lapela ou fone próximo à boca. Tom enérgico, direto e firme. Sem enrolação nos primeiros 3 segundos.
                  </p>
                </div>

                <div className="bg-[#121216] p-3.5 rounded-xl border border-zinc-800">
                  <span className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs">
                    <Sliders className="w-4 h-4 text-pink-400" /> 3. B-Roll & Edição
                  </span>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Grave a tela do app InfluenciMax Pro AI com o simulador de ROI funcionando e insira cortes dinâmicos a cada 3 a 5 segundos.
                  </p>
                </div>
              </div>

              {/* Second-by-Second Script Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Roteiro Segundo a Segundo (Script de Produção)
                </h4>

                {/* SCENE 1: 00s - 05s */}
                <div className={`p-4 rounded-xl border transition-all ${
                  secondsElapsed >= 0 && secondsElapsed <= 5 && isPlayingTimer 
                    ? 'border-emerald-400 bg-emerald-950/20 shadow-lg shadow-emerald-500/10' 
                    : 'border-zinc-800 bg-[#121216]'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        00:00 - 00:05
                      </span>
                      <span className="font-bold text-sm text-white">CENA 1: O GANCHO HIPNÓTICO (Quebra de Padrão)</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Câmera: Close Frontal Rápido</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-zinc-800/80">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                        O que você fala (Voz firme):
                      </span>
                      <p className="text-white italic bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 leading-relaxed font-sans">
                        "Se você ainda contrata influenciador olhando só número de seguidores... você está sendo ENGANADO e perdendo rios de dinheiro!"
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                        Ação & Texto na Tela (Overlays):
                      </span>
                      <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 text-zinc-300 space-y-1 text-[11px]">
                        <p>• <strong>Gesto:</strong> Aponte o dedo para a câmera ou mostre uma nota de dinheiro sendo rasgada/guardada.</p>
                        <p>• <strong>Texto na Tela:</strong> <span className="text-red-400 font-bold">"🚨 38% DO SEU DINHEIRO ESTÁ SENDO ROUBADO!"</span></p>
                        <p>• <strong>Efeito Sonoro:</strong> Som de sirene ou glitch digital rápido.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SCENE 2: 05s - 18s */}
                <div className={`p-4 rounded-xl border transition-all ${
                  secondsElapsed > 5 && secondsElapsed <= 18 && isPlayingTimer 
                    ? 'border-emerald-400 bg-emerald-950/20 shadow-lg shadow-emerald-500/10' 
                    : 'border-zinc-800 bg-[#121216]'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        00:05 - 00:18
                      </span>
                      <span className="font-bold text-sm text-white">CENA 2: A AGITAÇÃO DA DOR (O Escândalo dos Robôs)</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Câmera: Corta para tela dividida (Você + Celular)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-zinc-800/80">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                        O que você fala:
                      </span>
                      <p className="text-white italic bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 leading-relaxed font-sans">
                        "Mais de um terço dos perfis famosos compram robôs árabes e chineses pra inflar métrica. Você paga cinco mil reais achando que vai bombar de vender, e não cai uma mísera compra no seu WhatsApp!"
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                        Ação & Visual:
                      </span>
                      <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 text-zinc-300 space-y-1 text-[11px]">
                        <p>• <strong>Visual:</strong> Mostre na tela do celular um perfil com 1 milhão de seguidores e comentários repetidos de bots.</p>
                        <p>• <strong>Texto na Tela:</strong> <span className="text-amber-400 font-bold">"ROBÔS NÃO COMPRAM SEU PRODUTO! ❌"</span></p>
                        <p>• <strong>Transição:</strong> Zoom rápido no rosto quando falar "cinco mil reais".</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SCENE 3: 18s - 38s */}
                <div className={`p-4 rounded-xl border transition-all ${
                  secondsElapsed > 18 && secondsElapsed <= 38 && isPlayingTimer 
                    ? 'border-emerald-400 bg-emerald-950/20 shadow-lg shadow-emerald-500/10' 
                    : 'border-zinc-800 bg-[#121216]'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        00:18 - 00:38
                      </span>
                      <span className="font-bold text-sm text-white">CENA 3: A REVELAÇÃO DA SOLUÇÃO (InfluenciMax Pro AI)</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Câmera: Screencast gravando o app com cursor neon</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-zinc-800/80">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                        O que você fala:
                      </span>
                      <p className="text-white italic bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 leading-relaxed font-sans">
                        "É exatamente por isso que nós criamos o InfluenciMax Pro AI! Olha isso: eu jogo o @ do influenciador aqui, e em 3 segundos a inteligência artificial audita se a audiência é humana com 98% de precisão e calcula o ROI exato que ele vai te dar!"
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                        Ação & Visual:
                      </span>
                      <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 text-zinc-300 space-y-1 text-[11px]">
                        <p>• <strong>B-Roll:</strong> Gravação de tela do InfluenciMax Pro AI simulando Virgínia ou Casimiro.</p>
                        <p>• <strong>Destaque:</strong> Dê zoom no gráfico subindo para <strong className="text-emerald-400">3.8x ROI</strong> e no selo verde <strong className="text-emerald-400">Auditoria: 98.2% Autêntico</strong>.</p>
                        <p>• <strong>Texto na Tela:</strong> <span className="text-indigo-400 font-bold">"AUDITORIA NEURAL EM 3 SEGUNDOS ⚡"</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SCENE 4: 38s - 50s */}
                <div className={`p-4 rounded-xl border transition-all ${
                  secondsElapsed > 38 && secondsElapsed <= 50 && isPlayingTimer 
                    ? 'border-emerald-400 bg-emerald-950/20 shadow-lg shadow-emerald-500/10' 
                    : 'border-zinc-800 bg-[#121216]'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        00:38 - 00:50
                      </span>
                      <span className="font-bold text-sm text-white">CENA 4: O DIFERENCIAL AUTÔNOMO (Guardrails 24/7)</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Câmera: Plano Médio com computador ao lado</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-zinc-800/80">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                        O que você fala:
                      </span>
                      <p className="text-white italic bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 leading-relaxed font-sans">
                        "E o melhor: o sistema tem robôs de proteção que pausam a campanha sozinhos se o influenciador não cumprir o contrato ou postar fora das regras do CONAR. Segurança total pro seu bolso."
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                        Ação & Visual:
                      </span>
                      <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 text-zinc-300 space-y-1 text-[11px]">
                        <p>• <strong>B-Roll:</strong> Mostre a aba 'Estúdio de Automação' com a regra 'Pausar pagamento em fraude'.</p>
                        <p>• <strong>Texto na Tela:</strong> <span className="text-emerald-400 font-bold">"SEU DINHEIRO PROTEGIDO 24 HORAS POR DIA 🛡️"</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SCENE 5: 50s - 60s */}
                <div className={`p-4 rounded-xl border transition-all ${
                  secondsElapsed > 50 && secondsElapsed <= 60 && isPlayingTimer 
                    ? 'border-emerald-400 bg-emerald-950/20 shadow-lg shadow-emerald-500/10' 
                    : 'border-zinc-800 bg-[#121216]'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        00:50 - 01:00
                      </span>
                      <span className="font-bold text-sm text-white">CENA 5: CALL TO ACTION IMPERATIVO (Fechamento)</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Câmera: Close Direto e Sorriso Confiante</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-zinc-800/80">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                        O que você fala:
                      </span>
                      <p className="text-white italic bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 leading-relaxed font-sans">
                        "Quer testar e ver a auditoria de graça agora? Clica no link da bio ou manda um direct com a palavra 'AUDITORIA' que eu te libero o acesso imediato!"
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                        Ação & Visual:
                      </span>
                      <div className="bg-black/40 p-2.5 rounded-lg border border-zinc-800/60 text-zinc-300 space-y-1 text-[11px]">
                        <p>• <strong>Gesto:</strong> Aponte para baixo (link) ou faça o sinal de envio de direct.</p>
                        <p>• <strong>Texto na Tela:</strong> <span className="text-yellow-400 font-bold">"COMENTE 'AUDITORIA' OU CLIQUE NO LINK DA BIO 📲"</span></p>
                        <p>• <strong>Logotipo Final:</strong> Card elegante com 'InfluenciMax Pro AI'.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* One Click Copy of Whole Video Script */}
              <div className="p-4 rounded-xl bg-[#121216] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-zinc-400">
                  📄 <strong>Precisa do roteiro em texto puro para colar no Teleprompter do CapCut ou celular?</strong>
                </div>
                <button
                  onClick={() => {
                    const fullScript = `ROTEIRO DE VÍDEO CURTO (60 SEGUNDOS) - INFLIUENCIMAX PRO AI

[00:00 - 00:05] O GANCHO:
"Se você ainda contrata influenciador olhando só número de seguidores... você está sendo ENGANADO e perdendo rios de dinheiro!"

[00:05 - 00:18] A DOR:
"Mais de um terço dos perfis famosos compram robôs árabes e chineses pra inflar métrica. Você paga cinco mil reais achando que vai bombar de vender, e não cai uma mísera compra no seu WhatsApp!"

[00:18 - 00:38] A SOLUÇÃO:
"É exatamente por isso que nós criamos o InfluenciMax Pro AI! Olha isso: eu jogo o @ do influenciador aqui, e em 3 segundos a inteligência artificial audita se a audiência é humana com 98% de precisão e calcula o ROI exato que ele vai te dar!"

[00:38 - 00:50] O DIFERENCIAL:
"E o melhor: o sistema tem robôs de proteção que pausam a campanha sozinhos se o influenciador não cumprir o contrato ou postar fora das regras do CONAR. Segurança total pro seu bolso."

[00:50 - 01:00] CHAMADA PARA AÇÃO (CTA):
"Quer testar e ver a auditoria de graça agora? Clica no link da bio ou manda um direct com a palavra 'AUDITORIA' que eu te libero o acesso imediato!"`;
                    handleCopy(fullScript, 'full_video_script', 'Roteiro de Vídeo Completo');
                  }}
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors whitespace-nowrap"
                >
                  {copiedKey === 'full_video_script' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'full_video_script' ? 'Roteiro Copiado!' : 'Copiar Roteiro para Teleprompter'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1F1F23] bg-[#0C0C0E] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Ativos prontos para publicação em Instagram, LinkedIn, TikTok, Facebook e Shorts</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors border border-zinc-700"
            >
              Fechar Kit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
