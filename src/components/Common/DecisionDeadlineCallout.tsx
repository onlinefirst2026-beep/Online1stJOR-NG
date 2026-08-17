import React from 'react';
import { Calendar, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DECISION_DEADLINE } from '../../data/journalData';

interface DecisionDeadlineCalloutProps {
  variant?: 'banner' | 'card' | 'compact' | 'footer';
  onSelectConcept?: () => void;
  className?: string;
}

export const DecisionDeadlineCallout: React.FC<DecisionDeadlineCalloutProps> = ({
  variant = 'card',
  onSelectConcept,
  className = '',
}) => {
  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 px-3.5 py-1.5 text-xs text-amber-950 shadow-xs ${className}`}
      >
        <Calendar className="h-3.5 w-3.5 text-amber-800 shrink-0" />
        <span className="font-semibold">Decision Deadline:</span>
        <span className="font-bold text-amber-900">{DECISION_DEADLINE}</span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        className={`rounded-xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-amber-100/60 to-amber-50/90 p-5 shadow-xs ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-800 text-white shadow-xs">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-200/80 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-900">
                  Decision Deadline
                </span>
                <span className="font-serif font-bold text-neutral-900">
                  {DECISION_DEADLINE}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-700 max-w-2xl leading-relaxed">
                Please confirm your preferred design direction and implementation package by <strong>{DECISION_DEADLINE}</strong> to enable OnlineFirst to proceed with refinement, CMS setup, and production deployment.
              </p>
              <p className="mt-1 text-[11px] text-neutral-500 italic">
                If additional internal consultation is required, please contact OnlineFirst before the decision date so that the project timeline can be adjusted accordingly.
              </p>
            </div>
          </div>
          {onSelectConcept && (
            <button
              onClick={onSelectConcept}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-neutral-800 transition"
            >
              <span>Confirm Selection</span>
              <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Standard Card view
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-amber-200 bg-white p-6 shadow-md ${className}`}
    >
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-amber-100/50 blur-xl" />
      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-800 text-white shadow-sm">
          <Calendar className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-900">
              Decision Deadline
            </span>
            <span className="font-serif text-lg font-bold text-neutral-900">
              {DECISION_DEADLINE}
            </span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-700">
            To enable OnlineFirst to proceed with refinement and implementation planning, please review the three design directions and indicate your preferred concept and implementation level by <strong>{DECISION_DEADLINE}</strong>.
          </p>
          <div className="rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 border border-neutral-200/70">
            <span className="font-semibold text-neutral-800">Flexibility Notice:</span> If additional internal consultation is required across the College of Management Sciences editorial board, please contact OnlineFirst before the decision date so that the project schedule can be adjusted accordingly.
          </div>
        </div>
      </div>
    </div>
  );
};
