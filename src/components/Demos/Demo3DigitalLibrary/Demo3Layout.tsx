import React, { useState } from 'react';
import {
  JournalSettings,
  JournalPage,
  ThemeVariant,
} from '../../../types';
import {
  BookOpen,
  Search,
  ExternalLink,
  Lock,
  Menu,
  X,
  ShieldCheck,
  Award,
  ChevronRight,
  Globe,
  FileText,
  Building,
  Sparkles,
} from 'lucide-react';
import { DemoFloatingBar } from '../../Common/DemoFloatingBar';

interface Demo3LayoutProps {
  settings: JournalSettings;
  currentPage: JournalPage;
  onNavigate: (page: JournalPage) => void;
  onOpenSearch: () => void;
  onOpenOjs: () => void;
  onBackToHub?: () => void;
  onSwitchDemo?: (theme: ThemeVariant) => void;
  onSelectConcept?: (theme: ThemeVariant) => void;
  children: React.ReactNode;
}

export const Demo3Layout: React.FC<Demo3LayoutProps> = ({
  settings,
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenOjs,
  onBackToHub,
  onSwitchDemo,
  onSelectConcept,
  children,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems: { label: string; page: JournalPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Current Issue', page: 'current-issue' },
    { label: 'Archive', page: 'archive' },
    { label: 'Editorial Board', page: 'editorial-board' },
    { label: 'Peer Review', page: 'peer-review' },
    { label: 'Indexing & Discovery', page: 'indexing' },
    { label: 'Events & Conferences', page: 'events' },
    { label: 'Author Guidelines', page: 'author-guidelines' },
    { label: 'About & Scope', page: 'about' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#20255C] font-sans selection:bg-[#E2E5F3] selection:text-[#20255C] flex flex-col antialiased">
      {/* Floating Demo Control Bar */}
      {onBackToHub && onSwitchDemo && (
        <DemoFloatingBar
          currentTheme="demo3"
          currentPage={currentPage}
          onBackToHub={onBackToHub}
          onSwitchDemo={onSwitchDemo}
          onSelectConcept={onSelectConcept}
          onNavigatePage={onNavigate}
        />
      )}

      {/* 1. TOP UTILITY BAR (Deep Navy #20255C with Warm Gold #FFC84D and Rust Orange #B33600 accents) */}
      <div className="border-b border-[#141840] bg-[#20255C] text-white text-xs px-4 py-2 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 text-[#FFC84D]" />
              <span>COLMAS</span>
            </span>
            <span className="text-[#E2E5F3]/50 hidden sm:inline">•</span>
            <span className="text-white/90 hidden sm:inline">{settings.institution}</span>
            <span className="text-[#E2E5F3]/50 hidden md:inline">•</span>
            <span className="hidden md:inline text-white/80">
              ISSN: {settings.issnPrint} (Print) | {settings.issnOnline} (Online)
            </span>
            <span className="rounded bg-[#FFC84D] px-2 py-0.5 text-[10px] font-bold text-[#20255C] shadow-xs">
              Open Access
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <button
              onClick={onOpenOjs}
              className="inline-flex items-center gap-1 text-[#E2E5F3] hover:text-white transition font-medium cursor-pointer"
            >
              <Lock className="h-3 w-3 text-[#FFC84D]" />
              <span>OJS Portal</span>
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => onNavigate('submit')}
              className="rounded bg-[#B33600] hover:bg-[#8f2b00] text-white font-bold px-3 py-1 transition text-[11px] inline-flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Submit Manuscript</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. JOURNAL BRAND HEADER */}
      <header className="border-b border-[#E2E5F3] bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#20255C] text-white text-[11px] font-bold px-2.5 py-0.5 uppercase tracking-wider shadow-xs">
                  Official Journal
                </span>
                <span className="text-xs text-[#6B3F74] font-bold">
                  Faculty of Management & Social Sciences
                </span>
              </div>
              <h1
                onClick={() => onNavigate('home')}
                className="cursor-pointer text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#20255C] hover:text-[#B33600] transition font-heading"
              >
                Journal of Research in Management and Social Sciences
              </h1>
              <p className="text-xs sm:text-sm text-[#50577A] font-medium">
                Published by {settings.faculty} • {settings.institution}, Umudike, Nigeria
              </p>
            </div>

            {/* Quick Metrics Badge Strip */}
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0 pt-2 md:pt-0 text-xs">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#E2E5F3]/50 border border-[#E2E5F3] px-3 py-1 text-[#20255C]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#6B3F74]" />
                <span className="font-semibold">Double-Blind Peer Reviewed</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#FFC84D]/15 border border-[#FFC84D]/40 px-3 py-1 text-[#20255C]">
                <Globe className="h-3.5 w-3.5 text-[#B33600]" />
                <span className="font-bold">CC BY 4.0 Open Access</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. STICKY HORIZONTAL NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E2E5F3] shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 overflow-x-auto text-xs font-semibold">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className={`px-3 py-3 border-b-2 transition whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border-[#B33600] text-[#B33600] font-bold bg-[#E2E5F3]/40'
                        : 'border-transparent text-[#50577A] hover:text-[#20255C] hover:border-[#6B3F74]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Header Title / Hamburger */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <span className="text-xs font-bold text-[#20255C] uppercase tracking-wider">
                JORMASS Discovery
              </span>
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="p-1.5 rounded-md text-[#20255C] hover:bg-[#E2E5F3]"
                aria-label="Toggle Menu"
              >
                {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Quick Action Search Trigger in Sticky Nav */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="inline-flex items-center gap-1.5 text-xs text-[#20255C] hover:text-white bg-[#E2E5F3]/50 hover:bg-[#20255C] border border-[#E2E5F3] px-3 py-1.5 rounded-md transition font-medium cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 text-[#B33600]" />
                <span>Search Articles</span>
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          {mobileNavOpen && (
            <div className="lg:hidden py-3 border-t border-[#E2E5F3] space-y-1 bg-white">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      setMobileNavOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md flex items-center justify-between ${
                      isActive
                        ? 'bg-[#6B3F74] text-white font-bold'
                        : 'text-[#50577A] hover:bg-[#E2E5F3]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* 4. MAIN CONTENT AREA */}
      <main className="flex-1 bg-[#F8FAFC]">
        {children}
      </main>

      {/* 5. SUBSTANTIAL 4-COLUMN SCHOLARLY FOOTER (Deep Navy #20255C with Royal Purple #6B3F74 and Warm Gold #FFC84D) */}
      <footer className="border-t border-[#141840] bg-[#20255C] text-white/90 text-xs pt-12 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/15">
            {/* Column 1: JORMASS Identity */}
            <div className="space-y-3">
              <h4 className="text-[#FFC84D] font-bold text-sm tracking-wide font-heading">
                About JORMASS
              </h4>
              <p className="text-white/80 text-xs leading-relaxed">
                Journal of Research in Management and Social Sciences is a premier peer-reviewed scholarly platform publishing empirical and theoretical insights.
              </p>
              <div className="space-y-1 text-[11px] text-[#E2E5F3]/90 pt-1">
                <p>Print ISSN: {settings.issnPrint}</p>
                <p>Online ISSN: {settings.issnOnline}</p>
                <p>Frequency: Bi-Annual (June & December)</p>
              </div>
            </div>

            {/* Column 2: Authors & Submissions */}
            <div className="space-y-3">
              <h4 className="text-[#FFC84D] font-bold text-sm tracking-wide font-heading">
                For Authors & Reviewers
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('author-guidelines')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Author Guidelines (APA 7th)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('submit')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Submit Manuscript (OJS)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('peer-review')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Peer Review Process
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('fees')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Publication Fees & Charges
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('ethics')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Publication Ethics & Malpractice
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Research Discovery */}
            <div className="space-y-3">
              <h4 className="text-[#FFC84D] font-bold text-sm tracking-wide font-heading">
                Research & Discovery
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('current-issue')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Current Issue
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('archive')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Archive & Back Volumes
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('indexing')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Indexing & Abstracting
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('events')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Academic Events & Conferences
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('editorial-board')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Editorial Board Directory
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Policies & Governance */}
            <div className="space-y-3">
              <h4 className="text-[#FFC84D] font-bold text-sm tracking-wide font-heading">
                Policies & Governance
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('open-access')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Open Access Policy (CC BY 4.0)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('ethics')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Plagiarism & Similarity Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-[#FFC84D] transition cursor-pointer">
                    Editorial Office & Contacts
                  </button>
                </li>
                <li>
                  <button onClick={onOpenOjs} className="text-[#FFC84D] hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer">
                    <span>OJS Editorial Management</span>
                    <ExternalLink className="h-3 w-3 text-[#E2E5F3]" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/70">
            <p>
              © {new Date().getFullYear()} {settings.journalName} • Published by {settings.faculty}, {settings.institution}, Umudike, Nigeria.
            </p>
            <p className="text-[#FFC84D]/90">
              Platform Concept: Deep Navy, Royal Purple & Warm Gold Discovery Palette by OnlineFirst Studio
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
