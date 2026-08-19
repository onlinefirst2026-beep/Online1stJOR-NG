import React, { useState } from 'react';
import {
  JournalSettings,
  Volume,
  Issue,
  Article,
  AcademicEvent,
  Announcement,
  EditorialCalendarItem,
  JournalPage,
} from '../../../types';
import {
  BookOpen,
  Download,
  Quote,
  Calendar,
  ArrowRight,
  Search,
  ExternalLink,
  ShieldCheck,
  Library,
  Feather,
} from 'lucide-react';
import { VerifiedBadge } from '../../Common/VerifiedBadge';

interface Demo3HomeProps {
  settings: JournalSettings;
  currentIssue: Issue;
  currentVolume: Volume;
  articles: Article[];
  events: AcademicEvent[];
  announcements: Announcement[];
  calendar: EditorialCalendarItem[];
  onNavigate: (page: JournalPage) => void;
  onSelectArticle: (article: Article) => void;
  onOpenCitation: (article: Article) => void;
  onOpenPdf: (article: Article) => void;
}

export const Demo3Home: React.FC<Demo3HomeProps> = ({
  settings,
  currentIssue,
  currentVolume,
  articles,
  events,
  announcements,
  calendar,
  onNavigate,
  onSelectArticle,
  onOpenCitation,
  onOpenPdf,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');

  const disciplines = [
    'All Disciplines',
    'Agribusiness & Finance',
    'Accounting & Governance',
    'Management & Marketing',
    'Economics & Public Policy',
  ];

  const filteredArticles = articles.filter(
    (a) =>
      a.issueId === currentIssue.id &&
      (selectedDiscipline === 'All Disciplines' || a.category === selectedDiscipline) &&
      (!searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.authors.some((auth) => auth.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-12 font-d3-body">
      {/* 1. Large Expansive Discovery Search Module */}
      <section className="rounded-2xl border border-stone-300 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 font-d3-heading">
            <Library className="h-4 w-4 text-amber-800" />
            <span>Digital Library Search Catalogue</span>
          </div>
          <span className="text-[11px] text-stone-500 font-d3-meta">
            Direct Access to Peer-Reviewed Manuscripts
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalogue by title, author name, econometric methods, or keywords..."
            className="w-full rounded-xl border border-stone-300 pl-10 pr-4 py-3 text-xs sm:text-sm text-stone-900 focus:border-amber-700 focus:outline-none bg-stone-50/50 font-d3-body"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-semibold text-stone-600 font-d3-body">Filter by section:</span>
          {disciplines.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDiscipline(d)}
              className={`rounded-md px-2.5 py-1 transition font-d3-body ${
                selectedDiscipline === d
                  ? 'bg-amber-950 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Digital Library Catalogue Presentation: Current Issue Feature */}
      <section className="rounded-2xl border border-stone-300 bg-white p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 font-d3-meta bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Current Issue In Circulation
            </span>
            <h2 className="font-d3-heading text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5">
              Vol. {currentIssue.volumeNumber} · No. {currentIssue.issueNumber} · {currentIssue.year}
            </h2>
            <p className="text-xs text-stone-500 font-d3-meta mt-0.5">
              Published on {currentIssue.publicationDate} • {articles.filter((a) => a.issueId === currentIssue.id).length} Articles
            </p>
          </div>

          <button
            onClick={() => onNavigate('archive')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:underline font-d3-body"
          >
            <span>View All Previous Volumes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {currentIssue.description && (
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic border-l-2 border-amber-800 pl-4 font-d3-body">
            "{currentIssue.description}"
          </p>
        )}

        {/* 3. Typography-Driven Clean Article List */}
        <div className="divide-y divide-stone-200">
          {filteredArticles.map((art) => (
            <article key={art.id} className="py-6 space-y-3 first:pt-2 last:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="rounded bg-stone-100 px-2 py-0.5 font-semibold text-stone-700 font-d3-meta">
                  {art.category}
                </span>
                <span className="font-d3-meta text-stone-400 text-[11px]">
                  pp. {art.pageStart}–{art.pageEnd}
                </span>
              </div>

              <h3
                onClick={() => onSelectArticle(art)}
                className="cursor-pointer font-d3-heading text-xl sm:text-2xl font-bold text-[#171412] hover:text-amber-900 transition leading-snug"
              >
                {art.title}
              </h3>

              <p className="text-xs font-semibold text-stone-800 font-d3-body">
                {art.authors.map((a) => a.name).join(', ')}
              </p>

              <p className="text-xs text-stone-600 leading-relaxed text-justify line-clamp-3 font-d3-body">
                {art.abstract}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-d3-body">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectArticle(art)}
                    className="font-bold text-amber-900 hover:underline"
                  >
                    View Reading Mode & Citations →
                  </button>
                  {art.doi && (
                    <span className="font-d3-meta text-[10px] text-stone-400 hidden sm:inline">
                      DOI: {art.doi}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCitation(art)}
                    className="rounded border border-stone-300 px-2.5 py-1 text-stone-700 hover:bg-stone-50"
                  >
                    Cite
                  </button>
                  <button
                    onClick={() => onOpenPdf(art)}
                    className="rounded bg-[#171412] px-3.5 py-1 font-semibold text-white hover:bg-stone-800"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Archival Call for Papers & Calendar Strip */}
      <section className="rounded-2xl border border-stone-300 bg-stone-100 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-d3-meta">
              Call for Submissions
            </span>
            <h3 className="font-d3-heading text-lg font-bold text-stone-900">
              Manuscript Submissions Open for Upcoming Editorial Volumes
            </h3>
            <p className="text-xs text-stone-600 font-d3-body">
              All submissions undergo double-blind peer review. Manuscripts should adhere to APA 7th style guidelines.
            </p>
          </div>

          <div className="flex gap-2 shrink-0 font-d3-body">
            <button
              onClick={() => onNavigate('submit')}
              className="rounded-xl bg-amber-900 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800 shadow"
            >
              Submit Paper
            </button>
            <button
              onClick={() => onNavigate('author-guidelines')}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              View Guidelines
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
