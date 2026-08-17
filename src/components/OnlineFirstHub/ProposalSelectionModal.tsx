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
ONLINEFIRST STUDIO — JORMASS REDESIGN DECISION CONFIRMATION
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
${chosenPackage === 'basic' ? 'Client self-hosted.' : '24 Months Domain & Cloud Hosting included by OnlineFirst Studio.'}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070D16]/85 p-4 backdrop-blur-md overflow-y-auto">
      <div
        id="proposal-selection-modal"
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[#14263D] border border-[#223753] shadow-2xl text-[#F5FAFF] max-h-[92vh] flex flex-col relative my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#223753] bg-[#0E1A2B] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#35D6FF]/10 border border-[#35D6FF]/30 text-[#35D6FF]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F5FAFF]">
                JORMASS Direction Confirmation
              </h3>
              <p className="text-xs text-[#B7C6D8]">
                Formalize your preferred design concept and implementation tier
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-[#B7C6D8] hover:bg-[#223753] hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="space-y-5 text-center py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#35D6FF]/20 border border-[#35D6FF]/40 text-[#35D6FF]">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#F5FAFF]">
                Direction Selection Recorded!
              </h4>
              <p className="text-xs sm:text-sm text-[#B7C6D8] max-w-md mx-auto leading-relaxed">
                Thank you. Your preferred direction has been recorded. OnlineFirst Studio will prepare the refinement phase according to your chosen concept and scope.
              </p>

              <div className="rounded-2xl bg-[#0E1A2B] p-4 text-left font-mono text-xs text-[#7BE7FF] border border-[#223753] shadow-inner">
                <pre className="whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {summaryText}
                </pre>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#223753] px-5 py-2.5 text-xs font-bold text-[#D8F3FF] hover:bg-[#314A68] transition cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-[#35D6FF]" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied Summary' : 'Copy Decision Text'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-2.5 text-xs font-black text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Decision 1: Design Direction */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#7BE7FF]">
                  Decision 1: Select Preferred Design Direction
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'demo1', label: 'Demo 1 — Heritage Academic (Traditional Journal Spine & Scholarly Rail)' },
                    { id: 'demo2', label: 'Demo 2 — Contemporary Research (Topic Discovery & Taxonomy Filter)' },
                    { id: 'demo3', label: 'Demo 3 — Editorial Digital Library (Archival Catalog & Minimalist Layout)' },
                    { id: 'custom', label: 'Custom Hybrid / Specific Requested Adjustments' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 rounded-2xl border p-3.5 cursor-pointer text-xs transition ${
                        chosenDemo === opt.id
                          ? 'border-[#35D6FF] bg-[#223753]/60 text-[#F5FAFF] font-bold ring-1 ring-[#35D6FF]/50'
                          : 'border-[#223753] bg-[#0E1A2B]/60 text-[#B7C6D8] hover:bg-[#223753]/30 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="chosenDemo"
                        value={opt.id}
                        checked={chosenDemo === opt.id}
                        onChange={() => setChosenDemo(opt.id as any)}
                        className="text-[#35D6FF] focus:ring-[#35D6FF]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Decision 2: Implementation Package */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#7BE7FF]">
                  Decision 2: Select Implementation Package
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'basic', label: 'Basic (₦250,000) — Design & Handover (Client Self-Hosted)' },
                    { id: 'launch', label: 'Launch (₦350,000) — Design + Deployment + 2-Year Cloud Hosting & Domain' },
                    { id: 'professional', label: 'Professional (₦485,000) — Journal CMS Platform + Publications & Events [RECOMMENDED]' },
                    { id: 'advanced', label: 'Advanced (From ₦650,000) — Enterprise Platform & Custom Migrations' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 rounded-2xl border p-3.5 cursor-pointer text-xs transition ${
                        chosenPackage === opt.id
                          ? 'border-[#35D6FF] bg-[#223753]/60 text-[#F5FAFF] font-bold ring-1 ring-[#35D6FF]/50'
                          : 'border-[#223753] bg-[#0E1A2B]/60 text-[#B7C6D8] hover:bg-[#223753]/30 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="chosenPackage"
                        value={opt.id}
                        checked={chosenPackage === opt.id}
                        onChange={() => setChosenPackage(opt.id as any)}
                        className="text-[#35D6FF] focus:ring-[#35D6FF]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold uppercase text-[#B7C6D8]">
                    Contact Person / Role
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#223753] bg-[#0E1A2B] px-3.5 py-2 text-xs text-[#F5FAFF] focus:border-[#35D6FF] focus:outline-none"
                    placeholder="e.g. Managing Editor, JORMASS"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold uppercase text-[#B7C6D8]">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#223753] bg-[#0E1A2B] px-3.5 py-2 text-xs text-[#F5FAFF] focus:border-[#35D6FF] focus:outline-none"
                    placeholder="e.g. editorial@jormass.com"
                  />
                </div>
              </div>

              {/* Feedback & Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase text-[#B7C6D8]">
                  Specific Feedback or Requested Adjustments (Optional)
                </label>
                <textarea
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-[#223753] bg-[#0E1A2B] p-3 text-xs text-[#F5FAFF] focus:border-[#35D6FF] focus:outline-none resize-none"
                  placeholder="Share any special preferences regarding colors, editorial board layout, or submission workflow..."
                />
              </div>

              {/* Deadline & Target Note */}
              <div className="rounded-xl border border-[#35D6FF]/30 bg-[#0E1A2B]/80 p-3.5 text-xs text-[#B7C6D8] flex items-center justify-between">
                <span>Decision target: <strong className="text-[#35D6FF]">{DECISION_DEADLINE}</strong></span>
                <span className="text-[11px] text-[#7BE7FF]">OnlineFirst Studio Systems</span>
              </div>

              {/* Submit CTA */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold text-[#B7C6D8] hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-7 py-2.5 text-xs font-black text-[#0A121E] hover:shadow-[0_0_20px_rgba(53,214,255,0.4)] transition cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Direction Decision</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
