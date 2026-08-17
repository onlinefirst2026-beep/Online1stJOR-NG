import React from 'react';
import { ArrowRight, Sparkles, AlertCircle, CheckCircle2, Zap, Layers, RefreshCw, Cpu } from 'lucide-react';

export const TransformationSection: React.FC = () => {
  return (
    <section id="from-to" className="py-20 bg-[#070b16] relative border-b border-slate-800/80 overflow-hidden text-slate-100">
      {/* Background ambient neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
            <RefreshCw className="h-3.5 w-3.5 text-cyan-400 animate-spin-slow" />
            <span>Strategic Transformation Analysis</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            From Generic Archive to <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Digital Journal Authority</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            OnlineFirst's redesign elevates JORMASS from a default journal-management interface into a distinguished, high-impact scholarly publishing ecosystem.
          </p>
        </div>

        {/* Transformation Grid: Left (Current) -> Center (Indicator) -> Right (Future) */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
          {/* LEFT: Current JORMASS (5 cols on lg) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-5 relative shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold">
                  Existing Status
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-200 mt-0.5">
                  Current JORMASS Setup
                </h3>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
                OLD
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Based on the technical review of the current public site, several structural limitations impede author engagement and reader discovery:
            </p>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold mt-0.5">✕</span>
                <span><strong>Default OJS Template:</strong> Generic aesthetic that lacks the unique prestige of the College of Management Sciences.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold mt-0.5">✕</span>
                <span><strong>Opaque Research Discovery:</strong> Absence of real-time category filtering, title keyword search, and metadata previews.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold mt-0.5">✕</span>
                <span><strong>Stale Announcements & Events:</strong> Static bulletin posts with no dedicated academic conference or lecture calendar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold mt-0.5">✕</span>
                <span><strong>Administrative Dependency:</strong> Routine content updates require technical code changes or complex OJS backends.</span>
              </li>
            </ul>
          </div>

          {/* CENTER: Glowing Transformation Indicator (1 col on lg) */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-2 lg:py-0">
            <div className="flex lg:flex-col items-center gap-2">
              <div className="h-0.5 lg:h-12 w-12 lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-70 blur-md animate-pulse" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 border border-cyan-400 text-cyan-300 shadow-xl">
                  <Zap className="h-5 w-5 text-cyan-300" />
                </div>
              </div>
              <div className="h-0.5 lg:h-12 w-12 lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
            </div>
            <span className="text-[9px] font-mono uppercase font-black tracking-widest text-cyan-400 mt-2 text-center">
              ONLINEFIRST<br />REDESIGN
            </span>
          </div>

          {/* RIGHT: Future JORMASS (5 cols on lg) */}
          <div className="lg:col-span-5 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-blue-950/40 backdrop-blur-xl p-6 sm:p-8 space-y-5 relative shadow-2xl ring-1 ring-cyan-500/20">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-cyan-300" />
                  Proposed Modernization
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                  Future JORMASS Platform
                </h3>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
                NEW
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              OnlineFirst delivers a purpose-engineered academic platform that preserves existing OJS workflows while radically advancing the reader experience:
            </p>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span><strong>Distinct Institutional Authority:</strong> 3 structurally distinct international-grade design directions reflecting MOUAU excellence.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span><strong>Searchable Digital Archive:</strong> Interactive keyword discovery, volume/issue browsing, and citation generators.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span><strong>Events & Colloquiums Hub:</strong> Dedicated management for conferences, public lectures, workshops, and calls for papers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span><strong>Autonomous Editorial CMS:</strong> Staff can publish articles, update dates, and edit journal policies instantly without code.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
