import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { DECISION_DEADLINE } from '../../data/journalData';

interface HubHeroProps {
  onExploreConcepts: () => void;
  onViewProposal: () => void;
}

export const HubHero: React.FC<HubHeroProps> = ({
  onExploreConcepts,
  onViewProposal,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#050811] text-slate-100 py-12 sm:py-16 border-b border-slate-800/80">
      {/* High-tech radial background grids and neon orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 backdrop-blur-xl px-4 py-1 text-xs font-mono font-bold tracking-wider text-cyan-300 shadow-lg shadow-cyan-500/10">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold">ONLINEFIRST HUB</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-sans font-medium text-[11px]">
            ONLINEFIRST STUDIO | Academic Systems Engineering
          </span>
        </div>

        {/* Main headlines */}
        <div className="space-y-2 max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Welcome to OnlineFirst
          </h1>

          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent leading-tight">
            Reimagining the Digital Future of JORMASS
          </h2>
        </div>

        {/* Short supporting paragraph */}
        <p className="mx-auto max-w-2xl text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-normal">
          Following our review of the existing JORMASS website, OnlineFirst has developed three distinct digital directions to strengthen academic credibility, accelerate research discovery, and give the editorial team full autonomy over publications and events.
        </p>

        {/* Two clean CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExploreConcepts}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-3 text-xs sm:text-sm font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-xl shadow-cyan-500/20 hover:scale-[1.02] cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-slate-950" />
            <span>Explore the 3 Concepts</span>
          </button>

          <button
            onClick={onViewProposal}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl px-6 py-3 text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all shadow-md cursor-pointer"
          >
            <FileText className="h-4 w-4 text-cyan-400" />
            <span>View Proposal</span>
          </button>
        </div>
      </div>
    </section>
  );
};
