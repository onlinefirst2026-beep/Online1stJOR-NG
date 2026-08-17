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
  Library,
} from 'lucide-react';
import { VerifiedBadge } from '../../Common/VerifiedBadge';
import { DemoBadge } from '../../Common/DemoBadge';

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
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8 font-serif">
        <div className="font-sans text-xs text-stone-500 flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:underline">Catalogue</button>
          <span>/</span>
          <button onClick={() => onNavigate('archive')} className="hover:underline">Vol. {volOfArt.volumeNumber} No. {issueOfArt.issueNumber}</button>
          <span>/</span>
          <span className="text-stone-900 truncate max-w-xs">{selectedArticle.title}</span>
        </div>

        <div className="space-y-4">
          <div className="font-sans flex items-center justify-between text-xs border-b border-stone-200 pb-2">
            <span className="font-semibold text-amber-900 uppercase tracking-wider">{selectedArticle.category}</span>
            <span className="font-mono text-stone-500">pp. {selectedArticle.pageStart}–{selectedArticle.pageEnd} ({issueOfArt.year})</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-stone-900">
            {selectedArticle.title}
          </h1>

          <div className="font-sans space-y-1 text-xs text-stone-700 pt-2 border-b border-stone-200 pb-4">
            <p className="font-semibold text-stone-900 text-sm">
              {selectedArticle.authors.map((a) => a.name).join(', ')}
            </p>
            {selectedArticle.authors.map((a, i) => (
              <p key={i} className="text-stone-500 italic">
                {a.name} — {a.affiliation}
              </p>
            ))}
          </div>

          {/* Reading Box */}
          <div className="rounded-xl border border-stone-300 bg-white p-8 space-y-4 shadow-xs">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-500">
              Abstract
            </h3>
            <p className="text-sm text-stone-800 leading-relaxed text-justify">
              {selectedArticle.abstract}
            </p>
          </div>

          {/* DOI & License info */}
          <div className="font-sans flex items-center justify-between text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-mono">DOI: {selectedArticle.doi || '10.5281/jormass.2026'}</span>
              <DemoBadge type="doi" size="xs" />
            </div>
            <span className="text-stone-600 font-medium">Open Access • CC BY 4.0</span>
          </div>

          {/* Keywords & Actions */}
          <div className="font-sans flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
            <div className="flex flex-wrap gap-1.5">
              {selectedArticle.keywords.map((k, i) => (
                <span key={i} className="rounded bg-stone-100 px-2.5 py-1 text-xs text-stone-700">
                  {k}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onOpenCitation(selectedArticle)}
                className="rounded border border-stone-300 px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50"
              >
                Cite
              </button>
              <button
                onClick={() => onOpenPdf(selectedArticle)}
                className="rounded bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ARCHIVE
  // ----------------------------------------------------
  if (page === 'archive') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Library Catalogue Archive
        </h1>
        <div className="space-y-6 font-sans">
          {volumes.map((vol) => (
            <div key={vol.id} className="rounded-xl border border-stone-300 bg-white p-6 space-y-3">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Volume {vol.volumeNumber} ({vol.year})
              </h3>
              <div className="divide-y divide-stone-100 text-xs">
                {issues.filter((i) => i.volumeId === vol.id).map((iss) => (
                  <div key={iss.id} className="py-2.5 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-stone-800">Issue No. {iss.issueNumber}</span>
                      <p className="text-stone-500">{iss.title}</p>
                    </div>
                    <button
                      onClick={() => onNavigate('current-issue')}
                      className="font-semibold text-amber-900 hover:underline"
                    >
                      Browse Papers →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // EDITORIAL BOARD
  // ----------------------------------------------------
  if (page === 'editorial-board') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Editorial Board & Officers
        </h1>
        <div className="space-y-4 font-sans">
          {boardMembers.map((m) => (
            <div key={m.id} className="rounded-xl border border-stone-300 bg-white p-5 flex flex-col sm:flex-row justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="rounded bg-stone-100 px-2 py-0.5 font-bold uppercase text-[10px] text-stone-700">{m.role}</span>
                <h3 className="font-serif text-lg font-bold text-stone-900">{m.name}</h3>
                <p className="text-stone-600">{m.department}, {m.institution}, {m.country}</p>
              </div>
              {m.orcid && (
                <div className="font-mono text-stone-500 shrink-0 sm:text-right">
                  ORCID: <a href={m.orcid} target="_blank" rel="noreferrer" className="text-amber-900 hover:underline">{m.orcid}</a>
                </div>
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
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8 font-sans">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Indexing & Discovery
          </h1>
          <DemoBadge type="indexing" size="sm" />
        </div>

        {/* Notice */}
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950 flex items-start gap-3">
          <DemoBadge type="preview" size="xs" />
          <div>
            <p className="font-semibold text-amber-900">Proposed Discovery Presentation</p>
            <p className="text-amber-800 mt-0.5">
              This section demonstrates how verified indexing and discovery services can be presented on the redesigned JORMASS website. Final verification links and indexed status will be confirmed by JORMASS before launch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indexing.map((idxItem, idx) => (
            <div key={idx} className="rounded-xl border border-stone-300 bg-white p-5 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-base font-bold text-stone-900">{idxItem.name}</h3>
                <VerifiedBadge status={idxItem.status} />
              </div>
              <p className="text-stone-600">{idxItem.description}</p>
              {idxItem.url && (
                <a href={idxItem.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:underline pt-1">
                  <span>Verification Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // EVENTS
  // ----------------------------------------------------
  if (page === 'events') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8 font-sans">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Academic Events & Conferences
          </h1>
          <DemoBadge type="event" size="sm" />
        </div>

        <div className="space-y-4">
          {events.map((evt) => (
            <div key={evt.id} className="rounded-xl border border-stone-300 bg-white p-6 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-stone-100 px-2 py-0.5 font-bold uppercase text-[10px] text-stone-700">{evt.eventType}</span>
                  <DemoBadge type="event" size="xs" />
                </div>
                <span className="font-mono text-stone-500">{evt.eventDate} ({evt.startTime})</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">{evt.title}</h3>
              <p className="text-stone-600">{evt.description}</p>
              <p className="text-stone-500 font-medium pt-1">Venue: {evt.venue}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // FEES
  // ----------------------------------------------------
  if (page === 'fees') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8 font-sans">
        <h1 className="font-serif text-3xl font-bold text-stone-900 border-b border-stone-200 pb-4">
          Publication Fees & Charges
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fees.map((fee) => (
            <div key={fee.id} className="rounded-xl border border-stone-300 bg-white p-6 space-y-3">
              <div className="flex justify-between items-start">
                <span className="rounded bg-stone-100 px-2 py-0.5 font-bold text-stone-700 text-xs">{fee.feeType}</span>
                <span className="font-mono text-xl font-bold text-stone-900">{fee.amount}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">{fee.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{fee.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-stone-300 bg-stone-100 p-5 text-xs text-stone-700 space-y-1">
          <h4 className="font-bold text-stone-900">Waiver and Discount Policy</h4>
          <p>
            Waiver and discount arrangements, where applicable, are determined by the Editorial Office. Contact JORMASS for further information.
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DEFAULT / GUIDELINES
  // ----------------------------------------------------
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8 font-serif">
      <h1 className="text-3xl font-bold text-stone-900 border-b border-stone-200 pb-4">
        Author Submission Guidelines
      </h1>
      <div className="font-sans text-xs sm:text-sm text-stone-700 space-y-4 leading-relaxed bg-white p-8 rounded-xl border border-stone-300">
        <p>
          Manuscripts submitted to JORMASS must be original contributions not published previously or under consideration elsewhere.
        </p>
        <p>
          All manuscripts should be prepared in Microsoft Word (.docx) adhering strictly to the <strong>APA 7th Edition</strong> referencing system.
        </p>
      </div>
    </div>
  );
};
