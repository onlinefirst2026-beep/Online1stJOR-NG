import React, { useState } from 'react';
import {
  JournalSettings,
  JournalPage,
  ThemeVariant,
} from '../../../types';
import {
  BookOpen,
  Search,
  ChevronDown,
  ExternalLink,
  Lock,
  Menu,
  X,
  Sparkles,
  Library,
  Feather,
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

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-serif selection:bg-amber-100 flex flex-col">
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

      {/* Minimal Archival Header Strip */}
      <div className="border-b border-stone-200 bg-[#1c1917] text-stone-300 text-xs px-4 py-2 font-sans">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-semibold text-amber-300">COLMAS Digital Library</span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-300">{settings.institution}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenOjs}
              className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold"
            >
              <Lock className="h-3 w-3" />
              <span>OJS Portal</span>
            </button>
            <span className="text-stone-700">|</span>
            <button
              onClick={() => onNavigate('submit')}
              className="text-stone-200 hover:text-white font-medium"
            >
              Submit Manuscript
            </button>
          </div>
        </div>
      </div>

      {/* Centered Minimal Masthead */}
      <header className="border-b border-stone-200 bg-[#fafaf9] py-8 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase font-sans tracking-widest font-bold text-amber-800">
              Scholarly Digital Archive
            </span>
          </div>

          <h1
            onClick={() => onNavigate('home')}
            className="cursor-pointer text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1c1917] hover:text-amber-900 transition"
          >
            Journal of Research in Management & Social Sciences
          </h1>

          <p className="font-sans text-xs text-stone-600 max-w-xl mx-auto">
            {settings.faculty} • {settings.institution}, Umudike, Nigeria
          </p>

          <div className="font-sans text-[11px] text-stone-500 font-mono pt-1">
            ISSN: {settings.issnPrint} (Print) | {settings.issnOnline} (Online) • Open Access (CC BY 4.0)
          </div>
        </div>

        {/* Minimal Typography Navigation */}
        <nav className="mt-6 border-t border-b border-stone-200 font-sans text-xs font-semibold text-stone-700 py-2.5">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 px-4">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-amber-800 transition ${currentPage === 'home' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              Catalogue
            </button>
            <button
              onClick={() => onNavigate('current-issue')}
              className={`hover:text-amber-800 transition ${currentPage === 'current-issue' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              Current Issue
            </button>
            <button
              onClick={() => onNavigate('archive')}
              className={`hover:text-amber-800 transition ${currentPage === 'archive' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              All Volumes
            </button>
            <button
              onClick={() => onNavigate('editorial-board')}
              className={`hover:text-amber-800 transition ${currentPage === 'editorial-board' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              Editorial Board
            </button>
            <button
              onClick={() => onNavigate('peer-review')}
              className={`hover:text-amber-800 transition ${currentPage === 'peer-review' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              Peer Review
            </button>
            <button
              onClick={() => onNavigate('indexing')}
              className={`hover:text-amber-800 transition ${currentPage === 'indexing' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              Indexing
            </button>
            <button
              onClick={() => onNavigate('events')}
              className={`hover:text-amber-800 transition ${currentPage === 'events' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              Events
            </button>
            <button
              onClick={() => onNavigate('author-guidelines')}
              className={`hover:text-amber-800 transition ${currentPage === 'author-guidelines' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              Guidelines
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-amber-800 transition ${currentPage === 'contact' ? 'text-amber-900 font-bold border-b-2 border-amber-800 pb-0.5' : ''}`}
            >
              Contact
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Minimal Archival Footer */}
      <footer className="border-t border-stone-200 bg-[#1c1917] text-stone-400 font-sans text-xs py-10">
        <div className="mx-auto max-w-5xl px-4 text-center space-y-4">
          <p className="font-serif text-lg font-bold text-white">
            Journal of Research in Management & Social Sciences
          </p>
          <p className="text-stone-400 text-xs max-w-lg mx-auto leading-relaxed">
            Published bi-annually by the College of Management Sciences, Michael Okpara University of Agriculture, Umudike, Abia State, Nigeria.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-2 text-[11px] text-stone-300">
            <button onClick={() => onNavigate('ethics')} className="hover:text-white">Publication Ethics</button>
            <button onClick={() => onNavigate('fees')} className="hover:text-white">Publication Fees</button>
            <button onClick={() => onNavigate('open-access')} className="hover:text-white">Open Access Policy</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white">Editorial Office</button>
          </div>
          <p className="text-stone-500 text-[10px] pt-4">
            © {new Date().getFullYear()} JORMASS • Redesign Concept 3 (Editorial Digital Library) by OnlineFirst
          </p>
        </div>
      </footer>
    </div>
  );
};
