import React from 'react';
import { BookOpen, ExternalLink, Compass } from 'lucide-react';
import { Chapter } from '../types/manga';

interface HeroBannerProps {
  chapters: Chapter[];
  onReadLatest: (chapter: Chapter) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  chapters,
  onReadLatest,
}) => {
  const latestChapter = chapters.length > 0
    ? [...chapters].sort((a, b) => b.number - a.number)[0]
    : null;

  const readCount = chapters.filter((c) => c.isRead).length;
  const totalCount = chapters.length;

  return (
    <div className="relative w-full overflow-hidden border-b border-neutral-800 bg-neutral-900">
      {/* Background Graphic with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/one_piece_hero_1791147651620.jpg"
          alt="One Piece Grand Line Adventure"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>مكتبة فصول ون بيس باللغة العربية · قراءة مباشرة على ChatOtakou</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl font-cairo">
              فصول مانجا ون بيس <br />
              <span className="text-amber-400">من الفصل 1194 إلى 1260</span>
            </h1>

            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-300">
              تصفح وقراءة فصول ون بيس مترجمة باللغة العربية مع روابط مخصصة لكل فصل وتحويل مباشر وتلقائي إلى سيرفرات موقع{' '}
              <strong className="text-amber-300">chatotakou.com</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {latestChapter && (
                <button
                  onClick={() => onReadLatest(latestChapter)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 text-neutral-950 font-bold text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>قراءة أحدث فصل (فصل {latestChapter.number})</span>
                </button>
              )}

              <a
                href="https://chatotakou.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-700 bg-neutral-900/80 text-neutral-200 font-semibold text-sm hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
              >
                <span>فتح موقع chatotakou.com</span>
                <ExternalLink className="w-4 h-4 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="lg:col-span-4 bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 backdrop-blur-sm">
            <div className="text-xs font-semibold text-neutral-400 mb-4 pb-2 border-b border-neutral-800/80 flex items-center justify-between">
              <span>إحصائيات الفصول المتاحة</span>
              <span className="text-amber-400 font-mono text-xs">ONE PIECE</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold font-mono text-neutral-100 tabular-nums">
                  {totalCount}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">فصل متوفر في الفهرس</div>
              </div>

              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  {readCount}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">فصل تمت قراءته</div>
              </div>

              <div>
                <div className="text-lg font-bold font-mono text-amber-400 tabular-nums">
                  {latestChapter ? latestChapter.number : '1260'}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">أحدث فصل</div>
              </div>

              <div>
                <div className="text-lg font-bold font-mono text-neutral-200 tabular-nums">
                  1194
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">أول فصل في النطاق</div>
              </div>
            </div>

            {totalCount > 0 && (
              <div className="mt-4 pt-3 border-t border-neutral-800">
                <div className="flex justify-between text-xs text-neutral-400 mb-1.5 font-mono">
                  <span>نسبة الإنجاز</span>
                  <span className="tabular-nums">
                    {Math.round((readCount / totalCount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((readCount / totalCount) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
