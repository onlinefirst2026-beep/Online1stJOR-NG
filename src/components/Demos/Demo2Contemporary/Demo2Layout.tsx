import React, { useState } from 'react';
import {
  JournalSettings,
  JournalPage,
  ThemeVariant,
} from '../../../types';
import {
  Search,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Lock,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import { DemoFloatingBar } from '../../Common/DemoFloatingBar';

interface Demo2LayoutProps {
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

export const Demo2Layout: React.FC<Demo2LayoutProps> = ({
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-d2-body antialiased selection:bg-teal-100 flex flex-col">
      {/* Floating Demo Control Bar */}
      {onBackToHub && onSwitchDemo && (
        <DemoFloatingBar
          currentTheme="demo2"
          currentPage={currentPage}
          onBackToHub={onBackToHub}
          onSwitchDemo={onSwitchDemo}
          onSelectConcept={onSelectConcept}
          onNavigatePage={onNavigate}
        />
      )}

      {/* Top Banner Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs px-4 py-2 border-b border-slate-800 font-d2-meta">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-bold text-teal-400">COLMAS</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">{settings.institution}</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline font-mono text-slate-400">
              ISSN {settings.issnPrint} (Print) / {settings.issnOnline} (Online)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenOjs}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-300 hover:text-teal-200 transition"
            >
              <Lock className="h-3 w-3" />
              <span>OJS Portal</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => onNavigate('submit')}
              className="text-[11px] font-bold text-amber-400 hover:underline"
            >
              Submit Manuscript
            </button>
          </div>
        </div>
      </div>

      {/* Modern Wide Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-teal-800 text-white shadow-md shadow-teal-900/10">
              <BookOpen className="h-6 w-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-d2-heading font-black text-lg tracking-tight text-slate-900 group-hover:text-teal-700 transition">
                  JORMASS
                </span>
                <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200 font-d2-meta">
                  Open Access
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs sm:max-w-md font-d2-body">
                Journal of Research in Management and Social Sciences
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-700 font-d2-body">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-teal-700 transition ${currentPage === 'home' ? 'text-teal-700 font-bold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('current-issue')}
              className={`hover:text-teal-700 transition ${currentPage === 'current-issue' ? 'text-teal-700 font-bold' : ''}`}
            >
              Current Issue
            </button>
            <button
              onClick={() => onNavigate('archive')}
              className={`hover:text-teal-700 transition ${currentPage === 'archive' ? 'text-teal-700 font-bold' : ''}`}
            >
              Archive
            </button>
            <button
              onClick={() => onNavigate('editorial-board')}
              className={`hover:text-teal-700 transition ${currentPage === 'editorial-board' ? 'text-teal-700 font-bold' : ''}`}
            >
              Editorial Board
            </button>
            <button
              onClick={() => onNavigate('peer-review')}
              className={`hover:text-teal-700 transition ${currentPage === 'peer-review' ? 'text-teal-700 font-bold' : ''}`}
            >
              Peer Review
            </button>
            <button
              onClick={() => onNavigate('events')}
              className={`hover:text-teal-700 transition ${currentPage === 'events' ? 'text-teal-700 font-bold' : ''}`}
            >
              Events
            </button>
            <button
              onClick={() => onNavigate('author-guidelines')}
              className={`hover:text-teal-700 transition ${currentPage === 'author-guidelines' ? 'text-teal-700 font-bold' : ''}`}
            >
              Author Guidelines
            </button>
          </nav>

          {/* Right Action: Instant Search & Submit */}
          <div className="flex items-center gap-2.5 font-d2-body">
            <button
              onClick={onOpenSearch}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            >
              <Search className="h-3.5 w-3.5 text-teal-600" />
              <span>Search research...</span>
            </button>

            <button
              onClick={() => onNavigate('submit')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
            >
              <span>Submit Paper</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 text-slate-700 rounded-lg hover:bg-slate-100"
            >
              {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileNavOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2 text-xs">
            {[
              { id: 'home', label: 'Journal Home' },
              { id: 'current-issue', label: 'Current Issue' },
              { id: 'archive', label: 'Publication Archive' },
              { id: 'search', label: 'Search Research' },
              { id: 'about', label: 'About & Scope' },
              { id: 'editorial-board', label: 'Editorial Board' },
              { id: 'peer-review', label: 'Peer Review Workflow' },
              { id: 'ethics', label: 'Publication Ethics' },
              { id: 'fees', label: 'Publication Fees' },
              { id: 'indexing', label: 'Indexing & Metrics' },
              { id: 'events', label: 'Events & Conferences' },
              { id: 'calendar', label: 'Editorial Calendar' },
              { id: 'author-guidelines', label: 'Author Guidelines' },
              { id: 'contact', label: 'Contact Office' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id as any);
                  setMobileNavOpen(false);
                }}
                className="block w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Contemporary Research Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs pt-12 pb-8 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-teal-400" />
                <span className="font-d2-heading font-bold text-sm">JORMASS Research Platform</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Contemporary, open-access journal for management, agribusiness, banking, finance, accounting, and social science research.
              </p>
              <div className="text-[11px] font-d2-meta text-slate-500">
                <p>ISSN: {settings.issnPrint} (Print)</p>
                <p>ISSN: {settings.issnOnline} (Online)</p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-teal-400 font-d2-heading">
                Discover Research
              </h5>
              <ul className="space-y-1.5 text-slate-300">
                <li><button onClick={() => onNavigate('current-issue')} className="hover:text-white">Current Issue</button></li>
                <li><button onClick={() => onNavigate('archive')} className="hover:text-white">Archive & Past Volumes</button></li>
                <li><button onClick={() => onNavigate('search')} className="hover:text-white">Search by Keywords</button></li>
                <li><button onClick={() => onNavigate('indexing')} className="hover:text-white">Indexing Databases</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-teal-400">
                Authors & Governance
              </h5>
              <ul className="space-y-1.5 text-slate-300">
                <li><button onClick={() => onNavigate('author-guidelines')} className="hover:text-white">Author Guidelines</button></li>
                <li><button onClick={() => onNavigate('peer-review')} className="hover:text-white">Peer Review Workflow</button></li>
                <li><button onClick={() => onNavigate('editorial-board')} className="hover:text-white">Editorial Board</button></li>
                <li><button onClick={() => onNavigate('fees')} className="hover:text-white">Publication Fees</button></li>
                <li><button onClick={() => onNavigate('ethics')} className="hover:text-white">Ethics & Malpractice</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider text-teal-400">
                Contact & Administration
              </h5>
              <p className="text-[11px] leading-relaxed text-slate-400">
                {settings.institution}, Umudike, Nigeria.
              </p>
              <p className="text-[11px] text-slate-300 pt-1">
                Email: {settings.email}
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenOjs}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:bg-slate-700"
                >
                  <Lock className="h-3 w-3 text-teal-400" />
                  <span>OJS Manuscript Portal</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} JORMASS • Published under CC BY 4.0 Open Access License.</p>
            <p>Proposal Concept 2 (Contemporary Research) by OnlineFirst</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
