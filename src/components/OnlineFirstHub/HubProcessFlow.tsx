import React from 'react';
import { CheckCircle2, ArrowDown, Calendar, Layers, ShieldCheck, Rocket, Sparkles, Clock, Check } from 'lucide-react';
import { DECISION_DEADLINE } from '../../data/journalData';

interface HubProcessFlowProps {
  onOpenDecisionModal: () => void;
}

export const HubProcessFlow: React.FC<HubProcessFlowProps> = ({ onOpenDecisionModal }) => {
  const steps = [
    {
      stepNumber: 1,
      title: 'Review Three Design Directions',
      tag: 'Step 01 — Prototype Inspection',
      description: 'Explore Demo 1 (Heritage Academic), Demo 2 (Contemporary Research), and Demo 3 (Editorial Digital Library). Test actual article navigation, archive filtering, and responsive performance.',
    },
    {
      stepNumber: 2,
      title: 'Select Preferred Concept',
      tag: 'Step 02 — Architectural Direction',
      description: 'Choose one primary design blueprint or request selected structural elements to be combined and refined to suit JORMASS’s exact scholarly positioning.',
    },
    {
      stepNumber: 3,
      title: 'Select Implementation Package',
      tag: 'Step 03 — Operational Scope',
      description: 'Choose Basic (₦250k), Launch (₦350k), Professional (₦485k — Recommended), or Advanced (From ₦650k) according to the desired level of CMS automation and hosting duration.',
    },
    {
      stepNumber: 4,
      title: `Confirm by ${DECISION_DEADLINE}`,
      tag: 'Step 04 — Decision Deadline',
      isHighlight: true,
      description: `Formally communicate the chosen design and implementation package to OnlineFirst by ${DECISION_DEADLINE} to guarantee current proposal pricing and initiate production scheduling.`,
    },
    {
      stepNumber: 5,
      title: 'Refinement, Configuration & Launch',
      tag: 'Step 05 — Production Deployment',
      description: 'OnlineFirst finalises custom assets, provisions the agreed CMS modules, tests OJS linking, uploads initial volumes/articles, and executes production launch with DNS handover.',
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#050811] text-slate-100 border-b border-slate-800/80 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
            <Rocket className="h-3.5 w-3.5 text-cyan-400" />
            <span>Structured Delivery Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How OnlineFirst Delivers for JORMASS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            A transparent 5-step collaborative roadmap designed for institutional confidence, predictable timelines, and seamless handover.
          </p>
        </div>

        <div className="space-y-4 relative">
          {steps.map((s) => (
            <div
              key={s.stepNumber}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl p-6 border transition-all ${
                s.isHighlight
                  ? 'bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-blue-950/60 border-cyan-400/80 ring-2 ring-cyan-400/40 shadow-2xl shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono font-black text-sm shadow-md ${
                  s.isHighlight
                    ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950'
                    : 'bg-slate-800 border border-slate-700 text-slate-300'
                }`}
              >
                0{s.stepNumber}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      s.isHighlight ? 'text-cyan-300' : 'text-slate-500'
                    }`}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {s.description}
                </p>
              </div>

              {s.isHighlight && (
                <button
                  onClick={onOpenDecisionModal}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-xs font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition shadow-lg shadow-cyan-500/20"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Confirm Decision</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
