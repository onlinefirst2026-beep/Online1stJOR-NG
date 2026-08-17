import { useState, useEffect } from 'react';
import {
  Volume,
  Issue,
  Article,
  AcademicEvent,
  Announcement,
  EditorialBoardMember,
  EditorialCalendarItem,
  JournalSettings,
  PublicationFee,
  IndexingService,
  SiteMode,
  ThemeVariant,
  JournalPage,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_VOLUMES,
  INITIAL_ISSUES,
  INITIAL_ARTICLES,
  INITIAL_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EDITORIAL_BOARD,
  INITIAL_CALENDAR,
  INITIAL_INDEXING,
  INITIAL_FEES,
} from '../data/journalData';
import { config, parseInitialRoute, hasSupabase } from './config';
import { dataProvider, ProposalSelectionState } from './dataProvider';

export type { ProposalSelectionState };

export function generateSupabaseSqlSchema(): string {
  return `-- ==========================================================
-- JORMASS - Journal of Research in Management and Social Sciences
-- Supabase PostgreSQL Database Schema & RLS Security Policies
-- College of Management Sciences, Michael Okpara University of Agriculture, Umudike
-- Prepared for JORMASS by OnlineFirst
-- ==========================================================

-- 1. Create Volumes Table
CREATE TABLE IF NOT EXISTS public.volumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volume_number INT NOT NULL,
  year INT NOT NULL,
  title TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Issues Table
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volume_id UUID REFERENCES public.volumes(id) ON DELETE CASCADE,
  volume_number INT NOT NULL,
  issue_number INT NOT NULL,
  year INT NOT NULL,
  title TEXT,
  theme TEXT,
  publication_date TEXT,
  description TEXT,
  cover_url TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
  volume_id UUID REFERENCES public.volumes(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  authors JSONB NOT NULL DEFAULT '[]',
  doi TEXT,
  page_start INT,
  page_end INT,
  pdf_url TEXT NOT NULL,
  publication_date DATE DEFAULT CURRENT_DATE,
  category TEXT,
  section TEXT DEFAULT 'Research Articles',
  license TEXT DEFAULT 'CC BY 4.0',
  status TEXT DEFAULT 'published',
  views_count INT DEFAULT 0,
  downloads_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Academic Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT,
  venue TEXT NOT NULL,
  is_virtual BOOLEAN DEFAULT false,
  virtual_link TEXT,
  image_url TEXT,
  registration_url TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'Published',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  publish_date DATE DEFAULT CURRENT_DATE,
  expiry_date DATE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'Published',
  priority TEXT DEFAULT 'normal',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Editorial Calendar & Deadlines Table
CREATE TABLE IF NOT EXISTS public.editorial_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volume INT NOT NULL,
  issue INT NOT NULL,
  year INT NOT NULL,
  submission_deadline DATE NOT NULL,
  expected_publication_date DATE NOT NULL,
  theme TEXT NOT NULL,
  status TEXT DEFAULT 'Open for Submissions',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.volumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editorial_calendar ENABLE ROW LEVEL SECURITY;

-- 8. Public Read Policies (Anonymous access for published academic content)
CREATE POLICY "Public Read Published Volumes" ON public.volumes FOR SELECT USING (true);
CREATE POLICY "Public Read Published Issues" ON public.issues FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Published Articles" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Published Events" ON public.events FOR SELECT USING (status = 'Published');
CREATE POLICY "Public Read Published Announcements" ON public.announcements FOR SELECT USING (status = 'Published');
CREATE POLICY "Public Read Published Calendar" ON public.editorial_calendar FOR SELECT USING (true);

-- 9. Authenticated Admin Full CRUD Policies (For Editorial Board Management)
CREATE POLICY "Admin Full Access Volumes" ON public.volumes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Issues" ON public.issues FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Articles" ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Announcements" ON public.announcements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Calendar" ON public.editorial_calendar FOR ALL TO authenticated USING (true) WITH CHECK (true);
`;
}

export function useJournalStore() {
  const initialRoute = parseInitialRoute();

  // Navigation & View State
  const [mode, setModeState] = useState<SiteMode>(() => {
    try {
      const saved = localStorage.getItem('jormass_site_mode_v1');
      return (saved as SiteMode) || initialRoute.mode || 'hub';
    } catch {
      return initialRoute.mode || 'hub';
    }
  });

  const [theme, setThemeState] = useState<ThemeVariant>(() => {
    try {
      const saved = localStorage.getItem('jormass_theme_variant_v1');
      return (saved as ThemeVariant) || initialRoute.theme || 'demo1';
    } catch {
      return initialRoute.theme || 'demo1';
    }
  });

  const [currentPage, setPageState] = useState<JournalPage>(() => {
    try {
      const saved = localStorage.getItem('jormass_current_page_v1');
      return (saved as JournalPage) || initialRoute.page || 'home';
    } catch {
      return initialRoute.page || 'home';
    }
  });

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => INITIAL_ARTICLES[0] || null);

  const setMode = (newMode: SiteMode) => {
    setModeState(newMode);
    localStorage.setItem('jormass_site_mode_v1', newMode);
  };

  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    localStorage.setItem('jormass_theme_variant_v1', newTheme);
  };

  const setPage = (newPage: JournalPage) => {
    setPageState(newPage);
    localStorage.setItem('jormass_current_page_v1', newPage);
  };

  // Data Collections using Data Provider
  const [settings, setSettingsState] = useState<JournalSettings>(() => dataProvider.getSettings());
  const [volumes, setVolumesState] = useState<Volume[]>(() => dataProvider.getVolumes());
  const [issues, setIssuesState] = useState<Issue[]>(() => dataProvider.getIssues());
  const [articles, setArticlesState] = useState<Article[]>(() => dataProvider.getArticles());
  const [events, setEventsState] = useState<AcademicEvent[]>(() => dataProvider.getEvents());
  const [announcements, setAnnouncementsState] = useState<Announcement[]>(() => dataProvider.getAnnouncements());
  const [boardMembers, setBoardMembersState] = useState<EditorialBoardMember[]>(() => dataProvider.getBoardMembers());
  const [calendar, setCalendarState] = useState<EditorialCalendarItem[]>(() => dataProvider.getCalendar());
  const [indexing, setIndexingState] = useState<IndexingService[]>(() => dataProvider.getIndexing());
  const [fees, setFeesState] = useState<PublicationFee[]>(() => dataProvider.getFees());
  const [proposalSelection, setProposalSelectionState] = useState<ProposalSelectionState>(() => dataProvider.getProposalSelection());

  // Save changes through dataProvider
  const setSettings = (newSettings: JournalSettings) => {
    setSettingsState(newSettings);
    dataProvider.saveSettings(newSettings);
  };

  const setBoardMembers = (members: EditorialBoardMember[]) => {
    setBoardMembersState(members);
    dataProvider.saveBoardMembers(members);
  };

  // Actions for Volumes
  const addVolume = (volume: Omit<Volume, 'id'>) => {
    const newVol: Volume = {
      ...volume,
      id: `vol-${volume.volumeNumber}-${Date.now()}`,
    };
    const updated = [newVol, ...volumes];
    setVolumesState(updated);
    dataProvider.saveVolumes(updated);
    return newVol;
  };

  const updateVolume = (id: string, updates: Partial<Volume>) => {
    const updated = volumes.map((v) => (v.id === id ? { ...v, ...updates } : v));
    setVolumesState(updated);
    dataProvider.saveVolumes(updated);
  };

  const deleteVolume = (id: string) => {
    const updated = volumes.filter((v) => v.id !== id);
    setVolumesState(updated);
    dataProvider.saveVolumes(updated);
  };

  // Actions for Issues
  const addIssue = (issue: Omit<Issue, 'id'>) => {
    const newIssue: Issue = {
      ...issue,
      id: `issue-${issue.volumeNumber}-${issue.issueNumber}-${Date.now()}`,
    };
    const updated = [newIssue, ...issues];
    setIssuesState(updated);
    dataProvider.saveIssues(updated);
    return newIssue;
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    const updated = issues.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setIssuesState(updated);
    dataProvider.saveIssues(updated);
  };

  const deleteIssue = (id: string) => {
    const updatedIssues = issues.filter((item) => item.id !== id);
    const updatedArticles = articles.filter((art) => art.issueId !== id);
    setIssuesState(updatedIssues);
    setArticlesState(updatedArticles);
    dataProvider.saveIssues(updatedIssues);
    dataProvider.saveArticles(updatedArticles);
  };

  // Actions for Articles
  const addArticle = (article: Omit<Article, 'id'>) => {
    const newArt: Article = {
      ...article,
      id: `art-${Date.now()}`,
      viewsCount: 0,
      downloadsCount: 0,
      citationsCount: 0,
    };
    const updatedArticles = [newArt, ...articles];
    const updatedIssues = issues.map((iss) =>
      iss.id === article.issueId
        ? { ...iss, articleCount: (iss.articleCount || 0) + 1 }
        : iss
    );
    setArticlesState(updatedArticles);
    setIssuesState(updatedIssues);
    dataProvider.saveArticles(updatedArticles);
    dataProvider.saveIssues(updatedIssues);
    return newArt;
  };

  const updateArticle = (article: Article) => {
    const updated = articles.map((art) => (art.id === article.id ? article : art));
    setArticlesState(updated);
    dataProvider.saveArticles(updated);
  };

  const deleteArticle = (id: string) => {
    const target = articles.find((a) => a.id === id);
    if (target) {
      const updatedIssues = issues.map((iss) =>
        iss.id === target.issueId
          ? { ...iss, articleCount: Math.max(0, (iss.articleCount || 1) - 1) }
          : iss
      );
      setIssuesState(updatedIssues);
      dataProvider.saveIssues(updatedIssues);
    }
    const updatedArticles = articles.filter((art) => art.id !== id);
    setArticlesState(updatedArticles);
    dataProvider.saveArticles(updatedArticles);
  };

  // Actions for Events
  const addEvent = (event: Omit<AcademicEvent, 'id'>) => {
    const newEvt: AcademicEvent = {
      ...event,
      id: `evt-${Date.now()}`,
    };
    const updated = [newEvt, ...events];
    setEventsState(updated);
    dataProvider.saveEvents(updated);
    return newEvt;
  };

  const updateEvent = (id: string, updates: Partial<AcademicEvent>) => {
    const updated = events.map((evt) => (evt.id === id ? { ...evt, ...updates } : evt));
    setEventsState(updated);
    dataProvider.saveEvents(updated);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((evt) => evt.id !== id);
    setEventsState(updated);
    dataProvider.saveEvents(updated);
  };

  // Actions for Announcements
  const addAnnouncement = (ann: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
    };
    const updated = [newAnn, ...announcements];
    setAnnouncementsState(updated);
    dataProvider.saveAnnouncements(updated);
    return newAnn;
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    const updated = announcements.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAnnouncementsState(updated);
    dataProvider.saveAnnouncements(updated);
  };

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncementsState(updated);
    dataProvider.saveAnnouncements(updated);
  };

  // Actions for Calendar
  const addCalendarItem = (item: Omit<EditorialCalendarItem, 'id'>) => {
    const newCal: EditorialCalendarItem = {
      ...item,
      id: `cal-${Date.now()}`,
    };
    const updated = [newCal, ...calendar];
    setCalendarState(updated);
    dataProvider.saveCalendar(updated);
    return newCal;
  };

  const updateCalendarItem = (id: string, updates: Partial<EditorialCalendarItem>) => {
    const updated = calendar.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCalendarState(updated);
    dataProvider.saveCalendar(updated);
  };

  const deleteCalendarItem = (id: string) => {
    const updated = calendar.filter((c) => c.id !== id);
    setCalendarState(updated);
    dataProvider.saveCalendar(updated);
  };

  const saveProposalSelection = (selection: ProposalSelectionState) => {
    setProposalSelectionState(selection);
    dataProvider.saveProposalSelection(selection);
  };

  // Reset to factory defaults
  const resetToDefault = () => {
    dataProvider.resetToDefaults();
    setSettingsState(INITIAL_SETTINGS);
    setVolumesState(INITIAL_VOLUMES);
    setIssuesState(INITIAL_ISSUES);
    setArticlesState(INITIAL_ARTICLES);
    setEventsState(INITIAL_EVENTS);
    setAnnouncementsState(INITIAL_ANNOUNCEMENTS);
    setBoardMembersState(INITIAL_EDITORIAL_BOARD);
    setCalendarState(INITIAL_CALENDAR);
    setIndexingState(INITIAL_INDEXING);
    setFeesState(INITIAL_FEES);
  };

  return {
    mode,
    setMode,
    theme,
    setTheme,
    currentPage,
    setPage,
    selectedArticle,
    setSelectedArticle,
    settings,
    setSettings,
    volumes,
    issues,
    articles,
    events,
    announcements,
    boardMembers,
    setBoardMembers,
    calendar,
    indexing,
    fees,
    proposalSelection,
    saveProposalSelection,
    addVolume,
    updateVolume,
    deleteVolume,
    addIssue,
    updateIssue,
    deleteIssue,
    addArticle,
    updateArticle,
    deleteArticle,
    addEvent,
    updateEvent,
    deleteEvent,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addCalendarItem,
    updateCalendarItem,
    deleteCalendarItem,
    resetToDefault,
    generateSupabaseSql: generateSupabaseSqlSchema,
    isLocalDataMode: !hasSupabase,
  };
}
