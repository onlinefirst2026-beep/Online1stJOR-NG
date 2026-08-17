import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  Menu,
  X,
  FileText,
  HelpCircle,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { DECISION_DEADLINE } from '../../data/journalData';

interface HubHeaderProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenDecisionModal: () => void;
  onOpenOjsModal: () => void;
}

export const HubHeader: React.FC<HubHeaderProps> = ({
  onNavigateSection,
  onOpenDecisionModal,
  onOpenOjsModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
    const workspaceEl = document.getElementById('proposal-workspace');
    if (workspaceEl) {
      workspaceEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0E1A2B]/90 backdrop-blur-2xl border-b border-[#223753] text-[#F5FAFF] shadow-2xl transition-all">
      {/* Top micro-banner */}
      <div className="bg-gradient-to-r from-[#14263D]/90 via-[#1A2E47]/90 to-[#0E1A2B]/95 border-b border-[#35D6FF]/20 px-4 py-1.5 text-[11px] text-[#B7C6D8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#35D6FF] animate-pulse shadow-[0_0_8px_#35D6FF]" />
            <span className="font-medium text-[#D8F3FF]">
              Institutional Redesign Proposal for <strong>JORMASS</strong> (MOUAU COLMAS)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden sm:inline text-[#B7C6D8]">
              Decision Deadline: <strong className="text-[#35D6FF] font-semibold">{DECISION_DEADLINE}</strong>
            </span>
            <button
              onClick={onOpenOjsModal}
              className="text-[#7BE7FF] hover:text-[#D8F3FF] underline font-semibold transition cursor-pointer"
            >
              OJS Continuity Note
            </button>
          </div>
        </div>
      </div>

      {/* Main Hub Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand identity: "OnlineFirst Studio" with "ONLINEFIRST HUB" small badge */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="font-serif font-black text-xl tracking-tight text-[#F5FAFF]">
                OnlineFirst Studio
              </span>
              <span className="rounded-full bg-[#35D6FF]/15 border border-[#35D6FF]/40 text-[#7BE7FF] font-mono text-[9px] font-bold px-2.5 py-0.5 uppercase tracking-wider shadow-[0_0_10px_rgba(53,214,255,0.15)]">
                ONLINEFIRST HUB
              </span>
            </div>
            <span className="text-[10px] text-[#B7C6D8] font-mono tracking-wide">
              ONLINEFIRST STUDIO | Academic Systems Engineering
            </span>
          </div>
        </div>

        {/* Simplified Center Nav: Proposal, From → To, Design Concepts, Capabilities, Implementation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#B7C6D8]">
          <button
            onClick={() => handleNavClick('why-redesign')}
            className="hover:text-[#35D6FF] transition cursor-pointer"
          >
            Why Redesign
          </button>
          <button
            onClick={() => handleNavClick('what-changes')}
            className="hover:text-[#35D6FF] transition cursor-pointer"
          >
            From → To
          </button>
          <button
            onClick={() => handleNavClick('design-concepts')}
            className="hover:text-[#35D6FF] transition cursor-pointer"
          >
            Design Concepts
          </button>
          <button
            onClick={() => handleNavClick('website-capabilities')}
            className="hover:text-[#35D6FF] transition cursor-pointer"
          >
            Capabilities
          </button>
          <button
            onClick={() => handleNavClick('implementation-options')}
            className="hover:text-[#35D6FF] transition cursor-pointer"
          >
            Implementation Tiers
          </button>
          <button
            onClick={() => handleNavClick('your-selection')}
            className="hover:text-[#35D6FF] transition text-[#35D6FF] font-bold cursor-pointer"
          >
            Your Selection
          </button>
        </nav>

        {/* Right CTA: Action to Confirm Direction */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              handleNavClick('decision-next-step');
            }}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-4 py-2 text-xs font-black text-[#0A121E] hover:shadow-[0_0_20px_rgba(53,214,255,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Confirm Direction</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#B7C6D8] rounded-lg hover:bg-[#14263D] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#223753] bg-[#0E1A2B] px-4 py-4 space-y-2 text-xs">
          <button
            onClick={() => handleNavClick('why-redesign')}
            className="block w-full text-left rounded-lg px-3 py-2 text-[#F5FAFF] hover:bg-[#14263D]"
          >
            1. Why Redesign
          </button>
          <button
            onClick={() => handleNavClick('what-changes')}
            className="block w-full text-left rounded-lg px-3 py-2 text-[#F5FAFF] hover:bg-[#14263D]"
          >
            2. From → To
          </button>
          <button
            onClick={() => handleNavClick('design-concepts')}
            className="block w-full text-left rounded-lg px-3 py-2 text-[#F5FAFF] hover:bg-[#14263D]"
          >
            3. Design Concepts (Demo 1, 2, 3)
          </button>
          <button
            onClick={() => handleNavClick('website-capabilities')}
            className="block w-full text-left rounded-lg px-3 py-2 text-[#F5FAFF] hover:bg-[#14263D]"
          >
            4. Capabilities
          </button>
          <button
            onClick={() => handleNavClick('implementation-options')}
            className="block w-full text-left rounded-lg px-3 py-2 text-[#F5FAFF] hover:bg-[#14263D]"
          >
            5. Implementation Tiers
          </button>
          <button
            onClick={() => handleNavClick('delivery-process')}
            className="block w-full text-left rounded-lg px-3 py-2 text-[#F5FAFF] hover:bg-[#14263D]"
          >
            6. Delivery Roadmap
          </button>
          <button
            onClick={() => handleNavClick('your-selection')}
            className="block w-full text-left rounded-lg px-3 py-2 text-[#F5FAFF] hover:bg-[#14263D]"
          >
            7. Your Selection
          </button>
          <button
            onClick={() => handleNavClick('decision-next-step')}
            className="block w-full text-left rounded-lg px-3 py-2 font-bold text-[#35D6FF] bg-[#14263D] border border-[#35D6FF]/30"
          >
            8. Confirm Direction (Due {DECISION_DEADLINE})
          </button>
        </div>
      )}
    </header>
  );
};
