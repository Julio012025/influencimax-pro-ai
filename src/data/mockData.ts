import { Creator, Campaign, AutomationRule } from '../types';

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'c1',
    name: 'Iberê Thenório (Manual do Mundo)',
    handle: '@oibere',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    niche: 'Tecnologia',
    platforms: ['youtube', 'instagram', 'tiktok'],
    followersCount: 18800000,
    engagementRate: 6.4,
    authenticityScore: 99,
    predictiveScore: 98,
    estReach: 4200000,
    avgCPM: 38.00,
    avgCPA: 14.50,
    demographics: {
      genderRatio: { male: 68, female: 30, other: 2 },
      topLocations: [
        { country: 'Brasil (SP/RJ)', percentage: 76 },
        { country: 'Brasil (MG/Sul)', percentage: 16 },
        { country: 'Internacional (PT/EUA)', percentage: 8 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 35 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 20 }
      ]
    },
    recentGrowthRate: 4.8,
    pricePerPost: 48000,
    verified: true,
    botPercentage: 0.6,
    sentimentScore: 99,
    topInterests: ['Ciência & Experimentos', 'Tecnologia & Gadgets', 'Educação Maker', 'Curiosidades']
  },
  {
    id: 'c2',
    name: 'Thiago Nigro (O Primo Rico)',
    handle: '@thiago.nigro',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    niche: 'Finanças',
    platforms: ['youtube', 'instagram', 'linkedin'],
    followersCount: 9400000,
    engagementRate: 4.9,
    authenticityScore: 95,
    predictiveScore: 96,
    estReach: 2800000,
    avgCPM: 55.00,
    avgCPA: 26.00,
    demographics: {
      genderRatio: { male: 72, female: 26, other: 2 },
      topLocations: [
        { country: 'Brasil (Sudeste)', percentage: 68 },
        { country: 'Brasil (Sul/Centro-Oeste)', percentage: 24 },
        { country: 'Outros', percentage: 8 }
      ],
      ageRanges: [
        { range: '25-34', percentage: 56 },
        { range: '35-44', percentage: 30 },
        { range: '45+', percentage: 14 }
      ]
    },
    recentGrowthRate: 5.2,
    pricePerPost: 65000,
    verified: true,
    botPercentage: 1.4,
    sentimentScore: 93,
    topInterests: ['Investimentos', 'Ações & FIIs', 'Mentalidade Empreendedora', 'Fintechs']
  },
  {
    id: 'c3',
    name: 'Virginia Fonseca',
    handle: '@virginia',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    niche: 'Moda & Beleza',
    platforms: ['instagram', 'tiktok', 'youtube'],
    followersCount: 49500000,
    engagementRate: 6.8,
    authenticityScore: 94,
    predictiveScore: 97,
    estReach: 14200000,
    avgCPM: 32.00,
    avgCPA: 11.20,
    demographics: {
      genderRatio: { male: 16, female: 82, other: 2 },
      topLocations: [
        { country: 'Brasil (Sudeste)', percentage: 54 },
        { country: 'Brasil (Nordeste/CO)', percentage: 36 },
        { country: 'Outros', percentage: 10 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 46 },
        { range: '25-34', percentage: 42 },
        { range: '35-44', percentage: 12 }
      ]
    },
    recentGrowthRate: 8.6,
    pricePerPost: 150000,
    verified: true,
    botPercentage: 2.1,
    sentimentScore: 92,
    topInterests: ['Cosméticos & WePink', 'Moda & Tendências', 'Maternidade Real', 'Lifestyle']
  },
  {
    id: 'c4',
    name: 'Alexandre Borba (Gaules)',
    handle: '@gaules',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    niche: 'Gaming',
    platforms: ['youtube', 'tiktok', 'instagram'],
    followersCount: 4500000,
    engagementRate: 8.2,
    authenticityScore: 98,
    predictiveScore: 95,
    estReach: 1950000,
    avgCPM: 24.00,
    avgCPA: 13.80,
    demographics: {
      genderRatio: { male: 84, female: 14, other: 2 },
      topLocations: [
        { country: 'Brasil (Nacional)', percentage: 92 },
        { country: 'Portugal', percentage: 5 },
        { country: 'Outros', percentage: 3 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 48 },
        { range: '25-34', percentage: 42 },
        { range: '35-44', percentage: 10 }
      ]
    },
    recentGrowthRate: 6.1,
    pricePerPost: 42000,
    verified: true,
    botPercentage: 1.0,
    sentimentScore: 97,
    topInterests: ['CS2 & eSports', 'Hardware & Periféricos', 'A Tribo', 'Streaming Ao Vivo']
  },
  {
    id: 'c5',
    name: 'Renato Cariani',
    handle: '@renatocariani',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    niche: 'Fitness & Saúde',
    platforms: ['youtube', 'instagram', 'tiktok'],
    followersCount: 8600000,
    engagementRate: 6.5,
    authenticityScore: 96,
    predictiveScore: 96,
    estReach: 3400000,
    avgCPM: 34.00,
    avgCPA: 16.00,
    demographics: {
      genderRatio: { male: 70, female: 28, other: 2 },
      topLocations: [
        { country: 'Brasil (SP/RJ)', percentage: 72 },
        { country: 'Brasil (Sul/Nordeste)', percentage: 22 },
        { country: 'Outros', percentage: 6 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 38 },
        { range: '25-34', percentage: 48 },
        { range: '35-44', percentage: 14 }
      ]
    },
    recentGrowthRate: 7.2,
    pricePerPost: 52000,
    verified: true,
    botPercentage: 1.5,
    sentimentScore: 94,
    topInterests: ['Musculação & Hipertrofia', 'Suplementação', 'Nutrição Esportiva', 'Transformação Corporal']
  },
  {
    id: 'c6',
    name: 'Paola Carosella',
    handle: '@paolacarosella',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    niche: 'Gastronomia',
    platforms: ['youtube', 'instagram', 'linkedin'],
    followersCount: 6200000,
    engagementRate: 5.8,
    authenticityScore: 99,
    predictiveScore: 95,
    estReach: 2100000,
    avgCPM: 42.00,
    avgCPA: 18.50,
    demographics: {
      genderRatio: { male: 32, female: 66, other: 2 },
      topLocations: [
        { country: 'Brasil (Sudeste)', percentage: 70 },
        { country: 'Brasil (Sul)', percentage: 18 },
        { country: 'América Latina', percentage: 12 }
      ],
      ageRanges: [
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 38 },
        { range: '45+', percentage: 17 }
      ]
    },
    recentGrowthRate: 4.3,
    pricePerPost: 45000,
    verified: true,
    botPercentage: 0.8,
    sentimentScore: 98,
    topInterests: ['Culinária Afetiva', 'Alta Gastronomia', 'Vinhos & Queijos', 'Sustentabilidade']
  },
  {
    id: 'c7',
    name: 'Átila Iamarino',
    handle: '@oatila',
    avatar: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
    niche: 'Educação',
    platforms: ['youtube', 'instagram', 'linkedin'],
    followersCount: 2600000,
    engagementRate: 6.2,
    authenticityScore: 99,
    predictiveScore: 97,
    estReach: 1250000,
    avgCPM: 36.00,
    avgCPA: 15.00,
    demographics: {
      genderRatio: { male: 58, female: 40, other: 2 },
      topLocations: [
        { country: 'Brasil (Nacional)', percentage: 94 },
        { country: 'Outros', percentage: 6 }
      ],
      ageRanges: [
        { range: '20-24', percentage: 22 },
        { range: '25-34', percentage: 50 },
        { range: '35-44', percentage: 28 }
      ]
    },
    recentGrowthRate: 3.8,
    pricePerPost: 30000,
    verified: true,
    botPercentage: 0.5,
    sentimentScore: 98,
    topInterests: ['Divulgação Científica', 'Saúde Pública', 'Inovação & Futuro', 'Biologia']
  },
  {
    id: 'c8',
    name: 'Lucas Estevam (Estevam Pelo Mundo)',
    handle: '@estevampelomundo',
    avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
    niche: 'Viagens',
    platforms: ['youtube', 'instagram', 'tiktok'],
    followersCount: 2400000,
    engagementRate: 5.7,
    authenticityScore: 97,
    predictiveScore: 93,
    estReach: 1100000,
    avgCPM: 40.00,
    avgCPA: 22.00,
    demographics: {
      genderRatio: { male: 44, female: 53, other: 3 },
      topLocations: [
        { country: 'Brasil', percentage: 86 },
        { country: 'EUA & Europa', percentage: 14 }
      ],
      ageRanges: [
        { range: '25-34', percentage: 48 },
        { range: '35-44', percentage: 37 },
        { range: '45+', percentage: 15 }
      ]
    },
    recentGrowthRate: 6.0,
    pricePerPost: 28000,
    verified: true,
    botPercentage: 1.1,
    sentimentScore: 96,
    topInterests: ['Companhias Aéreas & Milhas', 'Hotéis de Luxo', 'Roteiros Internacionais', 'Turismo de Experiência']
  },
  {
    id: 'c9',
    name: 'Dr. Roberto Viotto',
    handle: '@drviotto',
    avatar: 'https://images.unsplash.com/photo-1606811971618-4486d1d29b5a?auto=format&fit=crop&w=300&q=80',
    niche: 'Odontologia',
    platforms: ['instagram', 'tiktok', 'youtube'],
    followersCount: 1900000,
    engagementRate: 4.8,
    authenticityScore: 95,
    predictiveScore: 91,
    estReach: 850000,
    avgCPM: 45.00,
    avgCPA: 29.00,
    demographics: {
      genderRatio: { male: 30, female: 68, other: 2 },
      topLocations: [{ country: 'Brasil', percentage: 95 }, { country: 'EUA/Dubai', percentage: 5 }],
      ageRanges: [
        { range: '25-34', percentage: 46 },
        { range: '35-44', percentage: 38 },
        { range: '45+', percentage: 16 }
      ]
    },
    recentGrowthRate: 4.2,
    pricePerPost: 32000,
    verified: true,
    botPercentage: 1.6,
    sentimentScore: 95,
    topInterests: ['Lentes de Contato Dental', 'Harmonização Facial', 'Estética do Sorriso', 'Alta Renda']
  },
  {
    id: 'c10',
    name: 'Dra. Ana Paula Simões',
    handle: '@draanapaulasimoes',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    niche: 'Medicina',
    platforms: ['instagram', 'linkedin', 'youtube'],
    followersCount: 380000,
    engagementRate: 5.4,
    authenticityScore: 98,
    predictiveScore: 94,
    estReach: 190000,
    avgCPM: 52.00,
    avgCPA: 38.00,
    demographics: {
      genderRatio: { male: 42, female: 56, other: 2 },
      topLocations: [{ country: 'Brasil', percentage: 96 }],
      ageRanges: [
        { range: '25-34', percentage: 40 },
        { range: '35-44', percentage: 42 },
        { range: '45+', percentage: 18 }
      ]
    },
    recentGrowthRate: 4.6,
    pricePerPost: 15000,
    verified: true,
    botPercentage: 0.6,
    sentimentScore: 99,
    topInterests: ['Ortopedia & Traumatologia', 'Medicina Esportiva', 'Prevenção de Lesões', 'Performance Humana']
  },
  {
    id: 'c11',
    name: 'Casimiro Miguel (CazéTV)',
    handle: '@casimiro',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    niche: 'Entretenimento',
    platforms: ['youtube', 'tiktok', 'instagram'],
    followersCount: 11200000,
    engagementRate: 7.9,
    authenticityScore: 99,
    predictiveScore: 99,
    estReach: 6800000,
    avgCPM: 28.00,
    avgCPA: 12.00,
    demographics: {
      genderRatio: { male: 78, female: 20, other: 2 },
      topLocations: [
        { country: 'Brasil (Sudeste)', percentage: 65 },
        { country: 'Brasil (Demais Regiões)', percentage: 30 },
        { country: 'Internacional', percentage: 5 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 45 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 10 }
      ]
    },
    recentGrowthRate: 9.5,
    pricePerPost: 85000,
    verified: true,
    botPercentage: 0.9,
    sentimentScore: 98,
    topInterests: ['Futebol & Esportes', 'CazéTV Transmissões', 'Reactions & Comédia', 'Cultura Pop']
  },
  {
    id: 'c12',
    name: 'Malu Borges',
    handle: '@maluborgesm',
    avatar: 'https://images.unsplash.com/photo-1596495577886-d920f1f45c8b?auto=format&fit=crop&w=300&q=80',
    niche: 'Moda & Beleza',
    platforms: ['tiktok', 'instagram'],
    followersCount: 5800000,
    engagementRate: 7.5,
    authenticityScore: 97,
    predictiveScore: 96,
    estReach: 3100000,
    avgCPM: 36.00,
    avgCPA: 14.00,
    demographics: {
      genderRatio: { male: 12, female: 86, other: 2 },
      topLocations: [
        { country: 'Brasil (SP/RJ/Sul)', percentage: 80 },
        { country: 'Internacional (Moda)', percentage: 20 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 52 },
        { range: '25-34', percentage: 38 },
        { range: '35-44', percentage: 10 }
      ]
    },
    recentGrowthRate: 11.2,
    pricePerPost: 55000,
    verified: true,
    botPercentage: 1.2,
    sentimentScore: 96,
    topInterests: ['High Fashion & Haute Couture', 'Unboxing de Luxo', 'Looks Criativos', 'Semana de Moda']
  },
  {
    id: 'c13',
    name: 'Nath Finanças',
    handle: '@nathfinancas',
    avatar: 'https://images.unsplash.com/photo-1577495508326-19a1b3cee65b?auto=format&fit=crop&w=300&q=80',
    niche: 'Finanças',
    platforms: ['youtube', 'instagram', 'linkedin', 'tiktok'],
    followersCount: 1350000,
    engagementRate: 6.4,
    authenticityScore: 98,
    predictiveScore: 95,
    estReach: 780000,
    avgCPM: 38.00,
    avgCPA: 15.50,
    demographics: {
      genderRatio: { male: 28, female: 70, other: 2 },
      topLocations: [
        { country: 'Brasil (RJ/SP)', percentage: 60 },
        { country: 'Brasil (Nordeste/Nacional)', percentage: 40 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 38 },
        { range: '25-34', percentage: 50 },
        { range: '35-44', percentage: 12 }
      ]
    },
    recentGrowthRate: 5.8,
    pricePerPost: 22000,
    verified: true,
    botPercentage: 0.7,
    sentimentScore: 97,
    topInterests: ['Educação Financeira Acessível', 'Controle de Gastos', 'Cartão sem Juros', 'Empreendedorismo Popular']
  },
  {
    id: 'c14',
    name: 'Pedro Loos (Ciência Todo Dia)',
    handle: '@pedroloos',
    avatar: 'https://images.unsplash.com/photo-1579684385127-1f15d50851f5?auto=format&fit=crop&w=300&q=80',
    niche: 'Tecnologia',
    platforms: ['youtube', 'instagram', 'tiktok'],
    followersCount: 3900000,
    engagementRate: 6.1,
    authenticityScore: 98,
    predictiveScore: 94,
    estReach: 1800000,
    avgCPM: 32.00,
    avgCPA: 16.00,
    demographics: {
      genderRatio: { male: 72, female: 26, other: 2 },
      topLocations: [{ country: 'Brasil (Nacional)', percentage: 95 }, { country: 'Outros', percentage: 5 }],
      ageRanges: [
        { range: '18-24', percentage: 45 },
        { range: '25-34', percentage: 42 },
        { range: '35-44', percentage: 13 }
      ]
    },
    recentGrowthRate: 5.0,
    pricePerPost: 32000,
    verified: true,
    botPercentage: 0.7,
    sentimentScore: 99,
    topInterests: ['Física & Espaço', 'IA & Futuro da Tecnologia', 'Hardware & Inovação', 'Ciência Aplicada']
  },
  {
    id: 'c15',
    name: 'Rodrigo Góes',
    handle: '@rodrigo.goes',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    niche: 'Fitness & Saúde',
    platforms: ['instagram', 'tiktok', 'youtube'],
    followersCount: 2200000,
    engagementRate: 8.9,
    authenticityScore: 97,
    predictiveScore: 96,
    estReach: 1400000,
    avgCPM: 29.00,
    avgCPA: 13.00,
    demographics: {
      genderRatio: { male: 66, female: 32, other: 2 },
      topLocations: [{ country: 'Brasil', percentage: 93 }, { country: 'EUA/Canadá', percentage: 7 }],
      ageRanges: [
        { range: '18-24', percentage: 48 },
        { range: '25-34', percentage: 42 },
        { range: '35-44', percentage: 10 }
      ]
    },
    recentGrowthRate: 14.5,
    pricePerPost: 35000,
    verified: true,
    botPercentage: 1.1,
    sentimentScore: 98,
    topInterests: ['Natural ou Fake Natty', 'Nutrição & Dieta Flexível', 'Bodybuilding Natural', 'Humor Fitness']
  },
  {
    id: 'c16',
    name: 'Whindersson Nunes',
    handle: '@whinderssonnunes',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    niche: 'Entretenimento',
    platforms: ['instagram', 'youtube', 'tiktok'],
    followersCount: 59600000,
    engagementRate: 5.9,
    authenticityScore: 96,
    predictiveScore: 97,
    estReach: 18500000,
    avgCPM: 26.00,
    avgCPA: 12.50,
    demographics: {
      genderRatio: { male: 48, female: 50, other: 2 },
      topLocations: [{ country: 'Brasil (Nacional)', percentage: 96 }],
      ageRanges: [
        { range: '18-24', percentage: 40 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 15 }
      ]
    },
    recentGrowthRate: 4.2,
    pricePerPost: 120000,
    verified: true,
    botPercentage: 1.8,
    sentimentScore: 95,
    topInterests: ['Stand-Up Comedy', 'Música & Projetos Autorais', 'Cultura Brasileira', 'Projetos Sociais']
  },
  {
    id: 'c17',
    name: 'Camila Coutinho',
    handle: '@camilacoutinho',
    avatar: 'https://images.unsplash.com/photo-1548690312-e3b522d8ea04?auto=format&fit=crop&w=300&q=80',
    niche: 'Moda & Beleza',
    platforms: ['instagram', 'linkedin', 'youtube'],
    followersCount: 3500000,
    engagementRate: 4.7,
    authenticityScore: 98,
    predictiveScore: 94,
    estReach: 1400000,
    avgCPM: 45.00,
    avgCPA: 24.00,
    demographics: {
      genderRatio: { male: 14, female: 84, other: 2 },
      topLocations: [{ country: 'Brasil (Sudeste/NE)', percentage: 88 }, { country: 'Europa/EUA', percentage: 12 }],
      ageRanges: [
        { range: '25-34', percentage: 48 },
        { range: '35-44', percentage: 38 },
        { range: '45+', percentage: 14 }
      ]
    },
    recentGrowthRate: 4.0,
    pricePerPost: 38000,
    verified: true,
    botPercentage: 0.9,
    sentimentScore: 97,
    topInterests: ['GE Beauty', 'Moda & Tendências', 'Empreendedorismo Feminino', 'Luxo Contemporâneo']
  },
  {
    id: 'c18',
    name: 'Felipe Neto',
    handle: '@felipeneto',
    avatar: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=300&q=80',
    niche: 'Entretenimento',
    platforms: ['youtube', 'instagram', 'tiktok'],
    followersCount: 46200000,
    engagementRate: 5.2,
    authenticityScore: 95,
    predictiveScore: 96,
    estReach: 15000000,
    avgCPM: 25.00,
    avgCPA: 13.50,
    demographics: {
      genderRatio: { male: 46, female: 52, other: 2 },
      topLocations: [{ country: 'Brasil (Nacional)', percentage: 95 }, { country: 'Portugal', percentage: 5 }],
      ageRanges: [
        { range: '18-24', percentage: 42 },
        { range: '25-34', percentage: 43 },
        { range: '35-44', percentage: 15 }
      ]
    },
    recentGrowthRate: 3.9,
    pricePerPost: 110000,
    verified: true,
    botPercentage: 1.9,
    sentimentScore: 91,
    topInterests: ['Opinião & Debate', 'Play9 & Negócios Criativos', 'Gaming & Lives', 'Cultura Digital']
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_1',
    title: 'Lançamento App Fintech Pro',
    brand: 'BankNext Digital',
    budget: 45000,
    spent: 28500,
    status: 'Ativa',
    creatorsCount: 3,
    assignedCreatorIds: ['c1', 'c2'],
    startDate: '2026-07-01',
    endDate: '2026-08-15',
    objective: 'Conversões / Vendas',
    metrics: {
      actualReach: 520000,
      predictedReach: 490000,
      actualEngagement: 31200,
      predictedEngagement: 28500,
      conversions: 1480,
      roi: 3.8
    },
    dailyTrend: [
      { date: '01 Jul', actualViews: 25000, predictedViews: 22000, conversions: 65 },
      { date: '05 Jul', actualViews: 85000, predictedViews: 80000, conversions: 240 },
      { date: '10 Jul', actualViews: 140000, predictedViews: 135000, conversions: 410 },
      { date: '15 Jul', actualViews: 210000, predictedViews: 190000, conversions: 620 },
      { date: '20 Jul', actualViews: 380000, predictedViews: 350000, conversions: 1100 },
      { date: '23 Jul', actualViews: 520000, predictedViews: 490000, conversions: 1480 }
    ]
  },
  {
    id: 'camp_2',
    title: 'Campanha Glow Skincare Verão',
    brand: 'Lumière Cosméticos',
    budget: 30000,
    spent: 19000,
    status: 'Ativa',
    creatorsCount: 2,
    assignedCreatorIds: ['c3'],
    startDate: '2026-07-10',
    endDate: '2026-08-10',
    objective: 'Reconhecimento de Marca',
    metrics: {
      actualReach: 680000,
      predictedReach: 650000,
      actualEngagement: 46200,
      predictedEngagement: 42000,
      conversions: 890,
      roi: 4.2
    },
    dailyTrend: [
      { date: '10 Jul', actualViews: 40000, predictedViews: 38000, conversions: 50 },
      { date: '14 Jul', actualViews: 190000, predictedViews: 180000, conversions: 230 },
      { date: '18 Jul', actualViews: 420000, predictedViews: 400000, conversions: 540 },
      { date: '23 Jul', actualViews: 680000, predictedViews: 650000, conversions: 890 }
    ]
  },
  {
    id: 'camp_3',
    title: 'Gamer Headset Ultra Launch',
    brand: 'HyperGear Pro',
    budget: 25000,
    spent: 0,
    status: 'Planejamento',
    creatorsCount: 2,
    assignedCreatorIds: ['c4'],
    startDate: '2026-08-01',
    endDate: '2026-08-30',
    objective: 'Lançamento de Produto',
    metrics: {
      actualReach: 0,
      predictedReach: 320000,
      actualEngagement: 0,
      predictedEngagement: 23600,
      conversions: 0,
      roi: 3.1
    },
    dailyTrend: []
  }
];

export const INITIAL_AUTOMATIONS: AutomationRule[] = [
  {
    id: 'auto_1',
    name: 'Realocação Preditiva de Orçamento',
    trigger: 'Aumento de Engajamento Preditivo em >20%',
    condition: 'Criador A supera taxa de conversão estimada em relação aos pares',
    action: 'Injetar +15% de orçamento reservado no post de maior alta performance',
    active: true,
    executionCount: 14,
    lastExecuted: 'Hoje às 11:20',
    category: 'Orçamento'
  },
  {
    id: 'auto_2',
    name: 'Alerta de Anomalia e Fraude em Tempo Real',
    trigger: 'Spike de Seguidores / Comentários Robóticos (>4% de bots)',
    condition: 'Detector NLP identifica comentários duplicados ou contas suspeitas',
    action: 'Pausar impulso pago e notificar equipe de Brand Safety',
    active: true,
    executionCount: 2,
    lastExecuted: 'Ontem às 18:45',
    category: 'Alertas de Fraude'
  },
  {
    id: 'auto_3',
    name: 'Verificação Computacional de Compliance e FTC',
    trigger: 'Envio de rascunho de vídeo pelo Criador no Portal',
    condition: 'Visual scan valida tag #ad / #publi visível e ausência de termos proibidos',
    action: 'Aprovação automática para publicação ou envio de feedback corretivo por IA',
    active: true,
    executionCount: 28,
    lastExecuted: 'Hoje às 09:15',
    category: 'Compliance'
  },
  {
    id: 'auto_4',
    name: 'Liberação de Payout Baseado em Métricas',
    trigger: 'Publicação atinge 100% da meta de alcance prevista',
    condition: 'Post permanece ativo por 48h sem violações de contrato',
    action: 'Geração do comprovante fiscal e gatilho de pagamento automático via PIX/API',
    active: true,
    executionCount: 19,
    lastExecuted: '22/07/2026',
    category: 'Pagamentos'
  }
];

export const INFLUENCIMAX_COMPARISON = {
  traditionalSiteFeatures: [
    'Busca básica de influenciadores por nicho e contagem de seguidores',
    'Exibição de métricas históricas estáticas (Alcance passado, curtidas)',
    'Envio e aprovação manual de rascunhos de conteúdo via chat/email',
    'Exportação básica de relatórios estáticos em PDF ao final da campanha',
    'Acompanhamento de campanha reativo (sem alertas preditivos)'
  ],
  ourAdvancedPlatformFeatures: [
    'Análise Preditiva com IA Gemini para projeção de Alcance, Engajamento e ROI antes do contrato',
    'Auditoria Anti-Fraude com IA: Detecção de robôs, curva de crescimento suspeita e sincronicidade de comentários',
    'Estúdio de Automações Autônomas (Readequação orçamentária automática, travamento por compliance)',
    'Simulador Preditivo Interativo de ROI e Coeficiente Viral para orçamento customizado',
    'Validação Computacional Automática de Conteúdo (Detecção de marca, tag de publicidade e speech safety)',
    'Assistente Copilot IA dedicado para elaboração de briefings otimizados para nichos específicos'
  ]
};
