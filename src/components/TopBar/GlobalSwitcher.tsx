import React, { useState } from 'react';
import {
  Globe,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layout,
  BookOpen,
  Calendar,
  ShieldCheck,
  Award,
  Menu,
  X,
  FileText,
} from 'lucide-react';
import { SiteMode, ThemeVariant, JournalPage } from '../../types';
import { DECISION_DEADLINE } from '../../data/journalData';
import { config, getDemoUrl, getHubUrl, isExternalUrl } from '../../lib/config';

interface GlobalSwitcherProps {
  currentMode: SiteMode;
  currentTheme: ThemeVariant;
  currentPage: JournalPage;
  onSetMode: (mode: SiteMode) => void;
  onSetTheme: (theme: ThemeVariant) => void;
  onSetPage: (page: JournalPage) => void;
  onOpenDecisionModal: () => void;
}

export const GlobalSwitcher: React.FC<GlobalSwitcherProps> = ({
  currentMode,
  currentTheme,
  currentPage,
  onSetMode,
  onSetTheme,
  onSetPage,
  onOpenDecisionModal,
}) => {
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);

  // Compute active display domain or route label
  const getDomainLabel = () => {
    if (currentMode === 'hub') {
      return config.hubUrl && isExternalUrl(config.hubUrl)
        ? config.hubUrl.replace(/^https?:\/\//, '')
        : 'jormass-hub.previewnest.site';
    }
    if (currentMode === 'admin') {
      return 'jormass-admin (Local Mode)';
    }
    const demoUrl = getDemoUrl(currentTheme);
    return isExternalUrl(demoUrl)
      ? demoUrl.replace(/^https?:\/\//, '')
      : `jormass-${currentTheme}.previewnest.site (${demoUrl})`;
  };

  const currentDomain = getDomainLabel();

  const journalPages: { id: JournalPage; label: string; group: string }[] = [
    { id: 'home', label: 'Journal Home', group: 'Core' },
    { id: 'current-issue', label: 'Current Issue', group: 'Publications' },
    { id: 'archive', label: 'Publication Archive (Volumes & Issues)', group: 'Publications' },
    { id: 'article', label: 'Article Detail & Citations', group: 'Publications' },
    { id: 'search', label: 'Search & Research Discovery', group: 'Publications' },
    { id: 'about', label: 'About JORMASS & Scope', group: 'Journal Info' },
    { id: 'editorial-board', label: 'Editorial Board', group: 'Journal Info' },
    { id: 'peer-review', label: 'Peer Review Workflow (7-Step)', group: 'Journal Info' },
    { id: 'ethics', label: 'Publication Ethics (COPE-aligned)', group: 'Policies' },
    { id: 'open-access', label: 'Open Access & CC BY Licensing', group: 'Policies' },
    { id: 'fees', label: 'Publication Fees & Waivers', group: 'Policies' },
    { id: 'indexing', label: 'Indexing & Metrics (Verified)', group: 'Journal Info' },
    { id: 'events', label: 'Academic Events & Conferences', group: 'Events & News' },
    { id: 'calendar', label: 'Editorial Calendar & Deadlines', group: 'Events & News' },
    { id: 'author-guidelines', label: 'Author Guidelines & Submission', group: 'For Authors' },
    { id: 'contact', label: 'Editorial Office & Contact', group: 'Core' },
  ];

  return (
    <nav aria-label="JORMASS Platform Navigation" className="relative z-50 border-b border-slate-800 bg-[#030611] text-slate-200 text-xs no-print select-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6">
        {/* Left: View selector */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="hidden lg:inline text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
            OnlineFirst:
          </span>

          {/* Hub Button */}
          <button
            onClick={() => onSetMode('hub')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold transition ${
              currentMode === 'hub'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>Proposal Hub</span>
          </button>

          {/* Demos selector */}
          <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800">
            <button
              onClick={() => {
                onSetMode('demo');
                onSetTheme('demo1');
              }}
              className={`rounded px-2 py-0.5 font-medium transition ${
                currentMode === 'demo' && currentTheme === 'demo1'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Demo 1: Heritage Academic"
            >
              Demo 1
            </button>
            <button
              onClick={() => {
                onSetMode('demo');
                onSetTheme('demo2');
              }}
              className={`rounded px-2 py-0.5 font-medium transition ${
                currentMode === 'demo' && currentTheme === 'demo2'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Demo 2: Contemporary Research"
            >
              Demo 2
            </button>
            <button
              onClick={() => {
                onSetMode('demo');
                onSetTheme('demo3');
              }}
              className={`rounded px-2 py-0.5 font-medium transition ${
                currentMode === 'demo' && currentTheme === 'demo3'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Demo 3: Editorial Digital Library"
            >
              Demo 3
            </button>
          </div>

          {/* Admin CMS Button (Internal development tool) */}
          <button
            onClick={() => onSetMode('admin')}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 font-medium transition ${
              currentMode === 'admin'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            title="Editorial CMS & Data Manager"
          >
            <Layers className="h-3 w-3" />
            <span className="hidden sm:inline">CMS Manager</span>
          </button>
        </div>

        {/* Center/Right: Current Page jumper when in Demo mode */}
        <div className="flex items-center gap-2">
          {currentMode === 'demo' && (
            <div className="relative">
              <button
                onClick={() => setPageDropdownOpen(!pageDropdownOpen)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-200 hover:bg-slate-800 transition"
              >
                <BookOpen className="h-3 w-3 text-cyan-400" />
                <span className="hidden md:inline text-slate-400">View Page:</span>
                <span className="font-semibold text-white max-w-[120px] sm:max-w-[180px] truncate">
                  {journalPages.find((p) => p.id === currentPage)?.label || 'Home'}
                </span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {/* Page Dropdown */}
              {pageDropdownOpen && (
                <div className="absolute right-0 mt-1 w-64 rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-2xl text-slate-200 z-50 max-h-96 overflow-y-auto">
                  <div className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 mb-1">
                    JORMASS Journal Pages
                  </div>
                  {journalPages.map((pg) => (
                    <button
                      key={pg.id}
                      onClick={() => {
                        onSetPage(pg.id);
                        setPageDropdownOpen(false);
                      }}
                      className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition flex items-center justify-between ${
                        currentPage === pg.id
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{pg.label}</span>
                      <span className="text-[9px] text-slate-500">{pg.group}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Active URL badge */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-md bg-slate-900 px-2.5 py-1 font-mono text-[10px] text-slate-400 border border-slate-800">
            <Globe className="h-2.5 w-2.5 text-cyan-400" />
            <span>{currentDomain}</span>
          </div>

          {/* Decision Deadline Badge */}
          <button
            onClick={onOpenDecisionModal}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 font-semibold text-[11px] hover:bg-cyan-900/60 transition"
          >
            <Calendar className="h-3 w-3 text-cyan-400 shrink-0" />
            <span>Review: <strong>Sept 4, 2026</strong></span>
          </button>
        </div>
      </div>
    </nav>
  );
};
