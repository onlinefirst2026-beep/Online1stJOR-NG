import React, { useState } from 'react';
import { HubHeader } from './HubHeader';
import { HubHero } from './HubHero';
import { ProposalWorkspace, ProposalSectionId } from './ProposalWorkspace';
import { PredictiveAiAtmosphere } from './PredictiveAiAtmosphere';
import { ThemeVariant } from '../../types';
import { DECISION_DEADLINE } from '../../data/journalData';
import { Sparkles, Calendar, ArrowUp } from 'lucide-react';

interface ProposalHubProps {
  onSelectDemo: (theme: ThemeVariant) => void;
  onSelectPackage: (pkgId: 'basic' | 'launch' | 'professional' | 'advanced') => void;
  onOpenDecisionModal: () => void;
  onOpenOjsModal: () => void;
}

export const ProposalHub: React.FC<ProposalHubProps> = ({
  onSelectDemo,
  onSelectPackage,
  onOpenDecisionModal,
  onOpenOjsModal,
}) => {
  // Default open section is 01 — Why Redesign
  const [activeSection, setActiveSection] = useState<ProposalSectionId>('why-redesign');
  const [selectedDemoChoice, setSelectedDemoChoice] = useState<ThemeVariant | null>('demo2');
  const [selectedPkg, setSelectedPkg] = useState<'basic' | 'launch' | 'professional' | 'advanced' | null>('professional');

  const handleDemoChoose = (theme: ThemeVariant) => {
    setSelectedDemoChoice(theme);
  };

  const handlePackageClick = (pkgId: 'basic' | 'launch' | 'professional' | 'advanced') => {
    setSelectedPkg(pkgId);
    onSelectPackage(pkgId);
  };

  const scrollToWorkspaceAndSet = (sectionId: ProposalSectionId) => {
    setActiveSection(sectionId);
    const workspaceEl = document.getElementById('proposal-workspace');
    if (workspaceEl) {
      workspaceEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A121E] text-[#F5FAFF] font-sans selection:bg-[#35D6FF] selection:text-[#0A121E] flex flex-col relative overflow-x-hidden">
      {/* Predictive Floating AI Background Environment */}
      <PredictiveAiAtmosphere />

      {/* Foreground Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 01. Hub Navigation Header */}
        <HubHeader
          onNavigateSection={(sec) => scrollToWorkspaceAndSet(sec as ProposalSectionId)}
          onOpenDecisionModal={onOpenDecisionModal}
          onOpenOjsModal={onOpenOjsModal}
        />

        {/* 02. Compact Welcome Hero Section */}
        <HubHero
          onExploreConcepts={() => scrollToWorkspaceAndSet('design-concepts')}
          onViewProposal={() => scrollToWorkspaceAndSet('why-redesign')}
        />

        {/* 03. Interactive Proposal Workspace (Left vertical menu + Right single active panel) */}
        <ProposalWorkspace
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          selectedDemoChoice={selectedDemoChoice}
          onSelectDemoChoice={handleDemoChoose}
          onLaunchDemoPrototype={onSelectDemo}
          selectedPkg={selectedPkg}
          onSelectPackage={handlePackageClick}
          onOpenDecisionModal={onOpenDecisionModal}
          onOpenOjsModal={onOpenOjsModal}
        />

        {/* 04. Formal Proposal Footer */}
        <footer className="mt-auto bg-[#070D16]/95 backdrop-blur-xl text-[#B7C6D8] text-xs py-12 border-t border-[#223753]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#223753] pb-8 text-center md:text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2.5">
                  <span className="font-serif font-black text-[#F5FAFF] text-lg tracking-tight">
                    OnlineFirst Studio
                  </span>
                  <span className="rounded-full bg-[#35D6FF]/15 border border-[#35D6FF]/40 text-[#7BE7FF] font-mono font-bold px-2.5 py-0.5 text-[9px] uppercase tracking-wider">
                    ONLINEFIRST HUB
                  </span>
                </div>
                <p className="text-[#B7C6D8] text-xs max-w-xl leading-relaxed">
                  ONLINEFIRST STUDIO | Academic Systems Engineering. Prepared exclusively for the <strong>Journal of Research in Management and Social Sciences (JORMASS)</strong>, College of Management Sciences (COLMAS), Michael Okpara University of Agriculture, Umudike (MOUAU), Abia State, Nigeria.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  onClick={onOpenDecisionModal}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-3 text-xs font-black text-[#0A121E] hover:shadow-[0_0_20px_rgba(53,214,255,0.4)] transition cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Confirm Decision by {DECISION_DEADLINE}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#B7C6D8]">
              <p>
                © 2026 OnlineFirst Studio. All intellectual property, architectural blueprints, and interactive prototypes reserved.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-1 text-[#7BE7FF] hover:text-white transition cursor-pointer"
                >
                  <span>Back to top</span>
                  <ArrowUp className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
