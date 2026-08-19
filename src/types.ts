/**
 * Type definitions for JORMASS Journal Platform & OnlineFirst Proposal Hub
 */

export type SiteMode = 'hub' | 'demo' | 'admin';
export type ThemeVariant = 'demo1' | 'demo2' | 'demo3';

export type JournalPage =
  | 'home'
  | 'about'
  | 'aims-scope'
  | 'editorial-board'
  | 'peer-review'
  | 'ethics'
  | 'open-access'
  | 'fees'
  | 'current-issue'
  | 'archive'
  | 'article'
  | 'search'
  | 'indexing'
  | 'events'
  | 'event-detail'
  | 'calendar'
  | 'author-guidelines'
  | 'manuscript-prep'
  | 'submit'
  | 'contact'
  | 'privacy';

export interface Author {
  name: string;
  affiliation: string;
  email?: string;
  orcid?: string;
  isCorresponding?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  abstract: string;
  keywords: string[];
  authors: Author[];
  doi?: string;
  pageStart: number;
  pageEnd: number;
  pdfUrl: string;
  pdfFileSize?: string;
  publicationDate: string;
  volumeId: string;
  issueId: string;
  category: string;
  section: string;
  license: string;
  status: 'published' | 'draft' | 'archived';
  viewsCount?: number;
  downloadsCount?: number;
  citationsCount?: number;
}

export interface Issue {
  id: string;
  volumeId: string;
  volumeNumber: number;
  issueNumber: number;
  year: number;
  title?: string;
  theme?: string;
  publicationDate: string;
  description?: string;
  coverUrl?: string;
  status: 'published' | 'in_progress' | 'archived';
  articleCount?: number;
}

export interface Volume {
  id: string;
  volumeNumber: number;
  year: number;
  title?: string;
  status: 'active' | 'archived';
  issues?: Issue[];
}

export interface AcademicEvent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  eventType: 'Conference' | 'Workshop' | 'Call for Papers' | 'Seminar' | 'Special Issue' | 'Lecture';
  eventDate: string;
  startTime: string;
  endTime?: string;
  venue: string;
  isVirtual?: boolean;
  virtualLink?: string;
  imageUrl?: string;
  registrationUrl?: string;
  contactEmail?: string;
  status: 'Published' | 'Draft' | 'Past/Archived';
  featured?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  expiryDate?: string;
  type: 'Call for Papers' | 'Special Issue' | 'Editorial Notice' | 'Conference Alert' | 'Maintenance';
  status: 'Published' | 'Draft' | 'Archived';
  priority?: 'normal' | 'high' | 'urgent';
}

export interface EditorialBoardMember {
  id: string;
  name: string;
  role: 'Editor-in-Chief' | 'Managing Editor' | 'Associate Editor' | 'Co-Editor' | 'Section Editor' | 'Editorial Advisory Board' | 'Desk Editor';
  section?: 'Management' | 'Economics & Finance' | 'Accounting & Auditing' | 'Social Sciences & Public Policy' | 'Agribusiness';
  institution: string;
  department?: string;
  country: string;
  orcid?: string;
  profileUrl?: string;
  imageUrl?: string;
  displayOrder: number;
  status: 'active' | 'past';
  bio?: string;
}

export interface IndexingService {
  name: string;
  status: 'Verified' | 'Status to be confirmed' | 'Verification required' | 'Under Editorial Verification' | 'Pending Application';
  url?: string;
  description: string;
  category: 'Major Academic Index' | 'Institutional Repository' | 'Open Access Directory' | 'Regional Index' | 'Research / Scholarly Network';
  badgeColor?: string;
}

export interface EditorialCalendarItem {
  id: string;
  volume: number;
  issue: number;
  year: number;
  theme?: string;
  submissionDeadline: string;
  expectedPublicationDate: string;
  status: 'Open for Submissions' | 'In Peer Review' | 'In Production' | 'Published';
  specialIssue?: boolean;
  guestEditor?: string;
}

export interface PublicationFee {
  feeType: string;
  amountNgn: string;
  amountUsd: string;
  whenPayable: string;
  coverage: string;
  paymentMethod: string;
}

export interface JournalSettings {
  journalName: string;
  abbreviation: string;
  issnPrint: string;
  issnOnline: string;
  publisher: string;
  institution: string;
  faculty: string;
  email: string;
  phone: string;
  address: string;
  defaultLicense: string;
  ojsSubmissionUrl: string;
  decisionDeadline: string;
}

export interface ProposalPackage {
  id: 'basic' | 'launch' | 'professional' | 'advanced';
  name: string;
  tagline: string;
  price: string;
  priceNumeric: number;
  period?: string;
  isRecommended?: boolean;
  badge?: string;
  bestFor: string;
  includes: string[];
  excludes?: string[];
  displayNote?: string;
}

export interface ComparisonRow {
  feature: string;
  category: string;
  basic: string | boolean;
  launch: string | boolean;
  professional: string | boolean;
  advanced: string | boolean;
  tooltip?: string;
}

export interface ProposalSelectionState {
  referenceId?: string;
  chosenDemo: 'demo1' | 'demo2' | 'demo3' | 'custom';
  chosenPackage: 'basic' | 'launch' | 'professional' | 'advanced';
  clientName: string;
  clientRole?: string;
  clientOrg?: string;
  clientEmail: string;
  clientNotes?: string;
  totalFee?: number;
  totalFeeFormatted?: string;
  depositPercentage?: number;
  depositAmount?: number;
  depositAmountFormatted?: string;
  balanceAmount?: number;
  balanceAmountFormatted?: string;
  authorityConfirmed?: boolean;
  commercialTermsConfirmed?: boolean;
  termsVersion?: string;
  governingLaw?: string;
  contractRecipientEmail?: string;
  confirmedAt?: string;
  submittedAt?: string;
  summaryText?: string;
}
