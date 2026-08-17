import React from 'react';
import { BookOpen, Search, FileText, CheckCircle2, ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const Demo1Thumbnail: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-64 bg-[#fdfbf7] text-[#0d1b2a] rounded-xl overflow-hidden shadow-inner border border-amber-900/30 flex flex-col font-serif select-none pointer-events-none relative">
      {/* Mock Browser Top Bar */}
      <div className="bg-[#0d1b2a] text-slate-300 px-3 py-1.5 flex items-center justify-between text-[9px] font-sans border-b border-amber-500/20">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-[9px] text-amber-300 ml-1">jormass-demo1.previewnest.site</span>
        </div>
        <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">Heritage Academic</span>
      </div>

      {/* Main Mockup Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Physical Bound Journal Spine Motif on left */}
        <div className="w-3.5 bg-[#0d1b2a] h-full flex flex-col justify-between items-center py-2 border-r border-amber-500/40 shrink-0">
          <div className="w-1.5 h-6 bg-amber-400/40 rounded-xs" />
          <span className="text-[6px] font-sans uppercase tracking-widest text-amber-300/80 rotate-90 whitespace-nowrap origin-center">VOL 11</span>
          <div className="w-1.5 h-6 bg-amber-400/40 rounded-xs" />
        </div>

        {/* Mock Content */}
        <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#fdfbf7] to-[#f4eee1]">
          {/* Header */}
          <div className="border-b border-amber-900/20 pb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded bg-[#0d1b2a] text-amber-400 flex items-center justify-center font-bold text-[8px]">J</div>
              <div>
                <p className="text-[9px] font-bold tracking-tight text-[#0d1b2a] leading-none">Journal of Research in Management & Social Sciences</p>
                <p className="text-[7px] text-neutral-600 font-sans">COLMAS • Michael Okpara University of Agriculture, Umudike</p>
              </div>
            </div>
            <span className="text-[7px] font-sans bg-emerald-800 text-white px-1.5 py-0.5 rounded font-semibold">Peer-Reviewed</span>
          </div>

          {/* Current Volume Hero Box */}
          <div className="bg-[#0d1b2a] text-white p-2 rounded-lg my-1 flex items-center justify-between border border-amber-500/30 shadow-xs">
            <div className="space-y-0.5">
              <span className="text-[7px] font-mono text-amber-300 font-bold uppercase tracking-wider">CURRENT ISSUE · VOL. 11 NO. 2 (2025)</span>
              <p className="text-[8px] font-bold text-amber-100 line-clamp-1">Machine Learning Algorithms for Detecting Tax Fraud</p>
            </div>
            <span className="text-[7px] font-sans bg-amber-600 px-2 py-0.5 rounded text-white font-bold shrink-0 ml-2">Read Issue</span>
          </div>

          {/* Dual Column Layout: Articles on left, Scholarly Rail on right */}
          <div className="grid grid-cols-3 gap-2 flex-1 overflow-hidden pt-1">
            <div className="col-span-2 space-y-1">
              <p className="text-[7px] font-sans font-bold uppercase text-neutral-500">Current Publications</p>
              <div className="bg-white p-1.5 rounded border border-neutral-200 shadow-xs space-y-0.5">
                <span className="text-[6px] font-sans text-amber-800 font-bold bg-amber-50 px-1 rounded">Accounting & Taxation</span>
                <p className="text-[7.5px] font-bold text-neutral-900 line-clamp-1">Environmental Taxation and Sustainable Development in Oil Firms</p>
                <p className="text-[6.5px] font-sans text-neutral-500">O. E. Alpheaus, I. P. Ujah, J. U. Ihendinihu • pp. 183–192</p>
              </div>
            </div>

            {/* Scholarly Right Rail */}
            <div className="bg-neutral-100/90 p-1.5 rounded border border-neutral-200 font-sans text-[6.5px] space-y-1">
              <p className="font-bold text-[#0d1b2a] uppercase text-[6px]">Journal Identity</p>
              <p className="text-neutral-600 font-semibold">ISSN: 2536-7412</p>
              <p className="text-neutral-600">Biannual (June & Dec)</p>
              <p className="text-emerald-700 font-bold">CC BY 4.0 Open Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Demo2Thumbnail: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-64 bg-slate-900 text-slate-100 rounded-xl overflow-hidden shadow-inner border border-teal-500/30 flex flex-col font-sans select-none pointer-events-none relative">
      {/* Mock Browser Top Bar */}
      <div className="bg-slate-950 text-slate-300 px-3 py-1.5 flex items-center justify-between text-[9px] border-b border-teal-500/20">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-[9px] text-teal-300 ml-1">jormass-demo2.previewnest.site</span>
        </div>
        <span className="text-[8px] bg-teal-500/20 text-teal-300 px-1.5 py-0.2 rounded">Contemporary Research</span>
      </div>

      {/* Main Mockup Body */}
      <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950">
        {/* Modern Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-lg bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center font-bold text-[8px] shadow">J</div>
            <div>
              <p className="text-[9px] font-bold tracking-tight text-white leading-none">JORMASS Research</p>
              <p className="text-[7px] text-teal-300">Journal of Research in Management & Social Sciences</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 px-2 py-0.5 rounded text-[7px] text-slate-400">
            <Search className="h-2.5 w-2.5 text-teal-400" />
            <span>Search articles...</span>
          </div>
        </div>

        {/* Split Hero: Left Scope & Stats / Right Current Feature */}
        <div className="grid grid-cols-2 gap-2 my-1 bg-slate-800/40 p-2 rounded-lg border border-slate-700/60">
          <div className="space-y-1">
            <span className="text-[6.5px] font-bold text-teal-400 uppercase tracking-wider bg-teal-950/80 px-1.5 py-0.2 rounded border border-teal-500/30">MOUAU COLMAS</span>
            <p className="text-[8.5px] font-bold text-white leading-tight">Empirical Research in Management & Social Sciences</p>
            <div className="flex gap-1 pt-0.5">
              <span className="text-[6.5px] bg-teal-600 px-1.5 py-0.5 rounded text-white font-bold">Submit Paper</span>
              <span className="text-[6.5px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-200">Browse Topics</span>
            </div>
          </div>

          <div className="bg-slate-900/90 p-1.5 rounded border border-teal-500/40 space-y-0.5">
            <span className="text-[6px] font-mono text-teal-300 font-bold uppercase">CURRENT ISSUE · VOL. 11 NO. 2</span>
            <p className="text-[7.5px] font-bold text-white line-clamp-1">Machine Learning Algorithms for Detecting Tax Fraud</p>
            <p className="text-[6.5px] text-slate-400">C. J. Obizuo, J. U. Ihendinihu, Q. U. Chigbo et al.</p>
            <span className="text-[6px] bg-teal-500/20 text-teal-300 px-1 rounded font-mono">Published Dec 11, 2025</span>
          </div>
        </div>

        {/* Interactive Taxonomy Category Tabs */}
        <div className="space-y-1">
          <div className="flex gap-1 overflow-hidden">
            <span className="text-[6.5px] bg-teal-500/30 text-teal-200 px-1.5 py-0.5 rounded font-bold border border-teal-500/40">Taxation</span>
            <span className="text-[6.5px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Finance</span>
            <span className="text-[6.5px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Economics</span>
            <span className="text-[6.5px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Public Policy</span>
          </div>
          <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700 text-[7px] flex justify-between items-center">
            <span className="text-slate-300 font-medium truncate">Financial Derivatives Inflows & Firm Performance</span>
            <span className="text-teal-400 font-bold shrink-0 ml-1">PDF ⬇</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Demo3Thumbnail: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-64 bg-[#fafaf9] text-stone-900 rounded-xl overflow-hidden shadow-inner border border-stone-300 flex flex-col font-serif select-none pointer-events-none relative">
      {/* Mock Browser Top Bar */}
      <div className="bg-[#1c1917] text-stone-300 px-3 py-1.5 flex items-center justify-between text-[9px] font-sans border-b border-stone-700">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-[9px] text-amber-300 ml-1">jormass-demo3.previewnest.site</span>
        </div>
        <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-sans">Digital Library</span>
      </div>

      {/* Main Mockup Body */}
      <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#fafaf9] to-[#f2efeb]">
        {/* Centered Archival Masthead */}
        <div className="text-center space-y-0.5 border-b border-stone-200 pb-1.5">
          <span className="text-[6.5px] uppercase font-sans tracking-widest font-bold text-amber-900">COLMAS DIGITAL ARCHIVE</span>
          <p className="text-[10px] font-extrabold tracking-tight text-[#1c1917] leading-tight">Journal of Research in Management & Social Sciences</p>
          <p className="text-[6.5px] font-sans text-stone-500 font-semibold">ISSN: 2536-7412 (Print & Online)</p>
        </div>

        {/* Discovery Search Module embedded right below header */}
        <div className="bg-white p-1.5 rounded-lg border border-stone-300 shadow-xs flex items-center justify-between font-sans text-[7px] my-1">
          <div className="flex items-center gap-1 text-stone-400">
            <Search className="h-3 w-3 text-amber-800" />
            <span>Search library archive (author, title, volume)...</span>
          </div>
          <span className="bg-stone-900 text-white px-2 py-0.5 rounded font-bold">Catalogue Search</span>
        </div>

        {/* Archival Issue Cover Art & Article Listings */}
        <div className="grid grid-cols-3 gap-2 flex-1 overflow-hidden">
          {/* Issue Book Cover Mock */}
          <div className="bg-[#2b1019] text-white p-1.5 rounded border border-amber-700/40 flex flex-col justify-between shadow-xs">
            <div className="space-y-0.5">
              <span className="text-[5.5px] font-sans text-amber-300 uppercase tracking-widest">VOLUME 11</span>
              <p className="text-[7.5px] font-bold text-amber-100 leading-tight">Issue No. 2 (2025)</p>
            </div>
            <div className="pt-2 border-t border-amber-700/30 text-[6px] font-sans text-amber-300/80">
              MOUAU Press
            </div>
          </div>

          {/* Typography-first catalog entries */}
          <div className="col-span-2 space-y-1 font-serif">
            <div className="bg-white p-1.5 rounded border border-stone-200 space-y-0.5">
              <p className="text-[7.5px] font-bold text-stone-900 line-clamp-1">Machine Learning Algorithms for Detecting Tax Fraud</p>
              <p className="text-[6.5px] font-sans text-stone-500">C. J. Obizuo et al. • pp. 173–182</p>
            </div>
            <div className="bg-white p-1.5 rounded border border-stone-200 space-y-0.5">
              <p className="text-[7.5px] font-bold text-stone-900 line-clamp-1">Environmental Taxation & Sustainable Development in Oil Firms</p>
              <p className="text-[6.5px] font-sans text-stone-500">O. E. Alpheaus et al. • pp. 183–192</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
