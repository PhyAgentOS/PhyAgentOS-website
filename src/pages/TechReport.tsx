import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

// CDN serves .mjs as octet-stream; .js is text/javascript so pdf.js can import the worker.
pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.js`;

export default function TechReport() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);

  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  }

  function onDocumentLoadError(err: Error) {
    setError(err.message);
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-brand-bg">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-red-400">
            <h2 className="text-xl font-bold mb-2">Failed to load PDF</h2>
            <p className="font-mono text-sm mb-4">{error}</p>
            <a
              href="/docs/tech-report.pdf"
              download="tech-report.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-accent text-brand-text-on-accent font-medium text-sm hover:bg-brand-accent-light transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-brand-bg">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-brand-text">Technical Report</h1>
            <p className="text-sm text-brand-text-secondary">PhyAgentOS v0.1.7</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/docs/tech-report.pdf"
              download="tech-report.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-accent text-brand-text-on-accent font-medium text-sm hover:bg-brand-accent-light transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-bg-secondary/50 p-4 sm:p-6 overflow-x-auto">
          <div className="flex justify-center min-w-fit">
            <Document
              file="/docs/tech-report.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="h-[600px] flex items-center justify-center text-brand-text-secondary">
                  Loading PDF...
                </div>
              }
              error={
                <div className="h-[600px] flex items-center justify-center text-brand-text-secondary">
                  Failed to load PDF. Please try downloading it instead.
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer
                renderAnnotationLayer
                className="shadow-2xl"
              />
            </Document>
          </div>
        </div>

        {numPages > 0 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="p-2 rounded-xl bg-brand-bg-secondary border border-brand-border text-brand-text disabled:opacity-40 hover:border-brand-accent/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-brand-text-secondary font-medium">
              Page {pageNumber} of {numPages}
            </span>
            <button
              type="button"
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              className="p-2 rounded-xl bg-brand-bg-secondary border border-brand-border text-brand-text disabled:opacity-40 hover:border-brand-accent/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-brand-text-secondary">Zoom:</span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                className="px-2 py-1 rounded-lg bg-brand-bg-secondary border border-brand-border text-brand-text text-sm hover:border-brand-accent/30 transition-colors"
              >
                -
              </button>
              <span className="text-sm text-brand-text-secondary w-12 text-center">{Math.round(scale * 100)}%</span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
                className="px-2 py-1 rounded-lg bg-brand-bg-secondary border border-brand-border text-brand-text text-sm hover:border-brand-accent/30 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
