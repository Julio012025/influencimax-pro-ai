export type PlatformType = 'instagram' | 'tiktok' | 'youtube' | 'linkedin';

export type NicheType = 'Tecnologia' | 'Moda & Beleza' | 'Fitness & Saúde' | 'Finanças' | 'Gaming' | 'Gastronomia' | 'Educação' | 'Viagens' | 'Odontologia' | 'Medicina' | 'Engenharia' | 'Entretenimento';

export interface CreatorDemographics {
  genderRatio: { male: number; female: number; other: number };
  topLocations: { country: string; percentage: number }[];
  ageRanges: { range: string; percentage: number }[];
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: NicheType;
  platforms: PlatformType[];
  followersCount: number;
  engagementRate: number; // e.g. 4.8 for 4.8%
  authenticityScore: number; // 0 - 100
  predictiveScore: number; // 0 - 100 (AI prediction of campaign success)
  estReach: number;
  avgCPM: number; // R$
  avgCPA: number; // R$
  demographics: CreatorDemographics;
  recentGrowthRate: number; // % in 30 days
  pricePerPost: number; // R$
  verified: boolean;
  botPercentage: number; // e.g. 2.1%
  sentimentScore: number; // e.g. 92% positive
  topInterests: string[];
}

export interface Campaign {
  id: string;
  title: string;
  brand: string;
  budget: number;
  spent: number;
  status: 'Ativa' | 'Planejamento' | 'Concluída' | 'Pausada';
  creatorsCount: number;
  assignedCreatorIds: string[];
  startDate: string;
  endDate: string;
  objective: 'Reconhecimento de Marca' | 'Conversões / Vendas' | 'Engajamento' | 'Lançamento de Produto';
  metrics: {
    actualReach: number;
    predictedReach: number;
    actualEngagement: number;
    predictedEngagement: number;
    conversions: number;
    roi: number; // e.g. 3.4 for 3.4x
  };
  dailyTrend: {
    date: string;
    actualViews: number;
    predictedViews: number;
    conversions: number;
  }[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  active: boolean;
  executionCount: number;
  lastExecuted: string;
  category: 'Orçamento' | 'Compliance' | 'Alertas de Fraude' | 'Pagamentos' | 'Engajamento';
}

export interface SimulationResult {
  predictedReach: number;
  predictedEngagement: number;
  predictedConversions: number;
  estimatedROI: number;
  viralProbability: number; // %
  recommendedMix: {
    creatorId: string;
    suggestedBudget: number;
    expectedDeliverables: string;
  }[];
  audienceOverlap: number; // %
  topRiskFactor: string;
  aiStrategicInsights: string[];
}

export interface ComplianceResult {
  passed: boolean;
  brandLogoDetected: boolean;
  ftcDisclosurePresent: boolean;
  bannedWordsFound: string[];
  sentimentAlignment: number; // %
  recommendation: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
