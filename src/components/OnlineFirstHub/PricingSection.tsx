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
      color: 'border-slate-700 hover:border-slate-500',
      accentColor: 'text-slate-300',
      btnColor: 'bg-slate-700 hover:bg-slate-600 text-white',
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
      color: 'border-blue-700/60 hover:border-blue-500',
      accentColor: 'text-blue-400',
      btnColor: 'bg-blue-600 hover:bg-blue-500 text-white',
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
      color: 'border-cyan-500/80 hover:border-cyan-400',
      accentColor: 'text-cyan-400',
      btnColor: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black',
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
      color: 'border-purple-700/60 hover:border-purple-500',
      accentColor: 'text-purple-400',
      btnColor: 'bg-purple-600 hover:bg-purple-500 text-white',
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
    <div className="space-y-8 text-slate-100">
      {/* 4 Compact Package Cards Grid (Initially shows package name, click reveals price & details) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map((pkg) => {
          const isExpanded = expandedPackage === pkg.id;
          const isChosen = selectedPackage === pkg.id;

          return (
            <div
              key={pkg.id}
              onClick={() => handleCardClick(pkg.id)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 bg-slate-900/70 backdrop-blur-xl relative flex flex-col justify-between select-none ${
                isExpanded
                  ? 'border-cyan-400 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-blue-950/40 ring-2 ring-cyan-400/50 shadow-xl shadow-cyan-500/20 -translate-y-0.5'
                  : `${pkg.color} hover:bg-slate-900/90 hover:border-slate-500 hover:-translate-y-0.5`
              }`}
            >
              {/* Recommended Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-0.5 text-[8px] font-black uppercase tracking-wider text-slate-950 shadow-md whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold tracking-widest ${pkg.accentColor}`}>
                    {pkg.name}
                  </span>
                  {isChosen && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="h-3 w-3" /> Selected
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-white">
                  {pkg.positioning}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {pkg.shortDesc}
                </p>
              </div>

              {/* Click-to-reveal Prompt or Revealed Price Header */}
              <div className="pt-4 mt-3 border-t border-slate-800/80">
                {isExpanded ? (
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-cyan-300 font-serif">
                        {pkg.price}
                      </span>
                      <p className="text-[10px] text-slate-400">Revealed & Active</p>
                    </div>
                    <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-0.5">
                      Active Below ↓
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-300 transition">
                    <span className="font-semibold text-[11px] text-cyan-400">Click to reveal pricing</span>
                    <ChevronDown className="h-3.5 w-3.5 text-cyan-400" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* EXPANDED PACKAGE DETAIL PANEL */}
      {activePkgData && (
        <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-blue-950/50 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn relative">
          {/* Header of Expanded Panel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                  {activePkgData.name} PACKAGE
                </span>
                {activePkgData.badge && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-2.5 py-0.5 rounded-md shadow-xs">
                    {activePkgData.badge}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl font-extrabold text-white">
                {activePkgData.positioning}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {activePkgData.shortDesc}
              </p>
            </div>

            {/* Price Callout */}
            <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 text-center md:text-right shrink-0">
              <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                {activePkgData.price}
              </span>
              <p className="text-xs text-cyan-300 font-medium mt-0.5">
                {activePkgData.priceSubtitle}
              </p>
              <div className="mt-3">
                <button
                  onClick={() => handleSelectPackageAndConfirm(activePkgData.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black shadow-lg transition-all ${activePkgData.btnColor}`}
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
              <h4 className="font-serif font-bold text-sm text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Key Deliverables & Inclusions</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-200">
                {activePkgData.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions & Scope Boundaries */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-slate-300 flex items-center gap-2">
                <Info className="h-4 w-4 text-slate-400" />
                <span>Scope Boundaries & Exclusions</span>
              </h4>
              {activePkgData.excludes.length > 0 ? (
                <ul className="space-y-2 text-xs text-slate-400">
                  {activePkgData.excludes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-500 text-[10px] font-bold mt-0.5">
                        ✕
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  Enterprise package includes comprehensive end-to-end custom architecture and multi-year coverage.
                </p>
              )}

              {/* Domain & Hosting Terms */}
              <div className="mt-3 rounded-xl bg-slate-950/60 border border-slate-800 p-3.5 space-y-1 text-xs">
                <p className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Domain & Infrastructure Terms:</span>
                </p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {activePkgData.domainHosting}
                </p>
              </div>
            </div>
          </div>

          {/* Why This Fits JORMASS Section */}
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-4 space-y-1.5">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Why This Level Fits JORMASS</span>
            </h5>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activePkgData.whyFits}
            </p>
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => setShowCompareModal(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition"
            >
              <Layers className="h-4 w-4" />
              <span>Compare All 4 Packages Side-by-Side</span>
            </button>

            <button
              onClick={() => handleSelectPackageAndConfirm(activePkgData.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition shadow-lg ${activePkgData.btnColor}`}
            >
              <span>Select {activePkgData.name} & Proceed</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Comprehensive Implementation Matrix
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Full feature breakdown across all four OnlineFirst delivery tiers for JORMASS.
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-3 font-semibold">Capability / Deliverable</th>
                    <th className="py-3 px-3 font-bold text-slate-300">BASIC (₦250k)</th>
                    <th className="py-3 px-3 font-bold text-blue-300">LAUNCH (₦350k)</th>
                    <th className="py-3 px-3 font-bold text-cyan-300 bg-cyan-950/30">PROFESSIONAL (₦485k) ★</th>
                    <th className="py-3 px-3 font-bold text-purple-300">ADVANCED (₦650k+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Selected Design Blueprint Handover</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Included</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Included</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold bg-cyan-950/20">✓ Included</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">2-Year Cloud Hosting & SSL SLA</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Client Managed</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Included (2 Yrs)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold bg-cyan-950/20">✓ Included (2 Yrs)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Included (Enterprise)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">2-Year Custom Domain Registration</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Client Managed</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Included (2 Yrs)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold bg-cyan-950/20">✓ Included (2 Yrs)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Included (2 Yrs)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Staff Administrative CMS Console</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Not Included</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Not Included</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold bg-cyan-950/20">✓ Included</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Publication & PDF Upload Management</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Static Files</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Static Files</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold bg-cyan-950/20">✓ Dynamic Dashboard</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Dynamic Dashboard</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Events & Conference Announcements Hub</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Code Updates</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Code Updates</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold bg-cyan-950/20">✓ Staff Controlled</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Staff Controlled</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Editorial Calendar & CFP Management</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Static</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Static</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold bg-cyan-950/20">✓ Dynamic Calendar</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Dynamic Calendar</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">CrossRef / DOI Automated Sync</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Manual DOI</td>
                    <td className="py-2.5 px-3 text-slate-600 font-bold">— Manual DOI</td>
                    <td className="py-2.5 px-3 text-slate-400 bg-cyan-950/20">— Manual DOI Link</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ API Integration</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowCompareModal(false)}
                className="rounded-xl bg-slate-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
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
