import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useT } from '../i18n/LanguageContext';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const pdfPath = '/docs/product-introduction.pdf';

export default function ProductIntroduction() {
  const t = useT();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="min-h-screen bg-brand-bg px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-red-400">
          <h2 className="mb-2 text-xl font-bold">Failed to load PDF</h2>
          <p className="mb-4 font-mono text-sm">{error}</p>
          <a href={pdfPath} download="product-introduction.pdf" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-4 py-2 text-sm font-medium text-brand-text-on-accent transition-colors hover:bg-brand-accent-light">
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="font-display text-2xl font-bold text-brand-text">{t.hero.productIntroduction}</h1>
          <a href={pdfPath} download="product-introduction.pdf" className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-4 py-2 text-sm font-medium text-brand-text-on-accent transition-colors hover:bg-brand-accent-light">
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-brand-border bg-brand-bg-secondary/50 p-4 sm:p-6">
          <div className="flex min-w-fit justify-center">
            <Document file={pdfPath} onLoadSuccess={({ numPages }) => { setNumPages(numPages); setPageNumber(1); setError(null); }} onLoadError={(err) => setError(err.message)}>
              <Page pageNumber={pageNumber} scale={scale} renderTextLayer renderAnnotationLayer className="shadow-2xl" />
            </Document>
          </div>
        </div>

        {numPages > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button type="button" aria-label="Previous page" onClick={() => setPageNumber((page) => Math.max(1, page - 1))} disabled={pageNumber <= 1} className="rounded-xl border border-brand-border bg-brand-bg-secondary p-2 text-brand-text transition-colors hover:border-brand-accent/30 disabled:opacity-40">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-brand-text-secondary">Page {pageNumber} of {numPages}</span>
            <button type="button" aria-label="Next page" onClick={() => setPageNumber((page) => Math.min(numPages, page + 1))} disabled={pageNumber >= numPages} className="rounded-xl border border-brand-border bg-brand-bg-secondary p-2 text-brand-text transition-colors hover:border-brand-accent/30 disabled:opacity-40">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="ml-4 flex items-center gap-2">
              <span className="text-sm text-brand-text-secondary">Zoom:</span>
              <button type="button" aria-label="Zoom out" onClick={() => setScale((value) => Math.max(0.5, value - 0.1))} className="rounded-lg border border-brand-border bg-brand-bg-secondary px-2 py-1 text-sm text-brand-text">-</button>
              <span className="w-12 text-center text-sm text-brand-text-secondary">{Math.round(scale * 100)}%</span>
              <button type="button" aria-label="Zoom in" onClick={() => setScale((value) => Math.min(2, value + 0.1))} className="rounded-lg border border-brand-border bg-brand-bg-secondary px-2 py-1 text-sm text-brand-text">+</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
