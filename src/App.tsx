import React, { useState, useEffect } from 'react';
import { useJournalStore } from './lib/dataStore';
import { GlobalSwitcher } from './components/TopBar/GlobalSwitcher';
import { ProposalHub } from './components/OnlineFirstHub/ProposalHub';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { CitationModal } from './components/Common/CitationModal';
import { PdfViewerModal } from './components/Common/PdfViewerModal';
import { OjsSubmissionModal } from './components/Common/OjsSubmissionModal';
import { ProposalSelectionModal } from './components/OnlineFirstHub/ProposalSelectionModal';
import { config, getOjsUrl, getDemoUrl, getHubUrl, isExternalUrl } from './lib/config';

// Demo 1 Components
import { Demo1Layout } from './components/Demos/Demo1Heritage/Demo1Layout';
import { Demo1Home } from './components/Demos/Demo1Heritage/Demo1Home';
import { Demo1Pages } from './components/Demos/Demo1Heritage/Demo1Pages';

// Demo 2 Components
import { Demo2Layout } from './components/Demos/Demo2Contemporary/Demo2Layout';
import { Demo2Home } from './components/Demos/Demo2Contemporary/Demo2Home';
import { Demo2Pages } from './components/Demos/Demo2Contemporary/Demo2Pages';

// Demo 3 Components
import { Demo3Layout } from './components/Demos/Demo3DigitalLibrary/Demo3Layout';
import { Demo3Home } from './components/Demos/Demo3DigitalLibrary/Demo3Home';
import { Demo3Pages } from './components/Demos/Demo3DigitalLibrary/Demo3Pages';

import { SiteMode, ThemeVariant, JournalPage, Article } from './types';

export default function App() {
  const store = useJournalStore();

  // Active Modals State
  const [citationModalArticle, setCitationModalArticle] = useState<Article | null>(null);
  const [pdfModalArticle, setPdfModalArticle] = useState<Article | null>(null);
  const [isOjsModalOpen, setIsOjsModalOpen] = useState<boolean>(false);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState<boolean>(false);
  const [initialPackageSelection, setInitialPackageSelection] = useState<'basic' | 'launch' | 'professional' | 'advanced'>('professional');

  // Sync route changes to browser history/URL cleanly
  const syncRouteToHistory = (mode: SiteMode, theme: ThemeVariant) => {
    if (typeof window !== 'undefined' && window.history) {
      if (mode === 'demo') {
        const path = `/demo/${theme}`;
        window.history.replaceState({ mode, theme }, '', path);
      } else if (mode === 'admin') {
        window.history.replaceState({ mode }, '', '/admin');
      } else {
        window.history.replaceState({ mode }, '', '/');
      }
    }
  };

  // Helpers for navigation & actions
  const handleSelectDemoFromHub = (theme: ThemeVariant) => {
    store.setTheme(theme);
    store.setMode('demo');
    store.setPage('home');
    syncRouteToHistory('demo', theme);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackageFromHub = (pkgId: 'basic' | 'launch' | 'professional' | 'advanced') => {
    setInitialPackageSelection(pkgId);
    setIsDecisionModalOpen(true);
  };

  const handleArticleClick = (article: Article) => {
    store.setSelectedArticle(article);
    store.setPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCitation = (article: Article) => {
    setCitationModalArticle(article);
  };

  const handleOpenPdf = (article: Article) => {
    setPdfModalArticle(article);
  };

  const handleOpenSearchPage = () => {
    store.setPage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSubmit = () => {
    setIsOjsModalOpen(true);
  };

  const handleBackToHub = () => {
    store.setMode('hub');
    syncRouteToHistory('hub', store.theme);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchDemo = (theme: ThemeVariant) => {
    store.setTheme(theme);
    store.setMode('demo');
    syncRouteToHistory('demo', theme);
  };

  // Find Current Active Issue & Volume
  const currentIssue =
    store.issues.find((i) => i.status === 'published') || store.issues[0];
  const currentVolume =
    store.volumes.find((v) => v.id === currentIssue?.volumeId) || store.volumes[0];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 font-sans">
      {/* 1. Global Platform Switcher (Hub, Demos, Admin, Page Jumper, Domain Badge) */}
      <GlobalSwitcher
        currentMode={store.mode}
        currentTheme={store.theme}
        currentPage={store.currentPage}
        onSetMode={(m) => {
          store.setMode(m);
          syncRouteToHistory(m, store.theme);
        }}
        onSetTheme={handleSwitchDemo}
        onSetPage={store.setPage}
        onOpenDecisionModal={() => setIsDecisionModalOpen(true)}
      />

      {/* 2. Main Viewport Rendering */}
      <div className="flex-1">
        {/* MODE: PROPOSAL HUB */}
        {store.mode === 'hub' && (
          <ProposalHub
            onSelectDemo={handleSelectDemoFromHub}
            onSelectPackage={handleSelectPackageFromHub}
            onOpenDecisionModal={() => setIsDecisionModalOpen(true)}
            onOpenOjsModal={() => setIsOjsModalOpen(true)}
          />
        )}

        {/* MODE: ADMIN CMS */}
        {store.mode === 'admin' && (
          <AdminDashboard
            settings={store.settings}
            volumes={store.volumes}
            issues={store.issues}
            articles={store.articles}
            events={store.events}
            announcements={store.announcements}
            calendar={store.calendar}
            onAddArticle={store.addArticle}
            onUpdateArticle={store.updateArticle}
            onDeleteArticle={store.deleteArticle}
            onAddEvent={store.addEvent}
            onDeleteEvent={store.deleteEvent}
            onAddCalendarItem={store.addCalendarItem}
            onResetData={store.resetToDefault}
            onExitAdmin={handleBackToHub}
          />
        )}

        {/* MODE: DEMO 1 — HERITAGE ACADEMIC */}
        {store.mode === 'demo' && store.theme === 'demo1' && (
          <Demo1Layout
            settings={store.settings}
            currentPage={store.currentPage}
            onNavigate={(pg) => {
              if (pg === 'submit') {
                handleOpenSubmit();
              } else {
                store.setPage(pg);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onOpenSearch={handleOpenSearchPage}
            onOpenOjs={() => setIsOjsModalOpen(true)}
            onBackToHub={handleBackToHub}
            onSwitchDemo={handleSwitchDemo}
            onSelectConcept={(theme) => {
              store.setTheme(theme);
              setIsDecisionModalOpen(true);
            }}
          >
            {store.currentPage === 'home' ? (
              <Demo1Home
                settings={store.settings}
                currentIssue={currentIssue}
                currentVolume={currentVolume}
                articles={store.articles}
                events={store.events}
                announcements={store.announcements}
                calendar={store.calendar}
                onNavigate={(pg) => {
                  if (pg === 'submit') handleOpenSubmit();
                  else {
                    store.setPage(pg);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onSelectArticle={handleArticleClick}
                onOpenCitation={handleOpenCitation}
                onOpenPdf={handleOpenPdf}
              />
            ) : (
              <Demo1Pages
                page={store.currentPage}
                settings={store.settings}
                volumes={store.volumes}
                issues={store.issues}
                articles={store.articles}
                events={store.events}
                announcements={store.announcements}
                boardMembers={store.boardMembers}
                calendar={store.calendar}
                indexing={store.indexing}
                fees={store.fees}
                selectedArticle={store.selectedArticle}
                onNavigate={(pg) => {
                  if (pg === 'submit') handleOpenSubmit();
                  else {
                    store.setPage(pg);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onSelectArticle={handleArticleClick}
                onOpenCitation={handleOpenCitation}
                onOpenPdf={handleOpenPdf}
                onOpenOjs={() => setIsOjsModalOpen(true)}
              />
            )}
          </Demo1Layout>
        )}

        {/* MODE: DEMO 2 — CONTEMPORARY RESEARCH */}
        {store.mode === 'demo' && store.theme === 'demo2' && (
          <Demo2Layout
            settings={store.settings}
            currentPage={store.currentPage}
            onNavigate={(pg) => {
              if (pg === 'submit') {
                handleOpenSubmit();
              } else {
                store.setPage(pg);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onOpenSearch={handleOpenSearchPage}
            onOpenOjs={() => setIsOjsModalOpen(true)}
            onBackToHub={handleBackToHub}
            onSwitchDemo={handleSwitchDemo}
            onSelectConcept={(theme) => {
              store.setTheme(theme);
              setIsDecisionModalOpen(true);
            }}
          >
            {store.currentPage === 'home' ? (
              <Demo2Home
                settings={store.settings}
                currentIssue={currentIssue}
                currentVolume={currentVolume}
                articles={store.articles}
                events={store.events}
                announcements={store.announcements}
                calendar={store.calendar}
                onNavigate={(pg) => {
                  if (pg === 'submit') handleOpenSubmit();
                  else {
                    store.setPage(pg);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onSelectArticle={handleArticleClick}
                onOpenCitation={handleOpenCitation}
                onOpenPdf={handleOpenPdf}
              />
            ) : (
              <Demo2Pages
                page={store.currentPage}
                settings={store.settings}
                volumes={store.volumes}
                issues={store.issues}
                articles={store.articles}
                events={store.events}
                announcements={store.announcements}
                boardMembers={store.boardMembers}
                calendar={store.calendar}
                indexing={store.indexing}
                fees={store.fees}
                selectedArticle={store.selectedArticle}
                onNavigate={(pg) => {
                  if (pg === 'submit') handleOpenSubmit();
                  else {
                    store.setPage(pg);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onSelectArticle={handleArticleClick}
                onOpenCitation={handleOpenCitation}
                onOpenPdf={handleOpenPdf}
                onOpenOjs={() => setIsOjsModalOpen(true)}
              />
            )}
          </Demo2Layout>
        )}

        {/* MODE: DEMO 3 — EDITORIAL DIGITAL LIBRARY */}
        {store.mode === 'demo' && store.theme === 'demo3' && (
          <Demo3Layout
            settings={store.settings}
            currentPage={store.currentPage}
            onNavigate={(pg) => {
              if (pg === 'submit') {
                handleOpenSubmit();
              } else {
                store.setPage(pg);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onOpenSearch={handleOpenSearchPage}
            onOpenOjs={() => setIsOjsModalOpen(true)}
            onBackToHub={handleBackToHub}
            onSwitchDemo={handleSwitchDemo}
            onSelectConcept={(theme) => {
              store.setTheme(theme);
              setIsDecisionModalOpen(true);
            }}
          >
            {store.currentPage === 'home' ? (
              <Demo3Home
                settings={store.settings}
                volumes={store.volumes}
                issues={store.issues}
                articles={store.articles}
                events={store.events}
                announcements={store.announcements}
                boardMembers={store.boardMembers}
                indexing={store.indexing}
                onNavigate={(pg) => {
                  if (pg === 'submit') handleOpenSubmit();
                  else {
                    store.setPage(pg);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onSelectArticle={handleArticleClick}
                onOpenCitation={handleOpenCitation}
                onOpenPdf={handleOpenPdf}
                onOpenOjs={() => setIsOjsModalOpen(true)}
              />
            ) : (
              <Demo3Pages
                page={store.currentPage}
                settings={store.settings}
                volumes={store.volumes}
                issues={store.issues}
                articles={store.articles}
                events={store.events}
                announcements={store.announcements}
                boardMembers={store.boardMembers}
                calendar={store.calendar}
                indexing={store.indexing}
                fees={store.fees}
                selectedArticle={store.selectedArticle}
                onNavigate={(pg) => {
                  if (pg === 'submit') handleOpenSubmit();
                  else {
                    store.setPage(pg);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onSelectArticle={handleArticleClick}
                onOpenCitation={handleOpenCitation}
                onOpenPdf={handleOpenPdf}
                onOpenOjs={() => setIsOjsModalOpen(true)}
              />
            )}
          </Demo3Layout>
        )}
      </div>

      {/* 3. Global Modals */}
      {/* Citation Generator Modal */}
      {citationModalArticle && (
        <CitationModal
          article={citationModalArticle}
          journalSettings={store.settings}
          onClose={() => setCitationModalArticle(null)}
        />
      )}

      {/* PDF Document Viewer Modal */}
      {pdfModalArticle && (
        <PdfViewerModal
          article={pdfModalArticle}
          onClose={() => setPdfModalArticle(null)}
        />
      )}

      {/* OJS Integration & Submission Modal */}
      {isOjsModalOpen && (
        <OjsSubmissionModal
          ojsUrl={getOjsUrl()}
          onClose={() => setIsOjsModalOpen(false)}
        />
      )}

      {/* Formal Decision Confirmation Modal */}
      {isDecisionModalOpen && (
        <ProposalSelectionModal
          initialDemo={store.theme}
          initialPackage={initialPackageSelection}
          onSave={(selection) => {
            store.saveProposalSelection(selection);
          }}
          onClose={() => setIsDecisionModalOpen(false)}
        />
      )}
    </div>
  );
}
