import React, { useState } from 'react';
import { Article } from '../../types';
import { X, Download, ZoomIn, ZoomOut, FileText, ExternalLink, Printer, ShieldCheck } from 'lucide-react';

interface PdfViewerModalProps {
  article: Article;
  journalName: string;
  volumeNumber?: number;
  issueNumber?: number;
  year?: number;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  article,
  journalName,
  volumeNumber = 7,
  issueNumber = 2,
  year = 2026,
  onClose,
}) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, article.pageEnd - article.pageStart + 1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 sm:p-4 backdrop-blur-md">
      <div
        id="pdf-viewer-modal"
        className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-neutral-900 shadow-2xl ring-1 ring-white/10"
      >
        {/* PDF Top Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-200">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-600/20 text-amber-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h4 className="line-clamp-1 text-sm font-semibold text-white">
                {article.title}
              </h4>
              <p className="text-xs text-neutral-400">
                {journalName} • Vol. {volumeNumber} No. {issueNumber} ({year}) • pp. {article.pageStart}–{article.pageEnd}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden items-center gap-1 rounded bg-neutral-800 px-2 py-1 sm:flex">
              <button
                onClick={() => setZoom((z) => Math.max(70, z - 10))}
                className="p-1 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="px-1 text-xs font-mono text-neutral-300">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
                className="p-1 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Print & Download */}
            <button
              onClick={handlePrint}
              className="rounded bg-neutral-800 p-2 text-neutral-300 hover:bg-neutral-700 hover:text-white transition"
              title="Print Document"
            >
              <Printer className="h-4 w-4" />
            </button>

            <a
              href={`data:text/plain;charset=utf-8,JORMASS Academic Publication: ${encodeURIComponent(
                article.title
              )}\nAuthors: ${article.authors.map((a) => a.name).join(', ')}\nAbstract:\n${
                article.abstract
              }\nDOI: ${article.doi || 'N/A'}\nPages: ${article.pageStart}-${article.pageEnd}`}
              download={`${article.slug}.pdf`}
              className="inline-flex items-center gap-1.5 rounded bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition shadow"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF ({article.pdfFileSize || '850 KB'})</span>
            </a>

            <button
              onClick={onClose}
              className="rounded p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
              aria-label="Close PDF Viewer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF Simulated Reader Surface */}
        <div className="flex-1 overflow-y-auto bg-neutral-800 p-4 sm:p-8 flex justify-center">
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-3xl rounded-sm bg-white p-8 sm:p-12 text-neutral-900 shadow-2xl transition-transform duration-150 relative min-h-[900px]"
          >
            {/* Header Masthead on PDF */}
            <div className="border-b-2 border-neutral-900 pb-4 mb-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  {journalName} (JORMASS)
                </p>
                <p className="text-xs text-neutral-700 font-medium">
                  Vol. {volumeNumber}, No. {issueNumber} ({year}) | pp. {article.pageStart}–{article.pageEnd}
                </p>
                <p className="text-[10px] text-neutral-500 font-mono">
                  ISSN: 2636-6460 (Print) | 2636-6479 (Online)
                </p>
              </div>
              <div className="text-right">
                {article.doi && (
                  <p className="text-[10px] font-mono text-neutral-600">
                    DOI: {article.doi}
                  </p>
                )}
                <div className="mt-1 inline-flex items-center gap-1 rounded bg-neutral-100 px-2 py-0.5 text-[9px] font-bold text-neutral-700">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" /> Open Access (CC BY 4.0)
                </div>
              </div>
            </div>

            {/* Article Heading */}
            <h1 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-neutral-950">
              {article.title}
            </h1>

            {/* Authors */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 text-sm font-semibold text-neutral-800">
                {article.authors.map((auth, idx) => (
                  <span key={idx}>
                    {auth.name}
                    {auth.isCorresponding && ' *'}
                    {idx < article.authors.length - 1 && ','}
                  </span>
                ))}
              </div>
              <div className="mt-2 space-y-1 text-xs text-neutral-600 italic">
                {article.authors.map((auth, idx) => (
                  <p key={idx}>
                    {auth.name}: {auth.affiliation}
                    {auth.orcid && ` (ORCID: ${auth.orcid})`}
                  </p>
                ))}
              </div>
            </div>

            {/* Abstract Box */}
            <div className="mt-8 rounded border border-neutral-300 bg-neutral-50 p-5">
              <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-neutral-900">
                Abstract
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-700 text-justify">
                {article.abstract}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-1 text-xs text-neutral-700">
                <span className="font-bold">Keywords:</span>
                {article.keywords.map((kw, i) => (
                  <span key={i} className="italic">
                    {kw}
                    {i < article.keywords.length - 1 ? ';' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated Section Content */}
            <div className="mt-8 space-y-4 text-xs sm:text-sm leading-relaxed text-neutral-800 text-justify">
              <h2 className="font-serif text-base font-bold text-neutral-950 border-b border-neutral-200 pb-1">
                1. Introduction & Background
              </h2>
              <p>
                The dynamics of contemporary economic management and sustainable enterprise expansion within developing African markets require rigorous empirical evaluation. As emerging regional agreements such as the African Continental Free Trade Area (AfCFTA) take effect, institutional governance mechanisms, financial innovation, and agricultural modernization form critical pillars of national economic development.
              </p>
              <p>
                Prior scholarly literature has documented significant structural impediments facing enterprise productivity, ranging from credit turnaround frictions to fragmented supply chain logistics. This paper contributes directly to this empirical discourse by modeling organizational resilience against macroeconomic shifts.
              </p>

              <h2 className="font-serif text-base font-bold text-neutral-950 border-b border-neutral-200 pb-1 pt-4">
                2. Methodology & Analytical Framework
              </h2>
              <p>
                The empirical framework incorporates quantitative econometric modeling alongside robust fixed and random effects diagnostic estimations. Diagnostic tests, including the Hausman specification test, cross-sectional dependency evaluations, and autocorrelation checks, confirm the structural validity of the estimators employed.
              </p>
            </div>

            {/* Footer of PDF page */}
            <div className="mt-16 border-t border-neutral-200 pt-4 flex justify-between text-[10px] text-neutral-500">
              <span>Published by College of Management Sciences, MOUAU</span>
              <span>Page {article.pageStart} of {article.pageEnd}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
