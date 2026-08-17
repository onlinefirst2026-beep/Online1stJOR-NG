import React from 'react';
import { ThemeVariant } from '../../types';
import { Demo1Thumbnail, Demo2Thumbnail, Demo3Thumbnail } from './DemoMockupPreviews';
import {
  ExternalLink,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Layers,
  Library,
  ArrowRight,
  Check,
  Eye,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { config, getDemoUrl, isExternalUrl } from '../../lib/config';

interface DemoCardsProps {
  onSelectDemo: (theme: ThemeVariant) => void;
  selectedDemo?: ThemeVariant | null;
  onChooseDesign?: (theme: ThemeVariant) => void;
}

export const DemoCards: React.FC<DemoCardsProps> = ({
  onSelectDemo,
  selectedDemo = null,
  onChooseDesign,
}) => {
  const concepts = [
    {
      id: 'demo1' as ThemeVariant,
      title: 'Heritage Academic',
      tagline: 'Traditional scholarly authority reimagined for a modern digital journal.',
      badge: 'Editorial Authority',
      features: [
        'Editorial serif typography & formal institutional hierarchy',
        'Physical bound journal spine motif & left boundary rail',
        'Current issue prominence with dual-column scholarly rail',
        'Heritage deep navy, parchment ivory & gold/emerald accents',
      ],
      thumbnailComponent: <Demo1Thumbnail />,
      accentColor: 'border-amber-500/40 hover:border-amber-400',
      glowColor: 'from-amber-500/20 to-orange-500/5',
      primaryBtnColor: 'bg-amber-600 hover:bg-amber-500 text-white',
      badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      btnLabel: 'Explore Demo 1',
    },
    {
      id: 'demo2' as ThemeVariant,
      title: 'Contemporary Research',
      tagline: 'A modern research platform built around discovery, search and academic engagement.',
      badge: 'Discovery & Engagement',
      features: [
        'Instant multi-field search engine across research topics',
        'Modern research article cards with DOI & citation links',
        'Interactive topical taxonomy tabs (Agribusiness, Finance, Policy)',
        'Contemporary high-contrast editorial layout with teal accents',
      ],
      thumbnailComponent: <Demo2Thumbnail />,
      accentColor: 'border-teal-500/40 hover:border-teal-400',
      glowColor: 'from-teal-500/20 to-cyan-500/5',
      primaryBtnColor: 'bg-teal-600 hover:bg-teal-500 text-white',
      badgeStyle: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      btnLabel: 'Explore Demo 2',
    },
    {
      id: 'demo3' as ThemeVariant,
      title: 'Editorial Digital Library',
      tagline: 'A refined digital-library experience focused on publications, archives and long-term scholarly discovery.',
      badge: 'Archival Focus',
      features: [
        'Comprehensive publication volume & issue catalogue',
        'Centered institutional masthead with archival elegance',
        'Typographic editorial presentation with rich negative space',
        'Direct volume archive filtering & high-contrast reading',
      ],
      thumbnailComponent: <Demo3Thumbnail />,
      accentColor: 'border-cyan-500/40 hover:border-cyan-400',
      glowColor: 'from-cyan-500/20 to-blue-500/5',
      primaryBtnColor: 'bg-cyan-600 hover:bg-cyan-500 text-white',
      badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      btnLabel: 'Explore Demo 3',
    },
  ];

  return (
    <section id="demos" className="py-24 bg-[#070b16] relative border-b border-slate-800/80 text-slate-100 overflow-hidden">
      {/* Background neon ambient effects */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive Design Blueprints</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Explore 3 Tailored Digital Directions
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Each concept represents a complete, functional architectural prototype with working articles, archive browsing, editorial board listings, and events management.
          </p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {concepts.map((c) => {
            const isSelected = selectedDemo === c.id;
            const demoUrl = getDemoUrl(c.id);
            const isExt = isExternalUrl(demoUrl);

            return (
              <div
                key={c.id}
                className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-slate-900/70 backdrop-blur-xl relative ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-2xl shadow-cyan-500/20'
                    : `${c.accentColor} hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1.5`
                }`}
              >
                {/* Selected Status Ribbon */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-emerald-500 text-slate-950 px-3 py-1 text-xs font-black shadow-lg">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Selected Design</span>
                  </div>
                )}

                {/* Top Section: Visual Preview Window */}
                <div className="p-4 sm:p-5 pb-0">
                  <div className="relative rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-md">
                    {c.thumbnailComponent}

                    {/* Hover Overlay with Quick Explore Action */}
                    <div
                      onClick={() => onSelectDemo(c.id)}
                      className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
                    >
                      <button className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-950 font-bold px-4 py-2 text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="h-4 w-4 text-cyan-600" />
                        <span>Launch Full Demo Prototype</span>
                      </button>
                      <span className="text-[10px] text-slate-300 font-medium">Click to interact with all pages</span>
                    </div>
                  </div>
                </div>

                {/* Middle Section: Concept Info & Features */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${c.badgeStyle}`}>
                        {c.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Concept {c.id.toUpperCase().replace('DEMO', '0')}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-cyan-300 transition">
                      {c.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {c.tagline}
                    </p>

                    {/* Route / Target domain badge */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
                      <Globe className="h-3 w-3 text-cyan-400 shrink-0" />
                      <span className="truncate">
                        Target: {isExt ? demoUrl.replace(/^https?:\/\//, '') : `Internal route (${demoUrl})`}
                      </span>
                    </div>

                    {/* Feature Bullets */}
                    <div className="pt-2 space-y-2 border-t border-slate-800/80">
                      <p className="text-[11px] font-mono font-bold uppercase text-slate-400">
                        Design Characteristics:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {c.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="text-cyan-400 text-xs mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Actions: Explore Demo Button + Select Design Toggle */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                    <button
                      onClick={() => onSelectDemo(c.id)}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all shadow-md ${c.primaryBtnColor}`}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>{c.btnLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    {onChooseDesign && (
                      <button
                        onClick={() => onChooseDesign(c.id)}
                        className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 px-4 text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                            : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Design Concept Selected</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                            <span>Select as Preferred Concept</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
