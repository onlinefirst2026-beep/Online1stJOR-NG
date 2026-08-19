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
  Layers,
  TrendingUp,
  CreditCard,
  Send,
  HelpCircle,
} from 'lucide-react';
import { VerifiedBadge } from '../../Common/VerifiedBadge';
import { DemoBadge } from '../../Common/DemoBadge';
import { PEER_REVIEW_STEPS } from '../../../data/journalData';

interface Demo2PagesProps {
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

export const Demo2Pages: React.FC<Demo2PagesProps> = ({
  page,
  settings,
  volumes,
  issues,
  articles,
  events,
  announcements,
  boardMembers,
  calendar,
  indexing,
  fees,
  selectedArticle,
  onNavigate,
  onSelectArticle,
  onOpenCitation,
  onOpenPdf,
  onOpenOjs,
}) => {
  const currentIssue = issues.find((i) => i.status === 'published') || issues[0];
  const currentVolume = volumes.find((v) => v.id === currentIssue.volumeId) || volumes[0];

  // ----------------------------------------------------
  // ARTICLE DETAIL PAGE
  // ----------------------------------------------------
  if (page === 'article' && selectedArticle) {
    const issueOfArt = issues.find((i) => i.id === selectedArticle.issueId) || currentIssue;
    const volOfArt = volumes.find((v) => v.id === selectedArticle.volumeId) || currentVolume;

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d2-body">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Article Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="rounded-lg bg-teal-50 px-3 py-1 font-semibold text-teal-800 border border-teal-200 font-d2-meta">
                  {selectedArticle.category}
                </span>
                <span className="font-d2-meta text-slate-500">
                  Vol. {volOfArt.volumeNumber}, No. {issueOfArt.issueNumber} ({issueOfArt.year})
                </span>
              </div>

              <h1 className="font-d2-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Authors */}
              <div className="border-y border-slate-100 py-4 space-y-2">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-slate-900">
                  {selectedArticle.authors.map((a, i) => (
                    <span key={i} className="text-teal-900">{a.name}</span>
                  ))}
                </div>
                <div className="text-xs text-slate-500 space-y-1">
                  {selectedArticle.authors.map((a, i) => (
                    <p key={i}>
                      {a.name} — {a.affiliation} {a.orcid && `(ORCID: ${a.orcid})`}
                    </p>
                  ))}
                </div>
              </div>

              {/* Abstract */}
              <div className="space-y-3">
                <h3 className="font-d2-heading font-bold text-xs uppercase tracking-wider text-teal-800">
                  Abstract
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {selectedArticle.abstract}
                </p>
              </div>

              {/* Keywords */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-d2-heading">
                  Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-700 border border-slate-200 font-d2-meta"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Rail (4 cols) */}
          <div className="lg:col-span-4 space-y-6 font-d2-body">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-d2-heading text-base font-bold text-slate-900">
                Article Actions
              </h3>
              <button
                onClick={() => onOpenPdf(selectedArticle)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-xs font-bold text-white shadow hover:bg-teal-800 transition"
              >
                <Download className="h-4 w-4" />
                <span>Download Full PDF (Open Access)</span>
              </button>
              <button
                onClick={() => onOpenCitation(selectedArticle)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <Quote className="h-4 w-4 text-teal-600" />
                <span>Generate Citation (APA/BibTeX)</span>
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 text-xs">
              <h4 className="font-d2-heading text-sm font-bold text-slate-900">
                Metrics & Indexing
              </h4>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">DOI:</span>
                <div className="flex items-center gap-1">
                  <span className="font-d2-meta text-teal-900 font-semibold">{selectedArticle.doi || '10.5281/jormass.2026'}</span>
                  <DemoBadge type="doi" size="xs" />
                </div>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Pages:</span>
                <span className="font-d2-meta">{selectedArticle.pageStart}–{selectedArticle.pageEnd}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">License:</span>
                <span className="text-emerald-700 font-semibold font-d2-meta">CC BY 4.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // CURRENT ISSUE PAGE
  // ----------------------------------------------------
  if (page === 'current-issue') {
    const currentArticles = articles.filter((a) => a.issueId === currentIssue.id);

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d2-body">
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 shadow-lg space-y-3 border border-slate-800">
          <span className="rounded-md bg-teal-500/20 text-teal-300 px-2.5 py-0.5 text-xs font-bold uppercase font-d2-meta">
            Current Publication
          </span>
          <h1 className="font-d2-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Vol. {currentIssue.volumeNumber} No. {currentIssue.issueNumber} ({currentIssue.year})
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-d2-body">
            {currentIssue.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentArticles.map((art) => (
            <div
              key={art.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition space-y-4"
            >
              <div className="space-y-2">
                <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 font-d2-meta">
                  {art.category}
                </span>
                <h3
                  onClick={() => onSelectArticle(art)}
                  className="cursor-pointer font-d2-heading text-base font-bold text-slate-900 hover:text-teal-700"
                >
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {art.authors.map((a) => a.name).join(', ')}
                </p>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {art.abstract}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs font-d2-body">
                <button
                  onClick={() => onSelectArticle(art)}
                  className="font-bold text-teal-700 hover:underline"
                >
                  Details →
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenCitation(art)}
                    className="rounded border border-slate-200 px-2.5 py-1 text-slate-700 hover:bg-slate-50"
                  >
                    Cite
                  </button>
                  <button
                    onClick={() => onOpenPdf(art)}
                    className="rounded bg-teal-700 px-3 py-1 font-semibold text-white hover:bg-teal-800"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ARCHIVE PAGE
  // ----------------------------------------------------
  if (page === 'archive') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d2-body">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="font-d2-heading text-3xl font-extrabold text-slate-900">
            Journal Archive
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Complete historical repository of published volumes and issues.
          </p>
        </div>

        <div className="space-y-8">
          {volumes.map((vol) => {
            const volIssues = issues.filter((i) => i.volumeId === vol.id);
            return (
              <div key={vol.id} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
                <h3 className="font-d2-heading text-xl font-bold text-slate-900 border-b pb-3">
                  Volume {vol.volumeNumber} ({vol.year})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {volIssues.map((iss) => {
                    const issArts = articles.filter((a) => a.issueId === iss.id);
                    return (
                      <div key={iss.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-900 text-sm font-d2-heading">Issue {iss.issueNumber}</span>
                          <span className="text-slate-500 font-d2-meta">{iss.publicationDate}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{iss.title}</p>
                        <div className="pt-2 flex justify-between items-center text-xs font-d2-body">
                          <span className="font-d2-meta text-slate-500">{issArts.length} Articles</span>
                          <button
                            onClick={() => onSelectArticle(issArts[0] || articles[0])}
                            className="font-bold text-teal-700 hover:underline"
                          >
                            Explore Articles →
                          </button>
                        </div>
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
  // EDITORIAL BOARD
  // ----------------------------------------------------
  if (page === 'editorial-board') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d2-body">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="font-d2-heading text-3xl font-extrabold text-slate-900">
            Editorial Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Scholarly advisory and editorial leaders guiding peer-review rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boardMembers.map((m) => (
            <div key={m.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2 hover:shadow-md transition">
              <span className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase text-teal-800 font-d2-meta">
                {m.role}
              </span>
              <h3 className="font-d2-heading text-base font-bold text-slate-900 mt-1">{m.name}</h3>
              <p className="text-xs text-slate-600">{m.department}</p>
              <p className="text-xs font-semibold text-slate-700">{m.institution}, {m.country}</p>
              {m.orcid && (
                <p className="text-[11px] font-d2-meta text-teal-700 pt-1">
                  ORCID: <a href={m.orcid} target="_blank" rel="noreferrer" className="hover:underline">{m.orcid}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // INDEXING & DISCOVERY
  // ----------------------------------------------------
  if (page === 'indexing') {
    const verifiedServices = indexing.filter((i) => i.category === 'Verified JORMASS Discovery Channels');
    const proposedServices = indexing.filter((i) => i.category !== 'Verified JORMASS Discovery Channels');

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d2-body">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-d2-heading text-3xl font-extrabold text-slate-900">
                Indexing & Discovery
              </h1>
              <DemoBadge type="indexing" size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Proposed academic discovery and indexing presentation for JORMASS.
            </p>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-xs text-amber-950 flex items-start gap-3 shadow-xs">
          <div className="mt-0.5 rounded-full bg-amber-200 p-1 text-amber-900 shrink-0">
            <DemoBadge type="preview" size="xs" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-amber-900 font-d2-heading">Proposed Presentation Notice</p>
            <p className="text-amber-800 leading-relaxed font-d2-body">
              This section demonstrates how verified indexing and discovery services can be presented on the redesigned JORMASS website. Final services, verification links, and indexing inclusion will be confirmed by JORMASS before launch.
            </p>
          </div>
        </div>

        {/* Section 1: Verified Channels */}
        <div className="space-y-4">
          <h2 className="font-d2-heading text-xl font-bold text-slate-900 border-b pb-2">
            Verified Discovery Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedServices.map((idxItem, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-d2-heading text-lg font-bold text-slate-900">{idxItem.name}</h3>
                  <VerifiedBadge status={idxItem.status} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{idxItem.description}</p>
                {idxItem.url && (
                  <a
                    href={idxItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline pt-2 font-d2-meta"
                  >
                    <span>Verification Portal</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Proposed Targets */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h2 className="font-d2-heading text-xl font-bold text-slate-900">
              Proposed Indexing & Abstracting Targets
            </h2>
            <DemoBadge type="indexing" size="xs" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proposedServices.map((idxItem, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-d2-heading text-lg font-bold text-slate-900">{idxItem.name}</h3>
                  <VerifiedBadge status={idxItem.status} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{idxItem.description}</p>
                {idxItem.url && (
                  <a
                    href={idxItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline pt-2 font-d2-meta"
                  >
                    <span>Directory Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // EVENTS & CONFERENCES
  // ----------------------------------------------------
  if (page === 'events') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d2-body">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-d2-heading text-3xl font-extrabold text-slate-900">
                Academic Events & Conferences
              </h1>
              <DemoBadge type="event" size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Faculty conferences, symposiums, and research workshops.
            </p>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-xs text-cyan-950 flex items-start gap-3 shadow-xs">
          <div className="mt-0.5 rounded-full bg-cyan-200 p-1 text-cyan-900 shrink-0">
            <DemoBadge type="event" size="xs" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-cyan-900 font-d2-heading">Event Capability Showcase</p>
            <p className="text-cyan-800 leading-relaxed font-d2-body">
              This section demonstrates how the redesigned platform can support academic conferences, workshops, and faculty lectures. Past events are documented from College archives; future event schedules and registration portals will be confirmed by JORMASS.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {events.map((evt) => (
            <div key={evt.id} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded bg-teal-100 text-teal-900 px-2.5 py-0.5 font-bold font-d2-meta">{evt.eventType}</span>
                  <DemoBadge type="event" size="xs" />
                  <span className="text-slate-500 font-d2-meta">{evt.eventDate} ({evt.startTime})</span>
                </div>
                <h3 className="font-d2-heading text-xl font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-d2-body">{evt.description}</p>
                <p className="text-xs text-slate-500 font-medium">Venue: {evt.venue}</p>
              </div>

              {evt.registrationUrl && (
                <a
                  href={evt.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-800 shrink-0 inline-flex items-center gap-1.5 font-d2-meta"
                >
                  <span>Register Now</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PUBLICATION FEES & CHARGES
  // ----------------------------------------------------
  if (page === 'fees') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d2-body">
        <div className="border-b border-slate-200 pb-4">
          <h1 className="font-d2-heading text-3xl font-extrabold text-slate-900">
            Publication Fees & Charges
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Transparent fee policy for manuscript review and Open Access publication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fees.map((fee) => (
            <div key={fee.id} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="rounded bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-800 font-d2-meta">{fee.feeType}</span>
                  <h3 className="font-d2-heading text-xl font-bold text-slate-900 mt-2">{fee.title}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-teal-900 font-d2-meta">{fee.amount}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-d2-body">{fee.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-700 space-y-2 font-d2-body">
          <h4 className="font-bold text-slate-900 text-sm font-d2-heading">Waiver and Discount Policy</h4>
          <p>
            Waiver and discount arrangements, where applicable, are determined by the Editorial Office. Authors with inquiries regarding special support or institutional arrangements should contact the Managing Editor.
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DEFAULT / ABOUT
  // ----------------------------------------------------
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-d2-body">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="font-d2-heading text-3xl font-extrabold text-slate-900">
          About JORMASS Research
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-d2-meta">
          {settings.faculty}, {settings.institution}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-d2-body">
        <h3 className="font-d2-heading text-xl font-bold text-slate-900">
          Mission & Scholarly Focus
        </h3>
        <p>
          The Journal of Research in Management and Social Sciences (JORMASS) publishes peer-reviewed research advancing empirical analysis and practical management solutions across emerging markets.
        </p>
        <p>
          Covered domains include Agribusiness & Food Economics, Corporate Finance, Accounting & Auditing Standards, Strategic Human Capital Management, and Public Sector Governance.
        </p>
      </div>
    </div>
  );
};
