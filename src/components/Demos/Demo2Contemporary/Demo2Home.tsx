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
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  TrendingUp,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { VerifiedBadge } from '../../Common/VerifiedBadge';

interface Demo2HomeProps {
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

export const Demo2Home: React.FC<Demo2HomeProps> = ({
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
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All Topics',
    'Agribusiness & Finance',
    'Accounting & Governance',
    'Management & Marketing',
    'Economics & Public Policy',
  ];

  const currentArticles = articles.filter(
    (a) =>
      a.issueId === currentIssue.id &&
      (activeCategory === 'All Topics' || a.category === activeCategory)
  );

  const upcomingEvents = events.filter((e) => e.status === 'Published').slice(0, 3);
  const nextCall = calendar.find((c) => c.status === 'Open for Submissions') || calendar[0];

  return (
    <div className="space-y-16 py-8 sm:py-12 font-d2-body">
      {/* 1. Contemporary Split Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          {/* Subtle geometric background glow */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          {/* Left Hero Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 border border-teal-500/30 px-3.5 py-1 text-xs font-semibold text-teal-300 font-d2-meta">
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              <span>COLMAS • Michael Okpara University of Agriculture</span>
            </div>

            <h1 className="font-d2-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Advancing High-Impact African Management & Economic Research
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-d2-body">
              An international peer-reviewed journal dedicated to publishing rigorous theoretical, empirical, and policy research across management sciences, agribusiness finance, accounting, and social development.
            </p>

            {/* Research Scope Chips */}
            <div className="flex flex-wrap gap-2 pt-1 font-d2-meta">
              {['Agribusiness', 'Banking & Finance', 'Public Policy', 'Corporate Governance', 'Marketing'].map((tag, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => onNavigate('submit')}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-teal-600/20 hover:bg-teal-500 transition"
              >
                <span>Submit Manuscript</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate('current-issue')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                <BookOpen className="h-4 w-4 text-teal-400" />
                <span>Explore Latest Issue</span>
              </button>
            </div>
          </div>

          {/* Right Hero Column: Interactive Current Issue Preview Card (5 Cols) */}
          <div className="lg:col-span-5 relative z-10">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-6 backdrop-blur-md shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="rounded-md bg-teal-500/20 text-teal-300 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider font-d2-meta">
                  Featured Issue
                </span>
                <span className="font-d2-meta text-xs text-slate-400">
                  Vol. {currentIssue.volumeNumber} No. {currentIssue.issueNumber} ({currentIssue.year})
                </span>
              </div>

              <h3 className="font-d2-heading text-lg font-bold text-white leading-snug">
                {currentIssue.title}
              </h3>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-d2-body">
                {currentIssue.description}
              </p>

              <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800 space-y-2 text-xs font-d2-body">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Peer-Reviewed Articles:</span>
                  <span className="font-bold text-white font-d2-meta">{articles.filter((a) => a.issueId === currentIssue.id).length} Papers</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Publication Date:</span>
                  <span className="font-semibold text-teal-300 font-d2-meta">{currentIssue.publicationDate}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate('current-issue')}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 py-2.5 text-xs font-bold text-white hover:bg-teal-500 transition shadow-xs"
                >
                  <span>View All Issue Papers</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Research Topic Taxonomy Tabs & Modern Article Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 font-d2-meta">
              Curated Research
            </span>
            <h2 className="font-d2-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-0.5">
              Latest Published Research Papers
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-d2-body">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modern 2-Column Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-d2-body">
          {currentArticles.map((art) => (
            <div
              key={art.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-teal-500/50 transition-all duration-200 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-md bg-teal-50 px-2.5 py-1 font-semibold text-teal-800 border border-teal-200/60 font-d2-meta">
                    {art.category}
                  </span>
                  <span className="font-d2-meta text-[11px] text-slate-400">
                    pp. {art.pageStart}–{art.pageEnd}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectArticle(art)}
                  className="cursor-pointer font-d2-heading text-lg font-bold text-slate-900 hover:text-teal-700 transition leading-snug"
                >
                  {art.title}
                </h3>

                <p className="text-xs text-slate-700 font-medium">
                  {art.authors.map((a) => a.name).join(', ')}
                </p>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {art.abstract}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectArticle(art)}
                  className="font-bold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <span>Article Details</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCitation(art)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Quote className="h-3 w-3 text-teal-600" />
                    <span>Cite</span>
                  </button>

                  <button
                    onClick={() => onOpenPdf(art)}
                    className="inline-flex items-center gap-1 rounded-lg bg-teal-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                  >
                    <Download className="h-3 w-3" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Horizontal Chronological Events Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl space-y-8 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-d2-meta">
                Academic Engagement
              </span>
              <h2 className="font-d2-heading text-2xl font-bold tracking-tight text-white mt-0.5">
                Conferences, Lectures & Editorial Milestones
              </h2>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-teal-200"
            >
              <span>View All Events Calendar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-d2-body">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 space-y-3 flex flex-col justify-between hover:bg-slate-800 transition"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="rounded bg-teal-500/20 text-teal-300 px-2 py-0.5 font-bold text-[10px] uppercase font-d2-meta">
                      {evt.eventType}
                    </span>
                    <span className="font-d2-meta text-[11px] text-slate-400">{evt.eventDate}</span>
                  </div>

                  <h3 className="font-d2-heading text-base font-bold text-white leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="border-t border-slate-700/60 pt-3 text-xs text-slate-400 flex items-center justify-between">
                  <span>{evt.venue}</span>
                  <button
                    onClick={() => onNavigate('events')}
                    className="font-semibold text-teal-300 hover:underline"
                  >
                    Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call for Papers & Editorial Calendar Banner */}
      {nextCall && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-50 via-blue-50 to-teal-50 p-8 sm:p-10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-block rounded-full bg-teal-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white font-d2-meta">
                Upcoming Issue Call for Papers
              </span>
              <h3 className="font-d2-heading text-2xl font-bold text-slate-900">
                Vol. {nextCall.volume} No. {nextCall.issue} ({nextCall.year}) — {nextCall.theme}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-d2-body">
                Submissions are invited from researchers worldwide. Empirical, methodological, and conceptual papers welcome.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-700 font-d2-body">
                <span>Submission Deadline: <strong className="text-teal-900 font-d2-meta">{nextCall.submissionDeadline}</strong></span>
                <span>•</span>
                <span>Expected Release: <strong className="font-d2-meta">{nextCall.expectedPublicationDate}</strong></span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 font-d2-body">
              <button
                onClick={() => onNavigate('submit')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow hover:bg-teal-800 transition"
              >
                <span>Submit to Vol. {nextCall.volume}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate('author-guidelines')}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>Author Guidelines</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
