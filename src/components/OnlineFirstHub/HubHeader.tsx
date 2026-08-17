import React, { useState } from 'react';
import { DECISION_DEADLINE } from '../../data/journalData';
import {
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  Menu,
  X,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface HubHeaderProps {
  onOpenDecisionModal: () => void;
  onOpenOjsModal: () => void;
}

export const HubHeader: React.FC<HubHeaderProps> = ({
  onOpenDecisionModal,
  onOpenOjsModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#050811]/90 backdrop-blur-xl border-b border-slate-800/80 text-slate-100 shadow-xl transition-all">
      {/* Top micro-banner */}
      <div className="bg-gradient-to-r from-cyan-950/70 via-blue-950/70 to-slate-950/80 border-b border-cyan-500/20 px-4 py-1.5 text-[11px] text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-medium text-slate-300">
              Institutional Redesign Proposal for <strong>JORMASS</strong> (MOUAU COLMAS)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden sm:inline text-slate-400">
              Decision Deadline: <strong className="text-cyan-300">{DECISION_DEADLINE}</strong>
            </span>
            <button
              onClick={onOpenOjsModal}
              className="text-cyan-400 hover:text-cyan-300 underline font-semibold transition"
            >
              OJS Continuity Note
            </button>
          </div>
        </div>
      </div>

      {/* Main Hub Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand identity: "OnlineFirst" with "ONLINEFIRST HUB" small badge */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-xl tracking-tight text-white">
                OnlineFirst
              </span>
              <span className="rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                ONLINEFIRST HUB
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Academic Publishing Systems & Design
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => scrollTo('from-to')}
            className="hover:text-cyan-300 transition"
          >
            From → To
          </button>
          <button
            onClick={() => scrollTo('capabilities')}
            className="hover:text-cyan-300 transition"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollTo('demos')}
            className="hover:text-cyan-300 transition"
          >
            3 Design Concepts
          </button>
          <button
            onClick={() => scrollTo('packages')}
            className="hover:text-cyan-300 transition"
          >
            Implementation Tiers
          </button>
          <button
            onClick={() => scrollTo('process')}
            className="hover:text-cyan-300 transition"
          >
            Delivery Roadmap
          </button>
          <button
            onClick={() => scrollTo('selection')}
            className="hover:text-cyan-300 transition text-cyan-300 font-bold"
          >
            Your Selection
          </button>
        </nav>

        {/* Right CTA: Action to Confirm Direction */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('selection')}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition shadow-md shadow-cyan-500/10"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Confirm Direction</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 rounded-lg hover:bg-slate-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#050811] px-4 py-4 space-y-2 text-xs">
          <button
            onClick={() => scrollTo('from-to')}
            className="block w-full text-left rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800"
          >
            From → To Transformation
          </button>
          <button
            onClick={() => scrollTo('capabilities')}
            className="block w-full text-left rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800"
          >
            Platform Capabilities
          </button>
          <button
            onClick={() => scrollTo('demos')}
            className="block w-full text-left rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800"
          >
            Explore 3 Design Concepts
          </button>
          <button
            onClick={() => scrollTo('packages')}
            className="block w-full text-left rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800"
          >
            Implementation Packages & Pricing
          </button>
          <button
            onClick={() => scrollTo('process')}
            className="block w-full text-left rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800"
          >
            5-Stage Delivery Process
          </button>
          <button
            onClick={() => scrollTo('selection')}
            className="block w-full text-left rounded-lg px-3 py-2 font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50"
          >
            Your Selection & Confirmation
          </button>
        </div>
      )}
    </header>
  );
};
