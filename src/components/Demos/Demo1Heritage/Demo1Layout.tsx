import React, { useState } from 'react';
import {
  JournalSettings,
  JournalPage,
  Volume,
  Issue,
  Article,
  ThemeVariant,
} from '../../../types';
import {
  BookOpen,
  Search,
  ChevronDown,
  FileText,
  Calendar,
  Users,
  ShieldCheck,
  Award,
  ExternalLink,
  Menu,
  X,
  Lock,
  Compass,
} from 'lucide-react';
import { DemoFloatingBar } from '../../Common/DemoFloatingBar';

interface Demo1LayoutProps {
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

export const Demo1Layout: React.FC<Demo1LayoutProps> = ({
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

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-neutral-900 font-sans-academic selection:bg-amber-200 flex flex-col">
      {/* Floating Demo Control Bar */}
      {onBackToHub && onSwitchDemo && (
        <DemoFloatingBar
          currentTheme="demo1"
          currentPage={currentPage}
          onBackToHub={onBackToHub}
          onSwitchDemo={onSwitchDemo}
          onSelectConcept={onSelectConcept}
          onNavigatePage={onNavigate}
        />
      )}

      {/* Top Academic Metadata Bar */}
      <div className="border-b border-neutral-800 bg-[#0d1b2a] text-neutral-300 text-xs px-4 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[11px]">
            <span className="font-semibold text-amber-400">
              {settings.faculty}
            </span>
            <span className="hidden sm:inline text-neutral-500">•</span>
            <span className="hidden sm:inline text-neutral-300">
              {settings.institution}
            </span>
            <span className="hidden md:inline text-neutral-500">•</span>
            <span className="hidden md:inline font-mono text-neutral-400">
              ISSN (Print): {settings.issnPrint} | ISSN (Online): {settings.issnOnline}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenOjs}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 transition"
            >
              <Lock className="h-3 w-3" />
              <span>OJS Portal</span>
            </button>
            <span className="text-neutral-600">|</span>
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white transition"
            >
              <Search className="h-3 w-3 text-amber-400" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Traditional Academic Masthead with Bound Journal Spine Motif */}
      <header className="border-b border-neutral-200 bg-white relative">
        {/* Left Decorative Journal Spine Border */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-[#0d1b2a] hidden md:block journal-spine-pattern border-r border-amber-600/40" />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#0d1b2a] text-amber-400 shadow-md border border-amber-500/30">
              <BookOpen className="h-9 w-9" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-900 uppercase tracking-widest border border-amber-200">
                  {settings.abbreviation}
                </span>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Peer-Reviewed & Open Access
                </span>
              </div>
              <h1
                onClick={() => onNavigate('home')}
                className="cursor-pointer font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0d1b2a] hover:text-amber-800 transition mt-1"
              >
                {settings.journalName}
              </h1>
              <p className="text-xs text-neutral-600 font-medium">
                {settings.faculty}, {settings.institution}, Umudike, Nigeria
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('submit')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1b4332] px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-[#2d6a4f] transition"
            >
              <span>Submit Manuscript</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onNavigate('current-issue')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#0d1b2a] hover:bg-neutral-50 transition"
            >
              <span>Current Issue</span>
            </button>
          </div>
        </div>

        {/* Main Academic Navigation Bar */}
        <div className="border-t border-neutral-200 bg-[#0d1b2a] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-3 hover:bg-neutral-800 transition ${
                  currentPage === 'home' ? 'bg-amber-700 text-white' : 'text-neutral-200'
                }`}
              >
                Home
              </button>

              {/* About Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-3 py-3 hover:bg-neutral-800 transition flex items-center gap-1 text-neutral-200"
                >
                  <span>About</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block w-56 rounded-b-lg border border-neutral-700 bg-[#0d1b2a] p-2 shadow-xl z-50">
                  <button
                    onClick={() => onNavigate('about')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    About JORMASS
                  </button>
                  <button
                    onClick={() => onNavigate('aims-scope')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Aims & Scope
                  </button>
                  <button
                    onClick={() => onNavigate('editorial-board')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Editorial Board
                  </button>
                  <button
                    onClick={() => onNavigate('peer-review')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Peer Review Process
                  </button>
                  <button
                    onClick={() => onNavigate('ethics')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Publication Ethics
                  </button>
                  <button
                    onClick={() => onNavigate('open-access')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Open Access & Licensing
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Contact Editorial Office
                  </button>
                </div>
              </div>

              {/* For Authors Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => onNavigate('author-guidelines')}
                  className="px-3 py-3 hover:bg-neutral-800 transition flex items-center gap-1 text-neutral-200"
                >
                  <span>For Authors</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block w-56 rounded-b-lg border border-neutral-700 bg-[#0d1b2a] p-2 shadow-xl z-50">
                  <button
                    onClick={() => onNavigate('author-guidelines')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Submission Guidelines
                  </button>
                  <button
                    onClick={() => onNavigate('manuscript-prep')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Manuscript Preparation
                  </button>
                  <button
                    onClick={() => onNavigate('fees')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Publication Fees
                  </button>
                  <button
                    onClick={() => onNavigate('calendar')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Editorial Calendar
                  </button>
                  <button
                    onClick={() => onNavigate('submit')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-amber-300 font-bold hover:bg-neutral-800"
                  >
                    Submit Manuscript
                  </button>
                </div>
              </div>

              {/* Issues Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => onNavigate('current-issue')}
                  className="px-3 py-3 hover:bg-neutral-800 transition flex items-center gap-1 text-neutral-200"
                >
                  <span>Issues & Archive</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block w-56 rounded-b-lg border border-neutral-700 bg-[#0d1b2a] p-2 shadow-xl z-50">
                  <button
                    onClick={() => onNavigate('current-issue')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Current Issue
                  </button>
                  <button
                    onClick={() => onNavigate('archive')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Previous Issues / Archive
                  </button>
                  <button
                    onClick={() => onNavigate('search')}
                    className="w-full text-left rounded px-3 py-1.5 text-xs text-neutral-200 hover:bg-neutral-800"
                  >
                    Search Articles
                  </button>
                </div>
              </div>

              <button
                onClick={() => onNavigate('indexing')}
                className={`px-3 py-3 hover:bg-neutral-800 transition ${
                  currentPage === 'indexing' ? 'bg-amber-700 text-white' : 'text-neutral-200'
                }`}
              >
                Indexing & Metrics
              </button>

              <button
                onClick={() => onNavigate('events')}
                className={`px-3 py-3 hover:bg-neutral-800 transition ${
                  currentPage === 'events' ? 'bg-amber-700 text-white' : 'text-neutral-200'
                }`}
              >
                Academic Events
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`px-3 py-3 hover:bg-neutral-800 transition ${
                  currentPage === 'contact' ? 'bg-amber-700 text-white' : 'text-neutral-200'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Mobile Nav Toggle */}
            <div className="flex lg:hidden items-center justify-between w-full py-2.5">
              <span className="font-serif font-bold text-sm text-amber-400">
                Menu
              </span>
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="p-1.5 text-white"
                aria-label="Toggle navigation"
              >
                {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {mobileNavOpen && (
            <div className="lg:hidden border-t border-neutral-800 bg-[#0d1b2a] px-4 py-4 space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home' },
                { id: 'current-issue', label: 'Current Issue' },
                { id: 'archive', label: 'Publication Archive' },
                { id: 'search', label: 'Search Articles' },
                { id: 'about', label: 'About JORMASS' },
                { id: 'editorial-board', label: 'Editorial Board' },
                { id: 'peer-review', label: 'Peer Review Process' },
                { id: 'ethics', label: 'Publication Ethics' },
                { id: 'fees', label: 'Publication Fees' },
                { id: 'indexing', label: 'Indexing & Metrics' },
                { id: 'events', label: 'Events' },
                { id: 'calendar', label: 'Editorial Calendar' },
                { id: 'author-guidelines', label: 'Submission Guidelines' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id as any);
                    setMobileNavOpen(false);
                  }}
                  className="block w-full text-left rounded px-3 py-2 text-neutral-200 hover:bg-neutral-800"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Traditional Scholarly Footer */}
      <footer className="border-t border-neutral-300 bg-[#0d1b2a] text-neutral-300 pt-12 pb-8 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-400" />
                <h4 className="font-serif font-bold text-white text-sm">
                  {settings.journalName}
                </h4>
              </div>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                An international, peer-reviewed academic journal published by the College of Management Sciences, Michael Okpara University of Agriculture, Umudike.
              </p>
              <div className="font-mono text-[11px] text-neutral-400 space-y-0.5">
                <p>ISSN (Print): {settings.issnPrint}</p>
                <p>ISSN (Online): {settings.issnOnline}</p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <h5 className="font-serif font-bold text-white text-xs uppercase tracking-wider text-amber-400">
                Journal Information
              </h5>
              <ul className="space-y-1.5 text-neutral-300">
                <li><button onClick={() => onNavigate('about')} className="hover:text-white">About JORMASS</button></li>
                <li><button onClick={() => onNavigate('aims-scope')} className="hover:text-white">Aims & Scope</button></li>
                <li><button onClick={() => onNavigate('editorial-board')} className="hover:text-white">Editorial Board</button></li>
                <li><button onClick={() => onNavigate('peer-review')} className="hover:text-white">Peer Review Process</button></li>
                <li><button onClick={() => onNavigate('ethics')} className="hover:text-white">Publication Ethics</button></li>
                <li><button onClick={() => onNavigate('open-access')} className="hover:text-white">Open Access Policy</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <h5 className="font-serif font-bold text-white text-xs uppercase tracking-wider text-amber-400">
                For Authors & Researchers
              </h5>
              <ul className="space-y-1.5 text-neutral-300">
                <li><button onClick={() => onNavigate('author-guidelines')} className="hover:text-white">Submission Guidelines</button></li>
                <li><button onClick={() => onNavigate('fees')} className="hover:text-white">Publication Fees</button></li>
                <li><button onClick={() => onNavigate('calendar')} className="hover:text-white">Editorial Calendar & Deadlines</button></li>
                <li><button onClick={() => onNavigate('current-issue')} className="hover:text-white">Current Issue</button></li>
                <li><button onClick={() => onNavigate('archive')} className="hover:text-white">Publication Archive</button></li>
                <li><button onClick={() => onNavigate('events')} className="hover:text-white">Academic Events</button></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <h5 className="font-serif font-bold text-white text-xs uppercase tracking-wider text-amber-400">
                Editorial Office
              </h5>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {settings.address}
              </p>
              <p className="text-neutral-400 text-[11px] pt-1">
                Email: <span className="text-white">{settings.email}</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenOjs}
                  className="inline-flex items-center gap-1 rounded bg-neutral-800 px-3 py-1 text-[11px] font-semibold text-neutral-200 hover:bg-neutral-700"
                >
                  <Lock className="h-3 w-3 text-amber-400" />
                  <span>OJS Submission Login</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
            <p>
              © {new Date().getFullYear()} {settings.journalName}. All Rights Reserved. Licensed under {settings.defaultLicense}.
            </p>
            <p className="text-neutral-500">
              Redesign Proposal Concept 1 (Heritage Academic) by OnlineFirst
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
