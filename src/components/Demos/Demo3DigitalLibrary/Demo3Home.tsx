import React, { useState, useMemo } from 'react';
import {
  JournalSettings,
  Volume,
  Issue,
  Article,
  AcademicEvent,
  Announcement,
  EditorialBoardMember,
  IndexingService,
  JournalPage,
} from '../../../types';
import {
  Search,
  BookOpen,
  Download,
  Quote,
  Filter,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FileText,
  Clock,
  Layers,
  Award,
  Users,
  Calendar,
  X,
  Share2,
  Eye,
  SlidersHorizontal,
  GraduationCap,
  Scale,
  Building2,
  DollarSign,
  Briefcase,
  Globe,
} from 'lucide-react';
import { VerifiedBadge } from '../../Common/VerifiedBadge';

interface Demo3HomeProps {
  settings: JournalSettings;
  volumes: Volume[];
  issues: Issue[];
  articles: Article[];
  events: AcademicEvent[];
  announcements: Announcement[];
  boardMembers: EditorialBoardMember[];
  indexing: IndexingService[];
  onNavigate: (page: JournalPage) => void;
  onSelectArticle: (article: Article) => void;
  onOpenCitation: (article: Article) => void;
  onOpenPdf: (article: Article) => void;
  onOpenOjs: () => void;
}

export const Demo3Home: React.FC<Demo3HomeProps> = ({
  settings,
  volumes = [],
  issues = [],
  articles = [],
  events = [],
  announcements = [],
  boardMembers = [],
  indexing = [],
  onNavigate,
  onSelectArticle,
  onOpenCitation,
  onOpenPdf,
  onOpenOjs,
}) => {
  // Search and Scope State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<'all' | 'title' | 'author' | 'doi' | 'keywords'>('all');

  // Filter Facet States
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [openAccessOnly, setOpenAccessOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'title' | 'author'>('newest');

  // Available Disciplines / Subjects
  const disciplines = useMemo(() => {
    const set = new Set<string>();
    (articles || []).forEach((a) => {
      if (a?.category) set.add(a.category);
    });
    return Array.from(set);
  }, [articles]);

  // Available Publication Years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set((volumes || []).map((v) => v.year.toString()))).sort().reverse();
    return years;
  }, [volumes]);

  // Filtered Article Pipeline
  const filteredArticles = useMemo(() => {
    return (articles || []).filter((art) => {
      if (!art) return false;
      // 1. Search Query Matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (searchField === 'all') {
          const matchTitle = art.title?.toLowerCase().includes(q);
          const matchAbstract = art.abstract?.toLowerCase().includes(q);
          const matchAuthors = art.authors?.some((a) => a?.name?.toLowerCase().includes(q) || a?.affiliation?.toLowerCase().includes(q));
          const matchDoi = art.doi?.toLowerCase().includes(q);
          const matchKeywords = art.keywords?.some((k) => k?.toLowerCase().includes(q));
          if (!(matchTitle || matchAbstract || matchAuthors || matchDoi || matchKeywords)) return false;
        } else if (searchField === 'title') {
          if (!art.title?.toLowerCase().includes(q)) return false;
        } else if (searchField === 'author') {
          if (!art.authors?.some((a) => a?.name?.toLowerCase().includes(q))) return false;
        } else if (searchField === 'doi') {
          if (!art.doi?.toLowerCase().includes(q)) return false;
        } else if (searchField === 'keywords') {
          if (!art.keywords?.some((k) => k?.toLowerCase().includes(q))) return false;
        }
      }

      // 2. Discipline Filter
      if (selectedDiscipline !== 'all' && art.category !== selectedDiscipline) {
        return false;
      }

      // 3. Year Filter
      if (selectedYear !== 'all') {
        const artVol = (volumes || []).find((v) => v.id === art.volumeId);
        if (artVol && artVol.year.toString() !== selectedYear) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.publishedDate || '').localeCompare(a.publishedDate || '');
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'author') return (a.authors?.[0]?.name || '').localeCompare(b.authors?.[0]?.name || '');
      return 0;
    });
  }, [articles, searchQuery, searchField, selectedDiscipline, selectedYear, sortBy, volumes]);

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

  return (
    <div className="space-y-8 pb-16 font-d3-body">
      {/* 1. SEARCH BANNER (Royal Cobalt #2a369c with Periwinkle #b3bcf2 and Tangerine #e86b31) */}
      <section className="bg-gradient-to-r from-[#2a369c] via-[#1f2979] to-[#2a369c] text-white py-10 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="mx-auto max-w-5xl space-y-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-3">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#b3bcf2] font-d3-meta">
                MOUAU Scholarly Publishing Platform
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-d3-heading">
                Explore Research in Management & Social Sciences
              </h2>
            </div>
            <span className="text-xs text-[#b3bcf2]/90 font-d3-meta">
              Search across {articles.length} peer-reviewed articles & {volumes.length} published volumes
            </span>
          </div>

          {/* Search Box Card */}
          <div className="bg-white p-2.5 sm:p-3.5 rounded-xl shadow-xl border border-white/20 text-[#242A38]">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Field Scope Selector */}
              <div className="relative md:w-48 shrink-0">
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value as any)}
                  className="w-full h-11 rounded-lg bg-[#F4F6FB] border border-[#E2E6EE] px-3 text-xs font-semibold text-[#2a369c] focus:outline-none focus:ring-2 focus:ring-[#2a369c] cursor-pointer"
                >
                  <option value="all">Everywhere</option>
                  <option value="title">Article Title</option>
                  <option value="author">Author Name</option>
                  <option value="keywords">Keywords</option>
                  <option value="doi">DOI / ID</option>
                </select>
              </div>

              {/* Main Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#e86b31]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter keywords, author name, title, or DOI..."
                  className="w-full h-11 pl-10 pr-10 text-xs sm:text-sm bg-white rounded-lg border border-[#E2E6EE] text-[#242A38] placeholder:text-[#675e79]/70 focus:outline-none focus:ring-2 focus:ring-[#2a369c]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-[#675e79] hover:text-[#c04f17]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Search Action Button (Vibrant Tangerine #e86b31 to Rust #c04f17) */}
              <button
                onClick={() => {}}
                className="h-11 px-6 rounded-lg bg-[#e86b31] hover:bg-[#c04f17] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm shrink-0"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>

            {/* Quick Topic Pills / Popular Filters */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#E2E6EE] mt-2.5 text-xs">
              <span className="text-[#675e79] font-medium text-[11px] mr-1">Popular Topics:</span>
              {['Corporate Governance', 'Public Policy', 'Taxation & Fiscal Policy', 'Agribusiness', 'Banking & Finance'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSearchQuery(topic)}
                  className="rounded-md bg-[#F4F6FB] hover:bg-[#b3bcf2]/40 text-[#2a369c] border border-[#E2E6EE] px-2.5 py-1 text-[11px] font-medium transition"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURRENT ISSUE SPOTLIGHT BAR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#b3bcf2]/25 via-[#F4F6FB] to-[#b3bcf2]/15 border border-[#b3bcf2] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#2a369c] text-white font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider font-d3-meta">
                Latest Release
              </span>
              <span className="text-xs font-bold text-[#c04f17] font-d3-meta">
                Volume {currentVolume.volumeNumber}, Issue {currentIssue.issueNumber} ({currentVolume.year})
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#2a369c] font-d3-heading">
              {currentIssue.title}
            </h3>
            <p className="text-xs text-[#675e79]">
              Published on {currentIssue.publicationDate} • Open Access under CC BY 4.0
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('current-issue')}
              className="rounded-md bg-[#2a369c] hover:bg-[#1f2979] text-white font-bold px-3.5 py-2 text-xs transition inline-flex items-center gap-1.5 shadow-xs"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#b3bcf2]" />
              <span>Browse This Issue</span>
            </button>
            <button
              onClick={() => onNavigate('archive')}
              className="rounded-md border border-[#E2E6EE] bg-white hover:bg-[#F4F6FB] text-[#2a369c] font-semibold px-3 py-2 text-xs transition inline-flex items-center gap-1"
            >
              <span>All Volumes</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. MAIN 2-COLUMN DISCOVERY CONTAINER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN (4 Cols): STRUCTURED FACET FILTER PANEL       */}
          {/* ========================================================= */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E2E6EE] pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#2a369c]" />
                  <h3 className="text-sm font-bold text-[#2a369c] uppercase tracking-wider font-d3-heading">
                    Filter Research
                  </h3>
                </div>
                {(selectedDiscipline !== 'all' || selectedYear !== 'all' || openAccessOnly || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedDiscipline('all');
                      setSelectedYear('all');
                      setOpenAccessOnly(false);
                      setSearchQuery('');
                    }}
                    className="text-xs text-[#c04f17] hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Subject Discipline Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2a369c] uppercase tracking-wider font-d3-meta block">
                  Subject Discipline
                </label>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedDiscipline('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                      selectedDiscipline === 'all'
                        ? 'bg-[#b3bcf2]/40 text-[#2a369c] font-bold border border-[#b3bcf2]'
                        : 'text-[#675e79] hover:bg-[#F4F6FB]'
                    }`}
                  >
                    <span>All Disciplines</span>
                    <span className="text-[11px] font-d3-meta opacity-70">{articles.length}</span>
                  </button>
                  {disciplines.map((disc) => {
                    const count = articles.filter((a) => a.category === disc).length;
                    const isSelected = selectedDiscipline === disc;
                    return (
                      <button
                        key={disc}
                        onClick={() => setSelectedDiscipline(disc)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                          isSelected
                            ? 'bg-[#b3bcf2]/40 text-[#2a369c] font-bold border border-[#b3bcf2]'
                            : 'text-[#675e79] hover:bg-[#F4F6FB]'
                        }`}
                      >
                        <span className="truncate pr-2">{disc}</span>
                        <span className="text-[11px] font-d3-meta opacity-70 shrink-0">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Publication Year Filter */}
              <div className="space-y-2 pt-3 border-t border-[#E2E6EE]">
                <label className="text-xs font-bold text-[#2a369c] uppercase tracking-wider font-d3-meta block">
                  Publication Year
                </label>
                <div className="flex flex-wrap gap-1.5 text-xs font-d3-meta">
                  <button
                    onClick={() => setSelectedYear('all')}
                    className={`px-2.5 py-1 rounded text-xs transition ${
                      selectedYear === 'all'
                        ? 'bg-[#2a369c] text-white font-bold'
                        : 'bg-[#F4F6FB] border border-[#E2E6EE] text-[#675e79] hover:bg-[#E2E6EE]'
                    }`}
                  >
                    All Years
                  </button>
                  {availableYears.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className={`px-2.5 py-1 rounded text-xs transition ${
                        selectedYear === yr
                          ? 'bg-[#2a369c] text-white font-bold'
                          : 'bg-[#F4F6FB] border border-[#E2E6EE] text-[#675e79] hover:bg-[#E2E6EE]'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Access Type Filter */}
              <div className="space-y-2 pt-3 border-t border-[#E2E6EE]">
                <label className="text-xs font-bold text-[#2a369c] uppercase tracking-wider font-d3-meta block">
                  Access Type
                </label>
                <label className="flex items-center gap-2 text-xs text-[#242A38] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openAccessOnly}
                    onChange={(e) => setOpenAccessOnly(e.target.checked)}
                    className="rounded border-[#E2E6EE] text-[#2a369c] focus:ring-[#2a369c]"
                  />
                  <span className="font-medium">Open Access Articles Only</span>
                </label>
              </div>
            </div>

            {/* Quick Journal Information Widget */}
            <div className="rounded-xl border border-[#E2E6EE] bg-white p-5 shadow-xs space-y-3 font-d3-body">
              <h4 className="text-xs font-bold text-[#2a369c] uppercase tracking-wider font-d3-heading border-b border-[#E2E6EE] pb-2">
                Journal Metrics & Indexing
              </h4>
              <div className="space-y-2 text-xs text-[#242A38]">
                <div className="flex justify-between py-1 border-b border-[#E2E6EE]/50">
                  <span className="text-[#675e79]">Review Duration</span>
                  <span className="font-bold text-[#2a369c] font-d3-meta">4–6 Weeks</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EE]/50">
                  <span className="text-[#675e79]">Acceptance Rate</span>
                  <span className="font-bold text-[#2a369c] font-d3-meta">~38%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EE]/50">
                  <span className="text-[#675e79]">Publication Frequency</span>
                  <span className="font-bold text-[#2a369c] font-d3-meta">Bi-Annual</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#675e79]">Plagiarism Standard</span>
                  <span className="font-bold text-[#c04f17] font-d3-meta">&lt; 15% Similarity</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* RIGHT COLUMN (8 Cols): RESEARCH ARTICLE STREAM            */}
          {/* ========================================================= */}
          <main className="lg:col-span-8 space-y-4">
            {/* Stream Header & Sorter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E6EE] pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#2a369c] font-d3-heading">
                  Research Articles ({filteredArticles.length})
                </h3>
                <p className="text-xs text-[#675e79]">
                  Peer-reviewed scholarly papers published in JORMASS
                </p>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2 text-xs font-d3-meta">
                <span className="text-[#675e79]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-md bg-white border border-[#E2E6EE] px-2.5 py-1 text-xs text-[#2a369c] font-semibold focus:outline-none focus:ring-1 focus:ring-[#2a369c]"
                >
                  <option value="newest">Newest First</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="author">First Author</option>
                </select>
              </div>
            </div>

            {/* Articles Stream List */}
            {filteredArticles.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#E2E6EE] bg-white p-12 text-center space-y-3">
                <Search className="h-8 w-8 text-[#675e79] mx-auto opacity-50" />
                <p className="text-sm font-bold text-[#2a369c]">No articles match your search or filter criteria.</p>
                <p className="text-xs text-[#675e79]">Try clearing some filters or searching with broader keywords.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDiscipline('all');
                    setSelectedYear('all');
                  }}
                  className="rounded-md bg-[#2a369c] text-white px-4 py-2 text-xs font-bold transition mt-2"
                >
                  Reset Discovery Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article) => {
                  const artVol = volumes.find((v) => v.id === article.volumeId);
                  const artIss = issues.find((i) => i.id === article.issueId);

                  return (
                    <article
                      key={article.id}
                      className="rounded-xl border border-[#E2E6EE] bg-white p-5 sm:p-6 shadow-xs hover:border-[#2a369c] transition space-y-3"
                    >
                      {/* Top Metadata Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-[#b3bcf2] text-[#2a369c] font-bold px-2 py-0.5 text-[10px] uppercase font-d3-meta">
                            Open Access
                          </span>
                          <span className="text-[11px] font-semibold text-[#c04f17] font-d3-meta">
                            {article.category}
                          </span>
                        </div>
                        <span className="text-xs text-[#675e79] font-d3-meta">
                          Vol. {artVol?.volumeNumber || '11'}, Issue {artIss?.issueNumber || '2'} ({artVol?.year || '2025'}) • pp. {article.pageStart}–{article.pageEnd}
                        </span>
                      </div>

                      {/* Article Title */}
                      <h4
                        onClick={() => onSelectArticle(article)}
                        className="cursor-pointer text-base sm:text-lg font-bold text-[#2a369c] hover:text-[#c04f17] transition leading-snug font-d3-heading"
                      >
                        {article.title}
                      </h4>

                      {/* Authors */}
                      <div className="text-xs text-[#675e79] flex flex-wrap gap-1 font-medium">
                        <span>By:</span>
                        {article.authors.map((auth, aIdx) => (
                          <span key={aIdx} className="text-[#242A38] font-semibold">
                            {auth.name}
                            {aIdx < article.authors.length - 1 && <span className="text-[#675e79]">,</span>}
                          </span>
                        ))}
                      </div>

                      {/* Snippet / Abstract Preview */}
                      <p className="text-xs sm:text-sm text-[#675e79] line-clamp-2 leading-relaxed">
                        {article.abstract}
                      </p>

                      {/* DOI & License Strip */}
                      <div className="pt-2 border-t border-[#E2E6EE]/60 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#675e79] font-d3-meta">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#675e79]">DOI:</span>
                          <a
                            href={`https://doi.org/${article.doi || '10.5281/jormass.2025.11'}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#c04f17] hover:underline font-medium"
                          >
                            https://doi.org/{article.doi || '10.5281/jormass.2025.11'}
                          </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectArticle(article)}
                            className="text-xs text-[#2a369c] hover:underline font-bold"
                          >
                            View Abstract
                          </button>
                          <button
                            onClick={() => onOpenCitation(article)}
                            className="rounded-md border border-[#E2E6EE] bg-white hover:bg-[#F4F6FB] px-2.5 py-1 text-xs font-semibold text-[#675e79] transition inline-flex items-center gap-1"
                          >
                            <Quote className="h-3 w-3 text-[#e86b31]" />
                            <span>Cite</span>
                          </button>
                          <button
                            onClick={() => onOpenPdf(article)}
                            className="rounded-md bg-[#2a369c] hover:bg-[#1f2979] text-white px-3 py-1 text-xs font-bold transition inline-flex items-center gap-1 shadow-xs"
                          >
                            <Download className="h-3 w-3 text-[#b3bcf2]" />
                            <span>PDF</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* 4. DISCIPLINARY EXPLORATION BENTO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="border-t border-[#E2E6EE] pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-extrabold text-[#2a369c] font-d3-heading">
                Explore JORMASS Subject Disciplines
              </h3>
              <p className="text-xs text-[#675e79]">
                Structured empirical research taxonomy across College of Management Sciences
              </p>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="text-xs font-bold text-[#c04f17] hover:underline inline-flex items-center gap-1 font-d3-meta"
            >
              <span>View Aims & Scope</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Management & Governance',
                icon: <Briefcase className="h-5 w-5 text-[#2a369c]" />,
                desc: 'Corporate strategy, organizational behavior, business ethics, and operations.',
                count: '14 Articles',
              },
              {
                title: 'Financial Economics & Banking',
                icon: <DollarSign className="h-5 w-5 text-[#c04f17]" />,
                desc: 'Capital markets, monetary policy, auditing standards, and banking stability.',
                count: '18 Articles',
              },
              {
                title: 'Public Administration & Policy',
                icon: <Scale className="h-5 w-5 text-[#2a369c]" />,
                desc: 'Public sector governance, civil service reforms, and social policies.',
                count: '9 Articles',
              },
              {
                title: 'Agribusiness & Rural Economy',
                icon: <Building2 className="h-5 w-5 text-[#e86b31]" />,
                desc: 'Agricultural value chains, commodity markets, and rural development.',
                count: '11 Articles',
              },
            ].map((discItem, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedDiscipline(discItem.title.split(' ')[0]);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="rounded-xl border border-[#E2E6EE] bg-white p-5 space-y-2 shadow-xs hover:border-[#2a369c] hover:shadow-sm transition cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-[#F4F6FB] w-fit group-hover:bg-[#b3bcf2]/40 transition">
                  {discItem.icon}
                </div>
                <h4 className="text-sm font-bold text-[#2a369c] group-hover:text-[#c04f17] transition font-d3-heading">
                  {discItem.title}
                </h4>
                <p className="text-xs text-[#675e79] leading-relaxed">
                  {discItem.desc}
                </p>
                <span className="text-[11px] font-bold text-[#c04f17] font-d3-meta block pt-1">
                  {discItem.count} →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
