import React, { useState } from 'react';
import {
  JournalSettings,
  Volume,
  Issue,
  Article,
  AcademicEvent,
  Announcement,
  EditorialBoardMember,
  EditorialCalendarItem,
  IndexingService,
  PublicationFee,
  JournalPage,
} from '../../../types';
import {
  BookOpen,
  Download,
  Quote,
  Calendar,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  FileText,
  Search,
  Users,
  MapPin,
  Mail,
  Phone,
  Filter,
  Share2,
  Eye,
  BarChart2,
  Globe,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Layers,
  Building,
  Check,
  Copy,
} from 'lucide-react';
import { VerifiedBadge } from '../../Common/VerifiedBadge';

interface Demo3PagesProps {
  page: JournalPage;
  settings: JournalSettings;
  volumes: Volume[];
  issues: Issue[];
  articles: Article[];
  events: AcademicEvent[];
  announcements: Announcement[];
  boardMembers: EditorialBoardMember[];
  calendar: EditorialCalendarItem[];
  indexing: IndexingService[];
  fees: PublicationFee[];
  selectedArticle?: Article | null;
  onNavigate: (page: JournalPage) => void;
  onSelectArticle: (article: Article) => void;
  onOpenCitation: (article: Article) => void;
  onOpenPdf: (article: Article) => void;
  onOpenOjs: () => void;
}

export const Demo3Pages: React.FC<Demo3PagesProps> = ({
  page,
  settings,
  volumes = [],
  issues = [],
  articles = [],
  events = [],
  announcements = [],
  boardMembers = [],
  calendar = [],
  indexing = [],
  fees = [],
  selectedArticle,
  onNavigate,
  onSelectArticle,
  onOpenCitation,
  onOpenPdf,
  onOpenOjs,
}) => {
  const currentIssue = (issues || []).find((i) => i.status === 'published') || (issues || [])[0] || {
    id: 'current-issue',
    volumeId: 'vol-11',
    volumeNumber: 11,
    issueNumber: 2,
    year: 2025,
    title: 'Vol. 11 No. 2 (2025): General Edition',
    status: 'published',
    publicationDate: 'July 2025',
    isSpecialIssue: false,
    articleCount: (articles || []).length,
  };
  const currentVolume = (volumes || []).find((v) => v.id === currentIssue?.volumeId) || (volumes || [])[0] || {
    id: 'vol-11',
    volumeNumber: 11,
    year: 2025,
    title: 'Volume 11 (2025)',
    description: '2025 Academic Volumes',
  };

  // Editorial Board State
  const [boardSearch, setBoardSearch] = useState('');
  const [boardFilter, setBoardFilter] = useState<'all' | 'Editor-in-Chief' | 'Associate Editor' | 'Managing Editor' | 'Advisory Board'>('all');

  // Author Guidelines Active Section
  const [guidelinesTab, setGuidelinesTab] = useState<'prepare' | 'checklist' | 'review' | 'fees' | 'ethics' | 'open-access'>('prepare');

  // Archive Year Filter
  const [archiveYear, setArchiveYear] = useState<string>('all');
  const [expandedIssues, setExpandedIssues] = useState<Record<string, boolean>>({});

  const toggleIssueExpand = (issueId: string) => {
    setExpandedIssues((prev) => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
  };

  // ----------------------------------------------------
  // 1. ARTICLE DETAIL PAGE
  // ----------------------------------------------------
  if (page === 'article' && selectedArticle) {
    const issueOfArt = (issues || []).find((i) => i.id === selectedArticle.issueId) || currentIssue;
    const volOfArt = (volumes || []).find((v) => v.id === selectedArticle.volumeId) || currentVolume;

    const relatedArticles = (articles || [])
      .filter((a) => a && a.id !== selectedArticle.id && (a.category === selectedArticle.category || a.issueId === selectedArticle.issueId))
      .slice(0, 3);

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#50577A] border-b border-[#E2E5F3] pb-3 font-mono">
          <button onClick={() => onNavigate('home')} className="hover:text-[#20255C] transition cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('archive')} className="hover:text-[#20255C] transition cursor-pointer">
            Vol. {volOfArt.volumeNumber} No. {issueOfArt.issueNumber} ({issueOfArt.year})
          </button>
          <span>/</span>
          <span className="text-[#20255C] font-bold truncate max-w-md">
            {selectedArticle.title}
          </span>
        </nav>

        {/* 2-Column Main Article Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 Cols) */}
          <article className="lg:col-span-8 space-y-6">
            {/* Top Article Header Block */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E6EE] shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#FFC84D] text-[#20255C] font-extrabold px-2.5 py-0.5 text-[11px] uppercase">
                    Open Access
                  </span>
                  <span className="rounded-md bg-[#E2E5F3] text-[#6B3F74] font-bold px-2.5 py-0.5 text-[11px]">
                    {selectedArticle.category}
                  </span>
                </div>
                <span className="text-[#50577A] text-xs font-mono">
                  Pages {selectedArticle.pageStart}–{selectedArticle.pageEnd} • Published: {issueOfArt.publicationDate}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20255C] leading-snug font-heading">
                {selectedArticle.title}
              </h1>

              {/* Authors & Affiliations */}
              <div className="space-y-2 pt-2 border-t border-[#E2E6EE]/60">
                <div className="flex flex-wrap gap-2 text-sm font-bold text-[#20255C]">
                  {selectedArticle.authors.map((auth, idx) => (
                    <span key={idx} className="hover:text-[#B33600] cursor-pointer">
                      {auth.name}
                      {idx < selectedArticle.authors.length - 1 && <span className="text-[#50577A] font-normal">,</span>}
                    </span>
                  ))}
                </div>
                <div className="space-y-1 text-xs text-[#50577A] italic">
                  {selectedArticle.authors.map((auth, idx) => (
                    <p key={idx}>
                      <span className="font-semibold text-[#20255C] not-italic">{auth.name}</span> — {auth.affiliation}
                    </p>
                  ))}
                </div>
              </div>

              {/* Verified DOI / Identifiers */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#E2E5F3]/50 p-3 rounded-xl border border-[#E2E5F3] font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#50577A]">DOI:</span>
                  <a
                    href={`https://doi.org/${selectedArticle.doi || '10.5281/jormass.2025.11'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#B33600] hover:underline font-bold"
                  >
                    https://doi.org/{selectedArticle.doi || '10.5281/jormass.2025.11'}
                  </a>
                </div>
                <span className="text-[#20255C] font-semibold">Licensed under CC BY 4.0</span>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#E2E6EE]/60">
                <button
                  onClick={() => onOpenPdf(selectedArticle)}
                  className="rounded-xl bg-[#6B3F74] hover:bg-[#532e5b] px-4 py-2 text-xs font-bold text-white transition inline-flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="h-4 w-4 text-[#FFC84D]" />
                  <span>Download Full PDF</span>
                </button>
                <button
                  onClick={() => onOpenCitation(selectedArticle)}
                  className="rounded-xl border border-[#E2E6EE] bg-white hover:bg-[#E2E5F3] px-3.5 py-2 text-xs font-semibold text-[#50577A] transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Quote className="h-3.5 w-3.5 text-[#6B3F74]" />
                  <span>Cite Article</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText?.(window.location.href);
                    alert('Article link copied to clipboard.');
                  }}
                  className="rounded-xl border border-[#E2E6EE] bg-white hover:bg-[#E2E5F3] px-3.5 py-2 text-xs font-semibold text-[#50577A] transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5 text-[#50577A]" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => onNavigate('archive')}
                  className="rounded-xl border border-[#E2E6EE] bg-white hover:bg-[#E2E5F3] px-3.5 py-2 text-xs font-semibold text-[#50577A] transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5 text-[#20255C]" />
                  <span>View Issue Contents</span>
                </button>
              </div>
            </div>

            {/* Abstract Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E6EE] shadow-xs space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#20255C] font-heading border-b border-[#E2E6EE]/60 pb-2">
                Abstract
              </h3>
              <p className="text-xs sm:text-sm text-[#20255C]/90 leading-relaxed text-justify">
                {selectedArticle.abstract}
              </p>
            </div>

            {/* Keywords Block */}
            {selectedArticle.keywords && (
              <div className="bg-white p-6 rounded-2xl border border-[#E2E6EE] shadow-xs space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#50577A]">
                  Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-[#E2E5F3]/60 border border-[#E2E5F3] px-3 py-1 text-xs text-[#20255C] font-semibold hover:bg-[#6B3F74] hover:text-white transition cursor-pointer"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Article Structure Preview */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E6EE] shadow-xs space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#20255C] font-heading border-b border-[#E2E6EE]/60 pb-2">
                Article Information & Methodology Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#20255C]">
                <div className="p-4 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E5F3] space-y-1">
                  <p className="font-bold text-[#20255C]">Review Process</p>
                  <p className="text-[#50577A]">Double-blind peer reviewed by 2 independent subject specialists.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E5F3] space-y-1">
                  <p className="font-bold text-[#20255C]">Citation Standard</p>
                  <p className="text-[#50577A]">Formatted according to American Psychological Association (APA 7th Edition).</p>
                </div>
              </div>
            </div>
          </article>

          {/* Side Rail (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Article Metrics Widget */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#20255C] font-heading flex items-center gap-1.5 border-b border-[#E2E6EE]/60 pb-2">
                <BarChart2 className="h-4 w-4 text-[#B33600]" />
                <span>Article Metrics & Impact</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E5F3]">
                  <p className="text-lg font-extrabold text-[#20255C] font-mono">842</p>
                  <p className="text-[10px] text-[#50577A] font-semibold uppercase">Views</p>
                </div>
                <div className="p-3 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E5F3]">
                  <p className="text-lg font-extrabold text-[#B33600] font-mono">318</p>
                  <p className="text-[10px] text-[#50577A] font-semibold uppercase">PDF DL</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FFC84D]/25 border border-[#FFC84D]/40">
                  <p className="text-lg font-extrabold text-[#20255C] font-mono">12</p>
                  <p className="text-[10px] text-[#20255C] font-bold uppercase">Citations</p>
                </div>
              </div>
              <p className="text-[11px] text-[#50577A] text-center font-mono">
                Crossref & Google Scholar verified citations index
              </p>
            </div>

            {/* Issue Information Block */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#20255C] font-heading border-b border-[#E2E6EE]/60 pb-2">
                Issue Information
              </h4>
              <div className="space-y-2 text-xs text-[#20255C]">
                <p className="font-bold text-[#20255C]">
                  Volume {volOfArt.volumeNumber}, Issue {issueOfArt.issueNumber} ({issueOfArt.year})
                </p>
                <p className="text-[#50577A] text-[11px]">
                  Publication Date: {issueOfArt.publicationDate}
                </p>
                <p className="text-[#50577A] line-clamp-2">
                  {issueOfArt.description || 'Regular scholarly research edition'}
                </p>
                <button
                  onClick={() => onNavigate('archive')}
                  className="pt-1 text-[#B33600] hover:underline font-bold inline-flex items-center gap-1 text-xs cursor-pointer"
                >
                  <span>Browse other articles in this issue</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Related Research Articles */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E6EE] shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#20255C] font-heading border-b border-[#E2E6EE]/60 pb-2">
                Related Research
              </h4>
              <div className="divide-y divide-[#E2E6EE]/60">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="py-3 first:pt-0 last:pb-0 cursor-pointer group space-y-1"
                  >
                    <span className="text-[10px] font-bold text-[#6B3F74] uppercase font-mono">
                      {rel.category}
                    </span>
                    <h5 className="text-xs font-bold text-[#20255C] group-hover:text-[#B33600] transition line-clamp-2 leading-snug font-heading">
                      {rel.title}
                    </h5>
                    <p className="text-[11px] text-[#50577A] line-clamp-1">
                      {rel.authors.map((a) => a.name).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. ARCHIVE & ALL VOLUMES
  // ----------------------------------------------------
  if (page === 'archive') {
    const years = Array.from(new Set((volumes || []).map((v) => v.year.toString()))).sort().reverse();

    const filteredVolumes = (volumes || []).filter((v) => {
      if (archiveYear !== 'all' && v.year.toString() !== archiveYear) return false;
      return true;
    });

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
        <div className="border-b border-[#E2E5F3] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20255C] font-heading">
              JORMASS Publication Archive
            </h1>
            <p className="text-xs sm:text-sm text-[#50577A] mt-1">
              Complete archival records organized by Volume and Issue across all publication years.
            </p>
          </div>

          {/* Filter By Year Tabs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#50577A] font-semibold mr-1">Browse Year:</span>
            <button
              onClick={() => setArchiveYear('all')}
              className={`rounded-lg px-3 py-1.5 text-xs transition cursor-pointer ${
                archiveYear === 'all'
                  ? 'bg-[#20255C] text-white font-bold shadow-xs'
                  : 'bg-white border border-[#E2E6EE] text-[#50577A] hover:bg-[#E2E5F3]'
              }`}
            >
              All Years
            </button>
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => setArchiveYear(yr)}
                className={`rounded-lg px-3 py-1.5 text-xs transition cursor-pointer ${
                  archiveYear === yr
                    ? 'bg-[#20255C] text-white font-bold shadow-xs'
                    : 'bg-white border border-[#E2E6EE] text-[#50577A] hover:bg-[#E2E5F3]'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Volume & Issue Stream */}
        <div className="space-y-6">
          {filteredVolumes.map((vol) => {
            const volIssues = (issues || []).filter((i) => i.volumeId === vol.id);
            return (
              <div key={vol.id} className="rounded-2xl border border-[#E2E6EE] bg-white p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E6EE]/60 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-[#20255C] font-heading">
                      Volume {vol.volumeNumber} ({vol.year})
                    </h2>
                    <p className="text-xs text-[#50577A] font-mono mt-0.5">
                      COLMAS Publication Records • {volIssues.length} Issues Published
                    </p>
                  </div>
                  <span className="rounded-md bg-[#FFC84D] text-[#20255C] font-extrabold text-xs px-3 py-1">
                    Archived & Open Access
                  </span>
                </div>

                <div className="space-y-3.5">
                  {volIssues.map((iss) => {
                    const issArts = (articles || []).filter((a) => a.issueId === iss.id);
                    const isExpanded = expandedIssues[iss.id] !== false;

                    return (
                      <div key={iss.id} className="rounded-xl border border-[#E2E6EE] bg-[#E2E5F3]/30 p-4 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#20255C] text-sm">
                                Issue No. {iss.issueNumber} ({vol.year})
                              </span>
                              <span className="text-xs text-[#50577A] font-mono">
                                • {iss.publicationDate}
                              </span>
                            </div>
                            <p className="text-xs text-[#20255C] font-medium">
                              {iss.title}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#50577A] font-mono">
                              {issArts.length} Articles
                            </span>
                            <button
                              onClick={() => toggleIssueExpand(iss.id)}
                              className="p-1.5 rounded-lg text-[#20255C] hover:bg-[#E2E5F3] cursor-pointer"
                            >
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4 text-[#B33600]" />}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Article Listing */}
                        {isExpanded && (
                          <div className="divide-y divide-[#E2E6EE] pt-2 border-t border-[#E2E6EE] bg-white rounded-xl p-3">
                            {issArts.map((art) => (
                              <div
                                key={art.id}
                                className="py-3 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-[#E2E5F3]/30 px-2.5 rounded-lg"
                              >
                                <div className="space-y-0.5 max-w-2xl">
                                  <h4
                                    onClick={() => onSelectArticle(art)}
                                    className="font-bold text-[#20255C] hover:text-[#B33600] cursor-pointer font-heading"
                                  >
                                    {art.title}
                                  </h4>
                                  <p className="text-[11px] text-[#50577A]">
                                    {(art.authors || []).map((a) => a?.name).filter(Boolean).join(', ')} • pp. {art.pageStart}–{art.pageEnd}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() => onSelectArticle(art)}
                                    className="text-xs text-[#B33600] hover:underline font-bold cursor-pointer"
                                  >
                                    View Article
                                  </button>
                                  <button
                                    onClick={() => onOpenPdf(art)}
                                    className="rounded-lg bg-[#6B3F74] hover:bg-[#532e5b] text-white font-bold px-3 py-1 text-xs cursor-pointer"
                                  >
                                    PDF
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 3. EDITORIAL BOARD
  // ----------------------------------------------------
  if (page === 'editorial-board') {
    const filteredBoard = (boardMembers || []).filter((m) => {
      if (!m) return false;
      if (boardFilter !== 'all' && !m.role?.toLowerCase().includes(boardFilter.toLowerCase())) {
        return false;
      }
      if (boardSearch.trim()) {
        const q = boardSearch.toLowerCase();
        const matchesName = m.name?.toLowerCase().includes(q);
        const matchesInst = m.institution?.toLowerCase().includes(q);
        const matchesDept = m.department?.toLowerCase().includes(q);
        if (!(matchesName || matchesInst || matchesDept)) return false;
      }
      return true;
    });

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
        <div className="border-b border-[#E2E5F3] pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20255C] font-heading">
            Editorial Board Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#50577A] mt-1">
            Scholarly advisory and editorial leaders guiding peer-review rigor across management sciences.
          </p>
        </div>

        {/* Directory Controls */}
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-[#E2E6EE] shadow-xs">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#50577A]" />
            <input
              type="text"
              value={boardSearch}
              onChange={(e) => setBoardSearch(e.target.value)}
              placeholder="Search editorial members by name, institution, or department..."
              className="w-full rounded-xl border border-[#E2E6EE] pl-10 pr-3 py-2 text-xs text-[#20255C] focus:border-[#6B3F74] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#50577A] font-semibold mr-1">Role:</span>
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'Editor-in-Chief', label: 'Editor-in-Chief' },
              { id: 'Associate Editor', label: 'Associate Editors' },
              { id: 'Managing Editor', label: 'Managing Editor' },
            ].map((rf) => (
              <button
                key={rf.id}
                onClick={() => setBoardFilter(rf.id as any)}
                className={`rounded-lg px-3 py-1.5 text-xs transition cursor-pointer ${
                  boardFilter === rf.id
                    ? 'bg-[#6B3F74] text-white font-bold shadow-xs'
                    : 'bg-[#E2E5F3]/50 border border-[#E2E6EE] text-[#50577A] hover:bg-[#E2E5F3]'
                }`}
              >
                {rf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Board Members Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBoard.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-[#E2E6EE] bg-white p-5 space-y-3 shadow-xs hover:border-[#6B3F74] transition"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-[#E2E5F3] text-[#6B3F74] font-bold text-[10px] px-2.5 py-0.5 uppercase tracking-wider">
                  {member.role}
                </span>
                <span className="text-[11px] text-[#50577A] font-mono">{member.country}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#20255C] font-heading">
                  {member.name}
                </h3>
                <p className="text-xs text-[#B33600] font-semibold">
                  {member.department}
                </p>
                <p className="text-xs text-[#50577A]">
                  {member.institution}
                </p>
              </div>

              {member.orcid && (
                <div className="pt-2 border-t border-[#E2E6EE]/60 flex items-center justify-between text-[11px] text-[#50577A] font-mono">
                  <span>ORCID Profile</span>
                  <a
                    href={member.orcid}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#B33600] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>Verified Researcher</span>
                    <ExternalLink className="h-3 w-3 text-[#FFC84D]" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 4. AUTHOR GUIDELINES
  // ----------------------------------------------------
  if (page === 'author-guidelines') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
        <div className="border-b border-[#E2E5F3] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20255C] font-heading">
              Author Submission & Manuscript Guidelines
            </h1>
            <p className="text-xs sm:text-sm text-[#50577A] mt-1">
              Instructions for manuscript formatting, submission requirements, APA 7th referencing, and review protocols.
            </p>
          </div>

          <button
            onClick={() => onNavigate('submit')}
            className="rounded-xl bg-[#B33600] hover:bg-[#8f2b00] px-5 py-2.5 text-xs font-bold text-white transition shrink-0 shadow-xs cursor-pointer"
          >
            Submit Manuscript Online
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-[#E2E5F3] gap-1 font-bold text-xs">
          {[
            { id: 'prepare', label: 'Preparing Your Manuscript' },
            { id: 'checklist', label: 'Submission Checklist' },
            { id: 'review', label: 'Peer Review Protocol' },
            { id: 'fees', label: 'Publication Charges' },
            { id: 'ethics', label: 'Publication Ethics' },
            { id: 'open-access', label: 'Open Access Policy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setGuidelinesTab(tab.id as any)}
              className={`px-4 py-2.5 border-b-2 transition cursor-pointer ${
                guidelinesTab === tab.id
                  ? 'border-[#B33600] text-[#B33600] font-extrabold bg-[#E2E5F3]/40 rounded-t-lg'
                  : 'border-transparent text-[#50577A] hover:text-[#20255C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panes */}
        <div className="rounded-2xl border border-[#E2E6EE] bg-white p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-[#20255C] leading-relaxed">
          {guidelinesTab === 'prepare' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#20255C] font-heading">
                Manuscript Preparation Specifications
              </h3>
              <p className="text-[#50577A]">
                Manuscripts submitted to JORMASS must represent original research contributions that have not been published previously and are not under consideration by another journal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E5F3] space-y-1">
                  <p className="font-bold text-[#20255C]">File Format & Length</p>
                  <p className="text-xs text-[#50577A]">Microsoft Word (.doc, .docx), 5,000–8,000 words including tables and references.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E5F3] space-y-1">
                  <p className="font-bold text-[#20255C]">Referencing Standard</p>
                  <p className="text-xs text-[#50577A]">APA 7th Edition style strictly required for all in-text citations and reference list.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E5F3] space-y-1">
                  <p className="font-bold text-[#20255C]">Abstract & Keywords</p>
                  <p className="text-xs text-[#50577A]">Structured abstract between 150–250 words accompanied by 4–6 relevant keywords.</p>
                </div>
              </div>
            </div>
          )}

          {guidelinesTab === 'checklist' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#20255C] font-heading">
                Pre-Submission Author Checklist
              </h3>
              <ul className="space-y-2.5 text-xs text-[#20255C]">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#B33600] shrink-0 mt-0.5" />
                  <span>The manuscript is original, prepared in clear English, and formatted in double line spacing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#B33600] shrink-0 mt-0.5" />
                  <span>A separate title page with all author names, affiliations, emails, and ORCID IDs is provided.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#B33600] shrink-0 mt-0.5" />
                  <span>The main manuscript text is completely anonymized for double-blind peer review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#B33600] shrink-0 mt-0.5" />
                  <span>All tables and figures are numbered sequentially with self-contained descriptive titles.</span>
                </li>
              </ul>
            </div>
          )}

          {guidelinesTab === 'review' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#20255C] font-heading">
                Double-Blind Peer Review Protocols
              </h3>
              <p className="text-[#50577A]">
                Every submission is initially assessed by the Managing Editor for scope and formatting. Manuscripts meeting minimum requirements are assigned to two independent reviewers who evaluate empirical rigor, theoretical soundness, and clarity.
              </p>
              <div className="p-4 rounded-xl bg-[#E2E5F3]/50 border border-[#E2E5F3] text-[#20255C] font-semibold text-xs">
                Typical review turnaround duration is 4–6 weeks from initial submission to editorial decision.
              </div>
            </div>
          )}

          {guidelinesTab === 'fees' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#20255C] font-heading">
                Publication Fees & Author Processing Charges (APC)
              </h3>
              <p className="text-[#50577A]">
                JORMASS maintains a transparent fee structure. Assessment fees cover double-blind peer review management, while page charges support open-access digital archiving and DOI registration.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {(fees || []).map((f) => (
                  <div key={f.id} className="p-4 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E6EE] space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-[#20255C]">{f.title}</span>
                      <span className="text-[#B33600] font-mono">{f.amount}</span>
                    </div>
                    <p className="text-xs text-[#50577A]">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {guidelinesTab === 'ethics' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#20255C] font-heading">
                Ethics & Plagiarism Policy
              </h3>
              <p className="text-[#50577A]">
                JORMASS adheres strictly to the Committee on Publication Ethics (COPE) core practices. Plagiarism and duplicate publication are strictly prohibited. All submissions are screened using Turnitin with a maximum similarity index threshold of 15%.
              </p>
            </div>
          )}

          {guidelinesTab === 'open-access' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#20255C] font-heading">
                Open Access & Licensing Statement
              </h3>
              <p className="text-[#50577A]">
                All articles published in JORMASS are distributed under the Creative Commons Attribution 4.0 International License (CC BY 4.0), permitting unrestricted use, distribution, and reproduction in any medium provided the original work is properly cited.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 5. EVENTS & CONFERENCES
  // ----------------------------------------------------
  if (page === 'events') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
        <div className="border-b border-[#E2E5F3] pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20255C] font-heading">
            Academic Events & Conferences
          </h1>
          <p className="text-xs sm:text-sm text-[#50577A] mt-1">
            Faculty symposia, research workshops, call-for-papers deadlines, and doctoral roundtables.
          </p>
        </div>

        <div className="space-y-4">
          {(events || []).map((evt) => (
            <div
              key={evt.id}
              className="rounded-2xl border border-[#E2E6EE] bg-white p-6 shadow-xs flex flex-col md:flex-row justify-between gap-6 hover:border-[#6B3F74] transition"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-[#20255C] text-white font-bold text-[10px] px-2.5 py-0.5 uppercase tracking-wider font-mono">
                    {evt.category}
                  </span>
                  <span className="text-[#50577A] font-mono">
                    {evt.date} • {evt.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#20255C] font-heading">
                  {evt.title}
                </h3>
                <p className="text-xs text-[#50577A] max-w-2xl leading-relaxed">
                  {evt.description}
                </p>
                <p className="text-xs font-semibold text-[#20255C] pt-1">
                  Location: <span className="text-[#50577A] font-normal">{evt.location}</span>
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0">
                <span className="rounded-md bg-[#FFC84D] text-[#20255C] font-extrabold text-xs px-3 py-1">
                  Registration Open
                </span>
                <button
                  onClick={() => alert(`Registration details for ${evt.title} will be confirmed.`)}
                  className="rounded-xl bg-[#6B3F74] hover:bg-[#532e5b] px-4 py-2 text-xs font-bold text-white transition shadow-xs cursor-pointer"
                >
                  Register / Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 6. INDEXING & ABSTRACTING
  // ----------------------------------------------------
  if (page === 'indexing') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
        <div className="border-b border-[#E2E5F3] pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20255C] font-heading">
            Indexing & Abstracting Services
          </h1>
          <p className="text-xs sm:text-sm text-[#50577A] mt-1">
            Global discovery databases and bibliographic indexes ensuring maximum scholarly impact for JORMASS authors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(indexing || []).map((idxItem, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#E2E6EE] bg-white p-5 space-y-3 shadow-xs hover:border-[#6B3F74] transition"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-base font-bold text-[#20255C] font-heading">
                  {idxItem.name}
                </h3>
                <VerifiedBadge status={idxItem.status} />
              </div>
              <p className="text-xs text-[#50577A] leading-relaxed">
                {idxItem.description}
              </p>
              {idxItem.url && (
                <a
                  href={idxItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="pt-2 text-xs font-bold text-[#B33600] hover:underline inline-flex items-center gap-1 font-mono"
                >
                  <span>Verification Portal</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#6B3F74]" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 7. DEFAULT / ABOUT & AIMS & SCOPE
  // ----------------------------------------------------
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      <div className="border-b border-[#E2E5F3] pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20255C] font-heading">
          About JORMASS & Institutional Scope
        </h1>
        <p className="text-xs sm:text-sm text-[#50577A] mt-1">
          {settings.faculty}, {settings.institution}, Umudike, Nigeria
        </p>
      </div>

      <div className="rounded-2xl border border-[#E2E6EE] bg-white p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-[#20255C] leading-relaxed">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#20255C] font-heading mb-2">
            Journal Mandate & Editorial Philosophy
          </h3>
          <p className="text-[#50577A]">
            The Journal of Research in Management and Social Sciences (JORMASS) is the flagship peer-reviewed academic publication of the College of Management Sciences at Michael Okpara University of Agriculture, Umudike. JORMASS publishes rigorous empirical and theoretical contributions advancing knowledge in management sciences, public administration, financial economics, agribusiness, and social sciences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E6EE] space-y-1">
            <h4 className="font-bold text-[#20255C]">Management & Business Sciences</h4>
            <p className="text-xs text-[#50577A]">
              Corporate Governance, Accounting & Auditing Standards, Human Capital Strategy, Marketing Analytics, and Supply Chain Management.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#E2E5F3]/40 border border-[#E2E6EE] space-y-1">
            <h4 className="font-bold text-[#20255C]">Economics, Finance & Social Sciences</h4>
            <p className="text-xs text-[#50577A]">
              Development Economics, Agribusiness Value Chains, Monetary Policy, Public Sector Administration, and Social Policy.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E2E6EE]/60 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#50577A] font-mono">
            ISSN: {settings.issnPrint} (Print) • {settings.issnOnline} (Online)
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => onNavigate('author-guidelines')}
              className="rounded-xl border border-[#E2E6EE] bg-white px-4 py-2 text-xs font-bold text-[#20255C] hover:bg-[#E2E5F3] cursor-pointer"
            >
              Author Guidelines
            </button>
            <button
              onClick={() => onNavigate('submit')}
              className="rounded-xl bg-[#B33600] hover:bg-[#8f2b00] px-4 py-2 text-xs font-bold text-white shadow-xs cursor-pointer"
            >
              Submit Manuscript
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
