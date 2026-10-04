import React, { useState } from 'react';
import { Chapter } from '../types/manga';
import { CheckCircle, Check, Copy, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChapterListItemProps {
  chapter: Chapter;
  onRead: (chapter: Chapter) => void;
  onToggleRead: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (chapter: Chapter) => void;
  onDelete: (id: string) => void;
}

export const ChapterListItem: React.FC<ChapterListItemProps> = ({
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
      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 hover:border-neutral-700 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Chapter number with direct link */}
        <Link
          to={`/chapter/${chapter.number}`}
          onClick={(e) => e.stopPropagation()}
          className="w-16 shrink-0 font-mono font-bold text-amber-400 text-sm hover:underline"
        >
          #{chapter.number}
        </Link>

        {/* Title and metadata */}
        <div className="min-w-0">
          <div className="text-sm font-bold text-neutral-100 group-hover:text-amber-300 transition-colors truncate">
            {chapter.titleAr}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5 truncate">
            <Link
              to={`/chapter/${chapter.number}`}
              onClick={(e) => e.stopPropagation()}
              className="text-amber-400/80 font-mono text-[11px] hover:underline"
            >
              /chapter/{chapter.number}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{chapter.arc}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-400 font-semibold font-mono">chatotakou.com</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleRead(chapter.id);
          }}
          className={`flex items-center gap-1 text-xs py-1 px-2.5 rounded-md border ${
            chapter.isRead
              ? 'text-emerald-400 border-emerald-900/40 bg-emerald-950/20'
              : 'text-neutral-400 border-neutral-800 hover:text-neutral-200'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{chapter.isRead ? 'مقروء' : 'تحديد كمقروء'}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="p-1.5 rounded-md border border-neutral-800 text-neutral-400 hover:text-amber-400"
          title="نسخ رابط الفصل المباشر"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={handleExternalOpen}
          className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-md bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-colors shadow-sm cursor-pointer"
        >
          <span>قراءة الفصل</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
