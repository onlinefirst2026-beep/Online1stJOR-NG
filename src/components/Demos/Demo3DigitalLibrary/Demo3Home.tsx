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
      if (sortBy === 'newest') return (b.publicationDate || '').localeCompare(a.publicationDate || '');
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
    <div className="space-y-8 pb-16 font-sans">
      {/* 1. HERO / RESEARCH SEARCH (Deep Navy #20255C to Royal Purple #6B3F74 Gradient with Warm Gold #FFC84D Accent) */}
      <section
        style={{
          background: 'linear-gradient(115deg, #20255C 0%, #35245D 55%, #6B3F74 100%)',
        }}
        className="text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md"
      >
        <div className="mx-auto max-w-5xl space-y-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFC84D]">
                MOUAU Scholarly Discovery Platform
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                Explore Research in Management & Social Sciences
              </h2>
            </div>
            <span className="text-xs text-[#E2E5F3] font-mono">
              Search across {articles.length} peer-reviewed articles & {volumes.length} published volumes
            </span>
          </div>

          {/* Search Box Card */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/20 text-[#20255C]">
            <div className="flex flex-col md:flex-row gap-2.5">
              {/* Field Scope Selector */}
              <div className="relative md:w-48 shrink-0">
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value as any)}
                  className="w-full h-12 rounded-xl bg-[#E2E5F3]/50 border border-[#E2E5F3] px-3.5 text-xs font-bold text-[#20255C] focus:outline-none focus:ring-2 focus:ring-[#6B3F74] cursor-pointer"
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
                <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-[#6B3F74]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter keywords, author name, title, or DOI..."
                  className="w-full h-12 pl-11 pr-10 text-xs sm:text-sm bg-white rounded-xl border border-[#E2E6EE] text-[#20255C] placeholder:text-[#50577A]/70 focus:outline-none focus:ring-2 focus:ring-[#6B3F74]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-3.5 text-[#50577A] hover:text-[#B33600] cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Search Action Button (Warm Gold #FFC84D with Deep Navy Text) */}
              <button
                onClick={() => {}}
                className="h-12 px-7 rounded-xl bg-[#FFC84D] hover:bg-[#e6b33d] text-[#20255C] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shrink-0 cursor-pointer"
              >
                <Search className="h-4 w-4 text-[#20255C]" />
                <span>Search</span>
              </button>
            </div>

            {/* Quick Topic Pills / Popular Filters */}
            <div className="flex flex-wrap items-center gap-2 pt-3.5 border-t border-[#E2E6EE] mt-3 text-xs">
              <span className="text-[#50577A] font-semibold text-xs mr-1">Popular Topics:</span>
              {['Corporate Governance', 'Public Policy', 'Taxation & Fiscal Policy', 'Agribusiness', 'Banking & Finance'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSearchQuery(topic)}
                  className="rounded-lg bg-[#E2E5F3]/60 hover:bg-[#6B3F74] hover:text-white text-[#20255C] border border-[#E2E5F3] px-3 py-1.5 text-xs font-semibold transition cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURRENT ISSUE SPOTLIGHT (Pale Lavender #E2E5F3 Background + Purple #6B3F74 Badge + Navy #20255C Title) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E2E5F3]/60 border border-[#E2E5F3] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="rounded-md bg-[#6B3F74] text-white font-extrabold text-[10px] px-2.5 py-0.5 uppercase tracking-wider shadow-xs">
                Latest Release
              </span>
              <span className="text-xs font-bold text-[#B33600]">
                Volume {currentVolume.volumeNumber}, Issue {currentIssue.issueNumber} ({currentVolume.year})
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#20255C] font-heading">
              {currentIssue.title}
            </h3>
            <p className="text-xs text-[#50577A]">
              Published on {currentIssue.publicationDate} • Open Access under CC BY 4.0
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('current-issue')}
              className="rounded-xl bg-[#6B3F74] hover:bg-[#532e5b] text-white font-bold px-4 py-2.5 text-xs transition inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-[#FFC84D]" />
              <span>Browse This Issue</span>
            </button>
            <button
              onClick={() => onNavigate('archive')}
              className="rounded-xl border border-[#20255C]/20 bg-white hover:bg-[#E2E5F3] text-[#20255C] font-bold px-4 py-2.5 text-xs transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>All Volumes</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#6B3F74]" />
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
            <div className="rounded-2xl border border-[#E2E6EE] bg-white p-5 sm:p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E2E6EE] pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#6B3F74]" />
                  <h3 className="text-sm font-extrabold text-[#20255C] uppercase tracking-wider font-heading">
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
                    className="text-xs text-[#B33600] hover:underline font-bold cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Subject Discipline Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#20255C] uppercase tracking-wider block">
                  Subject Discipline
                </label>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setSelectedDiscipline('all')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition cursor-pointer ${
                      selectedDiscipline === 'all'
                        ? 'bg-[#6B3F74] text-white font-bold shadow-xs'
                        : 'text-[#50577A] hover:bg-[#E2E5F3]'
                    }`}
                  >
                    <span>All Disciplines</span>
                    <span className={`text-[11px] font-mono ${selectedDiscipline === 'all' ? 'text-[#FFC84D]' : 'opacity-70'}`}>
                      {articles.length}
                    </span>
                  </button>
                  {disciplines.map((disc) => {
                    const count = articles.filter((a) => a.category === disc).length;
                    const isSelected = selectedDiscipline === disc;
                    return (
                      <button
                        key={disc}
                        onClick={() => setSelectedDiscipline(disc)}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#6B3F74] text-white font-bold shadow-xs'
                            : 'text-[#50577A] hover:bg-[#E2E5F3]'
                        }`}
                      >
                        <span className="truncate pr-2">{disc}</span>
                        <span className={`text-[11px] font-mono shrink-0 ${isSelected ? 'text-[#FFC84D]' : 'opacity-70'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Publication Year Filter */}
              <div className="space-y-2 pt-3.5 border-t border-[#E2E6EE]">
                <label className="text-xs font-bold text-[#20255C] uppercase tracking-wider block">
                  Publication Year
                </label>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <button
                    onClick={() => setSelectedYear('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                      selectedYear === 'all'
                        ? 'bg-[#20255C] text-white font-bold'
                        : 'bg-[#E2E5F3]/60 border border-[#E2E6EE] text-[#50577A] hover:bg-[#E2E5F3]'
                    }`}
                  >
                    All Years
                  </button>
                  {availableYears.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                        selectedYear === yr
                          ? 'bg-[#20255C] text-white font-bold'
                          : 'bg-[#E2E5F3]/60 border border-[#E2E6EE] text-[#50577A] hover:bg-[#E2E5F3]'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Access Type Filter */}
              <div className="space-y-2 pt-3.5 border-t border-[#E2E6EE]">
                <label className="text-xs font-bold text-[#20255C] uppercase tracking-wider block">
                  Access Type
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#20255C] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openAccessOnly}
                    onChange={(e) => setOpenAccessOnly(e.target.checked)}
                    className="rounded border-[#E2E6EE] text-[#6B3F74] focus:ring-[#6B3F74] h-4 w-4"
                  />
                  <span className="font-semibold">Open Access Articles Only (CC BY 4.0)</span>
                </label>
              </div>
            </div>

            {/* Quick Journal Information Widget */}
            <div className="rounded-2xl border border-[#E2E6EE] bg-white p-5 sm:p-6 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-[#20255C] uppercase tracking-wider font-heading border-b border-[#E2E6EE] pb-2">
                Journal Metrics & Standards
              </h4>
              <div className="space-y-2.5 text-xs text-[#20255C]">
                <div className="flex justify-between py-1 border-b border-[#E2E6EE]/50">
                  <span className="text-[#50577A]">Review Duration</span>
                  <span className="font-bold text-[#20255C]">4–6 Weeks</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EE]/50">
                  <span className="text-[#50577A]">Acceptance Rate</span>
                  <span className="font-bold text-[#20255C]">~38%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EE]/50">
                  <span className="text-[#50577A]">Publication Frequency</span>
                  <span className="font-bold text-[#20255C]">Bi-Annual</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#50577A]">Plagiarism Standard</span>
                  <span className="font-bold text-[#B33600]">&lt; 15% Similarity</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* RIGHT COLUMN (8 Cols): RESEARCH ARTICLE STREAM            */}
          {/* ========================================================= */}
          <main className="lg:col-span-8 space-y-4">
            {/* Stream Header & Sorter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E6EE] pb-3.5">
              <div>
                <h3 className="text-lg font-extrabold text-[#20255C] font-heading">
                  Research Articles ({filteredArticles.length})
                </h3>
                <p className="text-xs text-[#50577A]">
                  Peer-reviewed scholarly papers published in JORMASS
                </p>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#50577A] font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg bg-white border border-[#E2E6EE] px-3 py-1.5 text-xs text-[#20255C] font-bold focus:outline-none focus:ring-1 focus:ring-[#6B3F74]"
                >
                  <option value="newest">Newest First</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="author">First Author</option>
                </select>
              </div>
            </div>

            {/* Articles Stream List */}
            {filteredArticles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#E2E6EE] bg-white p-12 text-center space-y-3">
                <Search className="h-8 w-8 text-[#50577A] mx-auto opacity-50" />
                <p className="text-sm font-bold text-[#20255C]">No articles match your search or filter criteria.</p>
                <p className="text-xs text-[#50577A]">Try clearing some filters or searching with broader keywords.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDiscipline('all');
                    setSelectedYear('all');
                  }}
                  className="rounded-xl bg-[#20255C] text-white px-5 py-2.5 text-xs font-bold transition mt-2 cursor-pointer"
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
                      className="rounded-2xl border border-[#E2E6EE] bg-white p-5 sm:p-6 shadow-xs hover:border-[#6B3F74] transition space-y-3.5"
                    >
                      {/* Top Metadata Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-[#FFC84D] text-[#20255C] font-extrabold px-2.5 py-0.5 text-[10px] uppercase">
                            Open Access
                          </span>
                          <span className="rounded-md bg-[#E2E5F3] text-[#6B3F74] font-bold px-2.5 py-0.5 text-[11px]">
                            {article.category}
                          </span>
                        </div>
                        <span className="text-xs text-[#50577A] font-mono">
                          Vol. {artVol?.volumeNumber || '11'}, Issue {artIss?.issueNumber || '2'} ({artVol?.year || '2025'}) • pp. {article.pageStart}–{article.pageEnd}
                        </span>
                      </div>

                      {/* Article Title */}
                      <h4
                        onClick={() => onSelectArticle(article)}
                        className="cursor-pointer text-base sm:text-lg font-bold text-[#20255C] hover:text-[#B33600] transition leading-snug font-heading"
                      >
                        {article.title}
                      </h4>

                      {/* Authors */}
                      <div className="text-xs text-[#50577A] flex flex-wrap gap-1 font-medium">
                        <span>By:</span>
                        {article.authors.map((auth, aIdx) => (
                          <span key={aIdx} className="text-[#20255C] font-bold">
                            {auth.name}
                            {aIdx < article.authors.length - 1 && <span className="text-[#50577A]">,</span>}
                          </span>
                        ))}
                      </div>

                      {/* Snippet / Abstract Preview */}
                      <p className="text-xs sm:text-sm text-[#50577A] line-clamp-2 leading-relaxed">
                        {article.abstract}
                      </p>

                      {/* DOI & License Strip */}
                      <div className="pt-3 border-t border-[#E2E6EE]/70 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#50577A]">
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="text-[#50577A]">DOI:</span>
                          <a
                            href={`https://doi.org/${article.doi || '10.5281/jormass.2025.11'}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#B33600] hover:underline font-bold"
                          >
                            https://doi.org/{article.doi || '10.5281/jormass.2025.11'}
                          </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectArticle(article)}
                            className="text-xs text-[#20255C] hover:text-[#6B3F74] font-bold px-2 py-1 cursor-pointer"
                          >
                            View Abstract
                          </button>
                          <button
                            onClick={() => onOpenCitation(article)}
                            className="rounded-lg border border-[#E2E6EE] bg-white hover:bg-[#E2E5F3] px-3 py-1.5 text-xs font-semibold text-[#50577A] transition inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Quote className="h-3.5 w-3.5 text-[#6B3F74]" />
                            <span>Cite</span>
                          </button>
                          <button
                            onClick={() => onOpenPdf(article)}
                            className="rounded-lg bg-[#6B3F74] hover:bg-[#532e5b] text-white px-3.5 py-1.5 text-xs font-bold transition inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5 text-[#FFC84D]" />
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
              <h3 className="text-xl font-extrabold text-[#20255C] font-heading">
                Explore JORMASS Subject Disciplines
              </h3>
              <p className="text-xs text-[#50577A]">
                Structured empirical research taxonomy across College of Management Sciences
              </p>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="text-xs font-bold text-[#B33600] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Aims & Scope</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Management & Governance',
                icon: <Briefcase className="h-5 w-5 text-[#6B3F74]" />,
                desc: 'Corporate strategy, organizational behavior, business ethics, and operations.',
                count: '14 Articles',
              },
              {
                title: 'Financial Economics & Banking',
                icon: <DollarSign className="h-5 w-5 text-[#B33600]" />,
                desc: 'Capital markets, monetary policy, auditing standards, and banking stability.',
                count: '18 Articles',
              },
              {
                title: 'Public Administration & Policy',
                icon: <Scale className="h-5 w-5 text-[#20255C]" />,
                desc: 'Public sector governance, civil service reforms, and social policies.',
                count: '9 Articles',
              },
              {
                title: 'Agribusiness & Rural Economy',
                icon: <Building2 className="h-5 w-5 text-[#FFC84D]" />,
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
                className="rounded-2xl border border-[#E2E6EE] bg-white p-5 space-y-2.5 shadow-xs hover:border-[#6B3F74] hover:shadow-md transition cursor-pointer group"
              >
                <div className="p-2.5 rounded-xl bg-[#E2E5F3] w-fit group-hover:bg-[#6B3F74]/15 transition">
                  {discItem.icon}
                </div>
                <h4 className="text-sm font-bold text-[#20255C] group-hover:text-[#B33600] transition font-heading">
                  {discItem.title}
                </h4>
                <p className="text-xs text-[#50577A] leading-relaxed">
                  {discItem.desc}
                </p>
                <span className="text-xs font-bold text-[#6B3F74] block pt-1">
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
