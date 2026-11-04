import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Scan, 
  Layers, 
  FileText, 
  Trash2, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  Check,
  Share2
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  hasHook: boolean;
}

interface CreativeStudioViewProps {
  onNotification?: (msg: string) => void;
}

export function CreativeStudioView({ onNotification }: CreativeStudioViewProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, title: 'Descubra a Nova Era da Gestão', subtitle: 'Como dobrar a retenção sem aumentar equipe', color: 'from-indigo-900 to-slate-900', hasHook: true },
    { id: 2, title: 'O Maior Gargalo da Sua Operação', subtitle: 'Planilhas manuais e perda de leads qualificados', color: 'from-purple-900 to-slate-900', hasHook: false },
    { id: 3, title: 'Nossa Solução Neural com IA', subtitle: 'Automação autônoma que trabalha 24/7', color: 'from-blue-900 to-slate-900', hasHook: false },
    { id: 4, title: 'Resultados Comprovados em 30 Dias', subtitle: '+38% conversão com 40% menor custo por aquisição', color: 'from-emerald-900 to-slate-900', hasHook: false },
    { id: 5, title: 'Depoimentos de Grandes Marcas', subtitle: 'Casos reais de sucesso no mercado brasileiro', color: 'from-amber-900 to-slate-900', hasHook: false },
    { id: 6, title: 'Condição Especial por Tempo Limitado', subtitle: 'Toque no link e agende seu diagnóstico gratuito', color: 'from-rose-900 to-slate-900', hasHook: true },
  ]);

  const [primaryText, setPrimaryText] = useState(
    'Se você busca previsibilidade de receita e automação de campanhas, conheça o ecossistema completo. Sem atritos, sem planilhas confusas. Toque em Saiba Mais para conferir a demonstração. #publi #ad'
  );

  const [enableOCR, setEnableOCR] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ocrReport, setOcrReport] = useState<any>({
    contrastScore: 98,
    textDensity: '16% (Totalmente compatível com diretrizes Meta Ads)',
    readabilityScore: 'Excelente (Nível 9.4/10)',
    ftcCompliance: true,
    hookStrength: 'Alto (Impacto nos primeiros 3 segundos detectado)',
    suggestedFix: 'Nenhuma anomalia visual detectada. Pronto para veiculação.'
  });

  const [savedCreatives, setSavedCreatives] = useState([
    {
      id: 'cr_1',
      title: 'Carrossel B2B SaaS — V1 Escala',
      slidesCount: 6,
      score: 96,
      status: 'Aprovado IA',
      date: 'Hoje, 14:20'
    },
    {
      id: 'cr_2',
      title: 'Carrossel Prova Social & ROI',
      slidesCount: 6,
      score: 92,
      status: 'Pronto para Meta',
      date: 'Ontem'
    }
  ]);

  const handleRunOcrAudit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const hasPubli = primaryText.toLowerCase().includes('#publi') || primaryText.toLowerCase().includes('#ad');
      setOcrReport({
        contrastScore: Math.floor(Math.random() * 5) + 94,
        textDensity: '15.8% (Ótima distribuição visual - seguro para algoritmo)',
        readabilityScore: 'Grau Superior (9.6/10)',
        ftcCompliance: hasPubli,
        hookStrength: 'Forte gancho narrativo e contraste cromático',
        suggestedFix: hasPubli ? 'Pronto para publicação sem restrições.' : 'Adicione a tag #publi no texto para compliance legal.'
      });
      setIsAnalyzing(false);
      onNotification?.('Auditoria de visão computacional concluída com sucesso!');
    }, 900);
  };

  const handleSaveCreative = () => {
    const newCreative = {
      id: `cr_${Date.now()}`,
      title: slides[0].title.slice(0, 32) + '...',
      slidesCount: slides.length,
      score: ocrReport.contrastScore,
      status: 'Aprovado IA',
      date: 'Criado agora'
    };
    setSavedCreatives([newCreative, ...savedCreatives]);
    onNotification?.('Criativo registrado no estúdio e pronto para o Meta Ads!');
  };

  const handleUpdateCurrentSlide = (field: 'title' | 'subtitle', val: string) => {
    setSlides(prev => prev.map((s, idx) => idx === activeSlideIndex ? { ...s, [field]: val } : s));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                  <Scan className="w-3 h-3" /> OCR & Computer Vision
                </span>
                <span className="text-xs text-[#666666] font-mono">Meta Ads Carousel Engine</span>
              </div>
              <h2 className="text-2xl font-serif italic text-white mt-1">Estúdio Criativo & Auditoria Visual</h2>
              <p className="text-xs text-[#888888] font-mono">
                Otimize carrosséis de alta conversão com verificação de contraste, densidade de texto e regras de conformidade.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunOcrAudit}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-[#111111] hover:bg-[#181818] border border-[#222222] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Scan className="w-4 h-4 text-cyan-400" />
              <span>{isAnalyzing ? 'Auditoria em curso...' : 'Re-auditar OCR'}</span>
            </button>
            <button
              onClick={handleSaveCreative}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Cadastrar no Meta Ads</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Carousel Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#888888] uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-indigo-400" />
                Preview do Slide ({activeSlideIndex + 1} de {slides.length})
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                1080 x 1080 px (1:1 Ratio)
              </span>
            </div>

            {/* Slide Mock Screen */}
            <div className={`aspect-square w-full rounded-2xl bg-gradient-to-br ${slides[activeSlideIndex].color} border border-[#333333] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300`}>
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-black/40 text-white backdrop-blur-md border border-white/10">
                  Slide {activeSlideIndex + 1}/{slides.length}
                </span>
                <span className="text-[10px] font-mono text-emerald-300 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30">
                  OCR: Contraste 98%
                </span>
              </div>

              <div className="space-y-4 my-auto z-10 text-center max-w-sm mx-auto">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {slides[activeSlideIndex].title}
                </h3>
                <p className="text-sm text-slate-200 font-light">
                  {slides[activeSlideIndex].subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 z-10 text-xs text-white/60 font-mono">
                <span>InfluenciMax Pro</span>
                <span className="flex items-center gap-1 text-white">
                  <span>Arraste para o lado</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Decorative background circle */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Slide Navigation Thumbnails */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`p-2 rounded-xl text-center text-xs font-mono transition-all border ${
                    activeSlideIndex === idx
                      ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md'
                      : 'bg-[#111111] border-[#222222] text-[#666666] hover:text-white'
                  }`}
                >
                  <span className="block font-bold">Slide {idx + 1}</span>
                  <span className="text-[9px] truncate block opacity-70">
                    {idx === 0 ? 'Capa' : idx === slides.length - 1 ? 'CTA' : 'Conteúdo'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Slide Content Editor */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-white font-mono">
              Editar Conteúdo do Slide {activeSlideIndex + 1}
            </h4>
            <div>
              <label className="text-[11px] font-mono text-[#888888] uppercase block mb-1">Título Principal do Card</label>
              <input
                type="text"
                value={slides[activeSlideIndex].title}
                onChange={(e) => handleUpdateCurrentSlide('title', e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#888888] uppercase block mb-1">Subtítulo / Descrição de Apoio</label>
              <input
                type="text"
                value={slides[activeSlideIndex].subtitle}
                onChange={(e) => handleUpdateCurrentSlide('subtitle', e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Right: Copy & Vision Computer Audit (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Primary Text Box */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#888888] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                Texto Principal (Meta Ads Primary Text)
              </span>
              <span className="text-[11px] font-mono text-[#666666]">{primaryText.length} caracteres</span>
            </div>

            <textarea
              rows={4}
              value={primaryText}
              onChange={(e) => setPrimaryText(e.target.value)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500"
              placeholder="Digite a copy persuasiva do carrossel..."
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={enableOCR}
                  onChange={(e) => setEnableOCR(e.target.checked)}
                  className="rounded accent-indigo-600"
                />
                <span>Análise de Visão Computacional OCR Ativa</span>
              </label>
              <button
                onClick={handleRunOcrAudit}
                className="text-indigo-400 hover:text-indigo-300 text-xs font-mono"
              >
                Auditar Copy
              </button>
            </div>
          </div>

          {/* OCR Computer Vision Report */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Auditoria de OCR & Regras Meta
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Score: {ocrReport.contrastScore}/100
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-[#111111] border border-[#222222] p-2.5 rounded-xl flex items-center justify-between">
                <span className="text-[#888888]">Densidade de Texto:</span>
                <span className="text-white font-mono font-semibold">{ocrReport.textDensity}</span>
              </div>
              <div className="bg-[#111111] border border-[#222222] p-2.5 rounded-xl flex items-center justify-between">
                <span className="text-[#888888]">Índice de Retenção:</span>
                <span className="text-emerald-400 font-mono font-semibold">{ocrReport.hookStrength}</span>
              </div>
              <div className="bg-[#111111] border border-[#222222] p-2.5 rounded-xl flex items-center justify-between">
                <span className="text-[#888888]">Conformidade CONAR / FTC:</span>
                <span className={`font-mono font-semibold ${ocrReport.ftcCompliance ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {ocrReport.ftcCompliance ? 'Conforme (#publi detectado)' : 'Alerta: Faltando #publi'}
                </span>
              </div>
              <div className="bg-[#111111] border border-[#222222] p-2.5 rounded-xl text-[#AAAAAA]">
                <span className="text-[#666666] block text-[10px] uppercase font-mono">Parecer da IA:</span>
                {ocrReport.suggestedFix}
              </div>
            </div>
          </div>

          {/* Saved Creatives Catalog */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-bold text-white font-mono mb-3">
              Criativos Registrados no Catálogo
            </h4>
            <div className="space-y-2">
              {savedCreatives.map((c) => (
                <div key={c.id} className="bg-[#111111] border border-[#222222] p-3 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block">{c.title}</span>
                    <span className="text-[10px] text-[#666666] font-mono">{c.slidesCount} slides • {c.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono block">
                      {c.status}
                    </span>
                    <span className="text-[10px] text-indigo-400 font-mono mt-0.5 block">{c.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
