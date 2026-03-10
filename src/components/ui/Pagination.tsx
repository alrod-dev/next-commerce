'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ current, total, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(5, total) }, (_, i) => {
    if (total <= 5) return i + 1;
    if (current <= 3) return i + 1;
    if (current >= total - 2) return total - 4 + i;
    return current - 2 + i;
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="rounded-lg border border-slate-200 p-2 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-slate-50"
      >
        <ChevronLeft size={20} />
      </button>

      {current > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-gray-600 hover:bg-slate-50"
          >
            1
          </button>
          {current > 4 && <span className="px-2 text-gray-600">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            page === current
              ? 'bg-blue-600 text-white'
              : 'border border-slate-200 text-gray-600 hover:bg-slate-50'
          }`}
        >
          {page}
        </button>
      ))}

      {current < total - 2 && (
        <>
          {current < total - 3 && <span className="px-2 text-gray-600">...</span>}
          <button
            onClick={() => onPageChange(total)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-gray-600 hover:bg-slate-50"
          >
            {total}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="rounded-lg border border-slate-200 p-2 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-slate-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
