import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Chapter } from '../types/manga';
import {
  ExternalLink,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Compass,
  Copy,
  Check,
  Globe,
  Tag,
  Share2,
} from 'lucide-react';
import { applyChapterSeo, getChapterKeywords, getChapterSlug, getChapterSeoTitle } from '../utils/seo';

interface ChapterPageProps {
  chapters: Chapter[];
  onToggleRead: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const ChapterPage: React.FC<ChapterPageProps> = ({
  chapters,
  onToggleRead,
  onToggleFavorite,
}) => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const chapterNumber = parseInt(number || '1148', 10);

  const chapter = chapters.find((c) => c.number === chapterNumber) || {
    id: `ch-${chapterNumber}`,
    number: chapterNumber,
    titleAr: `الفصل ${chapterNumber} - مانجا ون بيس مترجم بالعربية`,
    titleEn: `One Piece Chapter ${chapterNumber}`,
    url: 'https://chatotakou.com/',
    arc: chapterNumber >= 1126 ? 'آرك إلباف (أرض العمالقة)' : 'آرك ون بيس',
    saga: 'الملحمة الأخيرة',
    releaseDate: '2026',
    scanlationGroup: 'شات أوتاكو ChatOtakou',
    summary: `قراءة وتحميل الفصل ${chapterNumber} من مانجا ون بيس مترجم عربي كامل اون لاين بجودة عالية عبر سيرفرات شات أوتاكو.`,
    isRead: false,
    isFavorite: false,
    createdAt: Date.now(),
  };

  const [countdown, setCountdown] = useState<number>(2);
  const [autoRedirectEnabled, setAutoRedirectEnabled] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);

  // Target URL
  const targetUrl = chapter.url || 'https://chatotakou.com/';
  const seoSlug = getChapterSlug(chapterNumber);
  const seoKeywords = getChapterKeywords(chapterNumber, chapter.arc);

  // Apply SEO metadata to document head
  useEffect(() => {
    applyChapterSeo({
      number: chapter.number,
      titleAr: chapter.titleAr,
      titleEn: chapter.titleEn,
      summary: chapter.summary,
      arc: chapter.arc,
      url: targetUrl,
    });
  }, [chapter, targetUrl]);

  // Automatic redirect timer
  useEffect(() => {
    if (!autoRedirectEnabled) return;

    if (countdown <= 0) {
      window.location.href = targetUrl;
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, autoRedirectEnabled, targetUrl]);

  // Find next and prev chapters
  const prevChapterNumber = chapterNumber - 1;
  const nextChapterNumber = chapterNumber + 1;
  const hasPrev = prevChapterNumber >= 1;
  const hasNext = nextChapterNumber <= 1300;

  const handleManualRedirect = () => {
    window.location.href = targetUrl;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}${seoSlug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between font-cairo">
      {/* Top Bar for Chapter View */}
      <header className="sticky top-0 z-30 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-300 hover:text-amber-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى الفهرس الكامل (Index)</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowKeywords(!showKeywords)}
              className="flex items-center gap-1 text-xs text-amber-400/90 hover:text-amber-300 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>كلمات السيو (SEO)</span>
            </button>
            <span className="font-mono text-amber-400 font-bold text-sm">
              فصل #{chapter.number}
            </span>
          </div>
        </div>
      </header>

      {/* Main Chapter Content & Auto-redirect card */}
      <main className="mx-auto max-w-3xl w-full px-4 py-8 flex-1 flex flex-col justify-center">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Top Decorative Banner */}
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

          {/* Automatic Redirection Box */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-center space-y-3">
            <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-amber-400/20 text-amber-400 mb-1">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>

            <h2 className="text-base sm:text-lg font-bold text-amber-300">
              {autoRedirectEnabled ? (
                <span>
                  جاري تحويلك تلقائياً إلى قراءة الفصل على <strong>ChatOtakou</strong> خلال{' '}
                  <span className="font-mono text-xl font-extrabold text-white underline">
                    {countdown}
                  </span>{' '}
                  ثواني...
                </span>
              ) : (
                <span>تم إيقاف التحويل التلقائي</span>
              )}
            </h2>

            <p className="text-xs text-neutral-300">
              الموقع المستهدف: <strong className="text-amber-200 font-mono">https://chatotakou.com/</strong>
            </p>

            {/* Direct Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleManualRedirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all cursor-pointer active:scale-95"
              >
                <span>الانتقال الفوري إلى الفصل (chatotakou.com)</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={() => setAutoRedirectEnabled(!autoRedirectEnabled)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-950 text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {autoRedirectEnabled ? 'إيقاف التحويل التلقائي' : 'تشغيل التحويل التلقائي'}
              </button>
            </div>
          </div>

          {/* Chapter Details & SEO Info */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-400 font-bold text-base">
                  فصل {chapter.number}
                </span>
                <span>·</span>
                <span>{chapter.arc}</span>
                <span>·</span>
                <span>ترجمة {chapter.scanlationGroup || 'شات أوتاكو'}</span>
              </div>
              <span className="text-neutral-500 font-mono text-[11px]">{chapter.releaseDate}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-neutral-100 leading-tight">
              {chapter.titleAr}
            </h1>

            {chapter.summary && (
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
                {chapter.summary}
              </p>
            )}

            {/* SEO Link Slug & Copy */}
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>رابط السيو العربي (SEO Keyword Link):</span>
                </span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-amber-400 hover:underline font-mono text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ!' : 'نسخ رابط السيو'}</span>
                </button>
              </div>
              <div className="font-mono text-xs text-amber-300/90 text-left bg-neutral-900 px-3 py-1.5 rounded border border-neutral-800 truncate" dir="ltr">
                {window.location.origin}{seoSlug}
              </div>
            </div>

            {/* SEO Keywords tags view */}
            {showKeywords && (
              <div className="bg-neutral-950/80 p-3.5 rounded-xl border border-neutral-800 space-y-2">
                <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>الكلمات المفتاحية المعتمدة لمحركات البحث (SEO Keywords):</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {seoKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Between Chapters */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            {hasPrev ? (
              <button
                onClick={() => {
                  setCountdown(2);
                  navigate(`/chapter/${prevChapterNumber}`);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
                <span>الفصل السابق ({prevChapterNumber})</span>
              </button>
            ) : (
              <span className="text-neutral-600">بداية الفصول</span>
            )}

            <Link
              to="/"
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              فهرس كل الفصول (Index)
            </Link>

            {hasNext ? (
              <button
                onClick={() => {
                  setCountdown(2);
                  navigate(`/chapter/${nextChapterNumber}`);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 transition-colors cursor-pointer"
              >
                <span>الفصل التالي ({nextChapterNumber})</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-neutral-600">نهاية الفصول</span>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-900 bg-neutral-950 py-4 text-center text-xs text-neutral-500">
        <Link to="/" className="text-amber-400 hover:underline">
          العودة إلى فهرس فصول ون بيس (One Piece Index)
        </Link>
      </footer>
    </div>
  );
};
