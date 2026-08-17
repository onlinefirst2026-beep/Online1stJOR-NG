import React, { useState } from 'react';
import { HubHeader } from './HubHeader';
import { HubHero } from './HubHero';
import { TransformationSection } from './TransformationSection';
import { CapabilitiesSection } from './CapabilitiesSection';
import { DemoCards } from './DemoCards';
import { PricingSection } from './PricingSection';
import { HubProcessFlow } from './HubProcessFlow';
import { SelectionSummarySection } from './SelectionSummarySection';
import { ScopeAndBenefits } from './ScopeAndBenefits';
import { ThemeVariant } from '../../types';
import { DECISION_DEADLINE } from '../../data/journalData';
import { Sparkles, ArrowRight, ShieldCheck, Download, Award, CheckCircle2, Lock, ExternalLink, MessageSquare } from 'lucide-react';

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
  const [selectedDemoChoice, setSelectedDemoChoice] = useState<ThemeVariant | null>('demo2');
  const [selectedPkg, setSelectedPkg] = useState<'basic' | 'launch' | 'professional' | 'advanced' | null>('professional');

  const handleDemoChoose = (theme: ThemeVariant) => {
    setSelectedDemoChoice(theme);
  };

  const handlePackageClick = (pkgId: 'basic' | 'launch' | 'professional' | 'advanced') => {
    setSelectedPkg(pkgId);
    onSelectPackage(pkgId);
  };

  const scrollToDemos = () => {
    const el = document.getElementById('demos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-cyan-400 selection:text-slate-950 flex flex-col">
      {/* 01. Hub Navigation Header (No admin button; clean futuristic links) */}
      <HubHeader
        onOpenDecisionModal={onOpenDecisionModal}
        onOpenOjsModal={onOpenOjsModal}
      />

      {/* 02. Welcome Hero Section */}
      <HubHero
        onOpenDecisionModal={onOpenDecisionModal}
        onOpenOjsModal={onOpenOjsModal}
      />

      {/* 03. What We Can Transform: From → To Transformation Section */}
      <TransformationSection />

      {/* 04. Explore Three Design Directions (with authentic scaled thumbnails and instant prototypes) */}
      <DemoCards
        onSelectDemo={onSelectDemo}
        selectedDemo={selectedDemoChoice}
        onChooseDesign={handleDemoChoose}
      />

      {/* 05. What the New JORMASS Can Do (6 Core Capabilities) */}
      <CapabilitiesSection />

      {/* 06. Choose an Implementation Level (Click-to-reveal pricing + expanded detail panel) */}
      <PricingSection
        onSelectPackage={handlePackageClick}
        selectedPackage={selectedPkg}
      />

      {/* 07. Institutional Scope & Benefits */}
      <ScopeAndBenefits />

      {/* 08. How We Deliver: 5-Stage Delivery Process */}
      <HubProcessFlow onOpenDecisionModal={onOpenDecisionModal} />

      {/* 09. Your Selection & Decision Summary (Real interactive selection summary box) */}
      <SelectionSummarySection
        selectedDemo={selectedDemoChoice}
        selectedPackage={selectedPkg}
        onOpenDecisionModal={onOpenDecisionModal}
        onRequestAdjustments={onOpenDecisionModal}
        onScrollToDemos={scrollToDemos}
        onScrollToPackages={scrollToPackages}
      />

      {/* 10. Formal Proposal Footer */}
      <footer className="bg-[#03050c] text-slate-400 text-xs py-14 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-10 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <span className="font-serif font-black text-white text-lg tracking-tight">
                  OnlineFirst
                </span>
                <span className="rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono font-bold px-2 py-0.5 text-[9px] uppercase tracking-wider">
                  ONLINEFIRST HUB
                </span>
              </div>
              <p className="text-slate-400 text-xs max-w-lg leading-relaxed">
                Prepared exclusively for the <strong>Journal of Research in Management and Social Sciences (JORMASS)</strong>, College of Management Sciences, Michael Okpara University of Agriculture, Umudike (MOUAU), Abia State, Nigeria.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenDecisionModal}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-3 text-xs font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition shadow-lg shadow-cyan-500/20"
              >
                <Sparkles className="h-4 w-4" />
                <span>Confirm Decision by {DECISION_DEADLINE}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} OnlineFirst Publishing Technologies. All design concepts, schemas, and proposal terms confidential to JORMASS / MOUAU.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={onOpenOjsModal} className="hover:text-cyan-300 transition">OJS Architecture Note</button>
              <span>•</span>
              <span>Target Decision: <strong className="text-cyan-300">{DECISION_DEADLINE}</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
