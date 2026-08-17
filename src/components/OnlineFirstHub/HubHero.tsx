import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  CheckCircle2,
  FileText,
  Terminal,
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
    <section className="relative overflow-hidden bg-transparent text-[#F5FAFF] py-14 sm:py-20 border-b border-[#223753]/80">
      {/* Luminous Glow & Blueprint Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-r from-[#35D6FF]/15 via-[#56E0FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-7 text-center">
        {/* Brand & Context Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#35D6FF]/40 bg-[#14263D]/80 backdrop-blur-xl px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-[#7BE7FF] shadow-[0_0_15px_rgba(53,214,255,0.15)]">
          <span className="h-2 w-2 rounded-full bg-[#35D6FF] animate-pulse shadow-[0_0_8px_#35D6FF]" />
          <span className="font-bold">ONLINEFIRST HUB</span>
          <span className="text-[#314A68]">|</span>
          <span className="text-[#B7C6D8] font-sans font-medium text-[11px]">
            ONLINEFIRST STUDIO | Academic Systems Engineering
          </span>
        </div>

        {/* Main Headlines */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5FAFF] leading-[1.12]">
            Welcome to OnlineFirst
          </h1>

          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#35D6FF] via-[#7BE7FF] to-[#90CDF4] bg-clip-text text-transparent leading-tight">
            Reimagining the Digital Future of JORMASS
          </h2>
        </div>

        {/* Short supporting paragraph */}
        <p className="mx-auto max-w-2xl text-xs sm:text-sm lg:text-base text-[#B7C6D8] leading-relaxed font-normal">
          Following our review of the existing JORMASS website, OnlineFirst has developed three distinct digital directions to strengthen academic credibility, accelerate research discovery, and give the editorial team full autonomy over publications and events.
        </p>

        {/* Two clean CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onExploreConcepts}
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-7 py-3.5 text-xs sm:text-sm font-black text-[#0A121E] hover:shadow-[0_0_25px_rgba(53,214,255,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-[#0A121E]" />
            <span>Explore the 3 Concepts</span>
          </button>

          <button
            onClick={onViewProposal}
            className="inline-flex items-center gap-2.5 rounded-xl border border-[#314A68] bg-[#14263D]/80 backdrop-blur-xl px-7 py-3.5 text-xs sm:text-sm font-bold text-[#D8F3FF] hover:bg-[#223753] hover:text-white hover:border-[#35D6FF]/50 transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <FileText className="h-4 w-4 text-[#35D6FF]" />
            <span>View Proposal</span>
          </button>
        </div>
      </div>
    </section>
  );
};
