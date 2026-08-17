import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  Server,
  Globe,
  Database,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage: (pkgId: 'basic' | 'launch' | 'professional' | 'advanced') => void;
  selectedPackage?: string | null;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  selectedPackage = null,
}) => {
  // expandedPackage tracks which package is clicked to reveal pricing & full breakdown
  // null initially so prices/details are NOT visible until clicked!
  const [expandedPackage, setExpandedPackage] = useState<'basic' | 'launch' | 'professional' | 'advanced' | null>(
    selectedPackage as any || null
  );
  const [showCompareModal, setShowCompareModal] = useState(false);

  const packages = [
    {
      id: 'basic' as const,
      name: 'BASIC',
      positioning: 'Design & Handover',
      price: '₦250,000',
      priceSubtitle: 'One-time investment',
      shortDesc: 'Pure front-end academic website design delivered as clean, production-ready static assets for internal deployment.',
      badge: null,
      color: 'border-[#223753] hover:border-[#314A68]',
      accentColor: 'text-[#B7C6D8]',
      btnColor: 'bg-[#223753] hover:bg-[#314A68] text-[#F5FAFF]',
      domainHosting: 'Hosting & domain not included (managed by client)',
      whyFits: 'Suitable if MOUAU ICT department handles all server provisioning, domain management, and ongoing code-level updates internally.',
      includes: [
        'Complete implementation of selected design concept',
        'Mobile-responsive academic layout for all standard journal pages',
        'Sample Volume, Issue, and Article template structures',
        'Editorial Board & Peer Review policy layouts',
        'Clean, documented HTML5 / CSS3 / React codebase handover',
        '2 weeks technical handover support for institutional IT staff',
      ],
      excludes: [
        'Cloud hosting deployment & server configuration',
        'Custom domain registration & DNS setup',
        'Staff-controlled administrative CMS dashboard',
        'Interactive dynamic article search and filtering',
        'Ongoing maintenance and security updates',
      ],
    },
    {
      id: 'launch' as const,
      name: 'LAUNCH',
      positioning: 'Managed Website',
      price: '₦350,000',
      priceSubtitle: 'Design + Deployment + 2-Year Cloud Hosting',
      shortDesc: 'Turnkey online deployment with custom domain, SSL certification, and 2 full years of managed cloud hosting.',
      badge: null,
      color: 'border-[#314A68] hover:border-[#35D6FF]/60',
      accentColor: 'text-[#7BE7FF]',
      btnColor: 'bg-[#3182CE] hover:bg-[#2B6CB0] text-white',
      domainHosting: 'Includes custom domain (2 years) + secure cloud hosting (2 years)',
      whyFits: 'Ideal for getting JORMASS online immediately under an independent high-performance domain with zero server setup overhead for faculty.',
      includes: [
        'Everything in Basic',
        '2 full years of high-speed cloud hosting (99.9% uptime SLA)',
        '2 full years custom domain registration (.org / .ng / .org.ng)',
        'Automated SSL / TLS encryption & HTTPS security',
        'Initial migration of current issue and past volumes',
        'Automated daily cloud backups and uptime monitoring',
        '3 months priority technical and bug-fix support',
      ],
      excludes: [
        'Staff-controlled administrative CMS dashboard',
        'Independent events and conference management console',
        'Multi-user editorial staff role management',
      ],
    },
    {
      id: 'professional' as const,
      name: 'PROFESSIONAL',
      positioning: 'Journal CMS',
      price: '₦485,000',
      priceSubtitle: 'Journal Website + Content Management System',
      shortDesc: 'The complete digital journal publishing platform with an intuitive administrative console giving the editorial office full autonomy.',
      badge: 'RECOMMENDED FOR JORMASS',
      color: 'border-[#35D6FF]/80 hover:border-[#35D6FF]',
      accentColor: 'text-[#35D6FF]',
      btnColor: 'bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] hover:shadow-[0_0_20px_rgba(53,214,255,0.5)] text-[#0A121E] font-black',
      domainHosting: 'Includes custom domain (2 years) + high-performance cloud hosting & storage (2 years)',
      whyFits: 'Gives the JORMASS editorial office full autonomy to publish new issues, manage previous volumes, post conference events, and update editorial policies without writing code or hiring webmasters.',
      includes: [
        'Everything in Launch (including 2-Year Domain & 2-Year Cloud Hosting)',
        'Intuitive Admin Dashboard for JORMASS editorial staff',
        'Publication Management (Volumes, Issues, Articles & PDF uploads)',
        'Full management of Previous Publications & Future Releases',
        'Academic Events & Conference Announcements management',
        'Dynamic Editorial Calendar with CFP and submission deadlines',
        'Interactive real-time research search and taxonomy filtering',
        'Automated citation generators (APA 7th, Harvard, Chicago)',
        'Cloud PDF storage and fast document preview viewer',
        'Editable Journal Policies, Ethics statements & Editorial Board rosters',
        '6 months comprehensive editorial onboarding and technical support',
      ],
      excludes: [
        'Custom multi-journal publisher suite (single journal included)',
        'Custom automated OJS-to-PostgreSQL custom API bridge (standard OJS link included)',
      ],
    },
    {
      id: 'advanced' as const,
      name: 'ADVANCED',
      positioning: 'Digital Journal Platform',
      price: 'From ₦650,000',
      priceSubtitle: 'Integrated Enterprise Platform & Custom Workflows',
      shortDesc: 'Enterprise-grade multi-journal infrastructure with custom backend database integrations, automated CrossRef DOI sync, and advanced analytics.',
      badge: 'ENTERPRISE SUITE',
      color: 'border-[#40597A] hover:border-[#7BE7FF]',
      accentColor: 'text-[#D8F3FF]',
      btnColor: 'bg-[#223753] hover:bg-[#314A68] text-[#D8F3FF] border border-[#35D6FF]/40',
      domainHosting: 'Dedicated cloud container infrastructure + multi-year enterprise hosting SLA',
      whyFits: 'Tailored for multi-faculty journals, custom automated submission engines, direct automated CrossRef/DOI registration pipelines, or custom university integrations.',
      includes: [
        'Everything in Professional',
        'Enterprise relational database backend (PostgreSQL / Cloud SQL)',
        'Automated CrossRef / DataCite DOI registration API workflows',
        'Automated XML / JATS metadata export for indexing pipelines',
        'Multi-journal support for COLMAS faculty sub-publications',
        'Advanced reader analytics dashboard (downloads, citations, geolocation)',
        '12 months dedicated engineering support and custom feature development',
      ],
      excludes: [],
    },
  ];

  const handleCardClick = (pkgId: 'basic' | 'launch' | 'professional' | 'advanced') => {
    setExpandedPackage(pkgId);
  };

  const handleSelectPackageAndConfirm = (pkgId: 'basic' | 'launch' | 'professional' | 'advanced') => {
    onSelectPackage(pkgId);
  };

  const activePkgData = packages.find((p) => p.id === expandedPackage);

  return (
    <div className="space-y-6 text-[#F5FAFF]">
      {/* 4 Compact Package Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map((pkg) => {
          const isExpanded = expandedPackage === pkg.id;
          const isChosen = selectedPackage === pkg.id;

          return (
            <div
              key={pkg.id}
              onClick={() => handleCardClick(pkg.id)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 bg-[#14263D]/70 backdrop-blur-xl relative flex flex-col justify-between select-none ${
                isExpanded
                  ? 'border-[#35D6FF] bg-gradient-to-b from-[#14263D]/95 via-[#14263D]/90 to-[#223753]/60 ring-2 ring-[#35D6FF]/50 shadow-xl shadow-[#35D6FF]/15 -translate-y-0.5'
                  : `${pkg.color} hover:bg-[#14263D]/90 hover:border-[#35D6FF]/50 hover:-translate-y-0.5`
              }`}
            >
              {/* Recommended Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#35D6FF] to-[#3182CE] px-3 py-0.5 text-[8px] font-black uppercase tracking-wider text-[#0A121E] shadow-md whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold tracking-widest ${pkg.accentColor}`}>
                    {pkg.name}
                  </span>
                  {isChosen && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#7BE7FF] bg-[#14263D] px-2 py-0.5 rounded-full border border-[#35D6FF]/40">
                      <CheckCircle2 className="h-3 w-3 text-[#35D6FF]" /> Selected
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-[#F5FAFF]">
                  {pkg.positioning}
                </h3>

                <p className="text-xs text-[#B7C6D8] leading-relaxed line-clamp-3">
                  {pkg.shortDesc}
                </p>
              </div>

              {/* Click-to-reveal Prompt or Revealed Price Header */}
              <div className="pt-4 mt-3 border-t border-[#223753]">
                {isExpanded ? (
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-[#35D6FF] font-serif">
                        {pkg.price}
                      </span>
                      <p className="text-[10px] text-[#B7C6D8]">Active Below ↓</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#7BE7FF] flex items-center gap-0.5">
                      Expanded
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-[#B7C6D8] group-hover:text-[#35D6FF] transition">
                    <span className="font-semibold text-[11px] text-[#35D6FF]">Click to reveal pricing</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[#35D6FF]" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* EXPANDED PACKAGE DETAIL PANEL */}
      {activePkgData && (
        <div className="rounded-3xl border border-[#35D6FF]/40 bg-gradient-to-br from-[#14263D]/95 via-[#14263D]/90 to-[#223753]/60 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn relative">
          {/* Header of Expanded Panel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#223753] pb-6">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                  {activePkgData.name} PACKAGE
                </span>
                {activePkgData.badge && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#35D6FF] to-[#3182CE] text-[#0A121E] px-2.5 py-0.5 rounded-md shadow-xs">
                    {activePkgData.badge}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl font-extrabold text-[#F5FAFF]">
                {activePkgData.positioning}
              </h3>
              <p className="text-xs sm:text-sm text-[#B7C6D8] max-w-2xl">
                {activePkgData.shortDesc}
              </p>
            </div>

            {/* Price Callout */}
            <div className="bg-[#0E1A2B]/90 border border-[#35D6FF]/40 rounded-2xl p-4 sm:p-5 text-center md:text-right shrink-0">
              <span className="text-2xl sm:text-3xl font-extrabold font-serif text-[#F5FAFF] tracking-tight">
                {activePkgData.price}
              </span>
              <p className="text-xs text-[#7BE7FF] font-medium mt-0.5">
                {activePkgData.priceSubtitle}
              </p>
              <div className="mt-3">
                <button
                  onClick={() => handleSelectPackageAndConfirm(activePkgData.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black shadow-lg transition-all cursor-pointer ${activePkgData.btnColor}`}
                >
                  {selectedPackage === activePkgData.id ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Selected Package</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Select {activePkgData.name} ({activePkgData.price})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deliverables Checklist */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#F5FAFF] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#35D6FF]" />
                <span>Key Deliverables & Inclusions</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#D8F3FF]">
                {activePkgData.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#35D6FF]/20 text-[#35D6FF] text-[10px] font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions & Scope Boundaries */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#B7C6D8] flex items-center gap-2">
                <Info className="h-4 w-4 text-[#7BE7FF]" />
                <span>Scope Boundaries & Exclusions</span>
              </h4>
              {activePkgData.excludes.length > 0 ? (
                <ul className="space-y-2 text-xs text-[#B7C6D8]">
                  {activePkgData.excludes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#223753] text-[#7BE7FF] text-[10px] font-bold mt-0.5">
                        ✕
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#B7C6D8] bg-[#0E1A2B]/60 p-4 rounded-xl border border-[#223753]">
                  Enterprise package includes comprehensive end-to-end custom architecture and multi-year coverage.
                </p>
              )}

              {/* Domain & Hosting Terms */}
              <div className="mt-3 rounded-xl bg-[#0E1A2B]/60 border border-[#223753] p-3.5 space-y-1 text-xs">
                <p className="font-bold text-[#7BE7FF] flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-[#35D6FF]" />
                  <span>Domain & Infrastructure Terms:</span>
                </p>
                <p className="text-[#B7C6D8] text-[11px] leading-relaxed">
                  {activePkgData.domainHosting}
                </p>
              </div>
            </div>
          </div>

          {/* Why This Fits JORMASS Section */}
          <div className="rounded-2xl border border-[#35D6FF]/20 bg-[#0E1A2B]/70 p-4 space-y-1.5">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-[#35D6FF] flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#35D6FF]" />
              <span>Why This Level Fits JORMASS</span>
            </h5>
            <p className="text-xs sm:text-sm text-[#D8F3FF] leading-relaxed">
              {activePkgData.whyFits}
            </p>
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#223753]">
            <button
              onClick={() => setShowCompareModal(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#7BE7FF] hover:text-[#D8F3FF] transition cursor-pointer"
            >
              <Layers className="h-4 w-4" />
              <span>Compare All 4 Packages Side-by-Side</span>
            </button>

            <button
              onClick={() => handleSelectPackageAndConfirm(activePkgData.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition shadow-lg cursor-pointer ${activePkgData.btnColor}`}
            >
              <span>Select {activePkgData.name} & Proceed</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1A2B]/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl border border-[#314A68] bg-[#14263D] p-6 sm:p-8 text-[#F5FAFF] shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#223753] pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#F5FAFF]">
                  Comprehensive Implementation Matrix
                </h3>
                <p className="text-xs text-[#B7C6D8] mt-1">
                  Full feature breakdown across all four OnlineFirst delivery tiers for JORMASS.
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="rounded-full bg-[#223753] p-2 text-[#B7C6D8] hover:text-white hover:bg-[#314A68] transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#223753] text-[#B7C6D8]">
                    <th className="py-3 px-3 font-semibold">Capability / Deliverable</th>
                    <th className="py-3 px-3 font-bold text-[#B7C6D8]">BASIC (₦250k)</th>
                    <th className="py-3 px-3 font-bold text-[#7BE7FF]">LAUNCH (₦350k)</th>
                    <th className="py-3 px-3 font-bold text-[#35D6FF] bg-[#223753]/60">PROFESSIONAL (₦485k) ★</th>
                    <th className="py-3 px-3 font-bold text-[#D8F3FF]">ADVANCED (₦650k+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#223753]/60 text-[#D8F3FF]">
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Selected Design Blueprint Handover</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Included</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Included</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold bg-[#223753]/40">✓ Included</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">2-Year Cloud Hosting & SSL SLA</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Client Managed</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Included (2 Yrs)</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold bg-[#223753]/40">✓ Included (2 Yrs)</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Included (Enterprise)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">2-Year Custom Domain Registration</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Client Managed</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Included (2 Yrs)</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold bg-[#223753]/40">✓ Included (2 Yrs)</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Included (2 Yrs)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Staff Administrative CMS Console</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Not Included</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Not Included</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold bg-[#223753]/40">✓ Included</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Publication & PDF Upload Management</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Static Files</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Static Files</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold bg-[#223753]/40">✓ Dynamic Dashboard</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Dynamic Dashboard</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Events & Conference Announcements Hub</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Code Updates</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Code Updates</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold bg-[#223753]/40">✓ Staff Controlled</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Staff Controlled</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Editorial Calendar & CFP Management</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Static</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Static</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold bg-[#223753]/40">✓ Dynamic Calendar</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ Dynamic Calendar</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">CrossRef / DOI Automated Sync</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Manual DOI</td>
                    <td className="py-2.5 px-3 text-[#718096] font-bold">— Manual DOI</td>
                    <td className="py-2.5 px-3 text-[#B7C6D8] bg-[#223753]/40">— Manual DOI Link</td>
                    <td className="py-2.5 px-3 text-[#35D6FF] font-bold">✓ API Integration</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#223753]">
              <button
                onClick={() => setShowCompareModal(false)}
                className="rounded-xl bg-[#223753] px-6 py-2.5 text-xs font-bold text-[#F5FAFF] hover:bg-[#314A68] transition cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
