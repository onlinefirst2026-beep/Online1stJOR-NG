import React, { useState } from 'react';
import { X, Check, CheckCircle2, Copy, Sparkles, Send, Calendar, Star, Download, MessageSquare, AlertCircle } from 'lucide-react';
import { DECISION_DEADLINE } from '../../data/journalData';
import { ProposalSelectionState } from '../../lib/dataStore';

interface ProposalSelectionModalProps {
  initialDemo?: 'demo1' | 'demo2' | 'demo3' | 'custom';
  initialPackage?: 'basic' | 'launch' | 'professional' | 'advanced';
  onSave: (selection: ProposalSelectionState) => void;
  onClose: () => void;
}

export const ProposalSelectionModal: React.FC<ProposalSelectionModalProps> = ({
  initialDemo = 'demo1',
  initialPackage = 'professional',
  onSave,
  onClose,
}) => {
  const [chosenDemo, setChosenDemo] = useState<'demo1' | 'demo2' | 'demo3' | 'custom'>(initialDemo);
  const [chosenPackage, setChosenPackage] = useState<'basic' | 'launch' | 'professional' | 'advanced'>(initialPackage);
  const [clientName, setClientName] = useState('JORMASS Editorial Office');
  const [clientEmail, setClientEmail] = useState('editorial@jormass.com');
  const [clientNotes, setClientNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const demoTitles = {
    demo1: 'Demo 1 — Heritage Academic (Traditional Journal Spine & Dual-Column Scholarly Rail)',
    demo2: 'Demo 2 — Contemporary Research (Modern Split Hero & Topic Taxonomy Filtering)',
    demo3: 'Demo 3 — Editorial Digital Library (Minimalist Archival Catalog & Clean Typography)',
    custom: 'Custom Hybrid / Specific Requested Adjustments',
  };

  const packageTitles = {
    basic: 'Basic (₦250,000) — Design & Handover (Client Self-Hosted)',
    launch: 'Launch (₦350,000) — Design + Deployment + 2-Year Cloud Hosting & Domain',
    professional: 'Professional (₦485,000) — Journal CMS Platform + Publications & Events [RECOMMENDED]',
    advanced: 'Advanced (From ₦650,000) — Enterprise Digital Platform & Custom Migrations',
  };

  const summaryText = `==========================================================
ONLINEFIRST — JORMASS REDESIGN DECISION CONFIRMATION
==========================================================
Client: ${clientName} (${clientEmail})
Decision Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Target Deadline: ${DECISION_DEADLINE}

DECISION 1 — PREFERRED DESIGN DIRECTION:
${demoTitles[chosenDemo]}

DECISION 2 — SELECTED IMPLEMENTATION PACKAGE:
${packageTitles[chosenPackage]}

CLIENT ADJUSTMENT NOTES & FEEDBACK:
${clientNotes || 'Standard implementation based on selected concept and package tier.'}

DOMAIN & HOSTING STATUS:
${chosenPackage === 'basic' ? 'Client self-hosted.' : '24 Months Domain & Cloud Hosting included by OnlineFirst.'}
==========================================================`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      chosenDemo,
      chosenPackage,
      clientName,
      clientEmail,
      clientNotes,
      confirmedAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md overflow-y-auto">
      <div
        id="proposal-selection-modal"
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl text-slate-100 max-h-[92vh] flex flex-col relative my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#050811] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                JORMASS Direction Confirmation
              </h3>
              <p className="text-xs text-slate-400">
                Formalize your preferred design concept and implementation tier
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="space-y-5 text-center py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">
                Direction Selection Recorded!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you. Your preferred direction has been recorded. OnlineFirst will prepare the refinement phase according to your chosen concept and scope.
              </p>

              <div className="rounded-2xl bg-[#050811] p-4 text-left font-mono text-xs text-cyan-300 border border-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {summaryText}
                </pre>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied Summary' : 'Copy Decision Text'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2.5 text-xs font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Decision 1: Design Direction */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  Decision 1: Select Preferred Design Direction
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'demo1', label: 'Demo 1 — Heritage Academic', desc: 'Traditional journal spine & scholarly rail' },
                    { id: 'demo2', label: 'Demo 2 — Contemporary Research', desc: 'Modern split-hero & topic taxonomy tabs' },
                    { id: 'demo3', label: 'Demo 3 — Editorial Digital Library', desc: 'Minimalist archival catalog & clean typography' },
                    { id: 'custom', label: 'Custom Combination / Hybrid', desc: 'Request specific blend of features' },
                  ].map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setChosenDemo(d.id as any)}
                      className={`text-left p-3.5 rounded-2xl border transition-all ${
                        chosenDemo === d.id
                          ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400 shadow-md'
                          : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{d.label}</span>
                        {chosenDemo === d.id && <Check className="h-4 w-4 text-cyan-400 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{d.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Decision 2: Implementation Package */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  Decision 2: Select Implementation Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'basic', label: 'Basic — ₦250,000', desc: 'Design & Code Handover (Self-Hosted)' },
                    { id: 'launch', label: 'Launch — ₦350,000', desc: 'Design + Deployment + 2-Yr Cloud Hosting' },
                    { id: 'professional', label: 'Professional — ₦485,000', desc: 'Journal CMS + Publications & Events', isRec: true },
                    { id: 'advanced', label: 'Advanced — From ₦650,000', desc: 'Enterprise Platform + CrossRef / API' },
                  ].map((pkg) => (
                    <button
                      type="button"
                      key={pkg.id}
                      onClick={() => setChosenPackage(pkg.id as any)}
                      className={`text-left p-3.5 rounded-2xl border relative transition-all ${
                        chosenPackage === pkg.id
                          ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400 shadow-md'
                          : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/80'
                      }`}
                    >
                      {pkg.isRec && (
                        <span className="absolute top-2 right-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono font-bold text-[8px] px-2 py-0.5">
                          RECOMMENDED
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{pkg.label}</span>
                        {chosenPackage === pkg.id && <Check className="h-4 w-4 text-cyan-400 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{pkg.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes & Feedback */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Feedback / Specific Customization Requests
                </label>
                <textarea
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="e.g. We like Demo 1's header but want Demo 2's events timeline..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Contact Info Confirmation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Representative Name / Editorial Board Role
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Footer Notice & Submit */}
              <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Target decision deadline: <strong className="text-cyan-300">{DECISION_DEADLINE}</strong></span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-xs font-black text-slate-950 shadow-md hover:from-cyan-300 hover:to-blue-400 transition"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Confirm Direction</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
