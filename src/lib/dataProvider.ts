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
  ProposalSelectionState,
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
import { config, hasSupabase } from './config';

export type { ProposalSelectionState };

export interface IDataProvider {
  isLocalMode: boolean;
  getSettings(): JournalSettings;
  saveSettings(settings: JournalSettings): void;
  getVolumes(): Volume[];
  saveVolumes(volumes: Volume[]): void;
  getIssues(): Issue[];
  saveIssues(issues: Issue[]): void;
  getArticles(): Article[];
  saveArticles(articles: Article[]): void;
  getEvents(): AcademicEvent[];
  saveEvents(events: AcademicEvent[]): void;
  getAnnouncements(): Announcement[];
  saveAnnouncements(announcements: Announcement[]): void;
  getBoardMembers(): EditorialBoardMember[];
  saveBoardMembers(members: EditorialBoardMember[]): void;
  getCalendar(): EditorialCalendarItem[];
  saveCalendar(calendar: EditorialCalendarItem[]): void;
  getIndexing(): IndexingService[];
  saveIndexing(indexing: IndexingService[]): void;
  getFees(): PublicationFee[];
  saveFees(fees: PublicationFee[]): void;
  getProposalSelection(): ProposalSelectionState;
  saveProposalSelection(selection: ProposalSelectionState): void;
  resetToDefaults(): void;
}

const STORAGE_KEYS = {
  SETTINGS: 'jormass_settings_v1',
  VOLUMES: 'jormass_volumes_v1',
  ISSUES: 'jormass_issues_v1',
  ARTICLES: 'jormass_articles_v1',
  EVENTS: 'jormass_events_v1',
  ANNOUNCEMENTS: 'jormass_announcements_v1',
  BOARD: 'jormass_board_v1',
  CALENDAR: 'jormass_calendar_v1',
  INDEXING: 'jormass_indexing_v1',
  FEES: 'jormass_fees_v1',
  PROPOSAL_SELECTION: 'jormass_proposal_selection_v1',
};

/**
 * Local / Demo Data Provider
 * Provides robust offline/local mock storage using bundled initial dataset and localStorage.
 */
class LocalDemoDataProvider implements IDataProvider {
  public isLocalMode = true;

  getSettings(): JournalSettings {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  saveSettings(settings: JournalSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Unable to persist settings to localStorage', e);
    }
  }

  getVolumes(): Volume[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VOLUMES);
      return saved ? JSON.parse(saved) : INITIAL_VOLUMES;
    } catch {
      return INITIAL_VOLUMES;
    }
  }

  saveVolumes(volumes: Volume[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VOLUMES, JSON.stringify(volumes));
    } catch (e) {
      console.warn('Unable to persist volumes to localStorage', e);
    }
  }

  getIssues(): Issue[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ISSUES);
      return saved ? JSON.parse(saved) : INITIAL_ISSUES;
    } catch {
      return INITIAL_ISSUES;
    }
  }

  saveIssues(issues: Issue[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues));
    } catch (e) {
      console.warn('Unable to persist issues to localStorage', e);
    }
  }

  getArticles(): Article[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  }

  saveArticles(articles: Article[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    } catch (e) {
      console.warn('Unable to persist articles to localStorage', e);
    }
  }

  getEvents(): AcademicEvent[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  }

  saveEvents(events: AcademicEvent[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.warn('Unable to persist events to localStorage', e);
    }
  }

  getAnnouncements(): Announcement[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  }

  saveAnnouncements(announcements: Announcement[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.warn('Unable to persist announcements to localStorage', e);
    }
  }

  getBoardMembers(): EditorialBoardMember[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOARD);
      return saved ? JSON.parse(saved) : INITIAL_EDITORIAL_BOARD;
    } catch {
      return INITIAL_EDITORIAL_BOARD;
    }
  }

  saveBoardMembers(members: EditorialBoardMember[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BOARD, JSON.stringify(members));
    } catch (e) {
      console.warn('Unable to persist board members to localStorage', e);
    }
  }

  getCalendar(): EditorialCalendarItem[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CALENDAR);
      return saved ? JSON.parse(saved) : INITIAL_CALENDAR;
    } catch {
      return INITIAL_CALENDAR;
    }
  }

  saveCalendar(calendar: EditorialCalendarItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(calendar));
    } catch (e) {
      console.warn('Unable to persist calendar to localStorage', e);
    }
  }

  getIndexing(): IndexingService[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INDEXING);
      return saved ? JSON.parse(saved) : INITIAL_INDEXING;
    } catch {
      return INITIAL_INDEXING;
    }
  }

  saveIndexing(indexing: IndexingService[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INDEXING, JSON.stringify(indexing));
    } catch (e) {
      console.warn('Unable to persist indexing to localStorage', e);
    }
  }

  getFees(): PublicationFee[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEES);
      return saved ? JSON.parse(saved) : INITIAL_FEES;
    } catch {
      return INITIAL_FEES;
    }
  }

  saveFees(fees: PublicationFee[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(fees));
    } catch (e) {
      console.warn('Unable to persist fees to localStorage', e);
    }
  }

  getProposalSelection(): ProposalSelectionState {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPOSAL_SELECTION);
      return saved
        ? JSON.parse(saved)
        : {
            chosenDemo: 'demo1',
            chosenPackage: 'professional',
            clientName: '',
            clientEmail: '',
            clientNotes: '',
          };
    } catch {
      return {
        chosenDemo: 'demo1',
        chosenPackage: 'professional',
        clientName: '',
        clientEmail: '',
        clientNotes: '',
      };
    }
  }

  saveProposalSelection(selection: ProposalSelectionState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPOSAL_SELECTION, JSON.stringify(selection));
    } catch (e) {
      console.warn('Unable to persist proposal selection to localStorage', e);
    }
  }

  resetToDefaults(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.VOLUMES);
      localStorage.removeItem(STORAGE_KEYS.ISSUES);
      localStorage.removeItem(STORAGE_KEYS.ARTICLES);
      localStorage.removeItem(STORAGE_KEYS.EVENTS);
      localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
      localStorage.removeItem(STORAGE_KEYS.BOARD);
      localStorage.removeItem(STORAGE_KEYS.CALENDAR);
      localStorage.removeItem(STORAGE_KEYS.INDEXING);
      localStorage.removeItem(STORAGE_KEYS.FEES);
    } catch (e) {
      console.warn('Error clearing localStorage', e);
    }
  }
}

/**
 * Supabase Data Provider
 * Active when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are present.
 * Uses local storage caching and falls back gracefully to local demo data.
 */
class SupabaseDataProvider extends LocalDemoDataProvider {
  public isLocalMode = false;
  // Supabase implementation hooks can be configured here once activated
}

// Instantiate active data provider based on environment
export const dataProvider: IDataProvider = hasSupabase
  ? new SupabaseDataProvider()
  : new LocalDemoDataProvider();
