import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Calendar,
  Layers,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  ExternalLink,
} from 'lucide-react';
import { DECISION_DEADLINE } from '../../data/journalData';

interface HubHeroProps {
  onOpenDecisionModal: () => void;
  onOpenOjsModal: () => void;
}

export const HubHero: React.FC<HubHeroProps> = ({
  onOpenDecisionModal,
  onOpenOjsModal,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#050811] text-slate-100 py-20 sm:py-28 border-b border-slate-800/80">
      {/* High-tech radial background grids and neon orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        {/* Small pill: ONLINEFIRST AI STUDIO */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 backdrop-blur-xl px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-cyan-300 shadow-lg shadow-cyan-500/10">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>ONLINEFIRST AI STUDIO</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-sans font-medium text-[11px]">Academic Systems Engineering</span>
        </div>

        {/* Main headlines */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Welcome to OnlineFirst
          </h1>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent leading-tight">
            Reimagining the Digital Future of JORMASS
          </h2>
        </div>

        {/* Supporting text */}
        <p className="mx-auto max-w-3xl text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
          Following our review of the existing JORMASS website, OnlineFirst has developed three distinct digital directions designed to strengthen the journal's academic credibility, improve research discovery and give its editorial team greater control over publications, events and ongoing content.
        </p>

        {/* Supporting microcopy: Explore · Compare · Select · Build */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold tracking-widest text-cyan-400/90 uppercase">
          <span>Explore</span>
          <span className="text-slate-600">•</span>
          <span>Compare</span>
          <span className="text-slate-600">•</span>
          <span>Select</span>
          <span className="text-slate-600">•</span>
          <span>Build</span>
        </div>

        {/* Primary and Secondary CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => scrollTo('demos')}
            className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-4 text-xs sm:text-sm font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-xl shadow-cyan-500/20 hover:scale-[1.02] cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-slate-950" />
            <span>Explore the 3 Concepts ↓</span>
          </button>

          <button
            onClick={() => scrollTo('packages')}
            className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl px-7 py-4 text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all shadow-md cursor-pointer"
          >
            <span>View Proposal Packages</span>
            <ArrowRight className="h-4 w-4 text-cyan-400" />
          </button>
        </div>

        {/* Optional subtle text */}
        <p className="text-[11px] sm:text-xs text-slate-400 font-mono tracking-wider pt-2">
          Website Design · Academic Publishing · AI-Assisted Digital Experiences
        </p>

        {/* High-tech Architecture Chips */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1 backdrop-blur-md">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">MOUAU COLMAS</span>
            <p className="text-xs font-bold text-white">Full Institutional Alignment</p>
            <p className="text-[10px] text-slate-400">Umudike, Nigeria</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1 backdrop-blur-md">
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">3 LIVE DEMOS</span>
            <p className="text-xs font-bold text-white">Interactive Prototypes</p>
            <p className="text-[10px] text-slate-400">All pages navigable</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1 backdrop-blur-md">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">EDITORIAL CMS</span>
            <p className="text-xs font-bold text-white">Staff Autonomy</p>
            <p className="text-[10px] text-slate-400">Manage issues & events</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1 backdrop-blur-md">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">DECISION WINDOW</span>
            <p className="text-xs font-bold text-white">Due {DECISION_DEADLINE}</p>
            <p className="text-[10px] text-slate-400">Guaranteed pricing</p>
          </div>
        </div>
      </div>
    </section>
  );
};
