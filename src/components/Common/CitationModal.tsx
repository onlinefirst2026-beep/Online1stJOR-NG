import React, { useState } from 'react';
import { Article } from '../../types';
import { Copy, Check, Download, ExternalLink, X, BookOpen, Quote } from 'lucide-react';

interface CitationModalProps {
  article: Article;
  journalName: string;
  volumeNumber?: number;
  issueNumber?: number;
  year?: number;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({
  article,
  journalName,
  volumeNumber = 7,
  issueNumber = 2,
  year = 2026,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'apa' | 'harvard' | 'chicago' | 'bibtex' | 'ris'>('apa');
  const [copied, setCopied] = useState(false);

  const authorsString = article.authors.map((a) => a.name).join(', ');
  const firstAuthorSurname = article.authors[0]?.name.split(' ').pop() || 'Author';

  const apaCitation = `${article.authors
    .map((a) => {
      const parts = a.name.split(' ');
      const surname = parts.pop();
      const initials = parts.map((p) => p[0] + '.').join(' ');
      return `${surname}, ${initials}`;
    })
    .join(', & ')} (${year}). ${article.title}. ${journalName}, ${volumeNumber}(${issueNumber}), ${article.pageStart}–${article.pageEnd}.${
    article.doi ? ` https://doi.org/${article.doi}` : ''
  }`;

  const harvardCitation = `${article.authors
    .map((a) => {
      const parts = a.name.split(' ');
      const surname = parts.pop();
      const initials = parts.map((p) => p[0] + '.').join(' ');
      return `${surname}, ${initials}`;
    })
    .join(', ')} ${year}, '${article.title}', ${journalName}, vol. ${volumeNumber}, no. ${issueNumber}, pp. ${article.pageStart}–${article.pageEnd}.`;

  const chicagoCitation = `${article.authors.map((a) => a.name).join(', ')}. "${article.title}." ${journalName} ${volumeNumber}, no. ${issueNumber} (${year}): ${article.pageStart}–${article.pageEnd}.${
    article.doi ? ` https://doi.org/${article.doi}.` : ''
  }`;

  const bibtexCitation = `@article{${firstAuthorSurname.toLowerCase()}${year}${article.slug.substring(0, 8)},
  title = {${article.title}},
  author = {${article.authors.map((a) => a.name).join(' and ')}},
  journal = {${journalName}},
  volume = {${volumeNumber}},
  number = {${issueNumber}},
  pages = {${article.pageStart}--${article.pageEnd}},
  year = {${year}},
  doi = {${article.doi || ''}}
}`;

  const risCitation = `TY  - JOUR
TI  - ${article.title}
${article.authors.map((a) => `AU  - ${a.name}`).join('\n')}
JO  - ${journalName}
VL  - ${volumeNumber}
IS  - ${issueNumber}
SP  - ${article.pageStart}
EP  - ${article.pageEnd}
PY  - ${year}
DO  - ${article.doi || ''}
ER  - `;

  const currentContent = {
    apa: apaCitation,
    harvard: harvardCitation,
    chicago: chicagoCitation,
    bibtex: bibtexCitation,
    ris: risCitation,
  }[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: 'bib' | 'ris') => {
    const text = format === 'bib' ? bibtexCitation : risCitation;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article.slug}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        id="citation-modal"
        className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Cite this Scholarly Article
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500">
            Article Reference
          </p>
          <p className="line-clamp-2 text-sm font-semibold text-neutral-800">
            {article.title}
          </p>
          <p className="mt-1 text-xs text-neutral-500">{authorsString}</p>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
            {[
              { id: 'apa', label: 'APA 7th' },
              { id: 'harvard', label: 'Harvard' },
              { id: 'chicago', label: 'Chicago' },
              { id: 'bibtex', label: 'BibTeX' },
              { id: 'ris', label: 'RIS (EndNote/Zotero)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4 relative rounded-lg bg-neutral-900 p-4 text-xs font-mono text-neutral-100 shadow-inner">
            <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {currentContent}
            </pre>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload('bib')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
              >
                <Download className="h-3.5 w-3.5" /> Export .bib
              </button>
              <button
                onClick={() => handleDownload('ris')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
              >
                <Download className="h-3.5 w-3.5" /> Export .ris
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-700 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-amber-800 transition"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy Citation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
