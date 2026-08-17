import React, { useState } from 'react';
import {
  Volume,
  Issue,
  Article,
  AcademicEvent,
  Announcement,
  EditorialCalendarItem,
  JournalSettings,
  JournalPage,
} from '../../types';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Save,
  BookOpen,
  Calendar,
  FileText,
  Database,
  Check,
  Copy,
  Sparkles,
  ArrowLeft,
  X,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { generateSupabaseSqlSchema } from '../../lib/dataStore';

interface AdminDashboardProps {
  settings: JournalSettings;
  volumes: Volume[];
  issues: Issue[];
  articles: Article[];
  events: AcademicEvent[];
  announcements: Announcement[];
  calendar: EditorialCalendarItem[];
  onAddArticle: (article: Omit<Article, 'id'>) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onAddEvent: (event: Omit<AcademicEvent, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
  onAddCalendarItem: (item: Omit<EditorialCalendarItem, 'id'>) => void;
  onResetData: () => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  settings,
  volumes,
  issues,
  articles,
  events,
  announcements,
  calendar,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  onAddEvent,
  onDeleteEvent,
  onAddCalendarItem,
  onResetData,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'events' | 'calendar' | 'database'>('overview');
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddCalendarModal, setShowAddCalendarModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Article form state
  const [artTitle, setArtTitle] = useState('');
  const [artAuthors, setArtAuthors] = useState('Dr. Chinedu Eze, Prof. Adaobi Okafor');
  const [artCategory, setArtCategory] = useState('Agribusiness & Finance');
  const [artAbstract, setArtAbstract] = useState('');
  const [artKeywords, setArtKeywords] = useState('Agribusiness, Finance, Value Chain');
  const [artVolumeId, setArtVolumeId] = useState(volumes[0]?.id || 'vol-12');
  const [artIssueId, setArtIssueId] = useState(issues[0]?.id || 'iss-12-1');
  const [artPageStart, setArtPageStart] = useState(1);
  const [artPageEnd, setArtPageEnd] = useState(16);

  // Event form state
  const [evtTitle, setEvtTitle] = useState('');
  const [evtType, setEvtType] = useState<'Conference' | 'Workshop' | 'Public Lecture' | 'Special Issue Deadline'>('Conference');
  const [evtDate, setEvtDate] = useState('2026-11-20');
  const [evtTime, setEvtTime] = useState('10:00 AM WAT');
  const [evtVenue, setEvtVenue] = useState('COLMAS Auditorium, MOUAU');
  const [evtDesc, setEvtDesc] = useState('');

  // Calendar form state
  const [calVolume, setCalVolume] = useState(13);
  const [calIssue, setCalIssue] = useState(1);
  const [calYear, setCalYear] = useState(2027);
  const [calDeadline, setCalDeadline] = useState('January 15, 2027');
  const [calExpected, setCalExpected] = useState('March 30, 2027');
  const [calTheme, setCalTheme] = useState('Emerging Trends in African Public Policy');

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const authorsArr = artAuthors.split(',').map((name) => ({
      name: name.trim(),
      affiliation: 'Michael Okpara University of Agriculture, Umudike',
    }));

    onAddArticle({
      volumeId: artVolumeId,
      issueId: artIssueId,
      title: artTitle,
      authors: authorsArr,
      abstract: artAbstract,
      keywords: artKeywords.split(',').map((k) => k.trim()),
      category: artCategory,
      pageStart: Number(artPageStart),
      pageEnd: Number(artPageEnd),
      pdfUrl: '/samples/sample-manuscript.pdf',
      doi: `10.5281/jormass.${new Date().getFullYear()}.${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'published',
      publicationDate: new Date().toISOString().split('T')[0],
      downloadsCount: 0,
      citationsCount: 0,
    });

    setShowAddArticleModal(false);
    setArtTitle('');
    setArtAbstract('');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({
      title: evtTitle,
      eventType: evtType,
      eventDate: evtDate,
      startTime: evtTime,
      venue: evtVenue,
      description: evtDesc,
      status: 'Published',
      registrationUrl: 'https://jormass.com/events/register',
    });
    setShowAddEventModal(false);
    setEvtTitle('');
    setEvtDesc('');
  };

  const handleCreateCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCalendarItem({
      volume: Number(calVolume),
      issue: Number(calIssue),
      year: Number(calYear),
      submissionDeadline: calDeadline,
      expectedPublicationDate: calExpected,
      theme: calTheme,
      status: 'Open for Submissions',
    });
    setShowAddCalendarModal(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(generateSupabaseSqlSchema());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* Admin Top Header */}
      <header className="border-b border-slate-800 bg-slate-950 px-4 py-3 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-base font-bold text-white">
                JORMASS Editorial CMS
              </h1>
              <span className="rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 border border-blue-500/30">
                Live State Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              College of Management Sciences, MOUAU
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Site</span>
          </button>
        </div>
      </header>

      {/* Admin Subnav */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 sm:px-8">
        <div className="flex items-center gap-4 text-xs font-semibold overflow-x-auto py-2">
          {[
            { id: 'overview', label: 'Overview & Stats' },
            { id: 'articles', label: `Published Articles (${articles.length})` },
            { id: 'events', label: `Academic Events (${events.length})` },
            { id: 'calendar', label: `Editorial Calendar (${calendar.length})` },
            { id: 'database', label: 'Supabase SQL Export' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-3 rounded-lg whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Body */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-6 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Published Articles
                </p>
                <p className="font-serif text-3xl font-bold text-white">
                  {articles.length}
                </p>
                <p className="text-[11px] text-slate-400">Across {volumes.length} Volumes</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-6 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Volumes & Issues
                </p>
                <p className="font-serif text-3xl font-bold text-teal-400">
                  {volumes.length} <span className="text-sm font-sans font-normal text-slate-400">/ {issues.length} Issues</span>
                </p>
                <p className="text-[11px] text-slate-400">Current: Vol. {issues[0]?.volumeNumber} No. {issues[0]?.issueNumber}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-6 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Upcoming Events
                </p>
                <p className="font-serif text-3xl font-bold text-amber-400">
                  {events.length}
                </p>
                <p className="text-[11px] text-slate-400">Lectures & Conferences</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-6 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Open Calls for Papers
                </p>
                <p className="font-serif text-3xl font-bold text-purple-400">
                  {calendar.filter((c) => c.status === 'Open for Submissions').length}
                </p>
                <p className="text-[11px] text-slate-400">Upcoming deadlines</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">
                Content Management Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowAddArticleModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition shadow"
                >
                  <Plus className="h-4 w-4" />
                  <span>Publish New Article</span>
                </button>
                <button
                  onClick={() => setShowAddEventModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-500 transition shadow"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Academic Event</span>
                </button>
                <button
                  onClick={() => setShowAddCalendarModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition shadow"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Editorial Call / Deadline</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">
                  Manuscripts & Published Articles
                </h2>
                <p className="text-xs text-slate-400">
                  Manage papers, categories, metadata, and simulated PDF attachments
                </p>
              </div>
              <button
                onClick={() => setShowAddArticleModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Article</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-800/80">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/90 text-slate-300">
                    <th className="p-4 font-bold">Title & Category</th>
                    <th className="p-4 font-bold">Authors</th>
                    <th className="p-4 font-bold">Volume / Issue</th>
                    <th className="p-4 font-bold">Pages</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-300">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-800/50">
                      <td className="p-4 space-y-1 max-w-sm">
                        <span className="rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5">
                          {art.category}
                        </span>
                        <p className="font-serif font-bold text-white mt-1 line-clamp-2">
                          {art.title}
                        </p>
                      </td>
                      <td className="p-4 text-slate-400">
                        {art.authors.map((a) => a.name).join(', ')}
                      </td>
                      <td className="p-4 font-mono text-slate-400">
                        Vol {art.volumeId.replace('vol-', '')} · {art.issueId.replace('iss-', 'Issue ')}
                      </td>
                      <td className="p-4 font-mono text-slate-400">
                        {art.pageStart}–{art.pageEnd}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => onDeleteArticle(art.id)}
                          className="rounded p-1.5 text-rose-400 hover:bg-rose-950 hover:text-rose-200 transition"
                          title="Delete Article"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">
                  Academic Events Management
                </h2>
                <p className="text-xs text-slate-400">
                  Publish conferences, faculty lectures, and research workshops
                </p>
              </div>
              <button
                onClick={() => setShowAddEventModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((evt) => (
                <div key={evt.id} className="rounded-2xl border border-slate-800 bg-slate-800/80 p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="rounded bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 text-[10px]">
                        {evt.eventType}
                      </span>
                      <span className="font-mono text-slate-400">{evt.eventDate} ({evt.startTime})</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-white">{evt.title}</h3>
                    <p className="text-xs text-slate-400">{evt.description}</p>
                    <p className="text-xs text-slate-500 font-medium">Venue: {evt.venue}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex justify-end">
                    <button
                      onClick={() => onDeleteEvent(evt.id)}
                      className="rounded p-1.5 text-rose-400 hover:bg-rose-950 hover:text-rose-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">
                  Editorial Calendar & Deadlines
                </h2>
                <p className="text-xs text-slate-400">
                  Manage submission deadlines and publication targets for upcoming issues
                </p>
              </div>
              <button
                onClick={() => setShowAddCalendarModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500"
              >
                <Plus className="h-4 w-4" />
                <span>Add Call for Papers</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calendar.map((c) => (
                <div key={c.id} className="rounded-2xl border border-slate-800 bg-slate-800/80 p-5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Vol. {c.volume} No. {c.issue} ({c.year})</span>
                    <span className="rounded bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 text-[10px]">{c.status}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-serif italic">Theme: "{c.theme}"</p>
                  <div className="rounded bg-slate-900 p-2.5 text-xs text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Deadline:</span>
                      <span className="text-white font-semibold">{c.submissionDeadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Release:</span>
                      <span className="text-white font-semibold">{c.expectedPublicationDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DATABASE & SUPABASE SCHEMA */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">
                  Production Database & Supabase Schema
                </h2>
                <p className="text-xs text-slate-400">
                  Ready-to-execute PostgreSQL DDL schema with RLS security policies for instant production deployment
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-500 transition"
                >
                  {copiedSql ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
                </button>
                <button
                  onClick={onResetData}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700"
                >
                  Reset Demo Data
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-slate-300 shadow-inner">
              <pre className="whitespace-pre-wrap overflow-x-auto max-h-96 text-[11px] leading-relaxed">
                {generateSupabaseSqlSchema()}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD ARTICLE */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold">Publish New Research Article</h3>
              <button onClick={() => setShowAddArticleModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Article Title</label>
                <input
                  type="text"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  placeholder="e.g. Econometric Analysis of Agribusiness Financing in Southeastern Nigeria"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Authors (comma separated)</label>
                <input
                  type="text"
                  value={artAuthors}
                  onChange={(e) => setArtAuthors(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Disciplinary Category</label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                  >
                    <option value="Agribusiness & Finance">Agribusiness & Finance</option>
                    <option value="Accounting & Governance">Accounting & Governance</option>
                    <option value="Management & Marketing">Management & Marketing</option>
                    <option value="Economics & Public Policy">Economics & Public Policy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Pages (Start - End)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={artPageStart}
                      onChange={(e) => setArtPageStart(Number(e.target.value))}
                      className="w-1/2 rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                      placeholder="Start"
                    />
                    <input
                      type="number"
                      value={artPageEnd}
                      onChange={(e) => setArtPageEnd(Number(e.target.value))}
                      className="w-1/2 rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                      placeholder="End"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Abstract</label>
                <textarea
                  value={artAbstract}
                  onChange={(e) => setArtAbstract(e.target.value)}
                  rows={3}
                  placeholder="Enter peer-reviewed abstract text..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddArticleModal(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-500"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EVENT */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold">Add Academic Event</h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Event Title</label>
                <input
                  type="text"
                  value={evtTitle}
                  onChange={(e) => setEvtTitle(e.target.value)}
                  placeholder="e.g. 2026 Annual Management Sciences Research Colloquium"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Event Type</label>
                  <select
                    value={evtType}
                    onChange={(e) => setEvtType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                  >
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Public Lecture">Public Lecture</option>
                    <option value="Special Issue Deadline">Special Issue Deadline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={evtDate}
                    onChange={(e) => setEvtDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Venue</label>
                <input
                  type="text"
                  value={evtVenue}
                  onChange={(e) => setEvtVenue(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  value={evtDesc}
                  onChange={(e) => setEvtDesc(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-600 px-5 py-2 font-bold text-white hover:bg-amber-500"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CALENDAR ITEM */}
      {showAddCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold">Add Call for Papers / Deadline</h3>
              <button onClick={() => setShowAddCalendarModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCalendar} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Volume</label>
                  <input
                    type="number"
                    value={calVolume}
                    onChange={(e) => setCalVolume(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Issue</label>
                  <input
                    type="number"
                    value={calIssue}
                    onChange={(e) => setCalIssue(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Year</label>
                  <input
                    type="number"
                    value={calYear}
                    onChange={(e) => setCalYear(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Call Theme</label>
                <input
                  type="text"
                  value={calTheme}
                  onChange={(e) => setCalTheme(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Submission Deadline</label>
                  <input
                    type="text"
                    value={calDeadline}
                    onChange={(e) => setCalDeadline(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Expected Release</label>
                  <input
                    type="text"
                    value={calExpected}
                    onChange={(e) => setCalExpected(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCalendarModal(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-purple-600 px-5 py-2 font-bold text-white hover:bg-purple-500"
                >
                  Save Call for Papers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
