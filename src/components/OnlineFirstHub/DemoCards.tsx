import React from 'react';
import { ThemeVariant } from '../../types';
import { Demo1Thumbnail, Demo2Thumbnail, Demo3Thumbnail } from './DemoMockupPreviews';
import {
  ExternalLink,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Layers,
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
        'Bound journal spine motif & left boundary rail',
        'Current issue prominence with dual-column scholarly rail',
        'Heritage deep navy, parchment ivory & gold/emerald accents',
      ],
      thumbnailComponent: <Demo1Thumbnail />,
      accentColor: 'border-[#314A68] hover:border-[#35D6FF]',
      glowColor: 'from-[#35D6FF]/15 to-[#14263D]/5',
      primaryBtnColor: 'bg-gradient-to-r from-[#35D6FF] to-[#3182CE] text-[#0A121E] font-black hover:shadow-[0_0_15px_rgba(53,214,255,0.4)]',
      badgeStyle: 'bg-[#14263D] text-[#7BE7FF] border-[#35D6FF]/30',
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
        'Contemporary high-contrast editorial layout with cyan accents',
      ],
      thumbnailComponent: <Demo2Thumbnail />,
      accentColor: 'border-[#35D6FF]/50 hover:border-[#7BE7FF]',
      glowColor: 'from-[#35D6FF]/20 to-[#14263D]/10',
      primaryBtnColor: 'bg-gradient-to-r from-[#35D6FF] via-[#56E0FF] to-[#3182CE] text-[#0A121E] font-black hover:shadow-[0_0_20px_rgba(53,214,255,0.5)]',
      badgeStyle: 'bg-[#35D6FF]/15 text-[#35D6FF] border-[#35D6FF]/40',
      btnLabel: 'Explore Demo 2',
    },
    {
      id: 'demo3' as ThemeVariant,
      title: 'Scholarly Discovery Platform',
      tagline: 'Taylor & Francis–inspired discovery experience with search-first research browsing, taxonomy filters, and structured utility layout.',
      badge: 'Research Discovery',
      features: [
        'Prominent multi-field search engine with title, author, and DOI scoping',
        'Filter-driven research article grid with Year, Subject & Access filters',
        'Deep Navy (#20255C), Royal Purple (#6B3F74) & Pale Lavender (#E2E5F3) palette',
        'Refined typography with Warm Gold (#FFC84D) & Rust Orange (#B33600) accents',
      ],
      thumbnailComponent: <Demo3Thumbnail />,
      accentColor: 'border-[#20255C]/60 hover:border-[#6B3F74]',
      glowColor: 'from-[#20255C]/20 to-[#6B3F74]/10',
      primaryBtnColor: 'bg-gradient-to-r from-[#20255C] via-[#6B3F74] to-[#B33600] text-white font-bold hover:shadow-[0_0_15px_rgba(107,63,116,0.4)]',
      badgeStyle: 'bg-[#20255C] text-[#FFC84D] border-[#6B3F74]/40',
      btnLabel: 'Explore Demo 3',
    },
  ];

  return (
    <div className="space-y-6 text-[#F5FAFF]">
      {/* 3 Interactive Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {concepts.map((c) => {
          const isSelected = selectedDemo === c.id;
          const demoUrl = getDemoUrl(c.id);
          const isExt = isExternalUrl(demoUrl);

          return (
            <div
              key={c.id}
              className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-[#14263D]/70 backdrop-blur-xl relative ${
                isSelected
                  ? 'border-[#35D6FF] ring-2 ring-[#35D6FF]/50 shadow-2xl shadow-[#35D6FF]/20'
                  : `${c.accentColor} hover:shadow-xl hover:shadow-[#35D6FF]/10 hover:-translate-y-1`
              }`}
            >
              {/* Selected Status Ribbon */}
              {isSelected && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-[#35D6FF] text-[#0A121E] px-3 py-1 text-xs font-black shadow-lg">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Selected Design</span>
                </div>
              )}

              {/* Top Section: Visual Preview Window */}
              <div className="p-4 sm:p-5 pb-0">
                <div className="relative rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-md border border-[#223753]">
                  {c.thumbnailComponent}

                  {/* Hover Overlay with Quick Explore Action */}
                  <div
                    onClick={() => onSelectDemo(c.id)}
                    className="absolute inset-0 bg-[#0E1A2B]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <button className="inline-flex items-center gap-2 rounded-xl bg-[#F5FAFF] text-[#0A121E] font-black px-4 py-2 text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="h-4 w-4 text-[#007799]" />
                      <span>Launch Full Demo Prototype</span>
                    </button>
                    <span className="text-[10px] text-[#B7C6D8] font-medium">Click to interact with all pages</span>
                  </div>
                </div>
              </div>

              {/* Middle Section: Concept Info & Features */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-mono-clean font-bold uppercase tracking-wider ${c.badgeStyle}`}>
                      {c.badge}
                    </span>
                    <span className="text-xs font-mono-clean text-[#B7C6D8]">
                      Concept {c.id.toUpperCase().replace('DEMO', '0')}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5FAFF] group-hover:text-[#35D6FF] transition">
                    {c.title}
                  </h3>

                  <p className="text-sm text-[#B7C6D8] leading-relaxed">
                    {c.tagline}
                  </p>

                  {/* Feature Bullets */}
                  <div className="pt-2 space-y-2 border-t border-[#223753]">
                    <p className="text-xs font-mono-clean font-bold uppercase text-[#7BE7FF]">
                      Design Characteristics:
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#B7C6D8]">
                      {c.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="text-[#35D6FF] text-xs mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions: Explore Demo Button + Select Design Toggle */}
                <div className="pt-4 border-t border-[#223753] space-y-2.5">
                  <button
                    onClick={() => onSelectDemo(c.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer min-h-[44px] ${c.primaryBtnColor}`}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{c.btnLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {onChooseDesign && (
                    <button
                      onClick={() => onChooseDesign(c.id)}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs sm:text-sm font-bold transition-all border cursor-pointer min-h-[44px] ${
                        isSelected
                          ? 'bg-[#14263D] border-[#35D6FF] text-[#7BE7FF]'
                          : 'bg-[#0E1A2B]/60 border-[#314A68] hover:bg-[#223753] hover:border-[#35D6FF]/50 text-[#D8F3FF]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-4 w-4 text-[#35D6FF]" />
                          <span>Design Concept Selected</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-[#7BE7FF]" />
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

      {/* About Demo Content Note */}
      <div className="rounded-xl bg-[#14263D]/80 border border-[#223753] p-4 text-sm text-[#B7C6D8] flex items-start gap-3">
        <span className="rounded-md bg-[#35D6FF]/15 text-[#35D6FF] border border-[#35D6FF]/30 px-2 py-0.5 font-mono-clean text-xs font-bold uppercase tracking-wider shrink-0 mt-0.5">
          About Demo Content
        </span>
        <p className="leading-relaxed">
          The design concepts combine verified information from the current JORMASS website with clearly identified illustrative content used to demonstrate proposed functionality such as events management, publication analytics, advanced metadata, and future publishing workflows. All final journal data will be confirmed with JORMASS before production launch.
        </p>
      </div>
    </div>
  );
};
