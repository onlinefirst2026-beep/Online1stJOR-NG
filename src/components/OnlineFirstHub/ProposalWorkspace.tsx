import React, { useState } from 'react';
import {
  ThemeVariant,
  JournalPage,
} from '../../types';
import { DECISION_DEADLINE } from '../../data/journalData';
import { DemoCards } from './DemoCards';
import { PricingSection } from './PricingSection';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  Layers,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  Search,
  Users,
  FileText,
  Clock,
  HelpCircle,
  Zap,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  Cpu,
} from 'lucide-react';

export type ProposalSectionId =
  | 'why-redesign'
  | 'what-changes'
  | 'design-concepts'
  | 'website-capabilities'
  | 'implementation-options'
  | 'delivery-process'
  | 'your-selection'
  | 'decision-next-step';

interface ProposalWorkspaceProps {
  activeSection: ProposalSectionId;
  onSelectSection: (sectionId: ProposalSectionId) => void;
  selectedDemoChoice: ThemeVariant | null;
  onSelectDemoChoice: (theme: ThemeVariant) => void;
  onLaunchDemoPrototype: (theme: ThemeVariant) => void;
  selectedPkg: 'basic' | 'launch' | 'professional' | 'advanced' | null;
  onSelectPackage: (pkgId: 'basic' | 'launch' | 'professional' | 'advanced') => void;
  onOpenDecisionModal: () => void;
  onOpenOjsModal: () => void;
}

export const ProposalWorkspace: React.FC<ProposalWorkspaceProps> = ({
  activeSection,
  onSelectSection,
  selectedDemoChoice,
  onSelectDemoChoice,
  onLaunchDemoPrototype,
  selectedPkg,
  onSelectPackage,
  onOpenDecisionModal,
  onOpenOjsModal,
}) => {
  // State for expanded capability tile in Section 04
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string | null>(null);

  // Menu items definition
  const menuItems: { id: ProposalSectionId; number: string; title: string; subtitle: string }[] = [
    {
      id: 'why-redesign',
      number: '01',
      title: 'Why Redesign',
      subtitle: 'Review findings & strategic value',
    },
    {
      id: 'what-changes',
      number: '02',
      title: 'What Changes',
      subtitle: 'Current JORMASS → Future JORMASS',
    },
    {
      id: 'design-concepts',
      number: '03',
      title: 'Design Concepts',
      subtitle: 'Demo 1, Demo 2, Demo 3',
    },
    {
      id: 'website-capabilities',
      number: '04',
      title: 'Website Capabilities',
      subtitle: 'Archive, CMS, search, events',
    },
    {
      id: 'implementation-options',
      number: '05',
      title: 'Implementation Options',
      subtitle: 'Basic, Launch, Professional, Advanced',
    },
    {
      id: 'delivery-process',
      number: '06',
      title: 'Delivery Process',
      subtitle: 'Select → Refine → Configure → Test → Launch',
    },
    {
      id: 'your-selection',
      number: '07',
      title: 'Your Selection',
      subtitle: 'Chosen demo + package + investment',
    },
    {
      id: 'decision-next-step',
      number: '08',
      title: 'Decision & Next Step',
      subtitle: 'Deadline + confirmation actions',
    },
  ];

  // Helper titles for demo and package summaries
  const demoTitles: Record<ThemeVariant, { name: string; tag: string }> = {
    demo1: { name: 'Demo 1 — Heritage Academic', tag: 'Traditional scholarly authority & dual-column rail' },
    demo2: { name: 'Demo 2 — Contemporary Research', tag: 'Modern research discovery & taxonomy filtering' },
    demo3: { name: 'Demo 3 — Editorial Digital Library', tag: 'Archival catalog & clean editorial typography' },
  };

  const packageDetails: Record<
    'basic' | 'launch' | 'professional' | 'advanced',
    { name: string; title: string; price: string; hosting: string }
  > = {
    basic: { name: 'BASIC', title: 'Design & Handover', price: '₦250,000', hosting: 'Client Self-Hosted (Hosting not included)' },
    launch: { name: 'LAUNCH', title: 'Managed Website', price: '₦350,000', hosting: 'Includes 2 Years Custom Domain & 2 Years Managed Cloud Hosting' },
    professional: { name: 'PROFESSIONAL', title: 'Journal CMS Platform (Recommended)', price: '₦485,000', hosting: 'Includes 2 Years Custom Domain & 2 Years High-Performance Cloud Hosting & Storage' },
    advanced: { name: 'ADVANCED', title: 'Enterprise Digital Platform', price: 'From ₦650,000', hosting: 'Dedicated container cloud infrastructure & multi-year SLA' },
  };

  // 16 interactive capabilities for Section 04
  const capabilitiesList = [
    {
      id: 'current-issue',
      title: 'Current Issue Display',
      category: 'Publications',
      shortDesc: 'Prominent showcase of the active issue with volume/number, date, cover metadata, and direct PDF downloads.',
    },
    {
      id: 'publication-archive',
      title: 'Publication Archive',
      category: 'Publications',
      shortDesc: 'Permanent Volume → Issue → Article hierarchy enabling seamless browsing of past volumes and future releases.',
    },
    {
      id: 'article-search',
      title: 'Article Search Engine',
      category: 'Discovery',
      shortDesc: 'Instant multi-parameter search across author names, article titles, keywords, abstract terms, and publication years.',
    },
    {
      id: 'article-details',
      title: 'Article Details & Citations',
      category: 'Reading',
      shortDesc: 'Dedicated reading page with DOI badges, CC BY licensing, abstract boxes, and instant APA/Harvard/Chicago citation generation.',
    },
    {
      id: 'events-management',
      title: 'Events Management',
      category: 'Faculty',
      shortDesc: 'Dedicated module for announcing COLMAS faculty public lectures, international management conferences, and symposiums.',
    },
    {
      id: 'announcements',
      title: 'Announcements Hub',
      category: 'Editorial',
      shortDesc: 'Broadcast Call for Papers (CFP), special issue deadlines, editorial notices, and publisher updates directly to readers.',
    },
    {
      id: 'editorial-calendar',
      title: 'Editorial Calendar',
      category: 'Schedules',
      shortDesc: 'Structured schedule tracking submission deadlines, review windows, editorial decisions, and target publication dates.',
    },
    {
      id: 'editorial-board',
      title: 'Editorial Board Roster',
      category: 'Governance',
      shortDesc: 'Complete directory of Editors-in-Chief, section editors, institutional affiliations, and verified ORCID profile links.',
    },
    {
      id: 'author-guidelines',
      title: 'Author Guidelines',
      category: 'Submissions',
      shortDesc: 'Clear formatting instructions, APA 7th referencing guides, Word document template downloads, and submission instructions.',
    },
    {
      id: 'peer-review',
      title: 'Peer Review Workflow',
      category: 'Standards',
      shortDesc: '7-step double-blind peer review transparency policy explaining initial triage, blind review, revision, and acceptance.',
    },
    {
      id: 'publication-ethics',
      title: 'Publication Ethics',
      category: 'Standards',
      shortDesc: 'COPE-aligned publication ethics covering authorship, conflict of interest, plagiarism screening, and retraction protocols.',
    },
    {
      id: 'open-access',
      title: 'Open Access & Licensing',
      category: 'Licensing',
      shortDesc: 'Clear CC BY 4.0 open-access declarations ensuring unrestricted scholarly reuse with appropriate citation attribution.',
    },
    {
      id: 'publication-fees',
      title: 'Publication Fees & Charges',
      category: 'Policies',
      shortDesc: 'Transparent breakdown of the ₦5,000 Manuscript Processing Fee and ₦25,000 APC with formal waiver policies.',
    },
    {
      id: 'indexing-metrics',
      title: 'Indexing & Discovery',
      category: 'Visibility',
      shortDesc: 'Structured presentation of indexing services, Google Scholar metadata tags, and prospective indexing targets.',
    },
    {
      id: 'admin-dashboard',
      title: 'Staff Admin Dashboard',
      category: 'CMS',
      shortDesc: 'Intuitive, code-free administrative management console giving editorial staff full autonomy over articles, events, and dates.',
    },
    {
      id: 'ojs-continuity',
      title: 'OJS Continuity Bridge',
      category: 'Integration',
      shortDesc: 'Seamless integration preserving JORMASS’s existing OJS submission portal and reviewer accounts without disruption.',
    },
  ];

  return (
    <section id="proposal-workspace" className="py-12 sm:py-16 bg-[#050811] text-slate-100 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Workspace Title & Section Subhead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>OnlineFirst Interactive Workspace</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Explore the Proposal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Navigate through the proposal sections using the vertical menu below. Each section opens instantly in the interactive workspace.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-400 font-mono">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Target: <strong className="text-cyan-300">{DECISION_DEADLINE}</strong></span>
          </div>
        </div>

        {/* Mobile Section Selector (Horizontally scrollable tab row on mobile screens) */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950 to-blue-950 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {item.number}
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT: Futuristic Vertical Navigation Menu (4 cols on lg) */}
          {/* ========================================================= */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-3">
            <div className="rounded-3xl border border-slate-800 bg-[#070b16]/90 backdrop-blur-2xl p-4 shadow-xl space-y-2 relative overflow-hidden">
              {/* Vertical connecting accent line */}
              <div className="absolute left-7 top-8 bottom-8 w-[2px] bg-slate-800/80 pointer-events-none" />

              <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800/80 mb-1">
                Proposal Outline (8 Sections)
              </div>

              <nav aria-label="Proposal sections" className="space-y-1.5 relative">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectSection(item.id)}
                      className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center gap-3.5 group cursor-pointer relative ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/60 border border-cyan-400/80 ring-1 ring-cyan-400/40 shadow-lg shadow-cyan-500/10'
                          : 'border border-transparent hover:bg-slate-900/60 hover:border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {/* Numbered Indicator Circle */}
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-black transition-all z-10 ${
                          isActive
                            ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 group-hover:border-slate-700 group-hover:text-slate-200'
                        }`}
                      >
                        {item.number}
                      </div>

                      {/* Labels */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold truncate ${
                              isActive ? 'text-white font-serif tracking-tight' : 'text-slate-300'
                            }`}
                          >
                            {item.title}
                          </span>
                          {isActive && (
                            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                          )}
                        </div>
                        <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-cyan-300/90 font-medium' : 'text-slate-500'}`}>
                          {item.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Status Box in Left Sidebar */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 px-2 space-y-2">
                <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3 text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Active Concept:</span>
                    <span className="font-bold text-cyan-300">
                      {selectedDemoChoice ? demoTitles[selectedDemoChoice].name.split('—')[0].trim() : 'Demo 2'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Package Tier:</span>
                    <span className="font-bold text-cyan-300 uppercase">
                      {selectedPkg || 'Professional'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenDecisionModal}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-2 text-xs font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition shadow-md cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Confirm Direction</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Active Content Panel Glass Container (8 cols on lg) */}
          {/* ========================================================= */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-slate-800 bg-[#070b16]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8 min-h-[550px] relative overflow-hidden transition-all duration-300">
              {/* Subtle neon glow in corner */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* ========================================================= */}
              {/* 01 — WHY REDESIGN */}
              {/* ========================================================= */}
              {activeSection === 'why-redesign' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                        SECTION 01
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Executive Summary</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      Why Redesign JORMASS
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Findings from OnlineFirst's review of the existing JORMASS website and the strategic case for modernization.
                    </p>
                  </div>

                  {/* 6 Concise Review Findings Grid */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-400" />
                      <span>Key Review Findings (Current Limitations)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        {
                          title: 'Generic & Default Journal Presentation',
                          desc: 'The current layout relies on default styling that does not communicate the institutional stature of the College of Management Sciences (COLMAS, MOUAU).',
                        },
                        {
                          title: 'Important Trust Information Hard to Discover',
                          desc: 'Verified ISSN (2536-7412), peer-review workflows, and COPE ethics frameworks are difficult for international authors and indexing agencies to verify.',
                        },
                        {
                          title: 'Article & Archive Discovery Can Be Improved',
                          desc: 'Absence of live keyword search, taxonomy categorization, and responsive article readers makes exploring past volumes cumbersome.',
                        },
                        {
                          title: 'Author Information is Fragmented',
                          desc: 'Submission guidelines, fee structures (₦5,000 / ₦25,000), and referencing rules are scattered rather than presented in a unified author guide.',
                        },
                        {
                          title: 'Event Information is Not Structured',
                          desc: 'Faculty colloquiums, international management conferences, and CFP dates are presented as static notices without dedicated calendar scheduling.',
                        },
                        {
                          title: 'Heavy Technical Dependency for Routine Updates',
                          desc: 'Publishing new issues or updating editorial board rosters currently requires code-level interventions or complex backends rather than an autonomous CMS.',
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-1.5 hover:border-slate-700 transition"
                        >
                          <div className="flex items-center gap-2 text-xs font-bold text-white">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-400 font-mono text-[10px]">
                              {idx + 1}
                            </span>
                            <span>{item.title}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed pl-7">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result Statement Quote Box */}
                  <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 p-6 space-y-3 relative shadow-lg">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                      The OnlineFirst Result
                    </span>
                    <blockquote className="text-sm sm:text-base font-serif italic text-slate-100 leading-relaxed">
                      “OnlineFirst's redesign turns the existing journal presence into a clearer, more credible, and easier-to-manage digital publishing platform.”
                    </blockquote>
                  </div>

                  {/* Section Next CTA */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => onSelectSection('what-changes')}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <span>Next: What Changes (Current → Future)</span>
                      <ArrowRight className="h-4 w-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 02 — WHAT CHANGES */}
              {/* ========================================================= */}
              {activeSection === 'what-changes' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                        SECTION 02
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Transformation Matrix</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      Current JORMASS → Future JORMASS
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Direct side-by-side comparison of current journal limitations and the proposed modern platform.
                    </p>
                  </div>

                  {/* Interactive Current -> Future Comparison Cards */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          current: 'Generic OJS presentation',
                          future: 'Distinct JORMASS institutional identity & typography',
                          icon: Award,
                        },
                        {
                          current: 'Difficult archive discovery',
                          future: 'Searchable publication library with real-time filters',
                          icon: Search,
                        },
                        {
                          current: 'Scattered policies & fees',
                          future: 'Structured journal information & transparent guidelines',
                          icon: ShieldCheck,
                        },
                        {
                          current: 'Static event notices',
                          future: 'Editable academic events & conference platform',
                          icon: Calendar,
                        },
                        {
                          current: 'Limited editorial control',
                          future: 'Staff content-management dashboard (No code needed)',
                          icon: Layers,
                        },
                        {
                          current: 'Mobile reading limitations',
                          future: 'Mobile-first responsive reading & instant PDF viewer',
                          icon: Globe,
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 hover:border-cyan-500/30 transition group"
                        >
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 border-b border-slate-800 pb-2">
                            <item.icon className="h-4 w-4 text-cyan-400" />
                            <span>Transformation {idx + 1}</span>
                          </div>

                          <div className="space-y-2 text-xs">
                            {/* Current */}
                            <div className="flex items-start gap-2 bg-rose-950/20 border border-rose-900/30 rounded-xl p-2.5 text-slate-300">
                              <span className="text-[10px] font-mono font-bold uppercase text-rose-400 shrink-0 mt-0.5">
                                Current:
                              </span>
                              <span className="text-slate-400">{item.current}</span>
                            </div>

                            {/* Future */}
                            <div className="flex items-start gap-2 bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-2.5 text-slate-100">
                              <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 shrink-0 mt-0.5">
                                Future:
                              </span>
                              <span className="font-medium text-white">{item.future}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OJS Preservation Callout */}
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 flex items-start gap-3.5 text-xs text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-white">Full OJS Continuity Guaranteed</p>
                      <p className="text-slate-400 leading-relaxed">
                        The redesign enhances the public reader experience while seamlessly linking to JORMASS’s active OJS portal for manuscript submission and double-blind peer review.
                      </p>
                    </div>
                  </div>

                  {/* Section Next CTA */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => onSelectSection('why-redesign')}
                      className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      ← Back to Why Redesign
                    </button>
                    <button
                      onClick={() => onSelectSection('design-concepts')}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <span>Next: Explore 3 Design Concepts</span>
                      <ArrowRight className="h-4 w-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 03 — DESIGN CONCEPTS */}
              {/* ========================================================= */}
              {activeSection === 'design-concepts' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                        SECTION 03
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Working Prototypes</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      Three Distinct Design Concepts
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Each direction offers a complete, interactive scholarly website with working articles, archive catalogues, and events management.
                    </p>
                  </div>

                  {/* Render Demo Cards Component directly inside the workspace */}
                  <div className="space-y-6">
                    <DemoCards
                      onSelectDemo={onLaunchDemoPrototype}
                      selectedDemo={selectedDemoChoice}
                      onChooseDesign={onSelectDemoChoice}
                    />
                  </div>

                  {/* Section Next CTA */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onSelectSection('what-changes')}
                      className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      ← Back to What Changes
                    </button>
                    <button
                      onClick={() => onSelectSection('website-capabilities')}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <span>Next: Website Capabilities</span>
                      <ArrowRight className="h-4 w-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 04 — WEBSITE CAPABILITIES */}
              {/* ========================================================= */}
              {activeSection === 'website-capabilities' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                        SECTION 04
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Platform Features</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      Full Website Capabilities
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Interactive tiles for the 16 core features built into the redesigned JORMASS publishing platform. Click any tile to inspect its functional scope.
                    </p>
                  </div>

                  {/* 16 Interactive Capability Tiles Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {capabilitiesList.map((cap) => {
                      const isExpanded = selectedCapabilityId === cap.id;
                      return (
                        <div
                          key={cap.id}
                          onClick={() => setSelectedCapabilityId(isExpanded ? null : cap.id)}
                          className={`rounded-2xl border p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between select-none ${
                            isExpanded
                              ? 'bg-gradient-to-br from-cyan-950/80 via-slate-900 to-blue-950/60 border-cyan-400 ring-1 ring-cyan-400/40 shadow-lg'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="rounded bg-slate-950 px-2 py-0.5 font-mono text-[9px] font-bold text-cyan-400 uppercase border border-slate-800">
                                {cap.category}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="h-3.5 w-3.5 text-cyan-400" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                              )}
                            </div>
                            <h4 className="font-serif text-sm font-bold text-white">
                              {cap.title}
                            </h4>
                          </div>

                          <p className={`text-[11px] text-slate-400 leading-relaxed mt-2 ${isExpanded ? 'text-slate-200' : 'line-clamp-2'}`}>
                            {cap.shortDesc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Section Next CTA */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onSelectSection('design-concepts')}
                      className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      ← Back to Design Concepts
                    </button>
                    <button
                      onClick={() => onSelectSection('implementation-options')}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <span>Next: Implementation Options</span>
                      <ArrowRight className="h-4 w-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 05 — IMPLEMENTATION OPTIONS */}
              {/* ========================================================= */}
              {activeSection === 'implementation-options' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                        SECTION 05
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Investment Tiers</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      Implementation Options
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Select a package below to reveal full pricing, included cloud hosting, editorial CMS features, and technical support.
                    </p>
                  </div>

                  {/* Pricing Section rendered cleanly in workspace */}
                  <PricingSection
                    onSelectPackage={onSelectPackage}
                    selectedPackage={selectedPkg}
                  />

                  {/* Section Next CTA */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onSelectSection('website-capabilities')}
                      className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      ← Back to Website Capabilities
                    </button>
                    <button
                      onClick={() => onSelectSection('delivery-process')}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <span>Next: Delivery Process</span>
                      <ArrowRight className="h-4 w-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 06 — DELIVERY PROCESS */}
              {/* ========================================================= */}
              {activeSection === 'delivery-process' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                        SECTION 06
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Implementation Roadmap</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      Delivery Process
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      A straightforward 5-stage timeline from selection to live production launch.
                    </p>
                  </div>

                  {/* Compact 5-Step Timeline */}
                  <div className="space-y-3">
                    {[
                      {
                        num: '1',
                        title: 'Select',
                        desc: 'Choose preferred design concept (Demo 1, 2, or 3) and implementation package.',
                      },
                      {
                        num: '2',
                        title: 'Refine',
                        desc: 'Agree on specific layout customizations, typography tweaks, and final institutional assets.',
                      },
                      {
                        num: '3',
                        title: 'Configure',
                        desc: 'Set up cloud hosting, editorial CMS, publication taxonomy, events platform, and OJS continuity links.',
                      },
                      {
                        num: '4',
                        title: 'Test',
                        desc: 'Perform multi-device testing (mobile, tablet, desktop), verify PDF viewers, and validate search indexing.',
                      },
                      {
                        num: '5',
                        title: 'Launch',
                        desc: 'Connect the final production domain, complete staff CMS training, and transition to ongoing support.',
                      },
                    ].map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-cyan-500/30 transition"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-mono font-bold text-sm shadow-inner">
                          {step.num}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-serif text-base font-bold text-white">
                            {step.title}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section Next CTA */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onSelectSection('implementation-options')}
                      className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      ← Back to Implementation Options
                    </button>
                    <button
                      onClick={() => onSelectSection('your-selection')}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <span>Next: Your Selection Summary</span>
                      <ArrowRight className="h-4 w-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 07 — YOUR SELECTION */}
              {/* ========================================================= */}
              {activeSection === 'your-selection' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                        SECTION 07
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Direction Summary</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      Your Selection Summary
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Review your chosen design prototype, implementation package, and investment terms.
                    </p>
                  </div>

                  {/* Clean Selection Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Design Card */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                        01. Preferred Design Concept
                      </span>
                      {selectedDemoChoice ? (
                        <div className="space-y-1">
                          <p className="font-serif text-lg font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>{demoTitles[selectedDemoChoice].name}</span>
                          </p>
                          <p className="text-xs text-cyan-300">
                            {demoTitles[selectedDemoChoice].tag}
                          </p>
                          <button
                            onClick={() => onSelectSection('design-concepts')}
                            className="text-xs text-slate-400 hover:text-cyan-300 underline pt-2 block cursor-pointer"
                          >
                            Change Design Concept →
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-xs text-amber-300">No design concept selected yet</p>
                          <button
                            onClick={() => onSelectSection('design-concepts')}
                            className="text-xs text-cyan-400 hover:underline font-bold"
                          >
                            Choose from 3 Demos →
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Package Card */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                        02. Implementation Package
                      </span>
                      {selectedPkg ? (
                        <div className="space-y-1">
                          <p className="font-serif text-lg font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>{packageDetails[selectedPkg].name}</span>
                          </p>
                          <p className="text-xs text-cyan-300">
                            {packageDetails[selectedPkg].title}
                          </p>
                          <button
                            onClick={() => onSelectSection('implementation-options')}
                            className="text-xs text-slate-400 hover:text-cyan-300 underline pt-2 block cursor-pointer"
                          >
                            Change Package Tier →
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-xs text-amber-300">No package selected yet</p>
                          <button
                            onClick={() => onSelectSection('implementation-options')}
                            className="text-xs text-cyan-400 hover:underline font-bold"
                          >
                            Select a Package →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Investment & Hosting Info */}
                  <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                          Total One-Time Investment
                        </span>
                        <p className="font-serif text-3xl font-extrabold text-white mt-1">
                          {selectedPkg ? packageDetails[selectedPkg].price : '—'}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                          Cloud Hosting & Domain SLA
                        </span>
                        <p className="text-xs text-slate-300 mt-1 max-w-sm">
                          {selectedPkg ? packageDetails[selectedPkg].hosting : 'Select package to view terms'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-1">
                      <span>Transparent pricing • Guaranteed validity until {DECISION_DEADLINE}</span>
                      <button
                        onClick={() => onSelectSection('decision-next-step')}
                        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
                      >
                        <span>Proceed to Confirmation</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Section Next CTA */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onSelectSection('delivery-process')}
                      className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      ← Back to Delivery Process
                    </button>
                    <button
                      onClick={() => onSelectSection('decision-next-step')}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2.5 text-xs font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition cursor-pointer"
                    >
                      <span>Next: Decision & Next Steps</span>
                      <ArrowRight className="h-4 w-4 text-slate-950" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 08 — DECISION & NEXT STEP */}
              {/* ========================================================= */}
              {activeSection === 'decision-next-step' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                        SECTION 08
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Formal Decision</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                      Decision & Next Steps
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Submit your preferred direction to OnlineFirst to initiate refinement and schedule development.
                    </p>
                  </div>

                  {/* Deadline Box */}
                  <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 p-6 space-y-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                          Decision Deadline
                        </span>
                        <h4 className="font-serif text-2xl font-extrabold text-white">
                          {DECISION_DEADLINE}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Please confirm the preferred design and implementation direction by this date. If additional internal consultation is required, contact OnlineFirst before the deadline.
                    </p>
                  </div>

                  {/* Two Main Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <button
                      onClick={onOpenDecisionModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-8 py-3.5 text-xs sm:text-sm font-black text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition shadow-xl shadow-cyan-500/20 cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Confirm Direction</span>
                    </button>

                    <button
                      onClick={onOpenDecisionModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4 text-slate-400" />
                      <span>Request Adjustments</span>
                    </button>
                  </div>

                  {/* Section Next CTA */}
                  <div className="flex justify-start items-center pt-4 border-t border-slate-800">
                    <button
                      onClick={() => onSelectSection('your-selection')}
                      className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      ← Back to Your Selection
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
