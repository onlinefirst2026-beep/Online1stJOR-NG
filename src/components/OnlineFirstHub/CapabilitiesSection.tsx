import React from 'react';
import { Search, BookOpen, Layers, Calendar, Lock, Globe, Sparkles, Cpu, ShieldCheck, Database, FileText, ArrowRight } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      icon: Search,
      title: 'Research Discovery',
      tag: 'Search & Taxonomy',
      desc: 'Multi-parameter research search engine across titles, authors, keywords, and publication years, with automatic Google Scholar and CrossRef metadata structuring.',
      accent: 'border-cyan-500/30 text-cyan-400',
      bgGlow: 'from-cyan-500/10 to-blue-500/5',
    },
    {
      icon: BookOpen,
      title: 'Digital Publishing',
      tag: 'Volumes, Issues & Articles',
      desc: 'Structured Volume → Issue → Article hierarchical catalogue with integrated PDF reading modals, direct citation generation (APA, Harvard, Chicago), and DOI linkages.',
      accent: 'border-blue-500/30 text-blue-400',
      bgGlow: 'from-blue-500/10 to-indigo-500/5',
    },
    {
      icon: Layers,
      title: 'Editorial Independence',
      tag: 'Staff-Controlled CMS',
      desc: 'An intuitive, code-free administrative management console enabling the editorial office to publish articles, update board members, and post announcements in real time.',
      accent: 'border-purple-500/30 text-purple-400',
      bgGlow: 'from-purple-500/10 to-pink-500/5',
    },
    {
      icon: Calendar,
      title: 'Events & Conferences',
      tag: 'Faculty Colloquiums',
      desc: 'Dedicated academic calendar to broadcast faculty public lectures, international management conferences, call for papers deadlines, and methodology workshops.',
      accent: 'border-amber-500/30 text-amber-400',
      bgGlow: 'from-amber-500/10 to-orange-500/5',
    },
    {
      icon: Lock,
      title: 'OJS Continuity',
      tag: 'Preserve Peer Review',
      desc: 'Seamless architectural integration that preserves JORMASS’s existing OJS manuscript submission and double-blind peer review workflow without disruption.',
      accent: 'border-emerald-500/30 text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-teal-500/5',
    },
    {
      icon: Globe,
      title: 'Modern Academic Identity',
      tag: 'International Standards',
      desc: 'Transparent publication ethics frameworks, CC BY 4.0 open-access licensing, verified ISSN (2536-7412) displays, and responsive mobile-first typography designed to support indexing readiness.',
      accent: 'border-sky-500/30 text-sky-400',
      bgGlow: 'from-sky-500/10 to-cyan-500/5',
    },
  ];

  return (
    <section id="capabilities" className="py-20 bg-[#050811] relative border-b border-slate-800/80 text-slate-100 overflow-hidden">
      {/* Subtle grid lines background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            <span>Core Platform Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            What OnlineFirst Is Building for JORMASS
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, modern scholarly publishing ecosystem built for sustained academic authority and long-term editorial freedom.
          </p>
        </div>

        {/* 6 Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className={`group rounded-2xl border ${cap.accent} bg-gradient-to-br ${cap.bgGlow} bg-slate-900/60 backdrop-blur-xl p-6 sm:p-7 space-y-4 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/15 transition-all" />

              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/80 border ${cap.accent} shadow-inner`}>
                  <cap.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 group-hover:text-cyan-400 transition">
                  0{idx + 1} // {cap.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-cyan-300 transition">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
