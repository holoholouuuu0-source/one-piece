import React, { useState } from 'react';
import { Chapter } from '../types/manga';
import { X, ExternalLink, ChevronRight, ChevronLeft, CheckCircle, Copy, Check, Star, Share2 } from 'lucide-react';

interface ReaderModalProps {
  chapter: Chapter | null;
  onClose: () => void;
  onPrevChapter?: () => void;
  onNextChapter?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onToggleRead: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({
  chapter,
  onClose,
  onPrevChapter,
  onNextChapter,
  hasPrev,
  hasNext,
  onToggleRead,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  if (!chapter) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(chapter.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenExternal = () => {
    window.open(chapter.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-amber-400 font-bold text-lg">
              فصل #{chapter.number}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">{chapter.arc}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(chapter.id)}
              className={`p-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors ${
                chapter.isFavorite ? 'text-amber-400' : 'text-neutral-400'
              }`}
              title="المفضلة"
            >
              <Star className={`w-4 h-4 ${chapter.isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-100 font-cairo">
              {chapter.titleAr}
            </h2>
            {chapter.titleEn && (
              <p className="text-xs text-neutral-500 italic mt-0.5">
                {chapter.titleEn}
              </p>
            )}
          </div>

          {/* Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 py-2 border-y border-neutral-800/60">
            <span>الترجمة: {chapter.scanlationGroup || 'غير محدد'}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>تاريخ الإصدار: {chapter.releaseDate}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>الآرك: {chapter.arc}</span>
          </div>

          {/* Summary Box */}
          {chapter.summary && (
            <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4">
              <h4 className="text-xs font-bold text-amber-400 mb-1">نبذة عن أحداث الفصل:</h4>
              <p className="text-xs leading-relaxed text-neutral-300">
                {chapter.summary}
              </p>
            </div>
          )}

          {/* URL Box */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-semibold">رابط القراءة المعتمد:</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
              </button>
            </div>

            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-amber-200/90 truncate text-left" dir="ltr">
              {chapter.url}
            </div>

            {chapter.secondaryUrl && (
              <div className="pt-2 text-xs text-neutral-400 flex items-center justify-between">
                <span>رابط بديل:</span>
                <a
                  href={chapter.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  dir="ltr"
                >
                  {new URL(chapter.secondaryUrl).hostname}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Big Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onToggleRead(chapter.id)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold border transition-colors ${
                chapter.isRead
                  ? 'border-emerald-800 bg-emerald-950/40 text-emerald-400'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{chapter.isRead ? 'تمت القراءة بنجاح' : 'تحديد كمقروء'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleOpenExternal}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
            >
              <span>فتح الرابط للقراءة الآن</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chapter Navigation Footer (Prev / Next) */}
        <div className="mt-4 pt-3 flex items-center justify-between text-xs border-t border-neutral-900 text-neutral-400">
          <button
            disabled={!hasPrev}
            onClick={onPrevChapter}
            className="flex items-center gap-1 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-neutral-400 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
            <span>الفصل السابق</span>
          </button>

          <span className="text-[11px] text-neutral-500 font-mono">
            {chapter.number} / One Piece
          </span>

          <button
            disabled={!hasNext}
            onClick={onNextChapter}
            className="flex items-center gap-1 hover:text-amber-400 disabled:opacity-30 disabled:hover:text-neutral-400 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>الفصل التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
