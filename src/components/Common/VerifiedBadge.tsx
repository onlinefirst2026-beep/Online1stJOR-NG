import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  status: 'Verified' | 'Under Editorial Verification' | 'Pending Application';
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ status, className = '' }) => {
  if (status === 'Verified') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200 ${className}`}
      >
        <CheckCircle className="h-3 w-3 text-emerald-600" />
        <span>Verified Index</span>
      </span>
    );
  }

  if (status === 'Under Editorial Verification') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200 ${className}`}
      >
        <Clock className="h-3 w-3 text-amber-600" />
        <span>Under Verification</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700 border border-neutral-200 ${className}`}
    >
      <AlertCircle className="h-3 w-3 text-neutral-500" />
      <span>Pending Application</span>
    </span>
  );
};
