import React, { useState } from 'react';
import { Chapter } from '../types/manga';
import { CheckCircle, Check, Copy, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChapterCardProps {
  chapter: Chapter;
  onRead: (chapter: Chapter) => void;
  onToggleRead: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (chapter: Chapter) => void;
  onDelete: (id: string) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  onRead,
  onToggleRead,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const chapterUrl = `${window.location.origin}/chapter/${chapter.number}`;
    navigator.clipboard.writeText(chapterUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExternalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = chapter.url || 'https://chatotakou.com/';
  };

  return (
    <div
      onClick={() => onRead(chapter)}
      className={`group relative flex flex-col justify-between rounded-xl border bg-neutral-900/80 p-5 transition-all duration-200 hover:border-amber-500/50 hover:bg-neutral-900 hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer ${
        chapter.isRead ? 'border-neutral-800/80 opacity-90' : 'border-neutral-800'
      }`}
    >
      <div>
        {/* Clean Header: Chapter Number and Source */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link
              to={`/chapter/${chapter.number}`}
              onClick={(e) => e.stopPropagation()}
              className="font-bold text-amber-400 font-mono tracking-tight text-sm hover:underline"
            >
              فصل {chapter.number}
            </Link>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{chapter.arc}</span>
          </div>

          <span className="text-[11px] font-mono text-neutral-500">{chapter.releaseDate}</span>
        </div>

        {/* Primary Title */}
        <h3 className="text-base sm:text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors leading-snug mb-2 font-cairo">
          {chapter.titleAr}
        </h3>

        {/* Summary text */}
        {chapter.summary && (
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {chapter.summary}
          </p>
        )}
      </div>

      {/* Footer Actions & Direct Reader Links */}
      <div className="pt-3 border-t border-neutral-800/80 mt-2">
        <div className="flex items-center justify-between gap-2">
          {/* Read status toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleRead(chapter.id);
            }}
            className={`flex items-center gap-1.5 text-xs transition-colors py-1 px-2.5 rounded-md ${
              chapter.isRead
                ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/50'
                : 'text-neutral-400 hover:text-neutral-200 bg-neutral-950/60 border border-neutral-800'
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${chapter.isRead ? 'text-emerald-400' : 'text-neutral-500'}`} />
            <span>{chapter.isRead ? 'تمت القراءة' : 'تحديد كمقروء'}</span>
          </button>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-amber-400 hover:border-neutral-700 transition-colors"
              title="نسخ رابط صفحة هذا الفصل"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleExternalOpen}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all cursor-pointer whitespace-nowrap shadow-sm"
              title="الانتقال التلقائي المباشر لموقع chatotakou.com"
            >
              <span>قراءة الفصل</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dedicated Route URL display */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500">
          <Link
            to={`/chapter/${chapter.number}`}
            onClick={(e) => e.stopPropagation()}
            className="text-amber-400/80 hover:text-amber-300 hover:underline font-mono"
          >
            /chapter/{chapter.number}
          </Link>
          <span className="truncate max-w-[150px] text-left ltr font-mono text-neutral-400 font-semibold" dir="ltr">
            chatotakou.com
          </span>
        </div>
      </div>
    </div>
  );
};
