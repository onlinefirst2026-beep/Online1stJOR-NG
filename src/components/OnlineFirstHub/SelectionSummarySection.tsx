import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Calendar, Clock, MessageSquare, Lock } from 'lucide-react';
import { ThemeVariant } from '../../types';
import { DECISION_DEADLINE } from '../../data/journalData';

interface SelectionSummarySectionProps {
  selectedDemo: ThemeVariant | null;
  selectedPackage: 'basic' | 'launch' | 'professional' | 'advanced' | null;
  onOpenDecisionModal: () => void;
  onRequestAdjustments: () => void;
  onScrollToDemos: () => void;
  onScrollToPackages: () => void;
}

export const SelectionSummarySection: React.FC<SelectionSummarySectionProps> = ({
  selectedDemo,
  selectedPackage,
  onOpenDecisionModal,
  onRequestAdjustments,
  onScrollToDemos,
  onScrollToPackages,
}) => {
  const demoTitles: Record<ThemeVariant, { name: string; tag: string }> = {
    demo1: { name: 'Demo 1', tag: 'Heritage Academic' },
    demo2: { name: 'Demo 2', tag: 'Contemporary Research' },
    demo3: { name: 'Demo 3', tag: 'Editorial Digital Library' },
  };

  const packageDetails: Record<
    'basic' | 'launch' | 'professional' | 'advanced',
    { name: string; title: string; price: string }
  > = {
    basic: { name: 'BASIC', title: 'Design & Handover', price: '₦250,000' },
    launch: { name: 'LAUNCH', title: 'Managed Website (2-Yr Cloud)', price: '₦350,000' },
    professional: { name: 'PROFESSIONAL', title: 'Journal CMS Platform (Recommended)', price: '₦485,000' },
    advanced: { name: 'ADVANCED', title: 'Enterprise Digital Platform', price: 'From ₦650,000' },
  };

  const isComplete = Boolean(selectedDemo && selectedPackage);

  return (
    <section id="selection" className="py-20 bg-[#070b16] relative border-b border-slate-800/80 text-slate-100 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-600/10 via-blue-600/15 to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive Decision Summary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Your Selected Direction
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Review your chosen design prototype and implementation tier before submitting your institutional confirmation.
          </p>
        </div>

        {/* The Live Summary Card */}
        <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-blue-950/40 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Step 1: Design Choice */}
            <div className="space-y-3 pt-4 md:pt-0 md:pr-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
                <span>01. Design Concept</span>
              </span>
              {selectedDemo ? (
                <div className="space-y-1">
                  <p className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{demoTitles[selectedDemo].name}</span>
                  </p>
                  <p className="text-xs text-cyan-300 font-medium">
                    {demoTitles[selectedDemo].tag}
                  </p>
                  <button
                    onClick={onScrollToDemos}
                    className="text-[11px] text-slate-400 hover:text-cyan-300 underline pt-1 block"
                  >
                    Change design concept
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-amber-300/90 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>No design selected yet</span>
                  </p>
                  <button
                    onClick={onScrollToDemos}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
                  >
                    <span>Choose from 3 Demos ↑</span>
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Implementation Package */}
            <div className="space-y-3 pt-4 md:pt-0 md:px-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                02. Implementation Package
              </span>
              {selectedPackage ? (
                <div className="space-y-1">
                  <p className="font-serif text-xl font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{packageDetails[selectedPackage].name}</span>
                  </p>
                  <p className="text-xs text-cyan-300 font-medium">
                    {packageDetails[selectedPackage].title}
                  </p>
                  <button
                    onClick={onScrollToPackages}
                    className="text-[11px] text-slate-400 hover:text-cyan-300 underline pt-1 block"
                  >
                    Change package tier
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-amber-300/90 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>No package selected yet</span>
                  </p>
                  <button
                    onClick={onScrollToPackages}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline"
                  >
                    <span>Choose a package level ↑</span>
                  </button>
                </div>
              )}
            </div>

            {/* Step 3: Investment & Deadline */}
            <div className="space-y-3 pt-4 md:pt-0 md:pl-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                03. Total Investment
              </span>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedPackage ? packageDetails[selectedPackage].price : '—'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {selectedPackage ? 'Transparent one-time investment' : 'Select a package to view total'}
                </p>
              </div>
            </div>
          </div>

          {/* Decision Deadline Banner Marker */}
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="space-y-0.5 text-center sm:text-left">
                <p className="font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
                  <span>Decision Window:</span>
                  <span className="text-cyan-300 font-mono">Review & confirm by {DECISION_DEADLINE}</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  If additional internal consultation is required, please contact OnlineFirst before this date.
                </p>
              </div>
            </div>

            <span className="rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-3 py-1 font-mono text-[10px] font-bold shrink-0">
              Guaranteed Pricing Validity
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={onRequestAdjustments}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition"
            >
              <MessageSquare className="h-4 w-4 text-slate-400" />
              <span>Request Custom Adjustments</span>
            </button>

            <button
              onClick={onOpenDecisionModal}
              disabled={!isComplete}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-xs font-black shadow-xl transition-all ${
                isComplete
                  ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 cursor-pointer ring-2 ring-cyan-400/50'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <Sparkles className={`h-4 w-4 ${isComplete ? 'text-slate-950' : 'text-slate-500'}`} />
              <span>{isComplete ? 'Confirm My Selection →' : 'Select Design & Package to Confirm'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
