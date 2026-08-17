import React from 'react';
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
  Clock,
  CheckCircle2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { VerifiedBadge } from '../../Common/VerifiedBadge';

interface Demo1HomeProps {
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

export const Demo1Home: React.FC<Demo1HomeProps> = ({
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
  const currentArticles = articles.filter((a) => a.issueId === currentIssue.id && a.status === 'published');
  const upcomingEvents = events.filter((e) => e.status === 'Published').slice(0, 3);
  const nextDeadline = calendar.find((c) => c.status === 'Open for Submissions') || calendar[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-10">
      {/* 1. Dominant Current Issue Hero Banner (Heritage Academic Style) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1b2a] via-[#152840] to-[#0d1b2a] text-white p-6 sm:p-10 shadow-xl border border-amber-500/30">
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-amber-500 journal-spine-pattern hidden sm:block" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-amber-500 px-3 py-1 font-serif text-xs font-black uppercase tracking-wider text-neutral-950 shadow-xs">
                Current Issue
              </span>
              <span className="rounded bg-neutral-800/80 px-2.5 py-1 font-mono text-xs text-amber-300 border border-neutral-700">
                Vol. {currentIssue.volumeNumber}, No. {currentIssue.issueNumber} ({currentIssue.year})
              </span>
              <span className="text-xs text-neutral-300">
                • Published {currentIssue.publicationDate}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {currentIssue.title || 'Contemporary Management Paradigms and Sustainable African Development'}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {currentIssue.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('current-issue')}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-amber-500 transition"
              >
                <BookOpen className="h-4 w-4" />
                <span>Browse Full Current Issue ({currentArticles.length} Articles)</span>
              </button>

              <button
                onClick={() => onNavigate('archive')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition"
              >
                <span>Browse All Volumes & Archive</span>
              </button>
            </div>
          </div>

          {/* Current Issue Bound Volume Badge Preview */}
          <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-xl bg-neutral-950/60 border border-neutral-800 text-center">
            <div className="h-32 w-24 rounded shadow-2xl bg-[#0d1b2a] border-l-4 border-amber-500 p-2 text-left flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-0.5">
                <p className="text-[8px] font-black uppercase text-amber-400">JORMASS</p>
                <p className="text-[7px] text-neutral-300 font-mono">Vol. {currentIssue.volumeNumber}</p>
              </div>
              <div className="text-[6px] text-neutral-400 leading-tight">
                MOUAU COLMAS Press
              </div>
            </div>
            <p className="text-xs font-semibold text-neutral-300 mt-3">
              Vol. {currentIssue.volumeNumber} No. {currentIssue.issueNumber}
            </p>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
              {currentArticles.length} Peer-Reviewed Papers
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Content Layout (Articles Left, Scholarly Rail Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Research Articles in Current Issue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#0d1b2a] pb-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0d1b2a]">
                Articles in Current Issue
              </h3>
              <p className="text-xs text-neutral-600">
                Peer-reviewed research published in Vol. {currentIssue.volumeNumber}, No. {currentIssue.issueNumber}
              </p>
            </div>
            <button
              onClick={() => onNavigate('archive')}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1"
            >
              <span>View Archive</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-6">
            {currentArticles.map((article) => (
              <article
                key={article.id}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="rounded bg-neutral-100 px-2.5 py-0.5 font-semibold text-neutral-700">
                    {article.category}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-500">
                    pp. {article.pageStart}–{article.pageEnd} • Published {article.publicationDate}
                  </span>
                </div>

                <h4
                  onClick={() => onSelectArticle(article)}
                  className="cursor-pointer font-serif text-lg font-bold text-[#0d1b2a] hover:text-amber-800 transition leading-snug"
                >
                  {article.title}
                </h4>

                {/* Authors */}
                <div className="text-xs text-neutral-700">
                  <span className="font-semibold">
                    {article.authors.map((a) => a.name).join(', ')}
                  </span>
                </div>

                {/* Abstract Preview */}
                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  {article.abstract}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {article.keywords.slice(0, 4).map((kw, i) => (
                    <span
                      key={i}
                      className="rounded bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-600 border border-neutral-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="border-t border-neutral-100 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectArticle(article)}
                      className="font-bold text-amber-800 hover:text-amber-900"
                    >
                      View Abstract & Details →
                    </button>
                    {article.doi && (
                      <span className="font-mono text-[10px] text-neutral-400 hidden sm:inline">
                        DOI: {article.doi}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenCitation(article)}
                      className="inline-flex items-center gap-1 rounded bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 transition"
                    >
                      <Quote className="h-3 w-3" />
                      <span>Cite</span>
                    </button>

                    <button
                      onClick={() => onOpenPdf(article)}
                      className="inline-flex items-center gap-1 rounded bg-[#1b4332] px-3 py-1 text-xs font-bold text-white shadow hover:bg-[#2d6a4f] transition"
                    >
                      <Download className="h-3 w-3" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column: Scholarly Information Rail */}
        <aside className="space-y-6">
          {/* A. Editorial Calendar / Next Deadline Box */}
          {nextDeadline && (
            <div className="rounded-xl border border-amber-300/80 bg-amber-50/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <Calendar className="h-4 w-4 text-amber-800" />
                <span>Call for Papers & Deadlines</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-neutral-900">
                Vol. {nextDeadline.volume} No. {nextDeadline.issue} ({nextDeadline.year})
              </h4>
              <p className="text-xs text-neutral-700">
                Theme: <em>{nextDeadline.theme}</em>
              </p>
              <div className="rounded-md bg-white p-2.5 border border-amber-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Submission Deadline:</span>
                  <span className="font-bold text-amber-900">{nextDeadline.submissionDeadline}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-neutral-500">Expected Publication:</span>
                  <span className="font-semibold text-neutral-800">{nextDeadline.expectedPublicationDate}</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('submit')}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-800 px-3 py-2 text-xs font-bold text-white hover:bg-amber-900 transition shadow"
              >
                <span>Submit to this Issue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* B. Journal Trust & Scope Info */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#0d1b2a] border-b border-neutral-200 pb-2">
              Journal Overview & Scope
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              JORMASS publishes empirical and conceptual research across management sciences, agribusiness, economics, finance, accounting, and social sciences with rigorous double-blind peer review.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-700 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>Double-Blind Peer Reviewed</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>Open Access (CC BY 4.0)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>No Submission Fee</span>
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-100">
              <button
                onClick={() => onNavigate('about')}
                className="text-xs font-bold text-amber-800 hover:text-amber-900"
              >
                Read Full Aims & Scope →
              </button>
            </div>
          </div>

          {/* C. Verified Indexing Box */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h4 className="font-serif text-sm font-bold text-[#0d1b2a]">
                Verified Indexing
              </h4>
              <button
                onClick={() => onNavigate('indexing')}
                className="text-[11px] font-semibold text-amber-800 hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800">Google Scholar</span>
                <VerifiedBadge status="Verified" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800">CrossRef / DOI</span>
                <VerifiedBadge status="Verified" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800">MOUAU Repository</span>
                <VerifiedBadge status="Verified" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800">ResearchGate</span>
                <VerifiedBadge status="Verified" />
              </div>
            </div>
          </div>

          {/* D. Latest Academic Events */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h4 className="font-serif text-sm font-bold text-[#0d1b2a]">
                Latest Events
              </h4>
              <button
                onClick={() => onNavigate('events')}
                className="text-[11px] font-semibold text-amber-800 hover:underline"
              >
                View All Events
              </button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="space-y-1 text-xs border-b border-neutral-100 pb-2 last:border-0 last:pb-0">
                  <span className="inline-block rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-bold text-neutral-700">
                    {evt.eventType}
                  </span>
                  <h5
                    onClick={() => onNavigate('events')}
                    className="cursor-pointer font-semibold text-neutral-900 hover:text-amber-800 leading-snug"
                  >
                    {evt.title}
                  </h5>
                  <p className="text-[11px] text-neutral-500">
                    {evt.eventDate} • {evt.startTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
