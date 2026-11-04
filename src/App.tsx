import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CreatorDirectoryView } from './components/CreatorDirectoryView';
import { PredictiveSimulatorView } from './components/PredictiveSimulatorView';
import { AutomationStudioView } from './components/AutomationStudioView';
import { AiBriefCopilotView } from './components/AiBriefCopilotView';
import { AudienceIntelligenceView } from './components/AudienceIntelligenceView';
import { CreativeStudioView } from './components/CreativeStudioView';
import { MetricsKpiView } from './components/MetricsKpiView';
import { IntegrationsView } from './components/IntegrationsView';
import { AcademyDemoView } from './components/AcademyDemoView';
import { InfluenciMaxAnalysisModal } from './components/InfluenciMaxAnalysisModal';
import { AiCopilotDrawer } from './components/AiCopilotDrawer';
import { CommercialPlansModal } from './components/CommercialPlansModal';
import { AiUnitEconomicsModal } from './components/AiUnitEconomicsModal';
import { PremiumSalesPageView } from './components/PremiumSalesPageView';
import { CheckoutPaymentModal } from './components/CheckoutPaymentModal';
import { PaymentGatewaySettingsModal } from './components/PaymentGatewaySettingsModal';
import { SocialLaunchKitModal } from './components/SocialLaunchKitModal';
import { ImplementationGuideModal } from './components/ImplementationGuideModal';

import { 
  INITIAL_CREATORS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_AUTOMATIONS 
} from './data/mockData';
import { Creator, Campaign, AutomationRule } from './types';

export default function App() {
  const getInitialTab = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get('tab') || params.get('page') || params.get('view');
      if (urlTab) return urlTab;
      if (window.location.hash) {
        const hashTab = window.location.hash.replace('#', '').toLowerCase();
        if (hashTab) return hashTab;
      }
    }
    return 'dashboard';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [automations, setAutomations] = useState<AutomationRule[]>(INITIAL_AUTOMATIONS);
  
  const [selectedCreatorForSim, setSelectedCreatorForSim] = useState<Creator | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [isUnitEconomicsModalOpen, setIsUnitEconomicsModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState('scale');
  const [isPaymentGatewayModalOpen, setIsPaymentGatewayModalOpen] = useState(false);
  const [isSocialKitModalOpen, setIsSocialKitModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSelectCreatorForSimulation = (creator: Creator) => {
    setSelectedCreatorForSim(creator);
    setActiveTab('simulator');
    showNotification(`Criador ${creator.name} selecionado para simulação de ROI!`);
  };

  const handleLaunchCampaignFromSimulation = (simulatedData: any) => {
    const newCamp: Campaign = {
      id: `camp_${Date.now()}`,
      title: simulatedData.title,
      brand: simulatedData.brand,
      budget: simulatedData.budget,
      spent: 0,
      status: 'Ativa',
      creatorsCount: simulatedData.assignedCreatorIds?.length || 1,
      assignedCreatorIds: simulatedData.assignedCreatorIds || ['c1'],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      objective: 'Conversões / Vendas',
      metrics: {
        actualReach: 0,
        predictedReach: simulatedData.predictedReach,
        actualEngagement: 0,
        predictedEngagement: Math.round(simulatedData.predictedReach * 0.05),
        conversions: 0,
        roi: simulatedData.predictedROI
      },
      dailyTrend: [
        { date: 'Hoje', actualViews: 0, predictedViews: 12000, conversions: 0 }
      ]
    };

    setCampaigns([newCamp, ...campaigns]);
    setActiveTab('dashboard');
    showNotification(`🚀 Campanha "${newCamp.title}" lançada com sucesso com monitoramento autônomo!`);
  };

  const handleToggleRule = (id: string) => {
    setAutomations(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.active;
        showNotification(`Regra "${a.name}" ${nextState ? 'ativada' : 'desativada'}.`);
        return { ...a, active: nextState };
      }
      return a;
    }));
  };

  const handleAddRule = (rule: AutomationRule) => {
    setAutomations([rule, ...automations]);
    showNotification(`Regra autônoma "${rule.name}" criada com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-sans flex flex-col selection:bg-indigo-600 selection:text-white bg-radial-at-t from-[#0C0C0C] via-[#080808] to-[#050505]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAnalysisModal={() => setIsAnalysisModalOpen(true)}
        onOpenPlansModal={() => setIsPlansModalOpen(true)}
        onOpenUnitEconomicsModal={() => setIsUnitEconomicsModalOpen(true)}
        onOpenPaymentGatewayModal={() => setIsPaymentGatewayModalOpen(true)}
        onOpenSocialKitModal={() => setIsSocialKitModalOpen(true)}
        onOpenImplementationGuideModal={() => setIsGuideModalOpen(true)}
        onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
        isCopilotOpen={isCopilotOpen}
        automationsActiveCount={automations.filter(a => a.active).length}
      />

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-[0_0_25px_rgba(99,102,241,0.4)] border border-indigo-500/40 flex items-center gap-2 animate-bounce">
          <span>✨ {notification}</span>
        </div>
      )}

      {/* Main Content Area or Sales Landing Page */}
      {activeTab === 'landing' ? (
        <PremiumSalesPageView
          onNavigateToApp={() => setActiveTab('dashboard')}
          onOpenGatewayGuide={() => setIsPaymentGatewayModalOpen(true)}
          onOpenSocialKit={() => setIsSocialKitModalOpen(true)}
        />
      ) : (
        <>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'dashboard' && (
              <DashboardView
                campaigns={campaigns}
                creators={creators}
                automations={automations}
                onNavigateToSimulator={() => setActiveTab('simulator')}
                onNavigateToAutomations={() => setActiveTab('automations')}
                onNavigateToDirectory={() => setActiveTab('directory')}
              />
            )}

            {activeTab === 'directory' && (
              <CreatorDirectoryView
                creators={creators}
                onSelectCreatorForSimulation={handleSelectCreatorForSimulation}
              />
            )}

            {activeTab === 'simulator' && (
              <PredictiveSimulatorView
                creators={creators}
                initialSelectedCreator={selectedCreatorForSim}
                onLaunchCampaign={handleLaunchCampaignFromSimulation}
              />
            )}

            {activeTab === 'automations' && (
              <AutomationStudioView
                automations={automations}
                onToggleRule={handleToggleRule}
                onAddRule={handleAddRule}
              />
            )}

            {activeTab === 'briefing' && (
              <AiBriefCopilotView />
            )}

            {activeTab === 'audience' && (
              <AudienceIntelligenceView 
                onNavigateToSimulator={() => setActiveTab('simulator')}
                onNotification={showNotification}
              />
            )}
            {activeTab === 'creatives' && (
              <CreativeStudioView 
                onNotification={showNotification}
              />
            )}
            {activeTab === 'metrics' && (
              <MetricsKpiView 
                onNotification={showNotification}
              />
            )}
            {activeTab === 'integrations' && (
              <IntegrationsView 
                onNotification={showNotification}
              />
            )}
            {activeTab === 'academy' && (
              <AcademyDemoView 
                onNavigateToTab={(tab) => setActiveTab(tab)}
                onNotification={showNotification}
              />
            )}
          </main>

          {/* Footer */}
          <footer className="bg-[#080808] border-t border-[#1F1F1F] text-[#666666] text-xs py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
              <p className="font-serif italic text-sm text-[#888888]">
                InfluenciMax Pro — Executive Predictive Intelligence & Autonomous Campaign Engine
              </p>
              <p className="text-[10px] font-mono text-[#555555]">
                © {new Date().getFullYear()} InfluenciMax AI. Advanced neural audience synthesis & computer vision audit.
              </p>
            </div>
          </footer>
        </>
      )}

      {/* Modals & Drawers */}
      <CommercialPlansModal
        isOpen={isPlansModalOpen}
        onClose={() => setIsPlansModalOpen(false)}
        onSelectPlan={(plan) => {
          setIsPlansModalOpen(false);
          const mapped = plan.toLowerCase().includes('starter') ? 'starter' : plan.toLowerCase().includes('scale') ? 'scale' : plan.toLowerCase().includes('growth') ? 'growth' : 'enterprise';
          setCheckoutPlanId(mapped);
          setIsCheckoutModalOpen(true);
        }}
      />

      <CheckoutPaymentModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        selectedPlanId={checkoutPlanId}
        onSuccess={(orderData) => {
          showNotification(`🚀 Assinatura do ${orderData.plan} confirmada com sucesso! Licença ativada.`);
        }}
      />

      <PaymentGatewaySettingsModal
        isOpen={isPaymentGatewayModalOpen}
        onClose={() => setIsPaymentGatewayModalOpen(false)}
        onNotification={showNotification}
      />

      <SocialLaunchKitModal
        isOpen={isSocialKitModalOpen}
        onClose={() => setIsSocialKitModalOpen(false)}
        onNotification={showNotification}
      />

      <ImplementationGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onNotification={showNotification}
      />

      <AiUnitEconomicsModal
        isOpen={isUnitEconomicsModalOpen}
        onClose={() => setIsUnitEconomicsModalOpen(false)}
      />

      <InfluenciMaxAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
      />

      <AiCopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  );
}
