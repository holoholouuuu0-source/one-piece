import React, { useState } from 'react';
import { X, Search, Globe, Copy, Check, Sparkles, Tag, ExternalLink } from 'lucide-react';
import { getChapterKeywords, getChapterSeoTitle, getChapterSeoDescription, getChapterSlug } from '../utils/seo';

interface SeoKeywordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultChapterNumber?: number;
}

export const SeoKeywordsModal: React.FC<SeoKeywordsModalProps> = ({
  isOpen,
  onClose,
  defaultChapterNumber = 1148,
}) => {
  const [targetNumber, setTargetNumber] = useState<number>(defaultChapterNumber);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedKeywords, setCopiedKeywords] = useState(false);

  if (!isOpen) return null;

  const keywords = getChapterKeywords(targetNumber);
  const seoTitle = getChapterSeoTitle(targetNumber);
  const seoDescription = getChapterSeoDescription(targetNumber);
  const seoSlug = getChapterSlug(targetNumber);
  const fullSeoUrl = `${window.location.origin}${seoSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullSeoUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyKeywords = () => {
    navigator.clipboard.writeText(keywords.join(', '));
    setCopiedKeywords(true);
    setTimeout(() => setCopiedKeywords(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-neutral-100">
              أداة تحسين محركات البحث والكلمات المفتاحية (Arabic Manga SEO)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter input selector */}
        <div className="flex items-center gap-3 bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
          <label className="text-xs font-semibold text-neutral-300 shrink-0">
            اختر أو اكتب رقم الفصل:
          </label>
          <input
            type="number"
            min={1}
            value={targetNumber}
            onChange={(e) => setTargetNumber(parseInt(e.target.value) || 1)}
            className="w-28 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-1.5 text-sm font-mono text-amber-300 font-bold focus:outline-none focus:border-amber-400 text-center"
          />
          <span className="text-xs text-neutral-400">
            (مثال: 1148، 1194، 1200، 1260)
          </span>
        </div>

        {/* Google Search Snippet Simulation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-semibold flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-amber-400" />
              معاينة مظهر الرابط في نتائج بحث جوجل (Google Snippet Preview):
            </span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1 text-right" dir="rtl">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono" dir="ltr">
              <span className="text-emerald-400 font-bold">chatotakou.com</span>
              <span className="text-neutral-500">› manga › one-piece › chapter-{targetNumber}</span>
            </div>
            <h4 className="text-sm font-bold text-sky-400 hover:underline cursor-pointer leading-snug">
              {seoTitle}
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed pt-0.5">
              {seoDescription}
            </p>
          </div>
        </div>

        {/* Generated SEO Link with 1-click copy */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-semibold">
              الرابط الصديق للسيو (SEO Friendly Slug):
            </span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-amber-400 hover:underline text-xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'تم نسخ الرابط!' : 'نسخ الرابط'}</span>
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-xs text-amber-300 text-left truncate" dir="ltr">
            {fullSeoUrl}
          </div>
        </div>

        {/* Keywords Cloud */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-300 font-semibold flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              الكلمات المفتاحية العربية الأكثر بحثاً (Arabic Keywords):
            </span>
            <button
              onClick={handleCopyKeywords}
              className="flex items-center gap-1 text-amber-400 hover:underline text-xs"
            >
              {copiedKeywords ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKeywords ? 'تم نسخ الكلمات!' : 'نسخ جميع الكلمات'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-neutral-900 border border-neutral-800 max-h-40 overflow-y-auto">
            {keywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-amber-400/60 hover:text-amber-300 transition-colors"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-neutral-800">
          <span className="text-neutral-500">
            الرابط يوجه تلقائياً إلى <code className="text-amber-400">https://chatotakou.com/</code>
          </span>
          <a
            href={seoSlug}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold transition-colors"
          >
            <span>فتح صفحة الفصل {targetNumber}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
