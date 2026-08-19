import React, { useState } from 'react';
import {
  X,
  Check,
  CheckCircle2,
  Copy,
  Sparkles,
  Send,
  Calendar,
  Star,
  Download,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  Building2,
  FileCheck,
  Scale,
  CreditCard,
  Printer,
  Mail,
  Loader2,
} from 'lucide-react';
import { DECISION_DEADLINE } from '../../data/journalData';
import { ProposalSelectionState } from '../../types';

interface ProposalSelectionModalProps {
  initialDemo?: 'demo1' | 'demo2' | 'demo3' | 'custom';
  initialPackage?: 'basic' | 'launch' | 'professional' | 'advanced';
  onSave: (selection: ProposalSelectionState) => void;
  onClose: () => void;
}

export const ProposalSelectionModal: React.FC<ProposalSelectionModalProps> = ({
  initialDemo = 'demo3',
  initialPackage = 'professional',
  onSave,
  onClose,
}) => {
  const [chosenDemo, setChosenDemo] = useState<'demo1' | 'demo2' | 'demo3' | 'custom'>(initialDemo);
  const [chosenPackage, setChosenPackage] = useState<'basic' | 'launch' | 'professional' | 'advanced'>(initialPackage);
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [clientOrg, setClientOrg] = useState('JORMASS — Journal of Research in Management and Social Sciences');
  const [clientEmail, setClientEmail] = useState('editorial@jormass.com');
  const [clientNotes, setClientNotes] = useState('');

  // Unchecked mandatory checkboxes
  const [authorityChecked, setAuthorityChecked] = useState(false);
  const [commercialTermsChecked, setCommercialTermsChecked] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedRecord, setConfirmedRecord] = useState<ProposalSelectionState | null>(null);
  const [copied, setCopied] = useState(false);

  const demoTitles: Record<string, string> = {
    demo1: 'Demo 1 — Heritage Academic (Traditional Journal Spine & Dual-Column Scholarly Rail)',
    demo2: 'Demo 2 — Contemporary Research (Modern Split Hero & Topic Taxonomy Filtering)',
    demo3: 'Demo 3 — Scholarly Discovery Platform (Deep Navy & Royal Purple Academic Discovery)',
    custom: 'Custom Hybrid / Specific Requested Adjustments',
  };

  const packagePricing: Record<
    string,
    { title: string; fee: number; formatted: string; desc: string }
  > = {
    basic: {
      title: 'Basic — Design & Handover (Client Self-Hosted)',
      fee: 250000,
      formatted: '₦250,000',
      desc: 'Single design concept implemented + full source handover. Client manages hosting & domains.',
    },
    launch: {
      title: 'Launch — Design + Deployment + 2-Year Cloud Hosting & Domain',
      fee: 350000,
      formatted: '₦350,000',
      desc: 'Full website deployment with 24 months high-speed hosting and SSL certificate included.',
    },
    professional: {
      title: 'Professional — Journal CMS Platform + Publications & Events [RECOMMENDED]',
      fee: 485000,
      formatted: '₦485,000',
      desc: 'Complete editorial CMS platform, automated APA citation engines, PDF viewers, and search indexing.',
    },
    advanced: {
      title: 'Advanced — Enterprise Digital Platform & Custom Migrations',
      fee: 650000,
      formatted: 'from ₦650,000',
      desc: 'Enterprise scholarly infrastructure, legacy back-issue archival migration & multi-journal support.',
    },
  };

  const selectedTier = packagePricing[chosenPackage];
  const totalFee = selectedTier.fee;
  const depositAmount = totalFee * 0.5;
  const balanceAmount = totalFee - depositAmount;

  const isFormValid =
    clientName.trim().length > 0 &&
    clientRole.trim().length > 0 &&
    clientEmail.trim().length > 0 &&
    authorityChecked &&
    commercialTermsChecked;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/selection-acceptance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientRole: clientRole.trim(),
          clientOrg: clientOrg.trim(),
          clientEmail: clientEmail.trim(),
          clientNotes: clientNotes.trim(),
          chosenDemo,
          chosenPackage,
          authorityConfirmed: authorityChecked,
          commercialTermsConfirmed: commercialTermsChecked,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            'We could not complete your submission. Your selection has not yet been formally recorded. Please retry or contact OnlineFirst Studio.'
        );
      }

      const savedState: ProposalSelectionState = {
        referenceId: data.referenceId,
        chosenDemo,
        chosenPackage,
        clientName: clientName.trim(),
        clientRole: clientRole.trim(),
        clientOrg: clientOrg.trim(),
        clientEmail: clientEmail.trim(),
        clientNotes: clientNotes.trim(),
        totalFee,
        totalFeeFormatted: selectedTier.formatted,
        depositPercentage: 50,
        depositAmount,
        depositAmountFormatted: `₦${depositAmount.toLocaleString()}`,
        balanceAmount,
        balanceAmountFormatted: `₦${balanceAmount.toLocaleString()}`,
        authorityConfirmed: true,
        commercialTermsConfirmed: true,
        termsVersion: 'JORMASS-COMMERCIAL-TERMS-v1.0',
        governingLaw: 'Laws of the Federal Republic of Nigeria',
        contractRecipientEmail: 'editorial@jormass.com',
        confirmedAt: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        summaryText: data.record?.summaryText,
      };

      setConfirmedRecord(savedState);
      onSave(savedState);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setSubmitError(
        err.message ||
          'We could not complete your submission. Your selection has not yet been formally recorded. Please retry or contact OnlineFirst Studio.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRecord = () => {
    if (!confirmedRecord?.summaryText) return;
    navigator.clipboard.writeText(confirmedRecord.summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070D16]/90 p-4 backdrop-blur-md overflow-y-auto">
      <div
        id="proposal-selection-modal"
        className="w-full max-w-3xl overflow-hidden rounded-3xl bg-[#14263D] border border-[#223753] shadow-2xl text-[#F5FAFF] max-h-[92vh] flex flex-col relative my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#223753] bg-[#0E1A2B] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFC84D]/15 border border-[#FFC84D]/30 text-[#FFC84D]">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5FAFF]">
                JORMASS Project Direction & Commercial Acceptance
              </h3>
              <p className="text-xs text-[#B7C6D8]">
                Formalize agreed design concept, package tier, and commercial engagement terms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-[#B7C6D8] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 font-inter">
          {confirmedRecord ? (
            /* ========================================================= */
            /* SUCCESS CONFIRMATION SCREEN (Commercial Summary Card)     */
            /* ========================================================= */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h4 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#F5FAFF]">
                  Selection Successfully Recorded
                </h4>
                <p className="text-sm text-[#B7C6D8] max-w-xl mx-auto leading-relaxed">
                  Thank you. Your JORMASS design direction and implementation package have been formally recorded.
                  OnlineFirst Studio will send the detailed project agreement to{' '}
                  <strong className="text-[#FFC84D]">editorial@jormass.com</strong>.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20255C] border border-[#6B3F74] text-[#FFC84D] font-mono text-xs font-bold mt-2">
                  <span>Reference: {confirmedRecord.referenceId}</span>
                </div>
              </div>

              {/* Professional Commercial Summary Card */}
              <div className="rounded-2xl bg-[#0E1A2B] border border-[#223753] p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#223753] pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[#FFC84D]" />
                    <span className="font-heading text-sm font-bold uppercase tracking-wider text-[#F5FAFF]">
                      Your Confirmed Project Direction
                    </span>
                  </div>
                  <span className="text-xs text-[#B7C6D8] font-mono">
                    {new Date(confirmedRecord.submittedAt || '').toLocaleString('en-GB')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-[#14263D] border border-[#223753] space-y-1">
                    <p className="text-xs text-[#B7C6D8] uppercase tracking-wider font-semibold">Preferred Design Direction</p>
                    <p className="font-bold text-[#F5FAFF]">{demoTitles[confirmedRecord.chosenDemo]}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#14263D] border border-[#223753] space-y-1">
                    <p className="text-xs text-[#B7C6D8] uppercase tracking-wider font-semibold">Implementation Package</p>
                    <p className="font-bold text-[#F5FAFF]">{selectedTier.title}</p>
                  </div>
                </div>

                {/* Pricing & 50% Deposit Breakdown */}
                <div className="rounded-xl bg-[#20255C]/70 border border-[#6B3F74]/60 p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-2.5 rounded-lg bg-[#0E1A2B]/80 border border-[#223753]">
                      <p className="text-xs text-[#B7C6D8] font-medium">Total Project Fee</p>
                      <p className="text-lg sm:text-xl font-extrabold text-[#F5FAFF] font-mono mt-0.5">
                        {confirmedRecord.totalFeeFormatted}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#6B3F74]/40 border border-[#FFC84D]/40">
                      <p className="text-xs text-[#FFC84D] font-bold">Initial Payment (50%)</p>
                      <p className="text-lg sm:text-xl font-extrabold text-[#FFC84D] font-mono mt-0.5">
                        {confirmedRecord.depositAmountFormatted}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0E1A2B]/80 border border-[#223753]">
                      <p className="text-xs text-[#B7C6D8] font-medium">Balance Upon Completion</p>
                      <p className="text-lg sm:text-xl font-extrabold text-[#F5FAFF] font-mono mt-0.5">
                        {confirmedRecord.balanceAmountFormatted}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#B7C6D8] text-center italic">
                    The 50% initial payment becomes due upon acceptance in accordance with the agreed project terms before implementation commences.
                  </p>
                </div>

                {/* Signatory & Contract Recipient */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 text-[#B7C6D8]">
                    <p className="font-semibold text-[#F5FAFF]">Authorized Representative:</p>
                    <p>{confirmedRecord.clientName} ({confirmedRecord.clientRole})</p>
                    <p className="text-xs text-[#B7C6D8]">{confirmedRecord.clientOrg}</p>
                    <p className="text-[#FFC84D] font-mono">{confirmedRecord.clientEmail}</p>
                  </div>

                  <div className="space-y-1 text-[#B7C6D8]">
                    <p className="font-semibold text-[#F5FAFF]">Formal Contract Recipient:</p>
                    <p className="text-[#FFC84D] font-mono">editorial@jormass.com</p>
                    <p>Governing Law: Laws of the Federal Republic of Nigeria</p>
                    <p className="text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      <span>Automatic notification sent to onlinefirst2026@gmail.com</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#223753] px-5 py-3 text-xs sm:text-sm font-bold text-[#D8F3FF] hover:bg-[#314A68] transition cursor-pointer min-h-[44px]"
                >
                  <Printer className="h-4 w-4 text-[#FFC84D]" />
                  <span>Print / Download Confirmation</span>
                </button>
                <button
                  onClick={handleCopyRecord}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#223753] px-5 py-3 text-xs sm:text-sm font-bold text-[#D8F3FF] hover:bg-[#314A68] transition cursor-pointer min-h-[44px]"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Acceptance Record'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-gradient-to-r from-[#FFC84D] via-[#f7be38] to-[#e6ab1e] px-6 py-3 text-xs sm:text-sm font-bold text-[#20255C] hover:shadow-[0_0_20px_rgba(255,200,77,0.4)] transition cursor-pointer min-h-[44px]"
                >
                  Close & Return to Proposal
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* FORMAL ACCEPTANCE & SELECTION FORM                        */
            /* ========================================================= */
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="rounded-xl bg-rose-500/15 border border-rose-500/40 p-4 text-xs sm:text-sm text-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Section 1: Preferred Design Direction */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#FFC84D]">
                  Step 1: Choose Preferred Design Direction
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'demo1', label: 'Demo 1 — Heritage Academic (Traditional Journal Spine & Scholarly Rail)' },
                    { id: 'demo2', label: 'Demo 2 — Contemporary Research (Topic Discovery & Taxonomy Filter)' },
                    { id: 'demo3', label: 'Demo 3 — Scholarly Discovery Platform (Deep Navy & Royal Purple Academic Discovery)' },
                    { id: 'custom', label: 'Custom Hybrid / Specific Requested Adjustments' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 rounded-2xl border p-3.5 sm:p-4 cursor-pointer text-xs sm:text-sm transition ${
                        chosenDemo === opt.id
                          ? 'border-[#FFC84D] bg-[#20255C]/70 text-[#F5FAFF] font-bold ring-1 ring-[#FFC84D]/50'
                          : 'border-[#223753] bg-[#0E1A2B]/60 text-[#B7C6D8] hover:bg-[#223753]/30 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="chosenDemo"
                        value={opt.id}
                        checked={chosenDemo === opt.id}
                        onChange={() => setChosenDemo(opt.id as any)}
                        className="text-[#FFC84D] focus:ring-[#FFC84D] h-4 w-4"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 2: Implementation Package & Live Calculation */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#FFC84D]">
                  Step 2: Select Implementation Package Tier
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {Object.entries(packagePricing).map(([key, pkg]) => (
                    <label
                      key={key}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border p-3.5 sm:p-4 cursor-pointer text-xs sm:text-sm transition ${
                        chosenPackage === key
                          ? 'border-[#FFC84D] bg-[#20255C]/70 text-[#F5FAFF] font-bold ring-1 ring-[#FFC84D]/50'
                          : 'border-[#223753] bg-[#0E1A2B]/60 text-[#B7C6D8] hover:bg-[#223753]/30 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="chosenPackage"
                          value={key}
                          checked={chosenPackage === key}
                          onChange={() => setChosenPackage(key as any)}
                          className="text-[#FFC84D] focus:ring-[#FFC84D] h-4 w-4"
                        />
                        <div>
                          <p className="font-bold text-[#F5FAFF]">{pkg.title}</p>
                          <p className="text-xs text-[#B7C6D8] font-normal">{pkg.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-[#FFC84D] font-mono sm:text-right shrink-0">
                        {pkg.formatted}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Commercial Calculation Summary Box */}
              <div className="rounded-2xl bg-[#0E1A2B] border border-[#223753] p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC84D] border-b border-[#223753] pb-2">
                  <CreditCard className="h-4 w-4 text-[#FFC84D]" />
                  <span>Commercial Fee & Deposit Breakdown</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-[#14263D] border border-[#223753]">
                    <span className="text-[#B7C6D8] text-xs block">Total Project Fee</span>
                    <span className="text-base sm:text-lg font-bold text-[#F5FAFF] font-mono">
                      {selectedTier.formatted}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#6B3F74]/30 border border-[#FFC84D]/40">
                    <span className="text-[#FFC84D] text-xs font-bold block">50% Initial Payment</span>
                    <span className="text-base sm:text-lg font-extrabold text-[#FFC84D] font-mono">
                      ₦{depositAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#14263D] border border-[#223753]">
                    <span className="text-[#B7C6D8] text-xs block">Balance on Delivery</span>
                    <span className="text-base sm:text-lg font-bold text-[#F5FAFF] font-mono">
                      ₦{balanceAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {chosenPackage === 'advanced' && (
                  <p className="text-xs text-[#B7C6D8] italic">
                    * For Advanced enterprise scope, initial payment is calculated as 50% of the final agreed project quotation.
                  </p>
                )}
              </div>

              {/* Section 3: Commercial Commitment Notice */}
              <div className="rounded-2xl bg-[#20255C]/40 border border-[#6B3F74] p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-[#F5FAFF] leading-relaxed">
                <div className="flex items-center gap-2 text-[#FFC84D] font-bold uppercase tracking-wider text-xs border-b border-[#6B3F74]/60 pb-2">
                  <Scale className="h-4 w-4" />
                  <span>Commercial Commitment & Engagement Terms</span>
                </div>
                <p className="text-xs text-[#D8E2EC] leading-relaxed">
                  By confirming this selection, the Client confirms its preferred design direction and implementation package and authorizes OnlineFirst Studio to proceed to the contractual and implementation stage on that basis.
                </p>
                <p className="text-xs text-[#D8E2EC] leading-relaxed">
                  The selected project fee becomes the agreed commercial basis for the engagement, subject to the detailed project agreement to be issued by OnlineFirst Studio.
                </p>
                <p className="text-xs text-[#D8E2EC] leading-relaxed">
                  A 50% initial payment of the selected total project fee is due upon acceptance and agreement of the selected demo/design direction. Work on the implementation phase will commence following completion of the required contractual documentation and receipt of the initial payment, unless otherwise agreed in writing.
                </p>
                <p className="text-xs text-[#D8E2EC] leading-relaxed">
                  A formal project contract reflecting the selected scope, fee and implementation terms will be sent to <strong className="text-[#FFC84D]">editorial@jormass.com</strong>.
                </p>

                <div className="pt-2 border-t border-[#6B3F74]/50 text-[11px] text-[#B7C6D8]">
                  <strong className="text-[#F5FAFF]">Governing Law:</strong> This selection and the resulting engagement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, subject to the provisions of the formal project agreement.
                </div>
              </div>

              {/* Section 4: Authorized Representative Identification */}
              <div className="space-y-4">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#FFC84D]">
                  Step 3: Authorized Client Representative Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-[#F5FAFF]">
                      Full Name of Authorized Representative <span className="text-[#FFC84D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#223753] bg-[#0E1A2B] px-3.5 py-2.5 text-xs sm:text-sm text-[#F5FAFF] focus:border-[#FFC84D] focus:outline-none min-h-[42px]"
                      placeholder="e.g. Prof. / Dr. / Editor Name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-[#F5FAFF]">
                      Position / Official Role <span className="text-[#FFC84D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={clientRole}
                      onChange={(e) => setClientRole(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#223753] bg-[#0E1A2B] px-3.5 py-2.5 text-xs sm:text-sm text-[#F5FAFF] focus:border-[#FFC84D] focus:outline-none min-h-[42px]"
                      placeholder="e.g. Managing Editor / Dean / Board Chair"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-[#F5FAFF]">Organisation</label>
                    <input
                      type="text"
                      value={clientOrg}
                      onChange={(e) => setClientOrg(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#223753] bg-[#0E1A2B] px-3.5 py-2.5 text-xs sm:text-sm text-[#B7C6D8] focus:border-[#FFC84D] focus:outline-none min-h-[42px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-[#F5FAFF]">
                      Official Email Address <span className="text-[#FFC84D]">*</span>
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#223753] bg-[#0E1A2B] px-3.5 py-2.5 text-xs sm:text-sm text-[#F5FAFF] focus:border-[#FFC84D] focus:outline-none min-h-[42px]"
                      placeholder="editorial@jormass.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#B7C6D8]">
                    Specific Implementation Notes or Adjustment Requests (Optional)
                  </label>
                  <textarea
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-[#223753] bg-[#0E1A2B] px-3.5 py-2.5 text-xs sm:text-sm text-[#F5FAFF] focus:border-[#FFC84D] focus:outline-none resize-none"
                    placeholder="Provide any specific college requirements, domain preferences, or priority features..."
                  />
                </div>
              </div>

              {/* Section 5: Mandatory Active Acknowledgements (Unchecked by default) */}
              <div className="rounded-2xl bg-[#0E1A2B] border border-[#223753] p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC84D] border-b border-[#223753] pb-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Authority Declaration & Formal Acknowledgements</span>
                </div>

                <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-[#F5FAFF] leading-snug">
                  <input
                    type="checkbox"
                    checked={authorityChecked}
                    onChange={(e) => setAuthorityChecked(e.target.checked)}
                    className="h-4 w-4 mt-0.5 rounded border-[#223753] text-[#FFC84D] focus:ring-[#FFC84D] shrink-0 cursor-pointer"
                  />
                  <span>
                    I confirm that I am authorised to make this selection on behalf of JORMASS and that I have reviewed and accept the design direction, selected implementation package, stated project fee, 50% initial payment requirement and commercial terms above.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-[#F5FAFF] leading-snug">
                  <input
                    type="checkbox"
                    checked={commercialTermsChecked}
                    onChange={(e) => setCommercialTermsChecked(e.target.checked)}
                    className="h-4 w-4 mt-0.5 rounded border-[#223753] text-[#FFC84D] focus:ring-[#FFC84D] shrink-0 cursor-pointer"
                  />
                  <span>
                    I understand that OnlineFirst Studio will send the formal project agreement to <strong className="text-[#FFC84D]">editorial@jormass.com</strong> and that implementation will proceed in accordance with the executed agreement and agreed payment terms.
                  </span>
                </label>
              </div>

              {/* Final Submit Trigger */}
              <div className="space-y-2 pt-2 text-center sm:text-right">
                <p className="text-xs text-[#B7C6D8] italic">
                  This action records your formal project selection and commercial acceptance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#223753] bg-[#0E1A2B] text-xs sm:text-sm font-semibold text-[#B7C6D8] hover:text-white hover:bg-[#223753] transition cursor-pointer min-h-[44px]"
                  >
                    Cancel / Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition cursor-pointer min-h-[44px] shadow-lg ${
                      isFormValid && !isSubmitting
                        ? 'bg-gradient-to-r from-[#FFC84D] via-[#f7be38] to-[#e6ab1e] text-[#20255C] hover:shadow-[0_0_20px_rgba(255,200,77,0.4)]'
                        : 'bg-[#223753] text-[#637D9B] cursor-not-allowed opacity-70'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#20255C]" />
                        <span>Recording Selection & Dispatching Notification...</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 text-[#20255C]" />
                        <span>Accept Selection & Commercial Terms</span>
                      </>
                    )}
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
