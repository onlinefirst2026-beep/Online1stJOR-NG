import React from 'react';
import { ArrowLeft, Sparkles, Check, BookOpen, Layers, CheckCircle2, ChevronDown, ExternalLink } from 'lucide-react';
import { ThemeVariant, JournalPage } from '../../types';

interface DemoFloatingBarProps {
  currentTheme: ThemeVariant;
  currentPage: JournalPage;
  isSelected?: boolean;
  onBackToHub: () => void;
  onSwitchDemo: (theme: ThemeVariant) => void;
  onSelectConcept?: (theme: ThemeVariant) => void;
  onNavigatePage?: (page: JournalPage) => void;
}

export const DemoFloatingBar: React.FC<DemoFloatingBarProps> = ({
  currentTheme,
  currentPage,
  isSelected = false,
  onBackToHub,
  onSwitchDemo,
  onSelectConcept,
  onNavigatePage,
}) => {
  const demoLabels: Record<ThemeVariant, { name: string; tag: string }> = {
    demo1: { name: 'Demo 1', tag: 'Heritage Academic' },
    demo2: { name: 'Demo 2', tag: 'Contemporary Research' },
    demo3: { name: 'Demo 3', tag: 'Editorial Digital Library' },
  };

  return (
    <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 text-slate-200 py-2.5 px-4 sm:px-6 shadow-2xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-xs">
        {/* Left: Return to Hub */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHub}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 px-3 py-1.5 font-bold text-cyan-300 hover:bg-cyan-900/90 hover:text-white transition shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>← Back to OnlineFirst Hub</span>
          </button>

          <span className="hidden sm:inline text-slate-600">|</span>

          {/* Current concept label */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Concept Preview:</span>
            <span className="font-bold text-cyan-300">
              {demoLabels[currentTheme].name} — {demoLabels[currentTheme].tag}
            </span>
          </div>
        </div>

        {/* Center: Quick Demo Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <span className="hidden md:inline px-2 text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Compare:
          </span>
          <button
            onClick={() => onSwitchDemo('demo1')}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              currentTheme === 'demo1'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Demo 1: Heritage Academic"
          >
            Demo 1
          </button>
          <button
            onClick={() => onSwitchDemo('demo2')}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              currentTheme === 'demo2'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Demo 2: Contemporary Research"
          >
            Demo 2
          </button>
          <button
            onClick={() => onSwitchDemo('demo3')}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              currentTheme === 'demo3'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Demo 3: Editorial Digital Library"
          >
            Demo 3
          </button>
        </div>

        {/* Right: Select Design Button */}
        <div className="flex items-center gap-2">
          {onSelectConcept && (
            <button
              onClick={() => onSelectConcept(currentTheme)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-bold transition shadow-sm ${
                isSelected
                  ? 'bg-emerald-600 text-white border border-emerald-400/50 ring-2 ring-emerald-500/40'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 border border-cyan-400/30'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="h-3.5 w-3.5 text-white" />
                  <span>Selected Design</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                  <span>Select This Design</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
