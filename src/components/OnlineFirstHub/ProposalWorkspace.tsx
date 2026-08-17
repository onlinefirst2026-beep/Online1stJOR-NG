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
  Bookmark,
  FileCheck,
  Sliders,
  DollarSign,
  BarChart2,
  Terminal,
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

  // Exact 8 Vertical Menu Labels
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
      title: 'From → To',
      subtitle: 'Current JORMASS → Future Platform',
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
      title: 'Capabilities',
      subtitle: 'Archive, CMS, search, events',
    },
    {
      id: 'implementation-options',
      number: '05',
      title: 'Implementation Tiers',
      subtitle: 'Basic, Launch, Professional, Advanced',
    },
    {
      id: 'delivery-process',
      number: '06',
      title: 'Delivery Roadmap',
      subtitle: '5-Stage Delivery Timeline',
    },
    {
      id: 'your-selection',
      number: '07',
      title: 'Your Selection',
      subtitle: 'Chosen Design + Package Summary',
    },
    {
      id: 'decision-next-step',
      number: '08',
      title: 'Decision & Next Step',
      subtitle: `Target Deadline: ${DECISION_DEADLINE}`,
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
      icon: BookOpen,
      shortDesc: 'Prominent showcase of the active issue with volume/number, date, cover metadata, and direct PDF downloads.',
    },
    {
      id: 'publication-archive',
      title: 'Publication Archive',
      category: 'Publications',
      icon: Layers,
      shortDesc: 'Permanent Volume → Issue → Article hierarchy enabling seamless browsing of past volumes and future releases.',
    },
    {
      id: 'article-search',
      title: 'Article Search Engine',
      category: 'Discovery',
      icon: Search,
      shortDesc: 'Instant multi-parameter search across author names, article titles, keywords, abstract terms, and publication years.',
    },
    {
      id: 'article-details',
      title: 'Article Details & Citations',
      category: 'Reading',
      icon: FileText,
      shortDesc: 'Dedicated reading page with DOI badges, CC BY licensing, abstract boxes, and instant APA/Harvard/Chicago citation generation.',
    },
    {
      id: 'events-management',
      title: 'Events Management',
      category: 'Faculty',
      icon: Calendar,
      shortDesc: 'Dedicated module for announcing COLMAS faculty public lectures, international management conferences, and symposiums.',
    },
    {
      id: 'announcements',
      title: 'Announcements Hub',
      category: 'Editorial',
      icon: Zap,
      shortDesc: 'Broadcast Call for Papers (CFP), special issue deadlines, editorial notices, and publisher updates directly to readers.',
    },
    {
      id: 'editorial-calendar',
      title: 'Editorial Calendar',
      category: 'Schedules',
      icon: Clock,
      shortDesc: 'Structured schedule tracking submission deadlines, review windows, editorial decisions, and target publication dates.',
    },
    {
      id: 'editorial-board',
      title: 'Editorial Board Roster',
      category: 'Governance',
      icon: Users,
      shortDesc: 'Complete directory of Editors-in-Chief, section editors, institutional affiliations, and verified ORCID profile links.',
    },
    {
      id: 'author-guidelines',
      title: 'Author Guidelines',
      category: 'Submissions',
      icon: FileCheck,
      shortDesc: 'Clear formatting instructions, APA 7th referencing guides, Word document template downloads, and submission instructions.',
    },
    {
      id: 'peer-review',
      title: 'Peer Review Workflow',
      category: 'Standards',
      icon: ShieldCheck,
      shortDesc: '7-step double-blind peer review transparency policy explaining initial triage, blind review, revision, and acceptance.',
    },
    {
      id: 'publication-ethics',
      title: 'Publication Ethics',
      category: 'Standards',
      icon: Award,
      shortDesc: 'COPE-aligned publication ethics covering authorship, conflict of interest, plagiarism screening, and retraction protocols.',
    },
    {
      id: 'open-access',
      title: 'Open Access & Licensing',
      category: 'Licensing',
      icon: Globe,
      shortDesc: 'Clear CC BY 4.0 open-access declarations ensuring unrestricted scholarly reuse with appropriate citation attribution.',
    },
    {
      id: 'publication-fees',
      title: 'Publication Fees & Charges',
      category: 'Policies',
      icon: DollarSign,
      shortDesc: 'Transparent breakdown of the ₦5,000 Manuscript Processing Fee and ₦25,000 APC with formal waiver policies.',
    },
    {
      id: 'indexing-metrics',
      title: 'Indexing & Discovery',
      category: 'Visibility',
      icon: BarChart2,
      shortDesc: 'Structured presentation of indexing services, Google Scholar metadata tags, and prospective indexing targets.',
    },
    {
      id: 'admin-dashboard',
      title: 'Staff Admin Dashboard',
      category: 'CMS',
      icon: Sliders,
      shortDesc: 'Intuitive, code-free administrative management console giving editorial staff full autonomy over articles, events, and dates.',
    },
    {
      id: 'ojs-continuity',
      title: 'OJS Continuity Bridge',
      category: 'Integration',
      icon: Database,
      shortDesc: 'Seamless integration preserving JORMASS’s existing OJS submission portal and reviewer accounts without disruption.',
    },
  ];

  return (
    <section id="proposal-workspace" className="py-12 sm:py-16 bg-transparent text-[#F5FAFF] relative font-inter">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Workspace Title & Section Subhead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#223753] pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-clean font-bold tracking-widest text-[#35D6FF] uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#35D6FF]" />
              <span>OnlineFirst Interactive Workspace</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F5FAFF] tracking-tight">
              Explore the Proposal
            </h2>
            <p className="text-sm sm:text-base text-[#B7C6D8] max-w-xl leading-relaxed">
              Navigate through the proposal sections using the vertical menu below. Each section opens instantly in the interactive workspace.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-[#14263D]/80 border border-[#223753] rounded-xl px-3.5 py-2 text-xs text-[#B7C6D8] font-mono-clean">
            <Clock className="h-4 w-4 text-[#35D6FF]" />
            <span>Decision Target: <strong className="text-[#7BE7FF]">{DECISION_DEADLINE}</strong></span>
          </div>
        </div>

        {/* Mobile Section Selector (Horizontally scrollable tab row on mobile screens) */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#314A68]">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer border min-h-[44px] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#14263D] to-[#223753] border-[#35D6FF] text-[#7BE7FF] font-bold shadow-md shadow-[#35D6FF]/10'
                      : 'bg-[#14263D]/70 border-[#223753] text-[#B7C6D8] hover:text-[#F5FAFF]'
                  }`}
                >
                  <span className={`font-mono-clean text-xs font-bold ${isActive ? 'text-[#35D6FF]' : 'text-[#314A68]'}`}>
                    {item.number}
                  </span>
                  <span className="font-medium text-sm">{item.title}</span>
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
            <div className="rounded-3xl border border-[#223753] bg-[#14263D]/80 backdrop-blur-2xl p-4 shadow-xl space-y-2 relative overflow-hidden">
              {/* Vertical connecting accent line */}
              <div className="absolute left-7 top-8 bottom-8 w-[2px] bg-[#223753] pointer-events-none" />

              <div className="px-3 py-2 text-xs font-mono-clean font-bold uppercase tracking-widest text-[#B7C6D8] border-b border-[#223753] mb-1 flex items-center justify-between">
                <span>Proposal Outline</span>
                <span className="text-[#35D6FF] font-mono-clean">8 SECTIONS</span>
              </div>

              <nav aria-label="Proposal sections" className="space-y-1.5 relative">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectSection(item.id)}
                      className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center gap-3.5 group cursor-pointer relative min-h-[48px] ${
                        isActive
                          ? 'bg-gradient-to-r from-[#14263D] via-[#1A2E47] to-[#223753] border-l-4 border-[#35D6FF] border-y border-r border-[#223753] text-[#F5FAFF] ring-1 ring-[#35D6FF]/40 shadow-lg shadow-[#35D6FF]/10'
                          : 'border border-transparent hover:bg-[#14263D]/60 hover:border-[#223753] text-[#B7C6D8] hover:text-[#F5FAFF]'
                      }`}
                    >
                      {/* Numbered Indicator Circle */}
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono-clean text-xs font-bold transition-all z-10 ${
                          isActive
                            ? 'bg-gradient-to-tr from-[#35D6FF] to-[#3182CE] text-[#0A121E] shadow-md shadow-[#35D6FF]/20 scale-105'
                            : 'bg-[#0E1A2B] border border-[#223753] text-[#B7C6D8] group-hover:border-[#314A68] group-hover:text-[#F5FAFF]'
                        }`}
                      >
                        {item.number}
                      </div>

                      {/* Labels */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-semibold truncate ${
                              isActive ? 'text-[#F5FAFF] font-heading font-bold' : 'text-[#D8F3FF]'
                            }`}
                          >
                            {item.title}
                          </span>
                          {isActive && (
                            <span className="flex h-2 w-2 rounded-full bg-[#35D6FF] animate-pulse shrink-0 shadow-[0_0_8px_#35D6FF]" />
                          )}
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${isActive ? 'text-[#7BE7FF] font-medium' : 'text-[#B7C6D8]'}`}>
                          {item.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Status Box in Left Sidebar */}
              <div className="pt-4 mt-3 border-t border-[#223753] px-2 space-y-2.5">
                <div className="rounded-xl bg-[#0E1A2B]/80 border border-[#223753] p-3 text-xs space-y-1.5 font-mono-clean">
                  <div className="flex justify-between text-[#B7C6D8]">
                    <span>Active Concept:</span>
                    <span className="font-bold text-[#7BE7FF]">
                      {selectedDemoChoice ? demoTitles[selectedDemoChoice].name.split('—')[0].trim() : 'Demo 2'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#B7C6D8]">
                    <span>Package Tier:</span>
                    <span className="font-bold text-[#35D6FF] uppercase">
                      {selectedPkg || 'Professional'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenDecisionModal}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-4 py-2.5 text-xs font-bold text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition shadow-md cursor-pointer min-h-[44px]"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Confirm Direction</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Active Content Panel Glass Container (8 cols on lg) */}
          {/* ========================================================= */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-[#223753] bg-[#14263D]/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8 min-h-[550px] relative overflow-hidden transition-all duration-300">
              {/* Subtle orbital glow in corner */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#35D6FF]/10 rounded-full blur-3xl pointer-events-none" />

              {/* ========================================================= */}
              {/* 01 — WHY REDESIGN */}
              {/* ========================================================= */}
              {activeSection === 'why-redesign' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#223753] pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-clean text-xs font-bold text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                        SECTION 01
                      </span>
                      <span className="text-xs text-[#B7C6D8] font-mono-clean">Executive Summary</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5FAFF] tracking-tight">
                      Why Redesign JORMASS
                    </h3>
                    <p className="text-sm sm:text-base text-[#B7C6D8] leading-relaxed">
                      Findings from OnlineFirst's review of the existing JORMASS website and the strategic case for modernization.
                    </p>
                  </div>

                  {/* 6 Concise Review Findings Grid */}
                  <div className="space-y-4">
                    <h4 className="font-mono-clean text-xs font-bold uppercase tracking-wider text-[#7BE7FF] flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-[#F2C94C]" />
                      <span>Key Review Findings (Current Limitations)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="rounded-2xl border border-[#223753] bg-[#0E1A2B]/60 p-5 space-y-2 hover:border-[#314A68] transition"
                        >
                          <div className="flex items-center gap-2.5 text-sm font-bold text-[#F5FAFF]">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#35D6FF]/10 text-[#7BE7FF] font-mono-clean text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span className="font-heading text-sm sm:text-base font-bold">{item.title}</span>
                          </div>
                          <p className="text-sm text-[#B7C6D8] leading-relaxed pl-8">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result Statement Quote Box */}
                  <div className="rounded-2xl border border-[#35D6FF]/30 bg-gradient-to-r from-[#14263D] via-[#1A2E47] to-[#223753] p-6 space-y-3 relative shadow-lg">
                    <span className="text-xs font-mono-clean font-bold uppercase tracking-widest text-[#35D6FF]">
                      The OnlineFirst Result
                    </span>
                    <blockquote className="text-base sm:text-lg font-heading font-medium text-[#F5FAFF] leading-relaxed">
                      “OnlineFirst's redesign turns the existing journal presence into a clearer, more credible, and easier-to-manage digital publishing platform.”
                    </blockquote>
                  </div>

                  {/* Section Navigation Footer (Previous/Next Controls) */}
                  <div className="flex justify-end items-center pt-4 border-t border-[#223753]">
                    <button
                      onClick={() => onSelectSection('what-changes')}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-3 text-sm font-bold text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition cursor-pointer min-h-[44px]"
                    >
                      <span>Next: From → To</span>
                      <ArrowRight className="h-4 w-4 text-[#0A121E]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 02 — FROM → TO */}
              {/* ========================================================= */}
              {activeSection === 'what-changes' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#223753] pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-clean text-xs font-bold text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                        SECTION 02
                      </span>
                      <span className="text-xs text-[#B7C6D8] font-mono-clean">Transformation Matrix</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5FAFF] tracking-tight">
                      From Current JORMASS → Future Platform
                    </h3>
                    <p className="text-sm sm:text-base text-[#B7C6D8] leading-relaxed">
                      Direct side-by-side comparison of current journal limitations and the proposed modern platform.
                    </p>
                  </div>

                  {/* Interactive Current -> Future Comparison Cards */}
                  <div className="space-y-4">
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
                          className="rounded-2xl border border-[#223753] bg-[#0E1A2B]/60 p-5 space-y-3 hover:border-[#35D6FF]/40 transition group"
                        >
                          <div className="flex items-center gap-2 text-xs font-mono-clean font-bold text-[#B7C6D8] border-b border-[#223753] pb-2">
                            <item.icon className="h-4 w-4 text-[#35D6FF]" />
                            <span>Transformation {idx + 1}</span>
                          </div>

                          <div className="space-y-2 text-sm">
                            {/* Current */}
                            <div className="flex items-start gap-2 bg-[#223753]/30 border border-[#314A68] rounded-xl p-3 text-[#B7C6D8]">
                              <span className="text-xs font-mono-clean font-bold uppercase text-[#B7C6D8] shrink-0 mt-0.5">
                                Current:
                              </span>
                              <span className="text-[#B7C6D8]">{item.current}</span>
                            </div>

                            {/* Future */}
                            <div className="flex items-start gap-2 bg-[#14263D] border border-[#35D6FF]/30 rounded-xl p-3 text-[#F5FAFF]">
                              <span className="text-xs font-mono-clean font-bold uppercase text-[#35D6FF] shrink-0 mt-0.5">
                                Future:
                              </span>
                              <span className="font-medium text-[#F5FAFF]">{item.future}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OJS Preservation Callout */}
                  <div className="rounded-2xl border border-[#35D6FF]/30 bg-[#14263D]/90 p-5 flex items-start gap-4 text-sm text-[#D8F3FF]">
                    <CheckCircle2 className="h-5 w-5 text-[#35D6FF] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-[#F5FAFF] text-base">Full OJS Continuity Guaranteed</p>
                      <p className="text-[#B7C6D8] leading-relaxed text-sm">
                        The redesign enhances the public reader experience while seamlessly linking to JORMASS’s active OJS portal for manuscript submission and double-blind peer review.
                      </p>
                    </div>
                  </div>

                  {/* Section Navigation Footer (Previous/Next Controls) */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#223753]">
                    <button
                      onClick={() => onSelectSection('why-redesign')}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#0E1A2B]/80 px-5 py-3 text-sm font-semibold text-[#D8F3FF] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[44px]"
                    >
                      ← Previous: Why Redesign
                    </button>
                    <button
                      onClick={() => onSelectSection('design-concepts')}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-3 text-sm font-bold text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition cursor-pointer min-h-[44px]"
                    >
                      <span>Next: Design Concepts</span>
                      <ArrowRight className="h-4 w-4 text-[#0A121E]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 03 — DESIGN CONCEPTS */}
              {/* ========================================================= */}
              {activeSection === 'design-concepts' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#223753] pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-clean text-xs font-bold text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                        SECTION 03
                      </span>
                      <span className="text-xs text-[#B7C6D8] font-mono-clean">Working Prototypes</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5FAFF] tracking-tight">
                      Three Distinct Design Concepts
                    </h3>
                    <p className="text-sm sm:text-base text-[#B7C6D8] leading-relaxed">
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

                  {/* Section Navigation Footer (Previous/Next Controls) */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#223753]">
                    <button
                      onClick={() => onSelectSection('what-changes')}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#0E1A2B]/80 px-5 py-3 text-sm font-semibold text-[#D8F3FF] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[44px]"
                    >
                      ← Previous: From → To
                    </button>
                    <button
                      onClick={() => onSelectSection('website-capabilities')}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-3 text-sm font-bold text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition cursor-pointer min-h-[44px]"
                    >
                      <span>Next: Capabilities</span>
                      <ArrowRight className="h-4 w-4 text-[#0A121E]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 04 — CAPABILITIES */}
              {/* ========================================================= */}
              {activeSection === 'website-capabilities' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#223753] pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-clean text-xs font-bold text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                        SECTION 04
                      </span>
                      <span className="text-xs text-[#B7C6D8] font-mono-clean">Platform Features</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5FAFF] tracking-tight">
                      Website Capabilities
                    </h3>
                    <p className="text-sm sm:text-base text-[#B7C6D8] leading-relaxed">
                      Interactive tiles for the 16 core features built into the redesigned JORMASS publishing platform. Click any tile to inspect its functional scope.
                    </p>
                  </div>

                  {/* 16 Interactive Capability Tiles Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                    {capabilitiesList.map((cap) => {
                      const isExpanded = selectedCapabilityId === cap.id;
                      const IconComponent = cap.icon;

                      return (
                        <div
                          key={cap.id}
                          onClick={() => setSelectedCapabilityId(isExpanded ? null : cap.id)}
                          className={`rounded-2xl border p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between select-none min-h-[140px] ${
                            isExpanded
                              ? 'bg-gradient-to-br from-[#14263D] via-[#1A2E47] to-[#223753] border-[#35D6FF] ring-1 ring-[#35D6FF]/40 shadow-lg'
                              : 'bg-[#0E1A2B]/60 border-[#223753] hover:border-[#314A68] hover:bg-[#14263D]/60'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="rounded bg-[#0E1A2B] px-2 py-0.5 font-mono-clean text-[10px] font-bold text-[#7BE7FF] uppercase border border-[#223753]">
                                {cap.category}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-[#35D6FF]" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-[#B7C6D8]" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                              <IconComponent className="h-4 w-4 text-[#35D6FF] shrink-0" />
                              <h4 className="font-heading text-sm sm:text-base font-bold text-[#F5FAFF]">
                                {cap.title}
                              </h4>
                            </div>
                          </div>

                          <p className={`text-xs sm:text-sm text-[#B7C6D8] leading-relaxed mt-2.5 ${isExpanded ? 'text-[#D8F3FF]' : 'line-clamp-2'}`}>
                            {cap.shortDesc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Section Navigation Footer (Previous/Next Controls) */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#223753]">
                    <button
                      onClick={() => onSelectSection('design-concepts')}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#0E1A2B]/80 px-5 py-3 text-sm font-semibold text-[#D8F3FF] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[44px]"
                    >
                      ← Previous: Design Concepts
                    </button>
                    <button
                      onClick={() => onSelectSection('implementation-options')}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-3 text-sm font-bold text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition cursor-pointer min-h-[44px]"
                    >
                      <span>Next: Implementation Tiers</span>
                      <ArrowRight className="h-4 w-4 text-[#0A121E]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 05 — IMPLEMENTATION TIERS */}
              {/* ========================================================= */}
              {activeSection === 'implementation-options' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#223753] pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-clean text-xs font-bold text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                        SECTION 05
                      </span>
                      <span className="text-xs text-[#B7C6D8] font-mono-clean">Investment Tiers</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5FAFF] tracking-tight">
                      Implementation Tiers
                    </h3>
                    <p className="text-sm sm:text-base text-[#B7C6D8] leading-relaxed">
                      Select a package below to reveal full pricing, included cloud hosting, editorial CMS features, and technical support.
                    </p>
                  </div>

                  {/* Pricing Section rendered cleanly in workspace */}
                  <PricingSection
                    onSelectPackage={onSelectPackage}
                    selectedPackage={selectedPkg}
                  />

                  {/* Section Navigation Footer (Previous/Next Controls) */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#223753]">
                    <button
                      onClick={() => onSelectSection('website-capabilities')}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#0E1A2B]/80 px-5 py-3 text-sm font-semibold text-[#D8F3FF] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[44px]"
                    >
                      ← Previous: Capabilities
                    </button>
                    <button
                      onClick={() => onSelectSection('delivery-process')}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-3 text-sm font-bold text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition cursor-pointer min-h-[44px]"
                    >
                      <span>Next: Delivery Roadmap</span>
                      <ArrowRight className="h-4 w-4 text-[#0A121E]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 06 — DELIVERY ROADMAP */}
              {/* ========================================================= */}
              {activeSection === 'delivery-process' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#223753] pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-clean text-xs font-bold text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                        SECTION 06
                      </span>
                      <span className="text-xs text-[#B7C6D8] font-mono-clean">Implementation Timeline</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5FAFF] tracking-tight">
                      Delivery Roadmap
                    </h3>
                    <p className="text-sm sm:text-base text-[#B7C6D8] leading-relaxed">
                      A straightforward 5-stage timeline from selection to live production launch.
                    </p>
                  </div>

                  {/* Compact 5-Step Timeline */}
                  <div className="space-y-3.5">
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
                        className="flex items-start gap-4 rounded-2xl border border-[#223753] bg-[#0E1A2B]/60 p-5 hover:border-[#35D6FF]/30 transition"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#14263D] border border-[#223753] text-[#35D6FF] font-mono-clean font-bold text-base shadow-inner">
                          {step.num}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-heading text-base sm:text-lg font-bold text-[#F5FAFF]">
                            {step.title}
                          </h4>
                          <p className="text-sm text-[#B7C6D8] leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section Navigation Footer (Previous/Next Controls) */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#223753]">
                    <button
                      onClick={() => onSelectSection('implementation-options')}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#0E1A2B]/80 px-5 py-3 text-sm font-semibold text-[#D8F3FF] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[44px]"
                    >
                      ← Previous: Implementation Tiers
                    </button>
                    <button
                      onClick={() => onSelectSection('your-selection')}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-3 text-sm font-bold text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition cursor-pointer min-h-[44px]"
                    >
                      <span>Next: Your Selection</span>
                      <ArrowRight className="h-4 w-4 text-[#0A121E]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 07 — YOUR SELECTION */}
              {/* ========================================================= */}
              {activeSection === 'your-selection' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#223753] pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-clean text-xs font-bold text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                        SECTION 07
                      </span>
                      <span className="text-xs text-[#B7C6D8] font-mono-clean">Direction Summary</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5FAFF] tracking-tight">
                      Your Selection
                    </h3>
                    <p className="text-sm sm:text-base text-[#B7C6D8] leading-relaxed">
                      Review your chosen design prototype, implementation package, and investment terms.
                    </p>
                  </div>

                  {/* Clean Selection Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Design Card */}
                    <div className="rounded-2xl border border-[#223753] bg-[#0E1A2B]/70 p-6 space-y-3">
                      <span className="text-xs font-mono-clean uppercase tracking-widest text-[#B7C6D8] font-bold">
                        01. Preferred Design Concept
                      </span>
                      {selectedDemoChoice ? (
                        <div className="space-y-1.5">
                          <p className="font-heading text-lg font-bold text-[#F5FAFF] flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#35D6FF] shrink-0" />
                            <span>{demoTitles[selectedDemoChoice].name}</span>
                          </p>
                          <p className="text-sm text-[#7BE7FF]">
                            {demoTitles[selectedDemoChoice].tag}
                          </p>
                          <button
                            onClick={() => onSelectSection('design-concepts')}
                            className="text-xs font-semibold text-[#B7C6D8] hover:text-[#35D6FF] underline pt-2 block cursor-pointer"
                          >
                            Change Design Concept →
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-[#F2C94C]">No design concept selected yet</p>
                          <button
                            onClick={() => onSelectSection('design-concepts')}
                            className="text-xs text-[#35D6FF] hover:underline font-bold"
                          >
                            Choose from 3 Demos →
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Package Card */}
                    <div className="rounded-2xl border border-[#223753] bg-[#0E1A2B]/70 p-6 space-y-3">
                      <span className="text-xs font-mono-clean uppercase tracking-widest text-[#B7C6D8] font-bold">
                        02. Implementation Package
                      </span>
                      {selectedPkg ? (
                        <div className="space-y-1.5">
                          <p className="font-heading text-lg font-bold text-[#F5FAFF] flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#35D6FF] shrink-0" />
                            <span>{packageDetails[selectedPkg].name}</span>
                          </p>
                          <p className="text-sm text-[#7BE7FF]">
                            {packageDetails[selectedPkg].title}
                          </p>
                          <button
                            onClick={() => onSelectSection('implementation-options')}
                            className="text-xs font-semibold text-[#B7C6D8] hover:text-[#35D6FF] underline pt-2 block cursor-pointer"
                          >
                            Change Package Tier →
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-[#F2C94C]">No package selected yet</p>
                          <button
                            onClick={() => onSelectSection('implementation-options')}
                            className="text-xs text-[#35D6FF] hover:underline font-bold"
                          >
                            Select a Package →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Investment & Hosting Info */}
                  <div className="rounded-2xl border border-[#35D6FF]/30 bg-[#0E1A2B]/80 p-6 sm:p-7 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#223753] pb-5">
                      <div>
                        <span className="text-xs font-mono-clean uppercase tracking-widest text-[#B7C6D8] font-bold">
                          Total One-Time Investment
                        </span>
                        <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F5FAFF] mt-1 tracking-tight">
                          {selectedPkg ? packageDetails[selectedPkg].price : '—'}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-xs font-mono-clean uppercase tracking-widest text-[#B7C6D8] font-bold">
                          Cloud Hosting & Domain SLA
                        </span>
                        <p className="text-sm text-[#D8F3FF] mt-1 max-w-sm">
                          {selectedPkg ? packageDetails[selectedPkg].hosting : 'Select package to view terms'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#B7C6D8] pt-1">
                      <span>Transparent institutional pricing • Guaranteed terms until {DECISION_DEADLINE}</span>
                      <button
                        onClick={() => onSelectSection('decision-next-step')}
                        className="inline-flex items-center gap-1.5 text-sm text-[#35D6FF] hover:text-[#7BE7FF] font-bold cursor-pointer"
                      >
                        <span>Proceed to Confirmation</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Section Navigation Footer (Previous/Next Controls) */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#223753]">
                    <button
                      onClick={() => onSelectSection('delivery-process')}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#0E1A2B]/80 px-5 py-3 text-sm font-semibold text-[#D8F3FF] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[44px]"
                    >
                      ← Previous: Delivery Roadmap
                    </button>
                    <button
                      onClick={() => onSelectSection('decision-next-step')}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-6 py-3 text-sm font-bold text-[#0A121E] hover:shadow-[0_0_15px_rgba(53,214,255,0.4)] transition cursor-pointer min-h-[44px]"
                    >
                      <span>Next: Decision & Next Step</span>
                      <ArrowRight className="h-4 w-4 text-[#0A121E]" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 08 — DECISION & NEXT STEP */}
              {/* ========================================================= */}
              {activeSection === 'decision-next-step' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="space-y-2 border-b border-[#223753] pb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-clean text-xs font-bold text-[#35D6FF] bg-[#0E1A2B] border border-[#35D6FF]/30 px-2.5 py-0.5 rounded-md">
                        SECTION 08
                      </span>
                      <span className="text-xs text-[#B7C6D8] font-mono-clean">Formal Decision</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5FAFF] tracking-tight">
                      Decision & Next Step
                    </h3>
                    <p className="text-sm sm:text-base text-[#B7C6D8] leading-relaxed">
                      Submit your preferred direction to OnlineFirst to initiate refinement and schedule development.
                    </p>
                  </div>

                  {/* Deadline Box */}
                  <div className="rounded-2xl border border-[#35D6FF]/40 bg-gradient-to-r from-[#14263D] via-[#1A2E47] to-[#223753] p-7 space-y-4 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#35D6FF]/10 border border-[#35D6FF]/30 text-[#35D6FF]">
                        <Calendar className="h-7 w-7" />
                      </div>
                      <div>
                        <span className="text-xs font-mono-clean uppercase tracking-widest text-[#35D6FF] font-bold">
                          Decision Deadline
                        </span>
                        <h4 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#F5FAFF]">
                          {DECISION_DEADLINE}
                        </h4>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[#D8F3FF] leading-relaxed">
                      Please confirm the preferred design and implementation direction by this date. If additional internal consultation is required, contact OnlineFirst before the deadline.
                    </p>
                  </div>

                  {/* Two Main Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
                    <button
                      onClick={onOpenDecisionModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] px-8 py-3.5 text-sm sm:text-base font-bold text-[#0A121E] hover:shadow-[0_0_20px_rgba(53,214,255,0.4)] transition shadow-xl cursor-pointer min-h-[48px]"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Confirm Direction</span>
                    </button>

                    <button
                      onClick={onOpenDecisionModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#314A68] bg-[#0E1A2B]/80 px-7 py-3.5 text-sm sm:text-base font-bold text-[#D8F3FF] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[48px]"
                    >
                      <MessageSquare className="h-4 w-4 text-[#7BE7FF]" />
                      <span>Request Adjustments</span>
                    </button>
                  </div>

                  {/* Section Navigation Footer (Previous Control) */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#223753]">
                    <button
                      onClick={() => onSelectSection('your-selection')}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#314A68] bg-[#0E1A2B]/80 px-5 py-3 text-sm font-semibold text-[#D8F3FF] hover:bg-[#223753] hover:text-white transition cursor-pointer min-h-[44px]"
                    >
                      ← Previous: Your Selection
                    </button>
                    <button
                      onClick={() => onSelectSection('why-redesign')}
                      className="text-xs font-semibold text-[#B7C6D8] hover:text-[#35D6FF] transition cursor-pointer"
                    >
                      Return to Beginning (Section 01) ↺
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
