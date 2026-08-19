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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-d3-body">
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#675e79] font-d3-meta border-b border-[#E2E6EE] pb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#2a369c] transition">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('archive')} className="hover:text-[#2a369c] transition">
            Vol. {volOfArt.volumeNumber} No. {issueOfArt.issueNumber} ({issueOfArt.year})
          </button>
          <span>/</span>
          <span className="text-[#2a369c] font-semibold truncate max-w-md">
            {selectedArticle.title}
          </span>
        </nav>

        {/* 2-Column Main Article Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 Cols) */}
          <article className="lg:col-span-8 space-y-6">
            {/* Top Article Header Block */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E6EE] shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#b3bcf2] text-[#2a369c] font-bold px-2 py-0.5 text-[11px] font-d3-meta">
                    Open Access
                  </span>
                  <span className="rounded bg-[#F4F6FB] border border-[#E2E6EE] text-[#c04f17] font-semibold px-2 py-0.5 text-[11px] font-d3-meta">
                    {selectedArticle.category}
                  </span>
                </div>
                <span className="text-[#675e79] text-xs font-d3-meta">
                  Pages {selectedArticle.pageStart}–{selectedArticle.pageEnd} • Published: {issueOfArt.publicationDate}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2a369c] leading-snug font-d3-heading">
                {selectedArticle.title}
              </h1>

              {/* Authors & Affiliations */}
              <div className="space-y-2 pt-2 border-t border-[#E2E6EE]/60">
                <div className="flex flex-wrap gap-2 text-sm font-bold text-[#2a369c]">
                  {selectedArticle.authors.map((auth, idx) => (
                    <span key={idx} className="hover:text-[#c04f17] cursor-pointer">
                      {auth.name}
                      {idx < selectedArticle.authors.length - 1 && <span className="text-[#675e79] font-normal">,</span>}
                    </span>
                  ))}
                </div>
                <div className="space-y-1 text-xs text-[#675e79] italic">
                  {selectedArticle.authors.map((auth, idx) => (
                    <p key={idx}>
                      <span className="font-semibold text-[#242A38] not-italic">{auth.name}</span> — {auth.affiliation}
                    </p>
                  ))}
                </div>
              </div>

              {/* Verified DOI / Identifiers */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#b3bcf2]/20 p-3 rounded-lg border border-[#b3bcf2] font-d3-meta">
                <div className="flex items-center gap-2">
                  <span className="text-[#675e79]">DOI:</span>
                  <a
                    href={`https://doi.org/${selectedArticle.doi || '10.5281/jormass.2025.11'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c04f17] hover:underline font-bold"
                  >
                    https://doi.org/{selectedArticle.doi || '10.5281/jormass.2025.11'}
                  </a>
                </div>
                <span className="text-[#2a369c] font-semibold">Licensed under CC BY 4.0</span>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2E6EE]/60">
                <button
                  onClick={() => onOpenPdf(selectedArticle)}
                  className="rounded-md bg-[#2a369c] hover:bg-[#1f2979] px-4 py-2 text-xs font-bold text-white transition inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="h-3.5 w-3.5 text-[#b3bcf2]" />
                  <span>Download Full PDF</span>
                </button>
                <button
                  onClick={() => onOpenCitation(selectedArticle)}
                  className="rounded-md border border-[#E2E6EE] bg-white hover:bg-[#F4F6FB] px-3.5 py-2 text-xs font-semibold text-[#675e79] transition inline-flex items-center gap-1.5"
                >
                  <Quote className="h-3.5 w-3.5 text-[#e86b31]" />
                  <span>Cite Article</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText?.(window.location.href);
                    alert('Article link copied to clipboard.');
                  }}
                  className="rounded-md border border-[#E2E6EE] bg-white hover:bg-[#F4F6FB] px-3 py-2 text-xs font-semibold text-[#675e79] transition inline-flex items-center gap-1.5"
                >
                  <Share2 className="h-3.5 w-3.5 text-[#675e79]" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => onNavigate('archive')}
                  className="rounded-md border border-[#E2E6EE] bg-white hover:bg-[#F4F6FB] px-3 py-2 text-xs font-semibold text-[#675e79] transition inline-flex items-center gap-1.5"
                >
                  <BookOpen className="h-3.5 w-3.5 text-[#2a369c]" />
                  <span>View Issue Contents</span>
                </button>
              </div>
            </div>

            {/* Abstract Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E6EE] shadow-xs space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#2a369c] font-d3-heading border-b border-[#E2E6EE]/60 pb-2">
                Abstract
              </h3>
              <p className="text-xs sm:text-sm text-[#242A38]/90 leading-relaxed text-justify">
                {selectedArticle.abstract}
              </p>
            </div>

            {/* Keywords Block */}
            {selectedArticle.keywords && (
              <div className="bg-white p-6 rounded-xl border border-[#E2E6EE] shadow-xs space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#675e79] font-d3-meta">
                  Keywords
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-[#F4F6FB] border border-[#E2E6EE] px-2.5 py-1 text-xs text-[#2a369c] font-medium hover:bg-[#b3bcf2]/40 transition cursor-pointer"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Article Structure Preview */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E6EE] shadow-xs space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#2a369c] font-d3-heading border-b border-[#E2E6EE]/60 pb-2">
                Article Information & Methodology Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#242A38]">
                <div className="p-3 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] space-y-1">
                  <p className="font-bold text-[#2a369c]">Review Process</p>
                  <p className="text-[#675e79]">Double-blind peer reviewed by 2 independent subject specialists.</p>
                </div>
                <div className="p-3 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] space-y-1">
                  <p className="font-bold text-[#2a369c]">Citation Standard</p>
                  <p className="text-[#675e79]">Formatted according to American Psychological Association (APA 7th Edition).</p>
                </div>
              </div>
            </div>
          </article>

          {/* Side Rail (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Article Metrics Widget */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E6EE] shadow-xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2a369c] font-d3-heading flex items-center gap-1.5 border-b border-[#E2E6EE]/60 pb-2">
                <BarChart2 className="h-4 w-4 text-[#e86b31]" />
                <span>Article Metrics & Impact</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE]">
                  <p className="text-lg font-extrabold text-[#2a369c] font-d3-meta">842</p>
                  <p className="text-[10px] text-[#675e79] font-semibold uppercase">Views</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE]">
                  <p className="text-lg font-extrabold text-[#c04f17] font-d3-meta">318</p>
                  <p className="text-[10px] text-[#675e79] font-semibold uppercase">PDF DL</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#b3bcf2]/30 border border-[#b3bcf2]">
                  <p className="text-lg font-extrabold text-[#2a369c] font-d3-meta">12</p>
                  <p className="text-[10px] text-[#2a369c] font-bold uppercase">Citations</p>
                </div>
              </div>
              <p className="text-[11px] text-[#675e79] text-center font-d3-meta">
                Crossref & Google Scholar verified citations index
              </p>
            </div>

            {/* Issue Information Block */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E6EE] shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2a369c] font-d3-heading border-b border-[#E2E6EE]/60 pb-2">
                Issue Information
              </h4>
              <div className="space-y-1.5 text-xs text-[#242A38]">
                <p className="font-bold text-[#2a369c]">
                  Volume {volOfArt.volumeNumber}, Issue {issueOfArt.issueNumber} ({issueOfArt.year})
                </p>
                <p className="text-[#675e79] text-[11px]">
                  Publication Date: {issueOfArt.publicationDate}
                </p>
                <p className="text-[#675e79] line-clamp-2">
                  {issueOfArt.description || 'Regular scholarly research edition'}
                </p>
                <button
                  onClick={() => onNavigate('archive')}
                  className="pt-1 text-[#c04f17] hover:underline font-bold inline-flex items-center gap-1 text-xs"
                >
                  <span>Browse other articles in this issue</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Related Research Articles */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E6EE] shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2a369c] font-d3-heading border-b border-[#E2E6EE]/60 pb-2">
                Related Research
              </h4>
              <div className="divide-y divide-[#E2E6EE]/60">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="py-3 first:pt-0 last:pb-0 cursor-pointer group space-y-1"
                  >
                    <span className="text-[10px] font-bold text-[#c04f17] uppercase font-d3-meta">
                      {rel.category}
                    </span>
                    <h5 className="text-xs font-bold text-[#2a369c] group-hover:text-[#c04f17] transition line-clamp-2 leading-snug">
                      {rel.title}
                    </h5>
                    <p className="text-[11px] text-[#675e79] line-clamp-1">
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d3-body">
        <div className="border-b border-[#E2E6EE] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2a369c] font-d3-heading">
              JORMASS Publication Archive
            </h1>
            <p className="text-xs sm:text-sm text-[#675e79] mt-1">
              Complete archival records organized by Volume and Issue across all publication years.
            </p>
          </div>

          {/* Filter By Year Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-d3-meta">
            <span className="text-[#675e79] font-semibold mr-1">Browse Year:</span>
            <button
              onClick={() => setArchiveYear('all')}
              className={`rounded px-3 py-1 text-xs transition ${
                archiveYear === 'all'
                  ? 'bg-[#2a369c] text-white font-bold shadow-xs'
                  : 'bg-white border border-[#E2E6EE] text-[#675e79] hover:bg-[#F4F6FB]'
              }`}
            >
              All Years
            </button>
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => setArchiveYear(yr)}
                className={`rounded px-3 py-1 text-xs transition ${
                  archiveYear === yr
                    ? 'bg-[#2a369c] text-white font-bold shadow-xs'
                    : 'bg-white border border-[#E2E6EE] text-[#675e79] hover:bg-[#F4F6FB]'
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
              <div key={vol.id} className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E6EE]/60 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-[#2a369c] font-d3-heading">
                      Volume {vol.volumeNumber} ({vol.year})
                    </h2>
                    <p className="text-xs text-[#675e79] font-d3-meta mt-0.5">
                      COLMAS Publication Records • {volIssues.length} Issues Published
                    </p>
                  </div>
                  <span className="rounded bg-[#b3bcf2] text-[#2a369c] font-bold text-xs px-2.5 py-1">
                    Archived & Open Access
                  </span>
                </div>

                <div className="space-y-3">
                  {volIssues.map((iss) => {
                    const issArts = (articles || []).filter((a) => a.issueId === iss.id);
                    const isExpanded = expandedIssues[iss.id] !== false;

                    return (
                      <div key={iss.id} className="rounded-lg border border-[#E2E6EE] bg-[#F4F6FB] p-4 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#2a369c] text-sm">
                                Issue No. {iss.issueNumber} ({vol.year})
                              </span>
                              <span className="text-xs text-[#675e79] font-d3-meta">
                                • {iss.publicationDate}
                              </span>
                            </div>
                            <p className="text-xs text-[#242A38] font-medium">
                              {iss.title}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#675e79] font-d3-meta">
                              {issArts.length} Articles
                            </span>
                            <button
                              onClick={() => toggleIssueExpand(iss.id)}
                              className="p-1 rounded text-[#2a369c] hover:bg-[#b3bcf2]/40"
                            >
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4 text-[#c04f17]" />}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Article Listing */}
                        {isExpanded && (
                          <div className="divide-y divide-[#E2E6EE] pt-2 border-t border-[#E2E6EE] bg-white rounded-md p-3">
                            {issArts.map((art) => (
                              <div
                                key={art.id}
                                className="py-2.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-[#F4F6FB] px-2 rounded"
                              >
                                <div className="space-y-0.5 max-w-2xl">
                                  <h4
                                    onClick={() => onSelectArticle(art)}
                                    className="font-bold text-[#2a369c] hover:text-[#c04f17] cursor-pointer"
                                  >
                                    {art.title}
                                  </h4>
                                  <p className="text-[11px] text-[#675e79]">
                                    {(art.authors || []).map((a) => a?.name).filter(Boolean).join(', ')} • pp. {art.pageStart}–{art.pageEnd}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() => onSelectArticle(art)}
                                    className="text-xs text-[#c04f17] hover:underline font-semibold"
                                  >
                                    View Article
                                  </button>
                                  <button
                                    onClick={() => onOpenPdf(art)}
                                    className="rounded bg-[#2a369c] hover:bg-[#1f2979] text-white font-semibold px-2.5 py-1 text-[11px]"
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d3-body">
        <div className="border-b border-[#E2E6EE] pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2a369c] font-d3-heading">
            Editorial Board Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#675e79] mt-1">
            Scholarly advisory and editorial leaders guiding peer-review rigor across management sciences.
          </p>
        </div>

        {/* Directory Controls */}
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-[#E2E6EE] shadow-xs">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#675e79]" />
            <input
              type="text"
              value={boardSearch}
              onChange={(e) => setBoardSearch(e.target.value)}
              placeholder="Search editorial members by name, institution, or department..."
              className="w-full rounded-md border border-[#E2E6EE] pl-9 pr-3 py-1.5 text-xs text-[#242A38] focus:border-[#2a369c] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-d3-meta">
            <span className="text-[#675e79] font-semibold mr-1">Role:</span>
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'Editor-in-Chief', label: 'Editor-in-Chief' },
              { id: 'Associate Editor', label: 'Associate Editors' },
              { id: 'Managing Editor', label: 'Managing Editor' },
            ].map((rf) => (
              <button
                key={rf.id}
                onClick={() => setBoardFilter(rf.id as any)}
                className={`rounded px-2.5 py-1 text-xs transition ${
                  boardFilter === rf.id
                    ? 'bg-[#2a369c] text-white font-bold shadow-xs'
                    : 'bg-[#F4F6FB] border border-[#E2E6EE] text-[#675e79] hover:bg-[#b3bcf2]/30'
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
              className="rounded-xl border border-[#E2E6EE] bg-white p-5 space-y-2.5 shadow-xs hover:border-[#c04f17] transition"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#b3bcf2] text-[#2a369c] font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider font-d3-meta">
                  {member.role}
                </span>
                <span className="text-[11px] text-[#675e79] font-d3-meta">{member.country}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#2a369c] font-d3-heading">
                  {member.name}
                </h3>
                <p className="text-xs text-[#c04f17] font-medium">
                  {member.department}
                </p>
                <p className="text-xs text-[#675e79]">
                  {member.institution}
                </p>
              </div>

              {member.orcid && (
                <div className="pt-2 border-t border-[#E2E6EE]/60 flex items-center justify-between text-[11px] text-[#675e79] font-d3-meta">
                  <span>ORCID Profile</span>
                  <a
                    href={member.orcid}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c04f17] hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <span>Verified Researcher</span>
                    <ExternalLink className="h-3 w-3 text-[#e86b31]" />
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d3-body">
        <div className="border-b border-[#E2E6EE] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2a369c] font-d3-heading">
              Author Submission & Manuscript Guidelines
            </h1>
            <p className="text-xs sm:text-sm text-[#675e79] mt-1">
              Instructions for manuscript formatting, submission requirements, APA 7th referencing, and review protocols.
            </p>
          </div>

          <button
            onClick={() => onNavigate('submit')}
            className="rounded-md bg-[#e86b31] hover:bg-[#c04f17] px-4 py-2 text-xs font-bold text-white transition shrink-0 shadow-xs"
          >
            Submit Manuscript Online
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-[#E2E6EE] gap-1 font-semibold text-xs">
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
              className={`px-4 py-2.5 border-b-2 transition ${
                guidelinesTab === tab.id
                  ? 'border-[#c04f17] text-[#c04f17] font-bold bg-[#b3bcf2]/20 rounded-t'
                  : 'border-transparent text-[#675e79] hover:text-[#2a369c]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panes */}
        <div className="rounded-xl border border-[#E2E6EE] bg-white p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-[#242A38] leading-relaxed">
          {guidelinesTab === 'prepare' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#2a369c] font-d3-heading">
                Manuscript Preparation Specifications
              </h3>
              <p>
                Manuscripts submitted to JORMASS must represent original research contributions that have not been published previously and are not under consideration by another journal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] space-y-1">
                  <p className="font-bold text-[#2a369c]">File Format & Length</p>
                  <p className="text-xs text-[#675e79]">Microsoft Word (.doc, .docx), 5,000–8,000 words including tables and references.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] space-y-1">
                  <p className="font-bold text-[#2a369c]">Referencing Standard</p>
                  <p className="text-xs text-[#675e79]">APA 7th Edition style strictly required for all in-text citations and reference list.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] space-y-1">
                  <p className="font-bold text-[#2a369c]">Abstract & Keywords</p>
                  <p className="text-xs text-[#675e79]">Structured abstract between 150–250 words accompanied by 4–6 relevant keywords.</p>
                </div>
              </div>
            </div>
          )}

          {guidelinesTab === 'checklist' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#2a369c] font-d3-heading">
                Pre-Submission Author Checklist
              </h3>
              <ul className="space-y-2.5 text-xs text-[#242A38]">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#c04f17] shrink-0 mt-0.5" />
                  <span>The manuscript is original, prepared in clear English, and formatted in double line spacing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#c04f17] shrink-0 mt-0.5" />
                  <span>A separate title page with all author names, affiliations, emails, and ORCID IDs is provided.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#c04f17] shrink-0 mt-0.5" />
                  <span>The main manuscript text is completely anonymized for double-blind peer review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#c04f17] shrink-0 mt-0.5" />
                  <span>All tables and figures are numbered sequentially with self-contained descriptive titles.</span>
                </li>
              </ul>
            </div>
          )}

          {guidelinesTab === 'review' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#2a369c] font-d3-heading">
                Double-Blind Peer Review Protocols
              </h3>
              <p>
                Every submission is initially assessed by the Managing Editor for scope and formatting. Manuscripts meeting minimum requirements are assigned to two independent reviewers who evaluate empirical rigor, theoretical soundness, and clarity.
              </p>
              <div className="p-4 rounded-lg bg-[#b3bcf2]/30 border border-[#b3bcf2] text-[#2a369c] font-semibold text-xs">
                Typical review turnaround duration is 4–6 weeks from initial submission to editorial decision.
              </div>
            </div>
          )}

          {guidelinesTab === 'fees' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#2a369c] font-d3-heading">
                Publication Fees & Author Processing Charges (APC)
              </h3>
              <p>
                JORMASS maintains a transparent fee structure. Assessment fees cover double-blind peer review management, while page charges support open-access digital archiving and DOI registration.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {(fees || []).map((f) => (
                  <div key={f.id} className="p-4 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-[#2a369c]">{f.title}</span>
                      <span className="text-[#c04f17] font-mono">{f.amount}</span>
                    </div>
                    <p className="text-xs text-[#675e79]">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {guidelinesTab === 'ethics' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#2a369c] font-d3-heading">
                Ethics & Plagiarism Policy
              </h3>
              <p>
                JORMASS adheres strictly to the Committee on Publication Ethics (COPE) core practices. Plagiarism and duplicate publication are strictly prohibited. All submissions are screened using Turnitin with a maximum similarity index threshold of 15%.
              </p>
            </div>
          )}

          {guidelinesTab === 'open-access' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#2a369c] font-d3-heading">
                Open Access & Licensing Statement
              </h3>
              <p>
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d3-body">
        <div className="border-b border-[#E2E6EE] pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2a369c] font-d3-heading">
            Academic Events & Conferences
          </h1>
          <p className="text-xs sm:text-sm text-[#675e79] mt-1">
            Faculty symposia, research workshops, call-for-papers deadlines, and doctoral roundtables.
          </p>
        </div>

        <div className="space-y-4">
          {(events || []).map((evt) => (
            <div
              key={evt.id}
              className="rounded-xl border border-[#E2E6EE] bg-white p-6 shadow-xs flex flex-col md:flex-row justify-between gap-6 hover:border-[#c04f17] transition"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded bg-[#2a369c] text-white font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider font-d3-meta">
                    {evt.category}
                  </span>
                  <span className="text-[#675e79] font-d3-meta font-medium">
                    {evt.date} • {evt.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#2a369c] font-d3-heading">
                  {evt.title}
                </h3>
                <p className="text-xs text-[#675e79] max-w-2xl leading-relaxed">
                  {evt.description}
                </p>
                <p className="text-xs font-semibold text-[#2a369c] pt-1">
                  Location: <span className="text-[#675e79] font-normal">{evt.location}</span>
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0">
                <span className="rounded bg-[#b3bcf2] text-[#2a369c] font-bold text-xs px-3 py-1">
                  Registration Open
                </span>
                <button
                  onClick={() => alert(`Registration details for ${evt.title} will be confirmed.`)}
                  className="rounded-md bg-[#e86b31] hover:bg-[#c04f17] px-4 py-1.5 text-xs font-bold text-white transition shadow-xs"
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d3-body">
        <div className="border-b border-[#E2E6EE] pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2a369c] font-d3-heading">
            Indexing & Abstracting Services
          </h1>
          <p className="text-xs sm:text-sm text-[#675e79] mt-1">
            Global discovery databases and bibliographic indexes ensuring maximum scholarly impact for JORMASS authors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(indexing || []).map((idxItem, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#E2E6EE] bg-white p-5 space-y-3 shadow-xs hover:border-[#c04f17] transition"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-base font-bold text-[#2a369c] font-d3-heading">
                  {idxItem.name}
                </h3>
                <VerifiedBadge status={idxItem.status} />
              </div>
              <p className="text-xs text-[#675e79] leading-relaxed">
                {idxItem.description}
              </p>
              {idxItem.url && (
                <a
                  href={idxItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="pt-2 text-xs font-semibold text-[#c04f17] hover:underline inline-flex items-center gap-1 font-d3-meta"
                >
                  <span>Verification Portal</span>
                  <ExternalLink className="h-3 w-3 text-[#e86b31]" />
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d3-body">
      <div className="border-b border-[#E2E6EE] pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2a369c] font-d3-heading">
          About JORMASS & Institutional Scope
        </h1>
        <p className="text-xs sm:text-sm text-[#675e79] mt-1">
          {settings.faculty}, {settings.institution}, Umudike, Nigeria
        </p>
      </div>

      <div className="rounded-xl border border-[#E2E6EE] bg-white p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-[#242A38] leading-relaxed">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#2a369c] font-d3-heading mb-2">
            Journal Mandate & Editorial Philosophy
          </h3>
          <p>
            The Journal of Research in Management and Social Sciences (JORMASS) is the flagship peer-reviewed academic publication of the College of Management Sciences at Michael Okpara University of Agriculture, Umudike. JORMASS publishes rigorous empirical and theoretical contributions advancing knowledge in management sciences, public administration, financial economics, agribusiness, and social sciences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] space-y-1">
            <h4 className="font-bold text-[#2a369c]">Management & Business Sciences</h4>
            <p className="text-xs text-[#675e79]">
              Corporate Governance, Accounting & Auditing Standards, Human Capital Strategy, Marketing Analytics, and Supply Chain Management.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] space-y-1">
            <h4 className="font-bold text-[#2a369c]">Economics, Finance & Social Sciences</h4>
            <p className="text-xs text-[#675e79]">
              Development Economics, Agribusiness Value Chains, Monetary Policy, Public Sector Administration, and Social Policy.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E2E6EE]/60 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#675e79] font-d3-meta">
            ISSN: {settings.issnPrint} (Print) • {settings.issnOnline} (Online)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('author-guidelines')}
              className="rounded-md border border-[#E2E6EE] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#2a369c] hover:bg-[#F4F6FB]"
            >
              Author Guidelines
            </button>
            <button
              onClick={() => onNavigate('submit')}
              className="rounded-md bg-[#2a369c] hover:bg-[#1f2979] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs"
            >
              Submit Manuscript
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
