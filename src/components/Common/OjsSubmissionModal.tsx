import React from 'react';
import { ExternalLink, X, FileCheck, CheckCircle2, ShieldCheck, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

interface OjsSubmissionModalProps {
  ojsUrl: string;
  onClose: () => void;
}

export const OjsSubmissionModal: React.FC<OjsSubmissionModalProps> = ({
  ojsUrl,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        id="ojs-submission-modal"
        className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-900 px-6 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <div>
              <h3 className="font-serif text-lg font-bold">
                JORMASS Manuscript Submission Portal
              </h3>
              <p className="text-xs text-neutral-400">
                Connected to Open Journal Systems (OJS) Workflow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
              <div>
                <span className="font-bold">Editorial Workflow Note:</span> JORMASS utilizes an integrated peer-review workflow. Authors submitting new manuscripts are directed to the secure editorial portal to register, upload blinded manuscripts, and track real-time double-blind review milestones.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Pre-Submission Checklist
            </h4>
            <ul className="space-y-2 text-xs text-neutral-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Originality:</strong> The manuscript has not been previously published nor is it before another journal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Blinded Manuscript:</strong> Author names, affiliations, and identifying acknowledgments are removed from the main text file for double-blind review.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Formatting:</strong> Manuscript is in MS Word (.doc/.docx), 1.5 line spacing, 12pt font, with APA 7th referencing style.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Abstract & Keywords:</strong> Concise structured abstract (150–250 words) with 4–6 relevant academic keywords.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-neutral-200 pt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-neutral-500">
              Submission inquiries: <span className="font-medium text-neutral-800">editorial@jormass.com</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
              >
                Return to Journal
              </button>
              <a
                href={ojsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-700 transition"
              >
                <span>Proceed to OJS Submission</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
