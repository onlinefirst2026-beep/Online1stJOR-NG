import React, { useState } from 'react';
import { HubHeader } from './HubHeader';
import { HubHero } from './HubHero';
import { ProposalWorkspace, ProposalSectionId } from './ProposalWorkspace';
import { ThemeVariant } from '../../types';
import { DECISION_DEADLINE } from '../../data/journalData';
import { Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-cyan-400 selection:text-slate-950 flex flex-col">
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
      <footer className="bg-[#03050c] text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <span className="font-serif font-black text-white text-lg tracking-tight">
                  OnlineFirst Studio
                </span>
                <span className="rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono font-bold px-2 py-0.5 text-[9px] uppercase tracking-wider">
                  ONLINEFIRST HUB
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                ONLINEFIRST STUDIO | Academic Systems Engineering. Prepared exclusively for the <strong>Journal of Research in Management and Social Sciences (JORMASS)</strong>, College of Management Sciences (COLMAS), Michael Okpara University of Agriculture, Umudike (MOUAU), Abia State, Nigeria.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                onClick={onOpenDecisionModal}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-3 text-xs font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Confirm Decision by {DECISION_DEADLINE}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} OnlineFirst Studio. All design concepts, schemas, and proposal terms confidential to JORMASS / MOUAU.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={onOpenOjsModal} className="hover:text-cyan-300 transition cursor-pointer">
                OJS Continuity Note
              </button>
              <span>•</span>
              <span>Target Decision: <strong className="text-cyan-300">{DECISION_DEADLINE}</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
