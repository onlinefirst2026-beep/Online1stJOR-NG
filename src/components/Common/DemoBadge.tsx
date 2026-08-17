import React from 'react';
import { Sparkles, Info, AlertCircle } from 'lucide-react';

export interface DemoBadgeProps {
  type?: 'preview' | 'event' | 'metrics' | 'doi' | 'archive' | 'announcement' | 'indexing' | 'custom';
  label?: string;
  tooltip?: string;
  size?: 'sm' | 'md' | 'xs';
  className?: string;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({
  type = 'preview',
  label,
  tooltip,
  size = 'xs',
  className = '',
}) => {
  let defaultLabel = 'DEMO PREVIEW';
  let defaultTooltip = 'Illustrative preview — final details to be confirmed by JORMASS';
  let badgeClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/30';

  switch (type) {
    case 'event':
      defaultLabel = 'DEMO EVENT';
      defaultTooltip = 'Illustrative event showing future event management capability — final details to be supplied by JORMASS';
      badgeClasses = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      break;
    case 'metrics':
      defaultLabel = 'DEMO METRICS';
      defaultTooltip = 'Illustrative data shown to demonstrate the future analytics interface. Final values will use verified JORMASS publication data.';
      badgeClasses = 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      break;
    case 'doi':
      defaultLabel = 'DEMO DOI';
      defaultTooltip = 'Illustrative format only — not an assigned JORMASS DOI';
      badgeClasses = 'bg-slate-500/20 text-slate-300 border-slate-600/40';
      break;
    case 'announcement':
      defaultLabel = 'DEMO ANNOUNCEMENT';
      defaultTooltip = 'Illustrative example — final deadline/content to be supplied by JORMASS';
      badgeClasses = 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      break;
    case 'archive':
      defaultLabel = 'ARCHIVE PREVIEW';
      defaultTooltip = 'Previous JORMASS volumes will be migrated into this searchable archive as part of the selected implementation package';
      badgeClasses = 'bg-teal-500/15 text-teal-300 border-teal-500/30';
      break;
    case 'indexing':
      defaultLabel = 'DEMO PREVIEW';
      defaultTooltip = 'Proposed presentation — status and verification links to be confirmed by JORMASS';
      badgeClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      break;
    case 'custom':
      defaultLabel = label || 'DEMO PREVIEW';
      break;
  }

  const finalLabel = label || defaultLabel;
  const finalTooltip = tooltip || defaultTooltip;

  const sizeClasses =
    size === 'xs'
      ? 'text-[10px] px-2 py-0.5 tracking-wider'
      : size === 'sm'
      ? 'text-xs px-2.5 py-0.5 tracking-wide'
      : 'text-xs px-3 py-1 font-semibold';

  return (
    <span
      title={finalTooltip}
      className={`inline-flex items-center gap-1 font-mono font-bold uppercase rounded-md border backdrop-blur-xs select-none ${sizeClasses} ${badgeClasses} ${className}`}
    >
      <Sparkles className="h-2.5 w-2.5 opacity-80 shrink-0" />
      <span>{finalLabel}</span>
    </span>
  );
};
