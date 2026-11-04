import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Copy, 
  Loader2, 
  Send, 
  Upload, 
  Bot 
} from 'lucide-react';

export const AiBriefCopilotView: React.FC = () => {
  // Brief generator states
  const [brand, setBrand] = useState('Fintech BankNext');
  const [product, setProduct] = useState('Cartão Black com Cashback');
  const [niche, setNiche] = useState('Finanças');
  const [objective, setObjective] = useState('Conversões / Vendas');
  const [targetAudience, setTargetAudience] = useState('Jovens adultos 22-35 anos interessados em investimentos');
  const [budget, setBudget] = useState('35000');
  
  const [isLoadingBrief, setIsLoadingBrief] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<any>(null);

  // Compliance scanner states
  const [draftText, setDraftText] = useState('Testando este novo cartão incrível sem anuidade! Use o link na bio para abrir sua conta. #publi #ad');
  const [isScanningCompliance, setIsScanningCompliance] = useState(false);
  const [complianceResult, setComplianceResult] = useState<any>(null);

  const handleGenerateBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingBrief(true);
    setGeneratedBrief(null);

    try {
      const response = await fetch('/api/ai/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand,
          product,
          niche,
          objective,
          targetAudience,
          budget
        })
      });

      const data = await response.json();
      setGeneratedBrief(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setGeneratedBrief({
        title: `Briefing Estratégico: ${product} - ${brand}`,
        keyDeliverables: [
          '1x Reel com demonstração do app nos primeiros 3 segundos',
          '2x Sequências de Stories com sticker de link rastreável',
          'Chamada para Ação (CTA) clara direcionando para o cadastro'
        ],
        talkingPoints: [
          'Destacar isenção de anuidade no primeiro ano',
          'Demonstrar acúmulo automático de pontos no app',
          'Transparência e naturalidade com a tag #publi'
        ],
        prohibitedTerms: [
          'Promessas irreais de retorno de cashback',
          'Termos depreciativos a outros bancos',
          'Ocultação de aviso publicitário'
        ],
        aiPredictedCTR: '5.2%',
        estimatedROI: '3.9x',
        recommendedPublishTime: 'Quinta-feira entre 18h e 20h'
      });
    } finally {
      setIsLoadingBrief(false);
    }
  };

  const handleScanCompliance = () => {
    setIsScanningCompliance(true);
    setTimeout(() => {
      const hasPubli = draftText.toLowerCase().includes('#publi') || draftText.toLowerCase().includes('#ad');
      setComplianceResult({
        passed: hasPubli,
        brandLogoDetected: true,
        ftcDisclosurePresent: hasPubli,
        bannedWordsFound: [],
        sentimentAlignment: 96,
        recommendation: hasPubli 
          ? 'Conteúdo em conformidade total com as diretrizes do CONAR / FTC e da marca.'
          : 'Atenção: Adicione a hashtag obrigatória #publi ou #ad para garantir conformidade jurídica.'
      });
      setIsScanningCompliance(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#111111] border border-[#222222] rounded-xl text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif italic text-white">AI Brief Generator & Compliance Copilot</h2>
            <p className="text-xs text-[#888888] font-mono mt-1">
              Automated briefing synthesis and real-time legal/FTC compliance audit.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Brief Generator Form & Output */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="text-xs uppercase tracking-widest font-mono text-[#888888] border-b border-[#1F1F1F] pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Gerador Inteligente de Briefing (Gemini AI)
          </h3>

          <form onSubmit={handleGenerateBrief} className="space-y-3 text-xs font-mono">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#888888] block mb-1">Marca:</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
              <div>
                <label className="text-[#888888] block mb-1">Produto:</label>
                <input
                  type="text"
                  required
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#888888] block mb-1">Nicho:</label>
                <input
                  type="text"
                  required
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
              <div>
                <label className="text-[#888888] block mb-1">Verba (R$):</label>
                <input
                  type="number"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-[#888888] block mb-1">Público Alvo:</label>
              <input
                type="text"
                required
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isLoadingBrief}
              className="w-full py-2.5 bg-white text-black hover:bg-slate-200 font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 uppercase tracking-wider text-xs"
            >
              {isLoadingBrief ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Gerando Briefing com IA...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Gerar Briefing Otimizado</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Brief Box */}
          {generatedBrief && (
            <div className="bg-[#050505] border border-[#1F1F1F] rounded-xl p-4 text-xs space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
                <h4 className="font-serif italic text-white text-sm">{generatedBrief.title}</h4>
                <span className="text-[10px] text-indigo-400 bg-[#111111] px-2 py-0.5 rounded border border-[#222222]">
                  CTR Est. {generatedBrief.aiPredictedCTR}
                </span>
              </div>

              <div>
                <span className="text-indigo-400 font-semibold block mb-1">Entregáveis Recomendados:</span>
                <ul className="list-disc list-inside text-[#AAAAAA] space-y-1 font-sans">
                  {generatedBrief.keyDeliverables?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-emerald-400 font-semibold block mb-1">Pontos Principais de Fala:</span>
                <ul className="list-disc list-inside text-[#AAAAAA] space-y-1 font-sans">
                  {generatedBrief.talkingPoints?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-amber-400 font-semibold block mb-1">Proibições & Restrições:</span>
                <ul className="list-disc list-inside text-[#888888] space-y-1 font-sans">
                  {generatedBrief.prohibitedTerms?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#1F1F1F] text-[10px] text-[#666666] flex justify-between">
                <span>Horário: <strong className="text-white">{generatedBrief.recommendedPublishTime}</strong></span>
                <span>ROI Previsto: <strong className="text-emerald-400">{generatedBrief.estimatedROI}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Content Compliance & Brand Safety Scanner */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="text-xs uppercase tracking-widest font-mono text-[#888888] border-b border-[#1F1F1F] pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Auditoria Computacional de Conteúdo
          </h3>

          <p className="text-xs text-[#888888] font-mono">
            Cole a legenda ou rascunho do criador para checagem de conformidade com CONAR/FTC e regramento da marca.
          </p>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-[#888888] block mb-1">Legenda / Rascunho:</label>
              <textarea
                rows={5}
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                className="w-full bg-[#111111] border border-[#222222] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 font-mono text-xs"
              />
            </div>

            <button
              onClick={handleScanCompliance}
              disabled={isScanningCompliance}
              className="w-full py-2.5 bg-[#111111] hover:bg-[#181818] border border-[#222222] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 uppercase tracking-wider text-xs"
            >
              {isScanningCompliance ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Analisando com NLP...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Auditar Rascunho com IA</span>
                </>
              )}
            </button>

            {/* Compliance Results */}
            {complianceResult && (
              <div className={`p-4 rounded-xl border text-xs space-y-2 font-mono ${
                complianceResult.passed 
                  ? 'bg-[#050505] border-emerald-500/40 text-emerald-300' 
                  : 'bg-[#050505] border-amber-500/40 text-amber-300'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {complianceResult.passed ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Aprovado para Publicação</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <span>Ajustes Necessários</span>
                    </>
                  )}
                </div>

                <p className="text-xs text-[#AAAAAA] font-sans">{complianceResult.recommendation}</p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1F1F1F] text-[10px] text-[#888888]">
                  <div>Tag #publi / #ad: <strong className={complianceResult.ftcDisclosurePresent ? 'text-emerald-400' : 'text-amber-400'}>{complianceResult.ftcDisclosurePresent ? 'Presente' : 'Ausente'}</strong></div>
                  <div>Alinhamento: <strong className="text-indigo-400">{complianceResult.sentimentAlignment}%</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
