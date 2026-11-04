import React, { useState } from 'react';
import { Creator, NicheType, PlatformType } from '../types';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Users,
  Instagram, 
  Video, 
  Youtube, 
  Linkedin, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  TrendingUp,
  X
} from 'lucide-react';

interface CreatorDirectoryViewProps {
  creators: Creator[];
  onSelectCreatorForSimulation: (creator: Creator) => void;
}

export const CreatorDirectoryView: React.FC<CreatorDirectoryViewProps> = ({
  creators,
  onSelectCreatorForSimulation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<string>('Todos');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Todas');
  const [minAuthenticity, setMinAuthenticity] = useState<number>(85);
  const [selectedCreatorModal, setSelectedCreatorModal] = useState<Creator | null>(null);

  const niches = ['Todos', 'Tecnologia', 'Finanças', 'Moda & Beleza', 'Entretenimento', 'Gaming', 'Fitness & Saúde', 'Gastronomia', 'Educação', 'Viagens', 'Odontologia', 'Medicina'];
  const platforms = ['Todas', 'instagram', 'tiktok', 'youtube', 'linkedin'];

  // Filter creators
  const filteredCreators = creators.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.topInterests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesNiche = selectedNiche === 'Todos' || c.niche === selectedNiche;
    const matchesPlatform = selectedPlatform === 'Todas' || c.platforms.includes(selectedPlatform as PlatformType);
    const matchesAuth = c.authenticityScore >= minAuthenticity;
    return matchesSearch && matchesNiche && matchesPlatform && matchesAuth;
  });

  const renderPlatformIcon = (p: PlatformType) => {
    switch (p) {
      case 'instagram': return <Instagram className="w-3.5 h-3.5 text-pink-400" />;
      case 'tiktok': return <Video className="w-3.5 h-3.5 text-cyan-400" />;
      case 'youtube': return <Youtube className="w-3.5 h-3.5 text-red-500" />;
      case 'linkedin': return <Linkedin className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif italic text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Creator CRM & Fraud Intelligence
            </h2>
            <p className="text-xs text-[#888888] font-mono mt-1">
              Deep audience synthesis, computer-vision bot audit, and predictive conversion scores.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#111111] border border-[#222222] text-emerald-400 font-mono text-xs px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Anti-Bot Filter Active (&lt;2% Fake Accounts Threshold)</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-[#1F1F1F]">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#666666] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar por nome, @handle ou nicho..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>

          {/* Niche Filter */}
          <div>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
            >
              {niches.map(n => <option key={n} value={n}>Nicho: {n}</option>)}
            </select>
          </div>

          {/* Platform Filter */}
          <div>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
            >
              {platforms.map(p => <option key={p} value={p}>Plataforma: {p.toUpperCase()}</option>)}
            </select>
          </div>

          {/* Min Authenticity Slider */}
          <div className="bg-[#111111] border border-[#222222] rounded-xl px-3 py-1.5 flex flex-col justify-center">
            <div className="flex justify-between text-[11px] font-mono text-[#888888] mb-1">
              <span>Autenticidade Mínima:</span>
              <span className="text-emerald-400 font-bold">{minAuthenticity}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="98"
              value={minAuthenticity}
              onChange={(e) => setMinAuthenticity(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1 bg-[#222222] rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCreators.map((creator) => (
          <div 
            key={creator.id}
            className="bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#333333] rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between group"
          >
            <div>
              {/* Top Profile Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#222222]"
                    />
                    {creator.verified && (
                      <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5" title="Verificado">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                      {creator.name}
                    </h3>
                    <p className="text-xs text-[#666666] font-mono">{creator.handle}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#111111] text-[#888888] border border-[#222222]">
                  {creator.niche}
                </span>
              </div>

              {/* Platforms */}
              <div className="flex items-center gap-2 mb-4">
                {creator.platforms.map(p => (
                  <span key={p} className="p-1.5 bg-[#111111] rounded-lg border border-[#222222]" title={p}>
                    {renderPlatformIcon(p)}
                  </span>
                ))}
                <span className="text-xs text-[#888888] ml-auto font-mono">
                  {(creator.followersCount / 1000).toFixed(0)}k seguidores
                </span>
              </div>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 gap-2 bg-[#050505] p-3 rounded-xl border border-[#1F1F1F] text-xs mb-4 font-mono">
                <div>
                  <span className="text-[10px] text-[#555555] block">Score IA</span>
                  <span className="font-bold text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    {creator.predictiveScore}/100
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#555555] block">Autenticidade</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {creator.authenticityScore}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#555555] block">Engajamento</span>
                  <span className="font-semibold text-[#E0E0E0]">{creator.engagementRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#555555] block">Preço Est.</span>
                  <span className="font-semibold text-[#E0E0E0]">R$ {creator.pricePerPost.toLocaleString()}</span>
                </div>
              </div>

              {/* Interests Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {creator.topInterests.slice(0, 3).map((interest, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-[#111111] text-[#888888] px-2 py-0.5 rounded border border-[#222222]">
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1F1F1F]">
              <button
                onClick={() => setSelectedCreatorModal(creator)}
                className="w-full py-2 bg-[#111111] hover:bg-[#181818] text-[#E0E0E0] text-xs font-semibold rounded-xl border border-[#222222] transition-all text-center"
              >
                Auditoria
              </button>
              <button
                onClick={() => onSelectCreatorForSimulation(creator)}
                className="w-full py-2 bg-white text-black hover:bg-slate-200 text-xs font-bold rounded-xl transition-all text-center flex items-center justify-center gap-1 uppercase tracking-wider"
              >
                <Sparkles className="w-3 h-3" />
                <span>Simular</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Nenhum criador encontrado</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Tente ajustar os filtros de busca ou reduzir a exigência do score mínimo de autenticidade.
          </p>
        </div>
      )}

      {/* Creator Detailed Audit Modal */}
      {selectedCreatorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCreatorModal(null)}
              className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white rounded-lg bg-[#111111] border border-[#222222]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedCreatorModal.avatar}
                alt={selectedCreatorModal.name}
                className="w-16 h-16 rounded-2xl object-cover border border-[#222222]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-serif italic text-white">{selectedCreatorModal.name}</h3>
                  {selectedCreatorModal.verified && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </div>
                <p className="text-xs text-[#666666] font-mono">{selectedCreatorModal.handle}</p>
                <span className="mt-1 inline-block text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded bg-[#111111] text-indigo-400 border border-[#222222]">
                  {selectedCreatorModal.niche}
                </span>
              </div>
            </div>

            {/* Audit Scorecard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 font-mono">
              <div className="bg-[#111111] p-3.5 rounded-xl border border-[#222222] text-center">
                <span className="text-[10px] text-[#666666] uppercase block mb-1">Score Preditivo</span>
                <span className="text-2xl font-light text-indigo-400">{selectedCreatorModal.predictiveScore}/100</span>
              </div>
              <div className="bg-[#111111] p-3.5 rounded-xl border border-[#222222] text-center">
                <span className="text-[10px] text-[#666666] uppercase block mb-1">Qualidade Audiência</span>
                <span className="text-2xl font-light text-emerald-400">{selectedCreatorModal.authenticityScore}%</span>
              </div>
              <div className="bg-[#111111] p-3.5 rounded-xl border border-[#222222] text-center">
                <span className="text-[10px] text-[#666666] uppercase block mb-1">Taxa de Bots</span>
                <span className="text-2xl font-light text-amber-400">{selectedCreatorModal.botPercentage}%</span>
              </div>
            </div>

            {/* Demographics Breakdown */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs uppercase tracking-widest font-mono text-[#888888] border-b border-[#1F1F1F] pb-2">
                Análise Preditiva de Audiência
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {/* Gender Ratio */}
                <div className="bg-[#050505] p-4 rounded-xl border border-[#1F1F1F]">
                  <span className="font-semibold text-[#888888] block mb-2">Gênero:</span>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[#888888]">
                      <span>Feminino:</span>
                      <span className="font-bold text-white">{selectedCreatorModal.demographics.genderRatio.female}%</span>
                    </div>
                    <div className="w-full bg-[#111111] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full" style={{ width: `${selectedCreatorModal.demographics.genderRatio.female}%` }}></div>
                    </div>

                    <div className="flex justify-between text-[#888888] pt-1">
                      <span>Masculino:</span>
                      <span className="font-bold text-white">{selectedCreatorModal.demographics.genderRatio.male}%</span>
                    </div>
                    <div className="w-full bg-[#111111] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full" style={{ width: `${selectedCreatorModal.demographics.genderRatio.male}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Top Locations */}
                <div className="bg-[#050505] p-4 rounded-xl border border-[#1F1F1F]">
                  <span className="font-semibold text-[#888888] block mb-2">Localização:</span>
                  <div className="space-y-2">
                    {selectedCreatorModal.demographics.topLocations.map((loc, i) => (
                      <div key={i} className="flex items-center justify-between text-[#888888]">
                        <span>{loc.country}</span>
                        <span className="font-bold text-indigo-400">{loc.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Action */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1F1F1F]">
              <button
                onClick={() => setSelectedCreatorModal(null)}
                className="px-4 py-2 bg-[#111111] hover:bg-[#181818] text-[#888888] rounded-xl text-xs font-medium"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const creator = selectedCreatorModal;
                  setSelectedCreatorModal(null);
                  onSelectCreatorForSimulation(creator);
                }}
                className="px-5 py-2 bg-white text-black hover:bg-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Simular Campanha</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
