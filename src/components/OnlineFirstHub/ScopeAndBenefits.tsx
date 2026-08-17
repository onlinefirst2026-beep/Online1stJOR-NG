import React from 'react';
import { ShieldCheck, Search, Users, Database, Globe, Smartphone, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const ScopeAndBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Institutional Academic Prestige',
      desc: 'Distinctive visual identity reflecting the College of Management Sciences, MOUAU Umudike, with verified ISSN metadata, double-blind review transparency, and COPE-aligned ethics.',
    },
    {
      icon: Search,
      title: 'Real-Time Research Discovery',
      desc: 'Multi-parameter search engine (author, title, keywords, volume, year) with structured scholarly metadata for seamless Google Scholar, CrossRef, and institutional indexing.',
    },
    {
      icon: Users,
      title: 'Frictionless Author Journey',
      desc: 'Clear submission guidelines, transparent publication fee schedules, downloadable manuscript preparation templates, and direct links to the active OJS submission portal.',
    },
    {
      icon: Database,
      title: 'Permanent Archival Hierarchy',
      desc: 'Structured Volume → Issue → Article data model enabling the editorial team to progressively migrate historic publications and publish future issues with DOI citations.',
    },
    {
      icon: Globe,
      title: 'Conferences & Events Broadcasting',
      desc: 'Dedicated academic events module to announce faculty public lectures, international management conferences, call for papers deadlines, and methodology workshops.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Cross-Device Architecture',
      desc: 'Flawless reading experience across desktop workstations, tablets, and smartphones, optimized for international academic researchers and mobile peer reviewers.',
    },
  ];

  return (
    <section className="py-20 bg-[#070b16] border-b border-slate-800/80 text-slate-100 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Strategic Value Proposition</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why Upgrade JORMASS with OnlineFirst
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            The redesign transitions JORMASS from a default journal-management interface into a modern, high-impact scholarly publishing platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-7 space-y-3.5 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 border border-slate-700 text-cyan-400 shadow-inner">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                {b.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
