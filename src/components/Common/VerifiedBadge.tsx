import React from 'react';
import { CheckCircle, Clock, AlertCircle, Sparkles } from 'lucide-react';

interface VerifiedBadgeProps {
  status: 'Verified' | 'Status to be confirmed' | 'Verification required' | 'Under Editorial Verification' | 'Pending Application';
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ status, className = '' }) => {
  if (status === 'Verified') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200 ${className}`}
      >
        <CheckCircle className="h-3 w-3 text-emerald-600" />
        <span>Verified</span>
      </span>
    );
  }

  if (status === 'Verification required') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200 ${className}`}
      >
        <Clock className="h-3 w-3 text-amber-600" />
        <span>Verification required</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200 ${className}`}
    >
      <Sparkles className="h-2.5 w-2.5 text-slate-500" />
      <span>Status to be confirmed</span>
    </span>
  );
};
