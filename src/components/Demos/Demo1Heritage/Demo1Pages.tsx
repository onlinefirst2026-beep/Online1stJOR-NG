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
  ArrowLeft,
} from 'lucide-react';
import { VerifiedBadge } from '../../Common/VerifiedBadge';
import { PEER_REVIEW_STEPS } from '../../../data/journalData';

interface Demo1PagesProps {
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

export const Demo1Pages: React.FC<Demo1PagesProps> = ({
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
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const currentIssue = issues.find((i) => i.status === 'published') || issues[0];
  const currentVolume = volumes.find((v) => v.id === currentIssue.volumeId) || volumes[0];

  // ----------------------------------------------------
  // ARTICLE DETAIL PAGE
  // ----------------------------------------------------
  if (page === 'article' && selectedArticle) {
    const issueOfArt = issues.find((i) => i.id === selectedArticle.issueId) || currentIssue;
    const volOfArt = volumes.find((v) => v.id === selectedArticle.volumeId) || currentVolume;
    const relatedArticles = articles
      .filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category)
      .slice(0, 3);

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <button onClick={() => onNavigate('home')} className="hover:text-neutral-900">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('archive')} className="hover:text-neutral-900">Archive</button>
          <span>/</span>
          <button onClick={() => onNavigate('current-issue')} className="hover:text-neutral-900">
            Vol. {volOfArt.volumeNumber} No. {issueOfArt.issueNumber}
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-semibold truncate max-w-xs">{selectedArticle.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Article Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-4 text-xs">
                <span className="rounded bg-amber-100 px-3 py-1 font-semibold text-amber-900">
                  {selectedArticle.category}
                </span>
                <span className="font-mono text-neutral-500">
                  Vol. {volOfArt.volumeNumber}, No. {issueOfArt.issueNumber} ({issueOfArt.year}) • pp. {selectedArticle.pageStart}–{selectedArticle.pageEnd}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-[#0d1b2a]">
                {selectedArticle.title}
              </h1>

              {/* Authors & Affiliations */}
              <div className="space-y-2 border-b border-neutral-100 pb-4">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-neutral-900">
                  {selectedArticle.authors.map((auth, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      {auth.name}
                      {auth.isCorresponding && (
                        <span className="text-amber-700 text-xs" title="Corresponding Author">*</span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="space-y-1 text-xs text-neutral-600 italic">
                  {selectedArticle.authors.map((auth, idx) => (
                    <p key={idx}>
                      {auth.name} — {auth.affiliation}
                      {auth.orcid && (
                        <span className="font-mono not-italic text-neutral-500 ml-1">
                          (ORCID: {auth.orcid})
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Abstract Section */}
              <div className="rounded-xl border border-neutral-200 bg-[#fdfbf7] p-6 space-y-3">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#0d1b2a]">
                  Abstract
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed text-justify">
                  {selectedArticle.abstract}
                </p>
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Keywords
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded bg-neutral-100 px-3 py-1 text-xs text-neutral-700 border border-neutral-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Citation & DOI Box */}
              <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-neutral-700">Digital Object Identifier (DOI):</span>
                  <span className="font-mono text-amber-900 font-semibold">{selectedArticle.doi || '10.5281/zenodo.jormass.2026.07201'}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-neutral-200">
                  <span className="font-bold text-neutral-700">Publication License:</span>
                  <span className="text-emerald-800 font-semibold">CC BY 4.0 (Creative Commons)</span>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
                  Related Articles in {selectedArticle.category}
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectArticle(rel)}
                      className="cursor-pointer rounded-xl border border-neutral-200 bg-white p-4 hover:border-amber-600 transition space-y-1"
                    >
                      <h4 className="font-serif text-sm font-bold text-[#0d1b2a] hover:text-amber-800">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {rel.authors.map((a) => a.name).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Rail */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="font-serif text-sm font-bold text-[#0d1b2a] border-b pb-2">
                Download & Access
              </h4>
              <button
                onClick={() => onOpenPdf(selectedArticle)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b4332] py-3 text-xs font-bold text-white shadow hover:bg-[#2d6a4f] transition"
              >
                <Download className="h-4 w-4" />
                <span>Download Full Article PDF</span>
              </button>
              <button
                onClick={() => onOpenCitation(selectedArticle)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition"
              >
                <Quote className="h-4 w-4 text-amber-700" />
                <span>Cite this Article (APA, BibTeX, RIS)</span>
              </button>
            </div>

            {/* Issue Information */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-3 text-xs">
              <h4 className="font-serif text-sm font-bold text-[#0d1b2a] border-b pb-2">
                Issue Information
              </h4>
              <p className="font-semibold text-neutral-800">
                Vol. {volOfArt.volumeNumber}, No. {issueOfArt.issueNumber} ({issueOfArt.year})
              </p>
              <p className="text-neutral-600 leading-relaxed">
                {issueOfArt.title}
              </p>
              <button
                onClick={() => onNavigate('current-issue')}
                className="text-xs font-bold text-amber-800 hover:underline pt-2 block"
              >
                View Complete Table of Contents →
              </button>
            </div>
          </aside>
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <span>Current Publication</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a] mt-1">
            Vol. {currentIssue.volumeNumber} · No. {currentIssue.issueNumber} · {currentIssue.year}
          </h1>
          <p className="text-xs text-neutral-600 mt-1">
            Published on {currentIssue.publicationDate} • College of Management Sciences, MOUAU
          </p>
        </div>

        {currentIssue.description && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 text-xs text-neutral-700 leading-relaxed">
            <span className="font-bold text-amber-900">Issue Editorial Note:</span> {currentIssue.description}
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
            Table of Contents ({currentArticles.length} Articles)
          </h3>
          <div className="space-y-4">
            {currentArticles.map((art) => (
              <div
                key={art.id}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs hover:shadow-sm transition space-y-3"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <span className="font-mono text-neutral-500">pp. {art.pageStart}–{art.pageEnd}</span>
                </div>
                <h4
                  onClick={() => onSelectArticle(art)}
                  className="cursor-pointer font-serif text-lg font-bold text-[#0d1b2a] hover:text-amber-800 transition"
                >
                  {art.title}
                </h4>
                <p className="text-xs text-neutral-600">
                  {art.authors.map((a) => a.name).join(', ')}
                </p>
                <p className="text-xs text-neutral-600 line-clamp-2">
                  {art.abstract}
                </p>
                <div className="pt-2 flex justify-between items-center text-xs border-t border-neutral-100">
                  <button
                    onClick={() => onSelectArticle(art)}
                    className="font-semibold text-amber-800 hover:underline"
                  >
                    Read Abstract & Metadata →
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenCitation(art)}
                      className="rounded border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-50"
                    >
                      Cite
                    </button>
                    <button
                      onClick={() => onOpenPdf(art)}
                      className="rounded bg-[#1b4332] px-3 py-1 text-xs font-semibold text-white hover:bg-[#2d6a4f]"
                    >
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PUBLICATION ARCHIVE PAGE
  // ----------------------------------------------------
  if (page === 'archive') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
            Publication Archive
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Browse all historical volumes, issues, and peer-reviewed articles published by JORMASS.
          </p>
        </div>

        <div className="space-y-8">
          {volumes.map((vol) => {
            const volIssues = issues.filter((i) => i.volumeId === vol.id);

            return (
              <div key={vol.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d1b2a] text-amber-400 font-serif font-bold text-sm">
                      V{vol.volumeNumber}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
                        Volume {vol.volumeNumber} ({vol.year})
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {volIssues.length} Published Issues
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {volIssues.map((iss) => {
                    const issArts = articles.filter((a) => a.issueId === iss.id);

                    return (
                      <div
                        key={iss.id}
                        className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 space-y-2 hover:bg-neutral-50 transition"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-[#0d1b2a]">
                            No. {iss.issueNumber} ({iss.year})
                          </span>
                          <span className="text-[11px] text-neutral-500">{iss.publicationDate}</span>
                        </div>
                        <p className="text-xs text-neutral-700 line-clamp-2">
                          {iss.title}
                        </p>
                        <div className="flex justify-between items-center pt-2 text-xs">
                          <span className="font-mono text-neutral-500">{issArts.length} Articles</span>
                          <button
                            onClick={() => {
                              onSelectArticle(issArts[0] || articles[0]);
                            }}
                            className="font-bold text-amber-800 hover:underline"
                          >
                            Browse Issue Papers →
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
  // SEARCH PAGE
  // ----------------------------------------------------
  if (page === 'search') {
    const filteredArticles = articles.filter((art) => {
      const matchesQuery =
        !searchQuery ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.authors.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
      return matchesQuery && matchesCat;
    });

    const categories = ['All', 'Agribusiness & Finance', 'Accounting & Governance', 'Management & Marketing', 'Economics & Public Policy', 'Human Resource Management', 'Entrepreneurship & Trade'];

    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
            Search & Research Discovery
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Search across publication titles, author names, abstracts, and academic keywords.
          </p>
        </div>

        {/* Search Control Bar */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, title, author, econometric methods, agribusiness..."
              className="w-full rounded-xl border border-neutral-300 pl-10 pr-4 py-3 text-xs sm:text-sm focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold text-neutral-500">Discipline Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[#0d1b2a] text-white font-bold'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-neutral-500">
            Showing {filteredArticles.length} peer-reviewed research articles
          </p>

          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs hover:shadow-sm transition space-y-2"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded">
                  {art.category}
                </span>
                <span className="font-mono text-neutral-500">Published {art.publicationDate}</span>
              </div>
              <h3
                onClick={() => onSelectArticle(art)}
                className="cursor-pointer font-serif text-lg font-bold text-[#0d1b2a] hover:text-amber-800"
              >
                {art.title}
              </h3>
              <p className="text-xs text-neutral-700 font-medium">
                {art.authors.map((a) => a.name).join(', ')}
              </p>
              <p className="text-xs text-neutral-600 line-clamp-2">
                {art.abstract}
              </p>
              <div className="pt-2 flex justify-between items-center text-xs border-t border-neutral-100">
                <button
                  onClick={() => onSelectArticle(art)}
                  className="font-bold text-amber-800 hover:underline"
                >
                  View Details & Citations →
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenCitation(art)}
                    className="rounded border border-neutral-300 px-3 py-1 text-neutral-700 hover:bg-neutral-50"
                  >
                    Cite
                  </button>
                  <button
                    onClick={() => onOpenPdf(art)}
                    className="rounded bg-[#1b4332] px-3 py-1 font-semibold text-white hover:bg-[#2d6a4f]"
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
  // EDITORIAL BOARD PAGE
  // ----------------------------------------------------
  if (page === 'editorial-board') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
            Editorial Board
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Scholarly leadership and advisory board members of the Journal of Research in Management and Social Sciences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-3 hover:border-amber-600 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    {member.role}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#0d1b2a] mt-1">
                    {member.name}
                  </h3>
                </div>
                {member.section && (
                  <span className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                    {member.section}
                  </span>
                )}
              </div>

              <div className="text-xs text-neutral-700 space-y-1">
                <p className="font-semibold">{member.department}</p>
                <p>{member.institution}, {member.country}</p>
                {member.orcid && (
                  <p className="font-mono text-neutral-500 pt-1">
                    ORCID: <a href={member.orcid} target="_blank" rel="noreferrer" className="text-amber-800 hover:underline">{member.orcid}</a>
                  </p>
                )}
              </div>

              {member.bio && (
                <p className="text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PEER REVIEW PROCESS PAGE
  // ----------------------------------------------------
  if (page === 'peer-review') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
            Peer Review Process
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Rigorous double-blind evaluation ensuring empirical validity, theoretical contribution, and publication integrity.
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-xs text-neutral-800 leading-relaxed">
          <span className="font-bold text-amber-900">Timeline Notice:</span> Review timelines vary based on referee availability and revision scope. Review timelines will be confirmed by the Editorial Office upon initial assignment.
        </div>

        {/* 7-Step Visual Workflow */}
        <div className="space-y-4">
          {PEER_REVIEW_STEPS.map((step) => (
            <div
              key={step.step}
              className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0d1b2a] text-amber-400 font-serif font-bold text-base">
                0{step.step}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    {step.actor}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs text-neutral-500 font-mono">{step.duration}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#0d1b2a]">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PUBLICATION ETHICS PAGE
  // ----------------------------------------------------
  if (page === 'ethics') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
            Publication Ethics & Malpractice Statement
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            JORMASS adheres strictly to the highest ethical standards aligned with international Committee on Publication Ethics (COPE) guidelines.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
              1. Duties of Authors
            </h3>
            <p>
              Authors must ensure submitted manuscripts represent entirely original empirical or conceptual research. Any quote, data source, or theoretical foundation must be explicitly cited in accordance with APA 7th standards.
            </p>
            <p>
              <strong>Plagiarism & Redundant Publication:</strong> Plagiarism in any format constitutes severe malpractice. Manuscripts undergo automated similarity screening. Submissions under review elsewhere will be immediately rejected.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
              2. Editorial Independence & Conflicts of Interest
            </h3>
            <p>
              The Editor-in-Chief and editorial board maintain complete independence in publishing decisions without commercial interference. Reviewers and editors must recuse themselves from evaluating any submission with direct personal, institutional, or financial conflicts.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
              3. Corrections, Retractions & Errata
            </h3>
            <p>
              When significant errors or inaccuracies are identified in published articles, JORMASS promptly issues formal corrigenda, addenda, or retractions with clear permanent archival documentation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PUBLICATION FEES PAGE
  // ----------------------------------------------------
  if (page === 'fees') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
            Publication Fees & Article Processing Charges
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Transparent fee structure supporting high-quality typesetting, DOI registration, and open-access publishing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fees.map((fee, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="rounded bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  Fee Schedule
                </span>
                <h3 className="font-serif text-base font-bold text-[#0d1b2a]">
                  {fee.feeType}
                </h3>
                <div className="text-2xl font-serif font-extrabold text-[#0d1b2a]">
                  {fee.amountNgn}{' '}
                  <span className="text-xs font-sans text-neutral-500 font-normal">
                    ({fee.amountUsd})
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {fee.coverage}
                </p>
              </div>

              <div className="border-t border-neutral-100 pt-3 text-xs text-neutral-600 space-y-1">
                <p><strong>When Payable:</strong> {fee.whenPayable}</p>
                <p><strong>Method:</strong> {fee.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Waiver Policy Callout */}
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 space-y-2 text-xs text-neutral-700">
          <h4 className="font-serif text-sm font-bold text-neutral-900">
            Waiver and Discount Policy
          </h4>
          <p className="leading-relaxed">
            Waiver and discount arrangements, where applicable, are determined by the Editorial Office. Contact JORMASS for further information.
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // INDEXING & METRICS PAGE
  // ----------------------------------------------------
  if (page === 'indexing') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
            Indexing & Abstracting Services
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Verified academic discovery databases and ongoing indexing applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {indexing.map((idxItem, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
                  {idxItem.name}
                </h3>
                <VerifiedBadge status={idxItem.status} />
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {idxItem.description}
              </p>
              {idxItem.url && (
                <a
                  href={idxItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:underline pt-2"
                >
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
  // ACADEMIC EVENTS & CONFERENCES PAGE
  // ----------------------------------------------------
  if (page === 'events') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
        <div className="border-b-2 border-[#0d1b2a] pb-4">
          <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
            Academic Events & Conferences
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Annual conferences, research workshops, distinguished faculty lectures, and Special Issue symposiums.
          </p>
        </div>

        <div className="space-y-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition grid grid-cols-1 md:grid-cols-4 gap-6 items-center"
            >
              <div className="md:col-span-1 space-y-2">
                <span className="rounded bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  {evt.eventType}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-semibold">
                  <Calendar className="h-4 w-4 text-amber-800" />
                  <span>{evt.eventDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{evt.startTime}</span>
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
                  {evt.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {evt.description}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-xs">
                  <span className="text-neutral-500 font-medium">Venue: {evt.venue}</span>
                  {evt.registrationUrl && (
                    <a
                      href={evt.registrationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded bg-[#1b4332] px-3 py-1 text-xs font-semibold text-white hover:bg-[#2d6a4f]"
                    >
                      <span>Event Registration</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ABOUT / AIMS & SCOPE PAGE
  // ----------------------------------------------------
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-8">
      <div className="border-b-2 border-[#0d1b2a] pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#0d1b2a]">
          About JORMASS & Scope
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1">
          {settings.faculty}, {settings.institution}, Umudike, Nigeria
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
              Aims & Mission
            </h3>
            <p>
              The <strong>Journal of Research in Management and Social Sciences (JORMASS)</strong> is an international, peer-reviewed academic journal established by the College of Management Sciences (COLMAS) at the Michael Okpara University of Agriculture, Umudike (MOUAU), Abia State, Nigeria.
            </p>
            <p>
              JORMASS provides a reputable scholarly platform for academics, researchers, policy analysts, and industry professionals to publish high-impact theoretical and empirical research advancing management sciences, economic policy, and societal development in emerging markets.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#0d1b2a]">
              Disciplinary Scope
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 font-medium">• Management & Strategic Planning</div>
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 font-medium">• Banking, Finance & FinTech</div>
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 font-medium">• Accounting, Auditing & Taxation</div>
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 font-medium">• Applied Economics & Econometrics</div>
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 font-medium">• Marketing & Supply Chain Logistics</div>
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 font-medium">• Human Resource Management</div>
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 font-medium">• Agribusiness Management & Finance</div>
              <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200 font-medium">• Public Policy & Social Governance</div>
            </div>
          </div>
        </div>

        {/* Aside */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-[#0d1b2a] border-b pb-2">
              Key Facts
            </h4>
            <div className="space-y-1.5 text-neutral-700">
              <p><strong>Print ISSN:</strong> {settings.issnPrint}</p>
              <p><strong>Online ISSN:</strong> {settings.issnOnline}</p>
              <p><strong>Frequency:</strong> Bi-Annual (2 Issues / Volume)</p>
              <p><strong>Review Model:</strong> Double-Blind Peer Review</p>
              <p><strong>License:</strong> CC BY 4.0 Open Access</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
