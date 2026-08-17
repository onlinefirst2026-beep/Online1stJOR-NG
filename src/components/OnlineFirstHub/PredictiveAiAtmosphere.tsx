import React from 'react';

export const PredictiveAiAtmosphere: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep midnight steel gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1524] via-[#0E1A2B] to-[#0A121E]" />

      {/* 2. Blueprint Architectural Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" />

      {/* 3. Subtle Dot Matrix Texture */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40" />

      {/* 4. Ambient Orbital Light Glows (Cool Blue & Electric Cyan) */}
      <div className="absolute -top-32 left-1/4 w-[700px] h-[500px] bg-[#35D6FF]/10 rounded-full blur-[140px] animate-pulse-glow" />
      <div className="absolute top-1/3 right-[-100px] w-[600px] h-[600px] bg-[#223753]/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-100px] left-1/3 w-[800px] h-[600px] bg-[#14263D]/60 rounded-full blur-[150px]" />

      {/* 5. Minimal Floating Predictive UI Wireframes & Blueprint Nodes */}
      {/* Top Right Floating Architecture Blueprint Card */}
      <div className="hidden lg:block absolute top-28 right-12 w-64 p-3.5 rounded-2xl border border-[#35D6FF]/20 bg-[#14263D]/40 backdrop-blur-md animate-float-slow opacity-60">
        <div className="flex items-center justify-between border-b border-[#35D6FF]/15 pb-1.5 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35D6FF] animate-pulse" />
            <span className="font-mono-clean text-[10px] font-bold text-[#7BE7FF] uppercase tracking-wider">
              Architecture Blueprint
            </span>
          </div>
          <span className="font-mono-clean text-[9px] text-[#B7C6D8]">JORMASS</span>
        </div>
        <div className="space-y-1.5 font-mono-clean text-[10px] text-[#B7C6D8]">
          <div className="flex justify-between">
            <span className="text-[#D8F3FF]">SYSTEM SCHEMA</span>
            <span className="text-[#35D6FF]">ONLINEFIRST</span>
          </div>
          <div className="w-full bg-[#223753] h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#35D6FF] to-[#7BE7FF] h-full w-full" />
          </div>
        </div>
      </div>

      {/* Bottom Left Floating OJS Continuity Node */}
      <div className="hidden xl:block absolute bottom-32 left-10 w-60 p-3.5 rounded-2xl border border-[#56E0FF]/20 bg-[#14263D]/40 backdrop-blur-md animate-float-slow-reverse opacity-55">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 rounded-sm bg-[#35D6FF]/50 border border-[#35D6FF]" />
          <span className="font-mono-clean text-[10px] font-bold text-[#7BE7FF] tracking-wider">
            OJS CONTINUITY BRIDGE
          </span>
        </div>
        <p className="font-mono-clean text-[9px] text-[#B7C6D8] leading-tight">
          SEAMLESS SUBMISSION & PEER REVIEW PRESERVATION
        </p>
      </div>

      {/* 6. Subtle Geometric AI Wave / Orbit Rings SVG */}
      <svg
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] opacity-[0.07] stroke-[#35D6FF]"
        fill="none"
        viewBox="0 0 1200 800"
      >
        <ellipse cx="600" cy="400" rx="550" ry="240" strokeWidth="1" strokeDasharray="4 8" />
        <ellipse cx="600" cy="400" rx="420" ry="180" strokeWidth="1" />
        <ellipse cx="600" cy="400" rx="280" ry="120" strokeWidth="1" strokeDasharray="6 6" />
        <path d="M100 400 Q 350 250, 600 400 T 1100 400" strokeWidth="1.5" strokeDasharray="2 4" />
        <circle cx="600" cy="400" r="3" fill="#35D6FF" />
        <circle cx="350" cy="250" r="2" fill="#7BE7FF" />
        <circle cx="850" cy="550" r="2" fill="#7BE7FF" />
      </svg>
    </div>
  );
};
